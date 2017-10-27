webpackJsonp([2],{

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_qrcode__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ProfilePageModule = (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_3_angular2_qrcode__["a" /* QRCodeModule */],
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forChild(),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

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

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__socket_service__ = __webpack_require__(11);

var reportService;
(function (reportService) {
    reportService.sendReport = function (what, id) {
        return __WEBPACK_IMPORTED_MODULE_0__socket_service__["default"].emit("reports.add", {
            what: what,
            id: id
        });
    };
})(reportService || (reportService = {}));
/* harmony default export */ __webpack_exports__["a"] = (reportService);
//# sourceMappingURL=reportService.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_services_session_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_services_reportService__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_services_blobService__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_services_imageUpload_service__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_barcode_scanner__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_photo_viewer__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lib_services_settings_service__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var userService = __webpack_require__(9).default;
var friendsService = __webpack_require__(82);









var ImagePickerOptions = {
    width: 2560,
    height: 1440,
    maximumImagesCount: 1
};
var CameraOptions = {
    destinationType: 1,
    allowEdit: true,
    encodingType: 0,
};
var imageUploadOptions = {
    sizes: [
        {
            name: "lowest",
            restrictions: {
                maxWidth: 480,
                maxHeight: 480,
                square: true
            }
        }
    ],
    gif: false,
    original: false,
    encrypt: false
};
var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams, actionSheetCtrl, alertCtrl, platform, file, camera, imagePicker, barcodeScanner, photoViewer, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.file = file;
        this.camera = camera;
        this.imagePicker = imagePicker;
        this.barcodeScanner = barcodeScanner;
        this.photoViewer = photoViewer;
        this.translate = translate;
        this.user = {
            basic: {},
            names: {},
            advanced: {}
        };
        this.view = "profile";
        this.profileLoading = true;
        this.block = function () {
            if (_this.isBlocked()) {
                return;
            }
            var blockConfirm = _this.alertCtrl.create({
                title: _this.translate.instant("profile.contacts.blockConfirm.title"),
                message: _this.translate.instant("profile.contacts.blockConfirm.message"),
                buttons: [{
                        text: _this.translate.instant("profile.contacts.blockConfirm.cancel")
                    }, {
                        text: _this.translate.instant("profile.contacts.blockConfirm.confirm"),
                        handler: function () {
                            __WEBPACK_IMPORTED_MODULE_13__lib_services_settings_service__["default"].setBlockedUsers(__WEBPACK_IMPORTED_MODULE_13__lib_services_settings_service__["default"].getBlockedUsers().concat([{ id: _this.userId, since: Date.now() }]));
                        }
                    }]
            });
            blockConfirm.setCssClass('logout-confirm');
            blockConfirm.present();
        };
        this.unblock = function () { return __WEBPACK_IMPORTED_MODULE_13__lib_services_settings_service__["default"].setBlockedUsers(__WEBPACK_IMPORTED_MODULE_13__lib_services_settings_service__["default"].getBlockedUsers().filter(function (_a) {
            var id = _a.id;
            return id !== _this.userId;
        })); };
        this.isBlocked = function () { return __WEBPACK_IMPORTED_MODULE_13__lib_services_settings_service__["default"].isBlocked(_this.userId); };
        this.verifyPerson = function () {
            return _this.barcodeScanner.scan().then(function (res) {
                return _this.userObject.verifyFingerPrint(res.text);
            }).then(function (data) {
                _this.alertCtrl.create({
                    title: _this.translate.instant("profile.verify.success.heading"),
                    message: _this.translate.instant("profile.verify.success.body"),
                    buttons: [
                        { text: 'Cancel', role: 'cancel' },
                        { text: _this.translate.instant("profile.verify.success.action"),
                            handler: function () {
                                _this.navCtrl.push("Profile", { userId: __WEBPACK_IMPORTED_MODULE_2__lib_services_session_service__["default"].userid });
                            }
                        }
                    ]
                });
                return data;
            }).catch(function (err) {
                console.error(err);
                _this.alertCtrl.create({
                    title: _this.translate.instant("profile.verify.fail.heading"),
                    message: _this.translate.instant("profile.verify.fail.body"),
                    buttons: [
                        { text: 'Cancel', role: 'cancel' },
                        { text: _this.translate.instant("profile.verify.fail.action"),
                            handler: function () {
                                _this.verifyPerson();
                            }
                        }
                    ]
                });
            });
        };
        this.removeFriendClick = function () {
            _this.alertCtrl.create({
                title: _this.translate.instant("profile.contacts.removeTitle"),
                message: _this.translate.instant("profile.contacts.removeQuestion", { name: _this.user.name }),
                buttons: [{
                        text: _this.translate.instant("general.cancel"),
                        role: "cancel"
                    }, {
                        text: _this.translate.instant("profile.contacts.removeConfirmButtonText"),
                        role: "destructive",
                        cssClass: "alert-button-danger",
                        handler: function () {
                            _this.user.user.removeAsFriend();
                        }
                    }]
            }).present();
        };
        // 1:1 copy from topicDisplay. maybe this should go into the helper?
        this.getFile = function (url, type) {
            return new __WEBPACK_IMPORTED_MODULE_4_bluebird__(function (resolve, reject) {
                _this.file.resolveLocalFilesystemUrl(url).then(function (entry) {
                    return entry.file(resolve, reject);
                });
            }).then(function (file) {
                file.originalUrl = url;
                if (_this.platform.is("ios")) {
                    file.localURL = url.replace("file://", "http://" + window.location.host);
                }
                file.type = type;
                return file;
            });
        };
        this.report = function () {
            var reportConfirm = _this.alertCtrl.create({
                title: _this.translate.instant("profile.contacts.reportConfirm.title"),
                message: _this.translate.instant("profile.contacts.reportConfirm.message"),
                buttons: [{
                        text: _this.translate.instant("profile.contacts.reportConfirm.cancel")
                    }, {
                        text: _this.translate.instant("profile.contacts.reportConfirm.confirm"),
                        handler: function () {
                            __WEBPACK_IMPORTED_MODULE_3__lib_services_reportService__["a" /* default */].sendReport("user", _this.user.id);
                        }
                    }]
            });
            reportConfirm.setCssClass('logout-confirm');
            reportConfirm.present();
        };
        this.close = function () {
            _this.navCtrl.setRoot("Home");
        };
    }
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = parseInt(this.navParams.get("userId"), 10);
        this.isOwn = true;
        var awaitFriendsService = friendsService.awaitLoading().then(function () {
            var requests = friendsService.getRequests();
            _this.isRequest = requests.indexOf(_this.userId) > -1;
            _this.isOwn = _this.userId === parseInt(__WEBPACK_IMPORTED_MODULE_2__lib_services_session_service__["default"].userid, 10);
            _this.isRequestable = friendsService.noRequests(_this.userId) && !_this.isOwn;
        });
        __WEBPACK_IMPORTED_MODULE_4_bluebird__["all"]([
            userService.get(this.userId),
            awaitFriendsService
        ]).then(function (_a) {
            var user = _a[0];
            if (user.isNotExistingUser()) {
                _this.user = user.data;
                _this.profileLoading = false;
                return;
            }
            var fp = user.getFingerPrint();
            _this.fingerprint = [fp.substr(0, 13), fp.substr(13, 13), fp.substr(26, 13), fp.substr(39, 13)];
            return user.loadBasicData().thenReturn(user);
        }).then(function (user) {
            _this.userObject = user;
            _this.user = _this.userObject.data;
            _this.profileLoading = false;
        });
    };
    ProfilePage.prototype.getTitle = function () {
        if (this.isOwn) {
            return this.translate.instant("profile.ownTitle");
        }
        return this.translate.instant("profile.otherTitle", { name: this.user.name });
    };
    ProfilePage.prototype.attributeSet = function (val) {
        if (Array.isArray(val)) {
            return val.length > 0;
        }
        if (typeof val === "object") {
            return Object.keys(val).length > 0;
        }
        return val;
    };
    ProfilePage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ProfilePage.prototype.addOrAccept = function () {
        var _this = this;
        if (this.isRequest) {
            return friendsService.acceptFriendShip(this.userId).then(function () {
                _this.alertCtrl.create({
                    title: _this.translate.instant("profile.contacts.accepted"),
                    message: _this.translate.instant("profile.contacts.acceptedMessage", { name: _this.user.name }),
                    buttons: [_this.translate.instant("general.ok")]
                }).present();
            });
        }
        return friendsService.friendship(this.userId).then(function () {
            _this.alertCtrl.create({
                title: _this.translate.instant("profile.contacts.requestSent"),
                message: _this.translate.instant("profile.contacts.requestSentMessage", { name: _this.user.name }),
                buttons: [_this.translate.instant("general.ok")]
            }).present();
        });
    };
    ProfilePage.prototype.acceptRequest = function () {
        var _this = this;
        var addOrAcceptConfirm;
        if (this.isRequest) {
            addOrAcceptConfirm = this.alertCtrl.create({
                title: this.translate.instant("profile.contacts.acceptRequest", { name: this.user.name }),
                message: this.translate.instant("profile.contacts.acceptRequestQuestion", { name: this.user.name }),
                buttons: [
                    { text: this.translate.instant("general.decline"), role: 'danger' },
                    { text: this.translate.instant("general.accept"),
                        handler: function () {
                            _this.doAdd();
                        }
                    }
                ]
            });
            addOrAcceptConfirm.setCssClass("profile__request-accept");
        }
        else {
            addOrAcceptConfirm = this.alertCtrl.create({
                title: this.translate.instant("profile.contacts.sendRequest"),
                message: this.translate.instant("profile.contacts.sendRequestQuestion", { name: this.user.name }),
                buttons: [
                    { text: this.translate.instant("general.cancel"), role: 'cancel' },
                    { text: this.translate.instant("profile.contacts.send"),
                        handler: function () {
                            _this.doAdd();
                        }
                    }
                ]
            });
            addOrAcceptConfirm.setCssClass("profile__send-confirm");
        }
        addOrAcceptConfirm.present();
    };
    ProfilePage.prototype.doAdd = function () {
        var _this = this;
        this.profileLoading = true;
        this.addOrAccept().then(function () {
            _this.profileLoading = false;
            _this.isRequest = false;
        });
    };
    ProfilePage.prototype.declineRequest = function () {
        var _this = this;
        if (!this.isRequest) {
            this.isRequestable = false;
            return;
        }
        this.profileLoading = true;
        friendsService.ignoreFriendShip(this.userId).then(function () {
            _this.profileLoading = false;
            _this.isRequest = false;
        });
    };
    ProfilePage.prototype.writeMessage = function () {
        this.navCtrl.push("New Message", {
            receiverIds: this.user.id.toString()
        });
    };
    ProfilePage.prototype.contactOptions = function () {
        var _this = this;
        var verifyButton = {
            icon: !this.platform.is("ios") ? "lock" : null,
            text: this.translate.instant("profile.verify.action"),
            handler: function () {
                _this.verifyPerson();
            }
        };
        var removeFriendButton = {
            text: this.translate.instant("profile.contacts.removeButtonText"),
            role: "destructive",
            icon: !this.platform.is("ios") ? "trash" : null,
            handler: this.removeFriendClick
        };
        var cancelButton = {
            text: this.translate.instant("general.cancel"),
            role: "cancel",
            icon: !this.platform.is("ios") ? "close" : null,
        };
        var buttons = this.user.trustLevel < 2 ? [verifyButton, removeFriendButton, cancelButton] : [removeFriendButton, cancelButton];
        this.actionSheetCtrl.create({
            buttons: buttons
        }).present();
    };
    ProfilePage.prototype.removeProfileImage = function () {
        this.userObject.removeProfileAttribute("image"),
            this.userObject.removeProfileAttribute("imageBlob");
        return this.userObject.uploadChangedProfile();
    };
    ProfilePage.prototype.uploadProfileImage = function (url) {
        var _this = this;
        return this.getFile(url, "image/png").then(function (file) {
            var upload = new __WEBPACK_IMPORTED_MODULE_6__lib_services_imageUpload_service__["a" /* default */](file, imageUploadOptions);
            return upload.prepare().then(function (_a) {
                var lowest = _a.lowest;
                return upload.upload().thenReturn(lowest);
            });
        }).then(function (imageMeta) {
            var setImageBlobAttributePromise = _this.userObject.setProfileAttribute("imageBlob", {
                blobid: imageMeta.meta.blobID,
                imageHash: imageMeta.content.blobHash
            });
            _this.userObject.removeProfileAttribute("image");
            return setImageBlobAttributePromise;
        }).then(function () {
            return _this.userObject.uploadChangedProfile();
        });
    };
    ProfilePage.prototype.avatarClicked = function () {
        var _this = this;
        this.actionSheetCtrl.create({
            buttons: [{
                    icon: !this.platform.is("ios") ? "eye" : null,
                    text: this.translate.instant("profile.image.view"),
                    handler: function () {
                        _this.userObject.getProfileAttribute("imageBlob").then(function (_a) {
                            var blobid = _a.blobid;
                            return __WEBPACK_IMPORTED_MODULE_5__lib_services_blobService__["a" /* default */].getBlobUrl(blobid);
                        }).then(function (url) {
                            _this.photoViewer.show(url);
                        });
                        console.log("view image");
                    }
                }, {
                    icon: !this.platform.is("ios") ? "camera" : null,
                    text: this.translate.instant("profile.image.takePhoto"),
                    handler: function () {
                        _this.camera.getPicture(CameraOptions).then(function (url) {
                            return _this.uploadProfileImage(url);
                        });
                    }
                }, {
                    icon: !this.platform.is("ios") ? "image" : null,
                    text: this.translate.instant("profile.image.selectPhoto"),
                    handler: function () {
                        __WEBPACK_IMPORTED_MODULE_4_bluebird__["resolve"](_this.imagePicker.getPictures(ImagePickerOptions)).map(function (result) {
                            return _this.uploadProfileImage(result);
                        });
                    }
                }, {
                    text: this.translate.instant("profile.image.removeButtonText"),
                    role: "destructive",
                    icon: !this.platform.is("ios") ? "trash" : null,
                    handler: function () {
                        _this.alertCtrl.create({
                            title: _this.translate.instant("profile.image.removeTitle"),
                            message: _this.translate.instant("profile.image.removeQuestion"),
                            buttons: [{
                                    text: _this.translate.instant("general.cancel"),
                                    role: "cancel"
                                }, {
                                    text: _this.translate.instant("profile.image.removeConfirmButtonText"),
                                    role: "destructive",
                                    cssClass: "alert-button-danger",
                                    handler: function () {
                                        _this.removeProfileImage();
                                    }
                                }]
                        }).present();
                    }
                }, {
                    text: this.translate.instant("general.cancel"),
                    role: "cancel",
                    icon: !this.platform.is("ios") ? "close" : null
                }]
        }).present();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])({
            name: "Profile",
            segment: "profile/:userId"
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/pages/profile/profile.html"*/'<ion-header>\n\n	<ion-navbar [color]="\'primary\'">\n		<ion-title>{{getTitle()}}</ion-title>\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content class="has-main-menu">\n	<ion-toolbar *ngIf="isOwn" padding color="light">\n		<ion-segment [(ngModel)]="view" color="grey">\n			<ion-segment-button value="profile">\n				{{ \'profile.profileSegment\' | translate }}\n			</ion-segment-button>\n			<ion-segment-button value="qr">\n				{{ \'profile.qrSegment\' | translate }}\n			</ion-segment-button>\n		</ion-segment>\n	</ion-toolbar>\n	<ion-spinner *ngIf="profileLoading" text-center margin-vertical class="spinner--full"></ion-spinner>\n	<div [ngSwitch]="view">\n\n		<div *ngSwitchCase="\'profile\'">\n			<div *ngIf="!isOwn" class="profile__avatar-row">\n				<div class="profile__request-hex">\n					<load *ngIf="isRequest || isRequestable" [name]="\'add\'" class="profile__request-button" id="request__accept__button" (click)="acceptRequest()"></load>\n					<load *ngIf="!(isRequest || isRequestable)" [name]="\'added\'" class="profile__request-button" id="request__accept__button" (click)="contactOptions()"></load>\n				</div>\n				<ion-avatar class="hexagon__image hexagon__image--active hexagon__image--large profile__image">\n					<user-image [id]="user.id" [image]="user.basic.image"></user-image>\n				</ion-avatar>\n				<div class="profile__request-hex" id="request__decline">\n					<load [name]="\'write\'" class="profile__request-button" id="request__accept__button" (click)="writeMessage()"></load>\n				</div>\n			</div>\n			<div *ngIf="isOwn" class="profile__avatar-row">\n				<ion-avatar class="hexagon__image hexagon__image--active hexagon__image--large profile__image" (click)="avatarClicked()">\n					<user-image [id]="user.id" [image]="user.basic.image"></user-image>\n				</ion-avatar>\n			</div>\n			<div class="profile__names">\n				<h1 color="dark" text-center class="profile__big-name">{{user.name}}</h1>\n				<h3 color="grey" text-center class="profile__small-name" *ngIf="user.names.firstname || user.names.lastname"><small>{{user.names.nickname}}</small></h3>\n			</div>\n			<ion-list class="profile__info-list space-for-fab" inset *ngIf="!isBlocked()">\n				<ion-item *ngIf="attributeSet(user.advanced.birthday)">\n					<ion-label fixed color="primaryDarker" text-right>{{ \'profile.birthday\' | translate }}</ion-label>\n					<p item-content class="profile__info">{{user.advanced.birthday.day}}.<span *ngIf="user.advanced.birthday.month && user.advanced.birthday.month.length === 1">0</span>{{user.advanced.birthday.month}}.{{user.advanced.birthday.year}}</p>\n				</ion-item>\n				<ion-item *ngIf="attributeSet(user.advanced.location)">\n					<ion-label fixed color="primaryDarker" text-right>{{ \'profile.location\' | translate }}</ion-label>\n					<p item-content class="profile__info">{{user.advanced.location.town}} {{user.advanced.location.country}}</p>\n				</ion-item>\n				<!-- <ion-item *ngIf="user.advanced.relationship">\n					<ion-label fixed color="primaryDarker" text-right>Relationship</ion-label>\n					<p item-content class="profile__info">{{user.advanced.location.town}} {{user.advanced.location.country}}</p>\n				</ion-item>\n				<ion-item *ngIf="user.advanced.education">\n					<ion-label fixed color="primaryDarker" text-right>Education</ion-label>\n					<p item-content class="profile__info">\n						<span *ngFor="let school of user.advanced.education; let last = last">{{school.name}}{{last ? \'\' : \', \'}}<br></span>\n					</p>\n				</ion-item>\n				<ion-item *ngIf="user.advanced.work">\n					<ion-label fixed color="primaryDarker" text-right>Work</ion-label>\n					<p item-content class="profile__info">{{user.advanced.work.what}} at {{user.advanced.work.where}}</p>\n				</ion-item>\n				<ion-item *ngIf="user.advanced.gender">\n					<ion-label fixed color="primaryDarker" text-right>Gender</ion-label>\n					<p item-content class="profile__info">{{user.advanced.work.what}} at {{user.advanced.work.where}}</p>\n				</ion-item> -->\n				<ion-item *ngIf="attributeSet(user.advanced.languages)">\n					<ion-label fixed color="primaryDarker" text-right>{{ \'profile.languages\' | translate }}</ion-label>\n					<p item-content class="profile__info">\n						<span *ngFor="let language of user.advanced.languages; let last = last">{{language.name}}{{last ? \'\' : \', \'}}</span>\n					</p>\n				</ion-item>\n			</ion-list>\n\n			<div *ngIf="!isOwn">\n				<ion-list showWhen="ios">\n					<button ion-item (click)="verifyPerson()" *ngIf="user.trustLevel < 2">\n						{{ \'profile.verify.action\' | translate }}\n					</button>\n					<button *ngIf="isRequest" ion-item (click)="declineRequest()">\n						<span ion-text color="danger">{{ \'profile.contacts.declineRequest\' | translate }}</span>\n					</button>\n					<button ion-item (click)="report()">\n						<span ion-text color="danger">{{ \'profile.contacts.reportContact\' | translate }}</span>\n					</button>\n					<button ion-item (click)="block()" *ngIf="!isBlocked()">\n						<span ion-text color="danger">{{ \'profile.contacts.blockContact\' | translate }}</span>\n					</button>\n					<button ion-item (click)="unblock()" *ngIf="isBlocked()">\n						<span ion-text color="danger">{{ \'profile.contacts.unblockContact\' | translate }}</span>\n					</button>\n				</ion-list>\n				<div padding-horizontal hideWhen="ios">\n					<button ion-button block color="light" (click)="verifyPerson()" *ngIf="user.trustLevel < 2">\n						{{ \'profile.verify.action\' | translate }}\n					</button>\n					<button *ngIf="isRequest" ion-button block color="danger" (click)="declineRequest()">\n						{{ \'profile.contacts.declineRequest\' | translate }}\n					</button>\n					<button ion-button color="danger" [full]=true (click)="report()">{{ \'profile.contacts.reportContact\' | translate }}</button>\n					<button ion-button color="danger" [full]=true (click)="block()" *ngIf="!isBlocked()">{{ \'profile.contacts.blockContact\' | translate }}</button>\n					<button ion-button color="danger" [full]=true (click)="unblock()" *ngIf="isBlocked()">{{ \'profile.contacts.unblockContact\' | translate }}</button>\n				</div>\n			</div>\n		</div>\n		<div *ngSwitchCase="\'qr\'">\n\n			<qr-code [value]="user.fingerprint" [size]="400" class="profile__qr"></qr-code>\n\n			<ion-grid class="fingerprint">\n				<ion-row>\n					<ion-col class="fingerprint-label" col-3 [innerHtml]="\'profile.idTitle\' | translate"></ion-col>\n					<ion-col class="fingerprint-value" col-9>\n						<pre *ngFor="let part of fingerprint" class="fingerprint-part">{{part}}</pre>\n					</ion-col>\n				</ion-row>\n			</ion-grid>\n\n			<div class="space-for-fab" padding-horizontal>\n				<p class="text-grey" padding-horizontal [innerHtml]="\'profile.idExplanation\' | translate"></p>\n			</div>\n\n		</div>\n	</div>\n	<navigator [icon]="\'close\'" (invoke)="close()" ion-fixed></navigator>\n</ion-content>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__["a" /* ImagePicker */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export QRCodeComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QRCodeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qrious__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qrious___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_qrious__);



var QRCodeComponent = (function () {
    /**
     * @param {?} elementRef
     */
    function QRCodeComponent(elementRef) {
        this.elementRef = elementRef;
        this.background = 'white';
        this.backgroundAlpha = 1.0;
        this.foreground = 'black';
        this.foregroundAlpha = 1.0;
        this.level = 'L';
        this.mime = 'image/png';
        this.padding = null;
        this.size = 100;
        this.value = '';
        this.canvas = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    QRCodeComponent.prototype.ngOnChanges = function (changes) {
        if ('background' in changes ||
            'backgroundAlpha' in changes ||
            'foreground' in changes ||
            'foregroundAlpha' in changes ||
            'level' in changes ||
            'mime' in changes ||
            'padding' in changes ||
            'size' in changes ||
            'value' in changes ||
            'canvas' in changes) {
            this.generate();
        }
    };
    /**
     * @return {?}
     */
    QRCodeComponent.prototype.generate = function () {
        try {
            var /** @type {?} */ el = this.elementRef.nativeElement;
            el.innerHTML = '';
            var /** @type {?} */ qr = new __WEBPACK_IMPORTED_MODULE_1_qrious___default.a({
                background: this.background,
                backgroundAlpha: this.backgroundAlpha,
                foreground: this.foreground,
                foregroundAlpha: this.foregroundAlpha,
                level: this.level,
                mime: this.mime,
                padding: this.padding,
                size: this.size,
                value: this.value
            });
            if (this.canvas) {
                el.appendChild(qr.canvas);
            }
            else {
                el.appendChild(qr.image);
            }
        }
        catch (e) {
            console.error("Could not generate QR Code: " + e.message);
        }
    };
    return QRCodeComponent;
}());
QRCodeComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                moduleId: 'module.id',
                selector: 'qr-code',
                template: ""
            },] },
];
/**
 * @nocollapse
 */
QRCodeComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], },
]; };
QRCodeComponent.propDecorators = {
    'background': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'backgroundAlpha': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'foreground': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'foregroundAlpha': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'level': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'mime': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'padding': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'size': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'canvas': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};
var QRCodeModule = (function () {
    function QRCodeModule() {
    }
    return QRCodeModule;
}());
QRCodeModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */], args: [{
                exports: [QRCodeComponent],
                declarations: [QRCodeComponent]
            },] },
];
/**
 * @nocollapse
 */
QRCodeModule.ctorParameters = function () { return []; };

/**
 * Generated bundle index. Do not edit.
 */




/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

/*
 * QRious v2.2.0
 * Copyright (C) 2016 Alasdair Mercer
 * Copyright (C) 2010 Tom Zerucha
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('qrious', factory) :
	(global.QRious = factory());
}(this, (function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// 7.1.13 ToObject(argument)
	var defined = _defined;
	var _toObject = function(it){
	  return Object(defined(it));
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
	});

	var global$1 = _global;
	var SHARED = '__core-js_shared__';
	var store  = global$1[SHARED] || (global$1[SHARED] = {});
	var _shared = function(key){
	  return store[key] || (store[key] = {});
	};

	var id = 0;
	var px = Math.random();
	var _uid = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');
	var uid    = _uid;
	var _sharedKey = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = _has;
	var toObject$1    = _toObject;
	var IE_PROTO    = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function(O){
	  O = toObject$1(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
	});

	var _aFunction = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding
	var aFunction = _aFunction;
	var _ctx = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject = _isObject;
	var _anObject = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

	var isObject$1 = _isObject;
	var document$1 = _global.document;
	var is = isObject$1(document$1) && isObject$1(document$1.createElement);
	var _domCreate = function(it){
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function(){
	  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject$2 = _isObject;
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function(it, S){
	  if(!isObject$2(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var anObject       = _anObject;
	var IE8_DOM_DEFINE = _ie8DomDefine;
	var toPrimitive    = _toPrimitive;
	var dP$1             = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP$1(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

	var dP         = _objectDp;
	var createDesc = _propertyDesc;
	var _hide = _descriptors ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

	var global$2    = _global;
	var core$1      = _core;
	var ctx       = _ctx;
	var hide      = _hide;
	var PROTOTYPE = 'prototype';

	var $export$1 = function(type, name, source){
	  var IS_FORCED = type & $export$1.F
	    , IS_GLOBAL = type & $export$1.G
	    , IS_STATIC = type & $export$1.S
	    , IS_PROTO  = type & $export$1.P
	    , IS_BIND   = type & $export$1.B
	    , IS_WRAP   = type & $export$1.W
	    , exports   = IS_GLOBAL ? core$1 : core$1[name] || (core$1[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global$2 : IS_STATIC ? global$2[name] : (global$2[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global$2)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export$1.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library` 
	var _export = $export$1;

	// most Object methods by ES6 should accept primitives
	var $export = _export;
	var core    = _core;
	var fails   = _fails;
	var _objectSap = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = _toObject;
	var $getPrototypeOf = _objectGpo;

	_objectSap('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

	var getPrototypeOf$2 = _core.Object.getPrototypeOf;

	var getPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getPrototypeOf$2, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

	var classCallCheck = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var $export$2 = _export;
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export$2($export$2.S + $export$2.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

	var $Object = _core.Object;
	var defineProperty$3 = function defineProperty$3(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty$3, __esModule: true };
	});

	var createClass = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _defineProperty = defineProperty$1;

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	// 7.1.4 ToInteger
	var ceil  = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var toInteger = _toInteger;
	var defined$1   = _defined;
	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined$1(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _library = true;

	var _redefine = _hide;

	var _iterators = {};

	var toString$1 = {}.toString;

	var _cof = function(it){
	  return toString$1.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = _cof;
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = _iobject;
	var defined$2 = _defined;
	var _toIobject = function(it){
	  return IObject(defined$2(it));
	};

	// 7.1.15 ToLength
	var toInteger$1 = _toInteger;
	var min       = Math.min;
	var _toLength = function(it){
	  return it > 0 ? min(toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var toInteger$2 = _toInteger;
	var max       = Math.max;
	var min$1       = Math.min;
	var _toIndex = function(index, length){
	  index = toInteger$2(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject$1 = _toIobject;
	var toLength  = _toLength;
	var toIndex   = _toIndex;
	var _arrayIncludes = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject$1($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var has$2          = _has;
	var toIObject    = _toIobject;
	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO$2     = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO$2)has$2(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has$2(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = _objectKeysInternal;
	var enumBugKeys$1 = _enumBugKeys;

	var _objectKeys = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys$1);
	};

	var dP$2       = _objectDp;
	var anObject$2 = _anObject;
	var getKeys  = _objectKeys;

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject$2(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP$2.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var _html = _global.document && document.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject$1    = _anObject;
	var dPs         = _objectDps;
	var enumBugKeys = _enumBugKeys;
	var IE_PROTO$1    = _sharedKey('IE_PROTO');
	var Empty       = function(){ /* empty */ };
	var PROTOTYPE$1   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE$1][enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE$1] = anObject$1(O);
	    result = new Empty;
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store      = _shared('wks')
	  , uid        = _uid
	  , Symbol     = _global.Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;
	var has$3 = _has;
	var TAG = _wks('toStringTag');

	var _setToStringTag = function(it, tag, stat){
	  if(it && !has$3(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

	var create$1         = _objectCreate;
	var descriptor     = _propertyDesc;
	var setToStringTag$1 = _setToStringTag;
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function(){ return this; });

	var _iterCreate = function(Constructor, NAME, next){
	  Constructor.prototype = create$1(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag$1(Constructor, NAME + ' Iterator');
	};

	var LIBRARY        = _library;
	var $export$3        = _export;
	var redefine       = _redefine;
	var hide$1           = _hide;
	var has$1            = _has;
	var Iterators      = _iterators;
	var $iterCreate    = _iterCreate;
	var setToStringTag = _setToStringTag;
	var getPrototypeOf$4 = _objectGpo;
	var ITERATOR       = _wks('iterator');
	var BUGGY          = !([].keys && 'next' in [].keys());
	var FF_ITERATOR    = '@@iterator';
	var KEYS           = 'keys';
	var VALUES         = 'values';

	var returnThis = function(){ return this; };

	var _iterDefine = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf$4($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has$1(IteratorPrototype, ITERATOR))hide$1(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide$1(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export$3($export$3.P + $export$3.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at  = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

	var _addToUnscopables = function(){ /* empty */ };

	var _iterStep = function(done, value){
	  return {value: value, done: !!done};
	};

	var addToUnscopables = _addToUnscopables;
	var step             = _iterStep;
	var Iterators$2        = _iterators;
	var toIObject$2        = _toIobject;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function(iterated, kind){
	  this._t = toIObject$2(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators$2.Arguments = Iterators$2.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var global$3        = _global;
	var hide$2          = _hide;
	var Iterators$1     = _iterators;
	var TO_STRING_TAG = _wks('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global$3[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide$2(proto, TO_STRING_TAG, NAME);
	  Iterators$1[NAME] = Iterators$1.Array;
	}

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var iterator$2 = _wksExt.f('iterator');

	var iterator = createCommonjsModule(function (module) {
	module.exports = { "default": iterator$2, __esModule: true };
	});

	var _meta = createCommonjsModule(function (module) {
	var META     = _uid('meta')
	  , isObject = _isObject
	  , has      = _has
	  , setDesc  = _objectDp.f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !_fails(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};
	});

	var global$5         = _global;
	var core$2           = _core;
	var LIBRARY$1        = _library;
	var wksExt$1         = _wksExt;
	var defineProperty$5 = _objectDp.f;
	var _wksDefine = function(name){
	  var $Symbol = core$2.Symbol || (core$2.Symbol = LIBRARY$1 ? {} : global$5.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty$5($Symbol, name, {value: wksExt$1.f(name)});
	};

	var getKeys$1   = _objectKeys;
	var toIObject$4 = _toIobject;
	var _keyof = function(object, el){
	  var O      = toIObject$4(object)
	    , keys   = getKeys$1(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	// all enumerable object keys, includes symbols
	var getKeys$2 = _objectKeys;
	var gOPS    = _objectGops;
	var pIE     = _objectPie;
	var _enumKeys = function(it){
	  var result     = getKeys$2(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)
	var cof$1 = _cof;
	var _isArray = Array.isArray || function isArray(arg){
	  return cof$1(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys$2      = _objectKeysInternal;
	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys$2(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$5
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject$5 = _toIobject;
	var gOPN$1      = _objectGopn.f;
	var toString$2  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN$1(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	var f$4 = function getOwnPropertyNames(it){
	  return windowNames && toString$2.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(toIObject$5(it));
	};

	var _objectGopnExt = {
		f: f$4
	};

	var pIE$1            = _objectPie;
	var createDesc$2     = _propertyDesc;
	var toIObject$6      = _toIobject;
	var toPrimitive$2    = _toPrimitive;
	var has$5            = _has;
	var IE8_DOM_DEFINE$1 = _ie8DomDefine;
	var gOPD$1           = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD$1 : function getOwnPropertyDescriptor(O, P){
	  O = toIObject$6(O);
	  P = toPrimitive$2(P, true);
	  if(IE8_DOM_DEFINE$1)try {
	    return gOPD$1(O, P);
	  } catch(e){ /* empty */ }
	  if(has$5(O, P))return createDesc$2(!pIE$1.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim
	var global$4         = _global;
	var has$4            = _has;
	var DESCRIPTORS    = _descriptors;
	var $export$4        = _export;
	var redefine$1       = _redefine;
	var META           = _meta.KEY;
	var $fails         = _fails;
	var shared$1         = _shared;
	var setToStringTag$2 = _setToStringTag;
	var uid$1            = _uid;
	var wks            = _wks;
	var wksExt         = _wksExt;
	var wksDefine      = _wksDefine;
	var keyOf          = _keyof;
	var enumKeys       = _enumKeys;
	var isArray$1        = _isArray;
	var anObject$3       = _anObject;
	var toIObject$3      = _toIobject;
	var toPrimitive$1    = _toPrimitive;
	var createDesc$1     = _propertyDesc;
	var _create        = _objectCreate;
	var gOPNExt        = _objectGopnExt;
	var $GOPD          = _objectGopd;
	var $DP            = _objectDp;
	var $keys$1          = _objectKeys;
	var gOPD           = $GOPD.f;
	var dP$3             = $DP.f;
	var gOPN           = gOPNExt.f;
	var $Symbol        = global$4.Symbol;
	var $JSON          = global$4.JSON;
	var _stringify     = $JSON && $JSON.stringify;
	var PROTOTYPE$2      = 'prototype';
	var HIDDEN         = wks('_hidden');
	var TO_PRIMITIVE   = wks('toPrimitive');
	var isEnum         = {}.propertyIsEnumerable;
	var SymbolRegistry = shared$1('symbol-registry');
	var AllSymbols     = shared$1('symbols');
	var OPSymbols      = shared$1('op-symbols');
	var ObjectProto$1    = Object[PROTOTYPE$2];
	var USE_NATIVE     = typeof $Symbol == 'function';
	var QObject        = global$4.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter$1 = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP$3({}, 'a', {
	    get: function(){ return dP$3(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto$1, key);
	  if(protoDesc)delete ObjectProto$1[key];
	  dP$3(it, key, D);
	  if(protoDesc && it !== ObjectProto$1)dP$3(ObjectProto$1, key, protoDesc);
	} : dP$3;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto$1)$defineProperty(OPSymbols, key, D);
	  anObject$3(it);
	  key = toPrimitive$1(key, true);
	  anObject$3(D);
	  if(has$4(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has$4(it, HIDDEN))dP$3(it, HIDDEN, createDesc$1(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has$4(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc$1(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP$3(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject$3(it);
	  var keys = enumKeys(P = toIObject$3(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive$1(key, true));
	  if(this === ObjectProto$1 && has$4(AllSymbols, key) && !has$4(OPSymbols, key))return false;
	  return E || !has$4(this, key) || !has$4(AllSymbols, key) || has$4(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject$3(it);
	  key = toPrimitive$1(key, true);
	  if(it === ObjectProto$1 && has$4(AllSymbols, key) && !has$4(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has$4(AllSymbols, key) && !(has$4(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject$3(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has$4(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto$1
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject$3(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has$4(AllSymbols, key = names[i++]) && (IS_OP ? has$4(ObjectProto$1, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid$1(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto$1)$set.call(OPSymbols, value);
	      if(has$4(this, HIDDEN) && has$4(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc$1(1, value));
	    };
	    if(DESCRIPTORS && setter$1)setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine$1($Symbol[PROTOTYPE$2], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  _objectGopn.f = gOPNExt.f = $getOwnPropertyNames;
	  _objectPie.f  = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !_library){
	    redefine$1(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  };
	}

	$export$4($export$4.G + $export$4.W + $export$4.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i$1 = 0; symbols.length > i$1; )wks(symbols[i$1++]);

	for(var symbols = $keys$1(wks.store), i$1 = 0; symbols.length > i$1; )wksDefine(symbols[i$1++]);

	$export$4($export$4.S + $export$4.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has$4(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter$1 = true; },
	  useSimple: function(){ setter$1 = false; }
	});

	$export$4($export$4.S + $export$4.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$4($export$4.S + $export$4.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray$1(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag$2($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag$2(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag$2(global$4.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var index = _core.Symbol;

	var symbol = createCommonjsModule(function (module) {
	module.exports = { "default": index, __esModule: true };
	});

	var _typeof_1 = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _iterator = iterator;

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = symbol;

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var possibleConstructorReturn = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _typeof2 = _typeof_1;

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject$3 = _isObject;
	var anObject$4 = _anObject;
	var check = function(O, proto){
	  anObject$4(O);
	  if(!isObject$3(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export$5 = _export;
	$export$5($export$5.S, 'Object', {setPrototypeOf: _setProto.set});

	var setPrototypeOf$3 = _core.Object.setPrototypeOf;

	var setPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": setPrototypeOf$3, __esModule: true };
	});

	var $export$6 = _export;
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export$6($export$6.S, 'Object', {create: _objectCreate});

	var $Object$1 = _core.Object;
	var create$4 = function create$4(P, D){
	  return $Object$1.create(P, D);
	};

	var create$2 = createCommonjsModule(function (module) {
	module.exports = { "default": create$4, __esModule: true };
	});

	var inherits = createCommonjsModule(function (module, exports) {
	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = setPrototypeOf$1;

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = create$2;

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = _typeof_1;

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};
	});

	var _inherits = unwrapExports(inherits);

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * Contains utility methods that are useful throughout the library.
	 *
	 * @public
	 */
	var Utilities = function () {
	  function Utilities() {
	    _classCallCheck(this, Utilities);
	  }

	  _createClass(Utilities, null, [{
	    key: 'abs',


	    /**
	     * Returns the absolute value of a given number.
	     *
	     * This method is simply a convenient shorthand for <code>Math.abs</code> while ensuring that nulls are returned as
	     * <code>null</code> instead of zero.
	     *
	     * @param {number} value - the number whose absolute value is to be returned
	     * @return {number} The absolute value of <code>value</code> or <code>null</code> if <code>value</code> is
	     * <code>null</code>.
	     * @public
	     * @static
	     */
	    value: function abs(value) {
	      return value != null ? Math.abs(value) : null;
	    }

	    /**
	     * Copies all properties from the <code>source</code> object to the <code>target</code> object, however, all property
	     * names on the <code>target</code> will be prefixed with an underscore, used to indicate that they are private.
	     *
	     * @param {Object} target - the object to which the private fields are to be copied
	     * @param {Object} source - the object from which the fields are to be copied
	     * @return {Object} A reference to the <code>target</code> object.
	     * @public
	     * @static
	     */

	  }, {
	    key: 'privatize',
	    value: function privatize(target, source) {
	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target['_' + key] = source[key];
	        }
	      }

	      return target;
	    }

	    /**
	     * Sets the specified <code>value</code> on a given field on the <code>object</code> provided.
	     *
	     * If <code>value</code> is <code>null</code>, the specified default value will be used instead.
	     *
	     * An optional <code>transformer</code> can be specified which will be used to transform the value (or default value)
	     * before it is assigned to the field.
	     *
	     * @param {Object} object - the object whose field is to be set with <code>value</code>
	     * @param {string} fieldName - the field to be set with <code>value</code>
	     * @param {*} value - the value to be set on the named field
	     * @param {*} [defaultValue] - the value to be used if <code>value</code> is <code>null</code>
	     * @param {Function} [transformer] - a function used to transform the value before it is assigned to the named field
	     * @return {boolean} <code>true</code> if the value of the field has changed as a result of the assignment; otherwise
	     * <code>false</code>.
	     * @public
	     * @static
	     */

	  }, {
	    key: 'setter',
	    value: function setter(object, fieldName, value, defaultValue, transformer) {
	      var oldValue = object[fieldName];
	      var newValue = value != null ? value : defaultValue;
	      if (typeof transformer === 'function') {
	        newValue = transformer(newValue);
	      }

	      object[fieldName] = newValue;

	      return newValue !== oldValue;
	    }

	    /**
	     * Throws an error indicating that the a given method on a specific class has not been implemented.
	     *
	     * @param {string} className - the name of the class on which the method has not been implemented
	     * @param {string} methodName - the name of the method which has not been implemented
	     * @return {void}
	     * @throws {Error} The error describing the class method which has not been implemented.
	     * @public
	     * @static
	     */

	  }, {
	    key: 'throwUnimplemented',
	    value: function throwUnimplemented(className, methodName) {
	      throw new Error('"' + methodName + '" method must be implemented on the ' + className + ' class');
	    }

	    /**
	     * Transforms the specified <code>string</code> to upper case while remaining null-safe.
	     *
	     * @param {string} string - the string to be transformed to upper case
	     * @return {string} <code>string</code> transformed to upper case if <code>string</code> is not <code>null</code>.
	     * @public
	     * @static
	     */

	  }, {
	    key: 'toUpperCase',
	    value: function toUpperCase(string) {
	      return string != null && string.toUpperCase();
	    }
	  }]);

	  return Utilities;
	}();

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * Defines a service contract that must be met by all implementations.
	 *
	 * @public
	 */

	var Service = function () {
	  function Service() {
	    _classCallCheck(this, Service);
	  }

	  _createClass(Service, [{
	    key: 'getName',


	    /**
	     * Returns the name of this {@link Service}.
	     *
	     * @return {string} The service name.
	     * @public
	     */
	    value: function getName() {
	      Utilities.throwUnimplemented('Service', 'getName');
	    }
	  }]);

	  return Service;
	}();

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * A service for working with elements.
	 *
	 * @public
	 * @extends Service
	 */

	var ElementService = function (_Service) {
	  _inherits(ElementService, _Service);

	  function ElementService() {
	    _classCallCheck(this, ElementService);

	    return _possibleConstructorReturn(this, (ElementService.__proto__ || _Object$getPrototypeOf(ElementService)).apply(this, arguments));
	  }

	  _createClass(ElementService, [{
	    key: 'createCanvas',


	    /**
	     * Creates an instance of a canvas element.
	     *
	     * @return {*} The newly created canvas element.
	     * @public
	     */
	    value: function createCanvas() {
	      Utilities.throwUnimplemented('ElementService', 'createCanvas');
	    }

	    /**
	     * Creates an instance of a image element.
	     *
	     * @return {*} The newly created image element.
	     * @public
	     */

	  }, {
	    key: 'createImage',
	    value: function createImage() {
	      Utilities.throwUnimplemented('ElementService', 'createImage');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'getName',
	    value: function getName() {
	      return 'element';
	    }

	    /**
	     * Returns whether the specified <code>element</code> is a canvas.
	     *
	     * @param {*} element - the element to be checked
	     * @return {boolean} <code>true</code> if <code>element</code> is a canvas; otherwise <code>false</code>.
	     * @public
	     */

	  }, {
	    key: 'isCanvas',
	    value: function isCanvas(element) {
	      Utilities.throwUnimplemented('ElementService', 'isCanvas');
	    }

	    /**
	     * Returns whether the specified <code>element</code> is an image.
	     *
	     * @param {*} element - the element to be checked
	     * @return {boolean} <code>true</code> if <code>element</code> is an image; otherwise <code>false</code>.
	     * @public
	     */

	  }, {
	    key: 'isImage',
	    value: function isImage(element) {
	      Utilities.throwUnimplemented('ElementService', 'isImage');
	    }
	  }]);

	  return ElementService;
	}(Service);

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * An implementation of {@link ElementService} intended for use within a browser environment.
	 *
	 * @public
	 * @extends ElementService
	 */

	var BrowserElementService = function (_ElementService) {
	  _inherits(BrowserElementService, _ElementService);

	  function BrowserElementService() {
	    _classCallCheck(this, BrowserElementService);

	    return _possibleConstructorReturn(this, (BrowserElementService.__proto__ || _Object$getPrototypeOf(BrowserElementService)).apply(this, arguments));
	  }

	  _createClass(BrowserElementService, [{
	    key: 'createCanvas',


	    /**
	     * @override
	     */
	    value: function createCanvas() {
	      return document.createElement('canvas');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'createImage',
	    value: function createImage() {
	      return document.createElement('img');
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'isCanvas',
	    value: function isCanvas(element) {
	      return element instanceof HTMLCanvasElement;
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'isImage',
	    value: function isImage(element) {
	      return element instanceof HTMLImageElement;
	    }
	  }]);

	  return BrowserElementService;
	}(ElementService);

	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys$3  = _objectKeys;
	var gOPS$1     = _objectGops;
	var pIE$2      = _objectPie;
	var toObject$2 = _toObject;
	var IObject$1  = _iobject;
	var $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject$2(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS$1.f
	    , isEnum     = pIE$2.f;
	  while(aLen > index){
	    var S      = IObject$1(arguments[index++])
	      , keys   = getSymbols ? getKeys$3(S).concat(getSymbols(S)) : getKeys$3(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)
	var $export$7 = _export;

	$export$7($export$7.S + $export$7.F, 'Object', {assign: _objectAssign});

	var assign$2 = _core.Object.assign;

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign$2, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$1);

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * Responsible for rendering a QR code {@link Frame} on a specific type of element.
	 *
	 * A renderer may be dependant on the rendering of another element, so ordering of their execution is important.
	 *
	 * @public
	 */

	var Renderer = function () {

	  /**
	   * Creates a new instance of {@link Renderer} for the <code>qrious</code> instance provided.
	   *
	   * @param {QRious} qrious - the {@link QRious} instance to be used
	   * @public
	   */
	  function Renderer(qrious) {
	    _classCallCheck(this, Renderer);

	    /**
	     * The {@link QRious} instance.
	     *
	     * @protected
	     * @type {QRious}
	     */
	    this.qrious = qrious;
	  }

	  /**
	   * Draws the specified QR code <code>frame</code> on the underlying element.
	   *
	   * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
	   *
	   * @param {Frame} frame - the {@link Frame} to be drawn
	   * @return {void}
	   * @protected
	   */


	  _createClass(Renderer, [{
	    key: 'draw',
	    value: function draw(frame) {
	      Utilities.throwUnimplemented('Renderer', 'draw');
	    }

	    /**
	     * Calculates the size (in pixel units) to represent an individual module within the QR code based on the
	     * <code>frame</code> provided.
	     *
	     * Any configured padding will be excluded from the returned size.
	     *
	     * The returned value will be at least one, even in cases where the size of the QR code does not fit its contents.
	     * This is done so that the inevitable clipping is handled more gracefully since this way at least something is
	     * displayed instead of just a blank space filled by the background color.
	     *
	     * @param {Frame} frame - the {@link Frame} from which the module size is to be derived
	     * @return {number} The pixel size for each module in the QR code which will be no less than one.
	     * @protected
	     */

	  }, {
	    key: 'getModuleSize',
	    value: function getModuleSize(frame) {
	      var padding = this.qrious.padding || 0;
	      var pixels = Math.floor((this.qrious.size - padding * 2) / frame.width);

	      return Math.max(1, pixels);
	    }

	    /**
	     * Calculates the offset/padding (in pixel units) to be inserted before the QR code based on the <code>frame</code>
	     * provided.
	     *
	     * The returned value will be zero if there is no available offset or if the size of the QR code does not fit its
	     * contents. It will never be a negative value. This is done so that the inevitable clipping appears more naturally
	     * and it is not clipped from all directions.
	     *
	     * @param {Frame} frame - the {@link Frame} from which the offset is to be derived
	     * @return {number} The pixel offset for the QR code which will be no less than zero.
	     * @protected
	     */

	  }, {
	    key: 'getOffset',
	    value: function getOffset(frame) {
	      if (this.qrious.padding != null) {
	        return this.qrious.padding;
	      }

	      var moduleSize = this.getModuleSize(frame);
	      var offset = Math.floor((this.qrious.size - moduleSize * frame.width) / 2);

	      return Math.max(0, offset);
	    }

	    /**
	     * Renders a QR code on the underlying element based on the <code>frame</code> provided.
	     *
	     * @param {Frame} frame - the {@link Frame} to be rendered
	     * @return {void}
	     * @public
	     */

	  }, {
	    key: 'render',
	    value: function render(frame) {
	      this.resize();
	      this.reset();
	      this.draw(frame);
	    }

	    /**
	     * Resets the underlying element, effectively clearing any previously rendered QR code.
	     *
	     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
	     *
	     * @return {void}
	     * @protected
	     */

	  }, {
	    key: 'reset',
	    value: function reset() {
	      Utilities.throwUnimplemented('Renderer', 'reset');
	    }

	    /**
	     * Ensures that the size of the underlying element matches that defined on the associated {@link QRious} instance.
	     *
	     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
	     *
	     * @return {void}
	     * @protected
	     */

	  }, {
	    key: 'resize',
	    value: function resize() {
	      Utilities.throwUnimplemented('Renderer', 'resize');
	    }
	  }]);

	  return Renderer;
	}();

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * An implementation of {@link Renderer} for working with <code>canvas</code> elements.
	 *
	 * @public
	 * @extends Renderer
	 */

	var CanvasRenderer = function (_Renderer) {
	  _inherits(CanvasRenderer, _Renderer);

	  function CanvasRenderer() {
	    _classCallCheck(this, CanvasRenderer);

	    return _possibleConstructorReturn(this, (CanvasRenderer.__proto__ || _Object$getPrototypeOf(CanvasRenderer)).apply(this, arguments));
	  }

	  _createClass(CanvasRenderer, [{
	    key: 'draw',


	    /**
	     * @override
	     */
	    value: function draw(frame) {
	      var qrious = this.qrious;
	      var moduleSize = this.getModuleSize(frame);
	      var offset = this.getOffset(frame);
	      var context = qrious.canvas.getContext('2d');

	      context.fillStyle = qrious.foreground;
	      context.globalAlpha = qrious.foregroundAlpha;

	      for (var i = 0; i < frame.width; i++) {
	        for (var j = 0; j < frame.width; j++) {
	          if (frame.buffer[j * frame.width + i]) {
	            context.fillRect(moduleSize * i + offset, moduleSize * j + offset, moduleSize, moduleSize);
	          }
	        }
	      }
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'reset',
	    value: function reset() {
	      var qrious = this.qrious;
	      var context = qrious.canvas.getContext('2d');

	      context.lineWidth = 1;
	      context.clearRect(0, 0, qrious.size, qrious.size);
	      context.fillStyle = qrious.background;
	      context.globalAlpha = qrious.backgroundAlpha;
	      context.fillRect(0, 0, qrious.size, qrious.size);
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'resize',
	    value: function resize() {
	      var qrious = this.qrious;
	      var canvas = qrious.canvas;

	      canvas.width = qrious.size;
	      canvas.height = qrious.size;
	    }
	  }]);

	  return CanvasRenderer;
	}(Renderer);

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/* eslint no-multi-spaces: "off" */

	/**
	 * Contains alignment pattern information.
	 *
	 * @public
	 */
	var Alignment = function () {
	  function Alignment() {
	    _classCallCheck(this, Alignment);
	  }

	  _createClass(Alignment, null, [{
	    key: "BLOCK",


	    /**
	     * Returns the alignment pattern block.
	     *
	     * @return {number[]} The alignment pattern block.
	     * @public
	     * @static
	     */
	    get: function get() {
	      return [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28];
	    }
	  }]);

	  return Alignment;
	}();

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/* eslint no-multi-spaces: "off" */

	/**
	 * Contains error correction information.
	 *
	 * @public
	 */
	var ErrorCorrection = function () {
	  function ErrorCorrection() {
	    _classCallCheck(this, ErrorCorrection);
	  }

	  _createClass(ErrorCorrection, null, [{
	    key: "BLOCKS",


	    /**
	     * Returns the error correction blocks.
	     *
	     * There are four elements per version. The first two indicate the number of blocks, then the data width, and finally
	     * the ECC width.
	     *
	     * @return {number[]} The ECC blocks.
	     * @public
	     * @static
	     */
	    get: function get() {
	      return [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30];
	    }

	    /**
	     * Returns the final format bits with mask (level << 3 | mask).
	     *
	     * @return {number[]} The final format bits.
	     * @public
	     * @static
	     */

	  }, {
	    key: "FINAL_FORMAT",
	    get: function get() {
	      return [
	      // L
	      0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
	      // M
	      0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0,
	      // Q
	      0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed,
	      // H
	      0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b];
	    }

	    /**
	     * Returns a map of human-readable ECC levels.
	     *
	     * @return {Object<string, number>} A ECC level mapping.
	     * @public
	     * @static
	     */

	  }, {
	    key: "LEVELS",
	    get: function get() {
	      return {
	        L: 1,
	        M: 2,
	        Q: 3,
	        H: 4
	      };
	    }
	  }]);

	  return ErrorCorrection;
	}();

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * Contains Galois field information.
	 *
	 * @public
	 */
	var Galois = function () {
	  function Galois() {
	    _classCallCheck(this, Galois);
	  }

	  _createClass(Galois, null, [{
	    key: "EXPONENT",


	    /**
	     * Returns the Galois field exponent table.
	     *
	     * @return {number[]} The Galois field exponent table.
	     * @public
	     * @static
	     */
	    get: function get() {
	      return [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26, 0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0, 0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23, 0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1, 0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0, 0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2, 0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce, 0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc, 0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54, 0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73, 0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff, 0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41, 0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6, 0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09, 0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16, 0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00];
	    }

	    /**
	     * Returns the Galois field log table.
	     *
	     * @return {number[]} The Galois field log table.
	     * @public
	     * @static
	     */

	  }, {
	    key: "LOG",
	    get: function get() {
	      return [0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b, 0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71, 0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45, 0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6, 0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88, 0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40, 0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d, 0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57, 0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18, 0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e, 0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61, 0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2, 0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6, 0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a, 0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7, 0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf];
	    }
	  }]);

	  return Galois;
	}();

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * Contains version pattern information.
	 *
	 * @public
	 */
	var Version = function () {
	  function Version() {
	    _classCallCheck(this, Version);
	  }

	  _createClass(Version, null, [{
	    key: "BLOCK",


	    /**
	     * Returns the version pattern block.
	     *
	     * @return {number[]} The version pattern block.
	     * @public
	     * @static
	     */
	    get: function get() {
	      return [0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d, 0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9, 0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75, 0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64, 0x541, 0xc69];
	    }
	  }]);

	  return Version;
	}();

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * Generates information for a QR code frame based on a specific value to be encoded.
	 *
	 * @public
	 */

	var Frame = function () {
	  _createClass(Frame, null, [{
	    key: '_createArray',
	    value: function _createArray(length) {
	      var array = [];

	      for (var i = 0; i < length; i++) {
	        array[i] = 0;
	      }

	      return array;
	    }
	  }, {
	    key: '_getMaskBit',
	    value: function _getMaskBit(x, y) {
	      var bit = void 0;

	      if (x > y) {
	        bit = x;
	        x = y;
	        y = bit;
	      }

	      bit = y;
	      bit += y * y;
	      bit >>= 1;
	      bit += x;

	      return bit;
	    }
	  }, {
	    key: '_modN',
	    value: function _modN(x) {
	      while (x >= 255) {
	        x -= 255;
	        x = (x >> 8) + (x & 255);
	      }

	      return x;
	    }

	    // *Badness* coefficients.

	  }, {
	    key: 'N1',
	    get: function get() {
	      return 3;
	    }
	  }, {
	    key: 'N2',
	    get: function get() {
	      return 3;
	    }
	  }, {
	    key: 'N3',
	    get: function get() {
	      return 40;
	    }
	  }, {
	    key: 'N4',
	    get: function get() {
	      return 10;
	    }

	    /**
	     * Creates an instance of {@link Frame} based on the <code>options</code> provided.
	     *
	     * @param {Frame~Options} options - the options to be used
	     * @public
	     */

	  }]);

	  function Frame(options) {
	    _classCallCheck(this, Frame);

	    this._badness = [];
	    this._level = ErrorCorrection.LEVELS[options.level];
	    this._polynomial = [];
	    this._value = options.value;
	    this._valueLength = this._value.length;
	    this._version = 0;
	    this._stringBuffer = [];

	    var dataBlock = void 0;
	    var eccBlock = void 0;
	    var neccBlock1 = void 0;
	    var neccBlock2 = void 0;

	    while (this._version < 40) {
	      this._version++;

	      var index = (this._level - 1) * 4 + (this._version - 1) * 16;

	      neccBlock1 = ErrorCorrection.BLOCKS[index++];
	      neccBlock2 = ErrorCorrection.BLOCKS[index++];
	      dataBlock = ErrorCorrection.BLOCKS[index++];
	      eccBlock = ErrorCorrection.BLOCKS[index];

	      index = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 + (this._version <= 9);

	      if (this._valueLength <= index) {
	        break;
	      }
	    }

	    this._dataBlock = dataBlock;
	    this._eccBlock = eccBlock;
	    this._neccBlock1 = neccBlock1;
	    this._neccBlock2 = neccBlock2;

	    /**
	     * The data width is based on version.
	     *
	     * @public
	     * @type {number}
	     */
	    // FIXME: Ensure that it fits instead of being truncated.
	    this.width = 17 + 4 * this._version;

	    /**
	     * The image buffer.
	     *
	     * @public
	     * @type {number[]}
	     */
	    this.buffer = Frame._createArray(this.width * this.width);

	    this._ecc = Frame._createArray(this._dataBlock + (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2);
	    this._mask = Frame._createArray((this.width * (this.width + 1) + 1) / 2);

	    this._insertFinders();
	    this._insertAlignments();

	    // Insert single foreground cell.
	    this.buffer[8 + this.width * (this.width - 8)] = 1;

	    this._insertTimingGap();
	    this._reverseMask();
	    this._insertTimingRowAndColumn();
	    this._insertVersion();
	    this._syncMask();
	    this._convertBitStream(this._value.length);
	    this._calculatePolynomial();
	    this._appendEccToData();
	    this._interleaveBlocks();
	    this._pack();
	    this._finish();
	  }

	  _createClass(Frame, [{
	    key: '_addAlignment',
	    value: function _addAlignment(x, y) {
	      this.buffer[x + this.width * y] = 1;

	      for (var i = -2; i < 2; i++) {
	        this.buffer[x + i + this.width * (y - 2)] = 1;
	        this.buffer[x - 2 + this.width * (y + i + 1)] = 1;
	        this.buffer[x + 2 + this.width * (y + i)] = 1;
	        this.buffer[x + i + 1 + this.width * (y + 2)] = 1;
	      }

	      for (var _i = 0; _i < 2; _i++) {
	        this._setMask(x - 1, y + _i);
	        this._setMask(x + 1, y - _i);
	        this._setMask(x - _i, y - 1);
	        this._setMask(x + _i, y + 1);
	      }
	    }
	  }, {
	    key: '_appendData',
	    value: function _appendData(data, dataLength, ecc, eccLength) {
	      for (var i = 0; i < eccLength; i++) {
	        this._stringBuffer[ecc + i] = 0;
	      }

	      for (var _i2 = 0; _i2 < dataLength; _i2++) {
	        var bit = Galois.LOG[this._stringBuffer[data + _i2] ^ this._stringBuffer[ecc]];

	        if (bit !== 255) {
	          for (var j = 1; j < eccLength; j++) {
	            this._stringBuffer[ecc + j - 1] = this._stringBuffer[ecc + j] ^ Galois.EXPONENT[Frame._modN(bit + this._polynomial[eccLength - j])];
	          }
	        } else {
	          for (var _j = ecc; _j < ecc + eccLength; _j++) {
	            this._stringBuffer[_j] = this._stringBuffer[_j + 1];
	          }
	        }

	        this._stringBuffer[ecc + eccLength - 1] = bit === 255 ? 0 : Galois.EXPONENT[Frame._modN(bit + this._polynomial[0])];
	      }
	    }
	  }, {
	    key: '_appendEccToData',
	    value: function _appendEccToData() {
	      var data = 0;
	      var ecc = this._calculateMaxLength();

	      for (var i = 0; i < this._neccBlock1; i++) {
	        this._appendData(data, this._dataBlock, ecc, this._eccBlock);

	        data += this._dataBlock;
	        ecc += this._eccBlock;
	      }

	      for (var _i3 = 0; _i3 < this._neccBlock2; _i3++) {
	        this._appendData(data, this._dataBlock + 1, ecc, this._eccBlock);

	        data += this._dataBlock + 1;
	        ecc += this._eccBlock;
	      }
	    }
	  }, {
	    key: '_applyMask',
	    value: function _applyMask(mask) {
	      var width = this.width;

	      switch (mask) {
	        case 0:
	          for (var y = 0; y < width; y++) {
	            for (var x = 0; x < width; x++) {
	              if (!(x + y & 1) && !this._isMasked(x, y)) {
	                this.buffer[x + y * width] ^= 1;
	              }
	            }
	          }

	          break;
	        case 1:
	          for (var _y = 0; _y < width; _y++) {
	            for (var _x = 0; _x < width; _x++) {
	              if (!(_y & 1) && !this._isMasked(_x, _y)) {
	                this.buffer[_x + _y * width] ^= 1;
	              }
	            }
	          }

	          break;
	        case 2:
	          for (var _y2 = 0; _y2 < width; _y2++) {
	            for (var r3x = 0, _x2 = 0; _x2 < width; _x2++, r3x++) {
	              if (r3x === 3) {
	                r3x = 0;
	              }

	              if (!r3x && !this._isMasked(_x2, _y2)) {
	                this.buffer[_x2 + _y2 * width] ^= 1;
	              }
	            }
	          }

	          break;
	        case 3:
	          for (var r3y = 0, _y3 = 0; _y3 < width; _y3++, r3y++) {
	            if (r3y === 3) {
	              r3y = 0;
	            }

	            for (var _r3x = r3y, _x3 = 0; _x3 < width; _x3++, _r3x++) {
	              if (_r3x === 3) {
	                _r3x = 0;
	              }

	              if (!_r3x && !this._isMasked(_x3, _y3)) {
	                this.buffer[_x3 + _y3 * width] ^= 1;
	              }
	            }
	          }

	          break;
	        case 4:
	          for (var _y4 = 0; _y4 < width; _y4++) {
	            for (var _r3x2 = 0, _r3y = _y4 >> 1 & 1, _x4 = 0; _x4 < width; _x4++, _r3x2++) {
	              if (_r3x2 === 3) {
	                _r3x2 = 0;
	                _r3y = !_r3y;
	              }

	              if (!_r3y && !this._isMasked(_x4, _y4)) {
	                this.buffer[_x4 + _y4 * width] ^= 1;
	              }
	            }
	          }

	          break;
	        case 5:
	          for (var _r3y2 = 0, _y5 = 0; _y5 < width; _y5++, _r3y2++) {
	            if (_r3y2 === 3) {
	              _r3y2 = 0;
	            }

	            for (var _r3x3 = 0, _x5 = 0; _x5 < width; _x5++, _r3x3++) {
	              if (_r3x3 === 3) {
	                _r3x3 = 0;
	              }

	              if (!((_x5 & _y5 & 1) + !(!_r3x3 | !_r3y2)) && !this._isMasked(_x5, _y5)) {
	                this.buffer[_x5 + _y5 * width] ^= 1;
	              }
	            }
	          }

	          break;
	        case 6:
	          for (var _r3y3 = 0, _y6 = 0; _y6 < width; _y6++, _r3y3++) {
	            if (_r3y3 === 3) {
	              _r3y3 = 0;
	            }

	            for (var _r3x4 = 0, _x6 = 0; _x6 < width; _x6++, _r3x4++) {
	              if (_r3x4 === 3) {
	                _r3x4 = 0;
	              }

	              if (!((_x6 & _y6 & 1) + (_r3x4 && _r3x4 === _r3y3) & 1) && !this._isMasked(_x6, _y6)) {
	                this.buffer[_x6 + _y6 * width] ^= 1;
	              }
	            }
	          }

	          break;
	        case 7:
	          for (var _r3y4 = 0, _y7 = 0; _y7 < width; _y7++, _r3y4++) {
	            if (_r3y4 === 3) {
	              _r3y4 = 0;
	            }

	            for (var _r3x5 = 0, _x7 = 0; _x7 < width; _x7++, _r3x5++) {
	              if (_r3x5 === 3) {
	                _r3x5 = 0;
	              }

	              if (!((_r3x5 && _r3x5 === _r3y4) + (_x7 + _y7 & 1) & 1) && !this._isMasked(_x7, _y7)) {
	                this.buffer[_x7 + _y7 * width] ^= 1;
	              }
	            }
	          }

	          break;
	      }
	    }
	  }, {
	    key: '_calculateMaxLength',
	    value: function _calculateMaxLength() {
	      return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
	    }
	  }, {
	    key: '_calculatePolynomial',
	    value: function _calculatePolynomial() {
	      this._polynomial[0] = 1;

	      for (var i = 0; i < this._eccBlock; i++) {
	        this._polynomial[i + 1] = 1;

	        for (var j = i; j > 0; j--) {
	          this._polynomial[j] = this._polynomial[j] ? this._polynomial[j - 1] ^ Galois.EXPONENT[Frame._modN(Galois.LOG[this._polynomial[j]] + i)] : this._polynomial[j - 1];
	        }

	        this._polynomial[0] = Galois.EXPONENT[Frame._modN(Galois.LOG[this._polynomial[0]] + i)];
	      }

	      // Use logs for generator polynomial to save calculation step.
	      for (var _i4 = 0; _i4 <= this._eccBlock; _i4++) {
	        this._polynomial[_i4] = Galois.LOG[this._polynomial[_i4]];
	      }
	    }
	  }, {
	    key: '_checkBadness',
	    value: function _checkBadness() {
	      var bad = 0;
	      var width = this.width;

	      // Blocks of same colour.
	      for (var y = 0; y < width - 1; y++) {
	        for (var x = 0; x < width - 1; x++) {
	          // All foreground colour.
	          if (this.buffer[x + width * y] && this.buffer[x + 1 + width * y] && this.buffer[x + width * (y + 1)] && this.buffer[x + 1 + width * (y + 1)] ||
	          // All background colour.
	          !(this.buffer[x + width * y] || this.buffer[x + 1 + width * y] || this.buffer[x + width * (y + 1)] || this.buffer[x + 1 + width * (y + 1)])) {
	            bad += Frame.N2;
	          }
	        }
	      }

	      var bw = 0;

	      // X runs.
	      for (var _y8 = 0; _y8 < width; _y8++) {
	        var h = 0;

	        this._badness[0] = 0;

	        for (var b = 0, _x8 = 0; _x8 < width; _x8++) {
	          var b1 = this.buffer[_x8 + width * _y8];

	          if (b === b1) {
	            this._badness[h]++;
	          } else {
	            this._badness[++h] = 1;
	          }

	          b = b1;
	          bw += b ? 1 : -1;
	        }

	        bad += this._getBadness(h);
	      }

	      if (bw < 0) {
	        bw = -bw;
	      }

	      var count = 0;
	      var big = bw;
	      big += big << 2;
	      big <<= 1;

	      while (big > width * width) {
	        big -= width * width;
	        count++;
	      }

	      bad += count * Frame.N4;

	      // Y runs.
	      for (var _x9 = 0; _x9 < width; _x9++) {
	        var _h = 0;

	        this._badness[0] = 0;

	        for (var _b = 0, _y9 = 0; _y9 < width; _y9++) {
	          var _b2 = this.buffer[_x9 + width * _y9];

	          if (_b === _b2) {
	            this._badness[_h]++;
	          } else {
	            this._badness[++_h] = 1;
	          }

	          _b = _b2;
	        }

	        bad += this._getBadness(_h);
	      }

	      return bad;
	    }
	  }, {
	    key: '_convertBitStream',
	    value: function _convertBitStream(length) {
	      // Convert string to bit stream. 8-bit data to QR-coded 8-bit data (numeric, alphanumeric, or kanji not supported).
	      for (var i = 0; i < length; i++) {
	        this._ecc[i] = this._value.charCodeAt(i);
	      }

	      this._stringBuffer = this._ecc.slice(0);

	      var maxLength = this._calculateMaxLength();

	      if (length >= maxLength - 2) {
	        length = maxLength - 2;

	        if (this._version > 9) {
	          length--;
	        }
	      }

	      // Shift and re-pack to insert length prefix.
	      var index = length;

	      if (this._version > 9) {
	        this._stringBuffer[index + 2] = 0;
	        this._stringBuffer[index + 3] = 0;

	        while (index--) {
	          var bit = this._stringBuffer[index];

	          this._stringBuffer[index + 3] |= 255 & bit << 4;
	          this._stringBuffer[index + 2] = bit >> 4;
	        }

	        this._stringBuffer[2] |= 255 & length << 4;
	        this._stringBuffer[1] = length >> 4;
	        this._stringBuffer[0] = 0x40 | length >> 12;
	      } else {
	        this._stringBuffer[index + 1] = 0;
	        this._stringBuffer[index + 2] = 0;

	        while (index--) {
	          var _bit = this._stringBuffer[index];

	          this._stringBuffer[index + 2] |= 255 & _bit << 4;
	          this._stringBuffer[index + 1] = _bit >> 4;
	        }

	        this._stringBuffer[1] |= 255 & length << 4;
	        this._stringBuffer[0] = 0x40 | length >> 4;
	      }

	      // Fill to end with pad pattern.
	      index = length + 3 - (this._version < 10);

	      while (index < maxLength) {
	        this._stringBuffer[index++] = 0xec;
	        this._stringBuffer[index++] = 0x11;
	      }
	    }
	  }, {
	    key: '_getBadness',
	    value: function _getBadness(length) {
	      var badRuns = 0;

	      for (var i = 0; i <= length; i++) {
	        if (this._badness[i] >= 5) {
	          badRuns += Frame.N1 + this._badness[i] - 5;
	        }
	      }

	      // FBFFFBF as in finder.
	      for (var _i5 = 3; _i5 < length - 1; _i5 += 2) {
	        if (this._badness[_i5 - 2] === this._badness[_i5 + 2] && this._badness[_i5 + 2] === this._badness[_i5 - 1] && this._badness[_i5 - 1] === this._badness[_i5 + 1] && this._badness[_i5 - 1] * 3 === this._badness[_i5] && (
	        // Background around the foreground pattern? Not part of the specs.
	        this._badness[_i5 - 3] === 0 || _i5 + 3 > length || this._badness[_i5 - 3] * 3 >= this._badness[_i5] * 4 || this._badness[_i5 + 3] * 3 >= this._badness[_i5] * 4)) {
	          badRuns += Frame.N3;
	        }
	      }

	      return badRuns;
	    }
	  }, {
	    key: '_finish',
	    value: function _finish() {
	      // Save pre-mask copy of frame.
	      this._stringBuffer = this.buffer.slice(0);

	      var bit = 0;
	      var i = void 0;
	      var mask = 30000;

	      /*
	       * Using for instead of while since in original Arduino code if an early mask was "good enough" it wouldn't try for
	       * a better one since they get more complex and take longer.
	       */
	      for (i = 0; i < 8; i++) {
	        // Returns foreground-background imbalance.
	        this._applyMask(i);

	        var currentMask = this._checkBadness();

	        // Is current mask better than previous best?
	        if (currentMask < mask) {
	          mask = currentMask;
	          bit = i;
	        }

	        // Don't increment "i" to a void redoing mask.
	        if (bit === 7) {
	          break;
	        }

	        // Reset for next pass.
	        this.buffer = this._stringBuffer.slice(0);
	      }

	      // Redo best mask as none were "good enough" (i.e. last wasn't bit).
	      if (bit !== i) {
	        this._applyMask(bit);
	      }

	      // Add in final mask/ECC level bytes.
	      mask = ErrorCorrection.FINAL_FORMAT[bit + (this._level - 1 << 3)];

	      // Low byte.
	      for (i = 0; i < 8; i++, mask >>= 1) {
	        if (mask & 1) {
	          this.buffer[this.width - 1 - i + this.width * 8] = 1;

	          if (i < 6) {
	            this.buffer[8 + this.width * i] = 1;
	          } else {
	            this.buffer[8 + this.width * (i + 1)] = 1;
	          }
	        }
	      }

	      // High byte.
	      for (i = 0; i < 7; i++, mask >>= 1) {
	        if (mask & 1) {
	          this.buffer[8 + this.width * (this.width - 7 + i)] = 1;

	          if (i) {
	            this.buffer[6 - i + this.width * 8] = 1;
	          } else {
	            this.buffer[7 + this.width * 8] = 1;
	          }
	        }
	      }
	    }
	  }, {
	    key: '_interleaveBlocks',
	    value: function _interleaveBlocks() {
	      var maxLength = this._calculateMaxLength();
	      var i = void 0;
	      var k = 0;

	      for (i = 0; i < this._dataBlock; i++) {
	        for (var j = 0; j < this._neccBlock1; j++) {
	          this._ecc[k++] = this._stringBuffer[i + j * this._dataBlock];
	        }

	        for (var _j2 = 0; _j2 < this._neccBlock2; _j2++) {
	          this._ecc[k++] = this._stringBuffer[this._neccBlock1 * this._dataBlock + i + _j2 * (this._dataBlock + 1)];
	        }
	      }

	      for (var _j3 = 0; _j3 < this._neccBlock2; _j3++) {
	        this._ecc[k++] = this._stringBuffer[this._neccBlock1 * this._dataBlock + i + _j3 * (this._dataBlock + 1)];
	      }

	      for (i = 0; i < this._eccBlock; i++) {
	        for (var _j4 = 0; _j4 < this._neccBlock1 + this._neccBlock2; _j4++) {
	          this._ecc[k++] = this._stringBuffer[maxLength + i + _j4 * this._eccBlock];
	        }
	      }

	      this._stringBuffer = this._ecc;
	    }
	  }, {
	    key: '_insertAlignments',
	    value: function _insertAlignments() {
	      var width = this.width;

	      if (this._version > 1) {
	        var i = Alignment.BLOCK[this._version];
	        var y = width - 7;

	        for (;;) {
	          var x = width - 7;

	          while (x > i - 3) {
	            this._addAlignment(x, y);

	            if (x < i) {
	              break;
	            }

	            x -= i;
	          }

	          if (y <= i + 9) {
	            break;
	          }

	          y -= i;

	          this._addAlignment(6, y);
	          this._addAlignment(y, 6);
	        }
	      }
	    }
	  }, {
	    key: '_insertFinders',
	    value: function _insertFinders() {
	      var width = this.width;

	      for (var i = 0; i < 3; i++) {
	        var j = 0;
	        var y = 0;

	        if (i === 1) {
	          j = width - 7;
	        }
	        if (i === 2) {
	          y = width - 7;
	        }

	        this.buffer[y + 3 + width * (j + 3)] = 1;

	        for (var x = 0; x < 6; x++) {
	          this.buffer[y + x + width * j] = 1;
	          this.buffer[y + width * (j + x + 1)] = 1;
	          this.buffer[y + 6 + width * (j + x)] = 1;
	          this.buffer[y + x + 1 + width * (j + 6)] = 1;
	        }

	        for (var _x10 = 1; _x10 < 5; _x10++) {
	          this._setMask(y + _x10, j + 1);
	          this._setMask(y + 1, j + _x10 + 1);
	          this._setMask(y + 5, j + _x10);
	          this._setMask(y + _x10 + 1, j + 5);
	        }

	        for (var _x11 = 2; _x11 < 4; _x11++) {
	          this.buffer[y + _x11 + width * (j + 2)] = 1;
	          this.buffer[y + 2 + width * (j + _x11 + 1)] = 1;
	          this.buffer[y + 4 + width * (j + _x11)] = 1;
	          this.buffer[y + _x11 + 1 + width * (j + 4)] = 1;
	        }
	      }
	    }
	  }, {
	    key: '_insertTimingGap',
	    value: function _insertTimingGap() {
	      var width = this.width;

	      for (var y = 0; y < 7; y++) {
	        this._setMask(7, y);
	        this._setMask(width - 8, y);
	        this._setMask(7, y + width - 7);
	      }

	      for (var x = 0; x < 8; x++) {
	        this._setMask(x, 7);
	        this._setMask(x + width - 8, 7);
	        this._setMask(x, width - 8);
	      }
	    }
	  }, {
	    key: '_insertTimingRowAndColumn',
	    value: function _insertTimingRowAndColumn() {
	      var width = this.width;

	      for (var x = 0; x < width - 14; x++) {
	        if (x & 1) {
	          this._setMask(8 + x, 6);
	          this._setMask(6, 8 + x);
	        } else {
	          this.buffer[8 + x + width * 6] = 1;
	          this.buffer[6 + width * (8 + x)] = 1;
	        }
	      }
	    }
	  }, {
	    key: '_insertVersion',
	    value: function _insertVersion() {
	      var width = this.width;

	      if (this._version > 6) {
	        var i = Version.BLOCK[this._version - 7];
	        var j = 17;

	        for (var x = 0; x < 6; x++) {
	          for (var y = 0; y < 3; y++, j--) {
	            if (1 & (j > 11 ? this._version >> j - 12 : i >> j)) {
	              this.buffer[5 - x + width * (2 - y + width - 11)] = 1;
	              this.buffer[2 - y + width - 11 + width * (5 - x)] = 1;
	            } else {
	              this._setMask(5 - x, 2 - y + width - 11);
	              this._setMask(2 - y + width - 11, 5 - x);
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: '_isMasked',
	    value: function _isMasked(x, y) {
	      var bit = Frame._getMaskBit(x, y);

	      return this._mask[bit] === 1;
	    }
	  }, {
	    key: '_pack',
	    value: function _pack() {
	      var x = this.width - 1;
	      var y = this.width - 1;
	      var k = 1;
	      var v = 1;

	      // Interleaved data and ECC codes.
	      var length = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;

	      for (var i = 0; i < length; i++) {
	        var bit = this._stringBuffer[i];

	        for (var j = 0; j < 8; j++, bit <<= 1) {
	          if (0x80 & bit) {
	            this.buffer[x + this.width * y] = 1;
	          }

	          // Find next fill position.
	          do {
	            if (v) {
	              x--;
	            } else {
	              x++;

	              if (k) {
	                if (y !== 0) {
	                  y--;
	                } else {
	                  x -= 2;
	                  k = !k;

	                  if (x === 6) {
	                    x--;
	                    y = 9;
	                  }
	                }
	              } else if (y !== this.width - 1) {
	                y++;
	              } else {
	                x -= 2;
	                k = !k;

	                if (x === 6) {
	                  x--;
	                  y -= 8;
	                }
	              }
	            }

	            v = !v;
	          } while (this._isMasked(x, y));
	        }
	      }
	    }
	  }, {
	    key: '_reverseMask',
	    value: function _reverseMask() {
	      var width = this.width;

	      for (var x = 0; x < 9; x++) {
	        this._setMask(x, 8);
	      }

	      for (var _x12 = 0; _x12 < 8; _x12++) {
	        this._setMask(_x12 + width - 8, 8);
	        this._setMask(8, _x12);
	      }

	      for (var y = 0; y < 7; y++) {
	        this._setMask(8, y + width - 7);
	      }
	    }
	  }, {
	    key: '_setMask',
	    value: function _setMask(x, y) {
	      var bit = Frame._getMaskBit(x, y);

	      this._mask[bit] = 1;
	    }
	  }, {
	    key: '_syncMask',
	    value: function _syncMask() {
	      var width = this.width;

	      for (var y = 0; y < width; y++) {
	        for (var x = 0; x <= y; x++) {
	          if (this.buffer[x + width * y]) {
	            this._setMask(x, y);
	          }
	        }
	      }
	    }
	  }]);

	  return Frame;
	}();



	/**
	 * The options used by {@link Frame}.
	 *
	 * @typedef {Object} Frame~Options
	 * @property {string} level - The ECC level to be used.
	 * @property {string} value - The value to be encoded.
	 */

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * An implementation of {@link Renderer} for working with <code>img</code> elements.
	 *
	 * This depends on {@link CanvasRenderer} being executed first as this implementation simply applies the data URL from
	 * the rendered <code>canvas</code> element as the <code>src</code> for the <code>img</code> element being rendered.
	 *
	 * @public
	 * @extends Renderer
	 */

	var ImageRenderer = function (_Renderer) {
	  _inherits(ImageRenderer, _Renderer);

	  function ImageRenderer() {
	    _classCallCheck(this, ImageRenderer);

	    return _possibleConstructorReturn(this, (ImageRenderer.__proto__ || _Object$getPrototypeOf(ImageRenderer)).apply(this, arguments));
	  }

	  _createClass(ImageRenderer, [{
	    key: 'draw',


	    /**
	     * @override
	     */
	    value: function draw() {
	      var qrious = this.qrious;

	      qrious.image.src = qrious.toDataURL();
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'reset',
	    value: function reset() {
	      var qrious = this.qrious;

	      qrious.image.src = '';
	    }

	    /**
	     * @override
	     */

	  }, {
	    key: 'resize',
	    value: function resize() {
	      var qrious = this.qrious;
	      var image = qrious.image;

	      image.width = qrious.size;
	      image.height = qrious.size;
	    }
	  }]);

	  return ImageRenderer;
	}(Renderer);

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * A basic manager for {@link Service} implementations that are mapped to simple names.
	 *
	 * @public
	 */
	var ServiceManager = function () {

	  /**
	   * Creates a new instance of {@link ServiceManager}.
	   *
	   * @public
	   */
	  function ServiceManager() {
	    _classCallCheck(this, ServiceManager);

	    this._services = {};
	  }

	  /**
	   * Returns the {@link Service} being managed with the specified <code>name</code>.
	   *
	   * @param {string} name - the name of the {@link Service} to be returned
	   * @return {Service} The {@link Service} is being managed with <code>name</code>.
	   * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
	   * @public
	   */


	  _createClass(ServiceManager, [{
	    key: "getService",
	    value: function getService(name) {
	      var service = this._services[name];
	      if (!service) {
	        throw new Error("Service is not being managed with name: " + name);
	      }

	      return service;
	    }

	    /**
	     * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
	     * <code>service</code> provided.
	     *
	     * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
	     * @param {Service} service - the {@link Service} implementation to be managed
	     * @return {void}
	     * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
	     * @public
	     */

	  }, {
	    key: "setService",
	    value: function setService(name, service) {
	      if (this._services[name]) {
	        throw new Error("Service is already managed with name: " + name);
	      }

	      if (service) {
	        this._services[name] = service;
	      }
	    }
	  }]);

	  return ServiceManager;
	}();

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	/**
	 * Enables configuration of a QR code generator which uses HTML5 <code>canvas</code> for rendering.
	 *
	 * @public
	 */

	var QRious$1 = function () {
	  _createClass(QRious, null, [{
	    key: 'use',


	    /**
	     * Configures the <code>service</code> provided to be used by all {@link QRious} instances.
	     *
	     * @param {Service} service - the {@link Service} to be configured
	     * @return {void}
	     * @throws {Error} If a {@link Service} has already been configured with the same name.
	     * @public
	     * @static
	     */
	    value: function use(service) {
	      QRious._serviceManager.setService(service.getName(), service);
	    }
	  }, {
	    key: '_parseOptions',
	    value: function _parseOptions(options) {
	      options = _Object$assign({}, QRious.DEFAULTS, options);
	      options.backgroundAlpha = Utilities.abs(options.backgroundAlpha);
	      options.foregroundAlpha = Utilities.abs(options.foregroundAlpha);
	      options.level = Utilities.toUpperCase(options.level);
	      options.padding = Utilities.abs(options.padding);
	      options.size = Utilities.abs(options.size);

	      return options;
	    }

	    /**
	     * Creates a new instance of {@link QRious} based on the <code>options</code> provided.
	     *
	     * @param {QRious~Options} [options] - the options to be used
	     * @public
	     */

	  }, {
	    key: 'DEFAULTS',


	    /**
	     * Returns the default options for {@link QRious}.
	     *
	     * @return {QRious~Options} The default options.
	     * @public
	     * @static
	     */
	    get: function get() {
	      return {
	        background: 'white',
	        backgroundAlpha: 1,
	        foreground: 'black',
	        foregroundAlpha: 1,
	        level: 'L',
	        mime: 'image/png',
	        padding: null,
	        size: 100,
	        value: ''
	      };
	    }

	    /**
	     * Returns the current version of {@link QRious}.
	     *
	     * @return {string} The current version.
	     * @public
	     * @static
	     */

	  }, {
	    key: 'VERSION',
	    get: function get() {
	      return '2.2.0';
	    }
	  }]);

	  function QRious(options) {
	    _classCallCheck(this, QRious);

	    options = QRious._parseOptions(options);

	    Utilities.privatize(this, options);

	    var element = this._element;
	    var elementService = QRious._serviceManager.getService('element');

	    /**
	     * The <code>canvas</code> being used to render the QR code for this {@link QRious}.
	     *
	     * @public
	     * @type {*}
	     */
	    this.canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
	    this.canvas.qrious = this;

	    /**
	     * The <code>img</code> to contain the rendered QR code for this {@link QRious}.
	     *
	     * @public
	     * @type {*}
	     */
	    this.image = element && elementService.isImage(element) ? element : elementService.createImage();
	    this.image.qrious = this;

	    this._renderers = [new CanvasRenderer(this), new ImageRenderer(this)];

	    this.update();
	  }

	  /**
	   * Returns the image data URI for the generated QR code using the <code>mime</code> provided.
	   *
	   * @param {string} [mime] - the MIME type for the image
	   * @return {string} The image data URI for the QR code.
	   * @public
	   */


	  _createClass(QRious, [{
	    key: 'toDataURL',
	    value: function toDataURL(mime) {
	      return this.canvas.toDataURL(mime || this.mime);
	    }

	    /**
	     * Updates this {@link QRious} by generating a new {@link Frame} and re-rendering the QR code.
	     *
	     * @return {void}
	     * @protected
	     */

	  }, {
	    key: 'update',
	    value: function update() {
	      var frame = new Frame({
	        level: this.level,
	        value: this.value
	      });

	      this._renderers.forEach(function (renderer) {
	        return renderer.render(frame);
	      });
	    }

	    /**
	     * Returns the background color for the QR code.
	     *
	     * @return {string} The background color.
	     * @public
	     */

	  }, {
	    key: 'background',
	    get: function get() {
	      return this._background;
	    }

	    /**
	     * Sets the background color for the QR code to <code>background</code>.
	     *
	     * @param {string} [background="white"] - the background color to be set
	     * @public
	     */
	    ,
	    set: function set(background) {
	      var changed = Utilities.setter(this, '_background', background, QRious.DEFAULTS.background);

	      if (changed) {
	        this.update();
	      }
	    }

	    /**
	     * Returns the background alpha for the QR code.
	     *
	     * @return {number} The background alpha.
	     * @public
	     */

	  }, {
	    key: 'backgroundAlpha',
	    get: function get() {
	      return this._backgroundAlpha;
	    }

	    /**
	     * Sets the background alpha for the QR code to <code>backgroundAlpha</code>.
	     *
	     * @param {number} [backgroundAlpha=1] - the background alpha to be set
	     * @public
	     */
	    ,
	    set: function set(backgroundAlpha) {
	      var changed = Utilities.setter(this, '_backgroundAlpha', backgroundAlpha, QRious.DEFAULTS.backgroundAlpha);

	      if (changed) {
	        this.update();
	      }
	    }

	    /**
	     * Returns the foreground color for the QR code.
	     *
	     * @return {string} The foreground color.
	     * @public
	     */

	  }, {
	    key: 'foreground',
	    get: function get() {
	      return this._foreground;
	    }

	    /**
	     * Sets the foreground color for the QR code to <code>foreground</code>.
	     *
	     * @param {string} [foreground="black"] - the foreground color to be set
	     * @public
	     */
	    ,
	    set: function set(foreground) {
	      var changed = Utilities.setter(this, '_foreground', foreground, QRious.DEFAULTS.foreground);

	      if (changed) {
	        this.update();
	      }
	    }

	    /**
	     * Returns the foreground alpha for the QR code.
	     *
	     * @return {number} The foreground alpha.
	     * @public
	     */

	  }, {
	    key: 'foregroundAlpha',
	    get: function get() {
	      return this._foregroundAlpha;
	    }

	    /**
	     * Sets the foreground alpha for the QR code to <code>foregroundAlpha</code>.
	     *
	     * @param {number} [foregroundAlpha=1] - the foreground alpha to be set
	     * @public
	     */
	    ,
	    set: function set(foregroundAlpha) {
	      var changed = Utilities.setter(this, '_foregroundAlpha', foregroundAlpha, QRious.DEFAULTS.foregroundAlpha);

	      if (changed) {
	        this.update();
	      }
	    }

	    /**
	     * Returns the error correction level for the QR code.
	     *
	     * @return {string} The ECC level.
	     * @public
	     */

	  }, {
	    key: 'level',
	    get: function get() {
	      return this._level;
	    }

	    /**
	     * Sets the error correction level for the QR code to <code>level</code>.
	     *
	     * <code>level</code> will be transformed to upper case to aid mapping to known ECC level blocks.
	     *
	     * @param {string} [level="L"] - the ECC level to be set
	     * @public
	     */
	    ,
	    set: function set(level) {
	      var changed = Utilities.setter(this, '_level', level, QRious.DEFAULTS.level, Utilities.toUpperCase);

	      if (changed) {
	        this.update();
	      }
	    }

	    /**
	     * Returns the MIME type for the image rendered for the QR code.
	     *
	     * @return {string} The image MIME type.
	     * @public
	     */

	  }, {
	    key: 'mime',
	    get: function get() {
	      return this._mime;
	    }

	    /**
	     * Sets the MIME type for the image rendered for the QR code to <code>mime</code>.
	     *
	     * @param {string} [mime="image/png"] - the image MIME type to be set
	     * @public
	     */
	    ,
	    set: function set(mime) {
	      var changed = Utilities.setter(this, '_mime', mime, QRious.DEFAULTS.mime);

	      if (changed) {
	        this.update();
	      }
	    }

	    /**
	     * Returns the padding for the QR code.
	     *
	     * @return {number} The padding in pixels.
	     * @public
	     */

	  }, {
	    key: 'padding',
	    get: function get() {
	      return this._padding;
	    }

	    /**
	     * Sets the padding for the QR code to <code>padding</code>.
	     *
	     * <code>padding</code> will be transformed to ensure that it is always an absolute positive numbers (e.g.
	     * <code>-10</code> would become <code>10</code>).
	     *
	     * @param {number} [padding] - the padding in pixels to be set
	     * @public
	     */
	    ,
	    set: function set(padding) {
	      var changed = Utilities.setter(this, '_padding', padding, QRious.DEFAULTS.padding, Utilities.abs);

	      if (changed) {
	        this.update();
	      }
	    }

	    /**
	     * Returns the size of the QR code.
	     *
	     * @return {number} The size in pixels.
	     * @public
	     */

	  }, {
	    key: 'size',
	    get: function get() {
	      return this._size;
	    }

	    /**
	     * Sets the size of the QR code to <code>size</code>.
	     *
	     * <code>size</code> will be transformed to ensure that it is always an absolute positive numbers (e.g.
	     * <code>-100</code> would become <code>100</code>).
	     *
	     * @param {number} [size=100] - the size in pixels to be set
	     * @public
	     */
	    ,
	    set: function set(size) {
	      var changed = Utilities.setter(this, '_size', size, QRious.DEFAULTS.size, Utilities.abs);

	      if (changed) {
	        this.update();
	      }
	    }

	    /**
	     * Returns the value of the QR code.
	     *
	     * @return {string} The value.
	     * @public
	     */

	  }, {
	    key: 'value',
	    get: function get() {
	      return this._value;
	    }

	    /**
	     * Sets the value of the QR code to <code>value</code>.
	     *
	     * @param {string} [value=""] - the value to be set
	     * @public
	     */
	    ,
	    set: function set(value) {
	      var changed = Utilities.setter(this, '_value', value, QRious.DEFAULTS.value);

	      if (changed) {
	        this.update();
	      }
	    }
	  }]);

	  return QRious;
	}();

	QRious$1._serviceManager = new ServiceManager();



	/**
	 * The options used by {@link QRious}.
	 *
	 * @typedef {Object} QRious~Options
	 * @property {string} [background="white"] - The background color to be applied to the QR code.
	 * @property {number} [backgroundAlpha=1] - The background alpha to be applied to the QR code.
	 * @property {*} [element] - The element to be used to render the QR code which may either be an <code>canvas</code> or
	 * <code>img</code>. The element(s) will be created if needed.
	 * @property {string} [foreground="black"] - The foreground color to be applied to the QR code.
	 * @property {number} [foregroundAlpha=1] - The foreground alpha to be applied to the QR code.
	 * @property {string} [level="L"] - The error correction level to be applied to the QR code.
	 * @property {string} [mime="image/png"] - The MIME type to be used to render the image for the QR code.
	 * @property {number} [padding] - The padding for the QR code in pixels.
	 * @property {number} [size=100] - The size of the QR code in pixels.
	 * @property {string} [value=""] - The value to be encoded within the QR code.
	 */

	/*
	 * QRious
	 * Copyright (C) 2016 Alasdair Mercer
	 * Copyright (C) 2010 Tom Zerucha
	 *
	 * This program is free software: you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation, either version 3 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License
	 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
	 */

	QRious$1.use(new BrowserElementService());

	return QRious$1;

})));

//# sourceMappingURL=qrious.js.map

/***/ })

});
//# sourceMappingURL=2.js.map