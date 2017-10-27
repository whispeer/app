webpackJsonp([0],{

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewMessagePageModule", function() { return NewMessagePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_message__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_topic_topicComponentsModule__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var NewMessagePageModule = (function () {
    function NewMessagePageModule() {
    }
    NewMessagePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__new_message__["a" /* NewMessagePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__new_message__["a" /* NewMessagePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_topic_topicComponentsModule__["a" /* TopicComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forChild(),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__new_message__["a" /* NewMessagePage */],
            ]
        })
    ], NewMessagePageModule);
    return NewMessagePageModule;
}());

//# sourceMappingURL=new-message.module.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_pipes_responsiveDate__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_pipes_maxValue__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_pipes_filenameLimit__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__userImage__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__navigator_navigator__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__load__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__loadingProgress__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__hexagon__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__navigator_hexagon__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__navigator_icon__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__lib_pipes_responsiveDate__["a" /* ResponsiveDatePipe */],
                __WEBPACK_IMPORTED_MODULE_4__lib_pipes_maxValue__["a" /* MaxValuePipe */],
                __WEBPACK_IMPORTED_MODULE_5__lib_pipes_filenameLimit__["a" /* FilenameLimitPipe */],
                __WEBPACK_IMPORTED_MODULE_6__userImage__["a" /* UserImageComponent */],
                __WEBPACK_IMPORTED_MODULE_8__load__["a" /* LoadComponent */],
                __WEBPACK_IMPORTED_MODULE_9__loadingProgress__["a" /* LoadingProgress */],
                __WEBPACK_IMPORTED_MODULE_10__hexagon__["a" /* HexagonComponent */],
                __WEBPACK_IMPORTED_MODULE_7__navigator_navigator__["a" /* Navigator */],
                __WEBPACK_IMPORTED_MODULE_11__navigator_hexagon__["a" /* NavigatorHexagon */],
                __WEBPACK_IMPORTED_MODULE_12__navigator_icon__["a" /* NavigatorIcon */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__lib_pipes_responsiveDate__["a" /* ResponsiveDatePipe */],
                __WEBPACK_IMPORTED_MODULE_4__lib_pipes_maxValue__["a" /* MaxValuePipe */],
                __WEBPACK_IMPORTED_MODULE_5__lib_pipes_filenameLimit__["a" /* FilenameLimitPipe */],
                __WEBPACK_IMPORTED_MODULE_6__userImage__["a" /* UserImageComponent */],
                __WEBPACK_IMPORTED_MODULE_8__load__["a" /* LoadComponent */],
                __WEBPACK_IMPORTED_MODULE_9__loadingProgress__["a" /* LoadingProgress */],
                __WEBPACK_IMPORTED_MODULE_10__hexagon__["a" /* HexagonComponent */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_7__navigator_navigator__["a" /* Navigator */],
                __WEBPACK_IMPORTED_MODULE_11__navigator_hexagon__["a" /* NavigatorHexagon */],
                __WEBPACK_IMPORTED_MODULE_12__navigator_icon__["a" /* NavigatorIcon */],
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(51);
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
var ResponsiveDatePipe = (function () {
    function ResponsiveDatePipe(datePipe) {
        this.datePipe = datePipe;
    }
    ResponsiveDatePipe.prototype.transform = function (value) {
        if (!value) {
            return "";
        }
        if (typeof value === "number") {
            value = new Date(value);
        }
        var format;
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        var date_norm = new Date(value);
        date_norm.setHours(0, 0, 0, 0);
        var diff_norm = (now.getTime() - date_norm.getTime()) / 1000;
        var YESTERDAY = 24 * 60 * 60;
        if (diff_norm === 0) {
            format = "HH:mm";
        }
        else if (diff_norm == YESTERDAY) {
            return "Yesterday";
        }
        else if (diff_norm <= YESTERDAY * 6) {
            format = "EEEE";
        }
        else {
            format = "dd.MM.y";
        }
        return this.datePipe.transform(value, format);
    };
    ResponsiveDatePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
            name: "responsiveDate"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */]])
    ], ResponsiveDatePipe);
    return ResponsiveDatePipe;
}());

//# sourceMappingURL=responsiveDate.js.map

/***/ }),

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaxValuePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
 // tslint:disable-line:no-unused-variable
var MaxValuePipe = (function () {
    function MaxValuePipe() {
    }
    MaxValuePipe.prototype.transform = function (value, max) {
        if (value > max) {
            return max + "+";
        }
        return value.toString();
    };
    MaxValuePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: "maxValue" })
    ], MaxValuePipe);
    return MaxValuePipe;
}());

//# sourceMappingURL=maxValue.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilenameLimitPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
 // tslint:disable-line:no-unused-variable
var FilenameLimitPipe = (function () {
    function FilenameLimitPipe() {
    }
    FilenameLimitPipe.prototype.transform = function (str, max) {
        if (str.length > max) {
            var type = str.substring(str.lastIndexOf(".") + 1, str.length);
            return str.substring(0, max - type.length - 3) + "..." + type;
        }
        return str;
    };
    FilenameLimitPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: "filenameLimit" })
    ], FilenameLimitPipe);
    return FilenameLimitPipe;
}());

//# sourceMappingURL=filenameLimit.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_services_settings_service__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DEFAULT_IMAGE = "assets/img/user.png";
var UserImageComponent = (function () {
    function UserImageComponent() {
        this._image = DEFAULT_IMAGE;
        this.hideBlocked = true;
        this.randomId = Math.random().toString();
    }
    Object.defineProperty(UserImageComponent.prototype, "image", {
        get: function () {
            if (this.hideBlocked && __WEBPACK_IMPORTED_MODULE_1__lib_services_settings_service__["default"].isBlocked(parseInt(this.id, 10))) {
                return "assets/img/blocked.png";
            }
            return this._image;
        },
        set: function (image) {
            if (image) {
                this._image = image;
                return;
            }
            this._image = DEFAULT_IMAGE;
        },
        enumerable: true,
        configurable: true
    });
    UserImageComponent.prototype.getId = function () {
        return "userimage-" + this.id + "-" + this.randomId;
    };
    UserImageComponent.prototype.getUrl = function () {
        return "url(#" + this.getId() + ")";
    };
    ;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], UserImageComponent.prototype, "hideBlocked", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], UserImageComponent.prototype, "image", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], UserImageComponent.prototype, "id", void 0);
    UserImageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "user-image",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/userImage.svg"*/'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 433 500" style="enable-background:new 0 0 433 500;" xml:space="preserve">\n	<defs>\n		<pattern [attr.id]="getId()" patternUnits="userSpaceOnUse" width="500" height="500" x="0" y="0">\n			<svg:image [attr.xlink:href]="image" x="-35.5" y="0" width="500" height="500"/>\n		</pattern>\n	</defs>\n	<path class="border" d="M216.5,0L0,125v250l216.5,125L433,375V125L216.5,0z M417.9,366.3L216.5,482.6L15.1,366.3V133.7L216.5,17.4\n		l201.4,116.3V366.3z"/>\n	<polygon class="content" points="15.1,133.7 216.5,17.4 417.9,133.7 417.9,366.3 216.5,482.6 15.1,366.3" [attr.fill]="getUrl()"/>\n</svg>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/userImage.svg"*/
        }),
        __metadata("design:paramtypes", [])
    ], UserImageComponent);
    return UserImageComponent;
}());

//# sourceMappingURL=userImage.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Navigator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_services_session_service__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EASTER_EGG_THRESHOLD = 10 * 1000;
var Navigator = (function () {
    function Navigator(navCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.icon = "plus";
        this.invoke = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.open = false;
        this.closeOnTouchEnd = false;
        this.profile = null;
        this.search = null;
        this.contacts = null;
        this.settings = null;
        this.onTap = function () {
            clearTimeout(_this.easterEgg);
            if (_this.open) {
                _this.open = false;
            }
            else {
                _this.invoke.emit();
            }
        };
        this.onPress = function () {
            if (_this.open) {
                _this.closeOnTouchEnd = true;
            }
            else {
                _this.open = true;
            }
        };
        this.easterEgg = null;
        this.enableEasterEgg = function () {
            var navigators = document.querySelectorAll('.navigator');
            for (var i = 0; i < navigators.length; i++) {
                navigators.item(i).classList.add('easteregg');
            }
        };
        this.isOnSubmenu = function (bounds, event) {
            var left = bounds.left, top = bounds.top, diameter = bounds.width;
            var centerX = left + diameter / 2;
            var centerY = top + diameter / 2;
            for (var i = 0; i < event.changedTouches.length; i++) {
                var _a = event.changedTouches.item(i), clientX = _a.clientX, clientY = _a.clientY;
                var distance = Math.sqrt(Math.pow(centerX - clientX, 2) + Math.pow(centerY - clientY, 2));
                if (distance < (diameter / 2) * 1.5)
                    return true;
            }
            return false;
        };
        this.getNodeWithBounds = function (ancestor, selector) {
            var node = ancestor.querySelector(selector);
            var bounds = node.getBoundingClientRect();
            return { node: node, bounds: bounds };
        };
        this.onTouchStart = function (e) {
            var menu = e.target;
            while (menu && !menu.classList.contains('navigator')) {
                menu = menu.parentElement;
            }
            if (menu) {
                _this.profile = _this.getNodeWithBounds(menu, '.sub-menu.profile');
                _this.search = _this.getNodeWithBounds(menu, '.sub-menu.search');
                _this.contacts = _this.getNodeWithBounds(menu, '.sub-menu.contacts');
                _this.settings = _this.getNodeWithBounds(menu, '.sub-menu.settings');
            }
            _this.easterEgg = setTimeout(_this.enableEasterEgg, EASTER_EGG_THRESHOLD);
        };
        this.onTouchEnd = function (e) {
            var nodesWithBounds = [_this.search, _this.profile, _this.contacts, _this.settings];
            for (var _i = 0, nodesWithBounds_1 = nodesWithBounds; _i < nodesWithBounds_1.length; _i++) {
                var node = nodesWithBounds_1[_i].node;
                node.classList.remove('active');
            }
            if (_this.open) {
                if (_this.isOnSubmenu(_this.profile.bounds, e))
                    _this.invokeProfile();
                if (_this.isOnSubmenu(_this.search.bounds, e))
                    _this.invokeSearch();
                if (_this.isOnSubmenu(_this.contacts.bounds, e))
                    _this.invokeContacts();
                if (_this.isOnSubmenu(_this.settings.bounds, e))
                    _this.invokeSettings();
            }
            if (_this.closeOnTouchEnd) {
                _this.open = false;
                _this.closeOnTouchEnd = false;
            }
            clearTimeout(_this.easterEgg);
        };
        this.onTouchMove = function (e) {
            if (_this.open) {
                for (var _i = 0, _a = [_this.profile, _this.contacts, _this.settings, _this.search]; _i < _a.length; _i++) {
                    var _b = _a[_i], node = _b.node, bounds = _b.bounds;
                    if (_this.isOnSubmenu(bounds, e)) {
                        node.classList.add('active');
                    }
                    else {
                        node.classList.remove('active');
                    }
                }
            }
            e.preventDefault();
        };
    }
    Navigator.prototype.close = function () {
        clearTimeout(this.easterEgg);
        this.open = false;
    };
    Navigator.prototype.invokeProfile = function () {
        this.close();
        var userId = __WEBPACK_IMPORTED_MODULE_2__lib_services_session_service__["default"].userid;
        this.navCtrl.push("Profile", { userId: userId });
    };
    Navigator.prototype.invokeContacts = function () {
        this.close();
        this.navCtrl.push("Contacts");
    };
    Navigator.prototype.invokeSearch = function () {
        this.close();
        this.navCtrl.push("Contacts", { search: true });
    };
    Navigator.prototype.invokeSettings = function () {
        this.close();
        this.navCtrl.push("Settings");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], Navigator.prototype, "icon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], Navigator.prototype, "invoke", void 0);
    Navigator = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "navigator",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/navigator/navigator.html"*/'<div class="navigator" [ngClass]="{\'open\': open, \'plus\': icon === \'plus\', \'arrow\': icon === \'arrow\', \'close\': icon === \'close\' }">\n	<navigator-hexagon></navigator-hexagon>\n	<div class="glasses"></div>\n	<button class="menu-icon" (press)="onPress()" (tap)="onTap()" (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)" (touchmove)="onTouchMove($event)">\n		<navigator-icon [icon]="icon"></navigator-icon>\n		<navigator-icon [icon]="\'close\'" class="secondary"></navigator-icon>\n	</button>\n	<button class="sub-menu profile" (tap)="invokeProfile()">\n		<div class="outline"></div>\n		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n			<g fill="none" fill-rule="evenodd">\n			<circle cx="24" cy="24" r="24" fill="#435259" fill-opacity=".95"/>\n			<path fill="#FFF" d="M24,23.0625 C25.2858137,23.0625 26.3885045,22.6027064 27.3081055,21.6831055 C28.2277064,20.7635045 28.6875,19.6608137 28.6875,18.375 C28.6875,17.0891863 28.2277064,15.9864955 27.3081055,15.0668945 C26.3885045,14.1472936 25.2858137,13.6875 24,13.6875 C22.7141863,13.6875 21.6114955,14.1472936 20.6918945,15.0668945 C19.7722936,15.9864955 19.3125,17.0891863 19.3125,18.375 C19.3125,19.6608137 19.7722936,20.7635045 20.6918945,21.6831055 C21.6114955,22.6027064 22.7141863,23.0625 24,23.0625 Z M24,25.40625 C23.2187461,25.40625 22.291021,25.5039053 21.2167969,25.6992188 C20.1425728,25.8945322 19.1171924,26.187498 18.140625,26.578125 C17.1640576,26.968752 16.3339878,27.4570283 15.6503906,28.0429688 C14.9667935,28.6289092 14.625,29.3124961 14.625,30.09375 L14.625,32.4375 L33.375,32.4375 L33.375,30.09375 C33.375,29.3124961 33.0332065,28.6289092 32.3496094,28.0429688 C31.6660122,27.4570283 30.8359424,26.968752 29.859375,26.578125 C28.8828076,26.187498 27.8574272,25.8945322 26.7832031,25.6992188 C25.708979,25.5039053 24.7812539,25.40625 24,25.40625 Z"/>\n			</g>\n		</svg>\n	</button>\n	<button class="sub-menu contacts" (tap)="invokeContacts()">\n		<div class="outline"></div>\n		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n			<g fill="none" fill-rule="evenodd">\n				<circle cx="24" cy="24" r="24" fill="#435259" fill-opacity=".95"/>\n				<path fill="#FFF" d="M29.09375,21.5 C30.1354219,21.5 31.0312463,21.130212 31.78125,20.390625 C32.5312537,19.651038 32.90625,18.7708384 32.90625,17.75 C32.90625,16.7291616 32.5312537,15.848962 31.78125,15.109375 C31.0312463,14.369788 30.1354219,14 29.09375,14 C28.0520781,14 27.1562537,14.369788 26.40625,15.109375 C25.6562463,15.848962 25.28125,16.7291616 25.28125,17.75 C25.28125,18.7708384 25.6562463,19.651038 26.40625,20.390625 C27.1562537,21.130212 28.0520781,21.5 29.09375,21.5 Z M18.90625,21.5 C19.9479219,21.5 20.8437463,21.130212 21.59375,20.390625 C22.3437537,19.651038 22.71875,18.7708384 22.71875,17.75 C22.71875,16.7291616 22.3437537,15.848962 21.59375,15.109375 C20.8437463,14.369788 19.9479219,14 18.90625,14 C17.8645781,14 16.9687537,14.369788 16.21875,15.109375 C15.4687463,15.848962 15.09375,16.7291616 15.09375,17.75 C15.09375,18.7708384 15.4687463,19.651038 16.21875,20.390625 C16.9687537,21.130212 17.8645781,21.5 18.90625,21.5 Z M18.90625,24.25 C18.1562463,24.25 17.2708384,24.3385408 16.25,24.515625 C15.2291616,24.6927092 14.255213,24.9635398 13.328125,25.328125 C12.401037,25.6927102 11.6145866,26.1510389 10.96875,26.703125 C10.3229134,27.2552111 10,27.8958297 10,28.625 L10,32 L28,32 L28,28.625 C28,27.8958297 27.66667,27.2552111 27,26.703125 C26.33333,26.1510389 25.5260464,25.6927102 24.578125,25.328125 C23.6302036,24.9635398 22.6354219,24.6927092 21.59375,24.515625 C20.5520781,24.3385408 19.6562537,24.25 18.90625,24.25 Z M29.09375,24.9375 C28.9062491,24.9375 28.7343758,24.9427083 28.578125,24.953125 C28.4218742,24.9635417 28.2291678,24.9791666 28,25 C28.7291703,25.5416694 29.2447902,26.0468727 29.546875,26.515625 C29.8489598,26.9843773 30,27.6874953 30,28.625 L30,32 L38,32 L38,28.625 C38,27.8958297 37.6770866,27.2916691 37.03125,26.8125 C36.3854134,26.3333309 35.598963,25.9531264 34.671875,25.671875 C33.744787,25.3906236 32.7708384,25.1979172 31.75,25.09375 C30.7291616,24.9895828 29.8437537,24.9375 29.09375,24.9375 Z"/>\n			</g>\n		</svg>\n	</button>\n	<button class="sub-menu search" (tap)="invokeSearch()">\n		<div class="outline"></div>\n		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n			<g fill="none" fill-rule="evenodd">\n				<circle cx="24" cy="24" r="24" fill="#435259" fill-opacity=".95"/>\n				<path fill="#FFF" d="M28.7753906,27.7753906 L35.25,34.1914062 L33.3164062,36.125 L26.9296875,29.7089844 L26.9296875,28.6542969 L26.5195312,28.3320312 C25.7968714,28.9570344 24.9668016,29.4501935 24.0292969,29.8115234 C23.0917922,30.1728534 22.1054739,30.3535156 21.0703125,30.3535156 C19.917963,30.3535156 18.8388722,30.1337913 17.8330078,29.6943359 C16.8271434,29.2548806 15.9482459,28.6543007 15.1962891,27.8925781 C14.4443322,27.1308556 13.848635,26.2470753 13.4091797,25.2412109 C12.9697244,24.2353465 12.75,23.1464902 12.75,21.9746094 C12.75,20.8222599 12.9697244,19.7382863 13.4091797,18.7226562 C13.848635,17.7070262 14.4394494,16.8232459 15.1816406,16.0712891 C15.9238318,15.3193322 16.7978465,14.723635 17.8037109,14.2841797 C18.8095753,13.8447244 19.8789006,13.625 21.0117188,13.625 C22.1640683,13.625 23.2480418,13.8447244 24.2636719,14.2841797 C25.279302,14.723635 26.1630822,15.3193322 26.9150391,16.0712891 C27.6669959,16.8232459 28.2626931,17.7070262 28.7021484,18.7226562 C29.1416038,19.7382863 29.3613281,20.8222599 29.3613281,21.9746094 C29.3613281,23.0488335 29.1806659,24.0449173 28.8193359,24.9628906 C28.458006,25.880864 27.9746124,26.7109338 27.3691406,27.453125 L27.75,27.7753906 L28.7753906,27.7753906 Z M21.0703125,27.7753906 C21.8710978,27.7753906 22.6230434,27.624025 23.3261719,27.3212891 C24.0293004,27.0185532 24.6445286,26.6035183 25.171875,26.0761719 C25.6992214,25.5488255 26.1093735,24.9335973 26.4023438,24.2304688 C26.695314,23.5273402 26.8417969,22.7753946 26.8417969,21.9746094 C26.8417969,21.1738241 26.695314,20.4218785 26.4023438,19.71875 C26.1093735,19.0156215 25.6992214,18.405276 25.171875,17.8876953 C24.6445286,17.3701146 24.0293004,16.9599625 23.3261719,16.6572266 C22.6230434,16.3544907 21.8710978,16.203125 21.0703125,16.203125 C20.2695272,16.203125 19.5224644,16.3544907 18.8291016,16.6572266 C18.1357387,16.9599625 17.5253933,17.3701146 16.9980469,17.8876953 C16.4707005,18.405276 16.0605483,19.0156215 15.7675781,19.71875 C15.4746079,20.4218785 15.328125,21.1738241 15.328125,21.9746094 C15.328125,22.7753946 15.4746079,23.5273402 15.7675781,24.2304688 C16.0605483,24.9335973 16.4707005,25.5488255 16.9980469,26.0761719 C17.5253933,26.6035183 18.1357387,27.0185532 18.8291016,27.3212891 C19.5224644,27.624025 20.2695272,27.7753906 21.0703125,27.7753906 Z"/>\n			</g>\n		</svg>\n	</button>\n	<button class="sub-menu settings" (tap)="invokeSettings()">\n		<div class="outline"></div>\n		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n			<g fill="none" fill-rule="evenodd">\n				<circle cx="24" cy="24" r="24" fill="#435259" fill-opacity=".95"/>\n				<path fill="#FFF" d="M33.0820312,23.875 C33.0820312,24.5781285 33.2822246,25.2031223 33.6826172,25.75 C34.0830098,26.2968777 34.6054655,26.765623 35.25,27.15625 C35.1328119,27.546877 34.9960945,27.9277325 34.8398438,28.2988281 C34.683593,28.6699237 34.5078135,29.0312482 34.3125,29.3828125 C33.5898401,29.187499 32.930667,29.2119128 32.3349609,29.4560547 C31.7392548,29.7001965 31.1875025,30.0664038 30.6796875,30.5546875 C30.1914038,31.0625025 29.8691414,31.6142548 29.7128906,32.2099609 C29.5566398,32.805667 29.5761709,33.4648401 29.7714844,34.1875 C29.4199201,34.3828135 29.0585956,34.558593 28.6875,34.7148438 C28.3164044,34.8710945 27.9355488,35.0078119 27.5449219,35.125 C27.1542949,34.4804655 26.6416047,33.9580098 26.0068359,33.5576172 C25.3720671,33.1572246 24.7031285,32.9570312 24,32.9570312 C23.2968715,32.9570312 22.6230501,33.1572246 21.9785156,33.5576172 C21.3339812,33.9580098 20.8261737,34.4804655 20.4550781,35.125 C20.0644512,35.0078119 19.6835956,34.8710945 19.3125,34.7148438 C18.9414044,34.558593 18.5800799,34.3828135 18.2285156,34.1875 C18.4042978,33.4648401 18.418946,32.805667 18.2724609,32.2099609 C18.1259758,31.6142548 17.7988307,31.0625025 17.2910156,30.5546875 C16.8027319,30.0664038 16.2607452,29.7441414 15.6650391,29.5878906 C15.069333,29.4316398 14.4101599,29.4511709 13.6875,29.6464844 C13.4921865,29.2949201 13.316407,28.9335956 13.1601562,28.5625 C13.0039055,28.1914044 12.8671881,27.8105488 12.75,27.4199219 C13.3945345,27.0292949 13.9169902,26.5166047 14.3173828,25.8818359 C14.7177754,25.2470671 14.9179688,24.5781285 14.9179688,23.875 C14.9179688,23.1718715 14.7177754,22.5468777 14.3173828,22 C13.9169902,21.4531223 13.3945345,20.984377 12.75,20.59375 C12.8671881,20.203123 13.0039055,19.8222675 13.1601562,19.4511719 C13.316407,19.0800763 13.4921865,18.7187518 13.6875,18.3671875 C14.4101599,18.562501 15.069333,18.5380872 15.6650391,18.2939453 C16.2607452,18.0498035 16.8124975,17.6835962 17.3203125,17.1953125 C17.8085962,16.6874975 18.1308586,16.1357452 18.2871094,15.5400391 C18.4433602,14.944333 18.4238291,14.2851599 18.2285156,13.5625 C18.5800799,13.3671865 18.9414044,13.191407 19.3125,13.0351562 C19.6835956,12.8789055 20.0644512,12.7421881 20.4550781,12.625 C20.8457051,13.2695345 21.3583953,13.7919902 21.9931641,14.1923828 C22.6279329,14.5927754 23.2968715,14.7929688 24,14.7929688 C24.7031285,14.7929688 25.3720671,14.5927754 26.0068359,14.1923828 C26.6416047,13.7919902 27.1542949,13.2695345 27.5449219,12.625 C27.9355488,12.7421881 28.3164044,12.8789055 28.6875,13.0351562 C29.0585956,13.191407 29.4199201,13.3671865 29.7714844,13.5625 C29.5761709,14.2851599 29.5566398,14.944333 29.7128906,15.5400391 C29.8691414,16.1357452 30.1914038,16.6874975 30.6796875,17.1953125 C31.1875025,17.6835962 31.7392548,18.0498035 32.3349609,18.2939453 C32.930667,18.5380872 33.5898401,18.562501 34.3125,18.3671875 C34.5078135,18.7187518 34.683593,19.0800763 34.8398438,19.4511719 C34.9960945,19.8222675 35.1328119,20.203123 35.25,20.59375 C34.6054655,20.984377 34.0830098,21.4531223 33.6826172,22 C33.2822246,22.5468777 33.0820312,23.1718715 33.0820312,23.875 Z M24,29.5 C25.5625078,29.5 26.8906195,28.9482477 27.984375,27.8447266 C29.0781305,26.7412054 29.625,25.4179765 29.625,23.875 C29.625,22.3124922 29.0732477,20.9843805 27.9697266,19.890625 C26.8662054,18.7968695 25.5429765,18.25 24,18.25 C22.4374922,18.25 21.1093805,18.8017523 20.015625,19.9052734 C18.9218695,21.0087946 18.375,22.3320235 18.375,23.875 C18.375,25.4375078 18.9267523,26.7656195 20.0302734,27.859375 C21.1337946,28.9531305 22.4570235,29.5 24,29.5 Z"/>\n			</g>\n		</svg>\n	</button>\n</div>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/navigator/navigator.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], Navigator);
    return Navigator;
}());

//# sourceMappingURL=navigator.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
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
var LoadComponent = (function () {
    function LoadComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ;
    Object.defineProperty(LoadComponent.prototype, "name", {
        set: function (name) {
            var icon = __webpack_require__(451)("./" + name + ".svg");
            this.html = this.sanitizer.bypassSecurityTrustHtml(icon);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], LoadComponent.prototype, "name", null);
    LoadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "load",
            template: "<div [innerHTML]=\"html\"></div>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], LoadComponent);
    return LoadComponent;
}());

//# sourceMappingURL=load.js.map

/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./add.svg": 452,
	"./added.svg": 453,
	"./deny.svg": 454,
	"./write.svg": 455
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
webpackContext.id = 451;

/***/ }),

/***/ 452:
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"178\" height=\"206\" viewBox=\"0 0 89 103\">\n  <metadata><?xpacket begin=\"﻿\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"/>\n   </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\"w\"?></metadata>\n  <path id=\"add\" class=\"fill-primary\" d=\"M480.5,880L435.985,854.25V802.759L480.5,777.013l44.515,25.746V854.25ZM496,832H484v12h-7V832H465v-7h12V813h7v12h12v7Z\" transform=\"translate(-436 -777)\"/>\n</svg>\n"

/***/ }),

/***/ 453:
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"178\" height=\"206\" viewBox=\"0 0 89 103\">\n  <metadata><?xpacket begin=\"﻿\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"/>\n   </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\"w\"?></metadata>\n  <path id=\"added\" class=\"fill-primary\" d=\"M480.5,880L435.985,854.25V802.759L480.5,777.013l44.515,25.746V854.25Zm18.5-61.23-24.725,24.24-12.291-12.032,4.869-4.753,7.422,7.278,19.855-19.487Z\" transform=\"translate(-436 -777)\"/>\n</svg>\n"

/***/ }),

/***/ 454:
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"178\" height=\"206\" viewBox=\"0 0 89 103\">\n  <metadata><?xpacket begin=\"﻿\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"/>\n   </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\"w\"?></metadata>\n  <path id=\"deny\" class=\"fill-grey\" d=\"M953.5,880L908.985,854.25V802.759L953.5,777.013l44.515,25.746V854.25Zm8.485-38.061L953.5,833.45l-8.485,8.485-4.95-4.95,8.485-8.485-8.485-8.485,4.95-4.95,8.485,8.485,8.485-8.485,4.95,4.95L958.45,828.5l8.485,8.485Z\" transform=\"translate(-909 -777)\"/>\n</svg>\n"

/***/ }),

/***/ 455:
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"178\" height=\"206\" viewBox=\"0 0 89 103\">\n  <metadata><?xpacket begin=\"﻿\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"/>\n   </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\"w\"?></metadata>\n  <path id=\"write_corner\" data-name=\"write corner\" class=\"fill-primaryDark\" d=\"M6.577,102l6.651-24.883L31.4,95.331Z\"/>\n  <path id=\"write\" class=\"fill-primary\" d=\"M44.5,103L0,77.25V25.75L44.5,0,89,25.75v51.5ZM19,43.149V36.994H70V43.15H19ZM70,55.078H19V48.922H70v6.156ZM50,67.006H19V60.851H50v6.156Z\"/>\n</svg>\n"

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProgress; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingProgress = (function () {
    function LoadingProgress(element) {
        this.element = element;
    }
    LoadingProgress.prototype.getBackgroundElement = function () {
        var element = this.element.nativeElement.parentElement;
        while (element && !element.classList.contains(this.backgroundClass)) {
            element = element.parentElement;
        }
        return element;
    };
    LoadingProgress.prototype.getForegroundElement = function () {
        var element = this.element.nativeElement.querySelector('.dummy');
        return element.classList.contains(this.foregroundClass) ? element : null;
    };
    Object.defineProperty(LoadingProgress.prototype, "progressColor", {
        get: function () {
            if (!this._progressColor) {
                var element = this.getForegroundElement();
                this._progressColor = element ? window.getComputedStyle(element)
                    .getPropertyValue('color') : null;
            }
            return this._progressColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingProgress.prototype, "progressBackground", {
        get: function () {
            if (!this._progressBackground) {
                var element = this.getForegroundElement();
                this._progressBackground = element ? window.getComputedStyle(element)
                    .getPropertyValue('background-color') : null;
            }
            return this._progressBackground;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingProgress.prototype, "background", {
        get: function () {
            if (!this._background !== undefined) {
                var element = this.getBackgroundElement();
                if (!element) {
                    this._background = 'inherit';
                }
                this._background = window.getComputedStyle(element)
                    .getPropertyValue('background-color');
            }
            return this._background;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingProgress.prototype, "progressArc", {
        get: function () {
            var progress = this.progress();
            var _a = this, progressBackground = _a.progressBackground, progressColor = _a.progressColor;
            if (!progressBackground || !progressColor) {
                return "";
            }
            var deg, result;
            if (progress <= 0.5) {
                deg = 90 + 180 * progress * 2;
                result = "linear-gradient(90deg, " + progressBackground + " 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(" + deg + "deg, " + progressColor + " 50%, " + progressBackground + " 50%, " + progressBackground + ")";
            }
            else {
                deg = -90 + 180 * (2 * (progress - .5));
                result = "linear-gradient(" + deg + "deg, " + progressColor + " 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, " + progressColor + " 50%, " + progressBackground + " 50%, " + progressBackground + ")";
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], LoadingProgress.prototype, "className", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], LoadingProgress.prototype, "progress", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], LoadingProgress.prototype, "backgroundClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], LoadingProgress.prototype, "foregroundClass", void 0);
    LoadingProgress = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "loading-progress",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/loadingProgress.html"*/'<div *ngIf="progress && progress() <= 1" [ngStyle]="{\'background-image\': progressArc}" class="progressbar">\n	<div class="dummy" [ngClass]="foregroundClass"></div>\n	<div class="hole" [ngStyle]="{\'background-color\': background}"></div>\n</div>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/loadingProgress.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
    ], LoadingProgress);
    return LoadingProgress;
}());

//# sourceMappingURL=loadingProgress.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HexagonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HexagonComponent = (function () {
    function HexagonComponent() {
    }
    ;
    HexagonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "hexagon",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/hexagon.svg"*/'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 433 500" style="enable-background:new 0 0 433 500;" xml:space="preserve">\n	<path class="border" d="M216.5,0L0,125v250l216.5,125L433,375V125L216.5,0z M417.9,366.3L216.5,482.6L15.1,366.3V133.7L216.5,17.4 l201.4,116.3V366.3z"/>\n  <g transform="scale(1.01)">\n		<polygon class="content" points="15.1,133.7 216.5,17.4 417.9,133.7 417.9,366.3 216.5,482.6 15.1,366.3" fill="#fff"/>\n	</g>\n</svg>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/hexagon.svg"*/
        }),
        __metadata("design:paramtypes", [])
    ], HexagonComponent);
    return HexagonComponent;
}());

//# sourceMappingURL=hexagon.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorHexagon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavigatorHexagon = (function () {
    function NavigatorHexagon() {
    }
    ;
    NavigatorHexagon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "navigator-hexagon",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/navigator/hexagon.svg"*/'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="73" height="84" viewBox="0 0 73 84">\n  <defs>\n    <rect id="green-a" width="4847" height="4674" x="-259" y="-118"/>\n    <polygon id="green-c" points="36.5 2 70 21.341 70 60.024 36.5 79.365 3 60.024 3 21.341"/>\n  </defs>\n  <g fill="none" fill-rule="evenodd">\n    <rect width="4845" height="4672" x="-258" y="-117" stroke="#D5D8DA" stroke-width="2"/>\n    <g transform="scale(1.02)">\n      <use fill="#FFF" fill-opacity="0.95" xlink:href="#green-c"/>\n    </g>\n    <path stroke="#5AB70D" stroke-width="4" d="M36.5,2.30940108 L2,22.2279854 L2,62.0651539 L36.5,81.9837382 L71,62.0651539 L71,22.2279854 L36.5,2.30940108 Z"/>\n  </g>\n</svg>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/navigator/hexagon.svg"*/
        }),
        __metadata("design:paramtypes", [])
    ], NavigatorHexagon);
    return NavigatorHexagon;
}());

//# sourceMappingURL=hexagon.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavigatorIcon = (function () {
    function NavigatorIcon() {
        this.icon = 'plus';
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String)
    ], NavigatorIcon.prototype, "icon", void 0);
    NavigatorIcon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "navigator-icon",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/navigator/icon.html"*/'<div>\n	<div *ngIf="icon === \'plus\'" class="icon plus">\n		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">\n			<g fill-rule="evenodd" fill="#A0A7AA">\n				<path d="M10,7 L10,0 L7,0 L7,7 L1.8369702e-16,7 L0,10 L7,10 L7,17 L10,17 L10,10 L17,10 L17,7 L10,7 Z"/>\n			</g>\n		</svg>\n	</div>\n	<div *ngIf="icon === \'arrow\'" class="icon arrow">\n		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">\n			<g fill-rule="evenodd" fill="#A0A7AA">\n				<polygon points="4 2.034 6.034 0 14.846 8.813 6.034 17.625 4 15.591 10.779 8.813"/>\n			</g>\n		</svg>\n	</div>\n	<div *ngIf="icon === \'close\'" class="icon close">\n		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">\n			<g fill-rule="evenodd" fill="#A0A7AA">\n				<path d="M9.82352941,7.41421356 L9.82352941,-0.585786438 L6.82352941,-0.585786438 L6.82352941,7.41421356 L-1.17647059,7.41421356 L-1.17647059,10.4142136 L6.82352941,10.4142136 L6.82352941,18.4142136 L9.82352941,18.4142136 L9.82352941,10.4142136 L17.8235294,10.4142136 L17.8235294,7.41421356 L9.82352941,7.41421356 Z" transform="rotate(45 8.324 8.914)"/>\n			</g>\n		</svg>\n	</div>\n</div>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/navigator/icon.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], NavigatorIcon);
    return NavigatorIcon;
}());

//# sourceMappingURL=icon.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SameArray */
var Memoizer = (function () {
    function Memoizer(selectors, reduce) {
        this.selectors = selectors;
        this.reduce = reduce;
    }
    Memoizer.prototype.hasChanged = function (newValues) {
        var _this = this;
        if (!this.values) {
            return true;
        }
        var index = newValues.findIndex(function (val, index) {
            var previousVal = _this.values[index];
            if (previousVal === val) {
                return false;
            }
            if (Array.isArray(val) && Array.isArray(previousVal) && val.length === 0 && previousVal.length === 0) {
                return false;
            }
            return true;
        });
        if (index > -1) {
            // console.warn(`Memoizer recalculated at ${index}`, this.values, newValues)
        }
        return index > -1;
    };
    Memoizer.prototype.getValue = function () {
        var newValues = this.selectors.map(function (selector) { return selector(); });
        if (!this.hasChanged(newValues)) {
            return this.cachedValue;
        }
        this.values = newValues;
        this.cachedValue = this.reduce.apply(this, this.values.concat([this.cachedValue]));
        return this.cachedValue;
    };
    return Memoizer;
}());
/* harmony default export */ __webpack_exports__["a"] = (Memoizer);
var SameArray = (function () {
    function SameArray() {
        var _this = this;
        this.arr = [];
        this.setValue = function (newValues) {
            if (_this.previousInput === newValues) {
                return;
            }
            _this.arr.splice(0, _this.arr.length);
            _this.arr.push.apply(_this.arr, newValues);
            _this.previousInput = newValues;
        };
        this.getValue = function () { return _this.arr; };
    }
    return SameArray;
}());

//# sourceMappingURL=memoizer.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__asset_Progress__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__blobService__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__asset_blobCache__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__asset_Queue__ = __webpack_require__(281);
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
var uploadQueue = new __WEBPACK_IMPORTED_MODULE_5__asset_Queue__["a" /* default */](3);
uploadQueue.start();
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
            return uploadQueue.enqueue(1, function () {
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

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsWithSearch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_services_error_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_asset_memoizer__ = __webpack_require__(460);
var contactsService = __webpack_require__(82);
var userService = __webpack_require__(9).default;




var filterContacts = function (contacts, searchTerm) {
    if (!searchTerm) {
        return contacts;
    }
    return contacts.filter(function (contact) {
        return contact.names.searchName.indexOf(searchTerm.toLowerCase()) > -1;
    });
};
var ContactsWithSearch = (function () {
    function ContactsWithSearch(translate) {
        var _this = this;
        this.translate = translate;
        this.contacts = [];
        this.contactsLoading = true;
        this.searchResults = [];
        this.searchResultsLoading = false;
        this.loadedContactIDs = [];
        this.searchTerm = "";
        this.loadContactsUsers = function () {
            var contacts = contactsService.getFriends();
            if (__WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].arrayEqual(_this.loadedContactIDs, contacts)) {
                return __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"]();
            }
            _this.loadedContactIDs = contacts.slice();
            return userService.getMultipleFormatted(contacts)
                .then(function (result) { return ContactsWithSearch.sort(result); })
                .then(function (result) { return _this.contacts = result; });
        };
        this.contactDividers = function (record, recordIndex, records) {
            var firstChar = record.name[0];
            if (recordIndex === 0) {
                if (_this.searchTerm) {
                    if (record.isMyFriend) {
                        return _this.translate.instant("chooseFriends.contacts");
                    }
                    else {
                        return _this.translate.instant("chooseFriends.global");
                    }
                }
                return firstChar.toUpperCase();
            }
            var previousEntry = records[recordIndex - 1];
            if (_this.searchTerm) {
                if (previousEntry.isMyFriend && !record.isMyFriend) {
                    return _this.translate.instant("chooseFriends.global");
                }
                return null;
            }
            if (firstChar.toLowerCase() !== previousEntry.name[0].toLowerCase()) {
                return firstChar.toUpperCase();
            }
            console.log('return null');
            return null;
        };
        this.executeSearch = __WEBPACK_IMPORTED_MODULE_2__helper_helper__["default"].debounce(function () {
            _this.searchResultsLoading = true;
            var query = _this.searchTerm;
            var contacts = contactsService.getFriends();
            userService.query(query).bind(_this).filter(function (user) {
                return contacts.indexOf(user.getID()) === -1;
            }).map(function (user) {
                if (this.searchTerm !== query) {
                    return;
                }
                return user.loadBasicData().thenReturn(user);
            }).then(function (users) {
                if (this.searchTerm !== query) {
                    return;
                }
                return users.map(function (user) {
                    user.loadBasicData().catch(__WEBPACK_IMPORTED_MODULE_0__lib_services_error_service__["default"].criticalError);
                    return user.data;
                });
            }).then(function (userData) {
                _this.searchResults = userData || [];
                _this.searchResultsLoading = false;
            });
        }, 100);
        this.getUsers = function () {
            return _this.memoizer.getValue();
        };
        this.memoizer = new __WEBPACK_IMPORTED_MODULE_3__lib_asset_memoizer__["a" /* default */]([
            function () { return _this.contacts; },
            function () { return _this.searchResults; },
            function () { return _this.searchTerm; }
        ], function (contacts, searchResults, searchTerm) {
            return filterContacts(contacts, searchTerm).concat(searchResults);
        });
    }
    ContactsWithSearch.sort = function (users) { return users.sort(function (a, b) {
        var firstAvailable = a.names.firstname && b.names.firstname;
        var lastAvailable = a.names.lastname && b.names.firstname;
        if (!firstAvailable && !lastAvailable) {
            return a.name.localeCompare(b.name);
        }
        else if (!firstAvailable) {
            return a.names.lastname.localeCompare(b.names.lastname);
        }
        else {
            return a.names.firstname.localeCompare(b.names.firstname);
        }
    }); };
    return ContactsWithSearch;
}());

//# sourceMappingURL=contactsWithSearch.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__screenSize_service__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fileUpload_service__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__blobService__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__asset_Queue__ = __webpack_require__(281);
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






var imageLib = __webpack_require__(465);
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

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asset_observer__ = __webpack_require__(17);
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

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript Load Image
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, URL, webkitURL, FileReader */

;(function ($) {
  'use strict'

  // Loads an image for a given File object.
  // Invokes the callback with an img or optional canvas
  // element (if supported by the browser) as parameter:
  function loadImage (file, callback, options) {
    var img = document.createElement('img')
    var url
    img.onerror = function (event) {
      return loadImage.onerror(img, event, file, callback, options)
    }
    img.onload = function (event) {
      return loadImage.onload(img, event, file, callback, options)
    }
    if (loadImage.isInstanceOf('Blob', file) ||
      // Files are also Blob instances, but some browsers
      // (Firefox 3.6) support the File API but not Blobs:
      loadImage.isInstanceOf('File', file)) {
      url = img._objectURL = loadImage.createObjectURL(file)
    } else if (typeof file === 'string') {
      url = file
      if (options && options.crossOrigin) {
        img.crossOrigin = options.crossOrigin
      }
    } else {
      return false
    }
    if (url) {
      img.src = url
      return img
    }
    return loadImage.readFile(file, function (e) {
      var target = e.target
      if (target && target.result) {
        img.src = target.result
      } else if (callback) {
        callback(e)
      }
    })
  }
  // The check for URL.revokeObjectURL fixes an issue with Opera 12,
  // which provides URL.createObjectURL but doesn't properly implement it:
  var urlAPI = (window.createObjectURL && window) ||
                (window.URL && URL.revokeObjectURL && URL) ||
                (window.webkitURL && webkitURL)

  function revokeHelper (img, options) {
    if (img._objectURL && !(options && options.noRevoke)) {
      loadImage.revokeObjectURL(img._objectURL)
      delete img._objectURL
    }
  }

  loadImage.isInstanceOf = function (type, obj) {
    // Cross-frame instanceof check
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }

  loadImage.transform = function (img, options, callback, file, data) {
    callback(loadImage.scale(img, options, data), data)
  }

  loadImage.onerror = function (img, event, file, callback, options) {
    revokeHelper(img, options)
    if (callback) {
      callback.call(img, event)
    }
  }

  loadImage.onload = function (img, event, file, callback, options) {
    revokeHelper(img, options)
    if (callback) {
      loadImage.transform(img, options, callback, file, {})
    }
  }

  // Transform image coordinates, allows to override e.g.
  // the canvas orientation based on the orientation option,
  // gets canvas, options passed as arguments:
  loadImage.transformCoordinates = function () {
    return
  }

  // Returns transformed options, allows to override e.g.
  // maxWidth, maxHeight and crop options based on the aspectRatio.
  // gets img, options passed as arguments:
  loadImage.getTransformedOptions = function (img, options) {
    var aspectRatio = options.aspectRatio
    var newOptions
    var i
    var width
    var height
    if (!aspectRatio) {
      return options
    }
    newOptions = {}
    for (i in options) {
      if (options.hasOwnProperty(i)) {
        newOptions[i] = options[i]
      }
    }
    newOptions.crop = true
    width = img.naturalWidth || img.width
    height = img.naturalHeight || img.height
    if (width / height > aspectRatio) {
      newOptions.maxWidth = height * aspectRatio
      newOptions.maxHeight = height
    } else {
      newOptions.maxWidth = width
      newOptions.maxHeight = width / aspectRatio
    }
    return newOptions
  }

  // Canvas render method, allows to implement a different rendering algorithm:
  loadImage.renderImageToCanvas = function (
    canvas,
    img,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    destX,
    destY,
    destWidth,
    destHeight
  ) {
    canvas.getContext('2d').drawImage(
      img,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      destWidth,
      destHeight
    )
    return canvas
  }

  // Determines if the target image should be a canvas element:
  loadImage.hasCanvasOption = function (options) {
    return options.canvas || options.crop || !!options.aspectRatio
  }

  // Scales and/or crops the given image (img or canvas HTML element)
  // using the given options.
  // Returns a canvas object if the browser supports canvas
  // and the hasCanvasOption method returns true or a canvas
  // object is passed as image, else the scaled image:
  loadImage.scale = function (img, options, data) {
    options = options || {}
    var canvas = document.createElement('canvas')
    var useCanvas = img.getContext ||
                    (loadImage.hasCanvasOption(options) && canvas.getContext)
    var width = img.naturalWidth || img.width
    var height = img.naturalHeight || img.height
    var destWidth = width
    var destHeight = height
    var maxWidth
    var maxHeight
    var minWidth
    var minHeight
    var sourceWidth
    var sourceHeight
    var sourceX
    var sourceY
    var pixelRatio
    var downsamplingRatio
    var tmp
    function scaleUp () {
      var scale = Math.max(
        (minWidth || destWidth) / destWidth,
        (minHeight || destHeight) / destHeight
      )
      if (scale > 1) {
        destWidth *= scale
        destHeight *= scale
      }
    }
    function scaleDown () {
      var scale = Math.min(
        (maxWidth || destWidth) / destWidth,
        (maxHeight || destHeight) / destHeight
      )
      if (scale < 1) {
        destWidth *= scale
        destHeight *= scale
      }
    }
    if (useCanvas) {
      options = loadImage.getTransformedOptions(img, options, data)
      sourceX = options.left || 0
      sourceY = options.top || 0
      if (options.sourceWidth) {
        sourceWidth = options.sourceWidth
        if (options.right !== undefined && options.left === undefined) {
          sourceX = width - sourceWidth - options.right
        }
      } else {
        sourceWidth = width - sourceX - (options.right || 0)
      }
      if (options.sourceHeight) {
        sourceHeight = options.sourceHeight
        if (options.bottom !== undefined && options.top === undefined) {
          sourceY = height - sourceHeight - options.bottom
        }
      } else {
        sourceHeight = height - sourceY - (options.bottom || 0)
      }
      destWidth = sourceWidth
      destHeight = sourceHeight
    }
    maxWidth = options.maxWidth
    maxHeight = options.maxHeight
    minWidth = options.minWidth
    minHeight = options.minHeight
    if (useCanvas && maxWidth && maxHeight && options.crop) {
      destWidth = maxWidth
      destHeight = maxHeight
      tmp = sourceWidth / sourceHeight - maxWidth / maxHeight
      if (tmp < 0) {
        sourceHeight = maxHeight * sourceWidth / maxWidth
        if (options.top === undefined && options.bottom === undefined) {
          sourceY = (height - sourceHeight) / 2
        }
      } else if (tmp > 0) {
        sourceWidth = maxWidth * sourceHeight / maxHeight
        if (options.left === undefined && options.right === undefined) {
          sourceX = (width - sourceWidth) / 2
        }
      }
    } else {
      if (options.contain || options.cover) {
        minWidth = maxWidth = maxWidth || minWidth
        minHeight = maxHeight = maxHeight || minHeight
      }
      if (options.cover) {
        scaleDown()
        scaleUp()
      } else {
        scaleUp()
        scaleDown()
      }
    }
    if (useCanvas) {
      pixelRatio = options.pixelRatio
      if (pixelRatio > 1) {
        canvas.style.width = destWidth + 'px'
        canvas.style.height = destHeight + 'px'
        destWidth *= pixelRatio
        destHeight *= pixelRatio
        canvas.getContext('2d').scale(pixelRatio, pixelRatio)
      }
      downsamplingRatio = options.downsamplingRatio
      if (downsamplingRatio > 0 && downsamplingRatio < 1 &&
            destWidth < sourceWidth && destHeight < sourceHeight) {
        while (sourceWidth * downsamplingRatio > destWidth) {
          canvas.width = sourceWidth * downsamplingRatio
          canvas.height = sourceHeight * downsamplingRatio
          loadImage.renderImageToCanvas(
            canvas,
            img,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            canvas.width,
            canvas.height
          )
          sourceX = 0
          sourceY = 0
          sourceWidth = canvas.width
          sourceHeight = canvas.height
          img = document.createElement('canvas')
          img.width = sourceWidth
          img.height = sourceHeight
          loadImage.renderImageToCanvas(
            img,
            canvas,
            0,
            0,
            sourceWidth,
            sourceHeight,
            0,
            0,
            sourceWidth,
            sourceHeight
          )
        }
      }
      canvas.width = destWidth
      canvas.height = destHeight
      loadImage.transformCoordinates(
        canvas,
        options
      )
      return loadImage.renderImageToCanvas(
        canvas,
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        destWidth,
        destHeight
      )
    }
    img.width = destWidth
    img.height = destHeight
    return img
  }

  loadImage.createObjectURL = function (file) {
    return urlAPI ? urlAPI.createObjectURL(file) : false
  }

  loadImage.revokeObjectURL = function (url) {
    return urlAPI ? urlAPI.revokeObjectURL(url) : false
  }

  // Loads a given File object via FileReader interface,
  // invokes the callback with the event object (load or error).
  // The result can be read via event.target.result:
  loadImage.readFile = function (file, callback, method) {
    if (window.FileReader) {
      var fileReader = new FileReader()
      fileReader.onload = fileReader.onerror = callback
      method = method || 'readAsDataURL'
      if (fileReader[method]) {
        fileReader[method](file)
        return fileReader
      }
    }
    return false
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return loadImage
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else if (typeof module === 'object' && module.exports) {
    module.exports = loadImage
  } else {
    $.loadImage = loadImage
  }
}(window))


/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_media__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);


var media = new __WEBPACK_IMPORTED_MODULE_0__ionic_native_media__["a" /* Media */]();
var VoicemailPlayer = (function () {
    function VoicemailPlayer(recordings) {
        var _this = this;
        this.playing = false;
        this.recordings = [];
        this.recordPlayingIndex = 0;
        this.position = 0;
        this.interval = null;
        this.loadingPromises = [];
        this.awaitLoading = function () {
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["all"](_this.loadingPromises);
        };
        this.statusListener = function (status) {
            if (status === media.MEDIA_STOPPED && _this.isPlaying()) {
                // Use a Promise to trigger the angular zone. Zones are bad. Angular DI is bad.
                __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"]().then(function () {
                    _this.recordPlayingIndex += 1;
                    _this.position = 0;
                    if (_this.recordPlayingIndex >= _this.recordings.length) {
                        _this.reset();
                        return;
                    }
                    _this.recordings[_this.recordPlayingIndex].recording.play();
                });
            }
        };
        this.recordings = recordings;
    }
    VoicemailPlayer.prototype.play = function () {
        var _this = this;
        this.awaitLoading().then(function () {
            if (VoicemailPlayer.activePlayer) {
                VoicemailPlayer.activePlayer.reset();
            }
            _this.recordings[_this.recordPlayingIndex].recording.play();
            VoicemailPlayer.activePlayer = _this;
            _this.playing = true;
            clearInterval(_this.interval);
            _this.interval = window.setInterval(function () {
                var indexAtInvocation = _this.recordPlayingIndex;
                _this.recordings[_this.recordPlayingIndex].recording.getCurrentPosition().then(function (pos) {
                    if (indexAtInvocation === _this.recordPlayingIndex && _this.interval !== null && pos !== -1) {
                        _this.position = pos;
                    }
                });
            }, 100);
        });
    };
    VoicemailPlayer.prototype.pause = function () {
        this.recordings[this.recordPlayingIndex].recording.pause();
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
        return this.recordings.slice(0, beforeIndex).reduce(function (prev, next) { return prev + next.duration; }, 0);
    };
    VoicemailPlayer.prototype.getPosition = function () {
        var currentDuration = this.getDuration(this.recordPlayingIndex);
        return currentDuration + this.position;
    };
    VoicemailPlayer.prototype.reset = function () {
        clearInterval(this.interval);
        this.recordings.forEach(function (_a) {
            var recording = _a.recording;
            return recording.stop();
        });
        this.recordPlayingIndex = 0;
        this.position = 0;
        this.interval = null;
        if (VoicemailPlayer.activePlayer && this !== VoicemailPlayer.activePlayer) {
            VoicemailPlayer.activePlayer.reset();
        }
        VoicemailPlayer.activePlayer = null;
        this.playing = false;
    };
    VoicemailPlayer.prototype.addRecording = function (path, estimatedDuration) {
        var _this = this;
        var isIOS = window.device.platform === "iOS";
        var currentRecording = media.create(isIOS ? path.replace(/^file:\/\//, '') : path);
        currentRecording.play();
        var recordingInfo = {
            path: path,
            recording: currentRecording,
            duration: estimatedDuration
        };
        var loadingPromise = new __WEBPACK_IMPORTED_MODULE_1_bluebird__(function (resolve) {
            var subscription = currentRecording.onStatusUpdate.subscribe(function (s) {
                if (s === media.MEDIA_RUNNING) {
                    currentRecording.stop();
                }
                if (s === media.MEDIA_STOPPED) {
                    subscription.unsubscribe();
                    resolve();
                }
            });
        }).then(function () {
            recordingInfo.duration = currentRecording.getDuration();
            currentRecording.onStatusUpdate.subscribe(_this.statusListener);
        });
        this.loadingPromises.push(loadingPromise);
        this.recordings.push(recordingInfo);
    };
    VoicemailPlayer.prototype.destroy = function () {
        this.recordings.forEach(function (_a) {
            var recording = _a.recording, path = _a.path;
            recording.release();
            // TODO delete file created!
            console.warn("TODO: delete file:", path);
        });
    };
    VoicemailPlayer.prototype.getRecordings = function () {
        return this.recordings.slice();
    };
    VoicemailPlayer.activePlayer = null;
    return VoicemailPlayer;
}());
/* harmony default export */ __webpack_exports__["a"] = (VoicemailPlayer);
//# sourceMappingURL=voicemailPlayer.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopicComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_pipes_seperatorDate__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__topicDisplay__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__burstDifference__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__message__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__syntaxify__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gallery_gallery__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_module__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var TopicComponentsModule = (function () {
    function TopicComponentsModule() {
    }
    TopicComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__lib_pipes_seperatorDate__["a" /* SeperatorDatePipe */],
                __WEBPACK_IMPORTED_MODULE_4__topicDisplay__["a" /* TopicComponent */],
                __WEBPACK_IMPORTED_MODULE_5__burstDifference__["a" /* BurstDifferenceComponent */],
                __WEBPACK_IMPORTED_MODULE_7__syntaxify__["a" /* SyntaxifyDirective */],
                __WEBPACK_IMPORTED_MODULE_8__gallery_gallery__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_6__message__["a" /* MessageComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_9__components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["b" /* TranslateModule */].forChild(),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__lib_pipes_seperatorDate__["a" /* SeperatorDatePipe */],
                __WEBPACK_IMPORTED_MODULE_4__topicDisplay__["a" /* TopicComponent */],
                __WEBPACK_IMPORTED_MODULE_5__burstDifference__["a" /* BurstDifferenceComponent */],
                __WEBPACK_IMPORTED_MODULE_7__syntaxify__["a" /* SyntaxifyDirective */],
                __WEBPACK_IMPORTED_MODULE_8__gallery_gallery__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_6__message__["a" /* MessageComponent */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            ]
        })
    ], TopicComponentsModule);
    return TopicComponentsModule;
}());

//# sourceMappingURL=topicComponentsModule.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeperatorDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var translateKeys = ["today", "yesterday"];
var SeperatorDatePipe = (function () {
    function SeperatorDatePipe(translate) {
        this.translate = translate;
    }
    SeperatorDatePipe.prototype.transform = function (value) {
        if (!value) {
            return "";
        }
        if (typeof value === "number") {
            value = new Date(value);
        }
        var momentValue = __WEBPACK_IMPORTED_MODULE_1_moment___default()(value);
        var formatted = momentValue.format("Do MMMM YYYY");
        var dayDiff = __WEBPACK_IMPORTED_MODULE_1_moment___default()().diff(momentValue, "days");
        if (dayDiff > 1) {
            return "" + formatted;
        }
        var dayDiffString = this.translate.instant("time." + translateKeys[dayDiff]);
        return dayDiffString + ", " + formatted;
    };
    SeperatorDatePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
            name: "seperatorDate"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], SeperatorDatePipe);
    return SeperatorDatePipe;
}());

//# sourceMappingURL=seperatorDate.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopicComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_media__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_services_imageUpload_service__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_services_fileUpload_service__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_typestate__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_typestate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_typestate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_uuid_v4__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_uuid_v4__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lib_asset_voicemailPlayer__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__lib_services_blobService__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__lib_services_featureToggles__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lib_services_location_manager__ = __webpack_require__(52);
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
var RecordingStateMachine = new __WEBPACK_IMPORTED_MODULE_11_typestate__["TypeState"].FiniteStateMachine(RecordingStates.NotRecording);
RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.Recording);
RecordingStateMachine.fromAny(RecordingStates).to(RecordingStates.NotRecording);
RecordingStateMachine.from(RecordingStates.Recording).to(RecordingStates.Paused);
var ImagePickerOptions = {
    width: 2560,
    height: 1440,
    maximumImagesCount: 6
};
var INFINITE_SCROLLING_THRESHOLD = 1000;
var MAXIMUM_FILE_SIZE_MB = Object(__WEBPACK_IMPORTED_MODULE_16__lib_services_location_manager__["c" /* isBusinessVersion */])() ? 15 : 10;
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
var FILE = new __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */]();
var TopicComponent = (function () {
    function TopicComponent(navCtrl, actionSheetCtrl, platform, imagePicker, camera, translate, media, alertController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.platform = platform;
        this.imagePicker = imagePicker;
        this.camera = camera;
        this.translate = translate;
        this.media = media;
        this.alertController = alertController;
        this.sendMessage = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
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
            var voicemails = _this.recordingPlayer.getRecordings();
            _this.recordingPlayer.awaitLoading().thenReturn(voicemails).map(function (_a) {
                var path = _a.path, recording = _a.recording, duration = _a.duration;
                var _b = Object(__WEBPACK_IMPORTED_MODULE_14__lib_services_blobService__["b" /* unpath */])(path), directory = _b.directory, name = _b.name;
                return FILE.moveFile(_this.platform.is("ios") ? "file://" + directory : directory, name, FILE.cacheDirectory, name).then(function () { return ({
                    path: "" + FILE.cacheDirectory + name,
                    duration: duration, recording: recording
                }); });
            }).map(function (voicemail) {
                var path = voicemail.path, duration = voicemail.duration;
                return _this.getFile(path).then(function (fileObject) {
                    return new __WEBPACK_IMPORTED_MODULE_9__lib_services_fileUpload_service__["a" /* default */](fileObject, { encrypt: true, extraInfo: { duration: duration } });
                });
            }).then(function (voicemails) {
                _this.sendMessage.emit({
                    text: "",
                    voicemails: voicemails,
                });
            }).catch(function (e) {
                console.error("Sending voicemail failed", e);
                // TODO
            });
            _this.resetRecordingState();
        };
        this.sendMessageToChat = function () {
            if (_this.isRecordingUIVisible()) {
                if (_this.isRecording()) {
                    _this.toggleRecording();
                }
                _this.sendVoicemail();
                return;
            }
            _this.sendMessage.emit({
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
                return new __WEBPACK_IMPORTED_MODULE_8__lib_services_imageUpload_service__["a" /* default */](file);
            }).then(function (image) {
                _this.sendMessage.emit({
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
            var recordingID = _this.recordingPlayer.getRecordings().length;
            var extension = _this.platform.is("ios") ? "m4a" : "aac";
            var dir = _this.getRecordingDir();
            return dir + "recording_" + _this.recordingInfo.UUID + "_" + recordingID + "." + extension;
        };
        this.formatTime = function (seconds) {
            var fullSeconds = __WEBPACK_IMPORTED_MODULE_10__lib_helper_helper__["default"].pad(Math.floor(seconds % 60), 2);
            var minutes = __WEBPACK_IMPORTED_MODULE_10__lib_helper_helper__["default"].pad(Math.floor(seconds / 60), 2);
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
            if (RecordingStateMachine.is(RecordingStates.Recording)) {
                RecordingStateMachine.go(RecordingStates.Paused);
                clearInterval(_this.recordingInfo.updateInterval);
                _this.recordingFile.stopRecord();
                _this.recordingFile.release();
                _this.recordingFile = null;
                _this.recordingPlayer.addRecording(_this.getRecordingFileName(), _this.recordingInfo.duration);
                _this.recordingInfo.duration = 0;
            }
            else {
                RecordingStateMachine.go(RecordingStates.Recording);
                _this.startRecording();
            }
        };
        this.resetRecordingState = function () {
            if (_this.recordingFile) {
                _this.recordingFile.release();
                _this.recordingFile = null;
            }
            clearInterval(_this.recordingInfo.updateInterval);
            _this.recordingPlayer.reset();
            _this.recordingPlayer = new __WEBPACK_IMPORTED_MODULE_13__lib_asset_voicemailPlayer__["a" /* default */]([]);
            RecordingStateMachine.go(RecordingStates.NotRecording);
        };
        this.discardRecording = function () {
            _this.recordingPlayer.destroy();
            _this.resetRecordingState();
        };
        this.getPosition = function () {
            return _this.recordingPlayer.getPosition();
        };
        this.togglePlayback = function () {
            _this.recordingPlayer.toggle();
        };
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
                        return new __WEBPACK_IMPORTED_MODULE_8__lib_services_imageUpload_service__["a" /* default */](file);
                    }).then(function (images) {
                        _this.sendMessage.emit({
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
                        .then(function (file) { return new __WEBPACK_IMPORTED_MODULE_9__lib_services_fileUpload_service__["a" /* default */](file, { encrypt: true, extraInfo: {} }); })
                        .then(function (file) {
                        _this.sendMessage.emit({
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
            var buttons = __WEBPACK_IMPORTED_MODULE_15__lib_services_featureToggles__["a" /* default */].isFeatureEnabled("chat.fileTransfer") ?
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
        this.updateElementsInView = __WEBPACK_IMPORTED_MODULE_10__lib_helper_helper__["default"].debounce(function () {
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
        this.cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: !this.platform.is('ios'),
            correctOrientation: true
        };
        this.recordingPlayer = new __WEBPACK_IMPORTED_MODULE_13__lib_asset_voicemailPlayer__["a" /* default */]([]);
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
    }
    TopicComponent.prototype.ngAfterViewInit = function () {
        window.addEventListener('resize', this.keyboardChange);
        this.content.nativeElement.addEventListener('scroll', this.onScroll);
        this.mutationObserver = new MutationObserver(this.mutationListener);
        this.mutationObserver.observe(this.content.nativeElement, { childList: true, subtree: true });
    };
    TopicComponent.prototype.ngOnDestroy = function () {
        window.removeEventListener('resize', this.keyboardChange);
        this.content.nativeElement.removeEventListener('scroll', this.onScroll);
        this.mutationObserver.disconnect();
    };
    TopicComponent.prototype.showRecordIcon = function () {
        if (!__WEBPACK_IMPORTED_MODULE_15__lib_services_featureToggles__["a" /* default */].isFeatureEnabled("chat.voiceMail")) {
            return false;
        }
        return this.newMessageText.length === 0;
    };
    TopicComponent.prototype.showFileTooBigWarning = function () {
        var alert = this.alertController.create({
            title: this.translate.instant("topic.fileTooBigTitle"),
            subTitle: this.translate.instant("topic.fileTooBigDetail", { max_size: MAXIMUM_FILE_SIZE_MB }),
            buttons: ['OK']
        });
        alert.present();
    };
    TopicComponent.prototype.startRecording = function () {
        var _this = this;
        if (this.recordingFile) {
            return;
        }
        if (!this.recordingInfo.UUID) {
            this.recordingInfo.UUID = __WEBPACK_IMPORTED_MODULE_12_uuid_v4___default()();
        }
        this.recordingFile = this.media.create(this.getRecordingFileName());
        this.recordingInfo.startTime = Date.now();
        this.recordingFile.startRecord();
        clearInterval(this.recordingInfo.updateInterval);
        this.recordingInfo.updateInterval = window.setInterval(function () {
            _this.recordingInfo.duration = (Date.now() - _this.recordingInfo.startTime) / 1000;
        }, 100);
    };
    TopicComponent.prototype.realScrollHeight = function (element) {
        return element.scrollHeight - element.clientHeight;
    };
    TopicComponent.prototype.checkLoadMoreMessages = function () {
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
    TopicComponent.prototype.afterViewBurstMessages = function () {
        var id = this.getFirstInViewMessageId();
        if (!id) {
            return { changed: false, bursts: [] };
        }
        var _a = this.messageBurstsFunction({
            after: id
        }), changed = _a.changed, bursts = _a.bursts;
        return { changed: changed, bursts: bursts };
    };
    TopicComponent.prototype.allBurstMessages = function () {
        var bursts = this.messageBurstsFunction().bursts;
        return bursts;
    };
    TopicComponent.prototype.isPreviousMissing = function (burst) {
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
    TopicComponent.prototype.ngOnChanges = function (changes) {
        var chatChanges = changes["chat"];
        if (!chatChanges || !chatChanges.currentValue || this.newMessageText !== "") {
            return;
        }
        this.newMessageText = chatChanges.currentValue.newMessage;
    };
    TopicComponent.prototype.change = function () {
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
    TopicComponent.prototype.goToDetails = function () {
        if (!this.chat) {
            return;
        }
        this.navCtrl.push("Chat Details", {
            chatID: this.chat.id
        });
    };
    TopicComponent.prototype.goToProfile = function (userId) {
        if (this.chat) {
            return;
        }
        this.navCtrl.push("Profile", {
            userId: userId
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], TopicComponent.prototype, "partners", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], TopicComponent.prototype, "chat", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], TopicComponent.prototype, "messageBurstsFunction", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], TopicComponent.prototype, "loadMoreMessages", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], TopicComponent.prototype, "messagesLoading", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
        __metadata("design:type", Object)
    ], TopicComponent.prototype, "sendMessage", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], TopicComponent.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('footer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], TopicComponent.prototype, "footer", void 0);
    TopicComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "topicWithBursts",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/topic/topic.html"*/'<ion-header>\n	<ion-navbar [color]="\'primary\'" no-border>\n		<ion-title (click)="goToDetails()">\n\n			<!-- Actual navbar title -->\n			<span class="messages__header__username" [ngClass]="{\'messages__header__username--no-image\': partners.length > 1}">\n				<span *ngIf="!chat || !chat.getTitle()">\n					<span *ngIf="partners.length == 1" (click)="goToProfile(partners[0].id)">\n						{{ partners[0].name }}\n					</span>\n					<span *ngIf="partners.length != 1">\n						<span *ngFor="let partner of partners; let l = last" (click)="goToProfile(partner.id)">\n							{{ partner.basic.shortname }}{{ l ? "":", " }}\n						</span>\n					</span>\n				</span>\n				<span *ngIf="chat && chat.getTitle()">\n					{{chat.getTitle()}}\n				</span>\n			</span>\n\n			<!-- Avatar for one user -->\n			<ion-avatar item-left class="messages__header-image hexagon__image hexagon__image--small" *ngIf="partners.length == 1" (click)="goToProfile(partners[0].id)">\n				<user-image [id]="partners[0].id" [image]="partners[0].basic.image"></user-image>\n			</ion-avatar>\n\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<div class="messages__list" #content>\n		<ion-spinner *ngIf="messagesLoading" text-center margin-vertical class="spinner--full"></ion-spinner>\n		<div class="messages_filler"></div>\n		<ion-list no-lines>\n			<ion-item class="messages__burst" *ngIf="messageBursts() && bursts.length === 0">\n				<BurstDifference [chat]="chat" [burst]="bursts[0]"></BurstDifference>\n			</ion-item>\n			<ion-item class="messages__burst" *ngFor="let burst of bursts; let $index=index; let $last=last" [ngClass]="{\'burst--me\': burst.isMe(), \'burst--other\': burst.isOther()}">\n				<BurstDifference [chat]="chat" [burst]="burst" [previousBurst]="bursts[$index - 1]"></BurstDifference>\n\n				<div *ngIf="isPreviousMissing(burst)" style="\n					display: flex;\n					justify-content: center;\n					align-items: center;\n				">\n					<ion-spinner text-center name="dots" duration="1500"></ion-spinner>\n				</div>\n\n				<span>\n					<div *ngIf="burst.isOther() && partners.length > 1">{{burst.firstItem().data.sender.name}}</div>\n					<Message [message]="message" *ngFor="let message of burst.items"></Message>\n				</span>\n\n				<BurstDifference [chat]="chat" [previousBurst]="burst" [noDates]="true" *ngIf="$last"></BurstDifference>\n			</ion-item>\n		</ion-list>\n	</div>\n\n	<div class="messages__form" *ngIf="platform.is(\'ios\')" #footer>\n		<div *ngIf="isRecordingUIVisible()" class="messages__form__button-wrap">\n			<button ion-button icon-only clear color="grey" class="ios__messages__add-assets" (click)="discardRecording()">\n				<ion-icon name="trash"></ion-icon>\n			</button>\n			<button ion-button icon-only clear color="danger" class="ios__messages__add-assets" (click)="toggleRecording()">\n				<ion-icon name="mic" *ngIf="isPaused()"></ion-icon>\n				<ion-icon name="pause" *ngIf="!isPaused()"></ion-icon>\n			</button>\n			<button *ngIf="isPaused()" ion-button icon-only clear color="grey" class="ios__messages__add-assets" (click)="togglePlayback()">\n				<ion-icon name="{{(isPlayback() ? \'pause\' : \'play\')}}"></ion-icon>\n			</button>\n		</div>\n		<div\n			class="messages__form__button-wrap"\n			*ngIf="!isRecordingUIVisible()">\n			<button ion-button icon-only clear color="grey" class="ios__messages__add-assets" (click)="presentActionSheet()">\n				<ion-icon name="add-circle"></ion-icon>\n			</button>\n			<button ion-button icon-only clear color="grey" class="ios__messages__add-assets" (click)="takeImage()" *ngIf="showCameraShortcut()">\n				<ion-icon name="camera"></ion-icon>\n			</button>\n		</div>\n		<ion-item class="clean-input-wrap ios__messages__input-wrap">\n			<ion-textarea rows="1" type="text" class="ios__messages__message-input" autocomplete="on" autocorrect="on" id="sendMessageBox" (ngModelChange)="change()" [(ngModel)]="newMessageText" [disabled]="isRecordingUIVisible()" (ionBlur)="toggleInputFocus()" (ionFocus)="toggleInputFocus()"></ion-textarea>\n		</ion-item>\n		<div class="ios__messages__recording-overlay" [ngClass]="{\'ios__messages__recording-overlay--distance\': isPaused()}">\n			<span *ngIf="isRecording()">\n				<ion-icon name="mic" color="danger"></ion-icon>\n				<span>&nbsp;Recording - <time class="ios__messages__recording__time">{{ formatTime(getDuration()) }}</time></span>\n			</span>\n			<span *ngIf="isPaused()">\n				<span *ngIf="isPlayback()">\n					<ion-icon icon name="ios-barcode-outline" color="primary"></ion-icon>\n					<span>&nbsp;{{ formatTime(getPosition()) }} / {{ formatTime(getDuration()) }}</span>\n				</span>\n				<span *ngIf="!isPlayback()">Paused - <time class="ios__messages__recording__time">{{ formatTime(getDuration()) }}</time></span>\n			</span>\n		</div>\n		<button color="green" ion-button icon-only class="ios__messages__send-message" (click)="sendMessageToChat()"\n		*ngIf="!showRecordIcon() || isRecordingUIVisible()">\n			<ion-icon name="send"></ion-icon>\n		</button>\n		<button color="green" ion-button icon-only class="ios__messages__send-message" (click)="toggleRecording()"\n		*ngIf="showRecordIcon() && !isRecordingUIVisible()">\n			<ion-icon name="mic"></ion-icon>\n		</button>\n	</div>\n\n	<!-- TODO: refactor this to be one form, not two -->\n	<div class="messages__form" *ngIf="!platform.is(\'ios\')" #footer>\n		<div\n			class="messages__form__button-wrap"\n			*ngIf="isRecordingUIVisible()">\n			<button ion-button icon-only clear color="grey" class="messages__add-assets" (click)="discardRecording()">\n				<ion-icon name="trash"></ion-icon>\n			</button>\n			<button ion-button icon-only clear color="danger" class="messages__add-assets" (click)="toggleRecording()">\n				<ion-icon name="mic" *ngIf="isPaused()"></ion-icon>\n				<ion-icon name="pause" *ngIf="!isPaused()"></ion-icon>\n			</button>\n			<button *ngIf="isPaused()" ion-button icon-only clear color="grey" class="messages__add-assets" (click)="togglePlayback()">\n				<ion-icon name="{{(isPlayback() ? \'pause\' : \'play\')}}"></ion-icon>\n			</button>\n		</div>\n		<div\n			class="messages__form__button-wrap"\n			*ngIf="!isRecordingUIVisible()">\n			<button ion-button icon-only clear color="grey" class="messages__add-assets" (click)="presentActionSheet()">\n				<ion-icon name="add-circle"></ion-icon>\n			</button>\n			<button ion-button icon-only clear color="grey" class="messages__add-assets" (click)="takeImage()" *ngIf="showCameraShortcut()">\n				<ion-icon name="camera"></ion-icon>\n			</button>\n		</div>\n		<ion-item class="messages__input-wrap">\n			<ion-textarea rows="1" type="text" class="messages__message-input" autocomplete="on" autocorrect="on" id="sendMessageBox" (ngModelChange)="change()" [(ngModel)]="newMessageText" [disabled]="isRecordingUIVisible()" (ionBlur)="toggleInputFocus()" (ionFocus)="toggleInputFocus()"></ion-textarea>\n		</ion-item>\n		<div class="ios__messages__recording-overlay" [ngClass]="{\'ios__messages__recording-overlay--distance\': isPaused()}">\n			<span *ngIf="isRecording()">\n				<ion-icon name="mic" color="danger"></ion-icon>\n				<span>&nbsp;Recording - <time class="ios__messages__recording__time">{{ formatTime(getDuration()) }}</time></span>\n			</span>\n			<span *ngIf="isPaused()">\n				<span *ngIf="isPlayback()">\n					<ion-icon icon name="ios-barcode-outline" color="primary"></ion-icon>\n					<span>&nbsp;{{ formatTime(getPosition()) }} / {{ formatTime(getDuration()) }}</span>\n				</span>\n				<span *ngIf="!isPlayback()">Paused - <time class="ios__messages__recording__time">{{ formatTime(getDuration()) }}</time></span>\n			</span>\n		</div>\n		<button\n			ion-button icon-only clear (click)="sendMessageToChat()"\n			class="messages__send-message"\n			*ngIf="!showRecordIcon() || isRecordingUIVisible()">\n			<ion-icon name="send"></ion-icon>\n		</button>\n		<button ion-button icon-only clear class="messages__send-message" (click)="toggleRecording()"\n		*ngIf="showRecordIcon() && !isRecordingUIVisible()">\n			<ion-icon name="mic"></ion-icon>\n		</button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/topic/topic.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */]])
    ], TopicComponent);
    return TopicComponent;
}());

//# sourceMappingURL=topicDisplay.js.map

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*! typestate - v1.0.4 - 2016-09-07
* https://github.com/eonarheim/TypeState
* Copyright (c) 2016 Erik Onarheim; Licensed BSD-2-Clause*/
var typestate;
(function (typestate) {
    /**
     * Transition grouping to faciliate fluent api
     */
    var Transitions = (function () {
        function Transitions(fsm) {
            this.fsm = fsm;
        }
        /**
         * Specify the end state(s) of a transition function
         */
        Transitions.prototype.to = function () {
            var states = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                states[_i - 0] = arguments[_i];
            }
            this.toStates = states;
            this.fsm.addTransitions(this);
        };
        /**
         * Specify that any state in the state enum is value
         * Takes the state enum as an argument
         */
        Transitions.prototype.toAny = function (states) {
            var toStates = [];
            for (var s in states) {
                if (states.hasOwnProperty(s)) {
                    toStates.push(states[s]);
                }
            }
            this.toStates = toStates;
            this.fsm.addTransitions(this);
        };
        return Transitions;
    }());
    typestate.Transitions = Transitions;
    /**
     * Internal representation of a transition function
     */
    var TransitionFunction = (function () {
        function TransitionFunction(fsm, from, to) {
            this.fsm = fsm;
            this.from = from;
            this.to = to;
        }
        return TransitionFunction;
    }());
    typestate.TransitionFunction = TransitionFunction;
    /**
     * A simple finite state machine implemented in TypeScript, the templated argument is meant to be used
     * with an enumeration.
     */
    var FiniteStateMachine = (function () {
        function FiniteStateMachine(startState) {
            this._transitionFunctions = [];
            this._onCallbacks = {};
            this._exitCallbacks = {};
            this._enterCallbacks = {};
            this._invalidTransitionCallback = null;
            this.currentState = startState;
            this._startState = startState;
        }
        FiniteStateMachine.prototype.addTransitions = function (fcn) {
            var _this = this;
            fcn.fromStates.forEach(function (from) {
                fcn.toStates.forEach(function (to) {
                    // self transitions are invalid and don't add duplicates
                    if (from !== to && !_this._validTransition(from, to)) {
                        _this._transitionFunctions.push(new TransitionFunction(_this, from, to));
                    }
                });
            });
        };
        /**
         * Listen for the transition to this state and fire the associated callback
         */
        FiniteStateMachine.prototype.on = function (state, callback) {
            var key = state.toString();
            if (!this._onCallbacks[key]) {
                this._onCallbacks[key] = [];
            }
            this._onCallbacks[key].push(callback);
            return this;
        };
        /**
         * Listen for the transition to this state and fire the associated callback, returning
         * false in the callback will block the transition to this state.
         */
        FiniteStateMachine.prototype.onEnter = function (state, callback) {
            var key = state.toString();
            if (!this._enterCallbacks[key]) {
                this._enterCallbacks[key] = [];
            }
            this._enterCallbacks[key].push(callback);
            return this;
        };
        /**
         * Listen for the transition to this state and fire the associated callback, returning
         * false in the callback will block the transition from this state.
         */
        FiniteStateMachine.prototype.onExit = function (state, callback) {
            var key = state.toString();
            if (!this._exitCallbacks[key]) {
                this._exitCallbacks[key] = [];
            }
            this._exitCallbacks[key].push(callback);
            return this;
        };
        /**
         * List for an invalid transition and handle the error, returning a falsy value will throw an
         * exception, a truthy one will swallow the exception
         */
        FiniteStateMachine.prototype.onInvalidTransition = function (callback) {
            if (!this._invalidTransitionCallback) {
                this._invalidTransitionCallback = callback;
            }
            return this;
        };
        /**
         * Declares the start state(s) of a transition function, must be followed with a '.to(...endStates)'
         */
        FiniteStateMachine.prototype.from = function () {
            var states = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                states[_i - 0] = arguments[_i];
            }
            var _transition = new Transitions(this);
            _transition.fromStates = states;
            return _transition;
        };
        FiniteStateMachine.prototype.fromAny = function (states) {
            var fromStates = [];
            for (var s in states) {
                if (states.hasOwnProperty(s)) {
                    fromStates.push(states[s]);
                }
            }
            var _transition = new Transitions(this);
            _transition.fromStates = fromStates;
            return _transition;
        };
        FiniteStateMachine.prototype._validTransition = function (from, to) {
            return this._transitionFunctions.some(function (tf) {
                return (tf.from === from && tf.to === to);
            });
        };
        /**
         * Check whether a transition to a new state is valid
         */
        FiniteStateMachine.prototype.canGo = function (state) {
            return this.currentState === state || this._validTransition(this.currentState, state);
        };
        /**
         * Transition to another valid state
         */
        FiniteStateMachine.prototype.go = function (state) {
            if (!this.canGo(state)) {
                if (!this._invalidTransitionCallback || !this._invalidTransitionCallback(this.currentState, state)) {
                    throw new Error('Error no transition function exists from state ' + this.currentState.toString() + ' to ' + state.toString());
                }
            }
            else {
                this._transitionTo(state);
            }
        };
        /**
         * This method is availble for overridding for the sake of extensibility.
         * It is called in the event of a successful transition.
         */
        FiniteStateMachine.prototype.onTransition = function (from, to) {
            // pass, does nothing until overidden
        };
        /**
        * Reset the finite state machine back to the start state, DO NOT USE THIS AS A SHORTCUT for a transition.
        * This is for starting the fsm from the beginning.
        */
        FiniteStateMachine.prototype.reset = function () {
            this.currentState = this._startState;
        };
        /**
         * Whether or not the current state equals the given state
         */
        FiniteStateMachine.prototype.is = function (state) {
            return this.currentState === state;
        };
        FiniteStateMachine.prototype._transitionTo = function (state) {
            var _this = this;
            if (!this._exitCallbacks[this.currentState.toString()]) {
                this._exitCallbacks[this.currentState.toString()] = [];
            }
            if (!this._enterCallbacks[state.toString()]) {
                this._enterCallbacks[state.toString()] = [];
            }
            if (!this._onCallbacks[state.toString()]) {
                this._onCallbacks[state.toString()] = [];
            }
            var canExit = this._exitCallbacks[this.currentState.toString()].reduce(function (accum, next) {
                return accum && next.call(_this, state);
            }, true);
            var canEnter = this._enterCallbacks[state.toString()].reduce(function (accum, next) {
                return accum && next.call(_this, _this.currentState);
            }, true);
            if (canExit && canEnter) {
                var old = this.currentState;
                this.currentState = state;
                this._onCallbacks[this.currentState.toString()].forEach(function (fcn) {
                    fcn.call(_this, old);
                });
                this.onTransition(old, state);
            }
        };
        return FiniteStateMachine;
    }());
    typestate.FiniteStateMachine = FiniteStateMachine;
})(typestate || (typestate = {}));
exports.typestate = typestate;
exports.TypeState = typestate;
// maintain backwards compatibility for people using the pascal cased version
var TypeState = typestate;
;
// concat to the back of typestate.ts for node to work :/ typescript modules make me sad
//# sourceMappingURL=typestate-node.js.map

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(472);
var bytesToUuid = __webpack_require__(473);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 472:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 473:
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BurstDifferenceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_messages_chat__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_messages_burst__ = __webpack_require__(287);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BurstDifferenceComponent = (function () {
    function BurstDifferenceComponent() {
        var _this = this;
        this.differentDay = function () {
            if (_this.noDates || !_this.chat || !_this.chat.getLatestChunk) {
                return false;
            }
            if (_this.burst && _this.previousBurst) {
                return !_this.burst.sameDay(_this.previousBurst);
            }
            return true;
        };
        this.differentChunk = function () {
            if (!_this.chat || !_this.chat.getLatestChunk) {
                return false;
            }
            if (_this.burst && _this.previousBurst) {
                return !_this.burst.sameChunk(_this.previousBurst);
            }
            if (_this.previousBurst) {
                return _this.previousBurst.getChunkID() !== _this.chat.getLatestChunk();
            }
            return true;
        };
        this.chunksBetweenBursts = function () {
            if (!_this.previousBurst) {
                return [];
            }
            var currentChunkID = _this.burst ? _this.burst.getChunkID() : _this.chat.getLatestChunk();
            return _this.getChunksBetween(__WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(currentChunkID), __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(_this.previousBurst.getChunkID())).reverse();
        };
        this.addedReceiver = function (chunk) {
            var currentReceiveers = chunk.getReceivers();
            var previousReceiveers = __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(chunk.getPredecessorID()).getReceivers();
            return currentReceiveers.filter(function (partner) { return previousReceiveers.indexOf(partner) === -1; });
        };
        this.removedReceiver = function (chunk) {
            var currentReceiveers = chunk.getReceivers();
            var previousReceiveers = __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(chunk.getPredecessorID()).getReceivers();
            return previousReceiveers.filter(function (partner) { return currentReceiveers.indexOf(partner) === -1; });
        };
        this.changedTitle = function (chunk) {
            var currentTitle = chunk.getTitle();
            var previousTitle = __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(chunk.getPredecessorID()).getTitle();
            if (currentTitle !== previousTitle) {
                return currentTitle;
            }
        };
        this.getCreator = function (chunk) {
            return chunk.getReceivers().find(function (user) { return user.id === chunk.getCreator(); });
        };
        this.getChunksBetween = function (newerChunk, olderChunk) {
            if (newerChunk.getID() === olderChunk.getID()) {
                return [];
            }
            var predecessor = __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(newerChunk.getPredecessorID());
            return [newerChunk].concat(_this.getChunksBetween(predecessor, olderChunk));
        };
        this.hasPreviousChunk = function () {
            return Boolean(_this.previousBurst);
        };
        this.receiver = function () {
            if (_this.burst) {
                return __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(_this.burst.getChunkID()).getPartners();
            }
            return __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(_this.chat.getLatestChunk()).getPartners();
        };
        this.getTime = function () {
            if (_this.burst) {
                return _this.burst.firstItem().getTime();
            }
            var latestChunk = __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(_this.chat.getLatestChunk());
            return __WEBPACK_IMPORTED_MODULE_1__lib_helper_helper__["default"].parseDecimal(latestChunk.getTime());
        };
        this.getChunk = function () {
            var burstChunkID = _this.burst ? _this.burst.getChunkID() : _this.chat.getLatestChunk();
            return __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(burstChunkID);
        };
        this.hasTitleDifference = function () {
            if (!_this.previousBurst) {
                return false;
            }
            var burstChunk = _this.getChunk();
            var previousBurstChunk = __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__["b" /* default */].getLoaded(_this.previousBurst.getChunkID());
            return burstChunk.getTitle() !== previousBurstChunk.getTitle();
        };
        this.getTitle = function () { return _this.getChunk().getTitle(); };
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__lib_messages_chat__["a" /* Chat */])
    ], BurstDifferenceComponent.prototype, "chat", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__lib_messages_burst__["a" /* default */])
    ], BurstDifferenceComponent.prototype, "burst", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__lib_messages_burst__["a" /* default */])
    ], BurstDifferenceComponent.prototype, "previousBurst", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], BurstDifferenceComponent.prototype, "noDates", void 0);
    BurstDifferenceComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "BurstDifference",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/topic/burstDifference.html"*/'<div class="messages_message" *ngIf="differentDay()">\n	<div class="burst-seperator burst-seperator-date">\n		<span class="burst-seperator-text">\n			{{getTime()|seperatorDate}}\n		</span>\n	</div>\n</div>\n<div *ngIf="differentChunk()">\n	<div class="messages_message" *ngIf="!hasPreviousChunk()">\n		<div class="burst-seperator burst-seperator-date">\n			<span class="burst-seperator-text">\n				Nutzer in diesem Chat: <br />\n				<ng-container *ngFor="let user of receiver()">\n					{{ user.name }} <br />\n				</ng-container>\n			</span>\n		</div>\n	</div>\n\n	<ng-container *ngFor="let chunk of chunksBetweenBursts()">\n		<div class="messages_message" *ngIf="addedReceiver(chunk).length > 0">\n			<div class="burst-seperator burst-seperator-date">\n				<span class="burst-seperator-text">\n					{{ getCreator(chunk).name }} hat Nutzer hinzugefügt: <br />\n					<ng-container *ngFor="let user of addedReceiver(chunk)">\n						{{ user.name }} <br />\n					</ng-container>\n				</span>\n			</div>\n		</div>\n\n		<div class="messages_message" *ngIf="removedReceiver(chunk).length > 0">\n			<div class="burst-seperator burst-seperator-date">\n				<span class="burst-seperator-text">\n					{{ getCreator(chunk).name }} hat Nutzer entfernt: <br />\n					<ng-container *ngFor="let user of removedReceiver(chunk)">\n						{{ user.name }} <br />\n					</ng-container>\n				</span>\n			</div>\n		</div>\n\n		<div class="messages_message" *ngIf="changedTitle(chunk)">\n			<div class="burst-seperator burst-seperator-date">\n				<span class="burst-seperator-text">\n					{{ getCreator(chunk).name }} hat den Chattitel geändert: <br />\n					{{ changedTitle(chunk) }}\n				</span>\n			</div>\n		</div>\n	</ng-container>\n</div>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/topic/burstDifference.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], BurstDifferenceComponent);
    return BurstDifferenceComponent;
}());

//# sourceMappingURL=burstDifference.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_messages_message__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_asset_voicemailPlayer__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_asset_Progress__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_services_blobService__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_asset_blobCache__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EMOJIS = ["💩", "👻", "🤖", "🐋", "🌍"];
var FILE_DOWNLOAD_DELAY = 500;
var MessageComponent = (function () {
    function MessageComponent() {
        var _this = this;
        this.add = function (arr, attr) {
            return arr.reduce(function (prev, next) { return prev + next[attr]; }, 0);
        };
        this.voicemailDuration = function () {
            if (_this.voicemailPlayer.getDuration() > 0) {
                return _this.voicemailPlayer.getDuration();
            }
            return _this.message.data.voicemails.reduce(function (prev, next) { return prev + next.duration; }, 0);
        };
        this.voicemailPosition = function () {
            if (!_this.voicemailPlayer) {
                return 0;
            }
            return _this.voicemailPlayer.getPosition();
        };
        this.voicemailProgress = function () {
            var message = _this.message;
            if (!message.hasBeenSent()) {
                return message.data.voicemails.reduce(function (acc, v) {
                    if (!v)
                        return acc;
                    return acc + v.getProgress() / message.data.voicemails.length;
                }, 0);
            }
            if (!_this.voicemailDownloadProgress) {
                return 0;
            }
            return _this.voicemailDownloadProgress.getProgress();
        };
        this.voicemailSize = function () {
            return _this.message.data.voicemails.reduce(function (prev, next) { return prev + next.size; }, 0);
        };
        this.voicemailLoaded = function () {
            return _this.message.data.voicemails.reduce(function (prev, next) { return prev && next.loaded; }, true);
        };
        this.downloadFile = function (file) {
            var loadProgress = new __WEBPACK_IMPORTED_MODULE_5__lib_asset_Progress__["a" /* default */]();
            file.getProgress = function () { return loadProgress.getProgress(); };
            __WEBPACK_IMPORTED_MODULE_6__lib_services_blobService__["a" /* default */]
                .getBlobUrl(file.blobID, loadProgress, file.size)
                .then(function (url) { return __WEBPACK_IMPORTED_MODULE_7__lib_asset_blobCache__["a" /* default */].copyBlobToDownloads(file.blobID, file.name); })
                .delay(FILE_DOWNLOAD_DELAY)
                .then(function (url) {
                file.loaded = true;
                file.url = url;
                return __WEBPACK_IMPORTED_MODULE_7__lib_asset_blobCache__["a" /* default */].getFileMimeType(url).then(function (mimeType) {
                    return new __WEBPACK_IMPORTED_MODULE_1_bluebird__(function (success, error) {
                        return window.cordova.plugins.fileOpener2.showOpenWithDialog(url, mimeType || "", { success: success, error: error });
                    });
                });
            })
                .catch(function (e) {
                return alert(parseInt(e.status, 10) === 9
                    ? "Could not open file. No app found to open file type for " + file.name
                    : "Something went wrong trying to load file " + file.name);
            });
        };
        this.downloadVoicemail = __WEBPACK_IMPORTED_MODULE_4__lib_helper_helper__["default"].cacheResult(function () {
            _this.voicemailDownloadProgress = new __WEBPACK_IMPORTED_MODULE_5__lib_asset_Progress__["a" /* default */]();
            return _this.message.downloadVoicemail(_this.voicemailDownloadProgress).then(function (files) {
                return files.forEach(function (file) {
                    _this.voicemailPlayer.addRecording(file.url, file.duration);
                });
            });
        });
        this.voicemailPaused = function () {
            return _this.voicemailPlayer.isPaused();
        };
        this.voicemailPlaying = function () {
            return _this.voicemailPlayer.isPlaying();
        };
        this.playVoicemail = function () {
            return _this.downloadVoicemail().then(function () {
                return _this.voicemailPlayer.play();
            });
        };
        this.pauseVoicemail = function () {
            return _this.voicemailPlayer.pause();
        };
    }
    Object.defineProperty(MessageComponent.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (_message) {
            var voicemails = _message.data.voicemails;
            if (voicemails && voicemails.length > 0) {
                this.voicemailPlayer = new __WEBPACK_IMPORTED_MODULE_3__lib_asset_voicemailPlayer__["a" /* default */]([]);
            }
            this._message = _message;
        },
        enumerable: true,
        configurable: true
    });
    MessageComponent.prototype.formatSize = function (size) {
        var emoji = EMOJIS[size % EMOJIS.length];
        if (size < 1000) {
            return size + " B";
        }
        else if (size < 1000 * 1000) {
            return Math.round(size / 100) / 10 + " kB";
        }
        else if (size < 1000 * 1000 * 1000) {
            return Math.round(size / (100 * 1000)) / 10 + " MB";
        }
        else if (size < 1000 * 1000 * 1000 * 1000) {
            return Math.round(size / (100 * 1000 * 1000)) / 10 + " GB";
        }
        else if (size < 1000 * 1000 * 1000 * 1000 * 1000) {
            return emoji + " TB";
        }
        else {
            return emoji + " PB";
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__lib_messages_message__["a" /* Message */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__lib_messages_message__["a" /* Message */]])
    ], MessageComponent.prototype, "message", null);
    MessageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "Message",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/topic/message.html"*/'<div *ngIf="message.isBlockedSince()" attr.data-messageid="{{message.data.id}}" class="messages__wrap">\n	<div class="messages__message messages__message-blocked">\n		<span>{{ \'blocked.messageReplacement\' | translate }}</span>\n	</div>\n	<span class="messages__time"></span>\n</div>\n\n<div *ngIf="!message.isBlockedSince()">\n\n	<div *ngIf="message.data.text.length > 0 || message.data.images.length > 0" attr.data-messageid="{{message.data.id}}" class="messages__wrap">\n		<div class="messages__message" [ngClass]="{\'messages__message--emoji-only\': message.data.emojiOnly, \'sending\': !message.hasBeenSent()}">\n			<span whispeerSyntaxify content="{{message.data.text}}" *ngIf="message.data.text"></span>\n			<gallery *ngIf="message.data.images && message.data.images.length > 0" [images]="message.data.images"></gallery>\n		</div>\n		<ng-container *ngTemplateOutlet="message_time"></ng-container>\n	</div>\n\n	<div *ngFor="let file of message.data.files" class="messages__wrap">\n		<div class="messages__message message__file" [ngClass]="{\'sending\': !message.hasBeenSent()}">\n			<div class="message__voicemail__actions">\n				<ion-icon *ngIf="!file.loaded && !file.getProgress" (click)="downloadFile(file)" class="message__voicemail__action" name="md-download"></ion-icon>\n				<ion-icon *ngIf="file.loaded && !file.sending" (click)="downloadFile(file)" class="message__voicemail__action" name="md-document"></ion-icon>\n				<loading-progress\n					*ngIf="(!file.loaded && file.getProgress) || file.sending"\n					backgroundClass="messages__message"\n					foregroundClass="progressIndicator"\n					[progress]="file.getProgress">\n				</loading-progress>\n			</div>\n			<span class="message__file__info">\n				<span class="message__file__name">{{ file.name | filenameLimit: 25 }}</span>\n				<span class="message__file__size" *ngIf="!file.loaded">[{{ formatSize(file.size) }}]</span>\n			</span>\n		</div>\n		<ng-container *ngTemplateOutlet="message_time"></ng-container>\n	</div>\n\n	<div *ngIf="message.data.voicemails && message.data.voicemails.length > 0" class="messages__wrap messages__wrap--file">\n		<div class="messages__message message__voicemail" [ngClass]="{\'sending\': !message.hasBeenSent()}">\n			<div class="message__file__info message__voicemail__info">\n				<div class="message__voicemail__actions">\n					<ion-icon name="md-download" class="message__voicemail__action" *ngIf="!voicemailLoaded() && !voicemailDownloadProgress && message.hasBeenSent()" (click)="downloadVoicemail()"></ion-icon>\n					<ion-icon name="md-play" class="message__voicemail__action" *ngIf="voicemailLoaded() && voicemailPaused() && message.hasBeenSent()" (click)="playVoicemail()"></ion-icon>\n					<loading-progress *ngIf="!voicemailLoaded() && voicemailDownloadProgress"\n						backgroundClass="messages__message"\n						foregroundClass="progressIndicator"\n						[progress]="voicemailProgress"\n					>\n					</loading-progress>\n					<ion-spinner *ngIf="!message.hasBeenSent()" class="message__voicemail__uploadSpinner"></ion-spinner>\n					<ion-icon name="md-pause" class="message__voicemail__action" *ngIf="voicemailLoaded() && voicemailPlaying()" (click)="pauseVoicemail()"></ion-icon>\n				</div>\n				<div class="message__voicemail__player">\n					<ion-icon icon name="stats" class="message__file__memo-play-icon" [ngClass]="{\'message__file__memo-play-icon--active\': voicemailPlaying()}"></ion-icon>&nbsp;\n					<span><span *ngIf="voicemailLoaded()">{{ voicemailPosition() * 1000 | date: \'mm:ss\' }} /&nbsp;</span>{{ voicemailDuration() * 1000 | date: \'mm:ss\' }}&nbsp;</span>\n					<span *ngIf="!voicemailLoaded()" class="message__file__info__size">[{{formatSize(voicemailSize())}}]</span>\n					<div class="message__file__progress" *ngIf="voicemailLoaded() && voicemailPosition() > 0">\n						<div class="message__file__progress__bar" [ngStyle]="{\'width.%\': voicemailPosition() * 100 / voicemailDuration()}"></div>\n						<div class="message__file__progress__icon" [ngStyle]="{\'margin-left.%\': voicemailPosition() * 100 / voicemailDuration()}">\n							<hexagon class="message__file__progress__icon__hex"></hexagon>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n		<ng-container *ngTemplateOutlet="message_time"></ng-container>\n	</div>\n</div>\n\n<ng-template #message_time>\n		<span *ngIf="message.hasBeenSent()" class="messages__time">\n			{{ message.sendTime | date: "shortTime" }}\n		</span>\n		<span *ngIf="!message.hasBeenSent()" class="messages__time messageSpinner">\n			<ion-spinner text-center name="ios-small"></ion-spinner>\n		</span>\n</ng-template>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/topic/message.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], MessageComponent);
    return MessageComponent;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SyntaxifyDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
// const EmojifyConverter = require("emojify");
/*const emojify = new EmojifyConverter();
emojify.img_sets.apple.sheet = "assets/img/sheet_apple_64.png";
emojify.use_sheet = true;
emojify.include_title = true;*/
/*const emojiElementOuter = jQuery("<span>").addClass("emoji-outer").addClass("emoji-sizer");
const emojiElementInner = jQuery("<span>").addClass("emoji-inner").css("background", "url(" + emojify.img_sets.apple.sheet + ")");*/
var ignoreAsLastCharacter = ["'", ")", "\"", "."];
var SyntaxifyDirective = (function () {
    function SyntaxifyDirective(el) {
        var _this = this;
        this.syntaxifier = [];
        this.appendUrl = function (elm, url, remainingTextCallback) {
            var i, removeUntil = 0;
            for (i = -1; i > -5; i -= 1) {
                //if i:=-1 than i+1 would be 0 and thus the slice would be empty.
                var lastCharacter = url.slice(i, i + 1 || undefined);
                if (ignoreAsLastCharacter.indexOf(lastCharacter) === -1) {
                    removeUntil = i + 1;
                    break;
                }
            }
            var removedCharacters = "";
            if (removeUntil) {
                removedCharacters = url.slice(removeUntil);
                url = url.slice(0, removeUntil);
            }
            var linkElement = document.createElement("a");
            linkElement.setAttribute("target", "_blank");
            linkElement.setAttribute("href", url);
            linkElement.textContent = url;
            elm.appendChild(linkElement);
            if (removeUntil) {
                remainingTextCallback(removedCharacters);
            }
        };
        this.urlify = function (elm, text, remainingTextCallback) {
            /*
            /                                   # Start at the beginning of the text
            (?:ftp|http|https):\/\/              # Look for ftp, http, or https
            (?:                                  # Username:password combinations (optional)
                [\w\.\-\+]+                        # A username
                :{0,1}                             # an optional colon to separate the username and password
                [\w\.\-\+]*@                       # A password
            )?
            (?:[a-z0-9\-\.]+)                    # The domain limiting it to just allowed characters
            (?::[0-9]+)?                         # Server port number
            (?:                                  # The path (optional)
                \/(?:[\w#!:"'\)\.\?\+=&%@!\-\/\(]+)|  # or a forward slash followed by a full path
                \?(?:[\w#!:"'\)\.\?\+=&%@!\-\/\(]+)  # or a question mark followed by key value pairs
            )?/
            */
            var urlRegex = /((?:http|https):\/\/(?:[\w\.\-\+]+:{0,1}[\w\.\-\+]*@)?(?:[a-z0-9\-\.]+)(?::[0-9]+)?(?:\/(?:[\w#!:"'\)\.,\?\+=&%@!\-\~\/\(]+)|\?(?:[\w#!:"'\)\.,\?\+=&%@!\-\~\/\(]+))?)(?!http)/;
            var urls = text.split(urlRegex);
            var i;
            for (i = 0; i < urls.length; i += 2) {
                remainingTextCallback(urls[i]);
                if (urls[i + 1]) {
                    _this.appendUrl(elm, urls[i + 1], remainingTextCallback);
                }
            }
        };
        this.newlines = function (elm, text, remainingTextCallback) {
            var parts = text.split(/\r\n|\n\r|\r|\n|\w*\[br\]\w*/);
            var i;
            for (i = 0; i < parts.length; i += 1) {
                remainingTextCallback(parts[i]);
                if (i !== parts.length - 1) {
                    elm.appendChild(document.createElement("br"));
                }
            }
        };
        this.createTextNode = function (elm, text) {
            elm.appendChild(document.createTextNode(text));
        };
        this.callSyntaxifier = function (number, elm, text) {
            _this.syntaxifier[number](elm, text, function (text) {
                _this.callSyntaxifier(number + 1, elm, text);
            });
        };
        this.syntaxifier = [this.urlify, this.newlines, this.createTextNode];
        this.el = el.nativeElement;
    }
    Object.defineProperty(SyntaxifyDirective.prototype, "content", {
        set: function (content) {
            this.callSyntaxifier(0, this.el, content);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SyntaxifyDirective.prototype, "content", null);
    SyntaxifyDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({ selector: '[whispeerSyntaxify]' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
    ], SyntaxifyDirective);
    return SyntaxifyDirective;
}());

//# sourceMappingURL=syntaxify.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_services_error_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_services_blobService__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__ = __webpack_require__(286);
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




var GalleryComponent = (function () {
    function GalleryComponent(sanitizer, photoViewer) {
        var _this = this;
        this.sanitizer = sanitizer;
        this.photoViewer = photoViewer;
        this.previewChunk = 2;
        this.preview = this.previewChunk;
        this.isLoading = function () {
            return _this._images.reduce(function (prev, image) { return prev
                || image.highest && image.highest.loading
                || image.middle && image.middle.loading
                || image.lowest && image.lowest.loading; }, false);
        };
        this.getProgress = function () {
            return 0;
        };
        this.displayImage = function (image) {
            if (image.upload) {
                _this.photoViewer.show(image.upload._file.originalUrl);
                return;
            }
            _this.loadImage(image.highest || image.middle || image.lowest).then(function (url) {
                _this.photoViewer.show(url);
            });
        };
    }
    Object.defineProperty(GalleryComponent.prototype, "images", {
        get: function () {
            return this._images;
        },
        set: function (value) {
            this._images = value;
            this.loadPreviews();
        },
        enumerable: true,
        configurable: true
    });
    GalleryComponent.prototype.loadImage = function (data) {
        var _this = this;
        var blobid = data.blobID;
        if (data.loaded) {
            return __WEBPACK_IMPORTED_MODULE_4_bluebird__["resolve"](data.originalUrl);
        }
        data.loading = true;
        return __WEBPACK_IMPORTED_MODULE_4_bluebird__["try"](function () { return __WEBPACK_IMPORTED_MODULE_3__lib_services_blobService__["a" /* default */].getBlobUrl(blobid); })
            .then(function (url) {
            data.loading = false;
            data.loaded = true;
            data.url = _this.sanitizer.bypassSecurityTrustUrl(window.device && window.device.platform === 'iOS' ? url.replace('file://', '') : url);
            data.originalUrl = url;
            return url;
        })
            .catch(__WEBPACK_IMPORTED_MODULE_2__lib_services_error_service__["default"].criticalError);
    };
    GalleryComponent.prototype.loadImagePreviews = function (images) {
        var _this = this;
        images.forEach(function (image) {
            if (image.lowest && typeof image.lowest.url === "string" && image.highest && typeof image.highest.url === "string") {
                image.highest.url = _this.sanitizer.bypassSecurityTrustUrl(image.highest.url);
                image.lowest.url = _this.sanitizer.bypassSecurityTrustUrl(image.lowest.url);
                return;
            }
            if (!image.lowest.url && image.lowest.width && image.lowest.height) {
                var canvas = document.createElement("canvas");
                canvas.width = image.lowest.width;
                canvas.height = image.lowest.height;
                image.lowest.url = _this.sanitizer.bypassSecurityTrustUrl(canvas.toDataURL());
            }
            _this.loadImage(image.lowest);
        });
    };
    GalleryComponent.prototype.loadMoreImages = function () {
        this.loadImagePreviews(this.images.slice(this.preview, this.preview + this.previewChunk));
        this.preview += this.previewChunk;
    };
    GalleryComponent.prototype.runGif = function () {
        return false;
    };
    GalleryComponent.prototype.loadPreviews = function () {
        this.loadImagePreviews(this.images.slice(0, this.preview));
    };
    GalleryComponent.prototype.ngOnInit = function () {
        this.loadPreviews();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], GalleryComponent.prototype, "images", null);
    GalleryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: "gallery",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/gallery/gallery.html"*/'<div *ngFor="let image of images" [ngClass]="{\'loading\': isLoading() }">\n	<ng-container *ngIf="image.lowest.url">\n		<img class="post-image" *ngIf="!runGif($index)" [src]="image.lowest.url" (click)="displayImage(image)" />\n		<span class="post-image--play fa fa-play fa-2x" *ngIf="image.lowest.gif && !runGif($index)"></span>\n		<div *ngIf="runGif($index)">\n			<img class="post-image" [src]="image.highest.url" *ngIf="!image.highest.loading" />\n			<img class="post-image" [src]="image.lowest.url" *ngIf="image.highest.loading" />\n		</div>\n	</ng-container>\n	<div *ngIf="isLoading()" class="overlay">\n		<ion-spinner text-center name="ios-small"></ion-spinner>\n	</div>\n</div>\n\n<div *ngIf="images.length > preview">\n	<button (click)="loadMoreImages()" ion-button block>Load more images</button>\n</div>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/gallery/gallery.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__["a" /* PhotoViewer */]])
    ], GalleryComponent);
    return GalleryComponent;
}());

//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewMessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_messages_messageService__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_messages_chat__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_messages_chatChunk__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_contacts_contactsWithSearch__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_users_userService__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_bluebird__);
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var friendsService = __webpack_require__(82);

var NewMessagePage = (function (_super) {
    __extends(NewMessagePage, _super);
    function NewMessagePage(navCtrl, translate, platform, navParams) {
        var _this = 
        // super(translate)
        _super.call(this, translate) || this;
        _this.navCtrl = navCtrl;
        _this.translate = translate;
        _this.platform = platform;
        _this.navParams = navParams;
        _this.searchTerm = "";
        _this.selectedUserMap = {};
        _this.selectedUsers = [];
        _this.ios = false;
        _this.addSelectedUser = function (user) {
            if (_this.selectedUsers.indexOf(user) === -1) {
                _this.selectedUsers.push(user);
            }
            _this.selectedUserMap[user.id] = true;
        };
        _this.removeSelectedUser = function (user) {
            __WEBPACK_IMPORTED_MODULE_7__lib_helper_helper__["default"].removeArray(_this.selectedUsers, user);
            delete _this.selectedUserMap[user.id];
        };
        _this.updateSelectedUsers = function (user) {
            if (_this.selectedUserMap[user.id]) {
                _this.removeSelectedUser(user);
            }
            else {
                _this.addSelectedUser(user);
            }
        };
        _this.create = function () {
            _this.send(_this.selectedUsers);
        };
        _this.close = function () {
            _this.navCtrl.pop();
        };
        _this.loading = true;
        _this.send = function (users) {
            if (users.length === 0) {
                return;
            }
            _this.loading = true;
            _this.sendToUserTopic(users).then(function (chatID) {
                if (chatID) {
                    _this.goToChat(chatID);
                    return;
                }
                return __WEBPACK_IMPORTED_MODULE_5__lib_messages_chatChunk__["a" /* Chunk */].createRawData(users.map(function (_a) {
                    var id = _a.id;
                    return id;
                }), { content: {} });
            }).then(function (chunkData) {
                var chunk = new __WEBPACK_IMPORTED_MODULE_5__lib_messages_chatChunk__["a" /* Chunk */]({
                    content: {},
                    server: {
                        id: -1,
                        chatID: -1,
                        createTime: Date.now()
                    },
                    meta: chunkData.chunk.meta,
                    receiverObjects: users.sort(function (u1, u2) { return u1.id - u2.id; })
                }, chunkData);
                var chat = new __WEBPACK_IMPORTED_MODULE_4__lib_messages_chat__["a" /* Chat */]({ id: -1, latestMessage: null, latestChunk: chunk, unreadMessageIDs: [] }, true);
                __WEBPACK_IMPORTED_MODULE_4__lib_messages_chat__["b" /* default */].addLoaded(-1, chat);
                __WEBPACK_IMPORTED_MODULE_5__lib_messages_chatChunk__["b" /* default */].addLoaded(-1, chunk);
                _this.goToChat(-1);
            });
        };
        _this.goToChat = function (chatID) {
            _this.navCtrl.push("Messages", { chatID: chatID }).then(function () {
                _this.navCtrl.remove(_this.navCtrl.length() - 2, 1);
            });
        };
        _this.ios = platform.is("ios");
        return _this;
    }
    NewMessagePage.prototype.ngOnInit = function () {
        var _this = this;
        this.receiverString = this.navParams.get("receiverIds");
        if (this.hasReceiverParam()) {
            __WEBPACK_IMPORTED_MODULE_8__lib_users_userService__["default"].getMultipleFormatted(this.getReceiverParam()).then(function (users) {
                _this.send(users);
            });
            return;
        }
        friendsService.awaitLoading().then(function () {
            friendsService.listen(_this.loadContactsUsers);
            _this.loadContactsUsers().then(function () {
                _this.contactsLoading = false;
            });
        });
        this.loading = false;
    };
    NewMessagePage.prototype.sendToUserTopic = function (users) {
        if (users.length > 1) {
            return __WEBPACK_IMPORTED_MODULE_9_bluebird__["resolve"]();
        }
        return __WEBPACK_IMPORTED_MODULE_3__lib_messages_messageService__["a" /* default */].getUserChat(users[0].id);
    };
    NewMessagePage.prototype.hasReceiverParam = function () {
        var type = typeof this.receiverString;
        if (this.receiverString === ":receiverIds") {
            return false;
        }
        return ["number", "string"].indexOf(type) > -1;
    };
    NewMessagePage.prototype.getReceiverParam = function () {
        if (typeof this.receiverString === "number") {
            return [this.receiverString];
        }
        if (typeof this.receiverString === "string") {
            return this.receiverString.split(",").map(function (r) { return parseInt(r, 10); });
        }
        throw new Error("invalid receiver param");
    };
    NewMessagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])({
            name: "New Message",
            segment: "newMessage/:receiverIds"
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-new-message',template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/pages/new-message/new-message.html"*/'<ion-header>\n	<ion-navbar [color]="\'primary\'">\n		<ion-title>\n			{{ \'chooseFriends.title\' | translate }}\n		</ion-title>\n	</ion-navbar>\n	<ion-toolbar class="toolbar--search" [color]="\'primary\'" *ngIf="!loading">\n		<ion-searchbar\n			*ngIf="!contactsLoading"\n			animated\n			[placeholder]="\'chooseFriends.search\' | translate"\n			[(ngModel)]="searchTerm"\n			(ngModelChange)="executeSearch()" [showCancelButton]="true" [cancelButtonText]="\'general.cancel\' | translate"\n			(search)="closeSearchBar($event)">\n		</ion-searchbar>\n	</ion-toolbar>\n</ion-header>\n\n<ion-content>\n	<ion-spinner *ngIf="contactsLoading || loading" text-center margin-vertical class="spinner--full"></ion-spinner>\n\n	<ion-list *ngIf="selectedUsers.length > 0 && !loading" class="friends__list">\n		<ion-list-header class="friends__list__header" padding-top>\n			{{ \'chooseFriends.selectedContacts\' | translate }}\n		</ion-list-header>\n	</ion-list>\n	<ion-list [virtualScroll]="selectedUsers" class="friends__list" *ngIf="!loading">\n		<ion-item *virtualItem="let contact" (click)=updateSelectedUsers(contact)>\n			<ion-label class="checkbox__label--user checkbox__label--user-selected">\n				<ion-avatar class="hexagon--border"\n						[ngClass]="{\'hexagon__image--active\': contact.online}" item-left>\n					<user-image [id]="contact.id" [image]="contact.basic.image"></user-image>\n				</ion-avatar>\n				<h2 class="checkbox__label__username">\n					<strong *ngIf="contact.names.firstname">\n						{{contact.names.firstname}}\n					</strong>\n					<span *ngIf="contact.names.firstname && contact.names.lastname">\n						{{contact.names.lastname}}\n					</span>\n					<strong\n						*ngIf="!contact.names.firstname && contact.names.lastname">\n						{{contact.names.lastname}}\n					</strong>\n					<strong\n						*ngIf="!contact.names.firstname && !contact.names.lastname">\n						{{contact.name}}\n					</strong>\n				</h2>\n			</ion-label>\n\n			<div item-content class="checkbox checkbox-hexagon checkbox-hexagon--remove" [class.checkbox-ios]="ios" [class.checkbox-md]="!ios">\n				<div class="checkbox-icon" [class.checkbox-checked]="selectedUserMap[contact.id]"><div class="checkbox-inner"></div></div>\n			</div>\n		</ion-item>\n	</ion-list>\n	<!-- This wrapping div is necessary because the Search-Titles paddng would lay under the header without it. Hence the ngIf has to stay on the paragraph. Please don\'t ask me why! -->\n	<div>\n		<p class="text-grey" padding-horizontal *ngIf="selectedUsers.length > 0" [innerHTML]="\'chooseFriends.selectedExplain\' | translate"></p>\n	</div>\n	<ion-list *ngIf="searchTerm.length > 0" class="friends__list">\n		<ion-list-header class="friends__list__header" [attr.padding-top]="selectedUsers.length === 0 ? \'\': null">\n			{{ \'chooseFriends.search\' | translate }}\n		</ion-list-header>\n		<ion-item>\n			<p class="text-grey">\n				{{ \'chooseFriends.searchFor\' | translate:{searchTerm: searchTerm} }}\n			</p>\n		</ion-item>\n	</ion-list>\n	<ion-list [virtualScroll]="getUsers()" [headerFn]="contactDividers" class="friends__list space-for-fab" *ngIf="!loading">\n		<ion-item-divider *virtualHeader="let header; let i = index;" class="friends__divider" [ngClass]="{\'friends__divider--first\': i === 0 && selectedUsers.length === 0}">\n			{{ header }}\n		</ion-item-divider>\n\n		<ion-item *virtualItem="let contact" (click)=updateSelectedUsers(contact)>\n			<ion-label class="checkbox__label--user">\n				<ion-avatar class="hexagon--border"\n						[ngClass]="{\'hexagon__image--active\': contact.online}" item-left>\n					<user-image [id]="contact.id" [image]="contact.basic.image"></user-image>\n				</ion-avatar>\n				<h2>\n					<strong *ngIf="contact.names.firstname">\n						{{contact.names.firstname}}\n					</strong>\n					<span *ngIf="contact.names.firstname && contact.names.lastname">\n						{{contact.names.lastname}}\n					</span>\n					<strong\n						*ngIf="!contact.names.firstname && contact.names.lastname">\n						{{contact.names.lastname}}\n					</strong>\n					<strong\n						*ngIf="!contact.names.firstname && !contact.names.lastname">\n						{{contact.name}}\n					</strong>\n				</h2>\n			</ion-label>\n			<div item-content class="checkbox checkbox-hexagon" [class.checkbox-ios]="ios" [class.checkbox-md]="!ios">\n				<div class="checkbox-icon" [class.checkbox-checked]="selectedUserMap[contact.id]"><div class="checkbox-inner"></div></div>\n			</div>\n		</ion-item>\n	</ion-list>\n	<ion-spinner *ngIf="searchResultsLoading" text-center margin-vertical class="spinner--full"></ion-spinner>\n\n	<div class="space-for-fab" *ngIf="!loading">\n		<p class="text-grey not-found-footer" padding>\n			<span *ngIf="searchTerm.length > 0">\n				{{ \'contacts.searchResultExplain\' | translate }}\n			</span>\n		</p>\n	</div>\n\n	<navigator [icon]="\'arrow\'" (invoke)="create()" ion-fixed *ngIf="!loading"></navigator>\n</ion-content>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/pages/new-message/new-message.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], NewMessagePage);
    return NewMessagePage;
}(__WEBPACK_IMPORTED_MODULE_6__lib_contacts_contactsWithSearch__["a" /* ContactsWithSearch */]));

//# sourceMappingURL=new-message.js.map

/***/ })

});
//# sourceMappingURL=0.js.map