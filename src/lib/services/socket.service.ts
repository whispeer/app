const APIVERSION = "0.0.3";

const debug = require("debug");
import h from "../helper/helper";
import SocketIOClient, { connect } from "socket.io-client"; // tslint:disable-line:no-unused-variable

const config = require('../config.js');
import * as Bluebird from "bluebird";
import Observer from "../asset/observer";
import BlobUploader from "./blobUploader.service"

import { goToBusinessVersion, isBusinessVersion } from "./location.manager";

const socketDebug = debug("whispeer:socket");
const blobSocketDebug = debug("whispeerBlob:any");
const socketError = debug("whispeer:socket:error");

export const DisconnectError = h.createErrorType("disconnectedError");
export const ServerError = h.createErrorType("serverError");

const SOCKET_TIMEOUT = 60000;

interface Interceptor {
	transformRequest?: (request: any) => void
	transformResponse?: (request: any, response: any) => void
}

const log = {
	timer: function (name: string) {
		var message = new Date().toLocaleTimeString() + ":" + name + "(" + Math.random() + ")";
		if (debug.enabled("whispeer:socket")) {
			console.time(message);
		}
		return message;
	},
	timerEnd: function (message: string) {
		if (debug.enabled("whispeer:socket")) {
			console.timeEnd(message);
		}
	}
};

class SocketService extends Observer {

	private _interceptors: Interceptor[] = [];

	_domain = (config.https ? "https://" : "http://") + config.ws + ":" + config.wsPort;
	_autoReconnect = config.socket.autoReconnect;
	_autoConnect: boolean = config.socket.autoConnect;

	_socket: SocketIOClient.Socket;

	_lastRequestTime = 0;
	_loading = 0;

	uploadObserver = new Observer();
	_uploadingCounter = 0;

	static errors = {
		Disconnect: DisconnectError,
		Server: ServerError
	};

	errors = {
		Disconnect: DisconnectError,
		Server: ServerError
	}

	constructor() {
		super();

		if (this._autoConnect) {
			this._connect();
		}

		if (this._autoConnect && this._autoReconnect) {
			window.setInterval(() => {
				try {
					if (!this._socket.connected) {
						this._socket.connect();
					}
				} catch (e) {
					socketError(e);
				}
			}, 10000);
		}
	}

	private _connect () {
		this._socket = connect(this._domain, config.socket.options);

		this._socket.on("disconnect", () => {
			socketDebug("socket disconnected");
			this._loading = 0;
			this._uploadingCounter = 0;
		});

		this._socket.on("connect", () => {
			socketDebug("socket connected");
			this.emit("whispeerPing", {});

			(<any>this._socket.io).engine.on("heartbeat", () => {
				this.notify(null, "heartbeat")
			})
		});
	}

	private _emit (channel: string, request: Object) {
		return new Bluebird<any>((resolve, reject) => {
			var onDisconnect = function () {
				reject(new DisconnectError("Disconnected while sending"));
			};
			this._socket.once("disconnect", onDisconnect);
			this._socket.emit(channel, request, (response: any) => {
				this._socket.off("disconnect", onDisconnect);
				resolve(response);
			});
		});
	}

	getLoadingCount () {
		return this._loading;
	};

	lastRequestTime () {
		return this._lastRequestTime;
	};

	send (data: Object) {
		this._socket.send(data);
	}

	addInterceptor (interceptor: Interceptor) {
		this._interceptors.push(interceptor);
	}

	uploadBlob = (blob: Blob, blobid: string, progress: any, cb?: Function) => {
		if (this._uploadingCounter > 3) {
			this.uploadObserver.listenOnce(() => {
				this.uploadBlob(blob, blobid, progress, cb);
			}, "uploadFinished");
			return;
		}

		this._uploadingCounter++;
		var uploader = new BlobUploader(this, blob, blobid);

		uploader.listen(function (doneBytes: number) {
			progress.progress(doneBytes);
		}, "progress");

		var uploadPromise = uploader.upload().then(() => {
			this._uploadingCounter--;

			this.uploadObserver.notify(blobid, "uploadFinished");
			this.uploadObserver.notify(blobid, "uploadFinished:" + blobid);
		});

		return uploadPromise.nodeify(cb);
	}

	isConnected () {
		return this._socket.connected;
	}

	emit (channel: string, request: any, cb?: Function) {
		if (!this.isConnected()) {
			throw new DisconnectError("no connection");
		}

		const timer = log.timer("request on " + channel);
		const isBlobRequest = channel.indexOf("blob") === 0

		request.version = APIVERSION;
		request.clientInfo = CLIENT_INFO;

		if (isBlobRequest) {
			blobSocketDebug("Request on " + channel, request);
		} else {
			socketDebug("Request on " + channel, request);
		}

		this._interceptors.forEach(function (interceptor) {
			if (interceptor.transformRequest) {
				request = interceptor.transformRequest(request);
			}
		});

		this._loading++;
		this.notify(null, "request");

		return this._emit(channel, request).timeout(SOCKET_TIMEOUT).then((response) => {
			if (isBlobRequest) {
				blobSocketDebug("Answer on " + channel, response);
			} else {
				socketDebug("Answer on " + channel, response);
			}

			log.timerEnd(timer);

			if (response.alert) {
				alert(response.alert)
			}

			this._lastRequestTime = response.serverTime;

			this._interceptors.forEach((interceptor) => {
				if (interceptor.transformResponse) {
					response = interceptor.transformResponse(response, request);
				}
			});

			if (response.error) {
				socketError(response);
				throw new ServerError("server returned an error!", { response });
			}

			if (!isBusinessVersion()) {
				if (response.isBusiness) {
					goToBusinessVersion()
				}
			}

			return response;
		}).finally(() => {
			this._loading--;
			this.notify(null, "response");
		}).nodeify(cb)
	}

	awaitNoRequests() {
		if (this._loading === 0) {
			return Bluebird.resolve();
		}

		return new Bluebird<void>((resolve) => {
			this.listen(() => {
				if (this._loading === 0) {
					resolve();
				}
			}, "response");
		});
	}

	awaitConnection() {
		return new Bluebird<void>((resolve) => {
			if (this.isConnected()) {
				resolve();
			} else {
				this.once("connect", resolve);
			}
		});
	}

	on(eventName: string, callback: Function) {
		return this._socket.on(eventName, callback);
	}

	once(eventName: string, callback: Function) {
		return this._socket.once(eventName, callback);
	}

	/** definitly emits the request. might emit it multiple times! **/
	definitlyEmit (channel: string, request: any) : Bluebird<any> {
		var SOCKET_TIMEOUT = 10000;

		return this.awaitConnection().then(() => {
			return this.emit(channel, request).timeout(SOCKET_TIMEOUT);
		}).catch((e) => {
			console.error(e);
			return Bluebird.delay(500).then(() => {
				return this.definitlyEmit(channel, request);
			});
		})
	}

	channel (channel: string, callback: Function) {
		this._socket.on(channel, (data: any) => {
			socketDebug("received data on " + channel);
			socketDebug(data);
			callback(null, data);
		});
	}

}

export default new SocketService();
