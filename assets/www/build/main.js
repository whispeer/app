webpackJsonp([12],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisconnectError", function() { return DisconnectError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerError", function() { return ServerError; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asset_observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blobUploader_service__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__location_manager__ = __webpack_require__(49);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var APIVERSION = "0.0.3";
var debug = __webpack_require__(15);

 // tslint:disable-line:no-unused-variable
var config = __webpack_require__(61);




var socketDebug = debug("whispeer:socket");
var blobSocketDebug = debug("whispeerBlob:any");
var socketError = debug("whispeer:socket:error");
var DisconnectError = __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].createErrorType("disconnectedError");
var ServerError = __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].createErrorType("serverError");
var SOCKET_TIMEOUT = 60000;
var log = {
    timer: function (name) {
        var message = new Date().toLocaleTimeString() + ":" + name + "(" + Math.random() + ")";
        if (debug.enabled("whispeer:socket")) {
            console.time(message);
        }
        return message;
    },
    timerEnd: function (message) {
        if (debug.enabled("whispeer:socket")) {
            console.timeEnd(message);
        }
    }
};
var SocketService = (function (_super) {
    __extends(SocketService, _super);
    function SocketService() {
        var _this = _super.call(this) || this;
        _this._interceptors = [];
        _this._domain = (config.https ? "https://" : "http://") + config.ws + ":" + config.wsPort;
        _this._autoReconnect = config.socket.autoReconnect;
        _this._autoConnect = config.socket.autoConnect;
        _this._lastRequestTime = 0;
        _this._loading = 0;
        _this.uploadObserver = new __WEBPACK_IMPORTED_MODULE_3__asset_observer__["default"]();
        _this._uploadingCounter = 0;
        _this.errors = {
            Disconnect: DisconnectError,
            Server: ServerError
        };
        _this.uploadBlob = function (blob, blobid, progress, cb) {
            if (_this._uploadingCounter > 3) {
                _this.uploadObserver.listenOnce(function () {
                    _this.uploadBlob(blob, blobid, progress, cb);
                }, "uploadFinished");
                return;
            }
            _this._uploadingCounter++;
            var uploader = new __WEBPACK_IMPORTED_MODULE_4__blobUploader_service__["a" /* default */](_this, blob, blobid);
            uploader.listen(function (doneBytes) {
                progress.progress(doneBytes);
            }, "progress");
            var uploadPromise = uploader.upload().then(function () {
                _this._uploadingCounter--;
                _this.uploadObserver.notify(blobid, "uploadFinished");
                _this.uploadObserver.notify(blobid, "uploadFinished:" + blobid);
            });
            return uploadPromise.nodeify(cb);
        };
        if (_this._autoConnect) {
            _this._connect();
        }
        if (_this._autoConnect && _this._autoReconnect) {
            window.setInterval(function () {
                try {
                    if (!_this._socket.connected) {
                        _this._socket.connect();
                    }
                }
                catch (e) {
                    socketError(e);
                }
            }, 10000);
        }
        return _this;
    }
    SocketService.prototype._connect = function () {
        var _this = this;
        this._socket = Object(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__["connect"])(this._domain, config.socket.options);
        this._socket.on("disconnect", function () {
            socketDebug("socket disconnected");
            _this._loading = 0;
            _this._uploadingCounter = 0;
        });
        this._socket.on("connect", function () {
            socketDebug("socket connected");
            _this.emit("whispeerPing", {});
            _this._socket.io.engine.on("heartbeat", function () {
                _this.notify(null, "heartbeat");
            });
        });
    };
    SocketService.prototype._emit = function (channel, request) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_bluebird__(function (resolve, reject) {
            var onDisconnect = function () {
                reject(new DisconnectError("Disconnected while sending"));
            };
            _this._socket.once("disconnect", onDisconnect);
            _this._socket.emit(channel, request, function (response) {
                _this._socket.off("disconnect", onDisconnect);
                resolve(response);
            });
        });
    };
    SocketService.prototype.getLoadingCount = function () {
        return this._loading;
    };
    ;
    SocketService.prototype.lastRequestTime = function () {
        return this._lastRequestTime;
    };
    ;
    SocketService.prototype.send = function (data) {
        this._socket.send(data);
    };
    SocketService.prototype.addInterceptor = function (interceptor) {
        this._interceptors.push(interceptor);
    };
    SocketService.prototype.isConnected = function () {
        return this._socket.connected;
    };
    SocketService.prototype.emit = function (channel, request, cb) {
        var _this = this;
        if (!this.isConnected()) {
            throw new DisconnectError("no connection");
        }
        var timer = log.timer("request on " + channel);
        var isBlobRequest = channel.indexOf("blob") === 0;
        request.version = APIVERSION;
        request.clientInfo = {"type":"messenger","version":"0.3.10","commit":"b82f06c\n"};
        if (isBlobRequest) {
            blobSocketDebug("Request on " + channel, request);
        }
        else {
            socketDebug("Request on " + channel, request);
        }
        this._interceptors.forEach(function (interceptor) {
            if (interceptor.transformRequest) {
                request = interceptor.transformRequest(request);
            }
        });
        this._loading++;
        this.notify(null, "request");
        return this._emit(channel, request).timeout(SOCKET_TIMEOUT).then(function (response) {
            if (isBlobRequest) {
                blobSocketDebug("Answer on " + channel, response);
            }
            else {
                socketDebug("Answer on " + channel, response);
            }
            log.timerEnd(timer);
            if (response.alert) {
                alert(response.alert);
            }
            _this._lastRequestTime = response.serverTime;
            _this._interceptors.forEach(function (interceptor) {
                if (interceptor.transformResponse) {
                    response = interceptor.transformResponse(response, request);
                }
            });
            if (response.error) {
                socketError(response);
                throw new ServerError("server returned an error!", { response: response });
            }
            if (!Object(__WEBPACK_IMPORTED_MODULE_5__location_manager__["c" /* isBusinessVersion */])()) {
                if (response.isBusiness) {
                    Object(__WEBPACK_IMPORTED_MODULE_5__location_manager__["a" /* goToBusinessVersion */])();
                }
            }
            return response;
        }).finally(function () {
            _this._loading--;
            _this.notify(null, "response");
        }).nodeify(cb);
    };
    SocketService.prototype.awaitNoRequests = function () {
        var _this = this;
        if (this._loading === 0) {
            return __WEBPACK_IMPORTED_MODULE_2_bluebird__["resolve"]();
        }
        return new __WEBPACK_IMPORTED_MODULE_2_bluebird__(function (resolve) {
            _this.listen(function () {
                if (_this._loading === 0) {
                    resolve();
                }
            }, "response");
        });
    };
    SocketService.prototype.awaitConnection = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_bluebird__(function (resolve) {
            if (_this.isConnected()) {
                resolve();
            }
            else {
                _this.once("connect", resolve);
            }
        });
    };
    SocketService.prototype.on = function (eventName, callback) {
        return this._socket.on(eventName, callback);
    };
    SocketService.prototype.once = function (eventName, callback) {
        return this._socket.once(eventName, callback);
    };
    /** definitly emits the request. might emit it multiple times! **/
    SocketService.prototype.definitlyEmit = function (channel, request) {
        var _this = this;
        var SOCKET_TIMEOUT = 10000;
        return this.awaitConnection().then(function () {
            return _this.emit(channel, request).timeout(SOCKET_TIMEOUT);
        }).catch(function (e) {
            console.error(e);
            return __WEBPACK_IMPORTED_MODULE_2_bluebird__["delay"](500).then(function () {
                return _this.definitlyEmit(channel, request);
            });
        });
    };
    SocketService.prototype.channel = function (channel, callback) {
        this._socket.on(channel, function (data) {
            socketDebug("received data on " + channel);
            socketDebug(data);
            callback(null, data);
        });
    };
    SocketService.errors = {
        Disconnect: DisconnectError,
        Server: ServerError
    };
    return SocketService;
}(__WEBPACK_IMPORTED_MODULE_3__asset_observer__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (new SocketService());
//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var h = __webpack_require__(6).default;
var config = __webpack_require__(61);
var Observer = __webpack_require__(16);
var keyStore = __webpack_require__(28);
var chelper = __webpack_require__(160);
var Bluebird = __webpack_require__(3);
var loaded = false,
    changed = false,
    isLoaded = {};

isLoaded.promise = new Bluebird(function (resolve) {
	isLoaded.promiseResolve = resolve;
});

function dataSetToHash(signature, hash, key) {
	var data = {
		signature: chelper.bits2hex(signature),
		signatureHash: chelper.bits2hex(hash),
		key: key
	};

	return keyStore.hash.hashObjectOrValueHex(data, config.hashVersion);
}

/*
	user:  signedKeys, signedFriendList, profile
	me: circle, trustManager, settings
	message: topic, message
	post: post, comment

	noCache: friendShip, removeFriend
*/

var types = {
	me: {
		maxCount: -1,
		saveID: true
	},
	user: {
		maxCount: 500,
		saveID: true
	},
	post: {
		maxCount: 100,
		saveID: false
	}
};

var cacheTypes = {
	signatureCache: "noCache",

	signedFriendList: "user",

	circle: "me",
	trustManager: "noCache",
	settings: "noCache",

	topicUpdate: "noCache",

	post: "post",
	postPrivate: "post",

	topic: "noCache",
	message: "noCache",

	profile: "noCache",
	signedKeys: "noCache",

	comment: "noCache",
	friendShip: "noCache",
	removeFriend: "noCache"
};

var Database = function Database(type, options) {
	this._type = type;

	this._maxCount = options.maxCount;
	this._saveID = options.saveID;

	this._signatures = {};
};

Database.prototype.getType = function () {
	return this._type;
};

Database.prototype.getCacheEntry = function (id) {
	var entry = {};
	if (this._maxCount > -1) {
		entry.date = new Date().getTime();
	}

	if (this._saveID && id) {
		entry.id = id;
	}

	return entry;
};

Database.prototype.allEntries = function () {
	return this.allSignatures().map(function (signatureHash) {
		var entry = h.deepCopyObj(this.getEntry(signatureHash));
		entry.signatureHash = signatureHash;
		return entry;
	}, this);
};

Database.prototype.getEntry = function (signatureHash) {
	return this._signatures[signatureHash];
};

Database.prototype.joinEntries = function (entries) {
	entries.forEach(function (entry) {
		var signatureHash = entry.signatureHash;

		delete entry.signatureHash;

		if (!this._signatures[signatureHash]) {
			this._signatures[signatureHash] = entry;
		}
	}, this);
};

Database.prototype.deleteByID = function (id) {
	if (!this._saveID || !id) {
		return;
	}

	this.allEntries().filter(function (entry) {
		return entry.id === id;
	}).forEach(function (entry) {
		this.deleteEntry(entry.signatureHash);
	}, this);
};

Database.prototype.deleteEntry = function (signatureHash) {
	delete this._signatures[signatureHash];
};

Database.prototype.addSignature = function (signature, hash, key, id) {
	if (!h.isRealID(key) || !h.isSignature(chelper.bits2hex(signature))) {
		throw new Error("invalid input");
	}

	var sHash = dataSetToHash(signature, hash, key);

	changed = true;

	this.deleteByID(id);
	this._signatures[sHash] = this.getCacheEntry(id);

	this.cleanUp();
};

Database.prototype.hasEntry = function (signatureHash) {
	if (this._signatures[signatureHash]) {
		return true;
	}

	return false;
};

Database.prototype.hasSignature = function (signature, hash, key) {
	var sHash = dataSetToHash(signature, hash, key);
	return this.hasEntry(sHash);
};

Database.prototype.cleanUp = function () {
	if (this._maxCount === -1) {
		return;
	}

	var entries = this.allEntries();
	if (entries.length <= this._maxCount) {
		return;
	}

	console.log("Cleaning up database of type " + this._type + " (" + entries.length + ")");

	entries.sort(function (a, b) {
		return a.date - b.date;
	});

	entries.slice(0, entries.length - this._maxCount).forEach(function (entry) {
		this.deleteEntry(entry.signatureHash);
	}, this);
};

Database.prototype.allSignatures = function () {
	return Object.keys(this._signatures);
};

var allDatabases = [];
h.objectEach(types, function (name, val) {
	types[name] = new Database(name, val);
	allDatabases.push(types[name]);
});

var signatureCache = {
	awaitLoading: function awaitLoading() {
		return isLoaded.promise;
	},
	/**
  * Has the signature cache changed? (was a signature added/removed?)
  */
	isChanged: function isChanged() {
		return changed;
	},
	resetChanged: function resetChanged() {
		changed = false;
	},
	isLoaded: function isLoaded() {
		return loaded;
	},
	/**
  * Load a given signature cache
  * @param signatureCacheData signature cache data to load.
  * @param ownKey own signing key
  */
	load: function load(signatureCacheData, ownKey) {
		if (signatureCacheData.internalHashVersion !== config.hashVersion) {
			console.warn("resetting signature cache to upgrade to new hash version");
			signatureCache.initialize(ownKey);

			return;
		}

		if (signatureCacheData.me !== ownKey) {
			console.warn("not my signature cache");
			signatureCache.initialize(ownKey);

			return;
		}

		signatureCacheData.databases.forEach(function (db) {
			if (!types[db.type]) {
				return;
			}

			types[db.type].joinEntries(db.entries);
		});

		signatureCache.initialize(ownKey);
	},
	/**
  * Initialize cache
  * @param ownKey id of the own sign key
  */
	initialize: function initialize() {
		loaded = true;

		isLoaded.promiseResolve();
	},
	/**
  * Get the signed updated version of this signature cache
  */
	getUpdatedVersion: function getUpdatedVersion() {
		if (!loaded) {
			return Bluebird.reject("Signature Cache not yet loaded!");
		}

		var databases = allDatabases.map(function (db) {
			return {
				type: db.getType(),
				entries: db.allEntries()
			};
		});

		var data = {
			internalHashVersion: config.hashVersion,
			databases: databases
		};

		return Bluebird.resolve(data);
	},
	/**
  * Check if a signature is in the cache
  * @param signature the signature to check for
  * @param hash hash that was signed
  * @param key key that was used to sign the signature
  */
	isValidSignatureInCache: function isValidSignatureInCache(signature, hash, key) {
		var sHash = dataSetToHash(signature, hash, key);

		return allDatabases.filter(function (database) {
			return database.hasEntry(sHash);
		}).length > 0;
	},
	/**
  * Add a valid signature to the cache.
  * @param signature the signature to add
  * @param hash the hash that was signed by the signature
  * @param key the key used to verify the signature
  * @param type type of the signed object
  * @param (id) id of the signed object
  */
	addValidSignature: function addValidSignature(signature, hash, key, type, id) {
		if (!h.isRealID(key) || !h.isSignature(chelper.bits2hex(signature))) {
			throw new Error("invalid input");
		}

		var reducedType = cacheTypes[type];

		if (!reducedType) {
			console.warn("unknown type: " + type);
			return;
		}

		if (reducedType === "noCache") {
			return;
		}

		if (id) {
			id = type + "-" + id;
		}

		var db = types[reducedType];
		db.addSignature(signature, hash, key, id);
	}
};

Observer.extend(signatureCache);

module.exports = signatureCache;

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asset_observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_error_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_Cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_session_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__messages_chatChunk__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__messages_chat__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__messages_message__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__messages_chatList__ = __webpack_require__(445);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var initService = __webpack_require__(20);




new __WEBPACK_IMPORTED_MODULE_5__services_Cache__["default"]("messageSend").deleteAll();
var activeChat = 0;
var messageService = {
    notify: null,
    allChatsLoaded: false,
    prependChatID: function (chatID) {
        if (!__WEBPACK_IMPORTED_MODULE_10__messages_chatList__["a" /* default */].isLoaded(__WEBPACK_IMPORTED_MODULE_6__services_session_service__["default"].getUserID())) {
            return;
        }
        var chatList = __WEBPACK_IMPORTED_MODULE_10__messages_chatList__["a" /* default */].getLoaded(__WEBPACK_IMPORTED_MODULE_6__services_session_service__["default"].getUserID());
        var chatIDs = chatList.get();
        chatList.set([
            chatID
        ].concat(chatIDs.filter(function (id) { return id !== chatID; })));
    },
    addSocketData: function (data) {
        var _this = this;
        if (!data) {
            return __WEBPACK_IMPORTED_MODULE_2_bluebird__["resolve"]();
        }
        return __WEBPACK_IMPORTED_MODULE_2_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var chat, chunk, chat, chunk, chat, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data.chat) return [3 /*break*/, 2];
                        console.warn("Add chat");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_8__messages_chat__["b" /* default */].load(data.chat)];
                    case 1:
                        chat = _a.sent();
                        messageService.prependChatID(chat.getID());
                        _a.label = 2;
                    case 2:
                        if (!data.chunk) return [3 /*break*/, 5];
                        console.warn("Add chunk");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_7__messages_chatChunk__["b" /* default */].load(data.chunk)];
                    case 3:
                        chunk = _a.sent();
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_8__messages_chat__["b" /* default */].get(chunk.getChatID())];
                    case 4:
                        chat = _a.sent();
                        chat.addChunkID(chunk.getID());
                        messageService.prependChatID(chat.getID());
                        _a.label = 5;
                    case 5:
                        if (!data.message) return [3 /*break*/, 9];
                        console.warn("Add message");
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_7__messages_chatChunk__["b" /* default */].get(data.message.server.chunkID)];
                    case 6:
                        chunk = _a.sent();
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_8__messages_chat__["b" /* default */].get(chunk.getChatID())];
                    case 7:
                        chat = _a.sent();
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_9__messages_message__["b" /* default */].load(data.message)];
                    case 8:
                        message = _a.sent();
                        chat.addMessage(message);
                        if (!message.isOwn()) {
                            chat.addUnreadMessage(message.getServerID());
                        }
                        else if (chat.getLatestMessage() === message.getClientID()) {
                            chat.localMarkRead();
                        }
                        messageService.prependChatID(chat.getID());
                        messageService.notify({ message: message, chat: chat, chunk: chunk }, "message");
                        _a.label = 9;
                    case 9: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_bluebird__["resolve"]()];
                    case 10:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    },
    getChatIDs: function () {
        var myID = __WEBPACK_IMPORTED_MODULE_6__services_session_service__["default"].getUserID();
        if (!__WEBPACK_IMPORTED_MODULE_10__messages_chatList__["a" /* default */].isLoaded(myID)) {
            return [];
        }
        return __WEBPACK_IMPORTED_MODULE_10__messages_chatList__["a" /* default */].getLoaded(myID).get();
    },
    setActiveChat: function (_activeChat) {
        activeChat = _activeChat;
    },
    isActiveChat: function (chatID) {
        return chatID === activeChat;
    },
    loadMoreChats: __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].cacheUntilSettled(function (count) {
        if (count === void 0) { count = 20; }
        return initService.awaitLoading().then(function () {
            return __WEBPACK_IMPORTED_MODULE_10__messages_chatList__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_6__services_session_service__["default"].getUserID());
        }).then(function () {
            var unloadedChatIDs = messageService.getChatIDs().filter(function (chatID) {
                return !__WEBPACK_IMPORTED_MODULE_8__messages_chat__["b" /* default */].isLoaded(chatID);
            });
            if (unloadedChatIDs.length === 0) {
                messageService.allChatsLoaded = true;
            }
            return unloadedChatIDs.slice(0, count);
        }).map(function (chatID) {
            return __WEBPACK_IMPORTED_MODULE_8__messages_chat__["b" /* default */].get(chatID);
        });
    }),
    sendUnsentMessages: function () {
        var unsentMessages = new __WEBPACK_IMPORTED_MODULE_5__services_Cache__["default"]("unsentMessages", { maxEntries: -1, maxBlobSize: -1 });
        return unsentMessages.all().map(function (unsentMessage) {
            var data = JSON.parse(unsentMessage.data);
            return messageService.getChat(data.chatID).then(function (chat) {
                return chat.sendUnsentMessage(data, unsentMessage.blobs);
            });
        });
    },
    getChat: function (chatID, cb) {
        return __WEBPACK_IMPORTED_MODULE_2_bluebird__["try"](function () {
            return __WEBPACK_IMPORTED_MODULE_8__messages_chat__["b" /* default */].get(chatID);
        }).nodeify(cb);
    },
    getUserChat: function (uid, cb) {
        return initService.awaitLoading().then(function () {
            return __WEBPACK_IMPORTED_MODULE_4__services_socket_service__["default"].definitlyEmit("chat.getChatWithUser", {
                userID: uid
            });
        }).then(function (data) {
            if (data.chatID) {
                return data.chatID;
            }
            return false;
        }).nodeify(cb);
    }
};
__WEBPACK_IMPORTED_MODULE_1__asset_observer__["default"].extend(messageService);
__WEBPACK_IMPORTED_MODULE_4__services_socket_service__["default"].channel("notify.chat", function (e, data) {
    if (!e) {
        messageService.addSocketData(data);
    }
    else {
        __WEBPACK_IMPORTED_MODULE_3__services_error_service__["default"].criticalError(e);
    }
});
initService.awaitLoading().then(function () {
    messageService.sendUnsentMessages();
});
/* harmony default export */ __webpack_exports__["a"] = (messageService);
//# sourceMappingURL=messageService.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return replaceView; });
var replaceView = function (navCtrl, view, params, count, options) {
    if (count === void 0) { count = 1; }
    navCtrl.push(view, params, options).then(function () {
        navCtrl.remove(navCtrl.length() - count - 1, count);
    });
};
//# sourceMappingURL=angularUtils.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);


var afterHooks = [];
var Observer = (function () {
    function Observer() {
        this._listeners = {};
        this._listenersOnce = {};
    }
    Observer.addAfterHook = function (listener) {
        afterHooks.push(listener);
    };
    ;
    Observer.prototype.listenOnce = function (fn, type) {
        type = type || "any";
        if (typeof this._listenersOnce[type] === "undefined") {
            this._listenersOnce[type] = [];
        }
        this._listenersOnce[type].push(fn);
    };
    Observer.prototype.listenPromise = function (type) {
        var that = this;
        return new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (resolve) {
            that.listenOnce(resolve, type);
        });
    };
    Observer.prototype.listen = function (fn, type) {
        type = type || "any";
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        this._listeners[type].push(fn);
    };
    Observer.prototype.notify = function (data, type, returnF) {
        type = type || "any";
        if (!returnF) {
            returnF = function () { };
        }
        var listeners = this._listeners[type] || [];
        var listenersOnce = this._listenersOnce[type] || [];
        var subscribers = (listeners).concat(listenersOnce);
        this._listenersOnce[type] = [];
        var result = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].callEach(subscribers, [data], returnF);
        if (type !== "any") {
            result = returnF(this.notify(data), result);
        }
        __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].callEach(afterHooks);
        return result;
    };
    Observer.extend = function (obj) {
        var internalObserver = new Observer();
        obj.notify = internalObserver.notify.bind(internalObserver);
        obj.listenOnce = internalObserver.listenOnce.bind(internalObserver);
        obj.listenPromise = internalObserver.listenPromise.bind(internalObserver);
        obj.listen = internalObserver.listen.bind(internalObserver);
    };
    return Observer;
}());
/* harmony default export */ __webpack_exports__["default"] = (Observer);
var extend = function (obj) {
    Observer.extend(obj);
};
//# sourceMappingURL=observer.js.map

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sjcl = __webpack_require__(45);
var h = __webpack_require__(6).default;
var errors = __webpack_require__(42);
var helper = {
    hash: function hash(text) {
        return helper.bits2hex(sjcl.hash.sha256.hash(text));
    },
    hashPW: function hashPW(pw, salt) {
        return helper.bits2hex(sjcl.hash.sha256.hash(pw + salt));
    },
    getCurveName: function getCurveName(curve) {
        var curcurve;
        for (curcurve in sjcl.ecc.curves) {
            if (sjcl.ecc.curves.hasOwnProperty(curcurve)) {
                if (sjcl.ecc.curves[curcurve] === curve) {
                    return curcurve;
                }
            }
        }

        throw new Error("curve not existing");
    },
    getCurve: function getCurve(curveName) {
        if (typeof curveName !== "string" || curveName.substr(0, 1) !== "c") {
            curveName = "c" + curveName;
        }

        if (sjcl.ecc.curves[curveName]) {
            return sjcl.ecc.curves[curveName];
        }

        throw new Error("invalidCurve");
    },
    hex2bits: function hex2bits(t) {
        if (t instanceof Array) {
            return t;
        }

        if (h.isHex(t)) {
            return sjcl.codec.hex.toBits(t);
        }

        //TODO
        throw new errors.InvalidHexError();
    },
    bits2hex: function bits2hex(t) {
        if (typeof t === "string") {
            return t;
        }

        return sjcl.codec.hex.fromBits(t);
    },
    sjclPacket2Object: function sjclPacket2Object(decoded) {
        var result = {
            ct: helper.bits2hex(decoded.ct),
            iv: helper.bits2hex(decoded.iv)
        };

        if (decoded.salt) {
            result.salt = helper.bits2hex(decoded.salt);
        }

        return result;
    },
    Object2sjclPacket: function Object2sjclPacket(data) {
        if (typeof data.salt === "string") {
            data.salt = helper.hex2bits(data.salt);
        }

        if (typeof data.iv === "string") {
            data.iv = helper.hex2bits(data.iv);
        }

        if (typeof data.ct === "string") {
            data.ct = helper.hex2bits(data.ct);
        }

        return sjcl.json.encode(data);
    }
};

module.exports = helper;

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileLoader", function() { return ProfileLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_cachedObjectLoader__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__asset_observer__ = __webpack_require__(16);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var validator = __webpack_require__(198);




var PROFILE_SECUREDDATA_OPTIONS = {
    type: "profile",
    removeEmpty: true,
    encryptDepth: 1
};
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile(data, options) {
        var _this = _super.call(this) || this;
        _this.checkProfile = function () {
            var err = validator.validate("profile", _this.securedData.contentGet());
            if (err) {
                throw err;
            }
        };
        _this.getID = function () {
            if (!_this.id) {
                return;
            }
            return _this.isPublicProfile ? "public-" + _this.id : "private-" + _this.id;
        };
        _this.sign = function (signKey, cb) {
            if (!_this.isPublicProfile) {
                throw new Error("please encrypt private profiles!");
            }
            return _this.securedData.sign(signKey).then(function (signedMeta) {
                return {
                    content: _this.securedData.contentGet(),
                    meta: signedMeta
                };
            }).nodeify(cb);
        };
        _this.signAndEncrypt = function (signKey, cryptKey) {
            if (_this.isPublicProfile) {
                throw new Error("no encrypt for public profiles!");
            }
            return _this.securedData.signAndEncrypt(signKey, cryptKey);
        };
        _this.updated = function () {
            return _this.securedData.updated();
        };
        _this.changed = function () {
            return _this.securedData.isChanged();
        };
        _this.setFullProfile = function (data) {
            _this.securedData.contentSet(data);
        };
        _this.setAttribute = function (attr, value) {
            _this.securedData.contentSetAttr(attr, value);
            return __WEBPACK_IMPORTED_MODULE_2_bluebird__["resolve"]();
        };
        _this.removeAttribute = function (attr) {
            _this.securedData.contentRemoveAttr(attr);
        };
        _this.getFull = function () {
            return _this.securedData.contentGet();
        };
        _this.getAttribute = function (attrs) {
            return __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].deepGet(_this.securedData.contentGet(), attrs);
        };
        options = options || {};
        _this.isPublicProfile = options.isPublicProfile === true;
        _this.securedData = new __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__["SecuredData"](data.content, data.meta, PROFILE_SECUREDDATA_OPTIONS, true);
        _this.checkProfile();
        if (data.profileid) {
            _this.id = data.profileid;
        }
        return _this;
    }
    return Profile;
}(__WEBPACK_IMPORTED_MODULE_4__asset_observer__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Profile);
var ProfileLoader = (function (_super) {
    __extends(ProfileLoader, _super);
    function ProfileLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProfileLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_3__services_cachedObjectLoader__["a" /* default */])({
    cacheName: "profile",
    getID: function (_a) {
        var meta = _a.meta, signKey = _a.signKey;
        return signKey + "-" + meta._signature;
    },
    download: function () { throw new Error("profile get by id is not implemented"); },
    load: function (_a) {
        var content = _a.content, meta = _a.meta, isPublic = _a.isPublic, signKey = _a.signKey;
        var securedData = isPublic ?
            new __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__["SecuredData"](content, meta, PROFILE_SECUREDDATA_OPTIONS, true) :
            __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__["default"].load(content, meta, PROFILE_SECUREDDATA_OPTIONS);
        return __WEBPACK_IMPORTED_MODULE_2_bluebird__["all"]([
            securedData.verifyAsync(signKey),
            isPublic ? null : securedData.decrypt()
        ]).then(function () { return ({
            profile: {
                content: securedData.contentGet(),
                meta: securedData.metaGet(),
            },
            options: {
                signKey: signKey,
                isPublic: isPublic
            }
        }); });
    },
    restore: function (_a) {
        var profile = _a.profile, options = _a.options;
        return new Profile(profile, options);
    }
})));

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_service__ = __webpack_require__(19);


var FeatureToggles = (function () {
    function FeatureToggles() {
        var _this = this;
        this.config = {};
        this.loadToggles = function () {
            return __WEBPACK_IMPORTED_MODULE_0__socket_service__["default"].definitlyEmit("featureToggles", {})
                .then(function (response) { return response.toggles ? _this.config = response.toggles : null; });
        };
        __WEBPACK_IMPORTED_MODULE_1__session_service__["default"].bootLogin()
            .then(function () { return _this.loadToggles(); });
        __WEBPACK_IMPORTED_MODULE_1__session_service__["default"].awaitLogin()
            .then(function () { return _this.loadToggles(); });
    }
    FeatureToggles.prototype.isFeatureEnabled = function (featureName) {
        if (!this.config.hasOwnProperty(featureName)) {
            // console.warn(`Unknown feature: ${featureName}`)
            return false;
        }
        if (this.config[featureName] === false) {
            return false;
        }
        return true;
    };
    FeatureToggles.prototype.getFeatureConfig = function (featureName) {
        return this.config[featureName];
    };
    return FeatureToggles;
}());
/* harmony default export */ __webpack_exports__["a"] = (new FeatureToggles());
//# sourceMappingURL=featureToggles.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_helper__ = __webpack_require__(6);




var debug = __webpack_require__(15);
var keyStore = __webpack_require__(28);
var MAXCACHETIME = 7 * 24 * 60 * 60 * 1000;
var keyStoreDebug = debug("whispeer:keyStore");
var THROTTLE = 20;
var RequestKeyService = (function () {
    function RequestKeyService() {
        var _this = this;
        this.MAXCACHETIME = MAXCACHETIME;
        this.cleanCache = function () {
            return _this.keyCache.all().each(function (cacheEntry) {
                var data = JSON.parse(cacheEntry.data);
                if (data.removeAfter < new Date().getTime()) {
                    keyStoreDebug("remove by time: " + data.removeAfter);
                    _this.keyCache.delete(cacheEntry.id.split("/")[1]);
                }
            });
        };
        this.removeByObjectId = function (keyID, objectID) {
            //remove keys with same objectID
            return _this.keyCache.all().each(function (cacheEntry) {
                var data = JSON.parse(cacheEntry.data);
                if (objectID === data.objectID && keyID !== data.key.realid) {
                    keyStoreDebug("remove by object id: " + objectID);
                    return _this.keyCache.delete(_this.idTransform(keyID));
                }
            });
        };
        this.loadKeys = function (identifiers, cb) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
                var toLoadIdentifiers = identifiers.filter(function (e) {
                    return !keyStore.upload.isKeyLoaded(e);
                });
                if (toLoadIdentifiers.length === 0) {
                    return identifiers;
                }
                return __WEBPACK_IMPORTED_MODULE_1__socket_service__["default"].definitlyEmit("key.getMultiple", {
                    loaded: [],
                    realids: identifiers
                }).thenReturn(identifiers);
            }).nodeify(cb);
        };
        this.getKey = function (keyID, cb) {
            if (typeof keyID !== "string") {
                throw new Error("not a valid key realid: " + keyID);
            }
            if (keyStore.upload.isKeyLoaded(keyID)) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]().nodeify(cb);
            }
            keyStoreDebug("loading key: " + keyID);
            return _this.keyCache.get(_this.idTransform(keyID)).then(function (cacheEntry) {
                if (cacheEntry.data.removeAfter < new Date().getTime()) {
                    keyStoreDebug("Remove Key from Cache " + keyID);
                    _this.keyCache.delete(keyID);
                }
                keyStore.upload.addKey(cacheEntry.data.key);
            }).catch(function () {
                keyStoreDebug("key cache miss: " + keyID);
                return _this.delayAsync(keyID);
            }).nodeify(cb);
        };
        this.cacheKey = function (realID, objectID, time) {
            time = Math.min(time, MAXCACHETIME);
            return _this.removeByObjectId(realID, objectID).then(function () {
                var keyData = keyStore.upload.getExistingKey(realID);
                if (!keyData) {
                    keyStoreDebug("Could not cache key yet " + realID);
                    return;
                }
                return _this.keyCache.store(_this.idTransform(realID), {
                    key: keyData,
                    objectID: objectID,
                    removeAfter: new Date().getTime() + time
                });
            });
        };
        window.setTimeout(this.cleanCache, 30 * 1000);
        window.setInterval(this.cleanCache, 10 * 60 * 1000);
        this.keyCache = new __WEBPACK_IMPORTED_MODULE_2__Cache__["default"]("keys");
        this.delay = __WEBPACK_IMPORTED_MODULE_3__helper_helper__["default"].delayMultiple(THROTTLE, this.loadKeys);
        this.delayAsync = __WEBPACK_IMPORTED_MODULE_0_bluebird__["promisify"](this.delay);
    }
    RequestKeyService.prototype.idTransform = function (ID) {
        return ID;
    };
    return RequestKeyService;
}());
/* harmony default export */ __webpack_exports__["a"] = (new RequestKeyService());
//# sourceMappingURL=requestKey.service.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionService", function() { return SessionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asset_blobCache__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asset_observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_Cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__keyStore_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__location_manager__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__storage_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helper_helper__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








var SessionService = (function (_super) {
    __extends(SessionService, _super);
    function SessionService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sid = "";
        _this.loggedin = false;
        _this.sessionStorage = Object(__WEBPACK_IMPORTED_MODULE_6__storage_service__["withPrefix"])("whispeer.session");
        _this.loginPromise = new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (loginResolve) {
            _this.loginResolve = loginResolve;
        });
        _this.saveSession = function () {
            _this.sessionStorage.set("sid", _this.sid);
            _this.sessionStorage.set("userid", _this.userid);
            _this.sessionStorage.set("loggedin", true);
        };
        _this.setLoginData = function (_sid, _userid) {
            _this.sid = _sid;
            _this.userid = parseInt(_userid, 10);
            _this.loggedin = true;
            _this.loginResolve();
        };
        _this.awaitLogin = function () {
            return _this.loginPromise;
        };
        _this.setPassword = function (password) {
            __WEBPACK_IMPORTED_MODULE_4__keyStore_service__["default"].security.setPassword(password);
            _this.sessionStorage.set("password", password);
        };
        _this.bootLogin = __WEBPACK_IMPORTED_MODULE_7__helper_helper__["default"].cacheResult(function () { return _this.loadLogin(); });
        _this.loadLogin = function () {
            return _this.sessionStorage.awaitLoading().then(function () {
                var loggedin = _this.sessionStorage.get("loggedin") === "true" && _this.sessionStorage.get("password");
                if (!loggedin) {
                    return _this.clear().thenReturn(false);
                }
                _this.notify(null, "login");
                _this.setPassword(_this.sessionStorage.get("password"));
                _this.setLoginData(_this.sessionStorage.get("sid"), _this.sessionStorage.get("userid"));
                return true;
            });
        };
        _this.getSID = function () {
            return _this.sid;
        };
        _this.getUserID = function () { return _this.userid; };
        _this.isOwnUserID = function (id) { return parseInt(id, 10) === _this.userid; };
        _this.clear = function () {
            _this.notify(null, "logout");
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
                __WEBPACK_IMPORTED_MODULE_1__asset_blobCache__["a" /* default */].clear(),
                _this.sessionStorage.clear(),
                __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](__WEBPACK_IMPORTED_MODULE_3__services_Cache__["default"].deleteDatabase()),
            ].map(function (p) { return p.reflect(); }));
        };
        _this.logout = function () {
            _this.clear().finally(__WEBPACK_IMPORTED_MODULE_5__location_manager__["f" /* landingPage */]);
        };
        _this.isLoggedin = function () {
            return _this.loggedin;
        };
        return _this;
    }
    return SessionService;
}(__WEBPACK_IMPORTED_MODULE_2__asset_observer__["default"]));

/* harmony default export */ __webpack_exports__["default"] = (new SessionService());
//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sjcl = __webpack_require__(45);
var chelper = {
	getCurveName: function getCurveName(curve) {
		var curcurve;
		for (curcurve in sjcl.ecc.curves) {
			if (sjcl.ecc.curves.hasOwnProperty(curcurve)) {
				if (sjcl.ecc.curves[curcurve] === curve) {
					return curcurve;
				}
			}
		}

		throw "curve not existing";
	},
	getCurve: function getCurve(curveName) {
		if (typeof curveName !== "string" || curveName.substr(0, 1) !== "c") {
			curveName = "c" + curveName;
		}

		if (sjcl.ecc.curves[curveName]) {
			return sjcl.ecc.curves[curveName];
		}

		throw new Error("invalid curve");
	},
	isHex: function isHex(data) {
		return data && typeof data === "string" && !!data.match(/^[A-Fa-f0-9]*$/);
	},
	hex2bits: function hex2bits(t) {
		if (t instanceof Array) {
			return t;
		}

		return sjcl.codec.hex.toBits(t);
	},
	bits2hex: function bits2hex(t) {
		if (typeof t === "string") {
			return t;
		}

		return sjcl.codec.hex.fromBits(t);
	}
};

module.exports = chelper;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export InternalSymbol */
function copyOwnFrom(target, source) {
    Object.getOwnPropertyNames(source).forEach(function (propName) {
        Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
    });
    return target;
}
var InternalSymbol = (function () {
    function InternalSymbol(name, props) {
        this.name = name;
        if (props) {
            copyOwnFrom(this, props);
        }
        if (Object.freeze) {
            Object.freeze(this);
        }
    }
    InternalSymbol.prototype.toString = function () {
        return "|" + this.name + "|";
    };
    return InternalSymbol;
}());

var Enum = (function () {
    function Enum(obj) {
        if (Array.isArray(obj)) {
            obj.forEach(function (name) {
                this[name] = new InternalSymbol(name);
            }, this);
        }
        else {
            Object.keys(obj).forEach(function (name) {
                this[name] = new InternalSymbol(name, obj[name]);
            }, this);
        }
    }
    Enum.prototype.toString = function (symbol) {
        if (this.contains(symbol)) {
            return symbol.toString();
        }
        throw new Error("symbol not part of this enum");
    };
    ;
    Enum.prototype.fromString = function (name) {
        if (name.substr(0, 1) === "|" && name.substr(-1, 1) === "|") {
            var sym = this[name.substring(1, name.length - 1)];
            if (sym instanceof InternalSymbol) {
                return sym;
            }
        }
        return null;
    };
    ;
    Enum.prototype.symbols = function () {
        var _this = this;
        return Object.keys(this).map(function (key) { return _this[key]; });
    };
    ;
    Enum.prototype.symbolPosition = function (symbol) {
        return this.symbols().indexOf(symbol);
    };
    ;
    Enum.prototype.contains = function (sym) {
        return this[sym.name] === sym;
    };
    ;
    return Enum;
}());
/* harmony default export */ __webpack_exports__["a"] = (Enum);
//# sourceMappingURL=enum.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Bluebird = __webpack_require__(3);

var friendsService = __webpack_require__(87);
var keyStore = __webpack_require__(34).default;

function fixInvalidKey(invalidKey, friendsService) {
	var userid;

	return Bluebird.try(function () {
		userid = friendsService.getUserForKey(invalidKey);
		return friendsService.removeFriend(userid);
	}).then(function () {
		return friendsService.friendship(userid);
	}).then(function () {
		console.log("fixed invalid key: " + invalidKey);
	});
}

module.exports = function () {
	var friendsKeys;

	return friendsService.awaitLoading().then(function () {
		friendsKeys = friendsService.getAllFriendShipKeys();
		return keyStore.upload.preLoadMultiple(friendsKeys);
	}).then(function () {
		var invalidKeys = friendsKeys.filter(function (realid) {
			return !keyStore.upload.isKeyLoaded(realid);
		});

		if (invalidKeys.length === 0) {
			return true;
		} else {
			return invalidKeys.reduce(function (previous, invalidKey) {
				return previous.then(function () {
					return fixInvalidKey(invalidKey, friendsService);
				});
			}, Bluebird.resolve());
		}
	}).then(function () {
		return true;
	});
};

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
	"use strict";

	var h;

	var validations = {};

	function doValidate(ref, data) {
		if (ref) {
			var theError;
			/*amanda.validate(data, ref, function (err) {
   	theError = err;
   });*/

			return theError;
		} else {
			throw new Error("unregistered validation");
		}
	}

	var validator = {
		addAttribute: function addAttribute(name, cb) {
			// jsonSchemaValidator.addAttribute(name, cb);
		},
		register: function register(name, obj) {
			if (validations[name]) {
				throw new Error("double registered validations: " + name);
			}

			validations[name] = obj;
		},
		validate: function validate(name, data) {
			if (validations[name]) {
				var result = doValidate(validations[name], data);
				if (result) {
					console.error(result);
				}
				return result;
			} else {
				throw new Error("unregistered validation: " + name);
			}
		}
	};

	function amandaLoaded(am, helper, profileV, profileEncryptedV, postV, messageV, topicV, topicCreateV, circleV) {
		h = helper;

		validator.register("profile", profileV);
		validator.register("profileEncrypted", profileEncryptedV);
		validator.register("post", postV);
		validator.register("message", messageV);
		validator.register("topic", topicV);
		validator.register("topicCreate", topicCreateV);
		validator.register("circle", circleV);

		/**
   * EvenAttribute
   *
   * @param {string} property
   * @param {any} propertyValue
   * @param {any} attributeValue
   * @param {object} propertyAttributes
   * @param {function} callback
   */
		var hexAttribute = function hexAttribute(property, propertyValue, attributeValue, propertyAttributes, callback) {

			// If ‘even: true’
			if (attributeValue) {
				if (!h.isHex(propertyValue)) {
					this.addError();
				}
			}

			// Continue...
			return callback();
		};
	}

	var modules = [];

	modules.push(__webpack_require__(379));
	modules.push(__webpack_require__(6));
	modules.push(__webpack_require__(380));
	modules.push(__webpack_require__(381));
	modules.push(__webpack_require__(382));
	modules.push(__webpack_require__(383));
	modules.push(__webpack_require__(384));
	modules.push(__webpack_require__(385));
	modules.push(__webpack_require__(386));

	amandaLoaded.apply(null, modules);

	module.exports = validator;
})();

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**.
* MessageService
**/

var h = __webpack_require__(6).default;
var Observer = __webpack_require__(16);
var SecuredData = __webpack_require__(26).default;
var Bluebird = __webpack_require__(3);

var socket = __webpack_require__(10).default;
var keyStore = __webpack_require__(34).default;
var initService = __webpack_require__(20);

var settingsService = __webpack_require__(48).default;

var friendsService = __webpack_require__(87);

var circles = {};
var circleArray = [];
var circleData = [];

function encryptKeyForUsers(key, users, cb) {
	return Bluebird.resolve(users).map(h.parseDecimal).map(function (userID) {
		if (!friendsService.getUserFriendShipKey(userID)) {
			throw new Error("no friend key for user: " + userID);
		}

		return friendsService.getUserFriendShipKey(userID);
	}).map(function (friendKey) {
		return keyStore.sym.symEncryptKey(key, friendKey).thenReturn(friendKey);
	}).nodeify(cb);
}

function generateNewKey(cb) {
	return keyStore.sym.generateKey(null, "CircleKey").then(function (key) {
		var userService = __webpack_require__(9).default;
		var mainKey = userService.getOwn().getMainKey();

		return keyStore.sym.symEncryptKey(key, mainKey).thenReturn(key);
	}).nodeify(cb);
}

var Circle = function Circle(data) {
	var id = data.id,
	    theCircle = this,
	    persons = [];

	var circleSec = SecuredData.load(data.content, data.meta, { type: "circle" });
	var circleUsers = circleSec.metaAttr("users").map(h.parseDecimal);

	this.getID = function getIDF() {
		return id;
	};

	this.getUserIDs = function () {
		return circleUsers;
	};

	this.hasUser = function (uid) {
		return circleUsers.indexOf(h.parseDecimal(uid)) !== -1;
	};

	this.getKey = function () {
		return circleSec.metaAttr("circleKey");
	};

	this.remove = function (cb) {
		return settingsService.removeCircle().then(function () {
			return socket.emit("circle.delete", {
				remove: {
					circleid: id
				}
			});
		}).then(function () {
			var circle = circles[id];
			delete circles[id];
			h.removeArray(circleArray, circle);
			h.removeArray(circleData, circle.data);
		}).nodeify(cb);
	};

	this.setUser = function (uids, cb) {
		var newKey,
		    oldKey = circleSec.metaAttr("circleKey"),
		    removing = false,
		    friendKeys;

		return Bluebird.try(function () {
			uids = uids.map(h.parseDecimal);
			removing = h.arraySubtract(circleUsers, uids).length > 0;

			if (removing) {
				return generateNewKey();
			}

			return oldKey;
		}).then(function (_newKey) {
			newKey = _newKey;

			if (removing) {
				return keyStore.sym.symEncryptKey(oldKey, newKey).thenReturn(newKey);
			}

			return newKey;
		}).then(function (newKey) {
			if (removing) {
				return encryptKeyForUsers(newKey, uids);
			} else {
				return encryptKeyForUsers(newKey, h.arraySubtract(uids, circleUsers));
			}
		}).then(function (_friendKeys) {
			friendKeys = _friendKeys;
			circleSec.metaSet({
				users: uids,
				circleKey: newKey
			});

			var userService = __webpack_require__(9).default;
			return circleSec.getUpdatedData(userService.getOwn().getSignKey());
		}).then(function (newData) {
			var update = {
				id: id,
				content: newData.content,
				meta: newData.meta
			};

			if (removing) {
				update.decryptors = keyStore.upload.getDecryptors([oldKey], [newKey]);
				update.key = keyStore.upload.getKey(newKey);
			} else {
				update.decryptors = keyStore.upload.getDecryptors([newKey], friendKeys);
			}

			return socket.emit("circle.update", { update: update });
		}).then(function () {
			//emit
			circleUsers = uids;
			persons = persons.filter(function (user) {
				return uids.indexOf(user.id) > -1;
			});
			theCircle.data.persons = persons;
			theCircle.data.userids = circleUsers;

			if (removing) {
				var userService = __webpack_require__(9).default;
				var ownUser = userService.getOwn();

				//rebuild profiles
				return ownUser.uploadChangedProfile();
			}
		}).then(function () {
			return theCircle.loadPersons();
		}).nodeify(cb);
	};

	this.removePersons = function (uids, cb) {
		uids = uids.map(h.parseDecimal).filter(function (e) {
			return circleUsers.indexOf(e) > -1;
		});

		var users = circleUsers.filter(function (e) {
			return uids.indexOf(e) === -1;
		});

		this.setUser(users, cb);
	};

	this.addPersons = function (uids, cb) {
		return Bluebird.resolve(uids).bind(this).filter(function (uid) {
			return circleUsers.indexOf(uid) === -1;
		}).then(function (uids) {
			this.setUser(uids.concat(circleUsers), cb);
		});
	};

	this.load = function (cb) {
		var userService = __webpack_require__(9).default;
		return Bluebird.all([circleSec.decrypt(), circleSec.verify(userService.getOwn().getSignKey(), undefined, id)]).spread(function (content) {
			keyStore.security.addEncryptionIdentifier(circleSec.metaAttr("circleKey"));
			theCircle.data.name = content.name;
		}).nodeify(cb);
	};

	this.loadPersons = function (cb, limit) {
		limit = limit || 20;
		limit = Math.min(h.parseDecimal(limit), 20);

		if (persons.length >= circleUsers.length) {
			return Bluebird.resolve().nodeify(cb);
		}

		return Bluebird.try(function () {
			var loadedIDs = persons.map(function (p) {
				return p.id;
			});
			var loadableUsers = circleUsers.filter(function (user) {
				return loadedIDs.indexOf(user) === -1;
			});

			var userService = __webpack_require__(9).default;

			return userService.getMultiple(loadableUsers.slice(0, limit));
		}).map(function (user) {
			persons.push(user.data);

			return user.loadBasicData().thenReturn(user);
		}).nodeify(cb);
	};

	this.data = {
		id: id,
		userids: circleUsers,
		name: "",
		image: "assets/img/circle.png",
		persons: persons
	};

	Observer.extend(this);
};

var loadingPromise;

function makeCircle(data) {
	var circle = new Circle(data);
	var id = circle.getID();

	if (circles[id]) {
		return;
	}

	circles[id] = circle;
	circleArray.push(circle);
	circleData.push(circle.data);

	return circle;
}

var circleService = {
	data: {
		loaded: false,
		loading: false,
		circles: circleData
	},
	get: function get(id) {
		return circles[id];
	},
	inWhichCircles: function inWhichCircles(uid) {
		uid = h.parseDecimal(uid);

		return circleArray.filter(function (circle) {
			return circle.hasUser(uid);
		});
	},
	create: function create(name, users) {
		users = (users || []).map(h.parseDecimal);

		return generateNewKey().then(function (symKey) {
			return encryptKeyForUsers(symKey, users).then(function () {
				var userService = __webpack_require__(9).default;
				var own = userService.getOwn();
				var mainKey = own.getMainKey();

				return SecuredData.createAsync({ name: name }, {
					users: users,
					circleKey: symKey
				}, { type: "circle" }, own.getSignKey(), mainKey);
			}).then(function (circleData) {
				var keyData = keyStore.upload.getKey(symKey);

				return socket.emit("circle.create", {
					circle: {
						key: keyData,
						content: circleData.content,
						meta: circleData.meta
					}
				});
			}).then(function (circleResponse) {
				var theCircle = makeCircle(circleResponse.created);
				return theCircle.load().thenReturn(theCircle);
			});
		});
	},
	reset: function reset() {
		circles = {};
		circleArray = [];
		circleData = [];

		circleService.data.circles = circleData;

		circleService.data.loading = false;
		circleService.data.loaded = false;
	},
	loadAll: function loadAll(cb) {
		if (!loadingPromise) {
			loadingPromise = Bluebird.try(function () {
				circleService.data.loading = false;

				return initService.awaitLoading();
			}).then(function () {
				return socket.definitlyEmit("circle.all", {});
			}).then(function (data) {
				if (data.circles) {
					return data.circles;
				} else {
					throw new Error("server did not return circles");
				}
			}).map(function (circleData) {
				var circle = makeCircle(circleData);
				return Bluebird.fromCallback(function (cb) {
					circle.load(cb);
				});
			}).then(function () {
				circleService.data.loading = false;
				circleService.data.loaded = true;
				circleService.notify("", "loaded");
			});
		}

		return loadingPromise.nodeify(cb);
	}
};

Observer.extend(circleService);

module.exports = circleService;

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.warn("Whispeer startup at " + Date.now());
console.time("Spinner on Home");

var errorService = __webpack_require__(32).errorServiceInstance;
var keyStore = __webpack_require__(28);
var socketService = __webpack_require__(10).default;
var CacheService = __webpack_require__(27).default;

var debug = __webpack_require__(15);
var Observer = __webpack_require__(16);
var Bluebird = __webpack_require__(3);

var sessionService = __webpack_require__(19).default;

var debugName = "whispeer:initService";
var initServiceDebug = debug(debugName);

function time(name) {
	if (debug.enabled(debugName)) {
		console.time("init: " + name);
	}
}

function timeEnd(name) {
	if (debug.enabled(debugName)) {
		console.timeEnd("init: " + name);
	}
}

var initCallbacks = [],
    initService;

function loadData() {
	keyStore.security.blockPrivateActions();

	var promise = Bluebird.resolve().then(function () {
		time("runInitCallbacks");
		return Bluebird.all(initCallbacks.map(function (func) {
			return func();
		}));
	}).then(function () {
		timeEnd("runInitCallbacks");
		keyStore.security.allowPrivateActions();

		var migrationService = __webpack_require__(375);
		migrationService();
		initService.notify("", "initDone");
		return null;
	});

	promise.catch(errorService.criticalError);

	return promise;
}

var loadingPromise = sessionService.awaitLogin().then(function () {
	return loadData();
});

initService = {
	/** get via api, also check cache in before!
 * @param domain: domain to get from
 */
	awaitLoading: function awaitLoading() {
		return loadingPromise;
	},
	get: function get(domain, cb, options) {
		initRequestsList.push({
			domain: domain,
			callback: cb,
			options: options || {}
		});
	},
	registerCallback: function registerCallback(cb) {
		initCallbacks.push(cb);
	}
};

Observer.extend(initService);

module.exports = initService;

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var settings = __webpack_require__(48).default;

var Bluebird = __webpack_require__(3);
var h = __webpack_require__(6).default;
var errors = __webpack_require__(42);

function removePadding(val) {
	var isNumber = false;

	if (val.indexOf("num::") === 0) {
		isNumber = true;

		val = val.substr(5);
	}

	if (val.length % 128 !== 2) {
		throw new errors.InvalidDataError("padding size invalid");
	}

	var paddingIndex = val.indexOf("::");

	if (paddingIndex === -1) {
		throw new errors.InvalidDataError("no padding seperator found");
	}

	var unpadded = val.substr(paddingIndex + 2);

	if (isNumber) {
		return h.parseDecimal(unpadded);
	}

	return unpadded;
}

function checkAndFixString(val) {
	while (typeof val === "string" && val.lastIndexOf("::") > -1) {
		val = removePadding(val);
	}

	return val;
}

function checkAndFixObject(content) {
	h.objectEach(content, function (key, value) {
		if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
			checkAndFixObject(value);
		} else if (typeof value === "string") {
			content[key] = checkAndFixString(value);
		}
	});
}

module.exports = function () {
	return Bluebird.try(function () {
		var content = settings.getContent();

		checkAndFixObject(content);

		settings.setContent(content);
		return settings.uploadChangedData().thenReturn(true);
	});
};

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Bluebird = __webpack_require__(3);

module.exports = function ($injector, cb) {
	return Bluebird.try(function () {
		return;
	}).then(function () {
		return true;
	}).nodeify(cb);
};

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/blocked-users/blockedUsers.module": [
		475,
		6
	],
	"../pages/contact-requests/contact-requests.module": [
		476,
		11
	],
	"../pages/contacts/contacts.module": [
		477,
		5
	],
	"../pages/home/home.module": [
		478,
		9
	],
	"../pages/login/login.module": [
		479,
		3
	],
	"../pages/messages/add/add.module": [
		480,
		4
	],
	"../pages/messages/details/details.module": [
		481,
		8
	],
	"../pages/messages/messages.module": [
		483,
		1
	],
	"../pages/new-message/new-message.module": [
		482,
		0
	],
	"../pages/profile/profile.module": [
		485,
		2
	],
	"../pages/sales/sales.module": [
		484,
		10
	],
	"../pages/settings/settings.module": [
		486,
		7
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 250;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asset_Progress__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blobService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__asset_blobCache__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__asset_Queue__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fileTransferQueue__ = __webpack_require__(303);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};







var defaultUploadOptions = {
    encrypt: true,
    extraInfo: {}
};
var encryptionQueue = new __WEBPACK_IMPORTED_MODULE_5__asset_Queue__["a" /* default */](500 * 1000);
encryptionQueue.start();
var FileUpload = (function () {
    function FileUpload(file, options) {
        var _this = this;
        this.file = file;
        this.getProgress = function () {
            return _this.progress.getProgress();
        };
        this.uploadAndEncryptPreparedBlob = function (encryptionKey, blob) {
            _this.progress.addDepend(blob.uploadProgress);
            _this.progress.addDepend(blob.encryptProgress);
            return encryptionQueue.enqueue(blob.getSize(), function () {
                return blob.encryptAndUpload(encryptionKey);
            });
        };
        this.uploadPreparedBlob = function (blob) {
            _this.progress.addDepend(blob.uploadProgress);
            return blob.upload();
        };
        this.upload = function (encryptionKey) {
            if (!_this.blob) {
                throw new Error("usage error: prepare was not called!");
            }
            return __WEBPACK_IMPORTED_MODULE_6__fileTransferQueue__["a" /* queue */].enqueue(1, function () {
                console.info("Uploading blob");
                if (_this.options.encrypt) {
                    return _this.uploadAndEncryptPreparedBlob(encryptionKey, _this.blob);
                }
                return _this.uploadPreparedBlob(_this.blob);
            }).then(function (keys) {
                if (_this.file.originalUrl) {
                    var _a = Object(__WEBPACK_IMPORTED_MODULE_3__blobService__["b" /* unpath */])(_this.file.originalUrl), directory = _a.directory, name_1 = _a.name;
                    return __WEBPACK_IMPORTED_MODULE_4__asset_blobCache__["a" /* default */].moveFileToBlob(directory, name_1, _this.blob.getBlobID()).then(function () { return keys; });
                }
                return keys;
            });
        };
        this.prepare = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].cacheResult(function () {
            return FileUpload.blobToDataSet(_this.blob).then(function (data) {
                data.content = __assign({}, data.content, _this.getInfo());
                return data;
            });
        });
        this.getInfo = function () {
            return __assign({ name: _this.file.name, size: _this.file.size, type: _this.file.type }, _this.options.extraInfo);
        };
        this.getFile = function () {
            return _this.file;
        };
        this.getName = function () {
            return _this.file.name;
        };
        this.progress = new __WEBPACK_IMPORTED_MODULE_2__asset_Progress__["a" /* default */]();
        this.blob = __WEBPACK_IMPORTED_MODULE_3__blobService__["a" /* default */].createBlob(file);
        this.options = options || defaultUploadOptions;
    }
    FileUpload.blobToDataSet = function (blob) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([blob.preReserveID(), blob.getHash()]).spread(function (blobID, hash) {
            return {
                blob: blob,
                content: {
                    blobHash: hash
                },
                meta: {
                    blobID: blobID
                }
            };
        });
    };
    FileUpload.fileCallback = function (cb) {
        return function (e) {
            cb(Array.prototype.slice.call(e.target.files));
            try {
                e.target.value = null;
            }
            catch (ex) {
                console.log(ex);
            }
        };
    };
    return FileUpload;
}());
/* harmony default export */ __webpack_exports__["a"] = (FileUpload);
//# sourceMappingURL=fileUpload.service.js.map

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecuredData", function() { return SecuredData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);


var keyStore = __webpack_require__(28);
var errors = __webpack_require__(42);
var config = __webpack_require__(61);

var attributesNeverVerified = ["_signature", "_hashObject"];
/** crypted content with metadata
        @param content the content to handle either encrypted or decrypted
        @param meta metadata for the content
        @param isDecrypted whether the content is decrypted
*/
var SecuredData = (function () {
    function SecuredData(content, meta, options, isDecrypted) {
        var _this = this;
        this.blockDisallowedAttributes = function (data) {
            if (data._contentHash || data._key || data._signature || data._version) {
                throw new Error("content hash/key should not be provided by outside world");
            }
        };
        this.hasContent = function () {
            return _this._hasContent;
        };
        this.getHash = function () {
            return _this._updated.meta._ownHash;
        };
        this.getKey = function () {
            return _this.original.meta._key;
        };
        this.sign = function (signKey, cb) {
            var toSign = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].deepCopyObj(_this._updated.meta);
            var hashVersion = config.hashVersion;
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
                toSign._version = 1;
                toSign._type = _this.type;
                toSign._hashVersion = hashVersion;
                //do not sign attributes which should not be verified
                _this.attributesNotVerified.forEach(function (attr) {
                    delete toSign[attr];
                });
                if (_this._updated.paddedContent || _this._updated.content) {
                    var hashContent = _this._updated.paddedContent || _this._updated.content;
                    return keyStore.hash.hashObjectOrValueHexAsync(hashContent).then(function (contentHash) {
                        toSign._contentHash = contentHash;
                        //create new ownHash
                        delete toSign._ownHash;
                        return keyStore.hash.hashObjectOrValueHexAsync(toSign);
                    }).then(function (ownHash) {
                        toSign._ownHash = ownHash;
                    });
                }
            }).then(function () {
                return keyStore.sign.signObject(toSign, signKey, hashVersion);
            }).then(function (signature) {
                toSign._signature = signature;
                return toSign;
            }).nodeify(cb);
        };
        this.getUpdatedData = function (signKey, cb) {
            return _this.verify(signKey).then(function () {
                if (_this._hasContent) {
                    keyStore.security.addEncryptionIdentifier(_this.original.meta._key);
                    return _this.signAndEncrypt(signKey, _this.original.meta._key);
                }
                return _this.sign(signKey);
            }).nodeify(cb);
        };
        /** sign and encrypt this object.
                pads and then encrypts our content.
                adds contentHash, key id and version to metaData and signs meta data.
                @param signKey key to use for signing
                @param cb callback(cryptedData, metaData),
        */
        this.signAndEncrypt = function (signKey, cryptKey) {
            if (!_this._hasContent) {
                throw new Error("can only sign and not encrypt");
            }
            if (_this.original.meta._key && _this.original.meta._key !== cryptKey) {
                throw new Error("can not re-encrypt an old object with new key!");
            }
            return keyStore.hash.addPaddingToObject(_this._updated.content, 128).then(function (paddedContent) {
                _this._updated.paddedContent = paddedContent;
                _this._updated.meta._key = keyStore.correctKeyIdentifier(cryptKey);
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
                    keyStore.sym.encryptObject(paddedContent, cryptKey, _this.encryptDepth),
                    _this.sign(signKey)
                ]);
            }).spread(function (cryptedData, meta) {
                _this._updated.meta = meta;
                return {
                    content: cryptedData,
                    meta: meta
                };
            });
        };
        this.hasType = function (type) {
            if (type === _this.type) {
                return true;
            }
            if (_this.alternativeType && _this.alternativeType === type) {
                return true;
            }
            return false;
        };
        /** verify the decrypted data
                decrypts data if necessary
                @param signKey key to check signature against
                @param id id for signature caching
                @throw SecurityError: contenthash or signature wrong
        */
        this.verifyAsync = function (signKey, id) {
            //check contentHash is correct
            //check signature is correct
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]().then(function () {
                var metaCopy = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].deepCopyObj(_this.original.meta);
                _this.attributesNotVerified.forEach(function (attr) {
                    delete metaCopy[attr];
                });
                if (!_this.hasType(metaCopy._type)) {
                    // eslint-disable-next-line no-debugger
                    debugger;
                    throw new errors.SecurityError("invalid object type. is: " + metaCopy._type + " should be: " + _this.type);
                }
                if (typeof metaCopy._hashVersion === "number") {
                    metaCopy._hashVersion = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].parseDecimal(metaCopy._hashVersion);
                }
                var hashVersion = 1;
                if (metaCopy._hashVersion) {
                    hashVersion = metaCopy._hashVersion;
                }
                else if (metaCopy._v2 && metaCopy._v2 !== "false") {
                    hashVersion = 2;
                }
                return keyStore.sign.verifyObject(_this.original.meta._signature, metaCopy, signKey, hashVersion, id);
            }).then(function (correctSignature) {
                if (!correctSignature) {
                    alert("Bug: signature did not match (" + _this.original.meta._type + ") Please report this bug!");
                    throw new errors.SecurityError("signature did not match " + _this.original.meta._type);
                }
                return _this.verifyContentHash();
            }).then(function () {
                return true;
            });
        };
        this.verify = function (signKey, cb, id) {
            return _this.verifyAsync(signKey, id).nodeify(cb);
        };
        this.updated = function () {
            _this.changed = false;
        };
        this._decrypt = function () {
            if (!_this.decryptionPromise) {
                _this.decryptionPromise = keyStore.sym.decryptObject(_this.original.encryptedContent, _this.encryptDepth, undefined, _this.original.meta._key).then(function (decryptedData) {
                    _this.decrypted = true;
                    _this.original.paddedContent = decryptedData;
                    _this.original.content = keyStore.hash.removePaddingFromObject(decryptedData, 128);
                    _this._updated.content = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].deepCopyObj(_this.original.content);
                    return _this.verifyContentHash();
                });
            }
            return _this.decryptionPromise;
        };
        this.decrypt = function (cb) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]().then(function () {
                if (_this._hasContent && !_this.decrypted) {
                    return _this._decrypt();
                }
            }).then(function () {
                if (!_this._hasContent) {
                    return;
                }
                return _this.original.content;
            }).nodeify(cb);
        };
        this.verifyContentHash = function () {
            if (!_this._hasContent || !_this.decrypted) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
            }
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
                return keyStore.hash.hashObjectOrValueHexAsync(_this.original.paddedContent || _this.original.content);
            }).then(function (hash) {
                if (hash !== _this.original.meta._contentHash) {
                    throw new errors.SecurityError("content hash did not match");
                }
            });
        };
        this.isChanged = function () { return _this.changed; };
        this.isEncrypted = function () { return !_this.decrypted; };
        this.isDecrypted = function () { return _this.decrypted; };
        this.contentGet = function () { return __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].deepCopyObj(_this._updated.content); };
        this.metaGet = function () { return __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].deepCopyObj(_this._updated.meta); };
        this.metaHasAttr = function (attr) { return _this._updated.meta.hasOwnProperty(attr); };
        this.metaKeys = function () { return Object.keys(_this._updated.meta).filter(function (key) { return key[0] !== "_"; }); };
        this.metaAttr = function (attr) { return __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].deepCopyObj(_this._updated.meta[attr]); };
        /** sets the whole content to the given data
                @param newContent new value for this objects content
        */
        this.contentSet = function (newContent) {
            _this._hasContent = _this.changed = true;
            _this._updated.content = newContent;
        };
        /** set a certain attribute in the content object
                @param attr attribute to set
                @param value value to set attribute to
        */
        this.contentSetAttr = function (attr, value) {
            if (typeof _this._updated.content !== "object") {
                throw new Error("our content is not an object");
            }
            _this._updated.content[attr] = value;
            _this.changed = true;
        };
        this.contentRemoveAttr = function (attr) {
            if (typeof _this._updated.content !== "object") {
                throw new Error("our content is not an object");
            }
            delete _this._updated.content[attr];
            _this.changed = true;
        };
        /** sets the whole metaData to the given data
                @param newMetaData new value for this objects metaData
        */
        this.metaSet = function (newMetaData) {
            _this.blockDisallowedAttributes(newMetaData);
            _this.changed = true;
            _this._updated.meta = newMetaData;
        };
        this.metaRemoveAttr = function (attr) {
            if (attr[0] === "_") {
                throw new Error("private attributes should not be provided by outside world");
            }
            _this.changed = true;
            delete _this._updated.meta[attr];
        };
        this.metaSetAttr = function (attr, value) {
            if (attr[0] === "_") {
                throw new Error("private attributes should not be provided by outside world");
            }
            _this.changed = true;
            _this._updated.meta[attr] = value;
        };
        /** set a certain attribute in the meta object
                @param attrs [] list of which attribute to set
                @param value value to set attribute to
        */
        this.metaAdd = function (attrs, value) {
            _this.changed = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].deepSetCreate(_this._updated.meta, attrs, value);
        };
        this.setParent = function (parentSecuredData) {
            _this._updated.meta._parent = parentSecuredData.getHash();
        };
        this.checkParent = function (expectedParent) {
            if (_this._updated.meta._parent !== expectedParent.getHash()) {
                throw new errors.SecurityError("wrong parent. is: " + _this._updated.meta._parent + " should be: " + expectedParent.getHash());
            }
        };
        this.getRelationshipCounter = function () {
            return __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].parseDecimal(_this._updated.meta._sortCounter || 0);
        };
        this.setAfterRelationShip = function (afterSecuredData) {
            _this._updated.meta._sortCounter = afterSecuredData.getRelationshipCounter() + 1;
        };
        this.checkAfter = function (securedData) {
            if (_this.getRelationshipCounter() < securedData.getRelationshipCounter()) {
                throw new errors.SecurityError("wrong ordering. " + _this.getRelationshipCounter() + " should be after " + securedData.getRelationshipCounter());
            }
        };
        this.checkBefore = function (securedData) {
            if (_this.getRelationshipCounter() > securedData.getRelationshipCounter()) {
                throw new errors.SecurityError("wrong ordering. " + _this.getRelationshipCounter() + " should be before " + securedData.getRelationshipCounter());
            }
        };
        //we need to somehow ensure that we have the correct object type.
        if (!options || typeof options.type !== "string") {
            throw new Error("need a type for security!");
        }
        this.type = options.type;
        this.alternativeType = options.alternativeType;
        this.removeEmpty = options.removeEmpty;
        this.encryptDepth = options.encryptDepth || 0;
        this.attributesNotVerified = options.attributesNotVerified || [];
        this.attributesNotVerified.filter(function (val) { return val.match(/^A-z0-9$/); });
        this.attributesNotVerified = attributesNeverVerified.concat(this.attributesNotVerified);
        this.decrypted = isDecrypted;
        this._hasContent = true;
        this.original = {
            meta: meta || {}
        };
        if (typeof content === "undefined") {
            this._hasContent = false;
        }
        else if (isDecrypted) {
            this.original.content = content;
        }
        else {
            this.original.encryptedContent = content;
        }
        this._updated = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].deepCopyObj(this.original);
    }
    return SecuredData;
}());

var api = {
    createPromisified: function (content, meta, options, signKey, cryptKey) {
        var securedData, securedDataPromise;
        securedDataPromise = __WEBPACK_IMPORTED_MODULE_0_bluebird__["fromCallback"](function (cb) {
            securedData = api.create(content, meta, options, signKey, cryptKey, cb);
        });
        return {
            promise: securedDataPromise,
            data: securedData
        };
    },
    createAsync: function (content, meta, options, signKey, cryptKey) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["fromCallback"](function (cb) {
            api.create(content, meta, options, signKey, cryptKey, cb);
        });
    },
    create: function (content, meta, options, signKey, cryptKey, cb) {
        var secured = api.createRaw(content, meta, options);
        __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]().delay(1).then(function () {
            return secured.signAndEncrypt(signKey, cryptKey);
        }).nodeify(cb);
        return secured;
    },
    load: function (content, meta, options) {
        return new SecuredData(content, meta, options, false);
    },
    createRaw: function (content, meta, options) {
        return new SecuredData(content, meta, options, true);
    }
};
/* harmony default export */ __webpack_exports__["default"] = (api);
//# sourceMappingURL=securedDataWithMetaData.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_idb__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_idb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_idb__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;



 // tslint:disable-line:no-unused-variable
var REINIT_CACHE_TIMEOUT = 2000;
var cachesDisabled = false;
var openDatabase = function () {
    return __WEBPACK_IMPORTED_MODULE_3_idb___default.a.open("whispeerCache", 10, function (upgradeDB) {
        var objectStore = upgradeDB.createObjectStore('cache', { keyPath: "id" });
        objectStore.createIndex("created", "created", { unique: false });
        objectStore.createIndex("used", "used", { unique: false });
        objectStore.createIndex("type", "type", { unique: false });
        objectStore.createIndex("size", "size", { unique: false });
    }).catch(function (e) {
        console.warn("Disabling indexedDB caching due to error", e);
        cachesDisabled = true;
        return Promise.reject(e);
    });
};
var initCache = function () { return cachesDisabled = false; };
try {
    indexedDB.deleteDatabase("whispeer");
}
catch (e) { }
var followCursorUntilDone = function (cursorPromise, action) {
    return __WEBPACK_IMPORTED_MODULE_1_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
        var cursor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cursorPromise];
                case 1:
                    cursor = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!cursor) return [3 /*break*/, 4];
                    action(cursor);
                    return [4 /*yield*/, cursor.continue()];
                case 3:
                    cursor = _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
var Cache = (function () {
    function Cache(name, options) {
        this.name = name;
        this.cacheDisabled = false;
        this.options = options || {};
        this.options.maxEntries = this.options.maxEntries || 100;
        this.options.maxBlobSize = this.options.maxBlobSize || 1 * 1024 * 1024;
    }
    Cache.deleteDatabase = function () {
        cachesDisabled = true;
        return __WEBPACK_IMPORTED_MODULE_3_idb___default.a.delete("whispeerCache").then(function () {
            setTimeout(function () {
                initCache();
            }, REINIT_CACHE_TIMEOUT);
        });
    };
    Cache.sumSize = function (arr) {
        return arr.reduce(function (prev, cur) {
            return prev + cur.size;
        }, 0);
    };
    Cache.prototype.store = function (id, data, blobs) {
        var _this = this;
        if (this.isDisabled()) {
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"]();
        }
        if (blobs && !__WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].array.isArray(blobs)) {
            blobs = [blobs];
        }
        if (blobs && this.options.maxBlobSize !== -1 && Cache.sumSize(blobs) > this.options.maxBlobSize) {
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"]();
        }
        var cacheEntry = {
            data: JSON.stringify(data),
            created: new Date().getTime(),
            used: new Date().getTime(),
            id: this.getID(id),
            type: this.name,
            size: 0,
            blobs: []
        };
        if (blobs) {
            cacheEntry.blobs = blobs;
            cacheEntry.size = Cache.sumSize(blobs);
        }
        return __WEBPACK_IMPORTED_MODULE_1_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var db, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openDatabase()];
                    case 1:
                        db = _a.sent();
                        console.info("Storing in indexeddb " + this.getID(id));
                        tx = db.transaction('cache', 'readwrite');
                        tx.objectStore('cache').put(cacheEntry);
                        return [4 /*yield*/, tx.complete];
                    case 2:
                        _a.sent();
                        db.close();
                        return [2 /*return*/];
                }
            });
        }); }).catch(__WEBPACK_IMPORTED_MODULE_0__error_service__["errorServiceInstance"].criticalError);
    };
    Cache.prototype.contains = function (id) {
        var _this = this;
        if (this.isDisabled()) {
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"](false);
        }
        return __WEBPACK_IMPORTED_MODULE_1_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var db, tx, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openDatabase()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("cache", "readonly");
                        return [4 /*yield*/, tx.objectStore("cache").count(this.name + "/" + id)];
                    case 2:
                        count = _a.sent();
                        db.close();
                        return [2 /*return*/, count > 0];
                }
            });
        }); });
    };
    Cache.prototype.get = function (id) {
        var _this = this;
        if (this.isDisabled()) {
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["reject"](new Error("Cache is disabled " + this.name));
        }
        /*
        var cacheResult = this._db.cache.where("id").equals(this.name + "/" + id);

        this._db.cache.where("id").equals(this.name + "/" + id).modify({ used: new Date().getTime() });
        */
        return __WEBPACK_IMPORTED_MODULE_1_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var db, tx, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openDatabase()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("cache", "readonly");
                        return [4 /*yield*/, tx.objectStore("cache").get(this.name + "/" + id)];
                    case 2:
                        data = _a.sent();
                        if (typeof data === "undefined") {
                            throw new Error("cache miss for " + this.getID(id));
                        }
                        data.data = JSON.parse(data.data);
                        data.blobs = data.blobs || [];
                        data.blobs = data.blobs.map(function (blob) {
                            if (typeof blob === "string") {
                                return __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].dataURItoBlob(blob);
                            }
                            return blob;
                        });
                        if (data.blobs.length === 1) {
                            data.blob = data.blobs[0];
                        }
                        db.close();
                        return [2 /*return*/, data];
                }
            });
        }); });
    };
    /**
     * get all cache entries as a dexie collection.<
     * @return {Bluebird<any>} Promise containing all cache entries as a dexie collection.
     */
    Cache.prototype.all = function () {
        if (this.isDisabled()) {
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"]([]);
        }
        var entries = [];
        return this.cursorEach(function (cursor) { return entries.push(cursor.value); }, "readonly").then(function () { return entries; });
    };
    Cache.prototype.getID = function (id) {
        return this.name + "/" + id;
    };
    /**
     * delete a certain cache entry.
     * @param  {string}        id id of the entry
     * @return {Bluebird<any>}    [description]
     */
    Cache.prototype.delete = function (id) {
        var _this = this;
        if (this.isDisabled()) {
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"]();
        }
        return __WEBPACK_IMPORTED_MODULE_1_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var db, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openDatabase()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("cache", "readwrite");
                        return [4 /*yield*/, tx.objectStore("cache").delete(this.getID(id))];
                    case 2:
                        _a.sent();
                        db.close();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Cache.prototype.deleteAll = function () {
        if (this.isDisabled()) {
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"]();
        }
        var deleteRequests = [];
        return this.cursorEach(function (cursor) { return deleteRequests.push(cursor.delete()); }, "readwrite").then(function () { return __WEBPACK_IMPORTED_MODULE_1_bluebird__["all"](deleteRequests); });
    };
    Cache.prototype.cursorEach = function (action, transactionType) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var db, tx, cursorPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openDatabase()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction("cache", transactionType);
                        cursorPromise = tx.objectStore("cache").index("type").openCursor(this.name);
                        return [4 /*yield*/, followCursorUntilDone(cursorPromise, action)];
                    case 2:
                        _a.sent();
                        db.close();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Cache.prototype.isDisabled = function () {
        return cachesDisabled || this.cacheDisabled;
    };
    Cache.prototype.disable = function () {
        this.cacheDisabled = true;
    };
    return Cache;
}());
/* harmony default export */ __webpack_exports__["default"] = (Cache);
//# sourceMappingURL=Cache.js.map

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** our keystore.
	handles all the keys, passwords, etc.
	keys are a little difficult because some keys look different but are the same because they are encrypted differently
	also keys always have a decryptor because the are never distributed alone.

	uploading:
		key -> addSymDecryptor/addAsymDecryptor/addPWDecryptor -> intKey
		key -> getUploadData() -> intKey
		do for multiple keys, concat, submit.

	the key should cache which of its data is dirty and which is not.
	removing decryptors (later) should update directly if the key as such is already saved.

	keyid: identifier@timestamp
**/
/*
{
	"crv":"P-256",
	"ext":true,
	"key_ops":["verify"],
	"kty":"EC",
	"x":"_u7VBNaYjLEcaj2Vw1t-CiH_or3xPudekyW4iJrjwgs",
	"y":"YMv7KmTnxpU16ytQrAYgcw4bpoQuPZwLSwvM_imsqxA"
}
*/

var h = __webpack_require__(6).default;
var chelper = __webpack_require__(160);
var sjcl = __webpack_require__(45);
var waitForReady = __webpack_require__(363);
var sjclWorkerInclude = __webpack_require__(364);
var ObjectHasher = __webpack_require__(367);
var errors = __webpack_require__(42);
var Bluebird = __webpack_require__(3);
var debug = __webpack_require__(15);

var keyStoreDebug = debug("whispeer:keyStore");

var keyGetFunction,
    firstVerify = true,
    improvementListener = [],
    makeKey,
    keyStore,
    recovery = false,
    sjclWarning = true;

/** dirty and new keys to upload. */
var dirtyKeys = [],
    newKeys = [];

/** cache for keys */
var symKeys = {},
    cryptKeys = {},
    signKeys = {};
var password = "",
    keyGenIdentifier = "",
    mainKey;

/** identifier list of keys we can use for encryption. this is mainly a safeguard for coding bugs. */
var keysUsableForEncryption = [];

var privateActionsBlocked = false;

/** our classes */
var Key, SymKey, CryptKey, SignKey;

sjcl.random.startCollectors();

var MAXSPEED = 99999999999,
    SPEEDS = {
	symKey: {
		loaded: 3,
		unloaded: 50
	},
	cryptKey: {
		loaded: 100,
		unloaded: 150
	},
	pw: 3
};

try {
	if (localStorage) {
		var pw = localStorage.getItem("whispeer.session.password");
		if (pw && typeof pw === "string") {
			password = pw;
		}
	}
} catch (e) {
	keyStoreDebug(e);
}

function bufferToHex(buffer) {
	var hexCodes = [];
	var view = new DataView(buffer);
	for (var i = 0; i < view.byteLength; i += 4) {
		// Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
		var value = view.getUint32(i
		// toString(16) will give the hex representation of the number without padding
		);var stringValue = value.toString(16
		// We use concatenation and slice for padding
		);var padding = "00000000";
		var paddedValue = (padding + stringValue).slice(-padding.length);
		hexCodes.push(paddedValue);
	}

	// Join all the hex strings into one
	return hexCodes.join("");
}

function fingerPrintData(data) {
	return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(data));
}

function fingerPrintPublicKey(publicKey) {
	//should we add the type and curve here too?
	//as the curve is fixed for now it should not be a problem
	return fingerPrintData(publicKey._point.toBits());
}

function fingerPrintSymKey(keyData) {
	if (keyData instanceof Array) {
		return fingerPrintData(keyData);
	} else {
		throw new errors.InvalidDataError("invalid key data");
	}
}

function getSubtle() {
	if (window.msCrypto && window.msCrypto.subtle) {
		return window.msCrypto.subtle;
	}

	if (!window.crypto) {
		return false;
	}

	if (window.crypto.subtle) {
		return window.crypto.subtle;
	}

	if (window.crypto.webkitSubtle) {
		return window.crypto.webkitSubtle;
	}

	return false;
}

function makeKeyUsableForEncryption(realid) {
	var fp = realid.split(":")[1];
	keysUsableForEncryption.push(fp);
}

function isKeyUsableForEncryption(realid) {
	var fp = realid.split(":")[1];
	return keysUsableForEncryption.indexOf(fp) > -1;
}

function toPrivateKey(type, curve) {
	return function (secret) {
		var exponent = new sjcl.bn(chelper.bits2hex(secret));

		return new type.secretKey(curve, exponent);
	};
}

function determineLength(object) {
	if ((typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object") {
		return 0;
	}

	return Object.keys(object).reduce(function (prev, cur) {
		return prev + 1 + determineLength(object[cur]);
	}, 0);
}

function stringifyObject(object, version) {
	var length = determineLength(object);

	if (length < 50) {
		return new ObjectHasher(object, version).stringify();
	}

	console.warn("Length too long for stringify ", object._type, version, length);

	return sjclWorkerInclude.stringify(object, version);
}

function removeExpectedPrefix(bitArray, prefix) {
	var len = prefix.length,
	    part;
	prefix = sjcl.codec.utf8String.toBits(prefix);

	if (bitArray instanceof ArrayBuffer) {
		var buf8 = new Uint8Array(bitArray);
		part = sjcl.codec.arrayBuffer.toBits(new Uint8Array(buf8.subarray(0, len)).buffer);
		if (sjcl.bitArray.equal(prefix, part)) {
			return new Uint8Array(buf8.subarray(len)).buffer;
		}
	} else {
		part = sjcl.bitArray.bitSlice(bitArray, 0, 8 * len);
		if (sjcl.bitArray.equal(prefix, part)) {
			return sjcl.bitArray.bitSlice(bitArray, 8 * len);
		}
	}

	throw new errors.DecryptionError("invalid prefix (should be: " + prefix + ")");
}

//TODO: webworkers:
//var webWorker = Modernizr.webworkers;

/** generate an id */
function generateid(base) {
	var id = keyGenIdentifier + ":" + chelper.bits2hex(base);

	if (symKeys[id] || cryptKeys[id] || signKeys[id]) {
		throw new errors.SecurityError("key already existing with same content ... this should never happen!");
	}

	return id;
}

function correctKeyIdentifier(realid) {
	var parts = realid.split(":");

	if (parts.length !== 2) {
		throw new errors.InvalidDataError("Key id does not match format!");
	}

	if (parts[0].length === 0) {
		return keyGenIdentifier + ":" + parts[1];
	}

	return realid;
}

/** encrypt with password
* @param pw password to encrypt
* @param text text to encrypt
* @param callback callback
*/
function encryptPW(pw, text) {
	return Bluebird.try(function () {
		var result = sjcl.json._encrypt(pw, text);
		return chelper.sjclPacket2Object(result);
	});
}

/** our internal decryption function.
* @param decryptorid id of decryptor
* @param decryptortype decryptor type
* @param ctext crypted text
* @param callback called with results
* @param iv necessary for symkey/pw encrypted data
* @param salt necessary for pw encrypted data
*/
function internalDecrypt(decryptorid, decryptortype, ctext, iv, salt) {
	return Bluebird.try(function () {
		if (decryptortype === "symKey" || decryptortype === "backup") {
			return Bluebird.try(function () {
				return SymKey.get(decryptorid);
			}).then(function (theKey) {
				return theKey.decryptKey().thenReturn(theKey);
			}).then(function (theKey) {
				return theKey.decrypt(ctext, iv);
			}).then(function (decryptedData) {
				return removeExpectedPrefix(decryptedData, "key::");
			});
		} else if (decryptortype === "cryptKey") {
			return Bluebird.try(function () {
				return CryptKey.get(decryptorid);
			}).then(function (theKey) {
				return theKey.decryptKey().thenReturn(theKey);
			}).then(function (theKey) {
				return theKey.unkem(chelper.hex2bits(ctext));
			});
		} else if (decryptortype === "pw") {
			return Bluebird.try(function () {
				var jsonData = chelper.Object2sjclPacket({
					ct: ctext,
					iv: iv,
					salt: salt
				}),
				    result;
				if (password !== "") {
					result = sjcl.decrypt(password, jsonData, { raw: 1 });

					return removeExpectedPrefix(result, "key::");
				}

				throw new errors.DecryptionError("no pw");
			});
		} else {
			throw new errors.InvalidDataError("invalid decryptortype");
		}
	});
}

/** returns a decryptors object if loaded
* @param decryptorData
* @return decryptorObject or null
*/
function getDecryptor(decryptorData) {
	if (decryptorData.type === "symKey") {
		return symKeys[decryptorData.decryptorid];
	}

	if (decryptorData.type === "cryptKey") {
		return cryptKeys[decryptorData.decryptorid];
	}

	return null;
}

/** general key object.
* @param realid keys real id
* @param decryptors array of decryptor data
* @param optional secret unencrypted secret if we already have it
*/
Key = function keyConstructor(superKey, realid, decryptors, optionals) {
	var theKey = this,
	    decryptKeyPromise,
	    dirtyDecryptors = [],
	    internalSecret,
	    preSecret;

	if (!decryptors) {
		decryptors = [];
	}

	/** identity past processor */
	var pastProcessor = function pastProcessor(secret) {
		return secret;
	};

	optionals = optionals || {};

	if (typeof optionals.pastProcessor === "function") {
		pastProcessor = optionals.pastProcessor;
	}

	if (optionals.secret) {
		preSecret = optionals.secret;
		internalSecret = pastProcessor(optionals.secret);
		decryptKeyPromise = Bluebird.resolve();
	}

	/** is the key decrypted */
	this.decrypted = function decryptedF() {
		return decryptKeyPromise && decryptKeyPromise.isFulfilled();
	};

	function decryptKey() {
		var usedDecryptor;
		if (!decryptKeyPromise) {
			decryptKeyPromise = Bluebird.try(function () {
				usedDecryptor = theKey.getFastestDecryptor();

				if (!usedDecryptor || !usedDecryptor.decryptor) {
					throw new errors.DecryptionError("Could not Decrypt key!");
				}

				var d = usedDecryptor.decryptor;

				return internalDecrypt(d.decryptorid, d.type, d.ct, d.iv, d.salt);
			}).then(function (result) {
				if (result === false) {
					throw new Error("Could not decrypt");
				}

				if (usedDecryptor.decryptor.type === "cryptKey") {
					h.callEach(improvementListener, [theKey.getRealID()]);
				}

				return pastProcessor(result);
			}).then(function (pastProcessedSecret) {
				preSecret = internalSecret;
				internalSecret = pastProcessedSecret;
			}).catch(function (err) {
				globalErrors.push(err || { err: "internaldecryptor returned false for realid: " + realid });
				keyStoreDebug(err);
				keyStoreDebug("decryptor failed for key: " + realid);

				decryptors = decryptors.filter(function (decryptor) {
					return decryptor !== usedDecryptor.decryptor;
				});

				if (decryptors.length === 0) {
					throw new errors.DecryptionError("Could finally not decrypt key!");
				}

				decryptKeyPromise = undefined;

				return decryptKey();
			});
		}

		return decryptKeyPromise;
	}

	/** decrypt this key.
 * @param callback called with true/false
 * searches your whole keyspace for a decryptor and decrypts if possible
 */
	this.decryptKey = decryptKey;

	/** getter for real id */
	function getRealIDF() {
		return correctKeyIdentifier(realid);
	}
	this.getRealID = getRealIDF;

	this.getRealidFingerPrint = function () {
		return realid.split(":")[1];
	};

	/** getter for decryptors array
 * copies array before returning
 */
	function getDecryptorsF() {
		var result = [],
		    i,
		    tempR,
		    k;
		for (i = 0; i < decryptors.length; i += 1) {
			tempR = {};
			for (k in decryptors[i]) {
				if (decryptors[i].hasOwnProperty(k)) {
					tempR[k] = decryptors[i][k];
				}
			}

			result.push(tempR);
		}

		return result;
	}
	this.getDecryptors = getDecryptorsF;

	/** get the fastest decryptor for this key.
 * @param level only used for recursion prevention.
 * @return {
 *  speed: speed of decryptor found.
 *  decryptor: decryptor found.
 * }
 */
	function getFastestDecryptorF(level) {
		if (!level) {
			level = 0;
		}

		if (level > 100) {
			keyStoreDebug("dafuq, deeply nested keys");
			return MAXSPEED;
		}

		var i,
		    cur,
		    key,
		    decryptorIndex = 0,
		    smallest = MAXSPEED,
		    subKeyData,
		    speed,
		    curSpeeds;
		for (i = 0; i < decryptors.length; i += 1) {
			cur = decryptors[i];
			curSpeeds = SPEEDS[cur.type];

			if (!curSpeeds) {
				speed = MAXSPEED;
			} else if (typeof curSpeeds === "number") {
				speed = curSpeeds;
			} else {
				key = getDecryptor(cur);
				if (key) {
					if (key.decrypted()) {
						speed = curSpeeds.loaded;
					} else {
						subKeyData = key.getFastestDecryptor(level + 1);
						speed = curSpeeds.loaded + subKeyData.speed;
					}
				} else {
					speed = curSpeeds.unloaded;
				}
			}

			if (speed < smallest) {
				smallest = speed;
				decryptorIndex = i;
			}
		}

		return {
			speed: smallest,
			decryptor: decryptors[decryptorIndex]
		};
	}
	this.getFastestDecryptor = getFastestDecryptorF;

	/** add crypt Key decryptor
 * @param realid decryptor key realid
 * @param tag decryption tag
 * @param callback callback
 */
	function addAsymDecryptorF(realid, tag) {
		return Bluebird.try(function () {
			var decryptorData = {
				decryptorid: realid,
				type: "cryptKey",
				ct: chelper.bits2hex(tag),
				dirty: true
			};

			decryptors.push(decryptorData);
			dirtyKeys.push(superKey);
			dirtyDecryptors.push(decryptorData);
		});
	}

	/** add symKey decryptor.
 * @param realid realid of decryptor
 * @param callback callback
 */
	function addSymDecryptorF(realid) {
		return Bluebird.try(function () {
			if (realid instanceof SymKey) {
				return realid;
			}

			return SymKey.get(realid);
		}).then(function (cryptorKey) {
			return theKey.decryptKey().thenReturn(cryptorKey);
		}).then(function (cryptorKey) {
			var secret = preSecret || internalSecret;
			return cryptorKey.encryptWithPrefix("key::", secret).then(function (data) {
				var decryptorData = {
					decryptorid: cryptorKey.getRealID(),
					type: "symKey",
					ct: chelper.bits2hex(data.ct),
					iv: chelper.bits2hex(data.iv),
					dirty: true
				};

				decryptors.push(decryptorData);
				dirtyKeys.push(superKey);
				dirtyDecryptors.push(decryptorData);

				return cryptorKey.getRealID();
			});
		});
	}

	/** add a pw decryptor
 * @param pw password
 * @param callback callback
 */
	function addPWDecryptorF(pw) {
		return theKey.decryptKey().then(function () {
			var prefix = sjcl.codec.utf8String.toBits("key::");
			var data = sjcl.bitArray.concat(prefix, preSecret || internalSecret);

			return chelper.sjclPacket2Object(sjcl.json._encrypt(pw, data));
		}).then(function (data) {
			var decryptorData = {
				//Think, shortHash here? id: ?,
				type: "pw",
				ct: chelper.bits2hex(data.ct),
				iv: chelper.bits2hex(data.iv),
				salt: chelper.bits2hex(data.salt),
				dirty: true
			};

			decryptors.push(decryptorData);
			dirtyKeys.push(superKey);
			dirtyDecryptors.push(decryptorData);

			return decryptorData;
		});
	}

	this.addAsymDecryptor = addAsymDecryptorF;
	this.addSymDecryptor = addSymDecryptorF;
	this.addPWDecryptor = addPWDecryptorF;

	/** get all data which need uploading. */
	function getDecryptorDataF(includeAllDecryptors) {
		//get the upload data for the decryptors of this key.
		//this will be called in the keys upload() function.

		var decryptorArray = dirtyDecryptors;

		if (includeAllDecryptors) {
			decryptorArray = decryptors;
		}

		return decryptorArray.map(function (decryptor) {
			var tempR = {},
			    k;
			for (k in decryptor) {
				if (decryptor.hasOwnProperty(k)) {
					tempR[k] = decryptor[k];
				}
			}

			if (tempR.decryptorid) {
				tempR.decryptorid = correctKeyIdentifier(tempR.decryptorid);
			}

			return tempR;
		});
	}
	this.getDecryptorData = getDecryptorDataF;

	/** check if this key has dirty decryptors */
	function isDirtyF() {
		return theKey.dirtyDecryptors.length !== 0;
	}
	this.isDirty = isDirtyF;

	/** remove uploaded keys from dirty array */
	function removeDirtyF(keys) {
		var remaining = [],
		    i,
		    j,
		    isRemaining,
		    curD,
		    curK;
		for (i = 0; i < dirtyDecryptors.length; i += 1) {
			curD = dirtyDecryptors[i];
			isRemaining = true;
			for (j = 0; j < keys.length; j += 1) {
				curK = keys[j];
				if (curD.type === curK.type && curD.ct === curK.ct && curD.decryptorid === curK.decryptorid) {
					keys.splice(j, 1);
					isRemaining = false;

					break;
				}
			}

			if (isRemaining) {
				remaining.push(curD);
			}
		}

		dirtyDecryptors = remaining;
	}
	this.removeDirty = removeDirtyF;

	/** get the secret of this key */
	this.getSecret = function () {
		if (this.decrypted()) {
			return internalSecret;
		}

		return false;
	};
};

/** a SymKey.
* @param keyData if not set: generate key; if string: hex of unencrypted key; otherwise: key data
* @attribute id
* @attribute realid
* @attribute decryptor data
* @attribute encrypted key
* implements all symmetric key functions.
*/
SymKey = function SymKey(keyData) {
	var intKey,
	    comment = "";

	if (!keyData) {
		keyData = sjcl.random.randomWords(8);
	}

	if (typeof keyData === "string") {
		keyData = chelper.hex2bits(keyData);
	}

	if (keyData instanceof Array) {
		intKey = new Key(this, generateid(fingerPrintSymKey(keyData)), [], { secret: keyData });
	} else {
		intKey = new Key(this, keyData.realid, keyData.decryptors, {
			pastProcessor: function pastProcessor(secret) {
				var fp = fingerPrintSymKey(secret);
				if (fp !== intKey.getRealidFingerPrint()) {
					throw new errors.ValidationError("Fingerprint and Key id do not match");
				}
				return secret;
			}
		});
	}

	this.getAccessCount = function () {
		return keyData.accessCount;
	};

	this.getUploadData = function (includeAllDecryptors) {
		var data = {
			realid: intKey.getRealID(),
			type: "sym",
			decryptors: this.getDecryptorData(includeAllDecryptors),
			comment: comment
		};

		return data;
	};

	this.getDecryptorData = intKey.getDecryptorData;

	this.getRealID = intKey.getRealID;
	this.getDecryptors = intKey.getDecryptors;
	this.decrypted = intKey.decrypted;

	this.addAsymDecryptor = intKey.addAsymDecryptor;
	this.addSymDecryptor = intKey.addSymDecryptor;
	this.addPWDecryptor = intKey.addPWDecryptor;

	this.decryptKey = intKey.decryptKey;
	this.getFastestDecryptor = intKey.getFastestDecryptor;

	this.setComment = function setCommentF(theComment) {
		if (theComment) {
			comment = theComment;
		}
	};

	/** encrypt a text.
 * @param text text to encrypt
 * @param callback called with result
 * @param optional iv initialization vector
 */

	this.encryptWithPrefix = function (prefix, data, progressCallback, noDecode) {
		if (privateActionsBlocked) {
			throw new errors.SecurityError("Private Actions are blocked (encryptWithPrefix)");
		}

		if (!isKeyUsableForEncryption(intKey.getRealID())) {
			throw new errors.SecurityError("Key not usable for encryption: " + intKey.getRealID());
		}

		return intKey.decryptKey().then(function () {
			if (typeof data === "string") {
				data = sjcl.codec.utf8String.toBits(data);
			}

			prefix = sjcl.codec.utf8String.toBits(prefix);

			if (data instanceof ArrayBuffer) {
				prefix = sjcl.codec.arrayBuffer.fromBits(prefix, false);
				var l = prefix.byteLength + data.byteLength;
				var p = 16;
				var padding = new ArrayBuffer(p - l % p);
				data = h.concatBuffers(prefix, data, padding);
			} else {
				data = sjcl.bitArray.concat(prefix, data);
			}

			return sjclWorkerInclude.sym.encrypt(intKey.getSecret(), data, progressCallback);
		}).then(function (result) {
			if (noDecode) {
				return result;
			} else {
				return chelper.sjclPacket2Object(result);
			}
		});
	};

	/** decrypt some text.
 * @param ctext text to decrypt
 * @param callback called with results
 * @param optional iv initialization vector
 */
	this.decrypt = function (ctext, iv, progressCallback) {
		return intKey.decryptKey().then(function () {
			if ((typeof ctext === "undefined" ? "undefined" : _typeof(ctext)) !== "object") {
				if (h.isHex(ctext)) {
					ctext = chelper.hex2bits(ctext);
				}

				ctext = { ct: ctext };
			} else {
				if (h.isHex(ctext.iv)) {
					ctext.iv = chelper.hex2bits(ctext.iv);
				}

				if (h.isHex(ctext.ct)) {
					ctext.ct = chelper.hex2bits(ctext.ct);
				}
			}

			if (iv) {
				if (h.isHex(iv)) {
					iv = chelper.hex2bits(iv);
				}
				ctext.iv = iv;
			}

			if (ctext.ct.length < 500) {
				return sjcl.json._decrypt(intKey.getSecret(), ctext, { raw: 1 });
			} else {
				return sjclWorkerInclude.sym.decrypt(intKey.getSecret(), ctext, progressCallback);
			}
		});
	};
};

/** make a symkey out of keydata */
function makeSymKey(keyData) {
	if (keyData && keyData.realid) {
		if (!symKeys[keyData.realid]) {
			var key = new SymKey(keyData);
			symKeys[keyData.realid] = key;
		}

		return symKeys[keyData.realid];
	}
}

/** load a key and his keychain. remove loaded keys */
function getKey(realKeyID, callback) {
	return keyGetFunction(realKeyID, callback);
}

/** generates a symmetric key
* @param callback callback
*/
function symKeyGenerate(comment) {
	return Bluebird.try(function () {
		return new SymKey();
	}).then(function (key) {
		if (symKeys[key.getRealID()]) {
			return symKeyGenerate(comment);
		}

		symKeys[key.getRealID()] = key;
		newKeys.push(key);
		makeKeyUsableForEncryption(key.getRealID());

		key.setComment(comment);

		return symKeys[key.getRealID()];
	});
}

/** load  a symkey and its keychain */
SymKey.get = function (realKeyID) {
	return Bluebird.try(function () {
		if (!symKeys[realKeyID]) {
			return getKey(realKeyID);
		}
	}).then(function () {
		if (symKeys[realKeyID]) {
			return symKeys[realKeyID];
		}

		throw new errors.InvalidDataError("keychain not found (sym) " + realKeyID);
	});
};

SymKey.generate = symKeyGenerate;

/** a ecc crypto key
* @param keyData keys data.
*/
CryptKey = function CryptKey(keyData) {
	var publicKey,
	    intKey,
	    x,
	    y,
	    curve,
	    point,
	    realid,
	    isPrivateKey = false,
	    comment = "";

	if (!keyData || !keyData.point || !keyData.point.x || !keyData.point.y || !keyData.curve || !keyData.realid) {
		throw new errors.InvalidDataError("invalid data");
	}

	curve = chelper.getCurve(keyData.curve);

	x = curve.field.fromBits(chelper.hex2bits(keyData.point.x));
	y = curve.field.fromBits(chelper.hex2bits(keyData.point.y));
	point = new sjcl.ecc.point(curve, x, y);

	publicKey = new sjcl.ecc.elGamal.publicKey(curve, point);

	realid = keyData.realid;

	if (keyData.exponent) {
		isPrivateKey = true;

		intKey = new Key(this, realid, keyData.decryptors, {
			secret: keyData.exponent,
			pastProcessor: toPrivateKey(sjcl.ecc.elGamal, curve)
		});
	} else if (keyData.decryptors) {
		isPrivateKey = true;
		intKey = new Key(this, realid, keyData.decryptors, {
			pastProcessor: toPrivateKey(sjcl.ecc.elGamal, curve)
		});
	} else {
		intKey = new Key(this, realid, []);
	}

	if (fingerPrintPublicKey(publicKey) !== intKey.getRealidFingerPrint()) {
		throw new errors.ValidationError("Fingerprint and Key id do not match");
	}

	this.getRealID = intKey.getRealID;

	if (isPrivateKey) {
		this.decrypted = intKey.decrypted;
		this.decryptKey = intKey.decryptKey;

		this.getFastestDecryptor = intKey.getFastestDecryptor;

		this.getDecryptorsF = intKey.getDecryptors;

		this.addAsymDecryptor = intKey.addAsymDecryptor;
		this.addSymDecryptor = intKey.addSymDecryptor;
		this.addPWDecryptor = intKey.addPWDecryptor;

		this.getUploadData = function (includeAllDecryptors) {
			var p = publicKey._point,
			    data = {
				realid: intKey.getRealID(),
				point: {
					x: chelper.bits2hex(p.x.toBits()),
					y: chelper.bits2hex(p.y.toBits())
				},
				curve: chelper.getCurveName(publicKey._curve),
				type: "crypt",
				decryptors: this.getDecryptorData(includeAllDecryptors),
				comment: comment
			};

			return data;
		};

		this.setComment = function setCommentF(theComment) {
			if (theComment) {
				comment = theComment;
			}
		};

		this.getDecryptorData = intKey.getDecryptorData;
	}

	function getFingerPrintF() {
		return fingerPrintPublicKey(publicKey);
	}

	this.getFingerPrint = getFingerPrintF;

	/** create a key
 * param callback callback
 */
	this.kem = function () {
		if (privateActionsBlocked) {
			throw new errors.SecurityError("Private Actions are blocked (kem)");
		}

		if (!isKeyUsableForEncryption(intKey.getRealID())) {
			throw new errors.SecurityError("Key not usable for encryption: " + intKey.getRealID());
		}

		return Bluebird.try(function () {
			return publicKey.kem();
		}).then(function (keyData) {
			var resultKey = new SymKey(keyData.key);
			symKeys[resultKey.getRealID()] = resultKey;
			newKeys.push(resultKey);
			makeKeyUsableForEncryption(resultKey.getRealID());
			return resultKey.addAsymDecryptor(realid, keyData.tag).thenReturn(resultKey.getRealID());
		});
	};

	if (isPrivateKey) {
		/** unkem a key from a tag
  * @param tag the tag
  * @param callback callback
  */
		this.unkem = function (tag) {
			return Bluebird.try(function () {
				if (!isPrivateKey) {
					throw new Error("not a private key");
				}

				return intKey.decryptKey();
			}).then(function () {
				keyStoreDebug("slow decrypt");

				return intKey.getSecret().unkem(tag);
			});
		};
	}
};

/** make a crypt key out of keydata */
function makeCryptKey(keyData) {
	if (keyData && keyData.realid) {
		if (!cryptKeys[keyData.realid]) {
			var key = new CryptKey(keyData);
			cryptKeys[keyData.realid] = key;
		}

		return cryptKeys[keyData.realid];
	}
}

/** get a crypt key
* @param realKeyID keys real id
* @param callback callback
*/
CryptKey.get = function (realKeyID) {
	return Bluebird.try(function () {
		if (!cryptKeys[realKeyID]) {
			return getKey(realKeyID);
		}
	}).then(function () {
		if (cryptKeys[realKeyID]) {
			return cryptKeys[realKeyID];
		}

		throw new errors.InvalidDataError("keychain not found");
	});
};

/** generate a crypt key
* @param curve curve to use
* @param callback callback
*/
CryptKey.generate = function (curve, comment) {
	return waitForReady.async().then(function () {
		var curveO = chelper.getCurve(curve),
		    rawKey = sjcl.ecc.elGamal.generateKeys(curveO);

		/*jslint nomen: true*/
		var p = rawKey.pub._point,
		    data = {
			point: {
				x: chelper.bits2hex(p.x.toBits()),
				y: chelper.bits2hex(p.y.toBits())
			},
			exponent: rawKey.sec._exponent.toBits(),
			realid: generateid(fingerPrintPublicKey(rawKey.pub)),
			curve: chelper.getCurveName(rawKey.pub._curve),
			comment: comment
		};
		/*jslint nomen: false*/

		var key = makeCryptKey(data);
		newKeys.push(key);

		key.setComment(comment);

		makeKeyUsableForEncryption(key.getRealID());

		return key;
	});
};

/** a signature key
* @param keyData sign key data
*/
SignKey = function SignKey(keyData) {
	var publicKey,
	    intKey,
	    x,
	    y,
	    curve,
	    point,
	    realid,
	    isPrivateKey = false,
	    comment = "";

	if (!keyData || !keyData.point || !keyData.point.x || !keyData.point.y || !keyData.curve || !keyData.realid) {
		throw new errors.InvalidDataError("invalid sign key data");
	}

	curve = chelper.getCurve(keyData.curve);

	x = curve.field.fromBits(chelper.hex2bits(keyData.point.x));
	y = curve.field.fromBits(chelper.hex2bits(keyData.point.y));
	point = new sjcl.ecc.point(curve, x, y);

	publicKey = new sjcl.ecc.ecdsa.publicKey(curve, point);

	realid = keyData.realid;

	//add exponent/decryptors
	if (keyData.exponent) {
		isPrivateKey = true;

		intKey = new Key(this, realid, keyData.decryptors, {
			secret: keyData.exponent,
			pastProcessor: toPrivateKey(sjcl.ecc.ecdsa, curve)
		});
	} else if (keyData.decryptors) {
		isPrivateKey = true;
		intKey = new Key(this, realid, keyData.decryptors, {
			pastProcessor: toPrivateKey(sjcl.ecc.ecdsa, curve)
		});
	} else {
		intKey = new Key(this, realid, []);
	}

	if (fingerPrintPublicKey(publicKey) !== intKey.getRealidFingerPrint()) {
		throw new errors.ValidationError("Fingerprint and Key id do not match");
	}

	this.getRealID = intKey.getRealID;

	this.getJWKPublicKey = function () {
		var p = publicKey._point;

		return {
			"crv": "P-256",
			"ext": true,
			"key_ops": ["verify"],
			"kty": "EC",
			"x": keyStore.format.base64ToUrl(sjcl.codec.base64.fromBits(p.x.toBits())),
			"y": keyStore.format.base64ToUrl(sjcl.codec.base64.fromBits(p.y.toBits()))
		};
	};

	this.getSubtlePublicKey = function () {
		if (!this._getSubtlePublicKeyPromise) {
			this._getSubtlePublicKeyPromise = getSubtle().importKey("jwk", this.getJWKPublicKey(), {
				name: "ECDSA",
				namedCurve: "P-256"
			}, true, ["verify"]);
		}

		return this._getSubtlePublicKeyPromise;
	};

	//add private key functions
	if (isPrivateKey) {
		this.decrypted = intKey.decrypted;
		this.decryptKey = intKey.decryptKey;

		this.getRealID = intKey.getRealID;
		this.getDecryptorsF = intKey.getDecryptors;

		this.addAsymDecryptor = intKey.addAsymDecryptor;
		this.addSymDecryptor = intKey.addSymDecryptor;
		this.addPWDecryptor = intKey.addPWDecryptor;

		this.getUploadData = function (includeAllDecryptors) {
			var p = publicKey._point,
			    data = {
				realid: intKey.getRealID(),
				point: {
					x: chelper.bits2hex(p.x.toBits()),
					y: chelper.bits2hex(p.y.toBits())
				},
				curve: chelper.getCurveName(publicKey._curve),
				type: "sign",
				decryptors: this.getDecryptorData(includeAllDecryptors),
				comment: comment
			};

			return data;
		};

		this.getDecryptorData = intKey.getDecryptorData;

		this.setComment = function setCommentF(theComment) {
			if (theComment) {
				comment = theComment;
			}
		};
	}

	function getFingerPrintF() {
		return fingerPrintPublicKey(publicKey);
	}

	var theKey = this;

	function subtleVerify(key, signatureBuf, buf) {
		return getSubtle().verify({
			name: "ECDSA",
			namedCurve: "P-256",
			hash: "SHA-256"
		}, key.publicKey, signatureBuf, buf);
	}

	if (isPrivateKey) {
		this.sign = function (hash, type) {
			if (privateActionsBlocked) {
				throw new errors.SecurityError("Private Actions are blocked (sign)");
			}

			var trustManager = __webpack_require__(71).default;
			var signatureCache = __webpack_require__(107);

			return Bluebird.try(function () {
				if (!trustManager.isLoaded) {
					return trustManager.listenPromise("loaded");
				}
			}).then(function () {
				if (!trustManager.hasKeyData(intKey.getRealID())) {
					keyStoreDebug("key not in key database");
					alert("key not in key database: " + intKey.getRealID() + " - please report this issue to feedback@whispeer.de!");
					throw new errors.SecurityError("key not in key database");
				}

				return intKey.decryptKey();
			}).then(function () {
				return intKey.getSecret().sign(hash);
				//return sjclWorkerInclude.asym.sign(intKey.getSecret(), hash).nodeify(this);
			}).then(function (signature) {
				if (signatureCache.isLoaded()) {
					signatureCache.addValidSignature(signature, hash, realid, type);
				}

				return signature;
			});
		};
	}

	function verifySjcl(signature, hash) {
		if (sjclWarning) {
			keyStoreDebug("Verifying with sjcl");
			sjclWarning = false;
		}
		if (firstVerify) {
			firstVerify = false;
			return Bluebird.resolve(publicKey.verify(hash, signature));
		}

		return sjclWorkerInclude.asym.verify(publicKey, signature, hash);
	}

	function verifySubtle(signature, text) {
		return Bluebird.try(function () {
			return theKey.getSubtlePublicKey();
		}).then(function (key) {
			var signatureBuf = sjcl.codec.arrayBuffer.fromBits(signature);
			var buf = new TextEncoder("utf-8").encode(text);

			return subtleVerify({ publicKey: key }, signatureBuf, buf);
		});
	}

	function verify(signature, text, hash) {
		if (!getSubtle()) {
			return verifySjcl(signature, hash);
		}

		return verifySubtle(signature, text).then(function (valid) {
			if (!valid) {
				return verifySjcl(signature, hash);
			}

			return valid;
		}).catch(function (e) {
			if (sjclWarning) {
				console.error(e);
			}
			return verifySjcl(signature, hash);
		});
	}

	function subtleToHex(buffer) {
		var hexCodes = [];
		var view = new DataView(buffer);
		for (var i = 0; i < view.byteLength; i += 4) {
			// Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
			var value = view.getUint32(i);
			// toString(16) will give the hex representation of the number without padding
			var stringValue = value.toString(16);
			// We use concatenation and slice for padding
			var padding = "00000000";
			var paddedValue = (padding + stringValue).slice(-padding.length);
			hexCodes.push(paddedValue);
		}

		// Join all the hex strings into one
		return hexCodes.join("");
	}

	function hash(text) {
		return Bluebird.resolve(text).then(function () {
			if (!getSubtle()) {
				throw new Error("subtle not available");
			}

			var buf = new TextEncoder("utf-8").encode(text);
			return getSubtle().digest("SHA-256", buf);
		}).then(function (hash) {
			return subtleToHex(hash);
		}).catch(function () {
			keyStoreDebug("Subtle hashing failed falling back to sjcl");
			return sjcl.hash.sha256.hash(text);
		});
	}

	this.getFingerPrint = getFingerPrintF;
	this.verify = function (signature, text, type, id) {
		var trustManager = __webpack_require__(71).default;
		var signatureCache = __webpack_require__(107);
		var name = chelper.bits2hex(signature).substr(0, 10);

		if (debug.enabled("whispeer:keyStore")) {
			console.time("verify-" + name + "-" + type);
		}

		return hash(text).then(function (hash) {
			hash = chelper.hex2bits(hash);

			if (!trustManager.hasKeyData(intKey.getRealID())) {
				throw new errors.SecurityError("key not in key database");
			}

			if (signatureCache.isValidSignatureInCache(signature, hash, realid)) {
				signatureCache.addValidSignature(signature, hash, realid, type, id);
				return Bluebird.resolve(true);
			}

			keyStoreDebug("Slow verify of type: " + type);

			return verify(signature, text, hash).then(function (valid) {
				if (valid) {
					signatureCache.addValidSignature(signature, hash, realid, type, id);
				}

				return valid;
			}).catch(function (e) {
				console.error(e);
				return false;
			});
		}).finally(function () {
			if (debug.enabled("whispeer:keyStore")) {
				console.timeEnd("verify-" + name + "-" + type);
			}
		});
	};
};

/** make a sign key out of keydata */
function makeSignKey(keyData) {
	if (keyData && keyData.realid) {
		if (!signKeys[keyData.realid]) {
			var key = new SignKey(keyData);
			signKeys[keyData.realid] = key;
		}

		return signKeys[keyData.realid];
	}
}

/** get a signature key
* @param realKeyID the real id of the sign key
* @param callback callback
*/
SignKey.get = function signKeyGet(realKeyID) {
	if (signKeys[realKeyID]) {
		return Bluebird.resolve(signKeys[realKeyID]);
	}

	return getKey(realKeyID).then(function () {
		if (signKeys[realKeyID]) {
			return signKeys[realKeyID];
		}

		throw new errors.InvalidDataError("keychain not found (sign)");
	});
};

/** generate a sign key
* @param curve curve for the key
* @param callback callback
*/
SignKey.generate = function (curve, comment) {
	return waitForReady.async().then(function () {
		var curveO = chelper.getCurve(curve),
		    rawKey = sjcl.ecc.ecdsa.generateKeys(curveO);

		/*jslint nomen: true*/
		var p = rawKey.pub._point,
		    data = {
			point: {
				x: chelper.bits2hex(p.x.toBits()),
				y: chelper.bits2hex(p.y.toBits())
			},
			exponent: rawKey.sec._exponent.toBits(),
			realid: generateid(fingerPrintPublicKey(rawKey.pub)),
			curve: chelper.getCurveName(rawKey.pub._curve)
		};
		/*jslint nomen: false*/

		var key = makeSignKey(data);
		newKeys.push(key);

		key.setComment(comment);

		return key;
	});
};

/** make a key out of keyData. mainly checks type and calls appropriate function */
makeKey = function makeKeyF(key) {
	if (key.type === "sym") {
		makeSymKey(key);
	} else if (key.type === "crypt") {
		makeCryptKey(key);
	} else if (key.type === "sign") {
		makeSignKey(key);
	} else {
		throw new errors.InvalidDataError("unknown key type");
	}
};

var verifyAllAttributesAreHashes = function verifyAllAttributesAreHashes(data) {
	var attr;
	for (attr in data) {
		if (data.hasOwnProperty(attr)) {
			if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
				verifyAllAttributesAreHashes(data[attr]);
			} else if (typeof data !== "string" || data.substr(0, 6) !== "hash") {
				throw new errors.ValidationError("invalid hashobject");
			}
		}
	}
};

var ObjectPadder = function ObjectPadder(obj, minLength) {
	this._obj = obj;
	this._minLength = minLength;
};

ObjectPadder.prototype._padObject = function (val) {
	return Bluebird.props(h.objectMap(val, function (value) {
		var padder = new ObjectPadder(value, this._minLength);
		return padder.pad();
	}, this));
};

ObjectPadder.prototype._padArray = function (val) {
	return Bluebird.resolve(val).bind(this).map(function (value) {
		var padder = new ObjectPadder(value, this._minLength);
		return padder.pad();
	});
};

ObjectPadder.prototype._padString = function (val) {
	var length = this._minLength - val.length % this._minLength + this._minLength;

	return Bluebird.try(function () {
		return keyStore.random.hex(length);
	}).then(function (rand) {
		return rand + "::" + val;
	});
};

ObjectPadder.prototype._padNumber = function (val) {
	return this._padString(val.toString()).then(function (padded) {
		return "num::" + padded;
	});
};

ObjectPadder.prototype._padAttribute = function (attr) {
	var type = typeof attr === "undefined" ? "undefined" : _typeof(attr);
	if (type === "object") {
		if (attr instanceof Array) {
			return this._padArray(attr);
		}

		return this._padObject(attr);
	} else if (type === "string") {
		return this._padString(attr);
	} else if (type === "number") {
		return this._padNumber(attr);
	} else if (type === "boolean") {
		return this._padNumber(attr ? 1 : 0);
	}

	throw new errors.InvalidDataError("could not pad value of type " + type);
};

ObjectPadder.prototype.pad = function () {
	return this._padAttribute(this._obj);
};

ObjectPadder.prototype._unpadObject = function (val) {
	var attr,
	    result = {};
	for (attr in val) {
		if (val.hasOwnProperty(attr)) {
			var padder = new ObjectPadder(val[attr], this._minLength);
			result[attr] = padder.unpad();
		}
	}

	return result;
};

ObjectPadder.prototype._unpadString = function (val) {
	var isNumber = false;

	if (val.indexOf("num::") === 0) {
		isNumber = true;

		val = val.substr(5);
	}

	if (val.length % this._minLength !== 2) {
		throw new errors.InvalidDataError("padding size invalid");
	}

	var paddingIndex = val.indexOf("::");

	if (paddingIndex === -1) {
		throw new errors.InvalidDataError("no padding seperator found");
	}

	var unpadded = val.substr(paddingIndex + 2);

	if (isNumber) {
		return parseFloat(unpadded);
	}

	return unpadded;
};

ObjectPadder.prototype._unpadArray = function (val) {
	var result = [],
	    i;
	for (i = 0; i < val.length; i += 1) {
		var padder = new ObjectPadder(val[i], this._minLength);
		result[i] = padder.unpad();
	}

	return result;
};

ObjectPadder.prototype._unpadAttribute = function (attr) {
	var type = typeof attr === "undefined" ? "undefined" : _typeof(attr);
	if (type === "object") {
		if (attr instanceof Array) {
			return this._unpadArray(attr);
			//TODO!
		} else {
			return this._unpadObject(attr);
		}
	} else if (type === "string") {
		return this._unpadString(attr);
	} else {
		throw new errors.InvalidDataError("could not pad value of type " + type);
	}
};

ObjectPadder.prototype.unpad = function () {
	return this._unpadAttribute(this._obj);
};

var ObjectCryptor = function ObjectCryptor(key, depth, object) {
	this._key = key;
	this._depth = depth;
	this._object = object;
};

ObjectCryptor.prototype._encryptAttr = function (cur) {
	if ((typeof cur === "undefined" ? "undefined" : _typeof(cur)) === "object") {
		return new ObjectCryptor(this._key, this._depth - 1, cur).encrypt();
	} else if (typeof cur === "string" || typeof cur === "number" || typeof cur === "boolean") {
		return this._key.encryptWithPrefix("data::", cur.toString());
	}

	throw new errors.InvalidDataError("Invalid encrypt!");
};

ObjectCryptor.prototype._encryptObject = function () {
	return Bluebird.props(h.objectMap(this._object, function (value, attr) {
		if (attr !== "key") {
			return this._encryptAttr(value);
		}
	}, this));
};

ObjectCryptor.prototype._encryptJSON = function () {
	return this._key.encryptWithPrefix("json::", JSON.stringify(this._object));
};

ObjectCryptor.prototype.encrypt = function () {
	if (this._depth > 0) {
		return this._encryptObject();
	} else {
		return this._encryptJSON();
	}
};

ObjectCryptor.prototype.decryptCorrectObject = function (obj) {
	if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && !(obj instanceof Array)) {
		return obj;
	} else {
		obj = sjcl.codec.utf8String.fromBits(obj);

		var prefix = obj.substr(0, 6);
		var content = obj.substr(6);

		if (prefix === "data::") {
			return content;
		} else if (prefix === "json::") {
			return JSON.parse(content);
		} else {
			throw new errors.ValidationError();
		}
	}
};

ObjectCryptor.prototype._decryptEndAttribute = function () {
	return this._key.decrypt(this._object).bind(this).then(function (result) {
		return this.decryptCorrectObject(result);
	});
};

ObjectCryptor.prototype._decryptPartialObjects = function () {
	return Bluebird.props(h.objectMap(this._object, function (value, attr) {
		if (attr !== "key") {
			return new ObjectCryptor(this._key, this._depth - 1, value).decrypt();
		}
	}, this));
};

ObjectCryptor.prototype.decrypt = function () {
	if (this._depth < 0) {
		throw new errors.DecryptionError("invalid decryption depth!");
	}

	if (this._object.iv && this._object.ct) {
		return this._decryptEndAttribute();
	} else {
		return this._decryptPartialObjects();
	}
};

/** our interface */
keyStore = {
	reset: function reset() {
		recovery = false;
		dirtyKeys = [];
		newKeys = [];

		keyGenIdentifier = "";

		symKeys = {};
		cryptKeys = {};
		signKeys = {};

		mainKey = undefined;

		password = "";
		keysUsableForEncryption = [];
		firstVerify = true;
	},

	setKeyGenIdentifier: function setKeyGenIdentifier(identifier) {
		keyGenIdentifier = identifier;
		//TODO: update all key identifiers for all keys.
	},

	getKeyGenIdentifier: function getKeyGenIdentifier() {
		return keyGenIdentifier;
	},

	correctKeyIdentifier: function correctKeyIdentifierF(realid) {
		return correctKeyIdentifier(realid);
	},

	addImprovementListener: function addImprovementListener(listener) {
		improvementListener.push(listener);
	},

	security: {
		blockPrivateActions: function blockPrivateActions() {
			privateActionsBlocked = true;
		},

		allowPrivateActions: function allowPrivateActions() {
			privateActionsBlocked = false;
		},

		arePrivateActionsBlocked: function arePrivateActionsBlocked() {
			return privateActionsBlocked;
		},

		addEncryptionIdentifier: function addEncryptionIdentifier(realid) {
			makeKeyUsableForEncryption(realid);
		},

		setPassword: function setPassword(pw) {
			recovery = false;
			password = pw;
		},

		verifyWithPW: function verifyWithPW(data, expectedResult) {
			if (!recovery) {
				//decrypt data with pw
				var result = sjcl.decrypt(password, chelper.Object2sjclPacket(data));
				//unpad data
				result = new ObjectPadder(JSON.parse(result), 128).unpad();

				//check with expectedresult
				if (!h.deepEqual(expectedResult, result)) {
					throw new errors.SecurityError("verify with pw failed");
				}
			}
		},

		makePWVerifiable: function makePWVerifiable(data, pw, cb) {
			return new ObjectPadder(data, 128).pad().then(function (paddedData) {
				return encryptPW(pw, JSON.stringify(paddedData));
			}).nodeify(cb);
		}
	},

	format: {
		urlToBase64: function urlToBase64(str) {
			return str.replace(/-/g, "+").replace(/_/g, "/");
		},
		base64ToUrl: function base64ToUrl(str) {
			return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
		},
		base64ToBits: function base64ToBits(base64) {
			return sjcl.codec.base64.toBits(base64);
		},
		bitsToBase64: function bitsToBase64(bits) {
			return sjcl.codec.base64.fromBits(bits);
		},
		fingerPrint: function fingerPrint(keyID) {
			var hex = keyID.split(":")[1];
			return sjcl.codec.base32.fromBits(sjcl.codec.hex.toBits(hex)).toUpperCase();
		},
		base32: function base32(bits) {
			return sjcl.codec.base32.fromBits(bits);
		},
		unBase32: function unBase32(bits) {
			return sjcl.codec.base32.toBits(bits);
		},
		unformat: function unformat(str, start) {
			if (str.indexOf(start + "::") !== 0) {
				throw new errors.InvalidDataError("format invalid");
			}

			return str.substr(start.length + 2);
		}
	},

	hash: {
		addPaddingToObject: function addPaddingToObject(obj, minLength) {
			minLength = minLength || 128;

			return new ObjectPadder(obj, minLength).pad();
		},
		removePaddingFromObject: function removePaddingFromObject(obj, padLength) {
			padLength = padLength || 128;
			return new ObjectPadder(obj, padLength).unpad();
		},
		hash: function hash(text) {
			return chelper.hash(text);
		},

		hashArrayBuffer: function hashArrayBuffer(buf) {
			return Bluebird.try(function () {
				return getSubtle().digest("SHA-256", buf);
			}).then(function (bufHash) {
				return bufferToHex(bufHash);
			}).catch(function () {
				return sjclWorkerInclude.hash(buf);
			});
		},

		hashPW: function hashPW(pw, salt) {
			return chelper.hashPW(pw, salt);
		},

		hashObjectOrValueHexAsync: function hashObjectOrValueHexAsync(val, version) {
			return Bluebird.try(function () {
				if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
					return sjclWorkerInclude.stringify(val, version, true);
				} else {
					return sjcl.hash.sha256.hash("data::" + val);
				}
			}).then(function (value) {
				return chelper.bits2hex(value);
			}).then(function (hash) {
				return "hash::" + hash;
			});
		},

		hashObjectOrValueHex: function hashObjectOrValueHex(val, version) {
			if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
				return "hash::" + new ObjectHasher(val, version).hash();
			} else {
				return "hash::" + chelper.bits2hex(sjcl.hash.sha256.hash("data::" + val));
			}
		}
	},

	upload: {
		preLoadMultiple: function preLoadMultiple(realids, cb) {
			return Bluebird.resolve(realids).map(function (realid) {
				return getKey(realid);
			}).nodeify(cb);
		},
		isKeyLoaded: function isKeyLoaded(realid) {
			return symKeys.hasOwnProperty(realid) || cryptKeys.hasOwnProperty(realid) || signKeys.hasOwnProperty(realid);
		},
		addKey: function addKey(keyData) {
			if (h.isRealID(keyData.realid)) {
				makeKey(keyData);
			}

			return keyData.realid;
		},
		getKeyAccessCount: function getKeyAccessCount(keyrealid) {
			var key = symKeys[keyrealid];
			if (key) {
				return key.getAccessCount();
			}

			return -1;
		},
		setKeyGet: function setKeyGet(_keyGetFunction) {
			keyGetFunction = _keyGetFunction;
		},
		getExistingKey: function getExistingKey(keyid) {
			if (!keyStore.upload.isKeyLoaded(keyid)) {
				return;
			}

			var key = symKeys[keyid] || cryptKeys[keyid] || signKeys[keyid];
			return key.getUploadData(true);
		},
		getKey: function getKey(keyid) {
			var i;
			for (i = 0; i < newKeys.length; i += 1) {
				if (keyid === newKeys[i].getRealID()) {
					return newKeys[i].getUploadData();
				}
			}
		},
		getKeys: function getKeys(keys) {
			var addKeys = [];
			var i;
			for (i = 0; i < newKeys.length; i += 1) {
				if (keys.indexOf(newKeys[i].getRealID()) > -1) {
					addKeys.push(newKeys[i].getUploadData());
				}
			}

			return addKeys;
		},
		getDecryptors: function getDecryptors(allowed, allowedEncryptors) {
			var addKeyDecryptors = {};

			dirtyKeys.filter(function (key) {
				return allowed.indexOf(key.getRealID()) !== -1;
			}).forEach(function (key) {
				var decryptors = key.getDecryptorData();

				if (allowedEncryptors) {
					decryptors = decryptors.filter(function (decryptor) {
						return allowedEncryptors.indexOf(decryptor.decryptorid) !== -1;
					});
				}

				addKeyDecryptors[key.getRealID()] = decryptors;
			});

			return addKeyDecryptors;
		},
		uploaded: function uploaded(data) {
			/*
   {
   	keys: {
   		realid1: realid1,
   		realid2: realid2,
   		realid3: realid3,
   		...
   	},
   	decryptors: {
   		realid1: data
   	}
   }
   */
			var realid;
			for (realid in data.decryptors) {
				if (data.decryptors.hasOwnProperty(realid)) {
					getKey(realid).removeDirty(data.decryptors[realid]);
				}
			}

			var remainedKeys = [];

			var i;
			for (i = 0; i < newKeys.length; i += 1) {
				realid = newKeys[i].getRealID();

				if (!data.keys[realid]) {
					remainedKeys.push(newKeys[i]);
				}
			}

			newKeys = remainedKeys;
		}
	},

	random: {
		hex: function hex(length, cb) {
			return waitForReady.async().then(function () {
				var res = chelper.bits2hex(sjcl.random.randomWords(Math.ceil(length / 8)));
				return res.substr(0, length);
			}).nodeify(cb);
		},
		words: function words(number, cb) {
			return waitForReady.async().then(function () {
				return sjcl.random.randomWords(number);
			}).nodeify(cb);
		}
	},

	sym: {
		registerMainKey: function registerMainKey(_mainKey) {
			mainKey = _mainKey;
		},

		/** generate a key
  * @param callback callback
  */
		generateKey: function generateKeyF(callback, comment) {
			return waitForReady.async().then(function () {
				return SymKey.generate(comment);
			}).then(function (key) {
				return key.getRealID();
			}).nodeify(callback);
		},

		createBackupKey: function createBackupKey(realID, callback) {
			/* two keys: key1 -> key2 -> main
   * key2 is on the server
   * key1 is downloaded/printed
   * server never distributes key2 except when advised to do so (manually for now!)
   */
			var backupKey, outerBackupKey, toBackupKey;

			return waitForReady.async().then(function () {
				return SymKey.get(realID);
			}).then(function (_toBackupKey) {
				toBackupKey = _toBackupKey;
				outerBackupKey = sjcl.random.randomWords(8);
				backupKey = new SymKey(sjcl.random.randomWords(8));

				makeKeyUsableForEncryption(backupKey.getRealID());
				makeKeyUsableForEncryption(new SymKey(outerBackupKey).getRealID());

				return Bluebird.all([toBackupKey.addSymDecryptor(backupKey), backupKey.addSymDecryptor(new SymKey(outerBackupKey))]);
			}).then(function () {
				var decryptorsAdded = keyStore.upload.getDecryptors([toBackupKey.getRealID()], [backupKey.getRealID()]);
				var backupKeyData = backupKey.getUploadData();

				backupKeyData.decryptors[0].type = "backup";

				return {
					decryptors: decryptorsAdded,
					innerKey: backupKeyData,
					outerKey: outerBackupKey
				};
			}).nodeify(callback);
		},

		loadBackupKey: function loadBackupKey(outerBackupKey) {
			var key = new SymKey(outerBackupKey);
			if (!symKeys[key.getRealID()]) {
				symKeys[key.getRealID()] = key;
			} else {
				throw new errors.SecurityError("Key already exists in symKey database (double add?)");
			}

			recovery = true;

			return key.getRealID();
		},

		/** encrypt key with sym key
  * @param realID key to encrypt
  * @param parentKeyID key to encrypt with
  * @param callback callback
  */
		symEncryptKey: function symEncryptKeyF(realID, parentKeyID, callback) {
			return SymKey.get(realID).then(function (key) {
				return key.addSymDecryptor(parentKeyID);
			}).nodeify(callback);
		},

		/** encrypt this key with an asymmetric key
  * @param realID key to encrypt
  * @param parentKeyID key to encrypt with
  * @param callback callback
  */
		asymEncryptKey: function asymEncryptKeyF(realID, parentKeyID, callback) {
			//ensure the key exists first!
			return SymKey.get(realID).then(function () {
				return CryptKey.get(parentKeyID);
			}).then(function (key) {
				return key.kem();
			}).then(function (parentRealID) {
				return keyStore.sym.symEncryptKey(realID, parentRealID);
			}).nodeify(callback);
		},

		/** encrypt key with password
  * @param realID key to encrypt
  * @param password password to encrypt with
  * @param callback callback
  */
		pwEncryptKey: function pwEncryptKeyF(realID, password, callback) {
			return SymKey.get(realID).then(function (key) {
				return key.addPWDecryptor(password);
			}).nodeify(callback);
		},

		/** encrypt text with this key.
  * @param text text to encrypt
  * @param realKeyID key to encrypt with
  * @param callback callback
  */
		encryptText: function encryptText(text, realKeyID, callback) {
			return SymKey.get(realKeyID).then(function (key) {
				return key.encryptWithPrefix("data::", text);
			}).nodeify(callback);
		},

		/** encrypt an object
  * @param object Object to encrypt
  * @param realKeyID key to encrypt with
  * @param callback callback
  */
		encryptObject: function encryptObject(object, realKeyID, depth, callback) {
			if (object.iv) {
				throw new errors.InvalidDataError("IV already set.");
			}

			return SymKey.get(realKeyID).then(function (key) {
				return new ObjectCryptor(key, depth, object).encrypt();
			}).nodeify(callback);
		},

		decryptObject: function decryptObject(cobject, depth, callback, keyID) {
			return SymKey.get(keyID || mainKey).then(function (key) {
				return new ObjectCryptor(key, depth, cobject).decrypt();
			}).nodeify(callback);
		},

		/** decrypt an encrypted text
  * @param ctext text to decrypt
  * @param realKeyID key to decrypt with
  * @param callback callback
  */
		decryptText: function decryptText(ctext, realKeyID, callback) {
			return SymKey.get(realKeyID).then(function (key) {
				return key.decrypt(ctext);
			}).then(function (decryptedData) {
				return sjcl.codec.utf8String.fromBits(removeExpectedPrefix(decryptedData, "data::"));
			}).nodeify(callback);
		},

		encryptArrayBuffer: function encryptArrayBuffer(buf, realKeyID, progressCallback) {
			return SymKey.get(realKeyID).then(function (key) {
				return key.encryptWithPrefix("buf::", buf, progressCallback, true);
			}).then(function (result) {
				result.iv = sjcl.codec.arrayBuffer.fromBits(result.iv, false);
				result.ct.tag = sjcl.codec.arrayBuffer.fromBits(result.ct.tag, false);
				return h.concatBuffers(result.iv, result.ct.ciphertext_buffer, result.ct.tag);
			});
		},

		decryptArrayBuffer: function decryptArrayBuffer(buf, realKeyID, progressCallback) {
			return SymKey.get(realKeyID).then(function (key) {
				var buf32 = new Uint32Array(buf);

				var decr = {
					iv: sjcl.codec.arrayBuffer.toBits(new Uint32Array(buf32.subarray(0, 4)).buffer),
					ct: new Uint32Array(buf32.subarray(4, buf32.byteLength / 4 - 2)).buffer,
					tag: sjcl.codec.arrayBuffer.toBits(new Uint32Array(buf32.subarray(buf32.byteLength / 4 - 2)).buffer)
				};

				return key.decrypt(decr, null, progressCallback);
			}).then(function (decryptedData) {
				return removeExpectedPrefix(decryptedData, "buf::");
			});
		},

		decryptBigBase64: function decryptBigBase64(bin, realKeyID, callback) {
			return SymKey.get(realKeyID).then(function (key) {
				bin = sjcl.codec.base64.toBits(bin);

				var decr = {
					iv: sjcl.bitArray.bitSlice(bin, 0, 32 * 4),
					ct: sjcl.bitArray.bitSlice(bin, 32 * 4)
				};

				return key.decrypt(decr);
			}).then(function (decryptedData) {
				return sjcl.codec.base64.fromBits(removeExpectedPrefix(decryptedData, "bin::"));
			}).nodeify(callback);
		}
	},

	asym: {
		/** generate a key
  * @param callback callback
  */
		generateKey: function generateKeyF(callback, comment) {
			return CryptKey.generate("256", comment).then(function (key) {
				return key.getRealID();
			}).nodeify(callback);
		},

		/** encrypt key with sym key
  * @param realID key to encrypt
  * @param parentKeyID key to encrypt with
  * @param callback callback
  */
		symEncryptKey: function symEncryptKeyF(realID, parentKeyID, callback) {
			return CryptKey.get(realID).then(function (key) {
				return key.addSymDecryptor(parentKeyID);
			}).nodeify(callback);
		},

		/** encrypt key with password
  * @param realID key to encrypt
  * @param password password to encrypt with
  * @param callback callback
  */
		pwEncryptKey: function pwEncryptKeyF(realID, password, callback) {
			return CryptKey.get(realID).then(function (key) {
				return key.addPWDecryptor(password);
			}).nodeify(callback);
		},

		fingerPrintKey: function fingerPrintKey(realID, cb) {
			return CryptKey.get(realID).then(function (key) {
				return key.getFingerPrint();
			}).nodeify(cb);
		}
	},

	sign: {
		/** generate a key
  * @param callback callback
  */
		generateKey: function generateKeyF(callback, comment) {
			return SignKey.generate("256", comment).then(function (key) {
				return key.getRealID();
			}).nodeify(callback);
		},

		/** encrypt key with sym key
  * @param realID key to encrypt
  * @param parentKeyID key to encrypt with
  * @param callback callback
  */
		symEncryptKey: function symEncryptKeyF(realID, parentKeyID, callback) {
			return SignKey.get(realID).then(function (key) {
				return key.addSymDecryptor(parentKeyID);
			}).nodeify(callback);
		},

		/** encrypt key with password
  * @param realID key to encrypt
  * @param password password to encrypt with
  * @param callback callback
  */
		pwEncryptKey: function pwEncryptKeyF(realID, password, callback) {
			return SignKey.get(realID).then(function (key) {
				return key.addPWDecryptor(password);
			}).nodeify(callback);
		},

		signObject: function signObject(object, realID, version, callback) {
			return Bluebird.all([SignKey.get(realID), sjclWorkerInclude.stringify(object, version, true)]).spread(function (key, hash) {
				return key.sign(hash, object._type);
			}).then(function (signature) {
				return chelper.bits2hex(signature);
			}).nodeify(callback);
		},

		verifyObject: function verifyObject(signature, object, realID, version, id) {
			signature = chelper.hex2bits(signature);

			return Bluebird.all([stringifyObject(object, version), SignKey.get(realID)]).spread(function (objectString, key) {
				return key.verify(signature, objectString, object._type, id);
			}).catch(function (e) {
				console.error(e);

				return false;
			});
		},

		fingerPrintKey: function fingerPrintKey(realID, cb) {
			return CryptKey.get(realID).then(function (key) {
				return key.getFingerPrint();
			}).nodeify(cb);
		}
	}
};

module.exports = keyStore;

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_helper__ = __webpack_require__(6);

var MINUTE = 60 * 1000;
var Burst = (function () {
    function Burst() {
        var _this = this;
        this.getItems = function () {
            return _this.items;
        };
        this.hasItem = function (item) {
            return _this.items.indexOf(item) > -1;
        };
        this.addItem = function (item) {
            if (!_this.hasItems()) {
                _this.chunkID = item.getChunkID();
            }
            _this.items.push(item);
            _this.items.sort(function (m1, m2) {
                return m1.getTime() - m2.getTime();
            });
        };
        this.removeAllExceptLast = function () {
            _this.items.splice(0, _this.items.length - 1);
        };
        this.firstItem = function () {
            return _this.items[0];
        };
        this.lastItem = function () {
            return _this.items[_this.items.length - 1];
        };
        this.hasItems = function () {
            return _this.items.length > 0;
        };
        this.fitsItem = function (item) {
            if (!_this.hasItems()) {
                return true;
            }
            return _this.sameChunk(item) &&
                _this.sameSender(item) &&
                _this.continousMessage(item) &&
                _this.sameDay(item) &&
                _this.timeDifference(item) < MINUTE * 10;
        };
        this.getChunkID = function () { return _this.chunkID; };
        this.sameChunk = function (item) {
            if (!item) {
                return false;
            }
            return _this.getChunkID() === item.getChunkID();
        };
        this.sameSender = function (message) {
            return _this.firstItem().data.sender.id === message.data.sender.id;
        };
        this.sameDay = function (message) {
            if (!message) {
                return false;
            }
            if (message instanceof Burst) {
                message = message.firstItem();
            }
            var date1 = new Date(__WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal(_this.firstItem().getTime()));
            var date2 = new Date(__WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal(message.getTime()));
            if (date1.getDate() !== date2.getDate()) {
                return false;
            }
            if (date1.getMonth() !== date2.getMonth()) {
                return false;
            }
            if (date1.getFullYear() !== date2.getFullYear()) {
                return false;
            }
            return true;
        };
        this.timeDifference = function (item) {
            return Math.abs(__WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal(item.getTime()) - __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal(_this.firstItem().getTime()));
        };
        this.isMe = function () {
            return _this.firstItem().data.sender.me;
        };
        this.isOther = function () {
            return !_this.firstItem().data.sender.me;
        };
        this.sender = function () {
            return _this.firstItem().data.sender;
        };
        this.items = [];
    }
    Burst.prototype.continousMessage = function (item) {
        if (this.items.findIndex(function (m) { return m.getClientID() === item.getPreviousID(); }) !== -1) {
            return true;
        }
        return this.items.findIndex(function (m) { return m.getPreviousID() === item.getClientID(); }) !== -1;
    };
    return Burst;
}());
/* harmony default export */ __webpack_exports__["a"] = (Burst);
//# sourceMappingURL=burst.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return queue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asset_Queue__ = __webpack_require__(75);

/* Queue that ensures one file transfer at a time.  */
var queue = new __WEBPACK_IMPORTED_MODULE_0__asset_Queue__["a" /* default */](1);
queue.start();
//# sourceMappingURL=fileTransferQueue.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);

var playBackBlocked = false;
var VoicemailPlayer = (function () {
    function VoicemailPlayer(recordings) {
        var _this = this;
        this.playing = false;
        this.loaded = false;
        this.recordings = [];
        this.recordPlayingIndex = 0;
        this.loadingPromises = [];
        this.positionRAFListener = [];
        this.positionListener = function () {
            var position = _this.getPosition();
            _this.positionRAFListener.forEach(function (func) { return func(position); });
            if (_this.isPlaying()) {
                window.requestAnimationFrame(_this.positionListener);
            }
        };
        this.onPositionUpdateRAF = function (listener) { return _this.positionRAFListener.push(listener); };
        this.seekTo = function (time) {
            var timeInTrack = time;
            var recordPlayingIndex = _this.recordings.findIndex(function (_a) {
                var duration = _a.duration;
                if (timeInTrack < duration) {
                    return true;
                }
                timeInTrack -= duration;
                return false;
            });
            if (recordPlayingIndex === -1) {
                return;
            }
            _this.recordPlayingIndex = recordPlayingIndex;
            _this.recordings[_this.recordPlayingIndex].audio.currentTime = timeInTrack;
            _this.positionListener();
            if (_this.isPlaying()) {
                _this.recordings.forEach(function (_a, index) {
                    var audio = _a.audio;
                    if (index !== recordPlayingIndex) {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                });
                _this.recordings[_this.recordPlayingIndex].audio.play();
            }
        };
        this.awaitLoading = function () {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](_this.loadingPromises);
        };
        this.isLoaded = function () { return _this.loaded; };
        this.onEnded = function () {
            if (_this.isPlaying()) {
                _this.recordPlayingIndex += 1;
                if (_this.recordPlayingIndex >= _this.recordings.length) {
                    _this.reset();
                    return;
                }
                _this.recordings[_this.recordPlayingIndex].audio.play();
                // Use a Promise to trigger the angular zone. Zones are bad. Angular DI is bad.
                __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]().then(function () { });
            }
        };
        recordings.map(function (_a) {
            var url = _a.url, estimatedDuration = _a.estimatedDuration;
            return _this.addRecording(url, estimatedDuration);
        });
    }
    VoicemailPlayer.prototype.play = function () {
        if (playBackBlocked) {
            return;
        }
        if (VoicemailPlayer.activePlayer) {
            VoicemailPlayer.activePlayer.pause();
        }
        this.recordings[this.recordPlayingIndex].audio.play();
        VoicemailPlayer.activePlayer = this;
        this.playing = true;
        this.loaded = true;
        this.positionListener();
    };
    VoicemailPlayer.prototype.pause = function () {
        this.recordings[this.recordPlayingIndex].audio.pause();
        VoicemailPlayer.activePlayer = null;
        this.playing = false;
    };
    VoicemailPlayer.prototype.toggle = function () {
        if (this.playing) {
            this.pause();
        }
        else {
            this.play();
        }
    };
    VoicemailPlayer.prototype.isPlaying = function () {
        return this.playing;
    };
    VoicemailPlayer.prototype.isPaused = function () {
        return !this.playing;
    };
    VoicemailPlayer.prototype.getDuration = function (beforeIndex) {
        return this.recordings.slice(0, beforeIndex).reduce(function (prev, next) { return prev + next.audio.duration || next.duration; }, 0);
    };
    VoicemailPlayer.prototype.getPosition = function () {
        var currentDuration = this.getDuration(this.recordPlayingIndex);
        return currentDuration + this.recordings[this.recordPlayingIndex].audio.currentTime;
    };
    VoicemailPlayer.prototype.reset = function () {
        this.recordings.forEach(function (_a) {
            var audio = _a.audio;
            audio.pause();
            audio.currentTime = 0;
        });
        this.recordPlayingIndex = 0;
        if (VoicemailPlayer.activePlayer && this !== VoicemailPlayer.activePlayer) {
            VoicemailPlayer.activePlayer.reset();
        }
        VoicemailPlayer.activePlayer = null;
        this.playing = false;
    };
    VoicemailPlayer.prototype.addRecording = function (url, duration) {
        var audio = new Audio(url.replace("file://", ""));
        var audioInfo = {
            url: url,
            audio: audio,
            duration: duration
        };
        audio.addEventListener("ended", this.onEnded);
        var loadingPromise = new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (resolve) { return audio.addEventListener("loadedmetadata", resolve); });
        this.loadingPromises.push(loadingPromise);
        this.recordings.push(audioInfo);
    };
    VoicemailPlayer.prototype.destroy = function () {
        this.recordings.forEach(function (_a) {
            var audio = _a.audio, url = _a.url;
            audio.src = "";
            audio.load();
            // TODO delete file created!
            console.warn("TODO: delete file:", url);
        });
    };
    VoicemailPlayer.prototype.getRecordings = function () {
        return this.recordings.slice();
    };
    VoicemailPlayer.activePlayer = null;
    VoicemailPlayer.setPlaybackBlocked = function (blocked) { return playBackBlocked = blocked; };
    return VoicemailPlayer;
}());
/* harmony default export */ __webpack_exports__["a"] = (VoicemailPlayer);
//# sourceMappingURL=voicemailPlayer.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enum__ = __webpack_require__(194);

var states = new __WEBPACK_IMPORTED_MODULE_0__enum__["a" /* default */](["INIT", "PENDING", "SUCCESS", "FAILED"]);
var State = (function () {
    function State() {
        this._state = states.INIT;
        this.data = {
            init: true,
            pending: false,
            success: false,
            failed: false
        };
    }
    State.prototype._turnOneDataTrue = function () {
        states.symbols().forEach(function (symbol) {
            var name = symbol.name.toLowerCase();
            if (this._state === symbol) {
                this.data[name] = true;
            }
            else {
                this.data[name] = false;
            }
        }, this);
    };
    ;
    State.prototype.success = function () {
        if (this._state === states.PENDING) {
            this._state = states.SUCCESS;
            this._turnOneDataTrue();
        }
    };
    ;
    State.prototype.failed = function () {
        if (this._state === states.PENDING) {
            this._state = states.FAILED;
            this._turnOneDataTrue();
        }
    };
    ;
    State.prototype.reset = function () {
        this._state = states.INIT;
        this._turnOneDataTrue();
    };
    ;
    State.prototype.pending = function () {
        this._state = states.PENDING;
        this._turnOneDataTrue();
    };
    ;
    State.prototype.isPending = function () {
        return this._state === states.PENDING;
    };
    ;
    State.prototype.isSuccess = function () {
        return this._state === states.SUCCESS;
    };
    ;
    State.prototype.isFailed = function () {
        return this._state === states.FAILED;
    };
    ;
    State.prototype.isInit = function () {
        return this._state === states.INIT;
    };
    ;
    State.prototype.getState = function () {
        return this._state;
    };
    ;
    State.prototype.getPossibleStates = function () {
        return states;
    };
    ;
    return State;
}());
/* harmony default export */ __webpack_exports__["a"] = (State);
//# sourceMappingURL=state.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_media__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_typestate__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_typestate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_typestate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_uuid_v4__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_uuid_v4__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_services_imageUpload_service__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__lib_services_fileUpload_service__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__lib_services_error_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lib_angularUtils__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__lib_messages_messageService__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__lib_messages_chat__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lib_messages_message__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__lib_helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__lib_services_blobService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__lib_messages_burst__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__lib_services_featureToggles__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__lib_services_location_manager__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
 // tslint:disable-line:no-unused-variable























var RecordingStates;
(function (RecordingStates) {
    RecordingStates[RecordingStates["NotRecording"] = 0] = "NotRecording";
    RecordingStates[RecordingStates["Recording"] = 1] = "Recording";
    RecordingStates[RecordingStates["Paused"] = 2] = "Paused";
})(RecordingStates || (RecordingStates = {}));
var RecordingStateMachine = new __WEBPACK_IMPORTED_MODULE_4_typestate__["TypeState"].FiniteStateMachine(RecordingStates.NotRecording);
RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.Recording);
RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.NotRecording);
RecordingStateMachine.from(RecordingStates.Recording).to(RecordingStates.Paused);
var RECORDING_STOP_DELAY = 100;
var ImagePickerOptions = {
    width: 2560,
    height: 1440,
    maximumImagesCount: 6
};
var INFINITE_SCROLLING_THRESHOLD = 1000;
var MAXIMUM_FILE_SIZE_MB = Object(__WEBPACK_IMPORTED_MODULE_22__lib_services_location_manager__["c" /* isBusinessVersion */])() ? 15 : 10;
var isIOS = function () { return window.device && window.device.platform === 'iOS'; };
var selectFileIOS = function () {
    return new __WEBPACK_IMPORTED_MODULE_3_bluebird__(function (resolve, reject) { return window.FilePicker.pickFile(resolve, reject, "public.item"); })
        .then(function (url) { return "file://" + url; });
};
var selectFileAndroid = function () {
    return new __WEBPACK_IMPORTED_MODULE_3_bluebird__(function (resolve, reject) { return window.fileChooser.open(resolve, reject); })
        .then(function (url) { return "file://" + url; });
};
var selectFile = function () { return isIOS() ? selectFileIOS() : selectFileAndroid(); };
var FILE = new __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]();
var inView = __webpack_require__(452);
var initService = __webpack_require__(20);
var BurstHelper;
(function (BurstHelper) {
    BurstHelper.getNewElements = function (messagesAndUpdates, bursts) {
        return messagesAndUpdates.filter(function (message) {
            return bursts.reduce(function (prev, current) {
                return prev && !current.hasItem(message);
            }, true);
        });
    };
    BurstHelper.calculateBursts = function (messages) {
        var bursts = [new __WEBPACK_IMPORTED_MODULE_20__lib_messages_burst__["a" /* default */]()];
        var currentBurst = bursts[0];
        messages.sort(function (m1, m2) {
            return m2.getTime() - m1.getTime();
        });
        messages.forEach(function (messageOrUpdate) {
            if (!currentBurst.fitsItem(messageOrUpdate)) {
                currentBurst = new __WEBPACK_IMPORTED_MODULE_20__lib_messages_burst__["a" /* default */]();
                bursts.push(currentBurst);
            }
            currentBurst.addItem(messageOrUpdate);
        });
        return bursts;
    };
    var hasMatchingMessage = function (oldBurst, newBurst) {
        var matchingMessages = newBurst.getItems().filter(function (message) {
            return oldBurst.hasItem(message);
        });
        return matchingMessages.length > 0;
    };
    var addBurst = function (bursts, burst) {
        bursts.push(burst);
        return true;
    };
    var mergeBurst = function (oldBurst, newBurst) {
        var newMessages = newBurst.getItems().filter(function (message) {
            return !oldBurst.hasItem(message);
        });
        newMessages.forEach(function (message) {
            oldBurst.addItem(message);
        });
        return true;
    };
    var addBurstOrMerge = function (bursts, burst) {
        var possibleMatches = bursts.filter(function (oldBurst) {
            return hasMatchingMessage(oldBurst, burst);
        });
        if (possibleMatches.length === 0) {
            return addBurst(bursts, burst);
        }
        if (possibleMatches.length === 1) {
            return mergeBurst(possibleMatches[0], burst);
        }
        if (possibleMatches.length > 1) {
            __WEBPACK_IMPORTED_MODULE_12__lib_services_error_service__["default"].criticalError(new Error("Burst merging possible matches > 1 wtf..."));
            return false;
        }
    };
    BurstHelper.mergeBursts = function (bursts, newBursts) {
        return newBursts.reduce(function (prev, burst) {
            return prev && addBurstOrMerge(bursts, burst);
        }, true);
    };
})(BurstHelper || (BurstHelper = {}));
var MessagesPage = (function () {
    function MessagesPage(navCtrl, actionSheetCtrl, platform, imagePicker, camera, translate, media, alertController, navParams, element) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.imagePicker = imagePicker;
        this.camera = camera;
        this.translate = translate;
        this.media = media;
        this.alertController = alertController;
        this.navParams = navParams;
        this.element = element;
        this.messagesLoading = true;
        this.burstTopic = 0;
        this.stopRecordingPromise = __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"]();
        this.recordings = [];
        this.firstRender = true;
        this.newMessageText = "";
        this.moreMessagesAvailable = true;
        this.inViewMessages = [];
        this.oldScrollFromBottom = 0;
        this.inputFocus = false;
        this.recordingInfo = {
            UUID: "",
            duration: 0,
            startTime: 0,
            updateInterval: 0
        };
        this.mutationListener = function (mutations) {
            var id = _this.getFirstInViewMessageId();
            if (!id || _this.oldScrollFromBottom < 15) {
                return _this.stabilizeScroll();
            }
            var firstElement = document.querySelector("[data-messageid=\"" + id + "\"]");
            var updateScroll = mutations.some(function (mutation) {
                return [].slice.call(mutation.addedNodes).some(function (element) {
                    var position = firstElement.compareDocumentPosition(element);
                    return position & 0x02;
                });
            });
            if (updateScroll) {
                return _this.stabilizeScroll();
            }
            console.warn("Only elements below newest messages have changed not updating viewport");
        };
        this.keyboardChange = function () {
            _this.stabilizeScroll();
        };
        this.sendVoicemail = function () {
            var player = new __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */](_this.recordings);
            _this.resetRecordingState();
            player.awaitLoading().then(function () { return player.getRecordings(); }).map(function (_a) {
                var url = _a.url, audio = _a.audio, duration = _a.duration;
                var _b = Object(__WEBPACK_IMPORTED_MODULE_19__lib_services_blobService__["b" /* unpath */])(url), directory = _b.directory, name = _b.name;
                return FILE.moveFile(_this.platform.is("ios") ? "file://" + directory : directory, name, FILE.cacheDirectory, name).then(function () { return ({
                    url: "" + FILE.cacheDirectory + name,
                    duration: duration
                }); });
            }).map(function (voicemail) {
                var url = voicemail.url, duration = voicemail.duration;
                return _this.getFile(url).then(function (fileObject) {
                    return new __WEBPACK_IMPORTED_MODULE_11__lib_services_fileUpload_service__["a" /* default */](fileObject, { encrypt: true, extraInfo: { duration: duration } });
                });
            }).then(function (voicemails) {
                _this.sendMessage({
                    text: "",
                    voicemails: voicemails,
                });
            }).catch(function (e) {
                console.error("Sending voicemail failed", e);
                // TODO
            });
        };
        this.sendMessageToChat = function () {
            if (_this.isRecordingUIVisible()) {
                if (_this.isRecording()) {
                    _this.toggleRecording();
                }
                return _this.stopRecordingPromise.then(function () { return _this.sendVoicemail(); });
            }
            _this.sendMessage({
                text: _this.newMessageText
            });
            _this.newMessageText = "";
            document.querySelector("textarea").focus();
            _this.change();
        };
        this.getFile = function (url, type) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](FILE.resolveLocalFilesystemUrl(url))
                .then(function (file) { return new __WEBPACK_IMPORTED_MODULE_3_bluebird__(function (resolve, reject) { return file.file(resolve, reject); }); })
                .then(function (file) {
                file.originalUrl = url;
                if (_this.platform.is("ios")) {
                    file.localURL = url.replace("file://", "http://" + window.location.host);
                }
                if (file.size > MAXIMUM_FILE_SIZE_MB * 1000 * 1000) {
                    _this.showFileTooBigWarning();
                    throw new Error("File too big, not sending.");
                }
                if (type) {
                    file.type = type;
                }
                return file;
            });
        };
        this.takeImage = function () {
            _this.camera.getPicture(_this.cameraOptions).then(function (url) {
                return _this.getFile(url, "image/png");
            }).then(function (file) {
                return new __WEBPACK_IMPORTED_MODULE_10__lib_services_imageUpload_service__["a" /* default */](file);
            }).then(function (image) {
                _this.sendMessage({
                    images: [image],
                    text: ""
                });
            });
        };
        this.toggleInputFocus = function () {
            return _this.inputFocus = !_this.inputFocus;
        };
        this.showCameraShortcut = function () {
            return !_this.inputFocus && _this.newMessageText.length === 0;
        };
        this.isRecordingUIVisible = function () {
            return !RecordingStateMachine.is(RecordingStates.NotRecording);
        };
        this.isPlayback = function () {
            return RecordingStateMachine.is(RecordingStates.Paused) && _this.recordingPlayer.isPlaying();
        };
        this.isRecording = function () {
            return RecordingStateMachine.is(RecordingStates.Recording);
        };
        this.isPaused = function () {
            return RecordingStateMachine.is(RecordingStates.Paused);
        };
        this.getRecordingDir = function () {
            if (!_this.platform.is("ios")) {
                return FILE.externalRootDirectory;
            }
            return FILE.tempDirectory.replace(/^file:\/\//, '');
        };
        this.getRecordingFileName = function () {
            var extension = _this.platform.is("ios") ? "m4a" : "aac";
            var dir = _this.getRecordingDir();
            return dir + "recording_" + _this.recordingInfo.UUID + "." + extension;
        };
        this.formatTime = function (seconds) {
            var fullSeconds = __WEBPACK_IMPORTED_MODULE_17__lib_helper_helper__["default"].pad(Math.floor(seconds % 60), 2);
            var minutes = __WEBPACK_IMPORTED_MODULE_17__lib_helper_helper__["default"].pad(Math.floor(seconds / 60), 2);
            return minutes + ":" + fullSeconds;
        };
        this.getCurrentDuration = function (beforeIndex) {
            if (beforeIndex) {
                return 0;
            }
            if (!RecordingStateMachine.is(RecordingStates.Recording)) {
                return 0;
            }
            return _this.recordingInfo.duration;
        };
        this.getDuration = function (beforeIndex) {
            return _this.recordingPlayer.getDuration() + _this.getCurrentDuration();
        };
        this.toggleRecording = function () {
            if (_this.stopRecordingPromise.isPending()) {
                return;
            }
            if (RecordingStateMachine.is(RecordingStates.Recording)) {
                _this.stopRecordingPromise = __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"]().delay(RECORDING_STOP_DELAY).then(function () {
                    RecordingStateMachine.go(RecordingStates.Paused);
                    _this.recordingFile.stopRecord();
                    _this.recordingFile.release();
                    _this.recordingFile = null;
                    _this.recordings.push({
                        url: _this.getRecordingFileName(),
                        estimatedDuration: _this.recordingInfo.duration
                    });
                    clearInterval(_this.recordingInfo.updateInterval);
                    _this.recordingInfo.duration = 0;
                    _this.recordingPlayer = new __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */](_this.recordings);
                    __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */].setPlaybackBlocked(false);
                });
            }
            else {
                RecordingStateMachine.go(RecordingStates.Recording);
                return _this.startRecording();
            }
        };
        this.resetRecordingState = function () {
            if (_this.recordingFile) {
                _this.recordingFile.release();
                _this.recordingFile = null;
            }
            __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */].setPlaybackBlocked(false);
            clearInterval(_this.recordingInfo.updateInterval);
            _this.recordingPlayer.reset();
            _this.recordingPlayer = new __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */]([]);
            _this.recordings = [];
            RecordingStateMachine.go(RecordingStates.NotRecording);
        };
        this.discardRecording = function () { return _this.resetRecordingState(); };
        this.getPosition = function () { return _this.recordingPlayer ? _this.recordingPlayer.getPosition() : 0; };
        this.togglePlayback = function () { return _this.recordingPlayer ? _this.recordingPlayer.toggle() : null; };
        this.presentActionSheet = function () {
            var cameraButton = {
                text: _this.translate.instant("topic.takePhoto"),
                icon: !_this.platform.is("ios") ? "camera" : null,
                handler: function () {
                    _this.takeImage();
                }
            };
            var galleryButton = {
                text: _this.translate.instant("topic.selectGallery"),
                icon: !_this.platform.is("ios") ? "image" : null,
                handler: function () {
                    __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](_this.imagePicker.getPictures(ImagePickerOptions)).map(function (result) {
                        return _this.getFile(result, "image/png");
                    }).map(function (file) {
                        return new __WEBPACK_IMPORTED_MODULE_10__lib_services_imageUpload_service__["a" /* default */](file);
                    }).then(function (images) {
                        _this.sendMessage({
                            images: images,
                            text: ""
                        });
                    });
                }
            };
            var fileButton = {
                text: _this.translate.instant("topic.selectFile"),
                icon: !_this.platform.is("ios") ? "document" : null,
                handler: function () {
                    selectFile()
                        .then(function (file) { return _this.getFile(file); })
                        .then(function (file) { return new __WEBPACK_IMPORTED_MODULE_11__lib_services_fileUpload_service__["a" /* default */](file, { encrypt: true, extraInfo: {} }); })
                        .then(function (file) {
                        _this.sendMessage({
                            files: [file],
                            text: ""
                        });
                    });
                }
            };
            var cancelButton = {
                text: _this.translate.instant("general.cancel"),
                icon: !_this.platform.is("ios") ? "close" : null,
                role: "cancel"
            };
            var buttons = __WEBPACK_IMPORTED_MODULE_21__lib_services_featureToggles__["a" /* default */].isFeatureEnabled("chat.fileTransfer") ?
                [cameraButton, galleryButton, fileButton, cancelButton] :
                [cameraButton, galleryButton, cancelButton];
            var actionSheet = _this.actionSheetCtrl.create({
                buttons: buttons
            });
            actionSheet.present();
        };
        this.isInView = function (element, headerHeight) {
            var top = element.getBoundingClientRect().top - headerHeight;
            return top > 0 && top < _this.content.nativeElement.clientHeight;
        };
        this.updateElementsInView = __WEBPACK_IMPORTED_MODULE_17__lib_helper_helper__["default"].debounce(function () {
            var headerHeight = document.querySelector(".header").clientHeight;
            var messages = Array.prototype.slice.call(_this.content.nativeElement.querySelectorAll(".messages__wrap"));
            _this.inViewMessages = messages.filter(function (e) { return _this.isInView(e, headerHeight); });
        }, 20);
        this.onScroll = function () {
            _this.oldScrollFromBottom = _this.scrollFromBottom();
            _this.updateElementsInView();
            _this.checkLoadMoreMessages();
        };
        this.scrollFromBottom = function () {
            var element = _this.content.nativeElement;
            return _this.realScrollHeight(element) - element.scrollTop;
        };
        this.stabilizeScrollIfHeightChanged = function (height, scrollFromBottom) {
            var element = _this.content.nativeElement;
            var newHeight = _this.realScrollHeight(element);
            if (newHeight !== height) {
                console.warn("Height changed from " + height + " to " + newHeight);
                _this.oldScrollFromBottom = scrollFromBottom;
                _this.stabilizeScroll();
                return true;
            }
            return false;
        };
        this.checkHeightChange = function (height, scrollFromBottom, maximumTime) {
            var delayTime = 25;
            __WEBPACK_IMPORTED_MODULE_3_bluebird__["delay"](delayTime).then(function () {
                if (!_this.stabilizeScrollIfHeightChanged(height, scrollFromBottom) && maximumTime > 0) {
                    _this.checkHeightChange(height, scrollFromBottom, maximumTime - delayTime);
                }
            });
        };
        this.stabilizeScroll = function () {
            var element = _this.content.nativeElement;
            var height = _this.realScrollHeight(element);
            var newScrollTop = height - _this.oldScrollFromBottom;
            element.scrollTop = newScrollTop;
            _this.checkHeightChange(height, _this.oldScrollFromBottom, _this.platform.is('ios') ? 300 : 50);
        };
        this.getFirstInViewMessageId = function () {
            var firstInViewMessage = _this.inViewMessages[0];
            if (firstInViewMessage) {
                return firstInViewMessage.getAttribute("data-messageid");
            }
        };
        this.messageBursts = function () {
            var _a = _this.afterViewBurstMessages(), changed = _a.changed, bursts = _a.bursts;
            if (changed) {
                var scrollFromBottom = _this.scrollFromBottom();
                if (scrollFromBottom > 15) {
                    _this.bursts = bursts;
                    return bursts;
                }
            }
            _this.firstRender = false;
            _this.bursts = _this.allBurstMessages();
            return _this.bursts;
        };
        this.messageBurstsFunction = function (options) {
            var burstInfo = _this.getBursts(options);
            burstInfo.bursts.sort(function (b1, b2) {
                return b1.firstItem().getTime() - b2.firstItem().getTime();
            });
            return burstInfo;
        };
        this.ionViewDidEnter = function () { };
        this.getPartners = function () {
            if (!_this.chat) {
                return [];
            }
            return _this.chat.getPartners();
        };
        this.getBursts = function (options) {
            if (!_this.chat || _this.chat.getMessages().length === 0) {
                return { changed: false, bursts: [] };
            }
            var messages = _this.chat.getMessages()
                .map(function (_a) {
                var id = _a.id;
                return __WEBPACK_IMPORTED_MODULE_16__lib_messages_message__["b" /* default */].getLoaded(id);
            });
            if (_this.burstTopic !== _this.chat.getID()) {
                _this.bursts = BurstHelper.calculateBursts(messages);
                _this.burstTopic = _this.chat.getID();
                return { changed: true, bursts: _this.bursts };
            }
            var newElements = BurstHelper.getNewElements(messages, _this.bursts);
            if (options) {
                var firstViewMessage = messages.find(function (elem) {
                    return options.after == elem.getClientID().toString();
                });
                var index_1 = messages.indexOf(firstViewMessage);
                newElements = newElements.filter(function (element) {
                    return messages.indexOf(element) > index_1;
                });
            }
            if (newElements.length === 0) {
                return { changed: false, bursts: _this.bursts };
            }
            _this.bursts.forEach(function (burst) {
                return burst.removeAllExceptLast();
            });
            var newBursts = BurstHelper.calculateBursts(messages);
            if (!BurstHelper.mergeBursts(_this.bursts, newBursts)) {
                console.warn("Rerender all bursts!");
                _this.bursts = newBursts;
            }
            return { changed: true, bursts: _this.bursts };
        };
        this.onElementInView = function (_a) {
            var target = _a.target;
            if (inView.is(_this.lastMessageElement)) {
                _this.markRead();
                target.removeEventListener("scroll", _this.onElementInView);
            }
        };
        this.loadMoreMessages = function () {
            console.warn("load more messages");
            _this.messagesLoading = true;
            return _this.chat.loadMoreMessages().then(function (remaining) {
                _this.messagesLoading = false;
                return remaining;
            });
        };
        this.markRead = function () {
            setTimeout(function () {
                console.log('mark topic read', _this.chat.getID());
                _this.chat.markRead().catch(__WEBPACK_IMPORTED_MODULE_12__lib_services_error_service__["default"].criticalError);
            }, 0);
        };
        this.sendMessage = function (_a) {
            var text = _a.text, _b = _a.images, images = _b === void 0 ? [] : _b, _c = _a.files, files = _c === void 0 ? [] : _c, _d = _a.voicemails, voicemails = _d === void 0 ? [] : _d;
            if (text.length === 0 && images.length === 0 && files.length === 0 && voicemails.length === 0) {
                return;
            }
            var sendPromise = _this.chat.sendMessage(text, { images: images, files: files, voicemails: voicemails });
            if (_this.chat.isDraft()) {
                sendPromise
                    .then(function () { return Object(__WEBPACK_IMPORTED_MODULE_13__lib_angularUtils__["a" /* replaceView */])(_this.navCtrl, "Messages", { chatID: _this.chat.getID() }, 1, { animate: false }); });
            }
            _this.chat.newMessage = "";
            _this.markRead();
        };
        this.cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: !this.platform.is('ios'),
            correctOrientation: true
        };
        this.recordingPlayer = new __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */]([]);
        RecordingStateMachine.on(RecordingStates.NotRecording, function () {
            if (!_this.recordingFile) {
                return;
            }
            _this.recordingFile.release();
            _this.recordingFile = null;
        });
        RecordingStateMachine.onExit(RecordingStates.Paused, function (to) {
            _this.recordingPlayer.reset();
            return true;
        });
        document.addEventListener("pause", function () {
            if (RecordingStateMachine.is(RecordingStates.Recording)) {
                _this.toggleRecording();
            }
        }, false);
        document.addEventListener("resume", function () {
            if (_this.isRecordingUIVisible()) {
                _this.recordingPlayer = new __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */](_this.recordings);
            }
        });
        if (this.platform.is("ios")) {
            this.resizeEvents = [
                "resize",
                "native.keyboardshow",
                "native.keyboardhide"
            ];
        }
        else {
            this.resizeEvents = ["resize"];
        }
    }
    MessagesPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.resizeEvents.forEach(function (resizeEvent) {
            return window.addEventListener(resizeEvent, _this.keyboardChange);
        });
        this.content.nativeElement.addEventListener('scroll', this.onScroll);
        this.mutationObserver = new MutationObserver(this.mutationListener);
        this.mutationObserver.observe(this.content.nativeElement, { childList: true, subtree: true });
    };
    MessagesPage.prototype.ngOnDestroy = function () {
        var _this = this;
        this.resizeEvents.forEach(function (resizeEvent) {
            return window.removeEventListener(resizeEvent, _this.keyboardChange);
        });
        this.content.nativeElement.removeEventListener('scroll', this.onScroll);
        this.mutationObserver.disconnect();
    };
    MessagesPage.prototype.ionViewDidLeave = function () {
        if (!RecordingStateMachine.is(RecordingStates.NotRecording)) {
            this.discardRecording();
        }
        if (__WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */].activePlayer) {
            __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */].activePlayer.reset();
        }
    };
    MessagesPage.prototype.showRecordIcon = function () {
        if (!__WEBPACK_IMPORTED_MODULE_21__lib_services_featureToggles__["a" /* default */].isFeatureEnabled("chat.voiceMail")) {
            return false;
        }
        return this.newMessageText.length === 0;
    };
    MessagesPage.prototype.showFileTooBigWarning = function () {
        var alert = this.alertController.create({
            title: this.translate.instant("topic.fileTooBigTitle"),
            subTitle: this.translate.instant("topic.fileTooBigDetail", { max_size: MAXIMUM_FILE_SIZE_MB }),
            buttons: ['OK']
        });
        alert.present();
    };
    MessagesPage.prototype.startRecording = function () {
        var _this = this;
        if (this.recordingFile) {
            return;
        }
        this.recordingInfo.UUID = __WEBPACK_IMPORTED_MODULE_5_uuid_v4___default()();
        this.recordingFile = this.media.create(this.getRecordingFileName());
        this.recordingInfo.startTime = Date.now();
        this.recordingFile.startRecord();
        clearInterval(this.recordingInfo.updateInterval);
        this.recordingInfo.updateInterval = window.setInterval(function () {
            _this.recordingInfo.duration = (Date.now() - _this.recordingInfo.startTime) / 1000;
        }, 100);
        if (__WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */].activePlayer) {
            __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */].activePlayer.pause();
        }
        __WEBPACK_IMPORTED_MODULE_18__lib_asset_voicemailPlayer__["a" /* default */].setPlaybackBlocked(true);
    };
    MessagesPage.prototype.realScrollHeight = function (element) {
        return element.scrollHeight - element.clientHeight;
    };
    MessagesPage.prototype.checkLoadMoreMessages = function () {
        var _this = this;
        if (this.messagesLoading || !this.moreMessagesAvailable || !this.loadMoreMessages) {
            return;
        }
        var scrollTop = this.content.nativeElement.scrollTop;
        if (scrollTop < INFINITE_SCROLLING_THRESHOLD) {
            this.messagesLoading = true;
            setTimeout(function () {
                _this.loadMoreMessages().then(function (remaining) {
                    _this.moreMessagesAvailable = remaining !== 0;
                    _this.messagesLoading = false;
                });
            }, 0);
        }
    };
    MessagesPage.prototype.afterViewBurstMessages = function () {
        var id = this.getFirstInViewMessageId();
        if (!id) {
            return { changed: false, bursts: [] };
        }
        var _a = this.messageBurstsFunction({
            after: id
        }), changed = _a.changed, bursts = _a.bursts;
        return { changed: changed, bursts: bursts };
    };
    MessagesPage.prototype.allBurstMessages = function () {
        var bursts = this.messageBurstsFunction().bursts;
        return bursts;
    };
    MessagesPage.prototype.isPreviousMissing = function (burst) {
        var message = burst.getItems()[0];
        if (this.bursts[0] === burst || !message.getPreviousID()) {
            return false;
        }
        return this.bursts.findIndex(function (burst) {
            return burst.getItems().findIndex(function (m) {
                return m.getClientID() === message.getPreviousID();
            }) > -1;
        }) === -1;
    };
    MessagesPage.prototype.ngOnChanges = function (changes) {
        var chatChanges = changes["chat"];
        if (!chatChanges || !chatChanges.currentValue || this.newMessageText !== "") {
            return;
        }
        this.newMessageText = chatChanges.currentValue.newMessage;
    };
    MessagesPage.prototype.change = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.chat) {
                _this.chat.newMessage = _this.newMessageText;
            }
            var fontSize = 16;
            var minSize = 30;
            var maxSize = fontSize * 7;
            var footerElement = _this.footer.nativeElement;
            var textarea = footerElement.getElementsByTagName("textarea")[0];
            textarea.style.minHeight = "0";
            textarea.style.height = "0";
            var scroll_height = Math.max(minSize, Math.min(textarea.scrollHeight, maxSize));
            // apply new style
            textarea.style.minHeight = scroll_height + "px";
            textarea.style.height = scroll_height + "px";
            _this.stabilizeScroll();
        }, 100);
    };
    MessagesPage.prototype.goToDetails = function () {
        if (!this.chat) {
            return;
        }
        this.navCtrl.push("Chat Details", {
            chatID: this.chat.getID()
        });
    };
    MessagesPage.prototype.goToProfile = function (userId) {
        if (this.chat) {
            return;
        }
        this.navCtrl.push("Profile", {
            userId: userId
        });
    };
    MessagesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.chatID = parseFloat(this.navParams.get("chatID"));
        if (this.chatID < 0) {
            if (!__WEBPACK_IMPORTED_MODULE_15__lib_messages_chat__["b" /* default */].isLoaded(this.chatID)) {
                this.navCtrl.setRoot("Home");
                this.navCtrl.popToRoot();
                return;
            }
        }
        initService.awaitLoading().then(function () {
            return __WEBPACK_IMPORTED_MODULE_14__lib_messages_messageService__["a" /* default */].getChat(_this.chatID);
        }).then(function (chat) {
            _this.chat = chat;
            chat.loadInitialMessages().then(function () {
                _this.messagesLoading = false;
                _this.chat.markRead().catch(__WEBPACK_IMPORTED_MODULE_12__lib_services_error_service__["default"].criticalError);
            });
        });
    };
    MessagesPage.prototype.ngAfterViewChecked = function () {
        this.registerMarkReadListener();
    };
    MessagesPage.prototype.registerMarkReadListener = function () {
        if (!this.chat || !this.chat.isUnread()) {
            return;
        }
        var selector = ".messages__burst:last-child .messages__wrap:last-child";
        var lastMessageElement = this.element.nativeElement.querySelector(selector);
        if (!lastMessageElement || lastMessageElement === this.lastMessageElement) {
            return;
        }
        this.lastMessageElement = lastMessageElement;
        if (inView.is(lastMessageElement)) {
            this.markRead();
            return;
        }
        document.querySelector(".messages__list").addEventListener("scroll", this.onElementInView);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MessagesPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('footer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MessagesPage.prototype, "footer", void 0);
    MessagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-messages',template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/pages/messages/messages.html"*/`<ion-header>\n	<ion-navbar [color]="\'primary\'" no-border>\n		<ion-title (click)="goToDetails()">\n\n			<!-- Actual navbar title -->\n			<span class="messages__header__username" [ngClass]="{\'messages__header__username--no-image\': getPartners().length > 1}">\n				<span *ngIf="!chat || !chat.getTitle()">\n					<span *ngIf="getPartners().length == 1" (click)="goToProfile(getPartners()[0].id)">\n						{{ getPartners()[0].name }}\n					</span>\n					<span *ngIf="getPartners().length != 1">\n						<span *ngFor="let partner of getPartners(); let l = last" (click)="goToProfile(partner.id)">\n							{{ partner.basic.shortname }}{{ l ? "":", " }}\n						</span>\n					</span>\n				</span>\n				<span *ngIf="chat && chat.getTitle()">\n					{{chat.getTitle()}}\n				</span>\n			</span>\n\n			<!-- Avatar for one user -->\n			<ion-avatar item-left class="messages__header-image hexagon__image hexagon__image--small" *ngIf="getPartners().length == 1" (click)="goToProfile(getPartners()[0].id)">\n				<user-image [id]="getPartners()[0].id" [image]="getPartners()[0].basic.image"></user-image>\n			</ion-avatar>\n\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="messages__list" #content>\n		<ion-spinner *ngIf="messagesLoading" text-center margin-vertical class="spinner--full"></ion-spinner>\n		<div class="messages_filler"></div>\n		<ion-list no-lines>\n			<ion-item class="messages__burst" *ngIf="messageBursts() && bursts.length === 0">\n				<BurstDifference [chat]="chat" [burst]="bursts[0]"></BurstDifference>\n			</ion-item>\n			<ion-item class="messages__burst" *ngFor="let burst of bursts; let $index=index; let $last=last" [ngClass]="{\'burst--me\': burst.isMe(), \'burst--other\': burst.isOther()}">\n				<BurstDifference [chat]="chat" [burst]="burst" [previousBurst]="bursts[$index - 1]"></BurstDifference>\n\n				<div *ngIf="isPreviousMissing(burst)" style="\n					display: flex;\n					justify-content: center;\n					align-items: center;\n				">\n					<ion-spinner text-center name="dots" duration="1500"></ion-spinner>\n				</div>\n\n				<span>\n					<div *ngIf="burst.isOther() && getPartners().length > 1">{{burst.firstItem().data.sender.name}}</div>\n					<Message [message]="message" *ngFor="let message of burst.items"></Message>\n				</span>\n\n				<BurstDifference [chat]="chat" [previousBurst]="burst" [noDates]="true" *ngIf="$last"></BurstDifference>\n			</ion-item>\n		</ion-list>\n	</div>\n\n	<div class="messages__form" *ngIf="platform.is(\'ios\')" #footer>\n		<div *ngIf="isRecordingUIVisible()" class="messages__form__button-wrap">\n			<button ion-button icon-only clear color="grey" class="ios__messages__add-assets" (click)="discardRecording()">\n				<ion-icon name="trash"></ion-icon>\n			</button>\n			<button ion-button icon-only clear color="danger" class="ios__messages__add-assets" (click)="toggleRecording()">\n				<ion-icon name="mic" *ngIf="isPaused()"></ion-icon>\n				<ion-icon name="pause" *ngIf="!isPaused()"></ion-icon>\n			</button>\n			<button *ngIf="isPaused()" ion-button icon-only clear color="grey" class="ios__messages__add-assets" (click)="togglePlayback()">\n				<ion-icon name="{{(isPlayback() ? \'pause\' : \'play\')}}"></ion-icon>\n			</button>\n		</div>\n		<div\n			class="messages__form__button-wrap"\n			*ngIf="!isRecordingUIVisible()">\n			<button ion-button icon-only clear color="grey" class="ios__messages__add-assets" (click)="presentActionSheet()">\n				<ion-icon name="add-circle"></ion-icon>\n			</button>\n			<button ion-button icon-only clear color="grey" class="ios__messages__add-assets" (click)="takeImage()" *ngIf="showCameraShortcut()">\n				<ion-icon name="camera"></ion-icon>\n			</button>\n		</div>\n		<ion-item class="clean-input-wrap ios__messages__input-wrap">\n			<ion-textarea rows="1" type="text" class="ios__messages__message-input" autocomplete="on" autocorrect="on" id="sendMessageBox" (ngModelChange)="change()" [(ngModel)]="newMessageText" [disabled]="isRecordingUIVisible()" (ionBlur)="toggleInputFocus()" (ionFocus)="toggleInputFocus()"></ion-textarea>\n		</ion-item>\n		<div class="ios__messages__recording-overlay" [ngClass]="{\'ios__messages__recording-overlay--distance\': isPaused()}">\n			<span *ngIf="isRecording()">\n				<ion-icon name="mic" color="danger"></ion-icon>\n				<span>&nbsp;Recording - <time class="ios__messages__recording__time">{{ formatTime(getDuration()) }}</time></span>\n			</span>\n			<span *ngIf="isPaused()">\n				<span *ngIf="isPlayback()">\n					<ion-icon icon name="ios-stats" color="primary"></ion-icon>\n					<span>&nbsp;{{ formatTime(getPosition()) }} / {{ formatTime(getDuration()) }}</span>\n				</span>\n				<span *ngIf="!isPlayback()">Paused - <time class="ios__messages__recording__time">{{ formatTime(getDuration()) }}</time></span>\n			</span>\n		</div>\n		<button color="green" ion-button icon-only class="ios__messages__send-message" (click)="sendMessageToChat()"\n		*ngIf="!showRecordIcon() || isRecordingUIVisible()">\n			<ion-icon name="send"></ion-icon>\n		</button>\n		<button color="green" ion-button icon-only class="ios__messages__send-message" (click)="toggleRecording()"\n		*ngIf="showRecordIcon() && !isRecordingUIVisible()">\n			<ion-icon name="mic"></ion-icon>\n		</button>\n	</div>\n\n	<!-- TODO: refactor this to be one form, not two -->\n	<div class="messages__form" *ngIf="!platform.is(\'ios\')" #footer>\n		<div\n			class="messages__form__button-wrap"\n			*ngIf="isRecordingUIVisible()">\n			<button ion-button icon-only clear color="grey" class="messages__add-assets" (click)="discardRecording()">\n				<ion-icon name="trash"></ion-icon>\n			</button>\n			<button ion-button icon-only clear color="danger" class="messages__add-assets" (click)="toggleRecording()">\n				<ion-icon name="mic" *ngIf="isPaused()"></ion-icon>\n				<ion-icon name="pause" *ngIf="!isPaused()"></ion-icon>\n			</button>\n			<button *ngIf="isPaused()" ion-button icon-only clear color="grey" class="messages__add-assets" (click)="togglePlayback()">\n				<ion-icon name="{{(isPlayback() ? \'pause\' : \'play\')}}"></ion-icon>\n			</button>\n		</div>\n		<div\n			class="messages__form__button-wrap"\n			*ngIf="!isRecordingUIVisible()">\n			<button ion-button icon-only clear color="grey" class="messages__add-assets" (click)="presentActionSheet()">\n				<ion-icon name="add-circle"></ion-icon>\n			</button>\n			<button ion-button icon-only clear color="grey" class="messages__add-assets" (click)="takeImage()" *ngIf="showCameraShortcut()">\n				<ion-icon name="camera"></ion-icon>\n			</button>\n		</div>\n		<ion-item class="messages__input-wrap">\n			<ion-textarea rows="1" type="text" class="messages__message-input" autocomplete="on" autocorrect="on" id="sendMessageBox" (ngModelChange)="change()" [(ngModel)]="newMessageText" [disabled]="isRecordingUIVisible()" (ionBlur)="toggleInputFocus()" (ionFocus)="toggleInputFocus()"></ion-textarea>\n		</ion-item>\n		<div class="ios__messages__recording-overlay" [ngClass]="{\'ios__messages__recording-overlay--distance\': isPaused()}">\n			<span *ngIf="isRecording()">\n				<ion-icon name="mic" color="danger"></ion-icon>\n				<span>&nbsp;Recording - <time class="ios__messages__recording__time">{{ formatTime(getDuration()) }}</time></span>\n			</span>\n			<span *ngIf="isPaused()">\n				<span *ngIf="isPlayback()">\n					<ion-icon icon name="ios-stats" color="primary"></ion-icon>\n					<span>&nbsp;{{ formatTime(getPosition()) }} / {{ formatTime(getDuration()) }}</span>\n				</span>\n				<span *ngIf="!isPlayback()">Paused - <time class="ios__messages__recording__time">{{ formatTime(getDuration()) }}</time></span>\n			</span>\n		</div>\n		<button\n			ion-button icon-only clear (click)="sendMessageToChat()"\n			class="messages__send-message"\n			*ngIf="!showRecordIcon() || isRecordingUIVisible()">\n			<ion-icon name="send"></ion-icon>\n		</button>\n		<button ion-button icon-only clear class="messages__send-message" (click)="toggleRecording()"\n		*ngIf="showRecordIcon() && !isRecordingUIVisible()">\n			<ion-icon name="mic"></ion-icon>\n		</button>\n	</div>\n</ion-content>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/pages/messages/messages.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], MessagesPage);
    return MessagesPage;
}());

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screenSize_service__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fileUpload_service__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blobService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__asset_Queue__ = __webpack_require__(75);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};






var imageLib = __webpack_require__(451);
var canvasToBlob = __WEBPACK_IMPORTED_MODULE_0_bluebird__["promisify"](__WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].canvasToBlob.bind(__WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"]));
var PREVIEWSDISABLED = false;
var defaultOptions = {
    minimumSizeDifference: 1024,
    sizes: [
        {
            name: "lowest",
            restrictions: {
                maxWidth: 640,
                maxHeight: 480
            }
        },
        {
            name: "middle",
            restrictions: {
                maxWidth: 1280,
                maxHeight: 720
            }
        },
        {
            name: "highest",
            restrictions: {
                maxWidth: 2560,
                maxHeight: 1440
            }
        }
    ],
    gifSizes: [
        {
            name: "lowest",
            restrictions: {
                maxWidth: 640,
                maxHeight: 480
            }
        },
        {
            name: "highest"
        }
    ],
    gif: true,
    encrypt: true,
    extraInfo: {}
};
/* TODO:
    - maximum size for a resolution
    - original: enable, remove meta-data (exif etc.)
*/
if (__WEBPACK_IMPORTED_MODULE_2__screenSize_service__["a" /* default */].mobile) {
    defaultOptions.sizes = defaultOptions.sizes.filter(function (size) {
        return size.name !== "highest";
    });
}
var uploadQueue = new __WEBPACK_IMPORTED_MODULE_5__asset_Queue__["a" /* default */](3);
uploadQueue.start();
var resizeQueue = new __WEBPACK_IMPORTED_MODULE_5__asset_Queue__["a" /* default */](1);
resizeQueue.start();
var sizeDiff = function (a, b) {
    return a.blob.getSize() - b.blob.getSize();
};
var sizeSorter = function (a, b) {
    return sizeDiff(b, a);
};
var ImageUpload = (function (_super) {
    __extends(ImageUpload, _super);
    function ImageUpload(file, options) {
        var _this = _super.call(this, file, options || defaultOptions) || this;
        _this.rotation = "0";
        _this.convertForGallery = function () {
            return {
                upload: _this,
                highest: {
                    loading: false,
                    loaded: true,
                    url: _this.getUrl()
                },
                lowest: {
                    loading: false,
                    loaded: true,
                    url: _this.getUrl()
                }
            };
        };
        _this.rotate = function () {
            return _this.generatePreviews().then(function (previews) {
                var newDegree = "0";
                switch (_this.rotation) {
                    case "0":
                        newDegree = "90";
                        break;
                    case "90":
                        newDegree = "180";
                        break;
                    case "180":
                        newDegree = "270";
                        break;
                }
                _this.rotation = newDegree;
                _this.previewUrl = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].toUrl(previews[newDegree]);
                return previews[newDegree];
            });
        };
        _this.generatePreviews = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].cacheResult(function () {
            if (PREVIEWSDISABLED) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["reject"](new Error("Previews are disabled"));
            }
            return ImageUpload.imageLibLoad(__WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].toUrl(_this.file), {
                maxHeight: 200, canvas: true
            }).then(function (img) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
                    canvasToBlob(img, "image/jpeg"),
                    canvasToBlob(ImageUpload.rotate90(img), "image/jpeg"),
                    canvasToBlob(ImageUpload.rotate180(img), "image/jpeg"),
                    canvasToBlob(ImageUpload.rotate270(img), "image/jpeg")
                ]);
            }).spread(function (preview0, preview90, preview180, preview270) {
                _this.previewUrl = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].toUrl(preview0);
                return {
                    "0": preview0,
                    "90": preview90,
                    "180": preview180,
                    "270": preview270,
                };
            });
        });
        _this.getPreviewUrl = function () {
            return _this.previewUrl || _this.getUrl();
        };
        _this.getUrl = function () {
            if (!PREVIEWSDISABLED) {
                _this.generatePreviews();
            }
            _this.url = _this.url || __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].toUrl(_this.file);
            _this.previewUrl = _this.previewUrl || _this.url;
            return _this.url;
        };
        _this.upload = function (encryptionKey) {
            if (!_this.blobs) {
                throw new Error("usage error: prepare was not called!");
            }
            if (_this.options.encrypt && !encryptionKey) {
                throw new Error("No encryption key given");
            }
            return uploadQueue.enqueue(1, function () {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](_this.blobs).bind(_this).map(function (blobWithMetaData) {
                    console.info("Uploading blob");
                    if (_this.options.encrypt) {
                        return _this.uploadAndEncryptPreparedBlob(encryptionKey, blobWithMetaData.blob);
                    }
                    return _this.uploadPreparedBlob(blobWithMetaData.blob);
                });
            });
        };
        _this._createSizeData = function (size) {
            return resizeQueue.enqueue(1, function () {
                return _this._resizeFile(size).then(function (resizedImage) {
                    return ImageUpload.blobToDataSet(__WEBPACK_IMPORTED_MODULE_4__blobService__["a" /* default */].createBlob(resizedImage.blob)).then(function (data) {
                        data.content.gif = _this.isGif;
                        data.content.width = resizedImage.width;
                        data.content.height = resizedImage.height;
                        return __assign({}, data, { size: size });
                    });
                });
            });
        };
        _this.prepare = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].cacheResult(function () {
            _this.isGif = !!_this.file.type.match(/image.gif/i);
            var sizes = _this.isGif ? _this.options.gifSizes : _this.options.sizes;
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](sizes)
                .map(_this._createSizeData)
                .then(_this._removeUnnededBlobs);
        });
        _this._removeUnnededBlobs = function (blobs) {
            var lastBlob, result = {};
            _this.blobs = blobs.sort(sizeSorter).filter(function (blob) {
                var keep = !lastBlob || _this.isGif || sizeDiff(lastBlob, blob) > _this.options.minimumSizeDifference;
                if (keep) {
                    lastBlob = blob;
                }
                result[blob.size.name] = lastBlob;
                return keep;
            });
            return result;
        };
        _this._getImage = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].cacheResult(function () {
            return ImageUpload.imageLibLoad(_this.getUrl());
        });
        _this._resizeFile = function (sizeOptions) {
            if (_this.isGif && !sizeOptions.restrictions) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](_this.file);
            }
            var options = __assign({}, sizeOptions.restrictions || {}, { canvas: true });
            return _this._getImage().then(function (img) {
                if (options.square) {
                    img = imageLib.scale(img, {
                        contain: true,
                        aspectRatio: 1
                    });
                }
                var canvas = ImageUpload.rotate(imageLib.scale(img, options), _this.rotation);
                return canvasToBlob(canvas, "image/jpeg").then(function (blob) {
                    return {
                        blob: blob,
                        width: canvas.width,
                        height: canvas.height
                    };
                });
            });
        };
        if (!ImageUpload.isImage(file)) {
            throw new Error("not an image!");
        }
        if (file.type.match(/image.gif/) && !_this.options.gif) {
            throw new Error("no gifs supported!");
        }
        return _this;
    }
    ImageUpload.isImage = function (file) {
        return file.type.match(/image.*/);
    };
    ImageUpload.imageLibLoad = function (file, options) {
        return new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (resolve, reject) {
            imageLib(file, function (canvas) {
                if (canvas.type === "error") {
                    reject(canvas);
                }
                else {
                    resolve(canvas);
                }
            }, options);
        });
    };
    ImageUpload.rotate = function (img, angle) {
        switch (angle) {
            case "0":
                return img;
            case "90":
                return ImageUpload.rotate90(img);
            case "180":
                return ImageUpload.rotate180(img);
            case "270":
                return ImageUpload.rotate270(img);
        }
        return img;
    };
    ;
    ImageUpload.rotateInternal = function (angle, img, flipRatio) {
        var canvas = document.createElement("canvas");
        if (flipRatio) {
            canvas.width = img.height;
            canvas.height = img.width;
        }
        else {
            canvas.width = img.width;
            canvas.height = img.height;
        }
        var diff = canvas.width - canvas.height;
        var newCtx = canvas.getContext("2d");
        if (newCtx === null) {
            throw new Error("could not initialize canvas context");
        }
        newCtx.translate(canvas.width / 2, canvas.height / 2);
        newCtx.rotate(angle);
        newCtx.translate(-canvas.width / 2, -canvas.height / 2);
        newCtx.drawImage(img, flipRatio ? diff / 2 : 0, flipRatio ? -diff / 2 : 0);
        return canvas;
    };
    ;
    ImageUpload.rotate90 = function (img) {
        var angle = Math.PI / 2;
        return ImageUpload.rotateInternal(angle, img, true);
    };
    ;
    ImageUpload.rotate180 = function (img) {
        var angle = Math.PI;
        return ImageUpload.rotateInternal(angle, img, false);
    };
    ;
    ImageUpload.rotate270 = function (img) {
        var angle = 3 * Math.PI / 2;
        return ImageUpload.rotateInternal(angle, img, true);
    };
    ;
    return ImageUpload;
}(__WEBPACK_IMPORTED_MODULE_3__fileUpload_service__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (ImageUpload);
//# sourceMappingURL=imageUpload.service.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Tutorial;
(function (Tutorial) {
    var tutorialVersion = 4;
    Tutorial.tutorialVisible = false;
    function skip() {
        Tutorial.tutorialVisible = false;
        localStorage.setItem('tutorialPassed', "" + tutorialVersion);
    }
    Tutorial.skip = skip;
    function checkVisibility() {
        var passedVersion = parseInt(localStorage.getItem('tutorialPassed'), 10);
        Tutorial.tutorialVisible = isNaN(passedVersion) || (passedVersion < tutorialVersion);
    }
    Tutorial.checkVisibility = checkVisibility;
    function resetVisibility() {
        console.log('resetting visibility');
        localStorage.setItem('tutorialPassed', '0');
        Tutorial.tutorialVisible = true;
    }
    Tutorial.resetVisibility = resetVisibility;
})(Tutorial || (Tutorial = {}));
/* harmony default export */ __webpack_exports__["a"] = (Tutorial);
//# sourceMappingURL=tutorial.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_module__ = __webpack_require__(331);





Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorServiceInstance", function() { return errorServiceInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
var config = __webpack_require__(61);

var ErrorService = (function () {
    function ErrorService() {
        var _this = this;
        this.criticalError = this.criticalError.bind(this);
        this.logError = this.logError.bind(this);
        window.addEventListener("unhandledrejection", function (e) {
            var reason = e.detail.reason;
            _this.criticalError(reason);
        });
    }
    ErrorService.prototype.criticalError = function (e) {
        this.logError(e);
    };
    ;
    ErrorService.prototype.logError = function (e) {
        if (e) {
            console.error(e);
            var url = (config.https ? "https://" : "http://") +
                config.ws +
                ":" + config.wsPort +
                "/reportError";
            window.fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({ error: e.toString(), stack: e.stack })
            }).catch(function () { });
        }
    };
    ;
    ErrorService.prototype.failOnErrorPromise = function (state, promise) {
        var _this = this;
        return promise.then(function () {
            state.success();
        }).catch(function (e) {
            state.failed();
            _this.criticalError(e);
        });
    };
    ;
    ErrorService.prototype.failOnError = function (state) {
        var _this = this;
        return function (e) {
            if (e) {
                state.failed();
                _this.criticalError(e);
            }
            else {
                state.success();
            }
        };
    };
    return ErrorService;
}());
var errorServiceInstance = new ErrorService();
/* harmony default export */ __webpack_exports__["default"] = (errorServiceInstance);
//# sourceMappingURL=error.service.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_globalization__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_photo_viewer__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_barcode_scanner__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_in_app_browser__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_media__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_keyboard__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ngx_translate_http_loader__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_http__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__lib_services_location_manager__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__lib_services_featureToggles__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__lib_services_settings_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_moment_locale_de__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_moment_locale_de___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_moment_locale_de__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
__webpack_require__(332);
__webpack_require__(391);
__webpack_require__(392);
__webpack_require__(393);

 // tslint:disable-line:no-unused-variable























window.startup = new Date().getTime();
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_20__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}

var DEFAULT_LANG = "de";
var AppModule = (function () {
    function AppModule(zone, translate, // tslint:disable-line:no-unused-variable
        globalization, config, // tslint:disable-line:no-unused-variable
        platform // tslint:disable-line:no-unused-variable
    ) {
        var _this = this;
        this.zone = zone;
        this.translate = translate;
        this.globalization = globalization;
        this.config = config;
        this.platform = platform; // tslint:disable-line:no-unused-variable
        this.tasks = [];
        this.taskRunnerStarted = false;
        this.startTaskRunner = function () {
            if (_this.taskRunnerStarted || _this.tasks.length === 0) {
                return;
            }
            _this.taskRunnerStarted = true;
            setTimeout(_this.runTasks, 0);
        };
        this.runTasks = function () {
            _this.taskRunnerStarted = false;
            var tasksStarted = Date.now();
            var maxTaskCount = _this.tasks.length;
            for (var i = 0; i < maxTaskCount; i += 1) {
                var task = _this.tasks.shift();
                task();
                var dateDiff = Date.now() - tasksStarted;
                /*if (dateDiff > 50) {
                    console.error(`Long running task detected ${dateDiff}`, task)
                }*/
                if (i + 1 !== maxTaskCount && dateDiff > 20) {
                    // console.warn(`Breaking out of tasks loop ${i+1} / ${maxTaskCount} / ${this.tasks.length}: ${dateDiff}`)
                    break;
                }
            }
            _this.startTaskRunner();
        };
        this.disableContextMenues = function () {
            // disable context menu, e.g., on long clicking the fab button.
            window.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
        };
        translate.setDefaultLang("en");
        // this used to be a huge problem with long click in chrome.
        // this.disableContextMenues()
        platform.ready().then(function () {
            _this.globalization.getPreferredLanguage().then(function (_a) {
                var value = _a.value;
                console.warn("Language from device: " + value);
                return value.split("-")[0].toLowerCase();
            }).catch(function () {
                console.warn('Cannot get language from device, remaining with default language');
                return DEFAULT_LANG;
            }).then(function (lang) {
                __WEBPACK_IMPORTED_MODULE_0_moment___default.a.locale(lang);
                if (Object(__WEBPACK_IMPORTED_MODULE_22__lib_services_location_manager__["c" /* isBusinessVersion */])()) {
                    translate.use(lang + "_business");
                    return;
                }
                translate.use(lang);
            }).then(function () {
                translate.get('general.backButtonText').subscribe(function (val) {
                    config.set('ios', 'backButtonText', val);
                });
            });
        });
        if (false) {
            Bluebird.config({
                warnings: false,
                longStackTraces: false,
                cancellation: false,
                monitoring: false
            });
        }
        __WEBPACK_IMPORTED_MODULE_4_bluebird__["setScheduler"](function (fn) {
            _this.tasks.push(fn);
            _this.runInAngularZone(_this.startTaskRunner);
        });
    }
    AppModule.prototype.runInAngularZone = function (fn) {
        if (this.zone.inner !== window.Zone.current) {
            this.zone.run(fn);
            return;
        }
        fn();
    };
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    scrollPadding: false,
                    scrollAssist: true,
                    autoFocusAssist: false
                }, {
                    links: [
                        { loadChildren: '../pages/blocked-users/blockedUsers.module#ContactsPageModule', name: 'Blocked Users', segment: 'blockedusers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contact-requests/contact-requests.module#ContactRequestPageModule', name: 'Requests', segment: 'requests', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/contacts/contacts.module#ContactsPageModule', name: 'Contacts', segment: 'contacts', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'Home', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'Login', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/messages/add/add.module#AddPageModule', name: 'Select User', segment: 'messages/:chatID/add', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/messages/details/details.module#DetailsPageModule', name: 'Chat Details', segment: 'messages/:chatID/details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/new-message/new-message.module#NewMessagePageModule', name: 'New Message', segment: 'newMessage/:receiverIds', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/messages/messages.module#MessagesPageModule', name: 'Messages', segment: 'messages/:chatID', priority: 'low', defaultHistory: ['Home'] },
                        { loadChildren: '../pages/sales/sales.module#SalesPageModule', name: 'Sales', segment: 'sales', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'Profile', segment: 'profile/:userId', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'Settings', segment: 'settings', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_21__angular_http__["a" /* Http */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_http__["b" /* HttpModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            ],
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_globalization__["a" /* Globalization */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_photo_viewer__["a" /* PhotoViewer */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_keyboard__["a" /* Keyboard */],
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_19__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_globalization__["a" /* Globalization */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Config */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */] // tslint:disable-line:no-unused-variable
        ])
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyStore = __webpack_require__(34).default;
var socketService = __webpack_require__(10).default;

var interceptor = {
	transformResponse: function transformResponse(response) {
		if (!response.keys) {
			return response;
		}

		response.keys.forEach(function (key) {
			keyStore.upload.addKey(key);
		});

		return response;
	}
};

socketService.addInterceptor(interceptor);

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestKey_service__ = __webpack_require__(179);

var keyStore = __webpack_require__(28);
keyStore.upload.setKeyGet(__WEBPACK_IMPORTED_MODULE_0__requestKey_service__["a" /* default */].getKey);
/* harmony default export */ __webpack_exports__["default"] = (keyStore);
//# sourceMappingURL=keyStore.service.js.map

/***/ }),

/***/ 353:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 357:
/***/ (function(module, exports) {

module.exports = {
	"hashVersion": 3,
	"socket": {
		"autoConnect": true,
		"autoReconnect": true
	},
	"serviceWorker": {
		"enabled": false
	}
};

/***/ }),

/***/ 358:
/***/ (function(module, exports) {

module.exports = {
	"https": true,
	"ws": "data.whispeer.de",
	"wsPort": 443,
	"debug": false,
	"production": true,
	"workerScript": "build/worker.bundle.js",
	"serviceWorker": {
		"enabled": true
	}
};

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asset_observer__ = __webpack_require__(16);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var BlobUploader = (function (_super) {
    __extends(BlobUploader, _super);
    function BlobUploader(socket, blob, blobid) {
        var _this = _super.call(this) || this;
        _this._doneBytes = 0;
        _this.upload = function () {
            if (!_this._uploadingPromise) {
                _this._uploadingPromise = _this._uploadPartUntilDone();
            }
            return _this._uploadingPromise;
        };
        _this._uploadPartUntilDone = function () {
            if (_this._doneBytes === _this._blob.size) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
            }
            return _this._uploadPart().then(function () {
                return _this._uploadPartUntilDone();
            });
        };
        _this._blob = blob;
        _this._blobid = blobid;
        _this._socket = socket;
        _this._reset();
        return _this;
    }
    BlobUploader.prototype._reset = function () {
        this._doneBytes = 0;
        this._partSize = BlobUploader.STARTPARTSIZE;
    };
    BlobUploader.sliceBlob = function (blob, start, end) {
        if (typeof blob.slice === "function") {
            return blob.slice(start, end);
        }
        if (typeof blob.webkitSlice === "function") {
            return blob.webkitSlice(start, end);
        }
        if (typeof blob.mozSlice === "function") {
            return blob.mozSlice(start, end);
        }
        return blob;
    };
    ;
    BlobUploader.prototype._halfSize = function () {
        this._partSize = Math.max(this._partSize / 2, BlobUploader.MINIMUMPARTSIZE);
    };
    ;
    BlobUploader.prototype._doubleSize = function () {
        this._partSize = Math.min(this._partSize * 2, BlobUploader.MAXIMUMPARTSIZE);
    };
    ;
    BlobUploader.prototype._uploadPart = function () {
        var _this = this;
        var uploadStarted = new Date().getTime(), uploadSize;
        return this._socket.awaitConnection().then(function () {
            var partToUpload = BlobUploader.sliceBlob(_this._blob, _this._doneBytes, _this._doneBytes + _this._partSize);
            uploadSize = partToUpload.size;
            var lastPart = _this._blob.size === _this._doneBytes + uploadSize;
            return _this._socket.emit("blob.uploadBlobPart", {
                blobid: _this._blobid,
                blobPart: partToUpload,
                doneBytes: _this._doneBytes,
                size: uploadSize,
                lastPart: lastPart
            });
        }).then(function (response) {
            if (response.reset) {
                console.warn("Restarting Upload");
                return _this._reset();
            }
            var uploadTook = new Date().getTime() - uploadStarted;
            if (uploadTook > BlobUploader.MAXIMUMTIME) {
                _this._halfSize();
            }
            else {
                _this._doubleSize();
            }
            _this._doneBytes += uploadSize;
            _this.notify(_this._doneBytes, "progress");
        }).catch(function (e) {
            console.error(e);
            _this._halfSize();
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["delay"](5000);
        });
    };
    ;
    BlobUploader.MAXIMUMPARTSIZE = 1000 * 1000;
    BlobUploader.STARTPARTSIZE = 5 * 1000;
    BlobUploader.MINIMUMPARTSIZE = 1 * 1000;
    BlobUploader.MAXIMUMTIME = 2 * 1000;
    return BlobUploader;
}(__WEBPACK_IMPORTED_MODULE_1__asset_observer__["default"]));
/* harmony default export */ __webpack_exports__["a"] = (BlobUploader);
//# sourceMappingURL=blobUploader.service.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);

var Storage = (function () {
    function Storage(prefix) {
        var _this = this;
        this.get = function (key) {
            return localStorage.getItem(_this.calculateKey(key));
        };
        this.set = function (key, data) {
            return localStorage.setItem(_this.calculateKey(key), data);
        };
        this.remove = function (key) {
            return localStorage.removeItem(_this.calculateKey(key));
        };
        this.clear = function () {
            var usedKeys = Object.keys(localStorage);
            usedKeys.filter(function (key) {
                return key.indexOf(this._prefix) === 0;
            }, _this).forEach(function (key) {
                localStorage.setItem(key, "");
            });
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
        };
        this.save = function () {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
        };
        this.calculateKey = function (key) {
            return _this._prefix + "." + key;
        };
        this.awaitLoading = function () { return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](); };
        this._prefix = prefix;
    }
    return Storage;
}());
/* harmony default export */ __webpack_exports__["a"] = (Storage);
//# sourceMappingURL=Storage.js.map

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sjcl = __webpack_require__(45);
var Bluebird = __webpack_require__(3);

/**
* Wait until randomizer is ready.
* calls callback if randomizer is ready.
*/
var waitForReady = function waitForReady(callback) {
	if (sjcl.random.isReady()) {
		callback();
		return true;
	}

	waitForReady.waiting = true;

	sjcl.random.addEventListener("seeded", function () {
		waitForReady.waiting = false;
		waitForReady.ready = true;
		callback();
	});

	return false;
};

waitForReady.async = Bluebird.promisify(waitForReady);

waitForReady.ready = false;
waitForReady.waiting = false;

module.exports = waitForReady;

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var WorkerPool = __webpack_require__(365);
var bluebird = __webpack_require__(3);
var chelper = __webpack_require__(193);
var config = __webpack_require__(61);

function getEntropy() {
	try {
		var ab;

		// get cryptographically strong entropy depending on runtime environment
		if (window && Uint32Array) {
			ab = new Uint32Array(32);
			if (window.crypto && window.crypto.getRandomValues) {
				window.crypto.getRandomValues(ab);
			} else if (window.msCrypto && window.msCrypto.getRandomValues) {
				window.msCrypto.getRandomValues(ab);
			} else {
				return false;
			}

			return ab;
		}
	} catch (e) {
		console.error(e);
	}

	return false;
}

function addEntropy(theWorker, callback) {
	var entropy = getEntropy();

	if (entropy) {
		theWorker.runTask({ randomNumber: entropy, entropy: 1024 }).then(callback);
	} else {
		throw new Error("no entropy from browser ... browser too old");
	}
}

var workerCount = 4;

if (navigator.hardwareConcurrency) {
	workerCount = Math.max(navigator.hardwareConcurrency - 1, workerCount);
}

//Promise, numberOfWorkers, workerPath, setupMethod, requireOverRide
var workers = new WorkerPool(bluebird, workerCount, {
	setupMethod: addEntropy,
	workerScriptOverride: config.workerScript || false
});

var sjclWorker = {
	hash: function hash(toHash) {
		return workers.schedule({
			isHash: true,
			toHash: toHash
		});
	},
	stringify: function stringify(content, version, hash) {
		return workers.schedule({
			stringify: true,
			content: content,
			version: version,
			hash: hash
		});
	},
	asym: {
		generateCryptKey: function generateCryptKey(curve) {
			var data = {
				asym: true,
				generate: true,
				crypt: true
			};

			if (curve) {
				data.curve = curve;
			}

			return workers.schedule(data);
		},
		generateSignKey: function generateSignKey(curve) {
			var data = {
				asym: true,
				generate: true,
				crypt: false,
				curve: curve
			};

			return workers.schedule(data);
		},
		kem: function kem(publicKey) {
			var data = {
				asym: true,
				generate: false,
				action: "kem",

				curve: chelper.getCurveName(publicKey._curve),
				x: publicKey._point.x.toString(),
				y: publicKey._point.y.toString()
			};

			return workers.schedule(data);
		},
		unkem: function unkem(privateKey, tag) {
			var data = {
				asym: true,
				generate: false,
				action: "unkem",

				curve: chelper.getCurveName(privateKey._curve),
				exponent: privateKey._exponent.toString(),
				tag: chelper.bits2hex(tag)
			};

			return workers.schedule(data);
		},
		sign: function sign(privateKey, toSign) {
			var data = {
				asym: true,
				generate: false,
				action: "sign",

				curve: chelper.getCurveName(privateKey._curve),
				exponent: privateKey._exponent.toString(),
				toSign: chelper.bits2hex(toSign)
			};

			return workers.schedule(data);
		},
		verify: function verify(publicKey, signature, hash) {
			var data = {
				asym: true,
				generate: false,
				action: "verify",

				curve: chelper.getCurveName(publicKey._curve),
				point: {
					x: publicKey._point.x.toString(),
					y: publicKey._point.y.toString()
				},

				signature: chelper.bits2hex(signature),
				hash: chelper.bits2hex(hash)
			};

			return workers.schedule(data);
		}
	},
	sym: {
		encrypt: function encrypt(key, message, progressListener) {
			var data = {
				"key": key,
				"message": message,

				"asym": false,
				"encrypt": true
			};

			return workers.schedule(data, progressListener);
		},
		decrypt: function decrypt(key, message, progressListener) {
			var data = {
				"key": key,
				"message": message,

				"asym": false,
				"encrypt": false
			};

			return workers.schedule(data, progressListener);
		}
	}
};

module.exports = sjclWorker;

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Worker = __webpack_require__(366);

/** constructor for worker pool
*   @param Promise a promise implementation
*   @param numberOfWorkers the number of workers you want to run in parallel
*   @param optional setupMethod a function to call after the worker is created.
*   @param requireOverRide the path to require, if it can not be determined automatically.
*/
var WorkerPool = function WorkerPool(Promise, numberOfWorkers, options) {
	this._Promise = Promise;
	this._numberOfWorkers = numberOfWorkers;
	this._numberOfRunningWorkers = 0;

	this._options = options || {};

	this._queue = [];
	this._workers = [];

	this._setupMethod = this._options.setupMethod;
	this._setupDone = typeof this._setupMethod !== "function";
	this._setupRunning = false;

	this._createNewWorker();
};

WorkerPool.prototype._createNewWorker = function () {
	if (this._workers.length < this._numberOfWorkers) {
		var newWorker = new Worker(this._Promise, this._options.workerScriptOverride);
		newWorker.onFree(this._onFree.bind(this, newWorker));
		this._workers.push(newWorker);
	}
};

WorkerPool.prototype._onFree = function (worker) {
	if (this._workers.length > this._numberOfWorkers) {
		//remove from workers
		return;
	}

	if (this._setupRunning) {
		return;
	}

	if (!this._setupDone) {
		var that = this;
		this._setupRunning = true;
		this._setupMethod(worker, function () {
			that._setupRunning = false;
			that._setupDone = true;
			that._onFree(worker);
		});

		return;
	}

	this._runFromQueue();
};

WorkerPool.prototype._runFromQueue = function () {
	this._workers.forEach(function (worker) {
		if (!worker.isBusy() && this._queue.length > 0) {
			var current = this._queue.shift();

			worker.runIfFree(current.task, current.metaListener).then(current.resolve, current.reject);
		}
	}, this);
};

WorkerPool.prototype._saveCallBack = function (task, metaListener, resolve, reject) {
	this._queue.push({
		task: task,
		metaListener: metaListener,
		resolve: resolve,
		reject: reject
	});
};

/** schedule a new task
*   @param the task to schedule
*   @param metaListener a listener for meta information (e.g. progress)
*/
WorkerPool.prototype.schedule = function (task, metaListener) {
	this._createNewWorker();

	var waitPromise = new this._Promise(this._saveCallBack.bind(this, task, metaListener));
	this._runFromQueue();
	return waitPromise;
};

/** close all workers. finish remaining tasks first */
WorkerPool.prototype.drain = function () {
	this.setNumberOfWorkers(0);
};

WorkerPool.prototype.setNumberOfWorkers = function (numberOfWorkers) {
	this._numberOfWorkers = numberOfWorkers;

	if (numberOfWorkers > this._numberOfWorkers) {
		for (var i = 0; i < this._queue.length; i += 1) {
			this._createNewWorker();
		}
	}
};

module.exports = WorkerPool;

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PromiseWorker = function PromiseWorker(Promise, workerScriptOverride) {
    this._Promise = Promise;
    this._busy = true;

    if (!workerScriptOverride) {
        this._worker = new Worker("./build/worker.bundle.js");
    } else {
        this._worker = new Worker(workerScriptOverride);
    }

    this._taskQueue = [];
    this._freeListener = [];
    this._taskCallback = null;
    this._metaListener = null;

    this._worker.onmessage = this._workerMessage.bind(this);

    this._worker.postMessage({
        action: "setup"
    });
};

PromiseWorker.prototype._workerMessage = function (event) {
    var data = event.data.data;var type = event.data.type;
    if (type === "meta" && this._metaListener) {
        this._metaListener(data);
    } else if (type === "resultTask") {
        this._taskCallback.resolve(data);
        this._free();
    } else if (type === "setup") {
        this._free();
    } else if (type === "error") {
        this._taskCallback.reject(data);
        this._free();
    }
};

PromiseWorker.prototype.isBusy = function () {
    return this._busy;
};

PromiseWorker.prototype._lockFree = function () {
    var that = this;
    return new this._Promise(function (resolve) {
        that._taskQueue.push(resolve);
        that._checkQueues();
    });
};

PromiseWorker.prototype.runIfFree = function (data, metaListener) {
    if (!this._busy) {
        return this._run(data, metaListener);
    }

    return false;
};

PromiseWorker.prototype.onFree = function (cb) {
    this._freeListener.push(cb);
};

/** called when the worker is freed.
    - checks if there are any waiting tasks and runs them
    - if no waiting tasks exist calls free listener.
 */
PromiseWorker.prototype._free = function () {
    this._busy = false;
    this._taskCallback = null;
    this._metaListener = null;

    this._checkQueues();
};

PromiseWorker.prototype._checkQueues = function () {
    if (this._busy) {
        return;
    }

    if (this._taskQueue.length > 0) {
        this._busy = true;
        this._taskQueue.shift()();

        return;
    }

    this._freeListener.forEach(function (listener) {
        try {
            listener();
        } catch (e) {
            console.error(e);
        }
    });
};

PromiseWorker.prototype._saveCallbacks = function (resolve, reject) {
    this._taskCallback = {
        resolve: resolve,
        reject: reject
    };
};

PromiseWorker.prototype._run = function (data, metaListener) {
    this._busy = true;
    this._metaListener = metaListener;

    var waitPromise = new this._Promise(this._saveCallbacks.bind(this));
    this._worker.postMessage({
        action: "runTask",
        data: data
    });
    return waitPromise;
};

/** run a task as soon as the worker is free
    @param data data to sent to worker task
    @param metaListener callback for meta information
*/
PromiseWorker.prototype.runTask = function (data, metaListener) {
    return this._lockFree().then(this._run.bind(this, data, metaListener));
};

module.exports = PromiseWorker;

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var chelper = __webpack_require__(193);
var sjcl = __webpack_require__(45);

var ObjectHasher = function ObjectHasher(data, version) {
	this._data = data;
	this._version = parseInt(version, 10);
};

ObjectHasher.prototype.sjclHash = function (data) {
	return "hash::" + chelper.bits2hex(sjcl.hash.sha256.hash(data));
};

ObjectHasher.prototype._hashProperty = function (val) {
	return this._version >= 2 ? val.toString() : this.sjclHash("data::" + val.toString());
};

ObjectHasher.prototype._doHashNewObject = function (val) {
	var hasher = new ObjectHasher(val, this._version);
	if (this._version === 3) {
		return hasher.stringify();
	}

	return this.sjclHash(hasher.stringify());
};

ObjectHasher.prototype._doHash = function (val, attr) {
	var allowedTypes = ["number", "string", "boolean"];

	if (attr === "hash") {
		throw new Error("object can not have hash attributes");
	}

	var type = typeof val === "undefined" ? "undefined" : _typeof(val);
	if (type === "object") {
		return this._doHashNewObject(val);
	}

	if (allowedTypes.indexOf(type) > -1) {
		return this._hashProperty(val);
	}

	throw new Error("can not hash objects with " + type);
};

ObjectHasher.prototype._stringifyArray = function () {
	var i,
	    result = [];
	for (i = 0; i < this._data.length; i += 1) {
		result.push(this._doHash(this._data[i]), i);
	}

	return JSON.stringify(result);
};

ObjectHasher.prototype._jsonifyUnique = function (obj) {
	var sortation = Object.keys(obj).sort();
	return JSON.stringify(obj, sortation);
};

ObjectHasher.prototype._stringifyObject = function () {
	var attr,
	    hashObj = {};
	for (attr in this._data) {
		if (this._data.hasOwnProperty(attr)) {
			hashObj[attr] = this._doHash(this._data[attr], attr);
		}
	}

	return this._jsonifyUnique(hashObj);
};

ObjectHasher.prototype._stringifyObjectOrArray = function () {
	if (this._data instanceof Array) {
		return this._stringifyArray();
	} else {
		return this._stringifyObject();
	}
};

ObjectHasher.prototype.stringify = function () {
	if (_typeof(this._data) !== "object") {
		throw new Error("this is not an object!");
	}

	if (this._version === 4) {
		return JSON.stringify(ObjectHasher.handleVal(this._data));
	}

	return this._stringifyObjectOrArray();
};

ObjectHasher.prototype.hash = function () {
	return chelper.bits2hex(this.hashBits());
};

ObjectHasher.prototype.hashBits = function () {
	return sjcl.hash.sha256.hash(this.stringify());
};

ObjectHasher.getType = function (val) {
	if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
		if (val instanceof Array) {
			return "arr";
		} else {
			return "obj";
		}
	}

	return "val";
};

ObjectHasher.transformVal = function (val) {
	if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
		if (val instanceof Array) {
			return val.map(ObjectHasher.handleVal);
		} else {
			return ObjectHasher.mapToArray(val);
		}
	}

	return val.toString();
};

ObjectHasher.handleVal = function (val, key) {
	if (key) {
		return [ObjectHasher.getType(val), key, ObjectHasher.transformVal(val)];
	}

	return [ObjectHasher.getType(val), ObjectHasher.transformVal(val)];
};

ObjectHasher.mapToArray = function (obj) {
	return Object.keys(obj).sort().map(function (key) {
		return ObjectHasher.handleVal(obj[key], key);
	});
};

module.exports = ObjectHasher;

/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Bluebird = __webpack_require__(3);
var h = __webpack_require__(6).default;

var errorService = __webpack_require__(32).errorServiceInstance;

var migrations = ["regenerateFriendsKeys", "fixBrokenSettings"];

function runMigration(ownUser, migrationState) {
	return Bluebird.try(function () {
		var migration = __webpack_require__(376)("./" + h.pad("" + (migrationState + 1), 5) + "-" + migrations[migrationState]);
		return migration();
	}).then(function (success) {
		if (!success) {
			console.error("Migration failed " + migrationState, success);
			//AUTSCH!
		} else {
			return ownUser.setMigrationState(migrationState + 1);
		}
	});
}

var doMigration = function doMigration() {
	var ownUser = __webpack_require__(9).default.getOwn(),
	    migrationState;

	if (ownUser) {
		ownUser.getMigrationState().then(function (state) {
			migrationState = h.parseDecimal(state) || 0;
			if (migrationState < migrations.length) {
				return runMigration(ownUser, migrationState);
			}
		}).catch(errorService.criticalError);
	}
};

module.exports = doMigration;

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./00001-regenerateFriendsKeys": 197,
	"./00001-regenerateFriendsKeys.js": 197,
	"./00002-fixBrokenSettings": 200,
	"./00002-fixBrokenSettings.js": 200,
	"./migrationExample": 201,
	"./migrationExample.js": 201
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 376;

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NotExistingUser */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_error_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__asset_state__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_session_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_blobService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__users_profile__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_settings_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_filter_service__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_location_manager__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_mutableObjectLoader__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_requestKey_service__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__users_signedKeys__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__crypto_trustManager__ = __webpack_require__(71);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};




var initService = __webpack_require__(20);

var keyStoreService = __webpack_require__(28);










var friendsService = __webpack_require__(87);

var RELOAD_DELAY = 10 * 1000;
var RELOAD_OWN_DELAY = 5 * 1000;
var advancedBranches = ["location", "birthday", "relationship", "education", "work", "gender", "languages"];
var advancedDefaults = {
    location: {},
    birthday: {},
    relationship: {},
    education: [],
    work: {},
    gender: {},
    languages: []
};
function applicableParts(scope, privacy, profile) {
    var result = {};
    if (privacy === undefined || profile === undefined) {
        throw new Error("dafuq");
    }
    __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].objectEach(privacy, function (key, val) {
        if (profile[key]) {
            if (typeof val.encrypt !== "undefined") {
                if (!val.encrypt || val.visibility.indexOf(scope) > -1) {
                    result[key] = profile[key];
                }
            }
            else {
                result[key] = applicableParts(scope, val, profile[key]);
            }
        }
    });
    return result;
}
function applicablePublicParts(privacy, profile) {
    var result = {};
    if (privacy === undefined || profile === undefined) {
        throw new Error("dafuq");
    }
    __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].objectEach(privacy, function (key, value) {
        if (profile[key]) {
            if (typeof value.encrypt !== "undefined") {
                if (!value.encrypt) {
                    result[key] = profile[key];
                }
            }
            else {
                result[key] = applicablePublicParts(value, profile[key]);
            }
        }
    });
    return result;
}
function getAllProfileTypes(privacySettings) {
    var profileTypes = [];
    advancedBranches.forEach(function (branch) {
        if (privacySettings[branch].encrypt) {
            profileTypes = profileTypes.concat(privacySettings[branch].visibility);
        }
    });
    if (privacySettings.basic.firstname.encrypt) {
        profileTypes = profileTypes.concat(privacySettings.basic.firstname.visibility);
    }
    if (privacySettings.basic.lastname.encrypt) {
        profileTypes = profileTypes.concat(privacySettings.basic.lastname.visibility);
    }
    return __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].arrayUnique(profileTypes);
}
function deleteCache() {
    return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
        return new __WEBPACK_IMPORTED_MODULE_3_bluebird__(function (resolve) {
            var deleteRequest = indexedDB.deleteDatabase("whispeerCache");
            deleteRequest.onerror = resolve;
            deleteRequest.onsuccess = resolve;
        });
    });
}
var User = (function () {
    function User(userData, signedKeys, profiles) {
        var _this = this;
        this.profiles = {
            private: [],
            me: null,
            public: null,
        };
        this.addFriendState = new __WEBPACK_IMPORTED_MODULE_4__asset_state__["a" /* default */]();
        this.ignoreFriendState = new __WEBPACK_IMPORTED_MODULE_4__asset_state__["a" /* default */]();
        this.data = {};
        this.update = function (_a) {
            var mutualFriends = _a.mutualFriends, mail = _a.mail, migrationState = _a.migrationState, profiles = _a.profiles;
            _this.mutualFriends = mutualFriends;
            _this.mail = mail;
            _this.migrationState = migrationState;
            _this.profiles = profiles;
            _this.data.mutualFriends = _this.mutualFriends;
            _this.setNames();
            advancedBranches.map(function (branch) {
                _this.data.advanced[branch] = _this.getAdvancedAttribute(branch);
            });
        };
        this.setNames = function () {
            var names = _this.getName();
            _this.data.name = names.name;
            _this.data.names = names;
            _this.data.basic.shortname = names.shortname;
        };
        this.isBlocked = function () {
            return __WEBPACK_IMPORTED_MODULE_8__services_settings_service__["default"].isBlocked(_this.id);
        };
        this.setData = function () {
            _this.data = {
                notExisting: false,
                user: _this,
                id: _this.id,
                trustLevel: 0,
                signatureValid: true,
                fingerprint: keyStoreService.format.fingerPrint(_this.signKey),
                addFriendState: _this.addFriendState.data,
                ignoreFriendState: _this.ignoreFriendState.data,
                me: _this.isOwn(),
                other: !_this.isOwn(),
                online: friendsService.onlineStatus(_this.getID()) || 0,
                basic: {
                    age: "?",
                    location: "?",
                    mutualFriends: [],
                    url: "user/" + _this.nickname,
                    image: "assets/img/user.png"
                },
                advanced: {}
            };
        };
        this.attachListener = function () {
            if (_this.isOwn()) {
                _this.friendsKey = _this.signedKeys.metaAttr("friends");
            }
            else {
                friendsService.awaitLoading().then(function () {
                    if (friendsService.didOtherRequest(_this.id)) {
                        _this.friendsKey = _this.signedKeys.metaAttr("friends");
                    }
                    if (friendsService.didIRequest(_this.id)) {
                        _this.friendShipKey = friendsService.getUserFriendShipKey(_this.id);
                    }
                });
            }
            friendsService.listen(function (status) {
                _this.data.online = status;
            }, "online:" + _this.getID());
            friendsService.awaitLoading().then(function () {
                _this.data.added = friendsService.didIRequest(_this.getID());
                _this.data.isMyFriend = friendsService.areFriends(_this.getID());
                friendsService.listen(function () {
                    _this.data.added = friendsService.didIRequest(_this.getID());
                    _this.data.isMyFriend = friendsService.areFriends(_this.getID());
                });
            });
            __WEBPACK_IMPORTED_MODULE_8__services_settings_service__["default"].listen(function () { return _this.setNames(); }, "updated");
        };
        this.generateNewFriendsKey = function () {
            var newFriendsKey;
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
                if (!_this.isOwn()) {
                    throw new Error("not my own user");
                }
                //generate new key
                return keyStoreService.sym.generateKey(null, "friends");
            }).then(function (_newFriendsKey) {
                newFriendsKey = _newFriendsKey;
                //encrypt with all friendShipKeys
                var keys = friendsService.getAllFriendShipKeys();
                var keysPromises = keys.map(function (key) {
                    return keyStoreService.sym.symEncryptKey(newFriendsKey, key);
                });
                return __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"]([
                    __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"](keysPromises),
                    keyStoreService.sym.symEncryptKey(newFriendsKey, _this.mainKey),
                    //encrypt old friends key with new friends key
                    keyStoreService.sym.symEncryptKey(_this.friendsKey, newFriendsKey),
                ]);
            }).then(function () {
                //update signedKeys
                _this.signedKeys.metaSetAttr("friends", newFriendsKey);
                return _this.signedKeys.getUpdatedData(_this.signKey);
            }).then(function (updatedSignedKeys) {
                _this.friendsKey = newFriendsKey;
                return {
                    updatedSignedKeys: updatedSignedKeys,
                    newFriendsKey: newFriendsKey
                };
            });
        };
        this.setFriendShipKey = function (key) {
            if (!_this.friendShipKey) {
                _this.friendShipKey = key;
            }
        };
        /** profile management */
        // there is mainly one profile: the "me" profile, containing all data.
        // this profile is always updated when we edit the profile.
        // every other profile is a smaller part of this profile and is generated
        // after updating the "me" profile (or at other times - e.g. when settings change)
        /* gets a given profile attribute to value
        * @param attribute attribute to set
        * @param cb
        */
        this.getProfileAttribute = function (attribute) {
            if (_this.profiles.me) {
                return _this.profiles.me.getAttribute(attribute);
            }
            var profiles = _this.profiles.private.concat([_this.profiles.public]);
            var values = profiles.map(function (profile) {
                return profile.getAttribute(attribute);
            }).filter(function (value) {
                return typeof value !== "undefined" && value !== "";
            });
            if (values.length === 0) {
                return "";
            }
            values.sort(function (val1, val2) {
                if (typeof val1 === "object" && typeof val2 === "object") {
                    return Object.keys(val2).length - Object.keys(val1).length;
                }
                return 0;
            });
            return values[0];
        };
        /** uses the me profile to generate new profiles */
        this.rebuildProfiles = function () {
            var scopes, privacySettings;
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
                if (!_this.isOwn()) {
                    throw new Error("update on another user failed");
                }
                privacySettings = __WEBPACK_IMPORTED_MODULE_8__services_settings_service__["default"].getBranch("privacy");
                scopes = getAllProfileTypes(privacySettings);
                return __WEBPACK_IMPORTED_MODULE_9__services_filter_service__["a" /* default */].filterToKeys(scopes);
            }).then(function (keys) {
                var profile = _this.profiles.me.getFull();
                var scopeData = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].joinArraysToObject({
                    name: scopes,
                    key: keys.slice(0, keys.length - 1)
                });
                var pub = new __WEBPACK_IMPORTED_MODULE_7__users_profile__["default"]({ content: applicablePublicParts(privacySettings, profile) }, { isPublicProfile: true });
                var pubPromise = pub.sign(_this.getSignKey());
                var privatePromises = scopeData.map(function (scope) {
                    var newProfile = new __WEBPACK_IMPORTED_MODULE_7__users_profile__["default"]({
                        content: applicableParts(scope.name, privacySettings, profile)
                    });
                    return newProfile.signAndEncrypt(_this.getSignKey(), scope.key);
                });
                return __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"]([
                    pubPromise,
                    __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"](privatePromises)
                ]);
            }).spread(function (pub, profileData) {
                return {
                    pub: pub,
                    priv: profileData
                };
            });
        };
        this.setMail = function (newMail, cb) {
            if (newMail === _this.mail) {
                return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"]().nodeify(cb);
            }
            return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("user.mailChange", { mail: newMail }).then(function () {
                _this.mail = newMail;
            }).nodeify(cb);
        };
        /** uploads all profiles (also recreates them) */
        this.uploadChangedProfile = function (cb) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
                return __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"]([
                    _this.rebuildProfiles(),
                    _this.profiles.me.signAndEncrypt(_this.getSignKey(), _this.getMainKey())
                ]);
            }).spread(function (profileData, myProfile) {
                profileData.me = myProfile;
                return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("user.profile.update", profileData);
            }).then(function () {
                _this.profiles.me.updated();
                _this.loadBasicDataPromise = null;
                return _this.loadBasicData();
            }).nodeify(cb);
        };
        /* sets a given profile attribute to value
        * @param attribute attribute to set
        * @param value value of the attribute
        * @param cb
        */
        this.setProfileAttribute = function (attribute, value) {
            return _this.profiles.me.setAttribute(attribute, value);
        };
        this.removeProfileAttribute = function (attribute) {
            return _this.profiles.me.removeAttribute(attribute);
        };
        this.getFingerPrint = function () {
            return keyStoreService.format.fingerPrint(_this.getSignKey());
        };
        this.setAdvancedProfile = function (advancedProfile, cb) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](advancedBranches).map(function (branch) {
                return _this.profiles.me.setAttribute(branch, advancedProfile[branch]);
            }).nodeify(cb);
        };
        /** end profile management */
        this.verifyFingerPrint = function (fingerPrint) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
                if (fingerPrint !== keyStoreService.format.fingerPrint(_this.getSignKey())) {
                    throw new Error("wrong code");
                }
                return __WEBPACK_IMPORTED_MODULE_14__crypto_trustManager__["default"].verifyUser(_this);
            }).then(function () {
                _this.data.trustLevel = 2;
            });
        };
        this.createBackupKey = function () {
            var outerKey;
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
                return initService.awaitLoading();
            }).then(function () {
                return keyStoreService.sym.createBackupKey(_this.mainKey);
            }).then(function (backupKeyData) {
                var decryptors = backupKeyData.decryptors;
                var innerKey = backupKeyData.innerKey;
                outerKey = backupKeyData.outerKey;
                return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("user.backupKey", {
                    innerKey: innerKey,
                    decryptors: decryptors
                });
            }).then(function (data) {
                if (data.error) {
                    throw new Error("server error");
                }
                return keyStoreService.format.base32(outerKey);
            });
        };
        this.getTrustLevel = function () {
            var trust = __WEBPACK_IMPORTED_MODULE_14__crypto_trustManager__["default"].getKeyData(_this.getSignKey());
            if (trust.isOwn()) {
                return -1;
            }
            if (trust.isVerified()) {
                return 2;
            }
            if (trust.isWhispeerVerified() || trust.isNetworkVerified()) {
                return 1;
            }
            return 0;
        };
        this.changePassword = function (newPassword, cb) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
                if (!_this.isOwn()) {
                    throw new Error("not my own user");
                }
                var ownKeys = { main: _this.mainKey, sign: _this.signKey };
                return __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"]([
                    keyStoreService.security.makePWVerifiable(ownKeys, newPassword),
                    keyStoreService.random.hex(16),
                    keyStoreService.sym.pwEncryptKey(_this.mainKey, newPassword),
                    deleteCache(),
                ]);
            }).spread(function (signedOwnKeys, salt, decryptor) {
                return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("user.changePassword", {
                    signedOwnKeys: signedOwnKeys,
                    password: {
                        salt: salt,
                        hash: keyStoreService.hash.hashPW(newPassword, salt),
                    },
                    decryptor: decryptor
                });
            }).then(function () {
                __WEBPACK_IMPORTED_MODULE_5__services_session_service__["default"].setPassword(newPassword);
            }).nodeify(cb);
        };
        this.loadFullData = function () {
            return _this.loadBasicData();
        };
        this.getFriends = function (cb) {
            return friendsService.getUserFriends(_this.getID(), cb);
        };
        this.loadImage = function () {
            var blob = _this.getProfileAttribute("imageBlob");
            if (!blob) {
                _this.data.basic.image = "assets/img/user.png";
                return;
            }
            return __WEBPACK_IMPORTED_MODULE_6__services_blobService__["a" /* default */].getBlobUrl(blob.blobid).then(function (url) {
                return Object(__WEBPACK_IMPORTED_MODULE_10__services_location_manager__["d" /* isIOS */])() ?
                    url.replace("file://", "") : url;
            }).then(function (imageUrl) {
                _this.data.basic.image = imageUrl;
            }).catch(function (e) { return __WEBPACK_IMPORTED_MODULE_0__services_error_service__["default"].criticalError(e); });
        };
        this.loadBasicData = function () {
            _this.data.trustLevel = _this.getTrustLevel();
            _this.loadImage();
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"]();
        };
        this.setMigrationState = function (migrationState, cb) {
            return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("user.setMigrationState", {
                migrationState: migrationState
            }).nodeify(cb);
        };
        this.getMigrationState = function () {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](_this.migrationState);
        };
        this.isOwn = function () {
            return _this.getID() === __WEBPACK_IMPORTED_MODULE_5__services_session_service__["default"].getUserID();
        };
        this.getNickOrMail = function () {
            return _this.nickname || _this.mail;
        };
        this.getMainKey = function () {
            return _this.mainKey;
        };
        this.getSignKey = function () {
            return _this.signKey;
        };
        this.getCryptKey = function () {
            return _this.cryptKey;
        };
        this.getFriendShipKey = function () {
            return _this.friendShipKey;
        };
        this.getContactKey = function () {
            return _this.friendShipKey || _this.cryptKey;
        };
        this.getFriendsKey = function () {
            return _this.friendsKey;
        };
        this.getID = function () {
            return parseInt(_this.id, 10);
        };
        this.getNickname = function () {
            return _this.nickname;
        };
        this.getMail = function () {
            return _this.mail;
        };
        this.getSearchName = function () {
            var basic = _this.getProfileAttribute("basic") || {};
            var nickname = _this.getNickname();
            var searchNames = [nickname];
            if (basic.firstname) {
                searchNames.push(basic.firstname);
            }
            if (basic.lastname) {
                searchNames.push(basic.lastname);
            }
            return searchNames.join(" ").toLowerCase();
        };
        this.getLongName = function () {
            var basic = _this.getProfileAttribute("basic") || {};
            var nickname = _this.getNickname();
            if (basic.firstname && basic.lastname) {
                return basic.firstname + " " + basic.lastname;
            }
            if (basic.firstname || basic.lastname) {
                return basic.firstname || basic.lastname;
            }
            return nickname;
        };
        this.getName = function () {
            var basic = _this.getProfileAttribute("basic") || {};
            var nickname = _this.getNickname();
            if (_this.isBlocked()) {
                return {
                    name: nickname,
                    originalName: _this.getLongName(),
                    searchName: _this.getSearchName(),
                    firstname: "",
                    lastname: "",
                    nickname: nickname,
                    shortname: nickname,
                };
            }
            return {
                name: _this.getLongName(),
                searchName: _this.getSearchName(),
                firstname: basic.firstname || "",
                lastname: basic.lastname || "",
                nickname: nickname,
                shortname: basic.firstname || basic.lastname || nickname
            };
        };
        this.ignoreFriendShip = function () {
            _this.ignoreFriendState.pending();
            if (!_this.isOwn()) {
                friendsService.ignoreFriendShip(_this.getID(), __WEBPACK_IMPORTED_MODULE_0__services_error_service__["default"].failOnError(_this.ignoreFriendState));
            }
            else {
                _this.ignoreFriendState.failed();
            }
        };
        this.acceptFriendShip = function () {
            _this.addFriendState.pending();
            if (!_this.isOwn()) {
                friendsService.acceptFriendShip(_this.getID(), __WEBPACK_IMPORTED_MODULE_0__services_error_service__["default"].failOnError(_this.addFriendState));
            }
            else {
                _this.addFriendState.failed();
            }
        };
        this.isNotExistingUser = function () {
            return false;
        };
        this.removeAsFriend = function () {
            if (!_this.isOwn()) {
                friendsService.removeFriend(_this.getID(), __WEBPACK_IMPORTED_MODULE_0__services_error_service__["default"].criticalError);
            }
            else {
                _this.addFriendState.failed();
            }
        };
        this.addAsFriend = function () {
            _this.addFriendState.pending();
            if (!_this.isOwn()) {
                friendsService.friendship(_this.getID(), __WEBPACK_IMPORTED_MODULE_0__services_error_service__["default"].failOnError(_this.addFriendState));
            }
            else {
                _this.addFriendState.failed();
            }
        };
        this.id = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].parseDecimal(userData.id);
        this.mainKey = userData.mainKey;
        this.signedKeys = signedKeys;
        //all keys we get from the signedKeys object:
        this.signKey = this.signedKeys.metaAttr("sign");
        this.cryptKey = this.signedKeys.metaAttr("crypt");
        this.nickname = userData.nickname;
        var mutualFriends = userData.mutualFriends, mail = userData.mail, _a = userData.migrationState, migrationState = _a === void 0 ? 0 : _a;
        this.setData();
        this.update({ mutualFriends: mutualFriends, mail: mail, migrationState: migrationState, profiles: profiles });
        this.attachListener();
    }
    User.prototype.getAdvancedAttribute = function (branch) {
        var result = this.getProfileAttribute(branch);
        if (branch === "gender" && typeof result === "string") {
            return __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].deepCopyObj({ gender: result });
        }
        return __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].deepCopyObj(result || advancedDefaults[branch], 3);
    };
    return User;
}());
function loadProfileInfo(profileInfo, signKey, isPublic) {
    if (isPublic === void 0) { isPublic = false; }
    return __WEBPACK_IMPORTED_MODULE_7__users_profile__["ProfileLoader"].load(__assign({}, profileInfo, { isPublic: isPublic,
        signKey: signKey }));
}
var getProfiles = function (userData, signKey, isMe) {
    return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
        return __awaiter(this, void 0, void 0, function () {
            var profiles, _a, priv, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        profiles = {
                            public: null,
                            private: null,
                            me: null
                        };
                        if (!!isMe) return [3 /*break*/, 5];
                        if (!userData.profile.pub) return [3 /*break*/, 2];
                        userData.profile.pub.profileid = userData.profile.pub.profileid || userData.id;
                        _a = profiles;
                        return [4 /*yield*/, loadProfileInfo(userData.profile.pub, signKey, true)];
                    case 1:
                        _a.public = _d.sent();
                        _d.label = 2;
                    case 2:
                        profiles.private = [];
                        if (!(userData.profile.priv && userData.profile.priv instanceof Array)) return [3 /*break*/, 4];
                        priv = userData.profile.priv;
                        _b = profiles;
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](priv)
                                .map(function (profile) { return loadProfileInfo(profile, signKey); })];
                    case 3:
                        _b.private = _d.sent();
                        _d.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        _c = profiles;
                        return [4 /*yield*/, loadProfileInfo(userData.profile.me, signKey)];
                    case 6:
                        _c.me = _d.sent();
                        _d.label = 7;
                    case 7: return [2 /*return*/, profiles];
                }
            });
        });
    });
};
var deletedUserName = "Deleted user";
var NotExistingUser = (function () {
    function NotExistingUser(identifier) {
        this.isBlocked = function () { return false; };
        this.getID = function () { return -1; };
        this.generateNewFriendsKey = function () { return __WEBPACK_IMPORTED_MODULE_3_bluebird__["reject"](new Error("not my own user")); };
        this.isNotExistingUser = function () { return true; };
        this.loadBasicData = function () { return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](); };
        this.loadFullData = function () { return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](); };
        this.isOwn = function () { return false; };
        this.rebuildProfiles = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getFingerPrint = function () { throw new Error("not implemented for NotExistingUser"); };
        this.createBackupKey = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getTrustLevel = function () { throw new Error("not implemented for NotExistingUser"); };
        this.loadImage = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getMigrationState = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getNickOrMail = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getMainKey = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getSignKey = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getCryptKey = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getFriendShipKey = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getContactKey = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getFriendsKey = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getNickname = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getMail = function () { throw new Error("not implemented for NotExistingUser"); };
        this.getName = function () { throw new Error("not implemented for NotExistingUser"); };
        this.ignoreFriendShip = function () { throw new Error("not implemented for NotExistingUser"); };
        this.acceptFriendShip = function () { throw new Error("not implemented for NotExistingUser"); };
        this.removeAsFriend = function () { throw new Error("not implemented for NotExistingUser"); };
        this.addAsFriend = function () { throw new Error("not implemented for NotExistingUser"); };
        this.data = {
            trustLevel: -1,
            notExisting: true,
            basic: {
                shortname: deletedUserName,
                image: "assets/img/user.png"
            },
            name: deletedUserName,
            user: this
        };
        if (typeof identifier === "number") {
            this.data.id = identifier;
        }
    }
    return NotExistingUser;
}());

var improveKeyAccess = function (keys, identifier) {
    return UserLoader.get(__WEBPACK_IMPORTED_MODULE_5__services_session_service__["default"].getUserID()).then(function (ownUser) {
        if (!ownUser || ownUser.getNickOrMail() !== identifier) {
            throw new Error("user changed so no improvement update!");
        }
        return __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"](keys.map(function (keyID) {
            return keyStoreService.sym.symEncryptKey(keyID, ownUser.getMainKey());
        }));
    }).then(function () {
        return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("key.addFasterDecryptors", {
            keys: keyStoreService.upload.getDecryptors(keys)
        });
    });
};
var improvementListener = function (identifier) {
    var improve = [];
    keyStoreService.addImprovementListener(function (rid) {
        improve.push(rid);
        if (improve.length === 1) {
            __WEBPACK_IMPORTED_MODULE_3_bluebird__["delay"](5000).then(function () {
                var keys = improve;
                improve = [];
                return improveKeyAccess(keys, identifier);
            }).catch(__WEBPACK_IMPORTED_MODULE_0__services_error_service__["default"].criticalError);
        }
    });
};
function enhanceOwnUser(userData) {
    var nickname = userData.nickname;
    var mainKey = userData.mainKey;
    var signKey = userData.signedKeys.sign;
    keyStoreService.setKeyGenIdentifier(nickname);
    improvementListener(nickname);
    keyStoreService.sym.registerMainKey(mainKey);
    keyStoreService.security.verifyWithPW(userData.signedOwnKeys, {
        main: mainKey,
        sign: signKey
    });
    keyStoreService.security.addEncryptionIdentifier(mainKey);
    keyStoreService.security.addEncryptionIdentifier(signKey);
    __WEBPACK_IMPORTED_MODULE_14__crypto_trustManager__["default"].setOwnSignKey(signKey);
    __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"]([
        __WEBPACK_IMPORTED_MODULE_12__services_requestKey_service__["a" /* default */].getKey(signKey),
        __WEBPACK_IMPORTED_MODULE_12__services_requestKey_service__["a" /* default */].getKey(mainKey)
    ]).then(function () {
        __WEBPACK_IMPORTED_MODULE_12__services_requestKey_service__["a" /* default */].cacheKey(signKey, "user-sign-" + nickname, __WEBPACK_IMPORTED_MODULE_12__services_requestKey_service__["a" /* default */].MAXCACHETIME);
        __WEBPACK_IMPORTED_MODULE_12__services_requestKey_service__["a" /* default */].cacheKey(mainKey, "user-main-" + nickname, __WEBPACK_IMPORTED_MODULE_12__services_requestKey_service__["a" /* default */].MAXCACHETIME);
    });
}
var loadUserInfo = function (identifiers) {
    return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].definitlyEmit("user.getMultiple", { identifiers: identifiers })
        .then(function (_a) {
        var users = _a.users;
        return users;
    });
};
var getUserInfoDelayed = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].delayMultiplePromise(__WEBPACK_IMPORTED_MODULE_3_bluebird__, 1000, loadUserInfo, 20);
var getUserInfoNow = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].delayMultiplePromise(__WEBPACK_IMPORTED_MODULE_3_bluebird__, 50, loadUserInfo, 10);
var profilesLoaded = function (signKey, profiles) {
    var pub = profiles.pub;
    var priv = profiles.priv || [];
    return __WEBPACK_IMPORTED_MODULE_7__users_profile__["ProfileLoader"].isLoaded(signKey + "-" + pub.meta._signature) && priv.reduce(function (prev, privProfile) {
        return prev && __WEBPACK_IMPORTED_MODULE_7__users_profile__["ProfileLoader"].isLoaded(signKey + "-" + privProfile.meta._signature);
    }, true);
};
var isSameInfo = function (userData, previousInstance) {
    if (previousInstance instanceof NotExistingUser || userData.userNotExisting) {
        return false;
    }
    var userID = previousInstance.getID();
    var isMe = __WEBPACK_IMPORTED_MODULE_5__services_session_service__["default"].isOwnUserID(userID);
    if (isMe) {
        return false;
    }
    var signKey = previousInstance.getSignKey();
    var signedKeys = userData.signedKeys, profile = userData.profile, rest = __rest(userData, ["signedKeys", "profile"]);
    if (!__WEBPACK_IMPORTED_MODULE_13__users_signedKeys__["a" /* SignedKeysLoader */].isLoaded(signKey + "-" + signedKeys._signature)) {
        return false;
    }
    if (!profilesLoaded(signKey, profile)) {
        return false;
    }
    if (Object.keys(rest).length !== 3) {
        return false;
    }
    return rest.id === previousInstance.id &&
        rest.nickname === previousInstance.nickname &&
        __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].deepEqual(rest.mutualFriends, previousInstance.mutualFriends);
};
var UserLoader = (function (_super) {
    __extends(UserLoader, _super);
    function UserLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_11__services_mutableObjectLoader__["c" /* default */])({
    download: function (id, previousInstance) {
        return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].awaitConnection()
            .then(function () { return previousInstance ? getUserInfoDelayed(id) : getUserInfoNow(id); });
    },
    load: function (userData, previousInstance) {
        if (previousInstance && isSameInfo(userData, previousInstance)) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](__WEBPACK_IMPORTED_MODULE_11__services_mutableObjectLoader__["a" /* SYMBOL_UNCHANGED */]);
        }
        return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](userData);
    },
    restore: function (userData, previousInstance) {
        if (previousInstance) {
            if (previousInstance instanceof NotExistingUser && userData.userNotExisting) {
                return previousInstance;
            }
            if (previousInstance instanceof User && !userData.userNotExisting) {
                return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var userID, isMe, signKey, mutualFriends, mail, migrationState, profiles;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    userID = previousInstance.getID();
                                    isMe = __WEBPACK_IMPORTED_MODULE_5__services_session_service__["default"].isOwnUserID(userID);
                                    signKey = previousInstance.getSignKey();
                                    mutualFriends = userData.mutualFriends, mail = userData.mail, migrationState = userData.migrationState;
                                    return [4 /*yield*/, getProfiles(userData, signKey, isMe)];
                                case 1:
                                    profiles = _a.sent();
                                    previousInstance.update({ mutualFriends: mutualFriends, mail: mail, migrationState: migrationState, profiles: profiles });
                                    return [2 /*return*/, previousInstance];
                            }
                        });
                    });
                });
            }
            console.warn("previous instance is not a user but current data is. Reloading");
            Object(__WEBPACK_IMPORTED_MODULE_10__services_location_manager__["h" /* reloadApp */])();
            return previousInstance;
        }
        return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
            return __awaiter(this, void 0, void 0, function () {
                var userID, isMe, signKey, nickname, signedKeys, profiles;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userData.userNotExisting) {
                                return [2 /*return*/, new NotExistingUser(userData.identifier)];
                            }
                            if (userData.error === true) {
                                return [2 /*return*/, new NotExistingUser()];
                            }
                            userID = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].parseDecimal(userData.id);
                            isMe = __WEBPACK_IMPORTED_MODULE_5__services_session_service__["default"].isOwnUserID(userID);
                            if (isMe) {
                                enhanceOwnUser(userData);
                            }
                            signKey = userData.signedKeys.sign;
                            nickname = userData.nickname;
                            if (!isMe) {
                                __WEBPACK_IMPORTED_MODULE_14__crypto_trustManager__["default"].addNewUsers({ key: signKey, userid: userID, nickname: nickname });
                            }
                            return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_13__users_signedKeys__["a" /* SignedKeysLoader */].load({ signedKeys: userData.signedKeys, signKey: signKey })];
                        case 1:
                            signedKeys = _a.sent();
                            return [4 /*yield*/, getProfiles(userData, signKey, isMe)];
                        case 2:
                            profiles = _a.sent();
                            return [2 /*return*/, new User(userData, signedKeys, profiles)];
                    }
                });
            });
        });
    },
    shouldUpdate: function (event, instance) {
        if (__WEBPACK_IMPORTED_MODULE_5__services_session_service__["default"].isOwnUserID(instance.getID())) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["delay"](RELOAD_OWN_DELAY).thenReturn(true);
        }
        if (event === __WEBPACK_IMPORTED_MODULE_11__services_mutableObjectLoader__["b" /* UpdateEvent */].wake) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["delay"](RELOAD_DELAY).thenReturn(true);
        }
        return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](false);
    },
    getID: function (userData) { return userData.id.toString(); },
    cacheName: "user"
})));
/* harmony default export */ __webpack_exports__["a"] = (UserLoader);
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asset_observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__asset_Progress__ = __webpack_require__(70);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var MAXIMUMPARTSIZE = 1000 * 1000;
var STARTPARTSIZE = 5 * 1000;
var MINIMUMPARTSIZE = 1 * 1000;
var MAXIMUMTIME = 2 * 1000;
var BlobDownloader = (function (_super) {
    __extends(BlobDownloader, _super);
    function BlobDownloader(socket, blobid, progress) {
        var _this = _super.call(this) || this;
        _this.blobParts = [];
        _this.partSize = STARTPARTSIZE;
        _this.doneBytes = 0;
        _this.done = false;
        _this.download = function () {
            if (!_this.downloadPromise) {
                _this.downloadPromise = _this.downloadPartsUntilDone();
            }
            return _this.downloadPromise;
        };
        _this.downloadPartsUntilDone = function () {
            if (_this.done) {
                _this.progress.setTotal(_this.doneBytes);
                _this.progress.progress(_this.doneBytes);
                return _this.concatParts();
            }
            return _this.downloadPart().then(function () {
                return _this.downloadPartsUntilDone();
            });
        };
        _this.blobid = blobid;
        _this.socket = socket;
        _this.progress = progress || new __WEBPACK_IMPORTED_MODULE_4__asset_Progress__["a" /* default */]();
        return _this;
    }
    BlobDownloader.prototype.halfSize = function () {
        this.partSize = Math.max(this.partSize / 2, MINIMUMPARTSIZE);
    };
    ;
    BlobDownloader.prototype.doubleSize = function () {
        this.partSize = Math.min(this.partSize * 2, MAXIMUMPARTSIZE);
    };
    ;
    BlobDownloader.prototype.concatParts = function () {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]({
            blob: new Blob(this.blobParts, { type: "image/png" }),
            meta: this.meta
        });
    };
    BlobDownloader.prototype.downloadPart = function () {
        var _this = this;
        var uploadStarted = new Date().getTime();
        return this.socket.awaitConnection().then(function () {
            return _this.socket.emit("blob.getBlobPart", {
                blobid: _this.blobid,
                start: _this.doneBytes,
                size: _this.partSize
            });
        }).then(function (response) {
            var uploadTook = new Date().getTime() - uploadStarted;
            _this.blobParts.push(response.part);
            _this.doneBytes += response.part.byteLength;
            _this.progress.progress(_this.doneBytes);
            if (uploadTook > MAXIMUMTIME) {
                _this.halfSize();
            }
            else {
                _this.doubleSize();
            }
            _this.done = response.last;
            _this.meta = response.meta;
            _this.notify(_this.doneBytes, "progress");
        }).catch(function (e) {
            if (e instanceof __WEBPACK_IMPORTED_MODULE_2__socket_service__["ServerError"]) {
                var response = e.extra.response;
                if (__WEBPACK_IMPORTED_MODULE_3__helper_helper__["default"].hasErrorId(response, 71)) {
                    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["reject"](e);
                }
            }
            console.error(e);
            _this.halfSize();
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["delay"](5000);
        });
    };
    ;
    return BlobDownloader;
}(__WEBPACK_IMPORTED_MODULE_1__asset_observer__["default"]));
/* harmony default export */ __webpack_exports__["a"] = (BlobDownloader);
//# sourceMappingURL=blobDownloader.service.js.map

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
	"use strict";

	var profileJSON = {
		"type": "object",
		"properties": {
			"basic": {
				"type": "object",
				"properties": {
					"firstname": {
						"type": "string"
					},
					"lastname": {
						"type": "string"
					}
				}
			},

			"image": {
				"type": "string",
				"pattern": /^(|data:image\/\w+;base64,[A-Za-z0-9+\/=]*)$/
			},

			"imageBlob": {
				"type": "object",
				"additionalProperties": false,
				"properties": {
					"imageHash": {
						"type": "string",
						"pattern": /^[A-Fa-f0-9]*$/
					},
					"blobid": {
						"type": "string",
						"pattern": /^[A-z0-9]*$/
					}
				}
			},

			"location": {
				"type": "object",
				"properties": {
					"road": {
						"type": "string"
					},
					"number": {
						"type": "string"
					},
					"town": {
						"type": "string"
					},
					"state": {
						"type": "string"
					},
					"country": {
						"type": "string"
					}
				}
			},

			"contact": {
				"type": "object",
				"properties": {
					"im": {
						"type": "Array",
						"items": {
							"type": "object",
							"properties": {
								"messenger": {
									"required": true,
									"type": "string",
									"enum": ["icq", "skype", "jabber"]
								},
								"address": {
									"type": "string"
								}
							}
						}
					},
					"mail": {
						"type": "Array",
						"items": {
							"type": "string",
							"format": "email"
						}
					},
					"telephone": {
						"type": "Array",
						"items": {
							"type": "object",
							"properties": {
								"where": {
									"type": "string"
								},
								"number": {
									"required": true,
									"type": "string",
									"format": "phone"
								}
							}
						}
					},
					"mobile": {
						"type": "Array",
						"items": {
							"type": "object",
							"properties": {
								"where": {
									"type": "string"
								},
								"number": {
									"required": true,
									"type": "string",
									"format": "phone"
								}
							}
						}
					},
					"website": {
						"type": "Array",
						"items": {
							"type": "string",
							"format": "url"
						}
					}
				}
			},

			"relationship": {
				"type": "object",
				"properties": {
					"partner": {
						"type": "object",
						"properties": {
							"user": {
								"type": "integer",
								"minimum": 1
							},
							"partnerSignature": {
								"type": "string",
								"hex": true
							}
						}
					},
					"since": {
						"type": "string",
						"format": "date",
						"after": "1900-01-01"
					},
					"status": {
						"type": "string",
						"enum": ["single", "relationship", "engaged", "married", "divorced", "widowed", "complicated", "open", "inlove"]
					}
				}
			},

			"relatives": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"user": {
							"type": "integer"
						},
						"status": {
							"type": "string",
							"enum": ["sister", "brother", "mother", "father", "daughter", "son", "aunt", "uncle", "niece", "nephew", "femalecousin", "malecousin", "grandmother", "grandfather", "granddaughter", "grandson", "stepsister", "stepbrother", "stepmother", "stepfather", "stepdaughter", "stepson", "sister-in-law", "brother-in-law", "mother-in-law", "father-in-law", "daughter-in-law", "son-in-law"]
						}
					}
				}
			},

			"extended": {
				"type": "object",
				"properties": {
					"sex": {
						"type": "string",
						"enum": ["f", "m"]
					},
					"birthday": {
						"type": "string",
						"format": "date",
						"after": "1900-01-01"
					},
					"religion": {
						"type": "string"
					},
					"political": {
						"type": "string"
					}
				}
			},

			"knowledge": {
				"type": "object",
				"properties": {
					"education": {
						"type": "array",
						"items": {
							"type": "object",
							"properties": {
								"name": {
									"type": "string"
								},
								"startDate": {
									"type": "string",
									"format": "date"
								},
								"endDate": {
									"type": "string",
									"format": "date"
								},
								"edutype": {
									"type": "string"
								},
								"titles": {
									"type": "Array",
									"items": {
										"type": "object",
										"properties": {
											"name": {
												"required": true,
												"type": "string"
											},
											"date": {
												"type": "string",
												"format": "date"
											}
										}
									}
								}
							}
						}
					},
					"knowledge": {
						"type": "string"
					},
					"languages": {
						"type": "array",
						"items": {
							"type": "string"
						}
					}
				}
			},

			"jobs": {
				"type": "array",
				"items": {
					"type": "object",
					"properties": {
						"title": {
							"type": "string"
						},
						"company": {
							"type": "string"
						},
						"startDate": {
							"type": "string",
							"format": "date"
						},
						"endDate": {
							"type": "string",
							"format": "date"
						}
					}
				}
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = profileJSON;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return profileJSON;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})();

/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
	"use strict";

	var profileEncryptedJSON = {
		"type": "object",
		"properties": {
			"basic": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"image": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"location": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"contact": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"relationship": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"relatives": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"extended": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"knowledge": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},

			"jobs": {
				"type": "object",
				"properties": {
					"iv": {
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string",
						"hex": true
					}
				}
			},
			"key": {
				"type": "string"
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = profileEncryptedJSON;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return profileEncryptedJSON;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})();

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
	"use strict";

	/*
 	post: {
 		meta: {
 			contentHash,
 			time,
 			signature,
 			(key),
 			(receiver), //for a wallpost
 		}
 		content //padded!
 	}
 */

	var postJSON = {
		"name": "Post",
		"type": "object",
		"properties": {
			"meta": {
				"required": true,
				"type": "object",
				"extends": "securedDataContent",
				"properties": {
					"sender": {
						"required": true,
						"type": "integer"
					},
					"time": {
						"required": true,
						"type": "integer",
						"min": 1388714536420
					},
					"key": {
						"type": "object"
					},
					"walluser": {
						"type": "integer",
						"min": 1
					}
				}
			},
			"content": {
				"type": "object",
				"required": true,
				"extends": "encryptedData",
				"properties": {}
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = postJSON;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return postJSON;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})();

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
	"use strict";

	/*
 	message: {
 		meta: {
 			previousOwn: (int),
 			previousOther: (int),
 			sender: (int),
 			signature: (hex),
 			topicid: (int),
 			read: (bool)
 		}
 		content: {
 			key,
 			iv: (hex),
 			text: (hex),
 			signature: (hex)
 		}
 		}
 	*/

	var messageJSON = {
		"type": "object",
		"properties": {
			"meta": {
				"type": "object",
				"properties": {
					"createTime": {
						"required": true,
						"type": "integer",
						"min": 1388718525297
					},
					"_parent": {
						"required": true,
						"type": "string"
					},
					"_sortCounter": {
						"type": "integer"
					},
					"_ownHash": {
						"required": true,
						"type": "string"
					},
					"_signature": {
						"required": true,
						"type": "string",
						"hex": true
					},
					"encrSignature": {
						"type": "string",
						"hex": true
					},

					"sender": {
						"type": "integer",
						"min": 1
					},
					"topicid": {
						"type": "integer",
						"min": 1
					},
					"read": {
						"type": "boolean"
					}
				}
			},
			"content": {
				"type": "object",
				"properties": {
					"iv": {
						"required": true,
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string"
					},
					"text": {
						"type": "string"
					}
				}
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = messageJSON;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return messageJSON;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})();

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
	"use strict";

	/*
 	topic: {
 		createTime: (int)
 		key: key,
 		receiver: [{identifier, key}],
 		creator: (int),
 		newest (int),
 		unread: (bool)
 	}
 */

	var topicJSON = {
		"name": "Topic",
		"type": "object",
		"properties": {
			"createTime": {
				"required": true,
				"type": "number",
				"min": 1376244464102
			},
			"_key": {
				"required": true,
				"type": "string"
			},
			"receiver": {
				"required": true,
				"type": "array",
				"items": {
					"type": "int"
				}
			},
			"creator": {
				"type": "number",
				"min": 1
			},
			"unread": {
				"type": "array",
				"items": {
					"type": "int"
				}
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = topicJSON;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return topicJSON;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})();

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
	"use strict";

	/*
 	topic: {
 		createTime: (int)
 		key: key,
 		receiver: [{identifier, key}],
 		creator: (int),
 		newest (int),
 		unread: (bool)
 	}
 */

	var topicJSON = {
		"name": "Topic",
		"type": "object",
		"extends": "securedData",
		//		"additionalProperties": false,
		"properties": {
			"createTime": {
				"required": true,
				"type": "number",
				"min": 1376244464102
			},
			"_key": {
				"required": true,
				"type": "string"
			},
			"receiver": {
				"required": true,
				"type": "array",
				"items": {
					"type": "integer",
					"min": 1
				}
			},
			"creator": {
				"required": true,
				"type": "number",
				"min": 1
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = topicJSON;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return topicJSON;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})();

/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function () {
	"use strict";

	/*
 	circle: {
 		key,
 		content,
 		iv
 	}
 */

	var circleJSON = {
		"type": "object",
		"properties": {
			"meta": {
				"type": "object",
				"required": true,
				"properties": {
					"users": {
						"type": "array",
						"items": {
							"type": "integer"
						}
					},
					"circleKey": {
						"required": true,
						"type": "string"
					}
				}
			},
			"content": {
				"type": "object",
				"required": true,
				"extends": "encryptedData",
				"properties": {}
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = circleJSON;
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return circleJSON;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
})();

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Bluebird = __webpack_require__(3);
var keyStore = __webpack_require__(28);

var encryptedDataObject = function encryptedDataObject(data) {
	var encryptedData = data,
	    decryptedData;

	this.decrypt = function (cb) {
		if (decryptedData) {
			return Bluebird.resolve(decryptedData).nodeify(cb);
		}

		return keyStore.sym.decryptObject(encryptedData, 0).then(function (decryptedObj) {
			if (decryptedObj) {
				decryptedData = decryptedObj;

				return decryptedData;
			}

			throw new Error("could not decrypt");
		}).nodeify(cb);
	};
};

module.exports = encryptedDataObject;

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__keyStore_service__ = __webpack_require__(34);

var errors = __webpack_require__(42);

var circleService = __webpack_require__(199);
var localize = __webpack_require__(389);
var FilterService = (function () {
    function FilterService() {
        var _this = this;
        this.alwaysAvailableFilter = ["allfriends"];
        this.getFiltersByID = function (ids) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](ids).map(_this.getFilterByID.bind(_this));
        };
    }
    FilterService.prototype.alwaysFilterToKey = function (filter) {
        var userService = __webpack_require__(9).default;
        switch (filter) {
            case "allfriends":
                return userService.getOwn().getFriendsKey();
            case "everyone":
                //we do not encrypt it anyhow .... this needs to be checked in before!
                throw new Error("should never be here");
            default:
                throw new errors.InvalidFilter("unknown always value");
        }
    };
    FilterService.prototype.circleFilterToKey = function (filter) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return circleService.loadAll();
        }).then(function () {
            return circleService.get(filter).getKey();
        });
    };
    FilterService.prototype.userFilterToKey = function (user) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            var userService = __webpack_require__(9).default;
            return userService.get(user);
        }).then(function (user) {
            return user.getContactKey();
        });
    };
    FilterService.prototype.friendsFilterToKey = function (user) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            var userService = __webpack_require__(9).default;
            return userService.get(user);
        }).then(function (user) {
            return user.getFriendsKey();
        });
    };
    FilterService.prototype.filterToKeys = function (filters, cb) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            var userService = __webpack_require__(9).default;
            var filterPromises = filters.map(function (filter) {
                var map = filter.split(":");
                switch (map[0]) {
                    case "friends":
                        return _this.friendsFilterToKey(map[1]);
                    case "always":
                        return _this.alwaysFilterToKey(map[1]);
                    case "circle":
                        return _this.circleFilterToKey(map[1]);
                    case "user":
                        return _this.userFilterToKey(map[1]);
                    default:
                        throw new errors.InvalidFilter("unknown group");
                }
            });
            filterPromises.push(userService.getOwn().getMainKey());
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](filterPromises);
        }).nodeify(cb);
    };
    FilterService.prototype.getCircleByID = function (id) {
        return circleService.loadAll().then(function () {
            var circle = circleService.get(id).data;
            return {
                name: circle.name,
                id: "circle:" + circle.id,
                sref: "app.circles.show({circleid: " + circle.id + "})",
                count: circle.userids.length
            };
        });
    };
    FilterService.prototype.getFriendsFilterByID = function (id) {
        var userService = __webpack_require__(9).default;
        return userService.get(id).then(function (user) {
            return {
                name: localize.getLocalizedString("directives.friendsOf", { name: user.data.name }),
                id: "friends:" + user.data.id,
                sref: "app.user({identifier: " + user.data.id + "})"
            };
        });
    };
    FilterService.prototype.getAlwaysByID = function (id) {
        var userService = __webpack_require__(9).default;
        if (id !== "allfriends") {
            throw new Error("Invalid Always id");
        }
        var key = userService.getOwn().getFriendsKey();
        return {
            name: localize.getLocalizedString("directives.allfriends"),
            id: "always:" + id,
            sref: "app.friends",
            count: __WEBPACK_IMPORTED_MODULE_1__keyStore_service__["default"].upload.getKeyAccessCount(key) - 1
        };
    };
    FilterService.prototype.getFilterByID = function (id) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            var colon = id.indexOf(":");
            var domain = id.substr(0, colon + 1);
            var domainID = id.substr(colon + 1);
            if (domain === "always:") {
                return _this.getAlwaysByID(domainID);
            }
            else if (domain === "circle:") {
                return _this.getCircleByID(domainID);
            }
            else if (domain === "friends:") {
                return _this.getFriendsFilterByID(domainID);
            }
        });
    };
    FilterService.prototype.getAllFilters = function () {
        var _this = this;
        var alwaysAvailable = this.alwaysAvailableFilter.map(function (e) {
            return _this.getAlwaysByID(e);
        });
        return circleService.loadAll().then(function () {
            var circles = circleService.data.circles;
            var circle = circles.map(function (e) {
                return {
                    name: e.name,
                    id: "circle:" + e.id,
                    count: e.userids.length
                };
            });
            return alwaysAvailable.concat(circle);
        });
    };
    return FilterService;
}());
/* harmony default export */ __webpack_exports__["a"] = (new FilterService());
//# sourceMappingURL=filter.service.js.map

/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	getLocalizedString: function getLocalizedString() {
		return "Translation missing";
	}
};

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignedKeysLoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_cachedObjectLoader__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__ = __webpack_require__(26);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var keyStoreService = __webpack_require__(28);
var SignedKeysLoader = (function (_super) {
    __extends(SignedKeysLoader, _super);
    function SignedKeysLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SignedKeysLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_0__services_cachedObjectLoader__["a" /* default */])({
    cacheName: "signedKeys",
    getID: function (_a) {
        var _signature = _a.signedKeys._signature, signKey = _a.signKey;
        return signKey + "-" + _signature;
    },
    download: function () { throw new Error("profile get by id is not implemented"); },
    load: function (_a) {
        var signedKeys = _a.signedKeys, signKey = _a.signKey;
        var securedData = __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__["default"].load(undefined, signedKeys, { type: "signedKeys" });
        return securedData.verifyAsync(signKey).then(function () {
            return securedData.metaGet();
        });
    },
    restore: function (signedKeysCache) {
        var signedKeys = new __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__["SecuredData"](undefined, signedKeysCache, { type: "signedKeys" }, true);
        var friends = signedKeys.metaAttr("friends");
        var crypt = signedKeys.metaAttr("crypt");
        keyStoreService.security.addEncryptionIdentifier(friends);
        keyStoreService.security.addEncryptionIdentifier(crypt);
        return signedKeys;
    }
})));

//# sourceMappingURL=signedKeys.js.map

/***/ }),

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sessionService = __webpack_require__(19).default;
var socketService = __webpack_require__(10).default;

var interceptor = {

	transformResponse: function transformResponse(response, request) {
		if (request.sid && !response.logedin) {
			sessionService.logout();
		}
		return response;
	},

	transformRequest: function transformRequest(request) {
		request.sid = sessionService.getSID();
		return request;
	}
};

socketService.addInterceptor(interceptor);

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asset_securedDataWithMetaData__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__session_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__crypto_trustManager__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_mutableObjectLoader__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__users_userService__ = __webpack_require__(9);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var errors = __webpack_require__(42);

var initService = __webpack_require__(20);




var signatureCache = __webpack_require__(107);
var debug = __webpack_require__(15);
var STORESIGNATURECACHEINTERVAL = 30000;
var debugName = "whispeer:trustService";
var trustServiceDebug = debug(debugName);
function time(name) {
    if (debug.enabled(debugName)) {
        console.time(name);
    }
}
function timeEnd(name) {
    if (debug.enabled(debugName)) {
        console.timeEnd(name);
    }
}
var loadTrustInfo = function (data) {
    return __WEBPACK_IMPORTED_MODULE_7__users_userService__["default"].getOwnAsync().then(function (ownUser) {
        var ownKey = ownUser.getSignKey();
        if (!data) {
            var userid = ownUser.getID();
            var nickname = ownUser.getNickname();
            return {
                nicknames: (_a = {},
                    _a[nickname] = ownKey,
                    _a),
                ids: (_b = {},
                    _b[userid] = ownKey,
                    _b),
                me: ownKey,
                keys: (_c = {},
                    _c[ownKey] = Object(__WEBPACK_IMPORTED_MODULE_4__crypto_trustManager__["userToDataSet"])({ key: ownKey, userid: userid, nickname: nickname }, __WEBPACK_IMPORTED_MODULE_4__crypto_trustManager__["trustStates"].OWN),
                    _c),
                signature: ""
            };
        }
        if (data.me !== ownKey) {
            throw new errors.SecurityError("not my trust database");
        }
        var givenDatabase = __WEBPACK_IMPORTED_MODULE_2__asset_securedDataWithMetaData__["default"].load(undefined, data, __WEBPACK_IMPORTED_MODULE_4__crypto_trustManager__["TRUST_SECURED_OPTIONS"]);
        return givenDatabase.verifyAsync(ownKey, "user")
            .then(function () { return Object(__WEBPACK_IMPORTED_MODULE_4__crypto_trustManager__["transformLegacy"])(givenDatabase.metaGet()); });
        var _a, _b, _c;
    });
};
var signatureCacheObject = new __WEBPACK_IMPORTED_MODULE_1__Cache__["default"]("signatureCache");
var TrustService = (function () {
    function TrustService() {
        this.storeSignatureCache = function () {
            if (signatureCache.isChanged()) {
                trustServiceDebug("Storing signature cache!");
                time("storedSignatureCache");
                signatureCache.resetChanged();
                signatureCache.getUpdatedVersion().then(function (updatedVersion) {
                    return signatureCacheObject.store(__WEBPACK_IMPORTED_MODULE_3__session_service__["default"].getUserID().toString(), updatedVersion);
                }).then(function () {
                    timeEnd("storedSignatureCache");
                });
            }
        };
        window.setInterval(this.storeSignatureCache, STORESIGNATURECACHEINTERVAL);
        this.waitForLogin();
    }
    TrustService.prototype.waitForLogin = function () {
        __WEBPACK_IMPORTED_MODULE_3__session_service__["default"].awaitLogin().then(function () {
            time("getSignatureCache");
            return signatureCacheObject.get(__WEBPACK_IMPORTED_MODULE_3__session_service__["default"].getUserID().toString()).catch(function () {
                return;
            });
        }).then(function (signatureCacheData) {
            timeEnd("getSignatureCache");
            if (signatureCacheData) {
                signatureCache.load(signatureCacheData.data);
            }
            else {
                signatureCache.initialize();
            }
        });
    };
    return TrustService;
}());
var TrustStoreLoader = (function (_super) {
    __extends(TrustStoreLoader, _super);
    function TrustStoreLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TrustStoreLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_5__services_mutableObjectLoader__["c" /* default */])({
    download: function (id, previousInstance) {
        return __WEBPACK_IMPORTED_MODULE_6__services_socket_service__["default"].awaitConnection()
            .then(function () { return __WEBPACK_IMPORTED_MODULE_6__services_socket_service__["default"].definitlyEmit("trustManager.get", {
            responseKey: "content",
            cacheSignature: previousInstance && previousInstance.getSignature()
        }); })
            .then(function (response) { return response.content; });
    },
    load: function (response, previousInstance) {
        if (previousInstance && response.unChanged) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](__WEBPACK_IMPORTED_MODULE_5__services_mutableObjectLoader__["a" /* SYMBOL_UNCHANGED */]);
        }
        return loadTrustInfo(response.content);
    },
    restore: function (content, previousInstance) {
        if (previousInstance) {
            previousInstance.update(content);
            return previousInstance;
        }
        return new __WEBPACK_IMPORTED_MODULE_4__crypto_trustManager__["TrustStore"](content);
    },
    shouldUpdate: function (event, instance) { return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](true); },
    getID: function (settingsData) { return __WEBPACK_IMPORTED_MODULE_3__session_service__["default"].getUserID(); },
    cacheName: "trustStore"
})));
initService.registerCallback(function () {
    return TrustStoreLoader.get(__WEBPACK_IMPORTED_MODULE_3__session_service__["default"].getUserID())
        .then(function (trustStore) { return __WEBPACK_IMPORTED_MODULE_4__crypto_trustManager__["default"].setTrustStore(trustStore); });
});
new TrustService();
//# sourceMappingURL=trust.service.js.map

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./de": 108,
	"./de-at": 202,
	"./de-at.js": 202,
	"./de-ch": 203,
	"./de-ch.js": 203,
	"./de.js": 108,
	"./en-au": 204,
	"./en-au.js": 204,
	"./en-ca": 205,
	"./en-ca.js": 205,
	"./en-gb": 206,
	"./en-gb.js": 206,
	"./en-ie": 207,
	"./en-ie.js": 207,
	"./en-nz": 208,
	"./en-nz.js": 208
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 394;

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function extendError(ParentErrorClass, name) {
	if (ParentErrorClass.prototype instanceof Error || ParentErrorClass === Error) {
		var F = function F() {};
		var CustomError = function CustomError(message, data) {
			var _this = this;

			var tmp = new ParentErrorClass(message);
			tmp.name = this.name = name || "Error";

			_this.data = data;
			_this.stack = tmp.stack;
			_this.message = tmp.message;
			_this.name = name;

			return _this;
		};
		var SubClass = function SubClass() {};
		SubClass.prototype = ParentErrorClass.prototype;
		F.prototype = CustomError.prototype = new SubClass();
		CustomError.prototype.constructor = CustomError;

		return CustomError;
	} else {
		throw new Error("our error should inherit from error!");
	}
}

var InvalidDataError = extendError(Error, "InvalidDataError");
var InvalidHexError = extendError(InvalidDataError, "InvalidHexError");
var InvalidFilter = extendError(InvalidDataError, "InvalidFilter");

var SecurityError = extendError(Error, "SecurityError");
var AccessViolation = extendError(SecurityError, "AccessViolation");
var DecryptionError = extendError(SecurityError, "DecryptionError");
var ValidationError = extendError(SecurityError, "ValidationError");

var LoginError = extendError(Error, "LoginError");

module.exports = {
	SecurityError: SecurityError,
	AccessViolation: AccessViolation,
	DecryptionError: DecryptionError,
	ValidationError: ValidationError,

	InvalidDataError: InvalidDataError,
	InvalidHexError: InvalidHexError,
	InvalidFilter: InvalidFilter,

	LoginError: LoginError
};

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asset_securedDataWithMetaData__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var TopicUpdate = (function () {
    function TopicUpdate(_a) {
        var content = _a.content, server = _a.server, meta = _a.meta, sender = _a.sender;
        var _this = this;
        this.setState = function (newState) {
            _this.state = __assign({}, _this.state, newState);
        };
        this.getID = function () {
            return _this._id;
        };
        this.getTime = function () {
            return __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].parseDecimal(_this.securedData.metaAttr("time"));
        };
        this.isAfter = function (topicUpdate) {
            if (!topicUpdate) {
                return true;
            }
            return topicUpdate.getTime() < _this.getTime();
        };
        this.ensureParent = function (topic) {
            _this.securedData.checkParent(topic.getSecuredData());
        };
        this.ensureIsAfterTopicUpdate = function (topicUpdate) {
            _this.securedData.checkAfter(topicUpdate.getSecuredData());
        };
        this.getUserID = function () {
            return _this.userID;
        };
        this.getSecuredData = function () {
            return _this.securedData;
        };
        this.getMetaUpdate = function () {
            return _this.securedData.metaAttr("metaUpdate");
        };
        var content = content, meta = meta;
        this._id = server.id;
        this.securedData = new __WEBPACK_IMPORTED_MODULE_0__asset_securedDataWithMetaData__["SecuredData"](content, meta, { type: "topicUpdate" }, true);
        this.userID = meta.userID;
        this.state = {
            loading: false,
            timestamp: __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].parseDecimal(meta.time),
            title: content.title,
            sender: sender
        };
    }
    return TopicUpdate;
}());
/* harmony default export */ __webpack_exports__["a"] = (TopicUpdate);
//# sourceMappingURL=chatTitleUpdate.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ChatList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mutableObjectLoader__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_session_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat__ = __webpack_require__(88);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var ChatList = (function () {
    function ChatList(chatIDs) {
        this.chatIDs = chatIDs;
    }
    ChatList.prototype.get = function () {
        return this.chatIDs;
    };
    ChatList.prototype.set = function (chatIDs) {
        this.chatIDs = chatIDs;
    };
    return ChatList;
}());

var ChatListLoader = (function (_super) {
    __extends(ChatListLoader, _super);
    function ChatListLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChatListLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_1__services_mutableObjectLoader__["c" /* default */])({
    download: function () { return __WEBPACK_IMPORTED_MODULE_2__services_socket_service__["default"].definitlyEmit("chat.getAllIDs", {}).then(function (response) { return response.chatIDs; }); },
    load: function (chatResponse) { return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](chatResponse); },
    getID: function () { return __WEBPACK_IMPORTED_MODULE_3__services_session_service__["default"].getUserID(); },
    restore: function (chatIDs, previousInstance) {
        var firstLoadedIndex = chatIDs.findIndex(function (id) { return __WEBPACK_IMPORTED_MODULE_4__chat__["b" /* default */].isLoaded(id); });
        var chatsToLoad = firstLoadedIndex === -1 ? [] : chatIDs.slice(0, firstLoadedIndex);
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](chatsToLoad.map(function (id) { return __WEBPACK_IMPORTED_MODULE_4__chat__["b" /* default */].get(id); })).then(function () {
            if (previousInstance) {
                previousInstance.set(chatIDs);
                return previousInstance;
            }
            return new ChatList(chatIDs);
        });
    },
    shouldUpdate: function () { return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](true); },
    cacheName: "chatList"
})));
/* harmony default export */ __webpack_exports__["a"] = (ChatListLoader);
//# sourceMappingURL=chatList.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asset_observer__ = __webpack_require__(16);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ScreenSizeService = (function (_super) {
    __extends(ScreenSizeService, _super);
    function ScreenSizeService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ScreenSizeService;
}(__WEBPACK_IMPORTED_MODULE_0__asset_observer__["default"]));
/* harmony default export */ __webpack_exports__["a"] = (new ScreenSizeService());
//# sourceMappingURL=screenSize.service.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_globalization__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_services_push_service__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_services_location_manager__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__tutorial__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__lib_services_session_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













// When we think it's safe to hide the splash screen, there might actually be
// some more drawing going on. This delay is to offset for that rendering.
var SPLASH_SCREEN_HIDE_DELAY = 200;
var TUTORIAL_SLIDES = 7;
var setHeight = function (height) {
    var ele = document.getElementsByTagName("ion-nav")[0];
    if (ele instanceof HTMLElement) {
        ele.style.height = height ? "calc(100% - " + height + "px)" : "";
    }
    return true;
};
var MyApp = (function () {
    function MyApp(platform, splashScreen, statusBar, globalization, push, keyboard) {
        var _this = this;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.globalization = globalization;
        this.push = push;
        this.keyboard = keyboard;
        this.rootPage = "Home";
        this.showTutorial = function () {
            var activeView = _this.nav.getActive();
            if (!activeView || !activeView.instance) {
                return false;
            }
            return !activeView.instance.tutorialDisabled && __WEBPACK_IMPORTED_MODULE_11__tutorial__["a" /* default */].tutorialVisible;
        };
        this.slideNumber = 1;
        this.lang = 'de';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleLightContent();
            var pushService = new __WEBPACK_IMPORTED_MODULE_8__lib_services_push_service__["a" /* PushService */](_this.nav, platform, _this.push);
            if (platform.is("ios")) {
                _this.keyboard.disableScroll(true);
                window.addEventListener('native.keyboardshow', function (e) { return setHeight(e.keyboardHeight); });
                window.addEventListener('native.keyboardhide', function () { return setHeight(0); });
            }
            __WEBPACK_IMPORTED_MODULE_9__lib_services_socket_service__["default"].addInterceptor({
                transformResponse: function (response) {
                    if (Object(__WEBPACK_IMPORTED_MODULE_10__lib_services_location_manager__["c" /* isBusinessVersion */])() && response.logedin && !response.error) {
                        var activeNav = _this.nav.getActive();
                        var onSalesPage = activeNav && activeNav.component.name === "SalesPage";
                        if (onSalesPage && response.isBusiness) {
                            _this.nav.remove(0, _this.nav.length() - 1);
                            _this.nav.setRoot("Home");
                        }
                        if (!onSalesPage && !response.isBusiness) {
                            _this.nav.remove(0, _this.nav.length() - 1);
                            _this.nav.setRoot("Sales");
                        }
                    }
                    return response;
                }
            });
            if (__WEBPACK_IMPORTED_MODULE_12__lib_services_session_service__["default"].isLoggedin()) {
                pushService.register();
            }
            __WEBPACK_IMPORTED_MODULE_12__lib_services_session_service__["default"].listen(function () { return pushService.register(); }, "login");
            __WEBPACK_IMPORTED_MODULE_12__lib_services_session_service__["default"].listen(function () { return pushService.unregister(); }, "logout");
            __WEBPACK_IMPORTED_MODULE_12__lib_services_session_service__["default"].bootLogin().then(function (loggedin) {
                __WEBPACK_IMPORTED_MODULE_2_bluebird__["delay"](SPLASH_SCREEN_HIDE_DELAY).then(function () { return _this.splashScreen.hide(); });
                if (!loggedin && _this.nav.length() > 0) {
                    _this.nav.remove(0, _this.nav.length() - 1);
                    _this.nav.setRoot("Login");
                }
                _this.initializeTutorialWithLanguage();
            });
        });
    }
    MyApp.prototype.advance = function () {
        this.slideNumber++;
        if (this.slideNumber === TUTORIAL_SLIDES + 1) {
            this.slideNumber = 1;
            __WEBPACK_IMPORTED_MODULE_11__tutorial__["a" /* default */].skip();
        }
    };
    MyApp.prototype.currentSlide = function () {
        return "assets/img/" + this.lang + "/tutorial_" + this.slideNumber + ".png";
    };
    MyApp.prototype.tutorialClicked = function (event) {
        var offsetX = event.offsetX, offsetY = event.offsetY, target = event.target;
        var offsetHeight = target.offsetHeight, offsetWidth = target.offsetWidth, nodeName = target.nodeName;
        if (nodeName !== 'IMG') {
            return this.advance();
        }
        var px = offsetX / offsetWidth;
        var py = offsetY / offsetHeight;
        var firstSlide = this.slideNumber === 1;
        var shouldSkip = (0.73 < px) && (px < 0.98) && (0.03 < py) && (py < 0.10);
        if (shouldSkip && firstSlide) {
            __WEBPACK_IMPORTED_MODULE_11__tutorial__["a" /* default */].skip();
        }
        else {
            this.advance();
        }
    };
    MyApp.prototype.initializeTutorialWithLanguage = function () {
        var _this = this;
        this.globalization.getPreferredLanguage().then(function (_a) {
            var value = _a.value;
            var en = (value.toLowerCase().indexOf('de') === -1);
            _this.lang = en ? 'en' : 'de';
        }).catch(function () {
            console.warn('Cannot get language from device, remaining with default language');
        }).then(function () {
            __WEBPACK_IMPORTED_MODULE_11__tutorial__["a" /* default */].checkVisibility();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("navigation"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/app/app.html"*/`<ion-nav #navigation [root]="rootPage"></ion-nav>\n\n<div *ngIf="showTutorial()" class="tutorial" (click)="tutorialClicked($event)">\n	<img [src]="currentSlide()" alt="">\n</div>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_globalization__["a" /* Globalization */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_keyboard__["a" /* Keyboard */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_messages_messages__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angularUtils__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__storage_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__error_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__messages_messageService__ = __webpack_require__(157);






var initService = __webpack_require__(20);

var sessionStorage = Object(__WEBPACK_IMPORTED_MODULE_4__storage_service__["withPrefix"])("whispeer.session");
var sjcl = __webpack_require__(45);
var PushService = (function () {
    function PushService(navCtrl, platform, push) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.push = push;
        this.getOrCreatePushkey = function () {
            var storagePushKey = sessionStorage.get("pushKey");
            if (storagePushKey) {
                return sjcl.codec.hex.toBits(storagePushKey);
            }
            var pushKey = sjcl.random.randomWords(8);
            sessionStorage.set("pushKey", sjcl.codec.hex.fromBits(pushKey));
            return pushKey;
        };
        this.getType = function () {
            var platform = window.device.platform;
            if (platform === "Android") {
                return "android";
            }
            else if (platform === "iOS") {
                return "ios";
            }
        };
        this.pushConfig = {
            "android": {
                "senderID": "809266780938",
                "icon": "ic_stat_icon",
                "iconColor": "#5ab70d"
            },
            "ios": {
                "alert": true,
                "badge": true,
                "sound": true
            }
        };
        this.registration = function (data) {
            console.log("-> registration", data);
            var type = _this.getType();
            __WEBPACK_IMPORTED_MODULE_2_bluebird__["all"]([
                sessionStorage.awaitLoading(),
                initService.awaitLoading(),
                __WEBPACK_IMPORTED_MODULE_3__socket_service__["default"].awaitConnection()
            ]).then(function () {
                var pushKey = _this.getOrCreatePushkey();
                if (!type) {
                    return;
                }
                return __WEBPACK_IMPORTED_MODULE_3__socket_service__["default"].definitlyEmit("pushNotification.subscribe", {
                    token: data.registrationId,
                    key: sjcl.codec.hex.fromBits(pushKey),
                    type: type
                });
            }).catch(__WEBPACK_IMPORTED_MODULE_5__error_service__["default"].criticalError);
        };
        this.getActiveNav = function () { return _this.navCtrl.getActive().instance; };
        this.isOnMessagesPage = function () {
            return _this.getActiveNav() instanceof __WEBPACK_IMPORTED_MODULE_0__pages_messages_messages__["a" /* MessagesPage */];
        };
        this.isActiveChat = function (chatID) {
            var navChatID = _this.getActiveNav().navParams.data.chatID;
            return parseInt(navChatID, 10) === parseInt(chatID, 10);
        };
        this.goToChat = function (chatID) {
            if (_this.isOnMessagesPage()) {
                if (_this.isActiveChat(chatID)) {
                    return;
                }
                return Object(__WEBPACK_IMPORTED_MODULE_1__angularUtils__["a" /* replaceView */])(_this.navCtrl, "Messages", { chatID: chatID });
            }
            return _this.navCtrl.push("Messages", { chatID: chatID });
        };
        this.goToUser = function (userId) {
            return _this.navCtrl.push("Profile", { userId: userId });
        };
        this.goToReference = function (reference) {
            if (reference.type === "message") {
                _this.goToChat(reference.chatID);
            }
            if (reference.type === "contactRequest") {
                _this.goToUser(reference.id);
            }
        };
        this.notification = function (data) {
            console.info("Got Push notification with data", data);
            if (data && data.additionalData) {
                var additionalData_1 = data.additionalData;
                __WEBPACK_IMPORTED_MODULE_2_bluebird__["all"]([
                    sessionStorage.awaitLoading(),
                    initService.awaitLoading()
                ]).then(function () {
                    if (!additionalData_1.foreground && additionalData_1.reference) {
                        _this.goToReference(additionalData_1.reference);
                    }
                    var pushKey = sessionStorage.get("pushKey");
                    if (additionalData_1.encryptedContent && pushKey) {
                        if (typeof additionalData_1.encryptedContent === "object") {
                            additionalData_1.encryptedContent = JSON.stringify(additionalData_1.encryptedContent);
                        }
                        pushKey = sjcl.codec.hex.toBits(pushKey);
                        additionalData_1.content = JSON.parse(sjcl.json.decrypt(pushKey, additionalData_1.encryptedContent));
                    }
                    if (additionalData_1.content) {
                        var message = additionalData_1.content.message;
                        if (message) {
                            delete message.meta.sender;
                            delete message.meta.sendTime;
                            delete message.meta.topicid;
                            delete message.meta.messageid;
                        }
                        return __WEBPACK_IMPORTED_MODULE_6__messages_messageService__["a" /* default */].addSocketData(additionalData_1.content);
                    }
                }).then(function () {
                    return _this.pushInstance.finish();
                }).then(function () { return console.info("push done at " + new Date()); }, function () { return console.warn("Finishing push failed!"); });
            }
        };
        this.unregister = function () {
            if (_this.pushInstance) {
                _this.pushInstance.unregister();
                _this.pushInstance = null;
            }
        };
        this.register = function () {
            try {
                console.info("Registering for Push");
                _this.pushInstance = _this.push.init(_this.pushConfig);
                _this.pushInstance.on("registration").subscribe(_this.registration);
                _this.pushInstance.on("notification").subscribe(_this.notification);
                _this.platform.resume.subscribe(function () {
                    console.warn("Resume app");
                    _this.pushInstance.clearAllNotifications();
                });
            }
            catch (e) {
                console.warn("Push is not available!");
            }
        };
    }
    return PushService;
}());

//# sourceMappingURL=push.service.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asset_observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_session_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_mutableObjectLoader__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__asset_securedDataWithMetaData__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helper_helper__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var keyStore = __webpack_require__(28);

var initService = __webpack_require__(20);




var EncryptedData = __webpack_require__(387);
var RELOAD_DELAY = 10000;
var notVisible = {
    encrypt: true,
    visibility: []
};
var privacyAttributes = ["birthday", "location", "relationship", "education", "work", "gender", "languages"];
var publicBranches = ["uiLanguage", "sound", "donate", "safety"];
var serverBranches = ["mailsEnabled"];
var defaultSettings = {
    privacy: {
        basic: {
            firstname: {
                encrypt: false,
                visibility: ["always:allfriends"]
            },
            lastname: {
                encrypt: false,
                visibility: ["always:allfriends"]
            }
        },
        imageBlob: {
            encrypt: false,
            visibility: []
        },
        location: notVisible,
        birthday: notVisible,
        relationship: notVisible,
        education: notVisible,
        work: notVisible,
        gender: notVisible,
        languages: notVisible
    },
    donate: {
        refused: false,
        later: 0
    },
    sharePosts: ["always:allfriends"],
    filterSelection: [],
    sound: {
        enabled: true
    },
    messages: {
        sendShortCut: "enter"
    },
    safety: {
        blockedUsers: []
    },
    uiLanguage: "en"
};
var isBranchPublic = function (branchName) {
    return publicBranches.indexOf(branchName) > -1;
};
var isBranchServer = function (branchName) {
    return serverBranches.indexOf(branchName) > -1;
};
var securedDataOptions = { type: "settings", removeEmpty: true };
var turnOldSettingsToNew = function (settings) {
    var result = {
        meta: { initialLanguage: undefined },
        content: {}
    };
    __WEBPACK_IMPORTED_MODULE_6__helper_helper__["default"].objectEach(settings, function (key, val) {
        if (isBranchPublic(key)) {
            result.meta[key] = val;
        }
        else {
            result.content[key] = val;
        }
    });
    return result;
};
var migrate = function (givenSettings) {
    console.warn("migrating settings to format 2");
    if (!givenSettings.ct) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](new __WEBPACK_IMPORTED_MODULE_5__asset_securedDataWithMetaData__["SecuredData"](givenSettings.content, givenSettings.meta, securedDataOptions, false));
    }
    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
        keyStore.security.allowPrivateActions();
        var oldSettings = new EncryptedData(givenSettings);
        return oldSettings.decrypt();
    }).then(function (decryptedSettings) {
        var _a = turnOldSettingsToNew(decryptedSettings), meta = _a.meta, content = _a.content;
        meta.initialLanguage = __WEBPACK_IMPORTED_MODULE_6__helper_helper__["default"].getLanguageFromPath();
        var ownUser = __webpack_require__(9).default.getOwn();
        var transformedSettings = new Settings(content, meta);
        return transformedSettings.getUpdatedData(ownUser.getSignKey(), ownUser.getMainKey());
    }).then(function (signedAndEncryptedSettings) {
        var settings = new __WEBPACK_IMPORTED_MODULE_5__asset_securedDataWithMetaData__["SecuredData"](signedAndEncryptedSettings.content, signedAndEncryptedSettings.meta, securedDataOptions, false);
        return __WEBPACK_IMPORTED_MODULE_1__socket_service__["default"].emit("settings.setSettings", {
            settings: signedAndEncryptedSettings,
        }).thenReturn(settings);
    });
};
var Settings = (function () {
    function Settings(content, meta, server) {
        if (server === void 0) { server = {}; }
        var _this = this;
        this.content = content;
        this.meta = meta;
        this.server = server;
        this.changed = false;
        this.getContent = function () { return _this.content; };
        this.getMeta = function () { return _this.meta; };
        this.getServer = function () { return _this.server; };
        this.getBranch = function (branchName) {
            if (isBranchServer(branchName)) {
                return _this.server[branchName];
            }
            if (isBranchPublic(branchName)) {
                return _this.meta[branchName];
            }
            return _this.content[branchName];
        };
        this.isChanged = function () { return _this.changed; };
        this.setBranch = function (branchName, value) {
            if (isBranchServer(branchName)) {
                _this.server[branchName] = value;
            }
            else if (isBranchPublic(branchName)) {
                _this.meta[branchName] = value;
            }
            else {
                _this.content[branchName] = value;
            }
            _this.changed = true;
        };
        this.update = function (content, meta, server) {
            _this.content = content;
            _this.meta = meta;
            _this.server = server;
            _this.changed = false;
        };
        this.getUpdatedData = function (signKey, encryptKey) {
            return __WEBPACK_IMPORTED_MODULE_5__asset_securedDataWithMetaData__["default"].createAsync(_this.content, _this.meta, securedDataOptions, signKey, encryptKey)
                .then(function (encryptedSettings) {
                return __assign({}, encryptedSettings, { server: _this.server });
            });
        };
    }
    return Settings;
}());
var loadSettings = function (givenSettings) {
    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
        return __awaiter(this, void 0, void 0, function () {
            var secured, ownUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, migrate(givenSettings)];
                    case 1:
                        secured = _a.sent();
                        return [4 /*yield*/, __webpack_require__(9).default.getOwnAsync()];
                    case 2:
                        ownUser = _a.sent();
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
                                secured.decrypt(),
                                secured.verifyAsync(ownUser.getSignKey(), "settings")
                            ])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                content: secured.contentGet(),
                                meta: secured.metaGet(),
                                server: givenSettings.server
                            }];
                }
            });
        });
    });
};
var settings;
var SettingsService = (function (_super) {
    __extends(SettingsService, _super);
    function SettingsService() {
        var _this = _super.call(this) || this;
        _this.setDefaultLanguage = function (language) { return defaultSettings.uiLanguage = language; };
        _this.getContent = function () { return settings.getContent(); };
        _this.getBranchContent = function (branchName) { return settings.getBranch(branchName); };
        _this.getBranch = function (branchName) {
            if (!settings) {
                return defaultSettings[branchName];
            }
            var branchContent = _this.getBranchContent(branchName);
            if (typeof branchContent === "undefined") {
                return defaultSettings[branchName];
            }
            return branchContent;
        };
        _this.updateBranch = function (branchName, value) {
            settings.setBranch(branchName, value);
            _this.notify("", "updated");
        };
        _this.setPrivacy = function (privacy) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
                _this.updateBranch("privacy", privacy);
                return _this.uploadChangedData();
            }).then(function () {
                var userService = __webpack_require__(9).default;
                return userService.getOwn().uploadChangedProfile();
            });
        };
        _this.removeCircle = function (id) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
                var privacy = _this.getBranch("privacy");
                privacyAttributes.forEach(function (safetyName) {
                    __WEBPACK_IMPORTED_MODULE_6__helper_helper__["default"].removeArray(privacy[safetyName].visibility, "circle:" + id);
                });
                __WEBPACK_IMPORTED_MODULE_6__helper_helper__["default"].removeArray(privacy.basic.firstname.visibility, "circle:" + id);
                __WEBPACK_IMPORTED_MODULE_6__helper_helper__["default"].removeArray(privacy.basic.lastname.visibility, "circle:" + id);
                return _this.setPrivacy(privacy);
            });
        };
        _this.uploadChangedData = function () {
            if (!settings.isChanged()) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](true);
            }
            var userService = __webpack_require__(9).default;
            var ownUser = userService.getOwn();
            return settings.getUpdatedData(ownUser.getSignKey(), ownUser.getMainKey())
                .then(function (settings) { return __WEBPACK_IMPORTED_MODULE_1__socket_service__["default"].emit("settings.setSettings", { settings: settings }); })
                .then(function (result) { return result.success; });
        };
        _this.getBlockedUsers = function () { return _this.getBranch("safety").blockedUsers; };
        _this.setBlockedUsers = function (blockedUsers) {
            var safety = _this.getBranch("safety");
            _this.updateBranch("safety", __assign({}, safety, { blockedUsers: blockedUsers }));
            return _this.uploadChangedData();
        };
        _this.isBlockedSince = function (userID, time) {
            return !!_this.getBlockedUsers().find(function (_a) {
                var id = _a.id, since = _a.since;
                return userID === id && since < time;
            });
        };
        _this.isBlocked = function (userID) {
            return !!_this.getBlockedUsers().find(function (_a) {
                var id = _a.id;
                return userID === id;
            });
        };
        _this.getPrivacyAttribute = function (attr) {
            var b = _this.getBranch("privacy"), i, attrs = attr.split("."), cur = b;
            for (i = 0; i < attrs.length; i += 1) {
                if (cur[attrs[i]]) {
                    if (typeof cur[attrs[i]].encrypt !== "undefined") {
                        return cur[attrs[i]];
                    }
                    cur = cur[attrs[i]];
                }
            }
            throw new Error("could not find attribute settings");
        };
        _this.getPrivacyEncryptionStatus = function (attr) {
            return _this.getPrivacyAttribute(attr).encrypt;
        };
        _this.getPrivacyVisibility = function (attr) {
            var privacyAttribute = _this.getPrivacyAttribute(attr);
            if (privacyAttribute.encrypt) {
                return privacyAttribute.visibility;
            }
            else {
                return false;
            }
        };
        return _this;
    }
    return SettingsService;
}(__WEBPACK_IMPORTED_MODULE_2__asset_observer__["default"]));
;
/* harmony default export */ __webpack_exports__["default"] = (new SettingsService());
var SettingsLoader = (function (_super) {
    __extends(SettingsLoader, _super);
    function SettingsLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SettingsLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_4__services_mutableObjectLoader__["c" /* default */])({
    download: function (id, previousInstance) {
        return __WEBPACK_IMPORTED_MODULE_1__socket_service__["default"].awaitConnection()
            .then(function () { return __WEBPACK_IMPORTED_MODULE_1__socket_service__["default"].definitlyEmit("settings.get", {
            responseKey: "content",
            cacheSignature: previousInstance && previousInstance.getMeta()._signature
        }); })
            .then(function (response) { return response.content; });
    },
    load: function (response, previousInstance) {
        if (previousInstance && response.unChanged) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]({
                content: previousInstance.getContent(),
                meta: previousInstance.getMeta(),
                server: response.content.server
            });
        }
        return loadSettings(response.content);
    },
    restore: function (_a, previousInstance) {
        var content = _a.content, meta = _a.meta, server = _a.server;
        if (previousInstance) {
            previousInstance.update(content, meta, server);
            return previousInstance;
        }
        return new Settings(content, meta, server);
    },
    shouldUpdate: function (event, instance) {
        if (event === __WEBPACK_IMPORTED_MODULE_4__services_mutableObjectLoader__["b" /* UpdateEvent */].wake) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["delay"](RELOAD_DELAY).thenReturn(true);
        }
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](false);
    },
    getID: function (settingsData) { return __WEBPACK_IMPORTED_MODULE_3__services_session_service__["default"].getUserID(); },
    cacheName: "settings"
})));
initService.registerCallback(function () {
    return SettingsLoader.get(__WEBPACK_IMPORTED_MODULE_3__services_session_service__["default"].getUserID())
        .then(function (loadedSettings) { return settings = loadedSettings; });
});
//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return landingPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isIOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isLoginPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isBusinessVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return goToPrivateHome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return loginPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return goToBusinessVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return reloadApp; });
/* unused harmony export isBlockedReturnUrl */
/* unused harmony export setReturnUrl */
/* unused harmony export getUrlParameter */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__storage_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);


var loginStorage = __WEBPACK_IMPORTED_MODULE_0__storage_service__["withPrefix"]("whispeer.login");
var blockedReturnUrls = ["/b2c", "/recovery"];
var basePath = window.top.location.href.match(/([^?#]*)/)[0];
var basePathname = basePath.match(/(.*)\/.*/)[1];
var setTopLocation = function (url) {
    console.warn("set top location", url, basePath + url);
    window.top.location.href = basePath + url;
};
var setTopPath = function (url) {
    console.warn("set top path", url, basePathname + url);
    window.top.location.href = basePathname + url;
};
var landingPage = function () {
    setTopLocation("#/nav/n4/login");
    window.top.location.reload();
};
var isIOS = function () { return window.device && window.device.platform === "iOS"; };
var isLoginPage = function () {
    return window.top.location.pathname.indexOf("/login") !== -1;
};
var isBusinessVersion = function () {
    return window.top.location.pathname.indexOf("business.html") !== -1;
};
var goToPrivateHome = function () {
    setTopPath("/index.html");
};
var loginPage = function () {
    setTopLocation("#/nav/n4/login");
};
var goToBusinessVersion = function () {
    setTopPath("/business.html");
};
var reloadApp = function () {
    if (isBusinessVersion()) {
        goToBusinessVersion();
    }
    else {
        goToPrivateHome();
    }
};
var isBlockedReturnUrl = function (url) {
    return blockedReturnUrls.filter(function (blockedUrl) {
        return url.indexOf(blockedUrl) !== -1;
    }).length > 0;
};
var setReturnUrl = function (url) {
    if (isBlockedReturnUrl(url)) {
        return;
    }
    loginStorage.set("returnUrl", url);
};
var getUrlParameter = function (param) {
    var search = window.top.location.search;
    var pairs = search.substr(1).split("&");
    var result = __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].array.find(pairs.map(function (pair) {
        if (pair.indexOf("=") !== -1) {
            return {
                key: pair.substr(0, pair.indexOf("=")),
                value: pair.substr(pair.indexOf("=") + 1)
            };
        }
        else {
            return {
                key: pair,
                value: ""
            };
        }
    }), function (pair) {
        return pair.key === param;
    });
    if (result) {
        return result.value;
    }
};
//# sourceMappingURL=location.manager.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return unpath; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asset_Progress__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asset_blobCache__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__blobDownloader_service__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__asset_Queue__ = __webpack_require__(75);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;

var debug = __webpack_require__(15);






var initService = __webpack_require__(20);
var keyStore = __webpack_require__(28);
var knownBlobURLs = {};
var downloadBlobQueue = new __WEBPACK_IMPORTED_MODULE_6__asset_Queue__["a" /* default */](5);
downloadBlobQueue.start();
var debugName = "whispeer:blobService";
var blobServiceDebug = debug(debugName);
var time = function (name) {
    if (debug.enabled(debugName)) {
        // eslint-disable-next-line no-console
        console.time(name);
    }
};
var timeEnd = function (name) {
    if (debug.enabled(debugName)) {
        // eslint-disable-next-line no-console
        console.timeEnd(name);
    }
};
var unpath = function (path) {
    var index = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")) + 1;
    return {
        directory: path.substr(0, index),
        name: path.substr(index)
    };
};
var MyBlob = (function () {
    function MyBlob(blobData, blobID, options) {
        this.blobData = blobData;
        options = options || {};
        if (blobID) {
            this.blobID = blobID;
            this.uploaded = true;
        }
        else {
            this.uploaded = false;
        }
        this.meta = options.meta || {};
        this.key = this.meta._key || this.meta.key;
        this.decrypted = options.decrypted || !this.key;
        this.uploadProgress = new __WEBPACK_IMPORTED_MODULE_2__asset_Progress__["a" /* default */]({ total: this.getSize() });
        this.encryptProgress = new __WEBPACK_IMPORTED_MODULE_2__asset_Progress__["a" /* default */]({ total: this.getSize() });
        this.decryptProgress = new __WEBPACK_IMPORTED_MODULE_2__asset_Progress__["a" /* default */]({ total: this.getSize() });
    }
    MyBlob.prototype.isDecrypted = function () {
        return this.decrypted;
    };
    MyBlob.prototype.isUploaded = function () {
        return this.uploaded;
    };
    MyBlob.prototype.getSize = function () {
        return this.blobData.size;
    };
    MyBlob.prototype.getMeta = function () {
        return this.meta;
    };
    MyBlob.prototype.getArrayBuffer = function () {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_3__asset_blobCache__["b" /* fixFileReader */])();
        if (this.blobData.originalUrl) {
            var _a = unpath(this.blobData.originalUrl), directory = _a.directory, name_1 = _a.name;
            return __WEBPACK_IMPORTED_MODULE_3__asset_blobCache__["a" /* default */].readFileAsArrayBuffer(directory, name_1).timeout(2 * 60 * 1000);
        }
        return new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (resolve) {
            var reader = new FileReader();
            if (reader.addEventListener) {
                reader.addEventListener("loadend", resolve);
            }
            else {
                reader.onloadend = resolve;
            }
            reader.readAsArrayBuffer(_this.blobData);
        }).then(function (event) {
            var target = event.currentTarget || event.target;
            if (target.error) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["reject"](target.error);
            }
            return target.result;
        }).timeout(2 * 60 * 1000);
    };
    MyBlob.prototype.encryptAndUpload = function (key) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var blobKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.encrypt()];
                    case 1:
                        blobKey = _a.sent();
                        return [4 /*yield*/, keyStore.sym.symEncryptKey(blobKey, key)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.upload()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, blobKey];
                }
            });
        }); });
    };
    MyBlob.prototype.encrypt = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]().then(function () {
            if (_this.uploaded || !_this.decrypted) {
                throw new Error("trying to encrypt an already encrypted or public blob. add a key decryptor if you want to give users access");
            }
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
                keyStore.sym.generateKey(null, "blob key"),
                _this.getArrayBuffer()
            ]);
        }).spread(function (key, buf) {
            _this.key = key;
            time("blobencrypt" + (_this.blobID || _this.preReservedID));
            return keyStore.sym.encryptArrayBuffer(buf, _this.key, function (progress) {
                _this.encryptProgress.progress(_this.getSize() * progress);
            });
        }).then(function (encryptedData) {
            _this.encryptProgress.progress(_this.getSize());
            timeEnd("blobencrypt" + (_this.blobID || _this.preReservedID));
            blobServiceDebug(encryptedData.byteLength);
            _this.decrypted = false;
            _this.blobData = new Blob([encryptedData], { type: _this.blobData.type });
            return _this.key;
        });
    };
    MyBlob.prototype.decrypt = function () {
        var _this = this;
        if (this.decrypted) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
        }
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return _this.getArrayBuffer();
        }).then(function (encryptedData) {
            time("blobdecrypt" + _this.blobID);
            return keyStore.sym.decryptArrayBuffer(encryptedData, _this.key, function (progress) {
                _this.decryptProgress.progress(_this.getSize() * progress);
            });
        }).then(function (decryptedData) {
            _this.decryptProgress.progress(_this.getSize());
            timeEnd("blobdecrypt" + _this.blobID);
            _this.decrypted = true;
            _this.blobData = new Blob([decryptedData], { type: _this.blobData.type });
            return __WEBPACK_IMPORTED_MODULE_3__asset_blobCache__["a" /* default */].store(_this).catch(function (e) {
                console.log("Could not store blob");
                return _this.toURL();
            });
        });
    };
    MyBlob.prototype.toURL = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            if (_this.blobData.localURL) {
                return _this.blobData.localURL;
            }
            if (typeof window.URL !== "undefined") {
                return window.URL.createObjectURL(_this.blobData);
            }
            if (typeof webkitURL !== "undefined") {
                return window.webkitURL.createObjectURL(_this.blobData);
            }
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["fromCallback"](function (cb) {
                __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].blobToDataURI(_this.blobData, cb);
            });
        }).catch(function () {
            return "";
        });
    };
    MyBlob.prototype.upload = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            if (_this.uploaded) {
                return _this.blobID;
            }
            return _this.reserveID();
        }).then(function (blobid) {
            return __WEBPACK_IMPORTED_MODULE_4__socket_service__["default"].uploadBlob(_this.blobData, blobid, _this.uploadProgress);
        }).then(function () {
            _this.uploaded = true;
            return _this.blobID;
        });
    };
    MyBlob.prototype.getBlobID = function () {
        return this.blobID;
    };
    MyBlob.prototype.getBlobData = function () {
        return this.blobData;
    };
    MyBlob.prototype.reserveID = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            var meta = _this.meta;
            meta._key = _this.key;
            meta.one = 1;
            if (_this.preReservedID) {
                return __WEBPACK_IMPORTED_MODULE_4__socket_service__["default"].definitlyEmit("blob.fullyReserveID", {
                    blobid: _this.preReservedID,
                    meta: meta
                });
            }
            return __WEBPACK_IMPORTED_MODULE_4__socket_service__["default"].definitlyEmit("blob.reserveBlobID", {
                meta: meta
            });
        }).then(function (data) {
            if (data.blobid) {
                _this.blobID = data.blobid;
                return _this.blobID;
            }
        });
    };
    MyBlob.prototype.preReserveID = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return __WEBPACK_IMPORTED_MODULE_4__socket_service__["default"].definitlyEmit("blob.preReserveID", {});
        }).then(function (data) {
            if (data.blobid) {
                _this.preReservedID = data.blobid;
                return data.blobid;
            }
            throw new Error("got no blobid");
        });
    };
    MyBlob.prototype.getHash = function () {
        return this.getArrayBuffer().then(function (buf) {
            return keyStore.hash.hashArrayBuffer(buf);
        });
    };
    return MyBlob;
}());
var loadBlob = function (blobID, progress, estimatedSize) {
    var decryptProgressStub = new __WEBPACK_IMPORTED_MODULE_2__asset_Progress__["a" /* default */]({ total: estimatedSize });
    var downloadProgress = new __WEBPACK_IMPORTED_MODULE_2__asset_Progress__["a" /* default */]({ total: estimatedSize });
    progress.addDepend(downloadProgress);
    progress.addDepend(decryptProgressStub);
    return downloadBlobQueue.enqueue(1, function () { return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
        var data, blob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initService.awaitLoading()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new __WEBPACK_IMPORTED_MODULE_5__blobDownloader_service__["a" /* default */](__WEBPACK_IMPORTED_MODULE_4__socket_service__["default"], blobID, downloadProgress).download()];
                case 2:
                    data = _a.sent();
                    blob = new MyBlob(data.blob, blobID, { meta: data.meta });
                    if (blob.isDecrypted()) {
                        return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_3__asset_blobCache__["a" /* default */].store(blob).catch(function () { return blob.toURL(); })];
                    }
                    downloadProgress.progress(downloadProgress.getTotal());
                    progress.removeDepend(decryptProgressStub);
                    progress.addDepend(blob.decryptProgress);
                    return [2 /*return*/, blob.decrypt()];
            }
        });
    }); }); });
};
var getBlob = function (blobID, downloadProgress, estimatedSize) {
    if (!knownBlobURLs[blobID]) {
        knownBlobURLs[blobID] = loadBlob(blobID, downloadProgress, estimatedSize);
    }
    return knownBlobURLs[blobID];
};
var blobService = {
    createBlob: function (blob) {
        return new MyBlob(blob);
    },
    isBlobLoaded: function (blobID) {
        return __WEBPACK_IMPORTED_MODULE_3__asset_blobCache__["a" /* default */].isLoaded(blobID);
    },
    getBlobUrl: function (blobID, progress, estimatedSize) {
        if (progress === void 0) { progress = new __WEBPACK_IMPORTED_MODULE_2__asset_Progress__["a" /* default */](); }
        if (estimatedSize === void 0) { estimatedSize = 0; }
        return __WEBPACK_IMPORTED_MODULE_3__asset_blobCache__["a" /* default */].getBlobUrl(blobID).catch(function () {
            return getBlob(blobID, progress, estimatedSize);
        });
    },
};
/* harmony default export */ __webpack_exports__["a"] = (blobService);
//# sourceMappingURL=blobService.js.map

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global, process) {
function getGlobal() {
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        // eslint-disable-next-line no-undef
        return global;
    }
}
var glob = getGlobal();
var uuidPattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
var uuidRegexPattern = uuidPattern.replace(/x/g, "[a-fA-F0-9]").replace(/y/g, "[89abAB]");
var uuidRegex = new RegExp(uuidRegexPattern);
/** contains general helper functions */
var helper = {
    executeOnce: function (func) {
        var val;
        return function () {
            if (!val) {
                val = func();
            }
            return val;
        };
    },
    ensurePromise: function (p, cb) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return p.resolve(cb.apply(void 0, args));
        };
    },
    hasErrorId: function (response, id) {
        var errorData = response.errorData;
        return Object.keys(errorData).some(function (key) {
            return errorData[key].id === id;
        });
    },
    createErrorType: function (name) {
        function CustomError(message, extra) {
            var error = Error.call(this, message);
            this.name = name;
            this.extra = extra;
            this.message = error.message;
            this.stack = error.stack;
        }
        CustomError.prototype = Object.create(Error.prototype);
        CustomError.prototype.constructor = CustomError;
        return CustomError;
    },
    cacheResult: function (func) {
        var result;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!result) {
                result = func.apply(this, args);
            }
            return result;
        };
    },
    cacheUntilSettled: function (func) {
        var resultPromise;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!resultPromise) {
                resultPromise = func.apply(this, args);
            }
            resultPromise.finally(function () {
                resultPromise = null;
            });
            return resultPromise;
        };
    },
    randomIntFromInterval: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    generateUUID: function () {
        /* eslint-disable no-bitwise */
        var d = new Date().getTime();
        var uuid = uuidPattern.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        /* eslint-enable no-bitwise */
        return uuid;
    },
    repeatUntilTrue: function (Promise, func, delay) {
        function repeatFunc() {
            return func().then(function (res) {
                if (!res) {
                    return Promise.delay(delay).then(function () {
                        return repeatFunc();
                    });
                }
            });
        }
        return repeatFunc();
    },
    encodeParameters: function (parameters) {
        var keys = Object.keys(parameters);
        if (keys.length === 0) {
            return "";
        }
        var result = "?";
        keys.forEach(function (key) {
            result += key;
            if (parameters[key] !== null) {
                result += "=" + parameters[key];
            }
            result += "&";
        });
        result = result.substr(0, result.length - 1);
        return result;
    },
    getWeekNumber: function (d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0, 0, 0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(), 0, 1).getTime();
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return weekNo;
    },
    getLanguageFromPath: function () {
        return window.top.location.pathname.split("/")[1];
    },
    or: function (v1, v2) {
        return v1 || v2;
    },
    and: function (v1, v2) {
        return v1 && v2;
    },
    not: function (func) {
        return function () {
            return !func.apply(this, arguments);
        };
    },
    addAfterHook: function (func, hook, thisArg) {
        return function () {
            func.apply(thisArg, arguments);
            hook.apply(thisArg, arguments);
        };
    },
    concatBuffers: function () {
        var bufs = Array.prototype.slice.call(arguments);
        var len = 0, offset = 0;
        bufs.forEach(function (buf) {
            len += buf.byteLength;
        });
        var tmp = new Uint8Array(len);
        bufs.forEach(function (buf) {
            tmp.set(new Uint8Array(buf), offset);
            offset += buf.byteLength;
        });
        return tmp.buffer;
    },
    debouncePromise: function (Bluebird, func, time) {
        var timer = null;
        return function () {
            var args = arguments;
            if (timer) {
                clearTimeout(timer);
            }
            var promise = new Bluebird(function (resolve) {
                timer = setTimeout(function () {
                    resolve();
                }, time);
            }).then(function () {
                return func.apply(null, args);
            });
            return promise;
        };
    },
    debounce: function (func, time) {
        var timeout, args;
        return function () {
            args = arguments;
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                func.apply(null, args);
            }, time);
        };
    },
    promisify: function (Promise, cb) {
        return new Promise(function (resolve, reject) {
            try {
                cb(function (e, result) {
                    if (e) {
                        reject(e);
                    }
                    else {
                        resolve(result);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    },
    joinArraysToObject: function (config) {
        var result = [];
        var len = config[Object.keys(config)[0]].length;
        if (len === 0) {
            return result;
        }
        var i;
        for (i = 0; i < len; i += 1) {
            result.push({});
        }
        helper.objectEach(config, function (key, arrVal) {
            if (arrVal.length !== len) {
                throw new Error("arrays need to have the same length");
            }
            arrVal.forEach(function (val, index) {
                result[index][key] = val;
            });
        });
        return result;
    },
    capitaliseFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    lowercaseFirstLetter: function (string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    },
    objectifyResult: function (name, cb) {
        return function (e, result) {
            var data = {};
            if (e) {
                cb(e);
            }
            else {
                data[name] = result;
                cb(null, data);
            }
        };
    },
    array: {
        isArray: function (arr) {
            return Object.prototype.toString.call(arr) === "[object Array]";
        },
        first: function (arr) {
            return arr[0];
        },
        last: function (arr) {
            return arr[arr.length - 1];
        },
        find: function (arr, func) {
            var results = arr.filter(func);
            if (results.length === 1) {
                return results[0];
            }
        },
        spreadByArray: function (toSpread, attributeNames) {
            var res = {};
            toSpread.forEach(function (val, index) {
                res[attributeNames[index]] = val;
            });
            return res;
        },
        contains: function (arr, element) {
            return arr.indexOf(element) > -1;
        },
        flatten: function (arr) {
            var i, result = [];
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i] instanceof Array) {
                    result = result.concat(helper.array.flatten(arr[i]));
                }
                else {
                    result.push(arr[i]);
                }
            }
            return result;
        }
    },
    object: {
        deepSet: function (obj, partials, value) {
            obj = obj || {};
            if (partials.length === 0) {
                return value;
            }
            var curPartial = obj;
            partials.forEach(function (part, index) {
                if (index === partials.length - 1) {
                    curPartial[part] = value;
                }
                if (!curPartial[part]) {
                    curPartial[part] = {};
                }
            });
            return obj;
        },
        deepHas: function (obj, partials) {
            var hasDeep = true, currentPartial = obj;
            partials.forEach(function (partial) {
                if (currentPartial.hasOwnProperty(partial)) {
                    currentPartial = currentPartial[partial];
                }
                else {
                    hasDeep = false;
                }
            });
            return hasDeep;
        },
        deepGet: function (obj, partials) {
            var currentPart = obj, depth = 0, previousPart;
            if (partials.length === 0) {
                return {
                    depth: 0,
                    value: obj
                };
            }
            partials.forEach(function (partial) {
                if (typeof currentPart[partial] !== "undefined") {
                    previousPart = currentPart;
                    currentPart = currentPart[partial];
                    depth += 1;
                }
            });
            return {
                depth: depth,
                value: currentPart,
                parentValue: previousPart
            };
        },
        multipleFlatJoin: function (objs) {
            var result = {};
            function doJoin(base, obj) {
                helper.objectEach(obj, function (key, value) {
                    if (base.hasOwnProperty(key) && value !== base[key]) {
                        throw new Error("attribute already set!");
                    }
                    else {
                        result[key] = value;
                    }
                });
            }
            objs.map(function (e) {
                doJoin(result, e);
            });
            return result;
        }
    },
    pad: function (str, max) {
        str = str.toString();
        return str.length < max ? helper.pad("0" + str, max) : str;
    },
    canvasToBlob: function (canvas, type, cb) {
        canvas.toBlob(function (blob) {
            cb(null, blob);
        }, type);
    },
    blobToDataURI: function (blob, cb) {
        var reader = new FileReader();
        reader.onload = function () {
            cb(null, reader.result);
        };
        reader.readAsDataURL(blob);
    },
    dataURItoBlob: function (dataURI) {
        if (glob.atob && glob.Blob && glob.ArrayBuffer && glob.Uint8Array) {
            try {
                // convert base64 to raw binary data held in a string
                // doesn't handle URLEncoded DataURIs
                var byteString = atob(dataURI.split(",")[1]);
                // separate out the mime component
                var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
                // write the bytes of the string to an ArrayBuffer
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                try {
                    return new Blob([ab], { type: mimeString });
                }
                catch (e) {
                    // TypeError old chrome and FF
                    window.BlobBuilder = window.BlobBuilder ||
                        window.WebKitBlobBuilder ||
                        window.MozBlobBuilder ||
                        window.MSBlobBuilder;
                    if (e.name === "TypeError" && window.BlobBuilder) {
                        var bb = new window.BlobBuilder();
                        bb.append([ab]);
                        return bb.getBlob(mimeString);
                    }
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        }
        else {
            return false;
        }
    },
    /** calls all listeners */
    callListener: function (listener, arg1) {
        var i;
        for (i = 0; i < listener.length; i += 1) {
            try {
                listener[i](null, arg1);
            }
            catch (e) {
                console.log(e);
            }
        }
    },
    aggregateOnce: function (delayTime, callFunction) {
        var timerStarted = false;
        function doLoad() {
            timerStarted = false;
            callFunction();
        }
        return function () {
            if (!timerStarted) {
                timerStarted = true;
                window.setTimeout(doLoad, delayTime);
            }
        };
    },
    FullFiller: function () {
        var running = false, waiters = [];
        var success = false, failure = false, error;
        this.finish = function (e) {
            failure = !!e;
            success = !e;
            error = e;
            helper.callEach(waiters, [error]);
        };
        this.success = function () {
            if (!success && !failure) {
                success = true;
                helper.callEach(waiters);
            }
        };
        this.fail = function (e) {
            if (!success && !failure) {
                failure = true;
                error = e;
                helper.callEach(waiters, [error]);
            }
        };
        this.isSuccess = function () {
            return success;
        };
        this.start = function (cb) {
            if (!running && !success && !failure) {
                running = true;
                cb();
            }
        };
        this.await = function (cb) {
            if (success || failure) {
                cb(error);
            }
            else {
                waiters.push(cb);
            }
        };
    },
    delayMultiplePromise: function (Bluebird, delayTime, loadFunction, maxOnce) {
        var idsToLoad = [];
        var loadPromises = {}, loaderPromise;
        function doLoad() {
            var identifiers = idsToLoad.splice(0, maxOnce || idsToLoad.length);
            return loadFunction(identifiers).then(function (results) {
                loaderPromise = null;
                return results;
            }).map(function (result, i) {
                return {
                    id: identifiers[i],
                    result: result
                };
            });
        }
        function getLoaderPromise() {
            if (!loaderPromise) {
                loaderPromise = Bluebird.delay(delayTime).then(function () {
                    return doLoad();
                });
            }
            return loaderPromise;
        }
        function awaitNextLoad(identifier) {
            return getLoaderPromise().filter(function (res) {
                return res.id === identifier;
            }).then(function (remainingResults) {
                if (remainingResults.length === 0) {
                    return awaitNextLoad(identifier);
                }
                return remainingResults[0].result;
            });
        }
        return function (identifier) {
            if (!loadPromises[identifier]) {
                idsToLoad.push(identifier);
                loadPromises[identifier] = awaitNextLoad(identifier);
            }
            return loadPromises[identifier];
        };
    },
    delayMultiple: function (delayTime, loadFunction, maxOnce) {
        var timerStarted = false;
        var idsToLoad = [];
        var loadListeners = {};
        function doLoad() {
            var identifier = idsToLoad.splice(0, maxOnce || idsToLoad.length);
            loadFunction(identifier, function (err, results) {
                if (err) {
                    throw err;
                }
                var i, curIdentifier, curListener;
                for (i = 0; i < results.length; i += 1) {
                    curIdentifier = identifier[i];
                    curListener = loadListeners[curIdentifier];
                    helper.callListener(curListener, results[i]);
                    delete loadListeners[curIdentifier];
                }
                if (idsToLoad.length === 0) {
                    timerStarted = false;
                }
                else {
                    window.setTimeout(doLoad, delayTime);
                }
            });
        }
        return function (identifier, cb) {
            if (loadListeners[identifier]) {
                loadListeners[identifier].push(cb);
            }
            else {
                loadListeners[identifier] = [cb];
                idsToLoad.push(identifier);
                if (!timerStarted) {
                    timerStarted = true;
                    window.setTimeout(doLoad, delayTime);
                }
            }
        };
    },
    setGeneralState: function (state, obj) {
        obj.saving = false;
        obj.success = false;
        obj.failure = false;
        switch (state) {
            case "saving":
                obj.saving = true;
                break;
            case "success":
                obj.success = true;
                break;
            case "failure":
            default:
                obj.failure = true;
                break;
        }
    },
    stringifyCertainAttributes: function (obj, attributes) {
        var attr, result = {};
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if (attributes.indexOf(attr) > -1) {
                    result[attr] = JSON.stringify(obj[attr]);
                }
                else {
                    if (typeof obj[attr] === "object") {
                        throw new Error("value should not be stringified but is object");
                    }
                    result[attr] = obj[attr];
                }
            }
        }
        return result;
    },
    unStringifyCertainAttributes: function (obj, attributes) {
        var attr, result = {};
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if (attributes.indexOf(attr) > -1) {
                    result[attr] = JSON.parse(obj[attr]);
                }
                else {
                    result[attr] = obj[attr];
                }
            }
        }
        return result;
    },
    newElement: function (Constructor) {
        return function (e) {
            return new Constructor(e);
        };
    },
    arraySubtract: function (original, subtractor) {
        var i, result = [];
        for (i = 0; i < original.length; i += 1) {
            if (subtractor.indexOf(original[i]) === -1) {
                result.push(original[i]);
            }
        }
        return result;
    },
    arrayUnique: function (arr) {
        var hashMap = {}, i, name, l = arr.length, result = [];
        for (i = 0; i < l; i += 1) {
            if (arr[i]) {
                hashMap[arr[i]] = arr[i];
            }
        }
        for (name in hashMap) {
            if (hashMap.hasOwnProperty(name)) {
                result.push(hashMap[name]);
            }
        }
        return result;
    },
    arrayEqual: function (arr1, arr2) {
        return arr1.length === arr2.length && helper.arraySubtract(arr1, arr2).length === 0 && helper.arraySubtract(arr2, arr1).length === 0;
    },
    deepEqual: function (obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }
        else if (typeof obj1 === "object" && typeof obj2 === "object") {
            var keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);
            if (!helper.arrayEqual(keys1, keys2)) {
                return false;
            }
            var i, cur;
            for (i = 0; i < keys1.length; i += 1) {
                cur = keys1[i];
                if (!helper.deepEqual(obj1[cur], obj2[cur])) {
                    return false;
                }
            }
        }
        else {
            return false;
        }
        return true;
    },
    deepCopyArray: function (arr, depth) {
        var result = [], i;
        for (i = 0; i < arr.length; i += 1) {
            result[i] = helper.deepCopyObj(arr[i], depth - 1);
        }
        return result;
    },
    deepCopyObj: function (obj, depth) {
        if (typeof obj !== "object") {
            return obj;
        }
        if (depth < 0) {
            throw new Error("too deep");
        }
        if (obj instanceof Array) {
            return helper.deepCopyArray(obj, depth);
        }
        var attr, value, result = {};
        // Extend the base object
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                value = obj[attr];
                result[attr] = helper.deepCopyObj(value, depth - 1);
            }
        }
        return result;
    },
    extend: function (target, extender, depth, removeEmpty) {
        function shouldDeleteAttribute(value) {
            if (!removeEmpty) {
                return false;
            }
            return value === "" || value === null || (typeof value === "object" && Object.keys(value).length === 0);
        }
        if (!target) {
            return extender;
        }
        if (depth < 0) {
            throw new Error("too deep");
        }
        var attr, given, added;
        // Extend the base object
        for (attr in extender) {
            if (extender.hasOwnProperty(attr)) {
                target[attr] = target[attr] || {};
                given = target[attr];
                added = extender[attr];
                if (added !== undefined) {
                    if (typeof given === "object" && typeof added === "object" && !(added instanceof Array)) {
                        helper.extend(given, added, depth - 1, removeEmpty);
                    }
                    else {
                        target[attr] = added;
                    }
                    if (shouldDeleteAttribute(target[attr])) {
                        delete target[attr];
                    }
                }
            }
        }
        return target;
    },
    extendNoOverwrite: function (target, extender) {
        helper.objectEach(extender, function (key, value) {
            if (typeof target[key] === "undefined") {
                target[key] = helper.deepCopyObj(value);
            }
            else if (typeof target[key] === "object") {
                helper.extendNoOverwrite(target[key], value);
            }
        });
    },
    parseDecimal: function (e) {
        return parseInt(e, 10);
    },
    assert: function (bool) {
        if (!bool) {
            throw new Error("assertion not met!");
        }
    },
    qm: function (attr) {
        return function (obj) {
            return obj[attr];
        };
    },
    nop: function () { },
    objectJoin: function (obj1, obj2) {
        var result = {};
        helper.objectEach(obj1, function (key, value) {
            if (obj2.hasOwnProperty(key) && value !== obj2[key]) {
                if (typeof value === "object" && typeof obj2[key] === "object") {
                    result[key] = helper.objectJoin(value, obj2[key]);
                }
                else {
                    throw new Error("attribute set in both!");
                }
            }
            else {
                result[key] = value;
            }
        });
        helper.objectEach(obj2, function (key, value) {
            if (!obj1.hasOwnProperty(key)) {
                result[key] = value;
            }
        });
        return result;
    },
    objectEach: function (obj, cb, thisArg) {
        var attr;
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                cb.call(thisArg, attr, obj[attr]);
            }
        }
    },
    copyObj: function (obj) {
        var newObj = {}, attr;
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                newObj[attr] = obj[attr];
            }
        }
        return newObj;
    },
    containsOr: function (value) {
        var i;
        for (i = 1; i < arguments.length; i += 1) {
            if (arguments[i].indexOf(value) > -1) {
                return true;
            }
        }
        return false;
    },
    arrayToObject: function (arr, func) {
        var i, res = {};
        for (i = 0; i < arr.length; i += 1) {
            res[func(arr[i], i)] = arr[i];
        }
        return res;
    },
    removeArray: function (arr, val) {
        if (!arr) {
            return [];
        }
        var ax;
        while ((ax = arr.indexOf(val)) !== -1) {
            arr.splice(ax, 1);
        }
        return arr;
    },
    callEach: function (listener, args, returnFunction) {
        if (returnFunction === void 0) { returnFunction = function () { }; }
        var result;
        listener.forEach(function (theListener) {
            try {
                var currentResult = theListener.apply(null, args);
                if (result) {
                    result = returnFunction(result, currentResult);
                }
                else {
                    result = currentResult;
                }
            }
            catch (e) {
                console.log(e);
            }
        });
        return result;
    },
    objectMap: function (obj, func, thisArg) {
        var attr, res = {}, result;
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                result = func.call(thisArg, obj[attr], attr);
                if (result) {
                    res[attr] = result;
                }
            }
        }
        return res;
    },
    setAll: function (obj, value) {
        var attr;
        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                if (typeof obj[attr] === "object") {
                    helper.setAll(obj, value);
                }
                else {
                    obj[attr] = value;
                }
            }
        }
    },
    deepGet: function (obj, key) {
        var i;
        var cur = obj;
        if (typeof key === "string") {
            key = [key];
        }
        if (!cur) {
            return;
        }
        for (i = 0; i < key.length; i += 1) {
            if (cur[key[i]]) {
                cur = cur[key[i]];
            }
            else {
                return;
            }
        }
        return cur;
    },
    deepSet: function (obj, key, value) {
        var toSet = key.pop();
        var branch = helper.deepGet(obj, key);
        if (branch) {
            branch[toSet] = value;
        }
        else {
            return false;
        }
    },
    toUrl: function (file) {
        var url;
        if (file.localURL) {
            return file.localURL;
        }
        if (typeof URL !== "undefined") {
            url = URL.createObjectURL(file);
        }
        else if (typeof webkitURL !== "undefined") {
            url = webkitURL.createObjectURL(file);
        }
        return url;
    },
    deepSetCreate: function (obj, keys, value) {
        var changed = false, cur = obj;
        keys.forEach(function (key, index) {
            if (index + 1 < keys.length) {
                if (!cur[key]) {
                    cur[key] = {};
                }
                cur = cur[key];
            }
            else if (cur[key] !== value) {
                cur[key] = helper.deepCopyObj(value);
                changed = true;
            }
        });
        return changed;
    },
    validateObjects: function validateObjectsF(reference, data, noValueCheck) {
        var key;
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                if (!reference[key]) {
                    return false;
                }
                if (!noValueCheck) {
                    if (typeof reference[key] === "object") {
                        if (!helper.validateObjects(reference[key], data[key])) {
                            return false;
                        }
                    }
                    else if (typeof reference[key] === "function") {
                        if (!reference[key](data[key])) {
                            return false;
                        }
                    }
                    else if (reference[key] !== true) {
                        return false;
                    }
                }
            }
        }
        return true;
    },
    /** chars for a sid */
    codeChars: ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Y", "X", "C", "V", "B", "N", "M", "q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "y", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    /** get a file names extension */
    getExtension: function (filename) {
        var i = filename.lastIndexOf(".");
        return (i < 0) ? "" : filename.substr(i);
    },
    /** get a filenames name */
    getName: function (filename) {
        var i = filename.lastIndexOf(".");
        return (i < 0) ? filename : filename.substr(0, i);
    },
    /** just a function which moves on in step */
    passFunction: function () {
        this.apply(null, arguments);
    },
    /** order a certain ass-array correctly
    * @param object object to sort
    * @param order correct order (normal array)
    * @param getFunction which func to call on objects to get their "value"
    * @return ordered object
    */
    orderCorrectly: function (object, order, getFunction) {
        var i, j, results = [];
        for (i = 0; i < order.length; i += 1) {
            for (j = 0; j < object.length; j += 1) {
                if (object[j][getFunction]() === order[i]) {
                    results.push(object[j]);
                    object.splice(j, 1);
                    break;
                }
            }
        }
        return results;
    },
    isUUID: function (uuid) {
        return helper.isString(uuid) && uuid.match(uuidRegex);
    },
    /** is data an integer?
    * @param data value to check for int value
    * @return bool is integer?
    */
    isInt: function (data) {
        var y = parseInt(data, 10);
        if (isNaN(y)) {
            return false;
        }
        return y.toString() === data.toString();
    },
    /** is data an id?*/
    isID: function (data) {
        if (helper.isInt(data)) {
            data = parseInt(data, 10);
            return (data > 0);
        }
        return false;
    },
    isRealID: function (data) {
        if (typeof data !== "string") {
            return false;
        }
        var parts = data.split(":");
        if (parts.length !== 2) {
            return false;
        }
        if (parts[1].length !== 64) {
            return false;
        }
        if (!helper.isNickname(parts[0]) && !helper.isMail(parts[0])) {
            return false;
        }
        return true;
    },
    /** is data a valid nickname? */
    isNickname: function (data) {
        return (helper.isString(data) && data.length !== 0 && !!data.match(/^[A-z][A-z0-9]*$/));
    },
    /** is data an e-mail? */
    isMail: function (data) {
        var regex = /^.+@.+$/;
        return (helper.isString(data) && data.length !== 0 && regex.test(data));
    },
    /** is data a session Key (hex value with certain length) */
    isSessionKey: function (data) {
        return (helper.isset(data) && (data.length === 64 || data.length === 32) && helper.isHex(data));
    },
    isPassword: function (data) {
        return (helper.isHex(data) && data.length === 64);
    },
    isCurve: function (data) {
        if (data === "c256" || data === "256") {
            return true;
        }
        //TODO!
        return false;
    },
    isBase64: function (data) {
        return (helper.isset(data) && typeof data === "string" && !!data.match(/^[A-Za-z0-9\+\/=]|=[^=]|={3,}$/));
    },
    isSignature: function (data) {
        return helper.isHex(data);
    },
    isHex: function (data) {
        return (helper.isset(data) && typeof data === "string" && !!data.match(/^[A-Fa-f0-9]*$/));
    },
    /** typeof val == object? */
    isObject: function (val) {
        return (typeof val === "object");
    },
    /** is val set (not null/undefined) */
    isString: function (val) {
        return (val !== undefined && val !== null && typeof val === "string");
    },
    /** is val set (not null/undefined) */
    isset: function (val) {
        return (val !== undefined && val !== null);
    },
    /** checks if an array is set and attributes in that array are set.
    * @param arrayName the array to check
    * @param other attributes to check for
    * checks if arrayName[1][2][3][4]... is set where 1-inf are the given attributes.
    * helper function
    * @author Nilos
    */
    arraySet: function (arrayName) {
        var i = 1;
        var memory;
        if (helper.isset(arrayName)) {
            memory = arrayName;
        }
        else {
            return false;
        }
        for (i = 1; i < arguments.length; i += 1) {
            if (helper.isset(memory[arguments[i]])) {
                memory = memory[arguments[i]];
            }
            else {
                return false;
            }
        }
        return true;
    },
    nT: function (cb) {
        var nT = function nTf() {
            var args = arguments;
            if (typeof process !== "undefined") {
                process.nextTick(function () {
                    cb.apply(this, args);
                });
            }
            else {
                cb.apply(this, args);
            }
        };
        return nT;
    },
    /** step function
    * throws given errors
    * passes on all other stuff to given function
    */
    sF: function (cb) {
        var mysf = function sfFunction(err) {
            if (err) {
                console.log(err.stack);
                this(err);
                return;
            }
            var args = []; // empty array
            var i;
            // copy all other arguments we want to "pass through"
            for (i = 1; i < arguments.length; i += 1) {
                args.push(arguments[i]);
            }
            return cb.apply(this, args);
        };
        mysf.getRealFunction = function () {
            return cb;
        };
        return mysf;
    },
    /** handle Error function for step
    * passes given errors to callback but only those!
    * throws other errors.
    */
    hE: function (cb, errors) {
        return function (err) {
            if (err) {
                console.log(err);
                var passToNext = false;
                if (errors instanceof Array) {
                    var i;
                    for (i = 0; i < errors.length; i += 1) {
                        if (err instanceof errors[i]) {
                            passToNext = true;
                        }
                    }
                }
                else {
                    passToNext = err instanceof errors;
                }
                if (!passToNext) {
                    this(err);
                    return;
                }
            }
            return cb.apply(this, arguments);
        };
    },
    emptyUnion: function (arr1, arr2) {
        return helper.arraySubtract(arr1, arr2).length === arr1.length && helper.arraySubtract(arr2, arr1).length === arr2.length;
    },
    /** is needle in haystack? */
    inArray: function (haystack, needle) {
        var i = 0;
        for (i = 0; i < haystack.length; i += 1) {
            if (haystack[i] === needle) {
                return true;
            }
        }
        return false;
    },
    firstCapital: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};
/* harmony default export */ __webpack_exports__["default"] = (helper);
//# sourceMappingURL=helper.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(12), __webpack_require__(72)))

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var h = __webpack_require__(6).default;
var baseConfig = __webpack_require__(357);
var config = __webpack_require__(358);

module.exports = h.extend(h.extend({}, baseConfig), config);

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UpdateEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SYMBOL_UNCHANGED; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_error_service__ = __webpack_require__(32);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var UpdateEvent;
(function (UpdateEvent) {
    UpdateEvent[UpdateEvent["wake"] = 0] = "wake";
    UpdateEvent[UpdateEvent["blink"] = 1] = "blink";
})(UpdateEvent || (UpdateEvent = {}));
var SYMBOL_UNCHANGED = Symbol("UNCHANGED");
var LONG_APP_PAUSE = 2 * 60 * 1000;
var LONG_DISCONNECT = 60 * 1000;
function createLoader(_a) {
    var download = _a.download, load = _a.load, restore = _a.restore, getID = _a.getID, cacheName = _a.cacheName, shouldUpdate = _a.shouldUpdate;
    var loading = {};
    var byId = {};
    var cache = new __WEBPACK_IMPORTED_MODULE_2__services_Cache__["default"](cacheName);
    var considerLoaded = function (id) {
        loading = __assign({}, loading);
        delete loading[id];
    };
    var cacheInMemory = function (id, instance, lastUpdated) {
        byId = __assign({}, byId, (_a = {}, _a[id] = { instance: instance, lastUpdated: lastUpdated, updating: false }, _a));
        var _a;
    };
    var loadFromCache = function (id) {
        var lastUpdated = Date.now();
        return cache.get(id)
            .then(function (cacheResponse) {
            lastUpdated = cacheResponse.created;
            return cacheResponse.data;
        })
            .then(function (cachedData) { return restore(cachedData, null); })
            .then(function (instance) {
            cacheInMemory(id, instance, lastUpdated);
            considerLoaded(id);
            scheduleInstanceUpdate(UpdateEvent.wake, id);
            return instance;
        });
    };
    var serverResponseToInstance = function (response, id, activeInstance) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return __awaiter(this, void 0, void 0, function () {
                var loadedData, instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, load(response, activeInstance)];
                        case 1:
                            loadedData = _a.sent();
                            if (loadedData === SYMBOL_UNCHANGED) {
                                return [2 /*return*/, activeInstance];
                            }
                            if (loadedData instanceof Symbol) {
                                throw new Error("invalid symbol returned by load " + cacheName);
                            }
                            return [4 /*yield*/, cache.store(id, loadedData)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, restore(loadedData, activeInstance)];
                        case 3:
                            instance = _a.sent();
                            if (activeInstance && activeInstance !== instance) {
                                console.warn("Restore should update active instance");
                            }
                            cacheInMemory(id, instance, Date.now());
                            return [2 /*return*/, instance];
                    }
                });
            });
        }).finally(function () { return considerLoaded(id); });
    };
    var updateInstance = function (id, instance) {
        return download(id, instance).then(function (response) {
            return serverResponseToInstance(response, id, instance);
        });
    };
    var scheduleInstanceUpdate = function (event, id) {
        var _a = byId[id], instance = _a.instance, lastUpdated = _a.lastUpdated, updating = _a.updating;
        if (updating) {
            console.info("Not updating instance because update is already running " + cacheName + "/" + id);
            return;
        }
        byId[id].updating = true;
        shouldUpdate(event, instance, lastUpdated).then(function (shouldUpdate) {
            if (shouldUpdate) {
                console.info("Schedule " + cacheName + " instance " + id + " update with event " + UpdateEvent[event]);
                return updateInstance(id, instance).then(function () {
                    return byId[id].lastUpdated = Date.now();
                });
            }
        }).catch(__WEBPACK_IMPORTED_MODULE_3__services_error_service__["default"].criticalError).finally(function () { return byId[id].updating = false; });
        return;
    };
    var scheduleInstancesUpdate = function (event) {
        console.info("Schedule " + cacheName + " instances update with event " + UpdateEvent[event]);
        Object.keys(byId)
            .forEach(function (id) { return scheduleInstanceUpdate(event, id); });
    };
    var lastHeartbeat = Date.now();
    __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].listen(function () { return lastHeartbeat = Date.now(); }, "heartbeat");
    __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].on("connect", function () {
        console.info("connect at " + Date.now() + " after " + (Date.now() - lastHeartbeat));
        if (Date.now() - lastHeartbeat > LONG_DISCONNECT) {
            scheduleInstancesUpdate(UpdateEvent.wake);
        }
        else {
            scheduleInstancesUpdate(UpdateEvent.blink);
        }
        lastHeartbeat = Date.now();
    });
    var pauseStarted = 0;
    document.addEventListener("pause", function () { return pauseStarted = Date.now(); }, false);
    document.addEventListener("resume", function () {
        console.info("ended pause at " + Date.now() + " after " + (Date.now() - pauseStarted));
        if (Date.now() - pauseStarted > LONG_APP_PAUSE) {
            scheduleInstancesUpdate(UpdateEvent.wake);
        }
        else {
            scheduleInstancesUpdate(UpdateEvent.blink);
        }
    }, false);
    return _b = (function () {
            function ObjectLoader() {
            }
            ObjectLoader.getLoaded = function (id) {
                if (!ObjectLoader.isLoaded(id)) {
                    throw new Error("Not yet loaded: " + id);
                }
                return byId[id].instance;
            };
            ObjectLoader.isLoaded = function (id) {
                return byId.hasOwnProperty(id);
            };
            ObjectLoader.load = function (source) {
                var id = getID(source);
                if (byId[id]) {
                    serverResponseToInstance(source, id, byId[id].instance);
                    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](byId[id].instance);
                }
                if (!loading[id]) {
                    loading = __assign({}, loading, (_a = {}, _a[id] = loadFromCache(id)
                        .catch(function () { return serverResponseToInstance(source, id, null); }), _a));
                }
                return loading[id];
                var _a;
            };
            ObjectLoader.updateCache = function (id, cacheableData) {
                return cache.store(id, cacheableData);
            };
            // Throws
            ObjectLoader.getFromCache = function (id) {
                if (byId[id]) {
                    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](byId[id].instance);
                }
                return loadFromCache(id);
            };
            ObjectLoader.get = function (id) {
                if (typeof id === "undefined" || id === null) {
                    throw new Error("Can't get object with id " + id + " - " + cacheName);
                }
                if (byId[id]) {
                    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](byId[id].instance);
                }
                if (!loading[id]) {
                    var promise = loadFromCache(id)
                        .catch(function () { return download(id, null).then(function (response) { return serverResponseToInstance(response, id, null); }); });
                    loading = __assign({}, loading, (_a = {}, _a[id] = promise, _a));
                }
                return loading[id];
                var _a;
            };
            return ObjectLoader;
        }()),
        _b.getAll = function () {
            return byId;
        },
        _b.removeLoaded = function (id) { return delete byId[id]; },
        _b.addLoaded = function (id, obj) {
            byId[id] = { instance: obj, lastUpdated: Date.now(), updating: false };
        },
        _b;
    var _b;
}
/* harmony default export */ __webpack_exports__["c"] = (createLoader);
//# sourceMappingURL=mutableObjectLoader.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Progress = (function (_super) {
    __extends(Progress, _super);
    function Progress(options) {
        var _this = _super.call(this) || this;
        _this.done = 0;
        _this.donePercentage = 0;
        _this.data = { progress: 0 };
        _this._parseOptions = function () {
            if (_this.options) {
                _this.total = _this.options.total;
                if (_this.options.depends) {
                    _this._listenDepends(_this.options.depends);
                }
            }
        };
        _this._listenDepends = function (depends) {
            _this.depends = depends;
            depends.forEach(function (depend) {
                depend.listen(_this.recalculate.bind(_this), "progress");
            });
        };
        _this.removeDepend = function (depend) {
            if (!_this.depends && _this.total) {
                throw new Error("trying to mix depending progress and manual progress");
            }
            __WEBPACK_IMPORTED_MODULE_1__helper_helper__["default"].removeArray(_this.depends, depend);
            _this.recalculate();
        };
        _this.addDepend = function (depend) {
            if (!_this.depends && _this.total) {
                throw new Error("trying to mix depending progress and manual progress");
            }
            _this.depends = _this.depends || [];
            _this.depends.push(depend);
            depend.listen(_this.recalculate.bind(_this), "progress");
            _this.recalculate();
        };
        _this.progressDelta = function (delta) {
            if (_this.depends) {
                throw new Error("trying to mix depending progress and manual progress");
            }
            _this.done += delta;
            _this.recalculate();
        };
        _this.progress = function (done) {
            if (_this.depends) {
                throw new Error("trying to mix depending progress and manual progress");
            }
            _this.done = done;
            _this.recalculate();
        };
        _this.setTotal = function (total) {
            if (_this.depends) {
                throw new Error("trying to mix depending progress and manual progress");
            }
            _this.total = total;
            _this.recalculate();
        };
        _this.reset = function () {
            _this.done = 0;
            _this.recalculate();
        };
        _this.joinDepends = function () {
            var done = 0, total = 0;
            _this.depends.forEach(function (depend) {
                done += depend.getDone();
                total += depend.getTotal() || 0;
            });
            _this.done = done;
            _this.total = total;
        };
        _this.getDone = function () {
            return _this.done;
        };
        _this.getTotal = function () {
            return _this.total;
        };
        _this.getProgress = function () {
            return _this.donePercentage;
        };
        _this.recalculate = function () {
            if (_this.depends) {
                _this.joinDepends();
            }
            if (!_this.total) {
                return;
            }
            _this.donePercentage = _this.done / _this.total;
            _this.donePercentage = Math.min(_this.donePercentage, 1);
            _this.data.progress = _this.donePercentage;
            _this.notify(_this.donePercentage, "progress");
        };
        _this.options = options;
        _this._parseOptions();
        return _this;
    }
    return Progress;
}(__WEBPACK_IMPORTED_MODULE_0__observer__["default"]));
/* harmony default export */ __webpack_exports__["a"] = (Progress);
//# sourceMappingURL=Progress.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRUST_SECURED_OPTIONS", function() { return TRUST_SECURED_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrustStore", function() { return TrustStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trustStates", function() { return trustStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformLegacy", function() { return transformLegacy; });
/* harmony export (immutable) */ __webpack_exports__["userToDataSet"] = userToDataSet;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asset_observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__asset_securedDataWithMetaData__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__asset_enum__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_error_service__ = __webpack_require__(32);

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};





var errors = __webpack_require__(42);


var initService = __webpack_require__(20);
var THROTTLE = 50;
var TRUST_SECURED_OPTIONS = {
    type: "trustManager"
};
var TrustStore = (function () {
    function TrustStore(_a) {
        var nicknames = _a.nicknames, ids = _a.ids, me = _a.me, keys = _a.keys, signature = _a.signature;
        var _this = this;
        this.getSignature = function () { return _this.signature; };
        this.update = function (_a) {
            var nicknames = _a.nicknames, ids = _a.ids, me = _a.me, keys = _a.keys;
            var newKeys = Object.keys(keys)
                .filter(function (key) { return !_this.keys.hasOwnProperty(key); });
            var trustIncreasedKeys = Object.keys(keys)
                .filter(function (key) { return _this.keys.hasOwnProperty(key); })
                .filter(function (key) {
                var oldTrust = unserializeTrust(_this.keys[key].trust);
                var newTrust = unserializeTrust(keys[key].trust);
                return sortedTrustStates.indexOf(oldTrust) < sortedTrustStates.indexOf(newTrust);
            });
            newKeys
                .forEach(function (signKey) { return _this.add(keys[signKey]); });
            trustIncreasedKeys
                .forEach(function (key) { return _this.keys[key].trust = keys[key].trust; });
            if (newKeys.length > 0 || trustIncreasedKeys.length > 0) {
                scheduleTrustmanagerUpload();
            }
        };
        this.add = function (dataSet) {
            var key = dataSet.key, userid = dataSet.userid, nickname = dataSet.nickname;
            var idKey = _this.ids[userid];
            var nicknameKey = _this.nicknames[nickname];
            if (idKey && idKey !== key) {
                throw new errors.SecurityError("we already have got a key for this users id");
            }
            if (nicknameKey && nicknameKey !== key) {
                throw new errors.SecurityError("we already have got a key for this users nickname");
            }
            _this.keys[key] = dataSet;
            if (nickname) {
                _this.nicknames[nickname] = key;
            }
            _this.ids[userid] = key;
        };
        this.get = function (key) { return _this.keys[key]; };
        this.setKeyTrustLevel = function (key, trustLevel) {
            _this.keys[key].trust = trustLevel;
        };
        this.getUpdatedVersion = function () {
            var info = {
                nicknames: _this.nicknames,
                ids: _this.ids,
                me: _this.me
            };
            Object.keys(_this.keys).forEach(function (key) {
                info[key] = _this.keys[key];
            });
            var secured = new __WEBPACK_IMPORTED_MODULE_3__asset_securedDataWithMetaData__["SecuredData"](null, info, TRUST_SECURED_OPTIONS, true);
            return secured.sign(ownKey);
        };
        this.getTrustSet = function () { return ({
            nicknames: _this.nicknames,
            keys: _this.keys,
            ids: _this.ids,
            me: _this.me,
            signature: _this.signature
        }); };
        this.hasKeyData = function (key) { return _this.keys.hasOwnProperty(key); };
        this.nicknames = nicknames;
        this.ids = ids;
        this.me = me;
        this.keys = keys;
        this.signature = signature;
    }
    return TrustStore;
}());

var trustStore;
var loaded = false;
var fakeKeyExistence = 0;
var ownKey;
var sortedTrustStatesNames = ["BROKEN", "UNTRUSTED", "TIMETRUSTED", "WHISPEERVERIFIED", "NETWORKVERIFIED", "VERIFIED", "OWN"];
var trustStates = new __WEBPACK_IMPORTED_MODULE_4__asset_enum__["a" /* default */](sortedTrustStatesNames);
var transformLegacy = function (_a) {
    var nicknames = _a.nicknames, ids = _a.ids, me = _a.me, _signature = _a._signature, rest = __rest(_a, ["nicknames", "ids", "me", "_signature"]);
    var keys = {};
    Object.keys(rest).filter(function (key) { return __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].isRealID(key); }).forEach(function (key) {
        keys[key] = rest[key];
    });
    return {
        nicknames: nicknames,
        ids: ids,
        me: me,
        keys: keys,
        signature: _signature
    };
};
var sortedTrustStates = sortedTrustStatesNames.map(function (trustLevel) {
    return trustStates.fromString("|" + trustLevel + "|");
});
function serializeTrust(trustLevel) {
    return trustStates.toString(trustLevel);
}
function unserializeTrust(trustLevel) {
    return trustStates.fromString(trustLevel);
}
var KeyTrustData = (function () {
    function KeyTrustData(data) {
        var _this = this;
        this.data = data;
        this.getAddedTime = function () { return _this.data.added; };
        this.getKey = function () { return _this.data.key; };
        this.getUserID = function () { return _this.data.userid; };
        this.getNickname = function () { return _this.data.nickname; };
        this.getTrust = function () { return _this.trustSymbol; };
        this.isUntrusted = function () { return _this.trustSymbol === trustStates.UNTRUSTED; };
        this.isTimeTrusted = function () { return _this.trustSymbol === trustStates.TIMETRUSTED; };
        this.isWhispeerVerified = function () { return _this.trustSymbol === trustStates.WHISPEERVERIFIED; };
        this.isNetworkVerified = function () { return _this.trustSymbol === trustStates.NETWORKVERIFIED; };
        this.isVerified = function () { return _this.trustSymbol === trustStates.VERIFIED; };
        this.isOwn = function () { return _this.trustSymbol === trustStates.OWN; };
        this.trustSymbol = unserializeTrust(data.trust);
    }
    return KeyTrustData;
}());
function userToDataSet(_a, trustLevel) {
    var key = _a.key, userid = _a.userid, nickname = _a.nickname;
    if (trustLevel === void 0) { trustLevel = trustStates.UNTRUSTED; }
    return {
        added: new Date().getTime(),
        trust: serializeTrust(trustLevel),
        key: key,
        userid: userid,
        nickname: nickname
    };
}
var uploadDatabase = function () {
    return initService.awaitLoading()
        .then(function () { return trustStore.getUpdatedVersion(); })
        .then(function (content) { return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("trustManager.set", { content: content }); })
        .then(function (response) { return !response.success ? __WEBPACK_IMPORTED_MODULE_6__services_error_service__["default"].criticalError(response) : null; });
};
var scheduleTrustmanagerUpload = __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].aggregateOnce(THROTTLE, uploadDatabase);
var trustManager = {
    notify: null,
    /*listen: <any> null,*/
    allow: function (count) {
        if (!loaded) {
            fakeKeyExistence = count;
        }
    },
    disallow: function () {
        fakeKeyExistence = 0;
    },
    isLoaded: function () { return loaded; },
    setOwnSignKey: function (_ownKey) {
        ownKey = _ownKey;
    },
    addDataSet: function (dataSet) {
        trustStore.add(dataSet);
    },
    updateDatabase: function (data, cb) {
        if (!loaded) {
            throw new Error("cant update database: not loaded");
        }
        var givenDatabase = __WEBPACK_IMPORTED_MODULE_3__asset_securedDataWithMetaData__["default"].load(undefined, data, TRUST_SECURED_OPTIONS);
        return __WEBPACK_IMPORTED_MODULE_5_bluebird__["try"](function () {
            if (data.me === ownKey) {
                return givenDatabase.verifyAsync(ownKey, "user");
            }
            throw new errors.SecurityError("not my trust database");
        }).then(function () { return trustStore.update(transformLegacy(givenDatabase.metaGet())); }).nodeify(cb);
    },
    hasKeyData: function (keyid) {
        if (!loaded) {
            if (keyid === ownKey) {
                return true;
            }
            else if (fakeKeyExistence > 0) {
                fakeKeyExistence -= 1;
                return true;
            }
            else {
                throw new Error("trust manager not yet loaded");
            }
        }
        return trustStore.hasKeyData(keyid);
    },
    getKeyData: function (keyid) {
        var keyData = trustStore.get(keyid);
        if (keyData) {
            return new KeyTrustData(keyData);
        }
        throw new Error("key not in trust database " + keyid);
    },
    uploadDatabase: uploadDatabase,
    verifyUser: function (user) {
        var signKey = user.getSignKey();
        if (signKey === ownKey) {
            throw new Error("Tried to verify own user.");
        }
        if (trustStore.hasKeyData(signKey)) {
            trustStore.setKeyTrustLevel(signKey, serializeTrust(trustStates.VERIFIED));
        }
        return uploadDatabase();
    },
    addNewUsers: function (userInfo) {
        if (trustManager.isLoaded() && !trustManager.hasKeyData(userInfo.key)) {
            trustManager.addDataSet(userToDataSet(userInfo));
            scheduleTrustmanagerUpload();
        }
    },
    setTrustStore: function (givenTrustStore) {
        if (trustStore) {
            throw new Error("trying to overwrite trust store. Please update instance");
        }
        trustManager.disallow();
        trustStore = givenTrustStore;
        loaded = true;
        trustManager.notify("", "loaded");
    }
};
__WEBPACK_IMPORTED_MODULE_2__asset_observer__["default"].extend(trustManager);
__WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].channel("notify.trustManager", function (_e, data) {
    trustManager.updateDatabase(data).catch(__WEBPACK_IMPORTED_MODULE_6__services_error_service__["default"].criticalError);
});
/* harmony default export */ __webpack_exports__["default"] = (trustManager);
//# sourceMappingURL=trustManager.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);


var Queue = (function () {
    function Queue(maxWeight) {
        this.maxWeight = maxWeight;
        this.queue = [];
        this.run = false;
        this.runningWeight = 0;
    }
    Queue.prototype.enqueue = function (weight, task) {
        var _this = this;
        var promise = new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (resolve, reject) {
            _this.queue.push({
                task: task,
                weight: weight,
                resolve: resolve,
                reject: reject
            });
            _this.runTasks();
        });
        return promise;
    };
    Queue.prototype.runTasks = function () {
        if (!this.run) {
            return;
        }
        var nextTask;
        while (this.queue.length > 0 && this.runningWeight < this.maxWeight) {
            nextTask = this.queue.shift();
            this.runTask(nextTask);
        }
    };
    Queue.prototype.runTask = function (task) {
        var _this = this;
        this.runningWeight += task.weight;
        task.task().then(function (result) { task.resolve(result); }, function (error) { task.reject(error); }).finally(function () {
            _this.runningWeight -= task.weight;
            _this.runTasks();
        });
    };
    Queue.prototype.start = function () {
        this.run = true;
        this.runTasks();
    };
    return Queue;
}());
/* harmony default export */ __webpack_exports__["a"] = (Queue);
//# sourceMappingURL=Queue.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_Cache__ = __webpack_require__(27);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


function createLoader(_a) {
    var download = _a.download, load = _a.load, restore = _a.restore, getID = _a.getID, cacheName = _a.cacheName;
    var loading = {};
    var byId = {};
    var cache = new __WEBPACK_IMPORTED_MODULE_1__services_Cache__["default"](cacheName);
    var considerLoaded = function (id) {
        loading = __assign({}, loading);
        delete loading[id];
    };
    var cacheInMemory = function (id, instance) {
        byId = __assign({}, byId, (_a = {}, _a[id] = instance, _a));
        return instance;
        var _a;
    };
    var loadFromCache = function (id) {
        return cache.get(id)
            .then(function (cacheResponse) { return cacheResponse.data; })
            .then(restore)
            .then(function (instance) {
            cacheInMemory(id, instance);
            considerLoaded(id);
            return instance;
        });
    };
    var serverResponseToInstance = function (response, id) {
        return load(response)
            .then(function (cacheableData) { return cache.store(id, cacheableData).thenReturn(cacheableData); })
            .then(restore)
            .then(function (instance) { return cacheInMemory(id, instance); })
            .finally(function () { return considerLoaded(id); });
    };
    return _b = (function () {
            function ObjectLoader() {
            }
            ObjectLoader.getLoaded = function (id) {
                if (!ObjectLoader.isLoaded(id)) {
                    throw new Error("Not yet loaded: " + id);
                }
                return byId[id];
            };
            ObjectLoader.isLoaded = function (id) {
                return byId.hasOwnProperty(id);
            };
            // Throws
            ObjectLoader.getFromCache = function (id) {
                if (byId[id]) {
                    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](byId[id]);
                }
                return loadFromCache(id);
            };
            ObjectLoader.load = function (response) {
                var id = getID(response);
                if (byId[id]) {
                    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](byId[id]);
                }
                if (!loading[id]) {
                    loading = __assign({}, loading, (_a = {}, _a[id] = loadFromCache(id).catch(function () { return serverResponseToInstance(response, id); }), _a));
                }
                return loading[id];
                var _a;
            };
            ObjectLoader.get = function (id) {
                if (typeof id === "undefined" || id === null) {
                    throw new Error("Can't get object with id " + id + " - " + cacheName);
                }
                if (byId[id]) {
                    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](byId[id]);
                }
                if (!loading[id]) {
                    var promise = loadFromCache(id)
                        .catch(function () { return download(id).then(function (response) { return serverResponseToInstance(response, id); }); });
                    loading = __assign({}, loading, (_a = {}, _a[id] = promise, _a));
                }
                return loading[id];
                var _a;
            };
            return ObjectLoader;
        }()),
        _b.getAll = function () {
            return byId;
        },
        _b.removeLoaded = function (id) { return delete byId[id]; },
        _b.addLoaded = function (id, obj) {
            byId[id] = obj;
        },
        _b;
    var _b;
}
/* harmony default export */ __webpack_exports__["a"] = (createLoader);
//# sourceMappingURL=cachedObjectLoader.js.map

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
* friendsService
**/

var h = __webpack_require__(6).default;
var Observer = __webpack_require__(16);
var SecuredData = __webpack_require__(26).default;
var Bluebird = __webpack_require__(3);

var socket = __webpack_require__(10).default;
var keyStore = __webpack_require__(34).default;
var initService = __webpack_require__(20);

var friends = [],
    requests = [],
    requested = [],
    ignored = [],
    removed = [],
    deleted = [],
    signedList,
    onlineFriends = {},
    friendsService,
    friendsServiceLoaded = false;

var friendsData = {
	requestsCount: 0,
	friendsCount: 0,
	requestedCount: 0
};

function updateCounters() {
	friendsData.friendsCount = friends.length;
	friendsData.requestsCount = requests.length;
	friendsData.requestedCount = requested.length;
}

function userOnline(uid, status) {
	onlineFriends[uid] = status;
	friendsService.notify(status, "online:" + uid);
}

function createBasicData(ownUser, otherUser) {
	var friendShipKey;

	//encr intermediate key w/ users cryptKey
	return keyStore.sym.asymEncryptKey(ownUser.getFriendsKey(), otherUser.getCryptKey()).then(function (_friendShipKey) {
		friendShipKey = _friendShipKey;
		var mainKey = ownUser.getMainKey();

		signedList.metaSetAttr(otherUser.getID(), friendShipKey);

		return Bluebird.all([SecuredData.load(undefined, {
			user: otherUser.getID()
		}, { type: "friendShip" }).sign(ownUser.getSignKey()), signedList.sign(ownUser.getSignKey()), keyStore.sym.symEncryptKey(friendShipKey, mainKey)]);
	}).spread(function (securedData, signedList) {
		var data = {
			signedList: signedList,
			meta: securedData,
			key: keyStore.upload.getKey(friendShipKey)
		};

		return {
			data: data,
			key: friendShipKey
		};
	});
}

function generateRemovalData(ownUser, otherUser) {
	return Bluebird.try(function () {
		var signedRemovalPromise = SecuredData.load(undefined, {
			initial: removed.indexOf(ownUser.getID()) === -1,
			user: otherUser.getID()
		}, { type: "removeFriend" }).sign(ownUser.getSignKey());

		signedList.metaRemoveAttr(otherUser.getID());

		var signedListPromise = signedList.sign(ownUser.getSignKey());

		return Bluebird.all([signedRemovalPromise, signedListPromise]);
	}).spread(function (signedRemoval, updatedSignedList) {
		return ownUser.generateNewFriendsKey().then(function (result) {
			return {
				signedRemoval: signedRemoval,
				updatedSignedList: updatedSignedList,
				signedKeys: result.updatedSignedKeys,
				newFriendsKey: result.newFriendsKey
			};
		});
	});
}

function addAsFriend(uid) {
	var otherUser,
	    friendShipKey,
	    userService = __webpack_require__(9).default;
	return Bluebird.try(function () {
		return friendsService.awaitLoading();
	}).then(function () {
		return userService.get(uid);
	}).then(function (u) {
		otherUser = u;
		return createBasicData(userService.getOwn(), otherUser);
	}).then(function (result) {
		friendShipKey = result.key;

		var friendsKey = userService.getOwn().getFriendsKey();
		result.data.decryptors = keyStore.upload.getDecryptors([friendsKey], [friendShipKey]);

		return socket.emit("friends.add", result.data);
	}).then(function (result) {
		if (result.success) {
			otherUser.setFriendShipKey(friendShipKey);

			if (result.friends) {
				friends.push(uid);
				h.removeArray(requests, uid);
				friendsService.notify(uid, "new");
			} else {
				requested.push(uid);
				friendsService.notify(uid, "newRequested");
			}

			updateCounters();
		}
	});
}

socket.channel("friendRequest", function (e, requestData) {
	var uid = h.parseDecimal(requestData.uid);
	if (!h.containsOr(uid, requests, friends, requested)) {
		requests.push(uid);
		updateCounters();

		friendsService.notify(uid, "newRequest");
	}
});

socket.channel("friendAccept", function (e, requestData) {
	var uid = h.parseDecimal(requestData.uid);
	if (!h.containsOr(uid, requests, friends)) {
		friends.push(uid);
		h.removeArray(requested, uid);

		updateCounters();

		friendsService.notify(uid, "new");

		userOnline(uid, 2);
	}
});

socket.channel("friendOnlineChange", function (e, requestData) {
	userOnline(requestData.uid, requestData.status);
});

function checkAndRemove(uid) {
	var userService = __webpack_require__(9).default;
	return Bluebird.try(function () {
		return Bluebird.all([userService.get(uid), socket.emit("friends.getSignedData", {
			uid: uid
		})]);
	}).spread(function (user, data) {
		var signedData = data.signedData;
		if (h.parseDecimal(signedData.user) !== userService.getOwn().getID() || signedData.initial === "false") {
			throw new Error("invalid signed removal");
		}

		return SecuredData.load(undefined, signedData, { type: "removeFriend" }).verify(user.getSignKey());
	}).then(function () {
		return friendsService.removeFriend(uid);
	});
}

function removeUnfriendedPersons() {
	var userService = __webpack_require__(9).default;
	return Bluebird.try(function () {
		return userService.getMultiple(removed);
	}).then(function (removedFriends) {
		return removedFriends.reduce(function (previousPromise, friend) {
			return previousPromise.then(function () {
				return checkAndRemove(friend.getID());
			});
		}, Bluebird.resolve());
	});
}

var loadingPromise;

friendsService = {
	isLoaded: function isLoaded() {
		return friendsServiceLoaded;
	},
	ensureIsLoaded: function ensureIsLoaded(method) {
		if (!friendsService.isLoaded()) {
			throw new Error("friends service not yet loaded! Method: " + method);
		}
	},
	awaitLoading: function awaitLoading(cb) {
		return loadingPromise.nodeify(cb);
	},
	getUserFriends: function getUserFriends(uid, cb) {
		return Bluebird.try(function () {
			return socket.emit("friends.getUser", {
				userid: uid
			});
		}).then(function (result) {
			return result.friends;
		}).nodeify(cb);
	},
	removeFriend: function removeFriend(uid, cb) {
		friendsService.ensureIsLoaded("removeFriend");

		if (friends.indexOf(uid) === -1 && removed.indexOf(uid) === -1) {
			throw new Error("not a friend!");
		}

		var userService = __webpack_require__(9).default,
		    circleService = __webpack_require__(199);
		var otherUser,
		    ownUser = userService.getOwn(),
		    userCircles = circleService.inWhichCircles(uid);

		return Bluebird.try(function () {
			return userService.get(uid);
		}).then(function (u) {
			otherUser = u;

			return generateRemovalData(ownUser, otherUser, this);
		}).then(function (result) {
			return socket.emit("friends.remove", {
				uid: uid,
				signedRemoval: result.signedRemoval,
				signedList: result.updatedSignedList,
				signedKeys: result.signedKeys,
				newFriendsKey: keyStore.upload.getKey(result.newFriendsKey)
			});
		}).then(function (result) {
			if (result.success) {
				h.removeArray(friends, uid);
				h.removeArray(removed, uid);

				updateCounters();
				friendsService.notify(uid, "remove");
				userOnline(uid, -1);

				return circleService.loadAll();
			}

			throw new Error("could not remove friends");
		}).then(function () {
			return Bluebird.all(userCircles.map(function (circle) {
				return circle.removePersons([uid]);
			}));
		}).then(function () {
			//update profile for new friendsKey
			return ownUser.rebuildProfiles();
		}).nodeify(cb);
	},
	friendship: function friendship(uid, cb) {
		if (h.containsOr(uid, friends, requested)) {
			return Bluebird.resolve().nodeify(cb);
		}

		return addAsFriend(uid).nodeify(cb);
	},
	ignoreFriendShip: function ignoreFriendShip(uid, cb) {
		return Bluebird.try(function () {
			if (requests.indexOf(uid) > -1 && !h.containsOr(uid, friends, requested)) {
				return socket.emit("friends.ignore", { uid: uid });
			}

			throw new Error("no request Oo");
		}).then(function () {
			ignored.push(uid);
			h.removeArray(requests, uid);
			friendsService.notify(uid, "ignore");
			updateCounters();
		}).nodeify(cb);
	},
	acceptFriendShip: function acceptFriendShip(uid, cb) {
		if (requests.indexOf(uid) > -1 && !h.containsOr(uid, friends)) {
			return addAsFriend(uid).nodeify(cb);
		}
	},
	didIRequest: function didIRequest(uid) {
		friendsService.ensureIsLoaded("didIRequest");

		return h.containsOr(uid, friends, requested);
	},
	didOtherRequest: function didOtherRequest(uid) {
		friendsService.ensureIsLoaded("didOtherRequest");

		return h.containsOr(uid, friends, requests);
	},
	areFriends: function areFriends(uid) {
		friendsService.ensureIsLoaded("areFriends");

		return h.containsOr(uid, friends);
	},
	noRequests: function noRequests(uid) {
		friendsService.ensureIsLoaded("noRequests");

		return !h.containsOr(uid, friends, requested, requests);
	},
	getRequestStatus: function getRequestStatus(uid) {
		friendsService.ensureIsLoaded("getRequestStatus");

		if (friends.indexOf(uid) > -1) {
			return "friends";
		}

		if (requested.indexOf(uid) > -1) {
			return "requested";
		}

		if (requests.indexOf("uid") > -1) {
			return "accept";
		}

		return "request";
	},
	getRequests: function getRequests() {
		friendsService.ensureIsLoaded("getRequests");

		return requests.slice();
	},
	getFriends: function getFriends() {
		friendsService.ensureIsLoaded("getFriends");

		return friends.slice();
	},
	getRequested: function getRequested() {
		friendsService.ensureIsLoaded("getRequested");

		return requested.slice();
	},
	getUserFriendShipKey: function getUserFriendShipKey(uid) {
		friendsService.ensureIsLoaded("getUserFriendShipKey");

		return signedList.metaAttr(uid);
	},
	getUserForKey: function getUserForKey(realid) {
		friendsService.ensureIsLoaded("getUserForKey");

		var meta = signedList.metaGet(),
		    result;
		h.objectEach(meta, function (key, value) {
			if (value === realid) {
				result = h.parseDecimal(key);
			}
		});

		return result;
	},
	getAllFriendShipKeys: function getAllFriendShipKeys() {
		friendsService.ensureIsLoaded("getAllFriendShipKeys");

		var meta = signedList.metaGet(),
		    keys = [];
		h.objectEach(meta, function (key, value) {
			if (h.isInt(key)) {
				keys.push(value);
			}
		});

		return keys;
	},
	load: function load() {
		var userService = __webpack_require__(9).default;

		return socket.definitlyEmit("friends.all", {}).then(function (data) {
			friends = data.friends.map(h.parseDecimal);
			requests = data.requests.map(h.parseDecimal);
			requested = data.requested.map(h.parseDecimal);
			ignored = data.ignored.map(h.parseDecimal);
			removed = data.removed.map(h.parseDecimal);
			deleted = data.deleted.map(h.parseDecimal);

			updateCounters();

			signedList = SecuredData.load(undefined, data.signedList || {}, { type: "signedFriendList" });

			var requestedOrFriends = signedList.metaKeys().map(h.parseDecimal);
			if (!h.arrayEqual(requestedOrFriends, requested.concat(friends).concat(removed).concat(deleted))) {
				throw new Error("unmatching arrays");
			}

			return userService.getOwnAsync().thenReturn(data);
		}).then(function (data) {
			if (data.signedList) {
				return signedList.verify(userService.getOwn().getSignKey(), "user");
			}
		}).then(function () {
			friendsServiceLoaded = true;

			var requestedOrFriends = signedList.metaKeys().map(h.parseDecimal);
			requestedOrFriends.forEach(function (uid) {
				keyStore.security.addEncryptionIdentifier(signedList.metaAttr(uid));
			});

			if (removed.length > 0) {
				return removeUnfriendedPersons();
			}
		});
	},
	onlineStatus: function onlineStatus(uid) {
		if (friends.indexOf(uid) === -1) {
			return -1;
		}

		return onlineFriends[uid] || 0;
	},
	data: friendsData
};

Observer.extend(friendsService);

loadingPromise = initService.awaitLoading().then(function () {
	return friendsService.load();
});

initService.awaitLoading().then(function () {
	return Bluebird.delay(500);
}).then(function () {
	return socket.definitlyEmit("friends.getOnline", {});
}).then(function (data) {
	h.objectEach(data.online, function (uid, status) {
		userOnline(uid, status);
	});
});

socket.channel("notify.signedList", function (e, data) {
	if (signedList.metaAttr("_signature") !== data._signature) {
		var userService = __webpack_require__(9).default;
		var updatedSignedList = SecuredData.load(undefined, data, { type: "signedFriendList" });

		Bluebird.try(function () {
			return updatedSignedList.verify(userService.getOwn().getSignKey(), null, "user");
		}).then(function () {
			signedList = updatedSignedList;
		});
	}
});

module.exports = friendsService;

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_mutableObjectLoader__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chatChunk__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_Cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_keyStore_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__asset_observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_settings_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_session_service__ = __webpack_require__(19);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};











var initService = __webpack_require__(20);
var messageSendCache = new __WEBPACK_IMPORTED_MODULE_6__services_Cache__["default"]("unsentMessages", { maxEntries: -1, maxBlobSize: -1 });
var unreadChatIDs = [];
var addAfterTime = function (arr, id, time) {
    var firstLaterIndex = arr.findIndex(function (ele) { return ele.time > time; });
    if (firstLaterIndex === -1) {
        return arr.concat([
            { id: id, time: time }
        ]);
    }
    return arr.slice(0, firstLaterIndex).concat([
        { id: id, time: time }
    ], arr.slice(firstLaterIndex));
};
var getUnstoredMessages = function () {
    var messagesMap = __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].getAll() || {};
    var messages = Object.keys(messagesMap).map(function (id) { return messagesMap[id]; });
    return messages.filter(function (m) { return !m.hasBeenSent(); }).filter(function (m) { return m.hasAttachments(); });
};
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "Unsent files and images. Leave page anyway?";
    if (getUnstoredMessages().length > 0) {
        var event_1 = e || window.event;
        event_1.returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    }
    return;
});
var verifyMessageAssociations = function (message, latestChunkID) {
    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
        __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].get(message.getChunkID()),
        __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].get(latestChunkID),
    ]).then(function (_a) {
        var messageChunk = _a[0], latestChunk = _a[1];
        message.verifyParent(messageChunk);
        return __WEBPACK_IMPORTED_MODULE_3__chatChunk__["a" /* Chunk */].loadChunkChain(latestChunk, messageChunk).thenReturn([latestChunk, messageChunk]);
    }).then(function (_a) {
        var latestChunk = _a[0], messageChunk = _a[1];
        latestChunk.ensureChunkChain(messageChunk);
    });
};
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat(_a, draft) {
        var id = _a.id, latestMessage = _a.latestMessage, latestChunk = _a.latestChunk, unreadMessageIDs = _a.unreadMessageIDs;
        var _this = _super.call(this) || this;
        //Sorted IDs
        _this.messages = [];
        _this.chatUpdates = [];
        _this.chunkIDs = [];
        _this.loadMissingMessagesPromise = __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
        _this.waitingMissingMessages = false;
        // Unsorted IDs
        _this.unreadMessageIDs = [];
        _this.draft = false;
        _this.newMessage = "";
        _this.getInfo = function () { return ({
            id: _this.id,
            unreadMessageIDs: _this.unreadMessageIDs,
            latestMessageID: _this.getLatestSentMessage(),
            latestChunkID: _this.getLatestChunk()
        }); };
        _this.store = function () {
            if (_this.draft) {
                return;
            }
            var storeInfo = _this.getInfo();
            if (__WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].deepEqual(_this.lastStoredInfo, storeInfo)) {
                return;
            }
            _this.lastStoredInfo = storeInfo;
            ChatLoader.updateCache(_this.id, storeInfo);
        };
        _this.create = function (_a) {
            var id = _a.id, latestChunkID = _a.latestChunkID;
            _this.draft = false;
            _this.id = id;
            _this.chunkIDs = [latestChunkID];
            ChatLoader.addLoaded(id, _this);
            ChatLoader.removeLoaded(-1);
        };
        _this.isBlocked = function () {
            if (_this.getReceiverIDs.length > 2) {
                return false;
            }
            var otherReceiver = _this.getReceiverIDs().find(function (id) { return id !== __WEBPACK_IMPORTED_MODULE_10__services_session_service__["default"].getUserID(); });
            return __WEBPACK_IMPORTED_MODULE_9__services_settings_service__["default"].isBlocked(otherReceiver);
        };
        _this.update = function (_a) {
            var latestChunk = _a.latestChunk, latestMessage = _a.latestMessage, unreadMessageIDs = _a.unreadMessageIDs;
            _this.unreadMessageIDs = unreadMessageIDs;
            _this.addChunkID(latestChunk.getID(), false);
            if (latestMessage) {
                _this.addMessage(latestMessage, false);
            }
        };
        _this.getID = function () {
            return _this.id;
        };
        _this.isMessageUnread = function (message) {
            return _this.unreadMessageIDs.indexOf(message.getClientID()) > -1;
        };
        _this.removeMessageID = function (removeID) {
            _this.messages = _this.messages.filter(function (_a) {
                var id = _a.id;
                return removeID !== id;
            });
        };
        _this.addMessage = function (message, updateCache) {
            if (updateCache === void 0) { updateCache = true; }
            _this.addMessageID(message.getClientID(), message.getTime(), updateCache);
            _this.scheduleLoadMissingMessages();
        };
        _this.addMessageID = function (id, time, updateCache) {
            if (updateCache === void 0) { updateCache = true; }
            var alreadyAdded = _this.messages.find(function (message) { return message.id === id; });
            if (alreadyAdded) {
                return;
            }
            _this.messages = addAfterTime(_this.messages, id, time);
            if (updateCache) {
                _this.store();
            }
        };
        _this.verifyMessageAssociations = function (message) {
            return verifyMessageAssociations(message, __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].array.last(_this.chunkIDs));
        };
        _this.addChunkID = function (chunkID, updateCache) {
            if (updateCache === void 0) { updateCache = true; }
            if (_this.chunkIDs.indexOf(chunkID) > -1) {
                return;
            }
            _this.chunkIDs = _this.chunkIDs.concat([chunkID]).sort(function (a, b) { return a - b; });
            if (updateCache) {
                _this.store();
            }
        };
        _this.hasMessage = function (id) {
            return _this.messages.find(function (message) { return message.id === id; });
        };
        _this.loadPreviousMessagesFromCache = function (message, limit) {
            if (limit === void 0) { limit = 20; }
            var messagesLoaded = [];
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
                var currentMessage, i, previousMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentMessage = message;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < limit)) return [3 /*break*/, 5];
                            if (!currentMessage.getPreviousID()) {
                                return [2 /*return*/, messagesLoaded];
                            }
                            return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].getFromCache(currentMessage.getPreviousID())];
                        case 2:
                            previousMessage = _a.sent();
                            return [4 /*yield*/, this.verifyMessageAssociations(previousMessage)];
                        case 3:
                            _a.sent();
                            if (this.hasMessage(previousMessage.getClientID())) {
                                return [2 /*return*/, messagesLoaded];
                            }
                            messagesLoaded.push(previousMessage);
                            currentMessage = previousMessage;
                            _a.label = 4;
                        case 4:
                            i += 1;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, messagesLoaded];
                    }
                });
            }); }).catch(function () { return messagesLoaded; }).then(function (messages) {
                messages.forEach(function (m) { return _this.addMessage(m); });
                return messages;
            });
        };
        _this.loadMissingMessages = function () {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var batchSizes, iteration, batchSize, _loop_1, this_1, state_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            batchSizes = [1, 3, 10, 20];
                            iteration = 0;
                            _loop_1 = function () {
                                var knownMessages, ids, messagesWithoutPredecessor;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            knownMessages = this_1.messages
                                                .map(function (_a) {
                                                var id = _a.id;
                                                return __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].getLoaded(id);
                                            })
                                                .filter(function (m) { return m.hasBeenSent(); });
                                            if (knownMessages.length < 2) {
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            ids = knownMessages.map(function (m) { return m.getClientID(); });
                                            messagesWithoutPredecessor = knownMessages.filter(function (m) {
                                                return ids.indexOf(m.getPreviousID()) === -1;
                                            }).sort(function (a, b) { return a.getTime() - b.getTime(); });
                                            if (knownMessages.filter(function (m) { return !m.getPreviousID(); }).length > 1) {
                                                console.warn("Got more than one last message in chat. Aborting!");
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            if (messagesWithoutPredecessor.length === 1) {
                                                console.warn("No more missing messages");
                                                return [2 /*return*/, { value: void 0 }];
                                            }
                                            console.warn("Loading batch size " + batchSize + " messages. Missing " + messagesWithoutPredecessor.length);
                                            return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](messagesWithoutPredecessor.map(function (m) {
                                                    return _this.loadOlderMessages(m, batchSize);
                                                }))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _a.label = 1;
                        case 1:
                            if (!(batchSize = batchSizes[iteration++])) return [3 /*break*/, 3];
                            return [5 /*yield**/, _loop_1()];
                        case 2:
                            state_1 = _a.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        };
        // TODO: Check if this leaks memory
        _this.scheduleLoadMissingMessages = function () {
            if (_this.messages.length < 2) {
                return;
            }
            if (_this.waitingMissingMessages) {
                return;
            }
            _this.waitingMissingMessages = true;
            console.warn("Scheduling missing message check");
            _this.loadMissingMessagesPromise = _this.loadMissingMessagesPromise
                .delay(50)
                .finally(function () {
                _this.waitingMissingMessages = false;
                return _this.loadMissingMessages();
            });
            return _this.loadMissingMessagesPromise;
        };
        _this.loadInitialMessages = __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].cacheResult(function () { return _this.loadMoreMessages(); });
        _this.getUnreadMessageIDs = function () {
            return _this.unreadMessageIDs;
        };
        _this.isAdmin = function (user) {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return latestChunk.isAdmin(user);
        };
        _this.amIAdmin = function () {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return !_this.isDraft() && latestChunk.amIAdmin();
        };
        _this.getReceivers = function () {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return latestChunk.getReceivers();
        };
        _this.getReceiverIDs = function () {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return latestChunk.getReceiverIDs();
        };
        _this.getTitle = function () {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return latestChunk.getTitle();
        };
        _this.getPartners = function () {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return latestChunk.getPartners();
        };
        _this.removeReceiver = function (receiver) {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            var oldReceiverIDs = latestChunk.getReceiver();
            var newReceiverIDs = oldReceiverIDs.filter(function (id) { return id !== receiver.getID(); });
            return _this.createSuccessor(newReceiverIDs, {});
        };
        _this.addAdmin = function (receiver) {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            var adminIDs = latestChunk.getAdmins();
            if (adminIDs.indexOf(receiver.getID()) > -1) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
            }
            return _this.setAdmins(adminIDs.concat([receiver.getID()]));
        };
        _this.getAdmins = function () {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return latestChunk.getAdmins();
        };
        _this.setAdmins = function (admins) {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return _this.createSuccessor(latestChunk.getReceiver(), { admins: admins });
        };
        _this.addReceivers = function (newReceiverIDs, canReadOldMessages) {
            if (canReadOldMessages === void 0) { canReadOldMessages = false; }
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            var oldReceivers = latestChunk.getReceiver();
            return _this.createSuccessor(oldReceivers.concat(newReceiverIDs), { canReadOldMessages: canReadOldMessages });
        };
        _this.loadAllChunks = function () {
            return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("chat.getChunks", { id: _this.id }).then(function (_a) {
                var chunks = _a.chunks;
                return chunks;
            }).map(function (chunk) {
                return __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].load(chunk);
            });
        };
        _this.encryptAllChunksForReceiver = function (chunkData, addedReceiver) {
            return _this.loadAllChunks().then(function (chunks) {
                chunks.sort(function (c1, c2) { return c1.getID() - c2.getID(); });
                chunks.forEach(function (chunk, index) {
                    if (chunks[index + 1] && chunks[index + 1].getPredecessorID() !== chunk.getID()) {
                        throw new Error("chunk chain invalid");
                    }
                });
                var receiverKeys = addedReceiver.map(function (receiver) {
                    return chunkData.receiverKeys[receiver];
                });
                var chunkKeys = chunks.map(function (chunk) { return chunk.getSecuredData().metaAttr("_key"); }).filter(function (value, index, self) {
                    return self.indexOf(value) === index;
                });
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](receiverKeys.map(function (receiverKey) {
                    return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](chunkKeys.map(function (chunkKey) {
                        return __WEBPACK_IMPORTED_MODULE_7__services_keyStore_service__["default"].sym.symEncryptKey(chunkKey, receiverKey);
                    }));
                })).thenReturn([chunkKeys, receiverKeys]);
            }).then(function (_a) {
                var chunkKeys = _a[0], receiverKeys = _a[1];
                return __assign({}, chunkData, { previousChunksDecryptors: __WEBPACK_IMPORTED_MODULE_7__services_keyStore_service__["default"].upload.getDecryptors(chunkKeys, receiverKeys) });
            });
        };
        _this.createSuccessor = function (receiver, options) {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            var _a = options.canReadOldMessages, canReadOldMessages = _a === void 0 ? false : _a, _b = options.title, title = _b === void 0 ? latestChunk.getTitle() : _b, _c = options.admins, admins = _c === void 0 ? latestChunk.getAdmins() : _c;
            if (!latestChunk.amIAdmin()) {
                throw new Error("Not an admin of this chunk");
            }
            var addedReceiver = receiver.filter(function (id) { return latestChunk.getReceiver().indexOf(id) === -1; });
            var removedReceiver = latestChunk.getReceiver().filter(function (id) { return receiver.indexOf(id) === -1; });
            if (removedReceiver.length > 0 && canReadOldMessages) {
                throw new Error("Can not remove receiver and allow reading of old messages");
            }
            return latestChunk.getSuccessor().then(function (successor) {
                if (successor) {
                    throw new Error("TODO: Chunk has a successor. Try again?");
                }
                var content = { title: title };
                var meta = { admins: admins };
                var newKey = addedReceiver.length > 0 || removedReceiver.length > 0;
                return __WEBPACK_IMPORTED_MODULE_3__chatChunk__["a" /* Chunk */].createRawData(receiver, {
                    content: content,
                    meta: meta,
                    predecessorChunk: latestChunk,
                    givenKey: !newKey && latestChunk ? latestChunk.getKey() : null
                });
            }).then(function (chunkData) {
                if (!canReadOldMessages || addedReceiver.length === 0) {
                    return chunkData;
                }
                return _this.encryptAllChunksForReceiver(chunkData, addedReceiver);
            }).then(function (_a) {
                var chunk = _a.chunk, keys = _a.keys, receiverKeys = _a.receiverKeys, previousChunksDecryptors = _a.previousChunksDecryptors;
                return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("chat.chunk.create", {
                    predecessorID: latestChunk.getID(),
                    chunk: chunk,
                    keys: keys,
                    receiverKeys: receiverKeys,
                    previousChunksDecryptors: previousChunksDecryptors,
                    canReadOldMessages: canReadOldMessages
                });
            }).then(function (response) {
                return __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].load(response.chunk);
            }).then(function (chunk) {
                _this.addChunkID(chunk.getID());
            });
        };
        _this.setTitle = function (title) {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].getLoaded(_this.getLatestChunk());
            return _this.createSuccessor(latestChunk.getReceiverIDs(), { title: title });
        };
        _this.sendUnsentMessage = function (messageData, files) {
            if (files.length > 0) {
                return;
            }
            return _this.sendMessage(messageData.message, { images: [], files: [], voicemails: [] }, messageData.id);
        };
        _this.storeMessage = function (messageObject, message, id) {
            if (id) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
            }
            if (_this.draft) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
            }
            if (messageObject.hasAttachments()) {
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
            }
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
                return messageSendCache.store(messageObject.getClientID(), {
                    chatID: _this.getID(),
                    id: messageObject.getClientID(),
                    message: message
                });
            });
        };
        _this.isDraft = function () { return _this.draft; };
        _this.sendMessage = function (message, attachments, id) {
            var messageObject = new __WEBPACK_IMPORTED_MODULE_4__message__["a" /* Message */](message, _this, attachments, id);
            return _this.storeMessage(messageObject, message, id).finally(function () {
                var sendMessagePromise = messageObject.sendContinously();
                sendMessagePromise.then(function () {
                    _this.removeMessageID(messageObject.getClientID());
                    _this.addMessage(messageObject);
                    return messageSendCache.delete(messageObject.getClientID());
                });
                sendMessagePromise.catch(function (e) {
                    console.error(e);
                    alert("An error occured sending a message!" + e.toString());
                });
                __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].addLoaded(messageObject.getClientID(), messageObject);
                _this.addMessageID(messageObject.getClientID(), Number.MAX_SAFE_INTEGER);
                return sendMessagePromise;
            });
        };
        _this.id = id;
        _this.draft = draft;
        _this.update({ latestChunk: latestChunk, latestMessage: latestMessage, unreadMessageIDs: unreadMessageIDs });
        return _this;
    }
    Chat.prototype.isUnread = function () {
        return unreadChatIDs.indexOf(this.id) > -1;
    };
    Chat.prototype.loadOlderMessages = function (message, limit) {
        var _this = this;
        if (limit === void 0) { limit = 20; }
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var messagesFromCache, _a, messages, _b, chunks, remainingMessagesCount, messagesObjects;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!message) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadPreviousMessagesFromCache(message, limit)];
                    case 1:
                        messagesFromCache = _c.sent();
                        limit -= messagesFromCache.length;
                        if (limit < 1) {
                            return [2 /*return*/];
                        }
                        if (messagesFromCache.length > 0) {
                            message = __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].array.last(messagesFromCache);
                        }
                        _c.label = 2;
                    case 2: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].definitlyEmit("chat.getMessages", {
                            id: this.getID(),
                            oldestKnownMessage: message ? message.getServerID() : 0,
                            limit: limit
                        })];
                    case 3:
                        _a = _c.sent(), messages = _a.messages, _b = _a.chunks, chunks = _b === void 0 ? [] : _b, remainingMessagesCount = _a.remainingMessagesCount;
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](chunks.map(function (chunk) { return __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].load(chunk); }))];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](messages.map(function (message) { return __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].load(message); }))];
                    case 5:
                        messagesObjects = _c.sent();
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](messagesObjects.map(function (message) { return _this.verifyMessageAssociations(message); }))];
                    case 6:
                        _c.sent();
                        messagesObjects.forEach(function (message) {
                            return _this.addMessage(message);
                        });
                        return [2 /*return*/, remainingMessagesCount];
                }
            });
        }); });
    };
    Chat.prototype.loadMoreMessages = function () {
        if (this.draft) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](0);
        }
        var oldestKnownMessage = this.messages.length === 0 ? null : __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].getLoaded(this.messages[0].id);
        return this.loadOlderMessages(oldestKnownMessage);
    };
    Chat.prototype.getMessages = function () {
        return this.messages;
    };
    Chat.prototype.getChatUpdates = function () {
        return this.chatUpdates;
    };
    Chat.prototype.getLatestChatUpdate = function () {
        if (this.chatUpdates.length > 0) {
            return __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].array.last(this.chatUpdates).id;
        }
    };
    Chat.prototype.getLatestChunk = function () {
        return __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].array.last(this.chunkIDs);
    };
    Chat.prototype.getLatestMessage = function () {
        if (this.messages.length > 0) {
            return __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].array.last(this.messages).id;
        }
    };
    Chat.prototype.getLatestSentMessage = function () {
        var messages = this.messages.map(function (_a) {
            var id = _a.id;
            return __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].getLoaded(id);
        }).filter(function (m) { return m.hasBeenSent(); });
        if (messages.length > 0) {
            return __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].array.last(messages).getClientID();
        }
    };
    Chat.prototype.localMarkRead = function () {
        var _this = this;
        if (this.unreadMessageIDs.length === 0 && unreadChatIDs.indexOf(this.id) === -1) {
            return;
        }
        this.unreadMessageIDs = [];
        unreadChatIDs = unreadChatIDs.filter(function (id) { return id !== _this.id; });
        this.notify(this.getID(), "read");
        this.store();
    };
    Chat.prototype.markRead = function () {
        this.localMarkRead();
        if (this.draft) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"]();
        }
        return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].definitlyEmit("chat.markRead", { id: this.id });
    };
    Chat.prototype.addUnreadMessage = function (id) {
        if (this.unreadMessageIDs.indexOf(id) === -1) {
            this.unreadMessageIDs.push(id);
        }
        if (unreadChatIDs.indexOf(this.id) === -1) {
            unreadChatIDs.push(this.id);
        }
        this.store();
    };
    Chat.getUnreadChatIDs = function () {
        return unreadChatIDs;
    };
    return Chat;
}(__WEBPACK_IMPORTED_MODULE_8__asset_observer__["default"]));

var loadChatInfo = function (ids) {
    return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].definitlyEmit("chat.getMultiple", { ids: ids })
        .then(function (_a) {
        var chats = _a.chats;
        return ids.map(function (id) { return chats.find(function (_a) {
            var chat = _a.chat;
            return chat.id === id;
        }); });
    });
};
var getChatInfo = __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].delayMultiplePromise(__WEBPACK_IMPORTED_MODULE_0_bluebird__, 50, loadChatInfo, 10);
var ChatLoader = (function (_super) {
    __extends(ChatLoader, _super);
    function ChatLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChatLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_2__services_mutableObjectLoader__["c" /* default */])({
    download: function (id) {
        return getChatInfo(id).then(function (chatInfo) {
            if (chatInfo.chat.id !== id) {
                throw new Error("fail");
            }
            return chatInfo;
        });
    },
    load: function (chatResponse, previousInstance) {
        if (previousInstance && __WEBPACK_IMPORTED_MODULE_5__helper_helper__["default"].deepEqual(previousInstance.getInfo(), chatResponse.chat)) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](__WEBPACK_IMPORTED_MODULE_2__services_mutableObjectLoader__["a" /* SYMBOL_UNCHANGED */]);
        }
        var loadChunks = __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](chatResponse.chunks.map(function (chunkData) {
            return __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].load(chunkData);
        }));
        var loadMessages = __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](chatResponse.messages.map(function (messageData) {
            return __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].load(messageData);
        }));
        var _a = chatResponse.chat, id = _a.id, latestMessageID = _a.latestMessageID, latestChunkID = _a.latestChunkID, unreadMessageIDs = _a.unreadMessageIDs;
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
            loadChunks,
            loadMessages,
        ]).thenReturn({ id: id, latestMessageID: latestMessageID, latestChunkID: latestChunkID, unreadMessageIDs: unreadMessageIDs });
    },
    getID: function (response) { return response.chat.id; },
    restore: function (chatInfo, previousInstance) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return __awaiter(this, void 0, void 0, function () {
                var id, latestMessageID, latestChunkID, unreadMessageIDs, latestMessage, _a, latestChunk;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = chatInfo.id, latestMessageID = chatInfo.latestMessageID, latestChunkID = chatInfo.latestChunkID, unreadMessageIDs = chatInfo.unreadMessageIDs;
                            if (!latestMessageID) return [3 /*break*/, 2];
                            return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4__message__["b" /* default */].get(latestMessageID)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = null;
                            _b.label = 3;
                        case 3:
                            latestMessage = _a;
                            return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3__chatChunk__["b" /* default */].get(latestChunkID)];
                        case 4:
                            latestChunk = _b.sent();
                            if (!latestMessage) return [3 /*break*/, 6];
                            return [4 /*yield*/, verifyMessageAssociations(latestMessage, latestChunk.getID())];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6:
                            if (previousInstance) {
                                previousInstance.update({ unreadMessageIDs: unreadMessageIDs, latestMessage: latestMessage, latestChunk: latestChunk });
                                return [2 /*return*/, previousInstance];
                            }
                            return [2 /*return*/, new Chat({
                                    id: id,
                                    latestMessage: latestMessage,
                                    latestChunk: latestChunk,
                                    unreadMessageIDs: unreadMessageIDs
                                })];
                    }
                });
            });
        });
    },
    shouldUpdate: function (event, instance) { return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](!instance.isDraft()); },
    cacheName: "chat"
})));
/* harmony default export */ __webpack_exports__["b"] = (ChatLoader);
var lastLoaded = 0;
var setUnreadChatIDs = function (unreadIDs) {
    var chats = ChatLoader.getAll();
    Object.keys(chats).forEach(function (id) {
        var chat = chats[id].instance;
        if (unreadIDs.indexOf(chat.getID()) !== -1) {
            return;
        }
        chat.localMarkRead();
    });
    unreadChatIDs = unreadIDs;
};
__WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].channel("unreadChats", function (e, data) {
    if (e) {
        console.warn(e);
    }
    if (!data.unreadChatIDs) {
        console.warn("got no chat ids from socket channel");
        return;
    }
    setUnreadChatIDs(data.unreadChatIDs);
});
var loadUnreadChatIDs = function () {
    if (new Date().getTime() - lastLoaded < 5 * 1000) {
        return;
    }
    return initService.awaitLoading().then(function () {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["delay"](500);
    }).then(function () {
        return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].awaitConnection();
    }).then(function () {
        return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("chat.getUnreadIDs", {});
    }).then(function (data) {
        if (!data.chatIDs) {
            console.warn("got no chat ids from socket request");
            return;
        }
        setUnreadChatIDs(data.chatIDs);
    });
};
__WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].on("connect", function () {
    loadUnreadChatIDs();
});
initService.listen(function () {
    loadUnreadChatIDs();
}, "initDone");
//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chunk; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asset_observer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asset_securedDataWithMetaData__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_cachedObjectLoader__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chatTitleUpdate__ = __webpack_require__(444);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;

var validator = __webpack_require__(198);



var debug = __webpack_require__(15);
var userService = __webpack_require__(9).default;


var keyStore = __webpack_require__(34).default;
var sessionService = __webpack_require__(19).default;

var debugName = "whispeer:chunk";
var chunkDebug = debug(debugName);
var CHUNK_SECURED_DATA_OPTIONS = {
    type: "topic",
    alternativeType: "chatChunk" // Allow for chatChunk already
};
var Chunk = (function (_super) {
    __extends(Chunk, _super);
    function Chunk(_a, chunkData) {
        var content = _a.content, server = _a.server, meta = _a.meta, receiverObjects = _a.receiverObjects;
        var _this = _super.call(this) || this;
        _this.chunkData = chunkData;
        _this.title = "";
        _this.create = function (_a) {
            var _b = _a.server, id = _b.id, chatID = _b.chatID;
            _this.id = id;
            _this.chatID = chatID;
            ChunkLoader.addLoaded(id, _this);
            ChunkLoader.removeLoaded(-1);
        };
        _this.getChatID = function () { return _this.chatID; };
        _this.getSecuredData = function () {
            return _this.securedData;
        };
        _this.getHash = function () {
            return _this.securedData.getHash();
        };
        _this.getID = function () {
            return __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal(_this.id);
        };
        _this.getTime = function () {
            if (_this.createTime) {
                return _this.createTime;
            }
            return _this.getSecuredData().metaAttr("createTime");
        };
        _this.getKey = function () {
            return _this.securedData.metaAttr("_key");
        };
        _this.setLatestTitleUpdate = function (titleUpdate) {
            _this.titleUpdate = titleUpdate;
        };
        _this.ensureChunkChain = function (predecessor) {
            if (_this.getID() === predecessor.getID()) {
                return;
            }
            var predecessorID = _this.getPredecessorID();
            if (!predecessorID || !ChunkLoader.isLoaded(predecessorID)) {
                throw new Error("Chunk chain broken " + predecessorID);
            }
            var predecessorChunk = ChunkLoader.getLoaded(predecessorID);
            predecessorChunk.verifyParent(_this);
            predecessorChunk.ensureChunkChain(predecessor);
        };
        _this.verifyParent = function (chunk) {
            chunk.getSecuredData().checkParent(_this.getSecuredData());
        };
        _this.getReceivers = function () {
            return _this.receiverObjects;
        };
        _this.getPartners = function () {
            return _this.receiverObjects.filter(function (receiverObject) {
                return !receiverObject.user.isOwn() || _this.receiverObjects.length === 1;
            });
        };
        _this.getPartnerDisplay = function (maxDisplay) {
            if (maxDisplay === void 0) { maxDisplay = 3; }
            var partners = _this.getPartners();
            if (partners.length <= maxDisplay) {
                return partners;
            }
            return partners.slice(0, maxDisplay - 1);
        };
        _this.getReceiver = function () {
            return _this.receiver;
        };
        _this.getAdmins = function () {
            return _this.admins;
        };
        _this.getReceiverIDs = function () {
            return _this.receiver;
        };
        _this.getTitle = function () {
            if (_this.titleUpdate) {
                return _this.titleUpdate.state.title;
            }
            return _this.title;
        };
        _this.setTitle = function (title) {
            _this.title = title;
        };
        _this.isAdmin = function (user) {
            return _this.getAdmins().indexOf(user.getID()) > -1;
        };
        _this.amIAdmin = function () {
            return _this.isAdmin(userService.getOwn());
        };
        _this.getCreator = function () {
            return __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal(_this.securedData.metaAttr("creator"));
        };
        _this.hasPredecessor = function () {
            return !!_this.predecessorID;
        };
        _this.getPredecessorID = function () {
            if (!_this.hasPredecessor()) {
                return null;
            }
            return __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal(_this.predecessorID);
        };
        _this.getPredecessor = function () {
            if (!_this.hasPredecessor()) {
                return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"](null);
            }
            return ChunkLoader.get(_this.getPredecessorID()).catch(function (err) {
                console.log(err);
                return null;
            }, __WEBPACK_IMPORTED_MODULE_4__services_socket_service__["default"].errors.Server);
        };
        _this.setSuccessor = function (successorID) {
            _this.successorID = successorID;
            chunkDebug("Set successor of chunk ", _this.getID(), " succ: ", successorID);
            _this.notify({ successorID: successorID }, "successor");
        };
        _this.hasKnownSuccessor = function () {
            return !!_this.successorID;
        };
        _this.getLoadedSuccessor = function () {
            if (!_this.hasKnownSuccessor()) {
                return;
            }
            return ChunkLoader.getLoaded(_this.successorID);
        };
        _this.getSuccessor = function () {
            if (_this.successorID) {
                return ChunkLoader.get(_this.successorID);
            }
            return __WEBPACK_IMPORTED_MODULE_4__services_socket_service__["default"].emit("chat.chunk.successor", { id: _this.getID() }).then(function (response) {
                if (!response.chunk) {
                    return;
                }
                return ChunkLoader.load(response.chunk).then(function (successorChunk) {
                    if (successorChunk.getPredecessorID() !== _this.getID()) {
                        throw new Error("server returned invalid successor chunk");
                    }
                    return successorChunk;
                });
            });
        };
        var err = validator.validate("topic", meta);
        if (err) {
            throw err;
        }
        meta.receiver.sort();
        _this.securedData = __WEBPACK_IMPORTED_MODULE_2__asset_securedDataWithMetaData__["default"].createRaw(content, meta, CHUNK_SECURED_DATA_OPTIONS);
        _this.id = server.id;
        _this.chatID = server.chatID;
        _this.predecessorID = server.predecessorID;
        _this.createTime = server.createTime;
        _this.receiver = _this.securedData.metaAttr("receiver").map(__WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal);
        var metaAdmins = _this.securedData.metaAttr("admins");
        var creator = _this.securedData.metaAttr("creator");
        _this.admins = (metaAdmins ? metaAdmins : [creator]).map(__WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal);
        if (_this.securedData.hasContent()) {
            _this.title = _this.securedData.contentGet().title;
        }
        else {
            _this.title = "";
        }
        _this.receiverObjects = receiverObjects;
        var predecessorID = _this.getPredecessorID();
        if (predecessorID && ChunkLoader.isLoaded(predecessorID)) {
            ChunkLoader.getLoaded(predecessorID).setSuccessor(_this.getID());
        }
        return _this;
    }
    Chunk.loadChunkChain = function (newChunk, oldChunk) {
        if (newChunk.getID() === oldChunk.getID()) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"]();
        }
        if (newChunk.getPredecessorID() === oldChunk.getID()) {
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["resolve"]();
        }
        return newChunk.getPredecessor().then(function (pred) {
            if (!pred) {
                return;
            }
            if (pred.getID() === oldChunk.getID()) {
                return;
            }
            return Chunk.loadChunkChain(pred, oldChunk);
        });
    };
    Chunk.createRawData = function (receiver, _a) {
        var _this = this;
        var _b = _a.content, content = _b === void 0 ? {} : _b, _c = _a.meta, meta = _c === void 0 ? {} : _c, givenKey = _a.givenKey, predecessorChunk = _a.predecessorChunk;
        return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var receiverIDs, receiverObjects, receiverObjectsExceptOwn, givenInfo, _a, cryptInfo, chunkKey, _b, chunkMeta, secured, cData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        receiverIDs = receiver.map(function (val) { return __WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal(val); });
                        if (receiverIDs.indexOf(sessionService.getUserID()) === -1) {
                            receiverIDs.push(sessionService.getUserID());
                        }
                        return [4 /*yield*/, userService.getMultiple(receiverIDs)];
                    case 1:
                        receiverObjects = _c.sent();
                        receiverObjectsExceptOwn = receiverObjects.filter(function (receiver) { return !receiver.isOwn(); });
                        givenInfo = { cryptInfo: { receiverKeys: {}, keys: [] }, chunkKey: givenKey };
                        if (!givenKey) return [3 /*break*/, 2];
                        _b = givenInfo;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Chunk.cryptInfo(receiverObjectsExceptOwn)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        _a = _b, cryptInfo = _a.cryptInfo, chunkKey = _a.chunkKey;
                        receiverIDs.sort();
                        chunkMeta = __assign({}, meta, { createTime: new Date().getTime(), receiver: receiverIDs, creator: userService.getOwn().getID() });
                        secured = __WEBPACK_IMPORTED_MODULE_2__asset_securedDataWithMetaData__["default"].createRaw(content, chunkMeta, { type: "topic" });
                        if (predecessorChunk) {
                            secured.setParent(predecessorChunk.getSecuredData());
                        }
                        return [4 /*yield*/, secured.signAndEncrypt(userService.getOwn().getSignKey(), chunkKey)];
                    case 5:
                        cData = _c.sent();
                        return [2 /*return*/, Object.assign({
                                chunk: cData,
                            }, cryptInfo)];
                }
            });
        }); });
    };
    ;
    Chunk.createChunkKey = function () {
        return keyStore.sym.generateKey(null, "chunkMain").then(function (chunkKey) {
            return keyStore.sym.symEncryptKey(chunkKey, userService.getOwn().getMainKey()).thenReturn(chunkKey);
        });
    };
    Chunk.cryptInfo = function (receiverObjectsExceptOwn) { return __awaiter(_this, void 0, void 0, function () {
        var receiverKeys, chunkKey, cryptKeys, cryptKeysData, cryptInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    receiverKeys = {};
                    return [4 /*yield*/, Chunk.createChunkKey()];
                case 1:
                    chunkKey = _a.sent();
                    return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"](receiverObjectsExceptOwn.map(function (receiverObject) {
                            var crypt = receiverObject.getCryptKey();
                            return keyStore.sym.asymEncryptKey(chunkKey, crypt);
                        }))];
                case 2:
                    cryptKeys = _a.sent();
                    cryptKeysData = keyStore.upload.getKeys(cryptKeys);
                    receiverObjectsExceptOwn.forEach(function (receiver, index) {
                        receiverKeys[receiver.getID()] = cryptKeys[index];
                    });
                    cryptInfo = {
                        keys: cryptKeysData.concat([keyStore.upload.getKey(chunkKey)]),
                        receiverKeys: receiverKeys,
                    };
                    return [2 /*return*/, { cryptInfo: cryptInfo, chunkKey: chunkKey }];
            }
        });
    }); };
    return Chunk;
}(__WEBPACK_IMPORTED_MODULE_1__asset_observer__["default"]));

__WEBPACK_IMPORTED_MODULE_1__asset_observer__["default"].extend(Chunk);
var decryptAndVerifyTitleUpdate = function (titleUpdate) {
    return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
        var content, meta, server, securedData, sender;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!titleUpdate) {
                        return [2 /*return*/];
                    }
                    content = titleUpdate.content, meta = titleUpdate.meta, server = titleUpdate.server;
                    securedData = __WEBPACK_IMPORTED_MODULE_2__asset_securedDataWithMetaData__["default"].load(content, meta, { type: "topicUpdate" });
                    return [4 /*yield*/, userService.get(meta.userID)];
                case 1:
                    sender = _a.sent();
                    return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"]([
                            securedData.decrypt(),
                            securedData.verify(sender.getSignKey())
                        ])];
                case 2:
                    _a.sent();
                    return [2 /*return*/, {
                            content: securedData.contentGet(),
                            meta: securedData.metaGet(),
                            server: server
                        }];
            }
        });
    }); });
};
var ChunkLoader = (function (_super) {
    __extends(ChunkLoader, _super);
    function ChunkLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChunkLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_5__services_cachedObjectLoader__["a" /* default */])({
    cacheName: "chunk",
    download: function (id) { return __WEBPACK_IMPORTED_MODULE_4__services_socket_service__["default"].emit("chat.chunk.get", { id: id }); },
    restore: function (_a) {
        var meta = _a.meta, content = _a.content, server = _a.server, titleUpdate = _a.titleUpdate;
        return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
            return __awaiter(this, void 0, void 0, function () {
                var loadReceiverPromise, creator, chunk, _a, _b, chatTitleUpdate, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            loadReceiverPromise = userService.getMultipleFormatted(meta.receiver.sort().map(__WEBPACK_IMPORTED_MODULE_0__helper_helper__["default"].parseDecimal));
                            return [4 /*yield*/, userService.get(meta.creator)];
                        case 1:
                            creator = _e.sent();
                            if (!creator.isNotExistingUser()) {
                                keyStore.security.addEncryptionIdentifier(meta._key);
                            }
                            else {
                                // TODO data.disabled = true;
                            }
                            _a = Chunk.bind;
                            _b = {
                                meta: meta,
                                content: content,
                                server: server
                            };
                            return [4 /*yield*/, loadReceiverPromise];
                        case 2:
                            chunk = new (_a.apply(Chunk, [void 0, (_b.receiverObjects = _e.sent(),
                                    _b)]))();
                            if (!titleUpdate) return [3 /*break*/, 4];
                            _c = __WEBPACK_IMPORTED_MODULE_6__chatTitleUpdate__["a" /* default */].bind;
                            _d = {
                                content: titleUpdate.content,
                                meta: titleUpdate.meta,
                                server: titleUpdate.server
                            };
                            return [4 /*yield*/, userService.get(titleUpdate.meta.userID)];
                        case 3:
                            chatTitleUpdate = new (_c.apply(__WEBPACK_IMPORTED_MODULE_6__chatTitleUpdate__["a" /* default */], [void 0, (_d.sender = _e.sent(),
                                    _d)]))();
                            chunk.setLatestTitleUpdate(chatTitleUpdate);
                            _e.label = 4;
                        case 4: return [2 /*return*/, chunk];
                    }
                });
            });
        });
    },
    load: function (_a) {
        var content = _a.content, meta = _a.meta, server = _a.server, latestTitleUpdate = _a.latestTitleUpdate;
        return __WEBPACK_IMPORTED_MODULE_3_bluebird__["try"](function () {
            return __awaiter(this, void 0, void 0, function () {
                var securedData, creator, titleUpdate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            securedData = __WEBPACK_IMPORTED_MODULE_2__asset_securedDataWithMetaData__["default"].load(content, meta, CHUNK_SECURED_DATA_OPTIONS);
                            return [4 /*yield*/, userService.get(securedData.metaAttr("creator"))];
                        case 1:
                            creator = _a.sent();
                            return [4 /*yield*/, decryptAndVerifyTitleUpdate(latestTitleUpdate)];
                        case 2:
                            titleUpdate = _a.sent();
                            return [4 /*yield*/, securedData.verify(creator.getSignKey())];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, securedData.decrypt()];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, {
                                    content: securedData.contentGet(),
                                    meta: securedData.metaGet(),
                                    server: server,
                                    titleUpdate: titleUpdate
                                }];
                    }
                });
            });
        });
    },
    getID: function (response) { return response.server.id; }
})));
/* harmony default export */ __webpack_exports__["b"] = (ChunkLoader);
//# sourceMappingURL=chatChunk.js.map

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_session_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user__ = __webpack_require__(377);




var sjcl = __webpack_require__(45);
var initService = __webpack_require__(20);
var userService;
function loadUser(identifier) {
    return __WEBPACK_IMPORTED_MODULE_3__user__["a" /* default */].get(identifier);
}
userService = {
    /** search your friends */
    queryFriends: function (query) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].emit("user.searchFriends", {
                text: query,
                known: []
            });
        }).then(function (data) {
            return data.results;
        }).map(function (user) {
            return __WEBPACK_IMPORTED_MODULE_3__user__["a" /* default */].load(user);
        });
    },
    /** search for a user
    * @param query query string to search for
    * @param cb user objects
    */
    query: function (query, cb) {
        return initService.awaitLoading().then(function () {
            return __WEBPACK_IMPORTED_MODULE_1__services_socket_service__["default"].definitlyEmit("user.search", {
                text: query,
                known: []
            });
        }).then(function (data) {
            return data.results;
        }).map(function (user) {
            return __WEBPACK_IMPORTED_MODULE_3__user__["a" /* default */].load(user);
        }).nodeify(cb);
    },
    /** load a user
    * @param identifier identifier of the user (id, nickname or mail)
    * @param cb called with results
    * this function is asynchronous and returns immediatly. requests are also batched.
    */
    get: function (identifier, cb) {
        return loadUser(identifier).nodeify(cb);
    },
    /** load a user
    * @param identifiers identifier array of the users (id, nickname or mail)
    * @param cb called with results
    * this function is asynchronous and returns immediatly. requests are also batched.
    */
    getMultiple: function getMultipleF(identifiers, cb) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](identifiers).map(function (id) {
            return loadUser(id);
        }).nodeify(cb);
    },
    /** gets multiple users and loads their basic data.
    * @param identifiers identifier of users to load
    * @param cb called with users data.
    */
    getMultipleFormatted: function (identifiers, cb) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return userService.getMultiple(identifiers);
        }).map(function (user) {
            return user.loadBasicData().thenReturn(user);
        }).then(function (users) {
            return users.map(function (user) {
                return user.data;
            });
        }).nodeify(cb);
    },
    /** get own user. synchronous */
    getOwn: function () { return __WEBPACK_IMPORTED_MODULE_3__user__["a" /* default */].getLoaded(__WEBPACK_IMPORTED_MODULE_2__services_session_service__["default"].getUserID()); },
    getOwnAsync: function () { return __WEBPACK_IMPORTED_MODULE_3__user__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__services_session_service__["default"].getUserID()); }
};
initService.registerCallback(function () {
    return __WEBPACK_IMPORTED_MODULE_3__user__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__services_session_service__["default"].getUserID()).catch(function (e) {
        if (e instanceof sjcl.exception.corrupt) {
            alert("Password did not match. Logging out");
            __WEBPACK_IMPORTED_MODULE_2__services_session_service__["default"].logout();
            return new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function () { });
        }
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["reject"](e);
    });
});
/* harmony default export */ __webpack_exports__["default"] = (userService);
//# sourceMappingURL=userService.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_cachedObjectLoader__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chatChunk__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_blobService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__asset_Progress__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_settings_service__ = __webpack_require__(48);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var userService = __webpack_require__(9).default;
var keyStore = __webpack_require__(34).default;








var extractImagesInfo = function (infos, key) {
    return infos.map(function (info) {
        return __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].objectMap(info, function (val) { return val[key]; });
    });
};
var Message = (function () {
    function Message(messageData, chat, attachments, id) {
        var _this = this;
        this.initialize = function (_a) {
            var meta = _a.meta, content = _a.content, server = _a.server, sender = _a.sender;
            _this.wasSent = true;
            var _b = Message.idFromData(server), serverID = _b.serverID, clientID = _b.clientID;
            _this.serverID = serverID;
            _this.clientID = clientID;
            _this.previousID = server.previousMessage;
            _this.chunkID = server.chunkID;
            _this.sendTime = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].parseDecimal(server.sendTime);
            _this.securedData = new __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__["SecuredData"](content, meta, { type: "message" }, true);
            _this.setDefaultData();
            _this.data.sender = sender.data;
            _this.isOwnMessage = sender.isOwn();
            _this.setAttachmentInfo("files");
            _this.setAttachmentInfo("voicemails");
            _this.setImagesInfo();
        };
        this.initializePending = function (chat, message, attachments, id) {
            _this.wasSent = false;
            _this.chat = chat;
            _this.attachments = attachments;
            _this.clientID = id || __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].generateUUID();
            var meta = {
                createTime: new Date().getTime(),
                messageUUID: _this.clientID
            };
            _this.securedData = Message.createRawSecuredData(message, meta);
            _this.setDefaultData();
            _this.data.sender = userService.getOwn().data;
            _this.isOwnMessage = true;
            _this.data.images = attachments.images.map(function (image) {
                if (!image.convertForGallery) {
                    return image;
                }
                return image.convertForGallery();
            });
            _this.data.files = attachments.files.map(function (file) { return (__assign({}, file.getInfo(), { getProgress: function () {
                    return file.getProgress();
                } })); });
            _this.data.voicemails = attachments.voicemails.map(function (voicemail) { return (__assign({}, voicemail.getInfo(), { getProgress: function () {
                    return voicemail.getProgress();
                } })); });
            _this.prepareAttachments();
        };
        this.hasAttachments = function () {
            return _this.attachments.images.length !== 0 || _this.attachments.files.length !== 0 || _this.attachments.voicemails.length !== 0;
        };
        this.isBlockedSince = function () {
            return __WEBPACK_IMPORTED_MODULE_8__services_settings_service__["default"].isBlockedSince(_this.data.sender.id, _this.getTime());
        };
        this.isBlocked = function () {
            return __WEBPACK_IMPORTED_MODULE_8__services_settings_service__["default"].isBlocked(_this.data.sender.id);
        };
        this.hasFiles = function () {
            return _this.data.files && _this.data.files.length > 0;
        };
        this.hasVoicemail = function () {
            return _this.data.voicemails && _this.data.voicemails.length > 0;
        };
        this.hasText = function () {
            return _this.data.text && _this.data.text.length > 0;
        };
        this.hasImages = function () {
            return _this.data.images && _this.data.images.length > 0;
        };
        this.prepareAttachments = function () {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
                Message.prepare(_this.attachments.files),
                Message.prepare(_this.attachments.images),
                Message.prepare(_this.attachments.voicemails)
            ]);
        };
        this.setDefaultData = function () {
            var content = _this.securedData.contentGet();
            _this.data = {
                text: typeof content === "string" ? content : content.message,
                timestamp: _this.getTime(),
                date: new Date(_this.getTime()),
                sent: _this.wasSent,
                id: _this.clientID,
                obj: _this
            };
        };
        this.getChunkID = function () {
            return _this.chunkID || _this.chat.getLatestChunk();
        };
        this.hasBeenSent = function () { return _this.wasSent; };
        this.uploadAttachments = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].cacheResult(function (chunkKey) {
            return _this.prepareAttachments().then(function () {
                var attachments = _this.attachments.images.concat(_this.attachments.files, _this.attachments.voicemails);
                return __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"](attachments.map(function (attachment) {
                    return attachment.upload(chunkKey);
                }));
            }).then(function (imageKeys) {
                return __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].array.flatten(imageKeys);
            });
        });
        this.sendContinously = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].cacheResult(function () {
            return __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].repeatUntilTrue(__WEBPACK_IMPORTED_MODULE_0_bluebird__, function () {
                return _this.send();
            }, 2000);
        });
        this.send = function () {
            if (_this.wasSent) {
                throw new Error("trying to send an already sent message");
            }
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var messageIDs, messages, unsentMessages, messageIndex, chunk, chunkKey, sentMessages, newest, signAndEncryptPromise, keys, request, _a, receiverKeys, chunkKeys, initialChunk, response_1, chatInfo, messageInfo, chunkInfo, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["default"].awaitConnection()];
                        case 1:
                            _b.sent();
                            messageIDs = this.chat.getMessages();
                            messages = messageIDs.filter(function (_a) {
                                var id = _a.id;
                                return MessageLoader.isLoaded(id);
                            }).map(function (_a) {
                                var id = _a.id;
                                return MessageLoader.getLoaded(id);
                            });
                            unsentMessages = messages.filter(function (m) { return !m.hasBeenSent(); });
                            messageIndex = unsentMessages.findIndex(function (m) { return m === _this; });
                            if (!unsentMessages[messageIndex - 1]) return [3 /*break*/, 3];
                            return [4 /*yield*/, unsentMessages[messageIndex - 1].sendContinously()];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_5__chatChunk__["b" /* default */].get(this.chat.getLatestChunk())];
                        case 4:
                            chunk = _b.sent();
                            this.securedData.setParent(chunk.getSecuredData());
                            return [4 /*yield*/, Message.setAttachmentsInfo(this.securedData, this.attachments)];
                        case 5:
                            _b.sent();
                            chunkKey = chunk.getKey();
                            sentMessages = messages.filter(function (m) { return m.hasBeenSent(); });
                            newest = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].array.last(sentMessages);
                            if (newest && newest.getChunkID() === this.chat.getLatestChunk()) {
                                this.securedData.setAfterRelationShip(newest.getSecuredData());
                            }
                            signAndEncryptPromise = this.securedData.signAndEncrypt(userService.getOwn().getSignKey(), chunkKey);
                            return [4 /*yield*/, this.uploadAttachments(chunkKey)];
                        case 6:
                            keys = (_b.sent()).map(keyStore.upload.getKey);
                            return [4 /*yield*/, signAndEncryptPromise];
                        case 7:
                            request = _b.sent();
                            if (!this.chat.isDraft()) return [3 /*break*/, 9];
                            _a = chunk.chunkData, receiverKeys = _a.receiverKeys, chunkKeys = _a.keys, initialChunk = _a.chunk;
                            return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["default"].emit("chat.create", {
                                    initialChunk: initialChunk,
                                    firstMessage: request,
                                    receiverKeys: receiverKeys,
                                    keys: chunkKeys.concat(keys)
                                })];
                        case 8:
                            response_1 = _b.sent();
                            chatInfo = response_1.chat.chat;
                            messageInfo = response_1.chat.messages[0];
                            chunkInfo = response_1.chat.chunks[0];
                            chunk.create(chunkInfo);
                            this.chat.create(chatInfo);
                            this.sendSuccess();
                            this.setServerInfo(messageInfo.server);
                            return [2 /*return*/, true];
                        case 9: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["default"].emit("chat.message.create", {
                                chunkID: chunk.getID(),
                                message: request,
                                keys: keys
                            })];
                        case 10:
                            response = _b.sent();
                            if (response.success) {
                                this.sendSuccess();
                            }
                            if (response.server) {
                                this.setServerInfo(response.server);
                            }
                            return [2 /*return*/, response.success];
                    }
                });
            }); }).catch(__WEBPACK_IMPORTED_MODULE_3__services_socket_service__["default"].errors.Disconnect, function (e) {
                console.warn(e);
                return false;
            }).catch(__WEBPACK_IMPORTED_MODULE_3__services_socket_service__["default"].errors.Server, function () {
                return false;
            });
        };
        this.sendSuccess = function () {
            _this.wasSent = true;
            _this.data.sent = true;
            _this.setAttachmentInfo("files");
            _this.setAttachmentInfo("voicemails");
            _this.setImagesInfo();
        };
        this.setServerInfo = function (_a) {
            var sendTime = _a.sendTime, id = _a.id, chunkID = _a.chunkID, previousMessage = _a.previousMessage;
            _this.sendTime = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].parseDecimal(sendTime);
            _this.serverID = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].parseDecimal(id);
            _this.chunkID = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].parseDecimal(chunkID);
            _this.previousID = previousMessage;
            _this.data.timestamp = _this.getTime();
        };
        this.getSecuredData = function () {
            return _this.securedData;
        };
        this.getServerID = function () {
            return _this.serverID;
        };
        this.getPreviousID = function () {
            return _this.previousID;
        };
        this.getClientID = function () {
            return _this.clientID;
        };
        this.getTopicID = function () {
            return _this.chunkID;
        };
        this.getTime = function () {
            if (_this.getServerID()) {
                return _this.sendTime;
            }
            return __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].parseDecimal(_this.securedData.metaAttr("createTime"));
        };
        this.isOwn = function () {
            return _this.isOwnMessage;
        };
        this.verifyParent = function (chunk) {
            _this.securedData.checkParent(chunk.getSecuredData());
        };
        this.getText = function () {
            return _this.data.text;
        };
        this.setAttachmentInfo = function (attr) {
            var fullContent = _this.securedData.contentGet();
            if (typeof fullContent === "string") {
                return;
            }
            var content = fullContent[attr];
            var meta = _this.securedData.metaAttr(attr);
            if (!content) {
                return;
            }
            _this.data[attr] = content.map(function (file, index) { return (__assign({}, file, meta[index], { loaded: false })); });
            __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](_this.data[attr]).filter(function (ele) {
                return __WEBPACK_IMPORTED_MODULE_6__services_blobService__["a" /* default */].isBlobLoaded(ele.blobID);
            }).each(function (loadedAttachment) {
                loadedAttachment.loaded = true;
            });
        };
        this.downloadVoicemail = function (voicemailDownloadProgress) {
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](_this.data.voicemails).each(function (voicemail) {
                var progress = new __WEBPACK_IMPORTED_MODULE_7__asset_Progress__["a" /* default */]();
                voicemailDownloadProgress.addDepend(progress);
                return __WEBPACK_IMPORTED_MODULE_6__services_blobService__["a" /* default */].getBlobUrl(voicemail.blobID, voicemailDownloadProgress, voicemail.size).then(function (url) {
                    voicemail.url = url;
                    voicemail.loaded = true;
                });
            });
        };
        this.setImagesInfo = function () {
            var content = _this.securedData.contentGet();
            var imagesMeta = _this.securedData.metaAttr("images") || [];
            if (typeof content === "string") {
                _this.data.images = imagesMeta;
                return;
            }
            var imagesContent = content.images;
            _this.data.images = imagesMeta.map(function (imageMeta, index) {
                var imageContent = imagesContent[index];
                var data = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].objectMap(imageMeta, function (val, key) {
                    return __assign({}, val, imageContent[key]);
                });
                return data;
            });
        };
        if (chat) {
            this.initializePending(chat, messageData, attachments, id);
        }
        else {
            this.initialize(messageData);
        }
    }
    Message.createRawSecuredData = function (message, meta, chunk) {
        var secured = new __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__["SecuredData"]({ message: message }, meta, { type: "message" }, true);
        if (chunk) {
            secured.setParent(chunk.getSecuredData());
        }
        return secured;
    };
    Message.idFromData = function (server) {
        var serverID = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].parseDecimal(server.id);
        var clientID = server.uuid;
        return {
            serverID: serverID,
            clientID: clientID
        };
    };
    Message.prepare = function (uploads) { return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](uploads).map(function (upload) { return upload.prepare(); }); };
    Message.setAttachmentsInfo = function (securedData, attachments) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return __awaiter(this, void 0, void 0, function () {
                var imagesInfo, voicemailsInfo, filesInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Message.prepare(attachments.images)];
                        case 1:
                            imagesInfo = _a.sent();
                            return [4 /*yield*/, Message.prepare(attachments.voicemails)];
                        case 2:
                            voicemailsInfo = _a.sent();
                            return [4 /*yield*/, Message.prepare(attachments.files)];
                        case 3:
                            filesInfo = _a.sent();
                            if (imagesInfo.length > 0 || filesInfo.length > 0 || voicemailsInfo.length > 0) {
                                securedData.metaSetAttr("images", extractImagesInfo(imagesInfo, "meta"));
                                securedData.contentSetAttr("images", extractImagesInfo(imagesInfo, "content"));
                                securedData.metaSetAttr("files", filesInfo.map(function (info) { return info.meta; }));
                                securedData.contentSetAttr("files", filesInfo.map(function (info) { return info.content; }));
                                securedData.metaSetAttr("voicemails", voicemailsInfo.map(function (info) { return info.meta; }));
                                securedData.contentSetAttr("voicemails", voicemailsInfo.map(function (info) { return info.content; }));
                            }
                            else if (typeof securedData.contentGet() !== "string") {
                                securedData.contentSet(securedData.contentGet().message);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    return Message;
}());

var loadMessageSender = function (senderID) {
    return userService.get(senderID)
        .then(function (sender) { return sender.loadBasicData().thenReturn(sender); });
};
var MessageLoader = (function (_super) {
    __extends(MessageLoader, _super);
    function MessageLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MessageLoader;
}(Object(__WEBPACK_IMPORTED_MODULE_4__services_cachedObjectLoader__["a" /* default */])({
    cacheName: "message",
    getID: function (_a) {
        var server = _a.server;
        return server.uuid;
    },
    download: function (id) { return __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["default"].definitlyEmit("chat.message.get", { id: id }); },
    load: function (messageResponse) {
        var content = messageResponse.content, meta = messageResponse.meta, server = messageResponse.server;
        var securedData = __WEBPACK_IMPORTED_MODULE_1__asset_securedDataWithMetaData__["default"].load(content, meta, { type: "message" });
        var senderID = server.sender;
        // !! Typescript is broken for async arrow functions without a this context !!
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () {
            return __awaiter(this, void 0, void 0, function () {
                var sender;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, loadMessageSender(senderID)];
                        case 1:
                            sender = _a.sent();
                            return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_0_bluebird__["all"]([
                                    securedData.decrypt(),
                                    securedData.verify(sender.getSignKey())
                                ])];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, {
                                    content: securedData.contentGet(),
                                    meta: securedData.metaGet(),
                                    server: messageResponse.server,
                                }];
                    }
                });
            });
        });
    },
    restore: function (messageInfo) {
        return loadMessageSender(messageInfo.server.sender)
            .then(function (sender) { return new Message(__assign({}, messageInfo, { sender: sender })); });
    },
})));
/* harmony default export */ __webpack_exports__["b"] = (MessageLoader);
//# sourceMappingURL=message.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["checkLocalStorage"] = checkLocalStorage;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storageInfo", function() { return storageInfo; });
/* harmony export (immutable) */ __webpack_exports__["promoteMainWindow"] = promoteMainWindow;
/* harmony export (immutable) */ __webpack_exports__["withPrefix"] = withPrefix;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Cache__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Storage__ = __webpack_require__(362);


function checkLocalStorage() {
    try {
        localStorage.setItem("localStorageTest", "localStorageTest");
        localStorage.removeItem("localStorageTest");
        return true;
    }
    catch (e) {
        return false;
    }
}
var storages = [];
var storageInfo = {
    Cache: new __WEBPACK_IMPORTED_MODULE_0__Cache__["default"]("localStorage"),
    hasLocalStorage: checkLocalStorage(),
    broken: false
};
function promoteMainWindow() {
    window.top.whispeerGetStorage = function (prefix) {
        return this.storages[prefix];
    };
}
function withPrefix(prefix) {
    if (!storages[prefix]) {
        try {
            storages[prefix] = new __WEBPACK_IMPORTED_MODULE_1__Storage__["a" /* default */](prefix);
        }
        catch (e) {
            storageInfo.broken = true;
        }
    }
    return storages[prefix];
}
//# sourceMappingURL=storage.service.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fixFileReader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Cache__ = __webpack_require__(27);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;



var BLOB_CACHE_DIR = "blobCache";
var LOCK_TIMEOUT = 30 * 1000;
var FILE = new __WEBPACK_IMPORTED_MODULE_1__ionic_native_file__["a" /* File */]();
var isAndroid = function () { return window.device && window.device.platform === "Android"; };
var fixFileReader = function () {
    var win = window;
    var delegateName = win.Zone.__symbol__('OriginalDelegate');
    if (win.FileReader[delegateName]) {
        console.warn("Fixing file reader!");
        win.FileReader = win.FileReader[delegateName];
    }
};
var cacheDirectoryPromise = null;
var getCacheDirectory = function () {
    if (!cacheDirectoryPromise) {
        var basePath_1 = FILE.cacheDirectory;
        var desiredPath_1 = "" + basePath_1 + BLOB_CACHE_DIR + "/";
        cacheDirectoryPromise = __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](FILE.checkDir(basePath_1, BLOB_CACHE_DIR)).then(function (success) {
            return desiredPath_1;
        }).catch(function (error) {
            return FILE.createDir(basePath_1, BLOB_CACHE_DIR, true).then(function (dirEntry) {
                return desiredPath_1;
            }).catch(function (error) {
                throw new Error('Could not create blob cache directory.');
            });
        });
    }
    return cacheDirectoryPromise;
};
var removeOldFiles = function () {
    getCacheDirectory()
        .then(function () { return FILE.listDir(FILE.cacheDirectory, BLOB_CACHE_DIR); })
        .filter(function (entry) { return entry.isFile && entry.name.endsWith(".blob"); })
        .map(function (file) { return new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (resolve, reject) { return file.remove(resolve, reject); }); });
};
document.addEventListener("deviceready", removeOldFiles, false);
var readFileAsBlob = function (path, filename, type) {
    fixFileReader();
    return FILE.readAsArrayBuffer(path, filename).then(function (buf) { return new Blob([buf], { type: type }); });
};
var writeToFile = function (path, filename, data) {
    fixFileReader();
    return FILE.writeFile(path, filename, data);
};
var existsFile = function (path, filename) {
    return FILE.checkFile(path, filename).catch(function (e) {
        if (e.code === 1) {
            return false;
        }
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["reject"](e);
    });
};
var idToFileName = function (blobID) { return blobID + ".aac"; };
var clearing = false;
var storing = 0;
var noPendingStorageOperations = function () {
    return new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (resolve) {
        var busyWait = setInterval(function () {
            if (storing === 0) {
                resolve();
                clearInterval(busyWait);
            }
        }, 10);
    }).timeout(LOCK_TIMEOUT).catch(__WEBPACK_IMPORTED_MODULE_0_bluebird__["TimeoutError"], function () { });
};
var blobCache = {
    clear: function () {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clearing = true;
                        return [4 /*yield*/, noPendingStorageOperations()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, FILE.removeRecursively(FILE.cacheDirectory, BLOB_CACHE_DIR)
                                .catch(function (error) {
                                // There really is little we can do here, but logouts, e.g., should not
                                // fail because we failed to clear.
                                console.warn('Cannot remove cache, resolving promise anyway.');
                                return true;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }).finally(function () { return clearing = false; });
    },
    moveFileToBlob: function (currentDirectory, currentFilename, blobID) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var path, filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (clearing)
                            throw new Error('Cannot get blob, currently clearing cache.');
                        return [4 /*yield*/, getCacheDirectory()];
                    case 1:
                        path = _a.sent();
                        filename = idToFileName(blobID);
                        return [2 /*return*/, FILE.moveFile(currentDirectory, currentFilename, path, filename)];
                }
            });
        }); });
    },
    readFileAsArrayBuffer: function (directory, name) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](FILE.readAsArrayBuffer(directory, name));
    },
    store: function (blob) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var blobID, path, filename, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (clearing)
                            throw new Error('Cannot store blob, currently clearing cache.');
                        storing++;
                        blobID = blob.getBlobID();
                        if (!blob.isDecrypted()) {
                            throw new Error("trying to store an undecrypted blob");
                        }
                        return [4 /*yield*/, getCacheDirectory()];
                    case 1:
                        path = _a.sent();
                        filename = idToFileName(blobID);
                        return [4 /*yield*/, existsFile(path, filename)];
                    case 2:
                        exists = _a.sent();
                        if (!!exists) return [3 /*break*/, 4];
                        return [4 /*yield*/, writeToFile(path, filename, blob.getBlobData())];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, "" + path + filename];
                }
            });
        }); }).catch(function (e) {
            console.warn("Storing blob failed");
            return __WEBPACK_IMPORTED_MODULE_0_bluebird__["reject"](e);
        }).finally(function () { return storing--; });
    },
    getBlobUrl: function (blobID) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var path, filename, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (clearing)
                            throw new Error('Cannot get blob URL, currently clearing cache.');
                        return [4 /*yield*/, getCacheDirectory()];
                    case 1:
                        path = _a.sent();
                        filename = idToFileName(blobID);
                        return [4 /*yield*/, existsFile(path, filename)];
                    case 2:
                        exists = _a.sent();
                        if (!exists) {
                            throw new Error("cannot get blob url, blob does not exist: " + filename);
                        }
                        return [2 /*return*/, "" + path + filename];
                }
            });
        }); });
    },
    copyBlobToDownloads: function (blobID, filename) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var cacheDir, blobFile, path, existsSource, existsDestination;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getCacheDirectory()];
                    case 1:
                        cacheDir = _a.sent();
                        blobFile = idToFileName(blobID);
                        path = isAndroid() ? FILE.externalRootDirectory + "Download/" : "" + FILE.documentsDirectory;
                        return [4 /*yield*/, existsFile(cacheDir, blobFile)];
                    case 2:
                        existsSource = _a.sent();
                        return [4 /*yield*/, existsFile(path, filename)];
                    case 3:
                        existsDestination = _a.sent();
                        if (!existsSource) {
                            throw new Error("cannot copy blob, blob does not exist: " + filename);
                        }
                        if (!existsDestination) return [3 /*break*/, 5];
                        return [4 /*yield*/, FILE.removeFile(path, filename)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, FILE.copyFile(cacheDir, blobFile, path, filename)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, "" + path + filename];
                }
            });
        }); });
    },
    getFileMimeType: function (url) { return __WEBPACK_IMPORTED_MODULE_0_bluebird__["resolve"](FILE.resolveLocalFilesystemUrl(url))
        .then(function (file) { return new __WEBPACK_IMPORTED_MODULE_0_bluebird__(function (resolve, reject) { return file.file(resolve, reject); })
        .then(function (file) { return file.type; }); }); },
    isLoaded: function (blobID) { return blobCache.getBlobUrl(blobID).then(function () { return true; }).catch(function () { return false; }); },
    get: function (blobID) {
        return __WEBPACK_IMPORTED_MODULE_0_bluebird__["try"](function () { return __awaiter(_this, void 0, void 0, function () {
            var path, filename, blob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (clearing)
                            throw new Error('Cannot get blob, currently clearing cache.');
                        return [4 /*yield*/, getCacheDirectory()];
                    case 1:
                        path = _a.sent();
                        filename = idToFileName(blobID);
                        return [4 /*yield*/, readFileAsBlob(path, filename, "")];
                    case 2:
                        blob = _a.sent();
                        return [2 /*return*/, { blob: blob, blobID: blobID, decrypted: true, meta: {} }];
                }
            });
        }); });
    }
};
/* harmony default export */ __webpack_exports__["a"] = (blobCache);
(new __WEBPACK_IMPORTED_MODULE_2__services_Cache__["default"]("blobs")).deleteAll().catch(function () { return console.warn("Could not delete legacy blobs from idb cache"); });
//# sourceMappingURL=blobCache.js.map

/***/ })

},[311]);
//# sourceMappingURL=main.js.map