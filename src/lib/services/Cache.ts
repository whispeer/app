import { errorServiceInstance } from "./error.service";
import * as Bluebird from "bluebird";
import Dexie from "dexie";
import h from "../helper/helper"
import idb, { Cursor } from "idb"

const dbPromise = idb.open("whispeerCache", 10, upgradeDB => {
	const objectStore = upgradeDB.createObjectStore('cache', { keyPath: "id" });

	objectStore.createIndex("created", "created", { unique: false });
	objectStore.createIndex("used", "used", { unique: false });
	objectStore.createIndex("type", "type", { unique: false });
	objectStore.createIndex("size", "size", { unique: false });
})

try {
	indexedDB.deleteDatabase("whispeer");
} catch (e) {}

const cursorUntilDone = (cursorPromise: Promise<Cursor>, action) => {
	return Bluebird.try(async () => {
		let cursor = await cursorPromise

		while (cursor) {
			action(cursor)

			cursor = await cursor.continue()
		}
	})
}

export default class Cache {
	private _name: string
	private _options: any
	private lastCleaned: number = 0

	private _cacheDisabled: boolean = false

	constructor(name : string, options?: any) {
		this._name = name;
		this._options = options || {};
		this._options.maxEntries = this._options.maxEntries || 100;
		this._options.maxBlobSize = this._options.maxBlobSize || 1*1024*1024;

		dbPromise.catch(() => this.disable())
	}

	entryCount() : Bluebird<any> {
		if (this._cacheDisabled) {
			return Bluebird.reject("");
		}

		let count = 0

		return this.cursorAll((cursor) => count++, "readonly").then(() => count)
	}

	static sumSize (arr: any[]) {
		return arr.reduce(function (prev, cur) {
			return prev + cur.size;
		}, 0);
	}

	store(id: string, data: any, blobs?: any): Bluebird<any> {
		if (this._cacheDisabled) {
			return Bluebird.resolve();
		}

		if (blobs && !h.array.isArray(blobs)) {
			blobs = [blobs];
		}

		if (blobs && this._options.maxBlobSize !== -1 && Cache.sumSize(blobs) > this._options.maxBlobSize) {
			return Bluebird.resolve();
		}

		Bluebird.delay(0).then(() => {
			return this.cleanUp();
		}).catch(errorServiceInstance.criticalError);

		var cacheEntry = {
			data: JSON.stringify(data),
			created: new Date().getTime(),
			used: new Date().getTime(),
			id: this.getID(id),
			type: this._name,
			size: 0,
			blobs: <any>[]
		};

		if (blobs) {
			cacheEntry.blobs = blobs;
			cacheEntry.size = Cache.sumSize(blobs);
		}

		return Bluebird.try(async () => {
			const db = await dbPromise

			console.info(`Storing in indexeddb ${this.getID(id)}`)

			const tx = db.transaction('cache', 'readwrite')
			tx.objectStore('cache').put(cacheEntry)

			await tx.complete
		}).catch(errorServiceInstance.criticalError);
	}

	get(id: string): Bluebird<any> {
		if (this._cacheDisabled) {
			return Bluebird.reject(new Error("Cache is disabled"));
		}

		/*
		var cacheResult = this._db.cache.where("id").equals(this._name + "/" + id);

		this._db.cache.where("id").equals(this._name + "/" + id).modify({ used: new Date().getTime() });
		*/

		return Bluebird.try(async () => {
			const db = await dbPromise
			const tx = db.transaction("cache", "readonly")
			const data = await tx.objectStore("cache").get(`${this._name}/${id}`)

			if (typeof data === "undefined") {
				throw new Error(`cache miss for ${this.getID(id)}`);
			}

			data.data = JSON.parse(data.data);

			data.blobs = data.blobs || [];

			data.blobs = data.blobs.map((blob: any) => {
				if (typeof blob === "string") {
					return h.dataURItoBlob(blob);
				}

				return blob;
			});

			if (data.blobs.length === 1) {
				data.blob = data.blobs[0];
			}

			return data;
		})
	}

	/**
	 * get all cache entries as a dexie collection.<
	 * @return {Bluebird<any>} Promise containing all cache entries as a dexie collection.
	 */
	all(): any {
		if (this._cacheDisabled) {
			return Bluebird.resolve([]);
		}

		const entries = []

		return this.cursorAll((cursor) => entries.push(cursor.value), "readonly").then(() => entries)
	}

	getID(id) {
		return `${this._name}/${id}`
	}

	/**
	 * delete a certain cache entry.
	 * @param  {string}        id id of the entry
	 * @return {Bluebird<any>}    [description]
	 */
	delete(id: string): Bluebird<any> {
		if (this._cacheDisabled) {
			return Bluebird.resolve();
		}

		return Bluebird.try(async () => {
			const db = await dbPromise

			const tx = db.transaction("cache", "readwrite")

			await tx.objectStore("cache").delete(this.getID(id))
		})
	}

	deleteAll(): Bluebird<any> {
		if (this._cacheDisabled) {
			return Bluebird.resolve();
		}

		const deleteRequests = []

		return this.cursorAll((cursor) => deleteRequests.push(cursor.delete()), "readwrite").then(() => Bluebird.all(deleteRequests))
	}

	private cursorAll(action, transactionType: "readonly" | "readwrite") {
		return Bluebird.try(async () => {
			const db = await dbPromise

			const tx = db.transaction("cache", transactionType)
			const cursorPromise = tx.objectStore("cache").index("type").openCursor(this._name)

			await cursorUntilDone(cursorPromise, action)
		})
	}

	cleanUp() {
		if (this._cacheDisabled) {
			return Bluebird.resolve();
		}

		if (this._options.maxEntries === -1) {
			return;
		}

		if (this.lastCleaned > Date.now() - 1 * 60 * 1000) {
			return
		}

		this.lastCleaned = Date.now()

		return Bluebird.resolve(
			this.entryCount().bind(this).then((count) => {
				console.log(`Contains: ${count} Entries (${this._name})`);
				if (count > this._options.maxEntries) {
					console.warn(`todo: clean up cache ${this._name}`);
					// TODO: this._db.cache.orderBy("used").limit(count - this._options.maxEntries).delete();
				}
			})
		);
	};

	private disable() {
		this._cacheDisabled = true;
	}
}
