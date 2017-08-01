/**
* MessageService
**/
var h = require("whispeerHelper").default;
var Progress = require("asset/Progress.ts").default;
var Queue = require("asset/Queue");
var debug = require("debug");
var Bluebird = require("bluebird");

var keyStore = require("crypto/keyStore");
var Cache = require("services/Cache.ts").default;

var socketService = require("services/socket.service.ts").default;
var BlobDownloader = require("services/blobDownloader.service.ts").default;

var initService = require("services/initService");

var knownBlobs = {};
var downloadBlobQueue = new Queue(5);
downloadBlobQueue.start();

var debugName = "whispeer:blobService";
var blobServiceDebug = debug(debugName);

const time = (name) => {
	if (debug.enabled(debugName)) {
		// eslint-disable-next-line no-console
		console.time(name);
	}
}

const timeEnd = (name) => {
	if (debug.enabled(debugName)) {
		// eslint-disable-next-line no-console
		console.timeEnd(name);
	}
}

var blobCache = new Cache("blobs");

class MyBlob {
	constructor(blobData, blobID, options) {
		this._blobData = blobData;
		options = options || {};

		if (typeof blobData === "string") {
			this._legacy = true;
		} else if (blobData instanceof File) {
			this._file = true;
		}

		if (blobID) {
			this._blobID = blobID;
			this._uploaded = true;
		} else {
			this._uploaded = false;
		}

		this._meta = options.meta || {};
		this._key = this._meta._key;
		this._decrypted = !this._key;

		this._uploadProgress = new Progress({ total: this.getSize() });
		this._encryptProgress = new Progress({ total: this.getSize() });
		this._decryptProgress = new Progress({ total: this.getSize() });
	}

	isUploaded() {
		return this._uploaded;
	}

	setMeta (meta) {
		if (!this.isUploaded()) {
			this._meta = meta;
		}
	}

	getSize() {
		return this._blobData.size;
	}

	getMeta() {
		return this._meta;
	}

	getArrayBuffer() {
		return new Bluebird((resolve) => {
			var reader = new FileReader();

			if (reader.addEventListener) {
				reader.addEventListener("loadend", resolve);
			} else {
				reader.onloadend = resolve;
			}

			reader.readAsArrayBuffer(this._blobData);
		}).then((event) => {
			var target = event.currentTarget || event.target;

			return target.result;
		});
	}

	encryptAndUpload (key, cb) {
		var blobKey;

		return Bluebird.try(() => {
			return this.encrypt();
		}).then((_blobKey) => {
			blobKey = _blobKey;
			return keyStore.sym.symEncryptKey(blobKey, key);
		}).then(() => {
			return this.upload();
		}).then(() => {
			return blobKey;
		}).nodeify(cb);
	}

	encrypt (cb) {
		return Bluebird.resolve().then(() => {
			if (this._uploaded || !this._decrypted) {
				throw new Error("trying to encrypt an already encrypted or public blob. add a key decryptor if you want to give users access");
			}

			return Bluebird.all([
				keyStore.sym.generateKey(null, "blob key"),
				this.getArrayBuffer()
			]);
		}).spread((_key, buf) => {
			this._key = _key;

			time("blobencrypt" + (this._blobID || this._preReserved));
			return keyStore.sym.encryptArrayBuffer(buf, this._key, (progress) => {
				this._encryptProgress.progress(this.getSize() * progress);
			});
		}).then((encryptedData) => {
			this._encryptProgress.progress(this.getSize());
			timeEnd("blobencrypt" + (this._blobID || this._preReserved));
			blobServiceDebug(encryptedData.byteLength);
			this._decrypted = false;

			this._blobData = new Blob([encryptedData], {type: this._blobData.type});

			return this._key;
		}).nodeify(cb);
	}

	decrypt (cb) {
		if (this._decrypted) {
			return Bluebird.resolve().nodeify(cb);
		}

		return Bluebird.try(() => {
			return this.getArrayBuffer();
		}).then((encryptedData) => {
			time("blobdecrypt" + this._blobID);
			return keyStore.sym.decryptArrayBuffer(encryptedData, this._key, (progress) => {
				this._decryptProgress.progress(this.getSize() * progress)
			})
		}).then((decryptedData) => {
			this._decryptProgress.progress(this.getSize())
			timeEnd("blobdecrypt" + this._blobID);

			this._decrypted = true;

			this._blobData = new Blob([decryptedData], {type: this._blobData.type});
		}).nodeify(cb);
	}

	getBase64Representation() {
		return this.getStringRepresentation().then((blobValue) => {
			return blobValue.split(",")[1];
		});
	}

	upload (cb) {
		return Bluebird.try(() => {
			if (this._uploaded) {
				return this._blobID;
			}

			return this.reserveID();
		}).then((blobid) => {
			return socketService.uploadBlob(this._blobData, blobid, this._uploadProgress);
		}).then(() => {
			this._uploaded = true;

			return this._blobID;
		}).nodeify(cb);
	}

	getBlobID() {
		return this._blobID;
	}

	reserveID (cb) {
		return Bluebird.try(() => {
			var meta = this._meta;
			meta._key = this._key;
			meta.one = 1;

			if (this._preReserved) {
				return socketService.emit("blob.fullyReserveID", {
					blobid: this._preReserved,
					meta: meta
				});
			}

			return socketService.emit("blob.reserveBlobID", {
				meta: meta
			});
		}).then((data) => {
			if (data.blobid) {
				this._blobID = data.blobid;

				knownBlobs[this._blobID] = Bluebird.resolve(this);

				return this._blobID;
			}
		}).nodeify(cb);
	}

	preReserveID (cb) {
		return Bluebird.try(() => {
			return socketService.emit("blob.preReserveID", {});
		}).then((data) => {
			if (data.blobid) {
				this._preReserved = data.blobid;
				knownBlobs[this._preReserved] = Bluebird.resolve(this);
				return data.blobid;
			}

			throw new Error("got no blobid");
		}).nodeify(cb);
	}

	toURL() {
		var blobToDataURI = Bluebird.promisify(h.blobToDataURI.bind(h));

		return Bluebird.try(() => {
			if (this._legacy) {
				return this._blobData;
			}

			if (this._blobData.localURL) {
				return this._blobData.localURL;
			}

			if (typeof window.URL !== "undefined") {
				return window.URL.createObjectURL(this._blobData);
			}

			if (typeof webkitURL !== "undefined") {
				return window.webkitURL.createObjectURL(this._blobData);
			}

			return blobToDataURI(this._blobData);
		}).catch(() => {
			return "";
		})
	}

	getStringRepresentation() {
		var blobToDataURI = Bluebird.promisify(h.blobToDataURI.bind(h));

		return Bluebird.try(() => {
			if (this.legacy) {
				return this._blobData;
			}

			return blobToDataURI(this._blobData);
		});
	}

	getHash() {
		return this.getArrayBuffer().then((buf) => {
			return keyStore.hash.hashArrayBuffer(buf)
		})
	}
}

const loadBlobFromServer = (blobID, downloadProgress) => {
	return downloadBlobQueue.enqueue(1, () => {
		return initService.awaitLoading().then(() => {
			return new BlobDownloader(socketService, blobID, downloadProgress).download()
		}).then((data) => {
			var blob = new MyBlob(data.blob, blobID, { meta: data.meta });

			blobCache.store(blob.getBlobID(), blob._meta, blob._blobData);

			return blob;
		});
	});
}

const loadBlobFromDB = (blobID) => {
	return blobCache.get(blobID).then((data) => {
		if (typeof data.blob === "undefined" || data.blob === false) {
			throw new Error("cache invalid!");
		}

		var blob;

		if (typeof data.blob === "string") {
			blob = h.dataURItoBlob(data.blob);
		}

		return new MyBlob(blob || data.blob, blobID, { meta: data.data });
	});
}

const loadBlob = (blobID, downloadProgress) => {
	return loadBlobFromDB(blobID).catch(() => {
		return loadBlobFromServer(blobID, downloadProgress);
	});
}

var blobService = {
	createBlob: (blob) => {
		return new MyBlob(blob);
	},
	getBlob: (blobID, downloadProgress) => {
		if (!knownBlobs[blobID]) {
			knownBlobs[blobID] = loadBlob(blobID, downloadProgress)
		}

		return knownBlobs[blobID]
	}
}

module.exports = blobService;
