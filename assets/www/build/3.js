webpackJsonp([3],{

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_pipes_responsiveDate__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_pipes_maxValue__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_pipes_filenameLimit__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__userImage__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__navigator_navigator__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__load__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__loadingProgress__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__hexagon__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__navigator_hexagon__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__navigator_icon__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_core__ = __webpack_require__(156);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
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

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(54);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: "responsiveDate"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */]])
    ], ResponsiveDatePipe);
    return ResponsiveDatePipe;
}());

//# sourceMappingURL=responsiveDate.js.map

/***/ }),

/***/ 489:
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: "maxValue" })
    ], MaxValuePipe);
    return MaxValuePipe;
}());

//# sourceMappingURL=maxValue.js.map

/***/ }),

/***/ 490:
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: "filenameLimit" })
    ], FilenameLimitPipe);
    return FilenameLimitPipe;
}());

//# sourceMappingURL=filenameLimit.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_services_settings_service__ = __webpack_require__(48);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], UserImageComponent.prototype, "hideBlocked", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], UserImageComponent.prototype, "image", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserImageComponent.prototype, "id", void 0);
    UserImageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "user-image",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/userImage.svg"*/`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 433 500" style="enable-background:new 0 0 433 500;" xml:space="preserve">\n	<defs>\n		<pattern [attr.id]="getId()" patternUnits="userSpaceOnUse" width="500" height="500" x="0" y="0">\n			<svg:image [attr.xlink:href]="image" x="-35.5" y="0" width="500" height="500"/>\n		</pattern>\n	</defs>\n	<path class="border" d="M216.5,0L0,125v250l216.5,125L433,375V125L216.5,0z M417.9,366.3L216.5,482.6L15.1,366.3V133.7L216.5,17.4\n		l201.4,116.3V366.3z"/>\n	<polygon class="content" points="15.1,133.7 216.5,17.4 417.9,133.7 417.9,366.3 216.5,482.6 15.1,366.3" [attr.fill]="getUrl()"/>\n</svg>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/userImage.svg"*/
        }),
        __metadata("design:paramtypes", [])
    ], UserImageComponent);
    return UserImageComponent;
}());

//# sourceMappingURL=userImage.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Navigator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_services_session_service__ = __webpack_require__(19);
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
        this.invoke = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], Navigator.prototype, "icon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], Navigator.prototype, "invoke", void 0);
    Navigator = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "navigator",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/navigator/navigator.html"*/`<div class="navigator" [ngClass]="{\'open\': open, \'plus\': icon === \'plus\', \'arrow\': icon === \'arrow\', \'close\': icon === \'close\' }">\n	<navigator-hexagon></navigator-hexagon>\n	<div class="glasses"></div>\n	<button class="menu-icon" (press)="onPress()" (tap)="onTap()" (touchstart)="onTouchStart($event)" (touchend)="onTouchEnd($event)" (touchmove)="onTouchMove($event)">\n		<navigator-icon [icon]="icon"></navigator-icon>\n		<navigator-icon [icon]="\'close\'" class="secondary"></navigator-icon>\n	</button>\n	<button class="sub-menu profile" (tap)="invokeProfile()">\n		<div class="outline"></div>\n		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n			<g fill="none" fill-rule="evenodd">\n			<circle cx="24" cy="24" r="24" fill="#435259" fill-opacity=".95"/>\n			<path fill="#FFF" d="M24,23.0625 C25.2858137,23.0625 26.3885045,22.6027064 27.3081055,21.6831055 C28.2277064,20.7635045 28.6875,19.6608137 28.6875,18.375 C28.6875,17.0891863 28.2277064,15.9864955 27.3081055,15.0668945 C26.3885045,14.1472936 25.2858137,13.6875 24,13.6875 C22.7141863,13.6875 21.6114955,14.1472936 20.6918945,15.0668945 C19.7722936,15.9864955 19.3125,17.0891863 19.3125,18.375 C19.3125,19.6608137 19.7722936,20.7635045 20.6918945,21.6831055 C21.6114955,22.6027064 22.7141863,23.0625 24,23.0625 Z M24,25.40625 C23.2187461,25.40625 22.291021,25.5039053 21.2167969,25.6992188 C20.1425728,25.8945322 19.1171924,26.187498 18.140625,26.578125 C17.1640576,26.968752 16.3339878,27.4570283 15.6503906,28.0429688 C14.9667935,28.6289092 14.625,29.3124961 14.625,30.09375 L14.625,32.4375 L33.375,32.4375 L33.375,30.09375 C33.375,29.3124961 33.0332065,28.6289092 32.3496094,28.0429688 C31.6660122,27.4570283 30.8359424,26.968752 29.859375,26.578125 C28.8828076,26.187498 27.8574272,25.8945322 26.7832031,25.6992188 C25.708979,25.5039053 24.7812539,25.40625 24,25.40625 Z"/>\n			</g>\n		</svg>\n	</button>\n	<button class="sub-menu contacts" (tap)="invokeContacts()">\n		<div class="outline"></div>\n		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n			<g fill="none" fill-rule="evenodd">\n				<circle cx="24" cy="24" r="24" fill="#435259" fill-opacity=".95"/>\n				<path fill="#FFF" d="M29.09375,21.5 C30.1354219,21.5 31.0312463,21.130212 31.78125,20.390625 C32.5312537,19.651038 32.90625,18.7708384 32.90625,17.75 C32.90625,16.7291616 32.5312537,15.848962 31.78125,15.109375 C31.0312463,14.369788 30.1354219,14 29.09375,14 C28.0520781,14 27.1562537,14.369788 26.40625,15.109375 C25.6562463,15.848962 25.28125,16.7291616 25.28125,17.75 C25.28125,18.7708384 25.6562463,19.651038 26.40625,20.390625 C27.1562537,21.130212 28.0520781,21.5 29.09375,21.5 Z M18.90625,21.5 C19.9479219,21.5 20.8437463,21.130212 21.59375,20.390625 C22.3437537,19.651038 22.71875,18.7708384 22.71875,17.75 C22.71875,16.7291616 22.3437537,15.848962 21.59375,15.109375 C20.8437463,14.369788 19.9479219,14 18.90625,14 C17.8645781,14 16.9687537,14.369788 16.21875,15.109375 C15.4687463,15.848962 15.09375,16.7291616 15.09375,17.75 C15.09375,18.7708384 15.4687463,19.651038 16.21875,20.390625 C16.9687537,21.130212 17.8645781,21.5 18.90625,21.5 Z M18.90625,24.25 C18.1562463,24.25 17.2708384,24.3385408 16.25,24.515625 C15.2291616,24.6927092 14.255213,24.9635398 13.328125,25.328125 C12.401037,25.6927102 11.6145866,26.1510389 10.96875,26.703125 C10.3229134,27.2552111 10,27.8958297 10,28.625 L10,32 L28,32 L28,28.625 C28,27.8958297 27.66667,27.2552111 27,26.703125 C26.33333,26.1510389 25.5260464,25.6927102 24.578125,25.328125 C23.6302036,24.9635398 22.6354219,24.6927092 21.59375,24.515625 C20.5520781,24.3385408 19.6562537,24.25 18.90625,24.25 Z M29.09375,24.9375 C28.9062491,24.9375 28.7343758,24.9427083 28.578125,24.953125 C28.4218742,24.9635417 28.2291678,24.9791666 28,25 C28.7291703,25.5416694 29.2447902,26.0468727 29.546875,26.515625 C29.8489598,26.9843773 30,27.6874953 30,28.625 L30,32 L38,32 L38,28.625 C38,27.8958297 37.6770866,27.2916691 37.03125,26.8125 C36.3854134,26.3333309 35.598963,25.9531264 34.671875,25.671875 C33.744787,25.3906236 32.7708384,25.1979172 31.75,25.09375 C30.7291616,24.9895828 29.8437537,24.9375 29.09375,24.9375 Z"/>\n			</g>\n		</svg>\n	</button>\n	<button class="sub-menu search" (tap)="invokeSearch()">\n		<div class="outline"></div>\n		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n			<g fill="none" fill-rule="evenodd">\n				<circle cx="24" cy="24" r="24" fill="#435259" fill-opacity=".95"/>\n				<path fill="#FFF" d="M28.7753906,27.7753906 L35.25,34.1914062 L33.3164062,36.125 L26.9296875,29.7089844 L26.9296875,28.6542969 L26.5195312,28.3320312 C25.7968714,28.9570344 24.9668016,29.4501935 24.0292969,29.8115234 C23.0917922,30.1728534 22.1054739,30.3535156 21.0703125,30.3535156 C19.917963,30.3535156 18.8388722,30.1337913 17.8330078,29.6943359 C16.8271434,29.2548806 15.9482459,28.6543007 15.1962891,27.8925781 C14.4443322,27.1308556 13.848635,26.2470753 13.4091797,25.2412109 C12.9697244,24.2353465 12.75,23.1464902 12.75,21.9746094 C12.75,20.8222599 12.9697244,19.7382863 13.4091797,18.7226562 C13.848635,17.7070262 14.4394494,16.8232459 15.1816406,16.0712891 C15.9238318,15.3193322 16.7978465,14.723635 17.8037109,14.2841797 C18.8095753,13.8447244 19.8789006,13.625 21.0117188,13.625 C22.1640683,13.625 23.2480418,13.8447244 24.2636719,14.2841797 C25.279302,14.723635 26.1630822,15.3193322 26.9150391,16.0712891 C27.6669959,16.8232459 28.2626931,17.7070262 28.7021484,18.7226562 C29.1416038,19.7382863 29.3613281,20.8222599 29.3613281,21.9746094 C29.3613281,23.0488335 29.1806659,24.0449173 28.8193359,24.9628906 C28.458006,25.880864 27.9746124,26.7109338 27.3691406,27.453125 L27.75,27.7753906 L28.7753906,27.7753906 Z M21.0703125,27.7753906 C21.8710978,27.7753906 22.6230434,27.624025 23.3261719,27.3212891 C24.0293004,27.0185532 24.6445286,26.6035183 25.171875,26.0761719 C25.6992214,25.5488255 26.1093735,24.9335973 26.4023438,24.2304688 C26.695314,23.5273402 26.8417969,22.7753946 26.8417969,21.9746094 C26.8417969,21.1738241 26.695314,20.4218785 26.4023438,19.71875 C26.1093735,19.0156215 25.6992214,18.405276 25.171875,17.8876953 C24.6445286,17.3701146 24.0293004,16.9599625 23.3261719,16.6572266 C22.6230434,16.3544907 21.8710978,16.203125 21.0703125,16.203125 C20.2695272,16.203125 19.5224644,16.3544907 18.8291016,16.6572266 C18.1357387,16.9599625 17.5253933,17.3701146 16.9980469,17.8876953 C16.4707005,18.405276 16.0605483,19.0156215 15.7675781,19.71875 C15.4746079,20.4218785 15.328125,21.1738241 15.328125,21.9746094 C15.328125,22.7753946 15.4746079,23.5273402 15.7675781,24.2304688 C16.0605483,24.9335973 16.4707005,25.5488255 16.9980469,26.0761719 C17.5253933,26.6035183 18.1357387,27.0185532 18.8291016,27.3212891 C19.5224644,27.624025 20.2695272,27.7753906 21.0703125,27.7753906 Z"/>\n			</g>\n		</svg>\n	</button>\n	<button class="sub-menu settings" (tap)="invokeSettings()">\n		<div class="outline"></div>\n		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">\n			<g fill="none" fill-rule="evenodd">\n				<circle cx="24" cy="24" r="24" fill="#435259" fill-opacity=".95"/>\n				<path fill="#FFF" d="M33.0820312,23.875 C33.0820312,24.5781285 33.2822246,25.2031223 33.6826172,25.75 C34.0830098,26.2968777 34.6054655,26.765623 35.25,27.15625 C35.1328119,27.546877 34.9960945,27.9277325 34.8398438,28.2988281 C34.683593,28.6699237 34.5078135,29.0312482 34.3125,29.3828125 C33.5898401,29.187499 32.930667,29.2119128 32.3349609,29.4560547 C31.7392548,29.7001965 31.1875025,30.0664038 30.6796875,30.5546875 C30.1914038,31.0625025 29.8691414,31.6142548 29.7128906,32.2099609 C29.5566398,32.805667 29.5761709,33.4648401 29.7714844,34.1875 C29.4199201,34.3828135 29.0585956,34.558593 28.6875,34.7148438 C28.3164044,34.8710945 27.9355488,35.0078119 27.5449219,35.125 C27.1542949,34.4804655 26.6416047,33.9580098 26.0068359,33.5576172 C25.3720671,33.1572246 24.7031285,32.9570312 24,32.9570312 C23.2968715,32.9570312 22.6230501,33.1572246 21.9785156,33.5576172 C21.3339812,33.9580098 20.8261737,34.4804655 20.4550781,35.125 C20.0644512,35.0078119 19.6835956,34.8710945 19.3125,34.7148438 C18.9414044,34.558593 18.5800799,34.3828135 18.2285156,34.1875 C18.4042978,33.4648401 18.418946,32.805667 18.2724609,32.2099609 C18.1259758,31.6142548 17.7988307,31.0625025 17.2910156,30.5546875 C16.8027319,30.0664038 16.2607452,29.7441414 15.6650391,29.5878906 C15.069333,29.4316398 14.4101599,29.4511709 13.6875,29.6464844 C13.4921865,29.2949201 13.316407,28.9335956 13.1601562,28.5625 C13.0039055,28.1914044 12.8671881,27.8105488 12.75,27.4199219 C13.3945345,27.0292949 13.9169902,26.5166047 14.3173828,25.8818359 C14.7177754,25.2470671 14.9179688,24.5781285 14.9179688,23.875 C14.9179688,23.1718715 14.7177754,22.5468777 14.3173828,22 C13.9169902,21.4531223 13.3945345,20.984377 12.75,20.59375 C12.8671881,20.203123 13.0039055,19.8222675 13.1601562,19.4511719 C13.316407,19.0800763 13.4921865,18.7187518 13.6875,18.3671875 C14.4101599,18.562501 15.069333,18.5380872 15.6650391,18.2939453 C16.2607452,18.0498035 16.8124975,17.6835962 17.3203125,17.1953125 C17.8085962,16.6874975 18.1308586,16.1357452 18.2871094,15.5400391 C18.4433602,14.944333 18.4238291,14.2851599 18.2285156,13.5625 C18.5800799,13.3671865 18.9414044,13.191407 19.3125,13.0351562 C19.6835956,12.8789055 20.0644512,12.7421881 20.4550781,12.625 C20.8457051,13.2695345 21.3583953,13.7919902 21.9931641,14.1923828 C22.6279329,14.5927754 23.2968715,14.7929688 24,14.7929688 C24.7031285,14.7929688 25.3720671,14.5927754 26.0068359,14.1923828 C26.6416047,13.7919902 27.1542949,13.2695345 27.5449219,12.625 C27.9355488,12.7421881 28.3164044,12.8789055 28.6875,13.0351562 C29.0585956,13.191407 29.4199201,13.3671865 29.7714844,13.5625 C29.5761709,14.2851599 29.5566398,14.944333 29.7128906,15.5400391 C29.8691414,16.1357452 30.1914038,16.6874975 30.6796875,17.1953125 C31.1875025,17.6835962 31.7392548,18.0498035 32.3349609,18.2939453 C32.930667,18.5380872 33.5898401,18.562501 34.3125,18.3671875 C34.5078135,18.7187518 34.683593,19.0800763 34.8398438,19.4511719 C34.9960945,19.8222675 35.1328119,20.203123 35.25,20.59375 C34.6054655,20.984377 34.0830098,21.4531223 33.6826172,22 C33.2822246,22.5468777 33.0820312,23.1718715 33.0820312,23.875 Z M24,29.5 C25.5625078,29.5 26.8906195,28.9482477 27.984375,27.8447266 C29.0781305,26.7412054 29.625,25.4179765 29.625,23.875 C29.625,22.3124922 29.0732477,20.9843805 27.9697266,19.890625 C26.8662054,18.7968695 25.5429765,18.25 24,18.25 C22.4374922,18.25 21.1093805,18.8017523 20.015625,19.9052734 C18.9218695,21.0087946 18.375,22.3320235 18.375,23.875 C18.375,25.4375078 18.9267523,26.7656195 20.0302734,27.859375 C21.1337946,28.9531305 22.4570235,29.5 24,29.5 Z"/>\n			</g>\n		</svg>\n	</button>\n</div>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/navigator/navigator.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], Navigator);
    return Navigator;
}());

//# sourceMappingURL=navigator.js.map

/***/ }),

/***/ 493:
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
            var icon = __webpack_require__(494)("./" + name + ".svg");
            this.html = this.sanitizer.bypassSecurityTrustHtml(icon);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], LoadComponent.prototype, "name", null);
    LoadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "load",
            template: "<div [innerHTML]=\"html\"></div>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], LoadComponent);
    return LoadComponent;
}());

//# sourceMappingURL=load.js.map

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./add.svg": 495,
	"./added.svg": 496,
	"./deny.svg": 497,
	"./write.svg": 498
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
webpackContext.id = 494;

/***/ }),

/***/ 495:
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"178\" height=\"206\" viewBox=\"0 0 89 103\">\n  <metadata><?xpacket begin=\"﻿\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"/>\n   </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\"w\"?></metadata>\n  <path id=\"add\" class=\"fill-primary\" d=\"M480.5,880L435.985,854.25V802.759L480.5,777.013l44.515,25.746V854.25ZM496,832H484v12h-7V832H465v-7h12V813h7v12h12v7Z\" transform=\"translate(-436 -777)\"/>\n</svg>\n"

/***/ }),

/***/ 496:
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"178\" height=\"206\" viewBox=\"0 0 89 103\">\n  <metadata><?xpacket begin=\"﻿\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"/>\n   </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\"w\"?></metadata>\n  <path id=\"added\" class=\"fill-primary\" d=\"M480.5,880L435.985,854.25V802.759L480.5,777.013l44.515,25.746V854.25Zm18.5-61.23-24.725,24.24-12.291-12.032,4.869-4.753,7.422,7.278,19.855-19.487Z\" transform=\"translate(-436 -777)\"/>\n</svg>\n"

/***/ }),

/***/ 497:
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"178\" height=\"206\" viewBox=\"0 0 89 103\">\n  <metadata><?xpacket begin=\"﻿\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"/>\n   </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\"w\"?></metadata>\n  <path id=\"deny\" class=\"fill-grey\" d=\"M953.5,880L908.985,854.25V802.759L953.5,777.013l44.515,25.746V854.25Zm8.485-38.061L953.5,833.45l-8.485,8.485-4.95-4.95,8.485-8.485-8.485-8.485,4.95-4.95,8.485,8.485,8.485-8.485,4.95,4.95L958.45,828.5l8.485,8.485Z\" transform=\"translate(-909 -777)\"/>\n</svg>\n"

/***/ }),

/***/ 498:
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"178\" height=\"206\" viewBox=\"0 0 89 103\">\n  <metadata><?xpacket begin=\"﻿\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?>\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description rdf:about=\"\"/>\n   </rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\"w\"?></metadata>\n  <path id=\"write_corner\" data-name=\"write corner\" class=\"fill-primaryDark\" d=\"M6.577,102l6.651-24.883L31.4,95.331Z\"/>\n  <path id=\"write\" class=\"fill-primary\" d=\"M44.5,103L0,77.25V25.75L44.5,0,89,25.75v51.5ZM19,43.149V36.994H70V43.15H19ZM70,55.078H19V48.922H70v6.156ZM50,67.006H19V60.851H50v6.156Z\"/>\n</svg>\n"

/***/ }),

/***/ 499:
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

var INTERPOLATION_SCALING = 12;
var LoadingProgress = (function () {
    function LoadingProgress(element) {
        var _this = this;
        this.element = element;
        this.interpolatedProgress = 0;
        this.animationStep = function (time) {
            if (!_this.divToStyle) {
                window.requestAnimationFrame(_this.animationStep);
                _this.divToStyle = _this.element.nativeElement.querySelector('div');
            }
            else {
                var progress = _this.progress();
                if (progress < _this.interpolatedProgress || progress === 1) {
                    _this.interpolatedProgress = progress;
                }
                else {
                    _this.interpolatedProgress += (progress - _this.interpolatedProgress) / INTERPOLATION_SCALING;
                }
                _this.divToStyle.setAttribute("style", "background-image: " + _this.progressArc());
                if (_this.interpolatedProgress !== 1) {
                    window.requestAnimationFrame(_this.animationStep);
                }
            }
        };
        // [ngStyle]="{'background-image': progressArc}"
        window.requestAnimationFrame(this.animationStep);
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
    LoadingProgress.prototype.progressArc = function () {
        var _a = this, progressBackground = _a.progressBackground, progressColor = _a.progressColor;
        if (!progressBackground || !progressColor) {
            return "";
        }
        var deg, result;
        if (this.interpolatedProgress <= 0.5) {
            deg = 90 + 180 * this.interpolatedProgress * 2;
            result = "linear-gradient(90deg, " + progressBackground + " 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(" + deg + "deg, " + progressColor + " 50%, " + progressBackground + " 50%, " + progressBackground + ")";
        }
        else {
            deg = -90 + 180 * (2 * (this.interpolatedProgress - .5));
            result = "linear-gradient(" + deg + "deg, " + progressColor + " 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, " + progressColor + " 50%, " + progressBackground + " 50%, " + progressBackground + ")";
        }
        return result;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], LoadingProgress.prototype, "className", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], LoadingProgress.prototype, "progress", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], LoadingProgress.prototype, "backgroundClass", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], LoadingProgress.prototype, "foregroundClass", void 0);
    LoadingProgress = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "loading-progress",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/loadingProgress.html"*/`<div *ngIf="progress && progress() <= 1" class="progressbar">\n	<div class="dummy" [ngClass]="foregroundClass"></div>\n	<div class="hole" [ngStyle]="{\'background-color\': background}"></div>\n</div>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/loadingProgress.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], LoadingProgress);
    return LoadingProgress;
}());

//# sourceMappingURL=loadingProgress.js.map

/***/ }),

/***/ 500:
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "hexagon",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/hexagon.svg"*/`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 433 500" style="enable-background:new 0 0 433 500;" xml:space="preserve">\n	<path class="border" d="M216.5,0L0,125v250l216.5,125L433,375V125L216.5,0z M417.9,366.3L216.5,482.6L15.1,366.3V133.7L216.5,17.4 l201.4,116.3V366.3z"/>\n  <g transform="scale(1.01)">\n		<polygon class="content" points="15.1,133.7 216.5,17.4 417.9,133.7 417.9,366.3 216.5,482.6 15.1,366.3" fill="#fff"/>\n	</g>\n</svg>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/hexagon.svg"*/
        }),
        __metadata("design:paramtypes", [])
    ], HexagonComponent);
    return HexagonComponent;
}());

//# sourceMappingURL=hexagon.js.map

/***/ }),

/***/ 501:
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "navigator-hexagon",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/navigator/hexagon.svg"*/`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="73" height="84" viewBox="0 0 73 84">\n  <defs>\n    <rect id="green-a" width="4847" height="4674" x="-259" y="-118"/>\n    <polygon id="green-c" points="36.5 2 70 21.341 70 60.024 36.5 79.365 3 60.024 3 21.341"/>\n  </defs>\n  <g fill="none" fill-rule="evenodd">\n    <rect width="4845" height="4672" x="-258" y="-117" stroke="#D5D8DA" stroke-width="2"/>\n    <g transform="scale(1.02)">\n      <use fill="#FFF" fill-opacity="0.95" xlink:href="#green-c"/>\n    </g>\n    <path stroke="#5AB70D" stroke-width="4" d="M36.5,2.30940108 L2,22.2279854 L2,62.0651539 L36.5,81.9837382 L71,62.0651539 L71,22.2279854 L36.5,2.30940108 Z"/>\n  </g>\n</svg>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/navigator/hexagon.svg"*/
        }),
        __metadata("design:paramtypes", [])
    ], NavigatorHexagon);
    return NavigatorHexagon;
}());

//# sourceMappingURL=hexagon.js.map

/***/ }),

/***/ 502:
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], NavigatorIcon.prototype, "icon", void 0);
    NavigatorIcon = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "navigator-icon",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/navigator/icon.html"*/`<div>\n	<div *ngIf="icon === \'plus\'" class="icon plus">\n		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">\n			<g fill-rule="evenodd" fill="#A0A7AA">\n				<path d="M10,7 L10,0 L7,0 L7,7 L1.8369702e-16,7 L0,10 L7,10 L7,17 L10,17 L10,10 L17,10 L17,7 L10,7 Z"/>\n			</g>\n		</svg>\n	</div>\n	<div *ngIf="icon === \'arrow\'" class="icon arrow">\n		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">\n			<g fill-rule="evenodd" fill="#A0A7AA">\n				<polygon points="4 2.034 6.034 0 14.846 8.813 6.034 17.625 4 15.591 10.779 8.813"/>\n			</g>\n		</svg>\n	</div>\n	<div *ngIf="icon === \'close\'" class="icon close">\n		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17">\n			<g fill-rule="evenodd" fill="#A0A7AA">\n				<path d="M9.82352941,7.41421356 L9.82352941,-0.585786438 L6.82352941,-0.585786438 L6.82352941,7.41421356 L-1.17647059,7.41421356 L-1.17647059,10.4142136 L6.82352941,10.4142136 L6.82352941,18.4142136 L9.82352941,18.4142136 L9.82352941,10.4142136 L17.8235294,10.4142136 L17.8235294,7.41421356 L9.82352941,7.41421356 Z" transform="rotate(45 8.324 8.914)"/>\n			</g>\n		</svg>\n	</div>\n</div>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/navigator/icon.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], NavigatorIcon);
    return NavigatorIcon;
}());

//# sourceMappingURL=icon.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return failureCodes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asset_state__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_storage_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_socket_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_location_manager__ = __webpack_require__(49);





var chelper = __webpack_require__(160);
var errors = __webpack_require__(42);
var loginState = new __WEBPACK_IMPORTED_MODULE_0__asset_state__["a" /* default */]();
var failureCodes = {
    UNKNOWNNAME: 0,
    WRONGPASSWORD: 1,
    NOCONNECTION: 2,
    SECURITY: 4,
    UNKNOWN: 5
};
var sessionStorage = Object(__WEBPACK_IMPORTED_MODULE_2__services_storage_service__["withPrefix"])("whispeer.session");
var loginStorage = Object(__WEBPACK_IMPORTED_MODULE_2__services_storage_service__["withPrefix"])("whispeer.login");
function upgradeLocalStorage() {
    try {
        if (localStorage.getItem("loggedin") === "true") {
            var sid = localStorage.getItem("sid");
            var userid = localStorage.getItem("userid");
            var password = localStorage.getItem("password");
            localStorage.clear();
            //migrate to new format
            sessionStorage.set("loggedin", "true");
            sessionStorage.set("sid", sid);
            sessionStorage.set("userid", userid);
            sessionStorage.set("password", password);
        }
    }
    catch (e) {
        console.warn("no local storage");
    }
}
upgradeLocalStorage();
var LoginService = (function () {
    function LoginService() {
        var _this = this;
        this.password = "";
        this.state = loginState.data;
        this.failedOnce = false;
        this.identifier = loginStorage.get("identifier");
        this.failureCode = parseInt(loginStorage.get("failureCode"), 10);
        this.loadedStorage = loginStorage.awaitLoading().then(function () {
            _this.identifier = loginStorage.get("identifier");
            _this.failureCode = parseInt(loginStorage.get("failureCode"), 10);
            loginStorage.remove("failureCode");
            loginStorage.save();
            return null;
        });
    }
    LoginService.prototype.loginServer = function (name, password, callback) {
        return __WEBPACK_IMPORTED_MODULE_1_bluebird__["try"](function () {
            return __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["default"].emit("session.token", {
                identifier: name
            });
        }).catch(function (e) {
            if (e.name === "disconnectedError") {
                throw new errors.LoginError("Login failed", { failure: failureCodes.NOCONNECTION });
            }
            console.log(e);
            throw new errors.LoginError("Login failed", { failure: failureCodes.UNKNOWNNAME });
        }).then(function (data) {
            if (data.salt.length !== 16) {
                throw new errors.LoginError("Login failed", { failure: failureCodes.SECURITY });
            }
            var hash = chelper.hashPW(password, data.salt);
            hash = chelper.hash(hash + data.token);
            return __WEBPACK_IMPORTED_MODULE_3__services_socket_service__["default"].emit("session.login", {
                identifier: name,
                password: hash,
                token: data.token
            }).catch(function (e) {
                if (e.name === "disconnectedError") {
                    throw new errors.LoginError("Login failed", { failure: failureCodes.NOCONNECTION });
                }
                console.log(e);
                throw new errors.LoginError("Login failed", { failure: failureCodes.WRONGPASSWORD });
            });
        }).then(function (data) {
            sessionStorage.set("sid", data.sid);
            sessionStorage.set("userid", data.userid);
            sessionStorage.set("loggedin", true);
            sessionStorage.set("password", password);
            return sessionStorage.save();
        }).catch(function (e) {
            console.log(e);
            throw e;
        }).nodeify(callback);
    };
    ;
    LoginService.prototype.login = function () {
        var _this = this;
        loginState.pending();
        loginStorage.set("identifier", this.identifier || "");
        loginStorage.save().then(function () {
            return _this.loginServer(_this.identifier, _this.password);
        }).then(function () {
            loginState.success();
        }).catch(function (e) {
            loginState.failed();
            _this.failureCode = e.data.failure;
            _this.failedOnce = true;
            if (!Object(__WEBPACK_IMPORTED_MODULE_4__services_location_manager__["e" /* isLoginPage */])()) {
                loginStorage.set("failureCode", e.failure);
                loginStorage.save().then(function () {
                    Object(__WEBPACK_IMPORTED_MODULE_4__services_location_manager__["g" /* loginPage */])();
                });
            }
        });
    };
    return LoginService;
}());
;
/* harmony default export */ __webpack_exports__["a"] = (new LoginService());
//# sourceMappingURL=login.service.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_services_session_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_services_login_service__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_services_passwordStrength_service__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_services_location_manager__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var registerService = __webpack_require__(522);



var focusSelector = function (selector) {
    var e = document.querySelector(selector);
    if (e) {
        e.focus();
    }
};
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, statusBar, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.statusBar = statusBar;
        this.translate = translate;
        this.passwordRepeat = "";
        this.usernameState = USERNAME_UNKNOWN;
        this.tutorialDisabled = true;
        this.business = Object(__WEBPACK_IMPORTED_MODULE_8__lib_services_location_manager__["c" /* isBusinessVersion */])();
        this.checkUserNameExistance = function () {
            var nick = _this.login.identifier;
            if (!nick) {
                _this.usernameState = USERNAME_EMPTY;
            }
            else if (!__WEBPACK_IMPORTED_MODULE_6__lib_helper_helper__["default"].isNickname(nick)) {
                _this.usernameState = USERNAME_INVALID;
            }
            else {
                registerService.nicknameUsed(nick).then(function (isUsed) {
                    if (_this.login.identifier !== nick) {
                        return;
                    }
                    _this.usernameState = isUsed
                        ? USERNAME_TAKEN
                        : USERNAME_FREE;
                });
            }
        };
        this.getLoginErrorCode = function (error) {
            switch (error.data.failure) {
                case __WEBPACK_IMPORTED_MODULE_4__lib_services_login_service__["b" /* failureCodes */].WRONGPASSWORD:
                    return USERNAME_LOGIN_INCORRECT_PASSWORD;
                case __WEBPACK_IMPORTED_MODULE_4__lib_services_login_service__["b" /* failureCodes */].NOCONNECTION:
                    return USERNAME_NO_CONNECTION;
                case __WEBPACK_IMPORTED_MODULE_4__lib_services_login_service__["b" /* failureCodes */].UNKNOWNNAME:
                    return USERNAME_FREE;
                default:
                    return USERNAME_LOGIN_ERROR;
            }
        };
        this.passwordToShort = function () {
            return Object(__WEBPACK_IMPORTED_MODULE_5__lib_services_passwordStrength_service__["a" /* default */])(_this.login.password) === 0;
        };
        this.loadLogin = function () {
            return __WEBPACK_IMPORTED_MODULE_3__lib_services_session_service__["default"].loadLogin().then(function () {
                _this.statusBar.styleLightContent();
                _this.mainPage();
            });
        };
        this.loginOrRegister = function () {
            if ([USERNAME_TAKEN, USERNAME_LOGIN_INCORRECT_PASSWORD, USERNAME_NO_CONNECTION, USERNAME_LOGIN_ERROR].indexOf(_this.usernameState) !== -1) {
                if (!_this.passwordSet()) {
                    _this.focusInput("password");
                    return;
                }
                // login
                _this.performLogin().then(function () {
                    _this.usernameState = USERNAME_LOGIN_SUCCESS;
                    return _this.loadLogin();
                }).catch(function (error) {
                    _this.usernameState = _this.getLoginErrorCode(error);
                });
            }
            else if ([USERNAME_FREE, USERNAME_PASSWORD_TOO_SHORT, USERNAME_PASSWORDS_DONT_MATCH, USERNAME_REGISTER_ERROR].indexOf(_this.usernameState) !== -1) {
                if (!_this.passwordSet()) {
                    _this.focusInput("password");
                    return;
                }
                if (_this.passwordToShort()) {
                    _this.usernameState = USERNAME_PASSWORD_TOO_SHORT;
                    _this.focusInput("password");
                    return;
                }
                _this.usernameState = USERNAME_PASSWORD_CONFIRM;
                _this.focusInput("password2");
            }
            else if ([USERNAME_PASSWORD_CONFIRM].indexOf(_this.usernameState) !== -1) {
                var registerError = function (e) {
                    console.error(e);
                    _this.usernameState = USERNAME_REGISTER_ERROR;
                };
                if (_this.passwordsMatch()) {
                    _this.performRegister().then(function () {
                        _this.usernameState = USERNAME_REGISTER_SUCCESS;
                        return _this.loadLogin();
                    }).catch(registerError);
                }
                else {
                    _this.usernameState = USERNAME_PASSWORDS_DONT_MATCH;
                    _this.focusInput("password");
                    _this.login.password = "";
                    _this.passwordRepeat = "";
                }
            }
        };
        this.statusBar.styleDefault();
        this.login = __WEBPACK_IMPORTED_MODULE_4__lib_services_login_service__["a" /* default */];
        __WEBPACK_IMPORTED_MODULE_4__lib_services_login_service__["a" /* default */].loadedStorage.then(function () {
            _this.checkUserNameExistance();
            (__WEBPACK_IMPORTED_MODULE_4__lib_services_login_service__["a" /* default */].identifier
                ? focusSelector("#password input")
                : focusSelector("#mail input"));
        });
    }
    LoginPage.prototype.goToOtherHome = function () {
        if (this.business) {
            Object(__WEBPACK_IMPORTED_MODULE_8__lib_services_location_manager__["b" /* goToPrivateHome */])();
        }
        else {
            Object(__WEBPACK_IMPORTED_MODULE_8__lib_services_location_manager__["a" /* goToBusinessVersion */])();
        }
    };
    LoginPage.prototype.ionViewCanEnter = function () {
        return !__WEBPACK_IMPORTED_MODULE_3__lib_services_session_service__["default"].loggedin;
    };
    LoginPage.prototype.mainPage = function () {
        this.navCtrl.remove(0, this.navCtrl.length() - 1);
        this.navCtrl.setRoot("Home");
    };
    LoginPage.prototype.getTranslation = function (key) {
        return this.translate.instant("login." + key);
    };
    LoginPage.prototype.getMessage = function () {
        switch (this.usernameState) {
            case USERNAME_TAKEN:
                return this.getTranslation("messages.ambiguousProcess");
            case USERNAME_FREE:
                return this.getTranslation("messages.registerMessage");
            case USERNAME_INVALID:
                return this.getTranslation("messages.invalidUsername");
            case USERNAME_LOGIN_SUCCESS:
                return this.getTranslation("messages.loginSuccess");
            case USERNAME_REGISTER_SUCCESS:
                return this.getTranslation("messages.registerSuccess");
            case USERNAME_NO_CONNECTION:
                return this.getTranslation("messages.noConnection");
            case USERNAME_LOGIN_INCORRECT_PASSWORD:
                return this.getTranslation("messages.incorrectPassword");
            case USERNAME_PASSWORDS_DONT_MATCH:
                return this.getTranslation("messages.passwordsDontMatch");
            case USERNAME_PASSWORD_TOO_SHORT:
                return this.getTranslation("messages.passwordTooShort");
            case USERNAME_LOGIN_ERROR:
            case USERNAME_REGISTER_ERROR:
                return this.getTranslation("messages.genericErrorMessage");
            case USERNAME_PASSWORD_CONFIRM:
                return this.getTranslation("messages.confirmPassword");
            case USERNAME_EMPTY:
            case USERNAME_UNKNOWN:
            default:
                return this.getTranslation("messages.defaultCallToAction");
        }
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad LoginPage");
    };
    LoginPage.prototype.showPasswordFeld = function () {
        return !this.showPasswordConfirmationField();
    };
    LoginPage.prototype.showPasswordConfirmationField = function () {
        return [USERNAME_PASSWORD_CONFIRM].indexOf(this.usernameState) !== -1;
    };
    LoginPage.prototype.focusInput = function (id, repeated) {
        var _this = this;
        if (repeated === void 0) { repeated = false; }
        focusSelector("#" + id + " .text-input");
        if (repeated) {
            return;
        }
        setTimeout(function () { return _this.focusInput(id, true); }, 100);
    };
    LoginPage.prototype.performLogin = function () {
        var _a = this.login, nick = _a.identifier, pass = _a.password;
        return __WEBPACK_IMPORTED_MODULE_4__lib_services_login_service__["a" /* default */].loginServer(nick, pass);
    };
    LoginPage.prototype.performRegister = function () {
        var _a = this.login, nick = _a.identifier, pass = _a.password;
        var email = '';
        var defaultSettings = {
            meta: {
                initialLanguage: "en"
            },
            content: {}
        };
        var defaultProfile = {
            pub: {},
            priv: {},
            nobody: {},
            metaData: {
                scope: "always:allfriends"
            }
        };
        return registerService.register(nick, email, pass, defaultProfile, defaultSettings);
    };
    LoginPage.prototype.passwordsMatch = function () {
        return ((this.login.password === this.passwordRepeat)
            && (this.login.password.length !== 0));
    };
    LoginPage.prototype.passwordSet = function () {
        return Boolean(this.login.password);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/pages/login/login.html"*/`<div class="login__scroll">\n	<div class="login__wrap">\n		<div class="login__logo-wrap">\n			<img class="login__logo" src="assets/images/logo_grey.svg" *ngIf="!business">\n			<img class="login__logo" src="assets/images/logo_white.svg" *ngIf="business">\n		</div>\n\n		<div class="login__welcome-text">\n			<p [innerHTML]="\'login.header\' | translate"></p>\n		</div>\n\n		<form (ngSubmit)="loginOrRegister()">\n			<div class="login__form">\n\n				<div class="login__paragraph login__paragraph--primary">\n					<p [innerHTML]="getMessage()">{{ getMessage() }}</p>\n				</div>\n\n				<ion-item class="clean-input-wrap login__input-wrap">\n					<ion-input id="mail"\n						class="login__input"\n						type="text"\n						[placeholder]="\'login.identifierPlaceholder\' | translate"\n						name="identifier"\n						[disabled]="register"\n						[(ngModel)]="login.identifier"\n						(ngModelChange)="checkUserNameExistance()" >\n					</ion-input>\n				</ion-item>\n\n				<ion-item *ngIf="showPasswordFeld()"\n					class="clean-input-wrap login__input-wrap">\n					<ion-input id="password"\n						class="login__input"\n						type="password"\n						[placeholder]="\'login.passwordPlaceholder\' | translate"\n						name="password"\n						[(ngModel)]="login.password" >\n					</ion-input>\n				</ion-item>\n\n				<ion-item *ngIf="showPasswordConfirmationField()"\n					class="clean-input-wrap login__input-wrap">\n					<ion-input id="password2"\n						class="login__input"\n						type="password"\n						[placeholder]="\'login.password2Placeholder\' | translate"\n						name="password2"\n						[(ngModel)]="passwordRepeat">\n					</ion-input>\n				</ion-item>\n\n				<p class="login__paragraph login__paragraph--detail" [innerHTML]="\'login.tos\' | translate"></p>\n				<div text-center padding>\n					<div class="hexagon-wrap">\n						<hexagon class="hexagon hexagon--green"></hexagon>\n						<button [color]="\'ios\'" ion-button icon-only color="light" class="hexagon__button" type="submit" clear>\n							<ion-icon name="arrow-forward"></ion-icon>\n						</button>\n					</div>\n				</div>\n			</div>\n		</form>\n		<div class="sales__private" (click)="goToOtherHome()">\n			<span [innerHtml]="\'login.privateUser\' | translate" *ngIf="business">></span>\n			<span [innerHtml]="\'login.businessUser\' | translate" *ngIf="!business">></span>\n			<ion-icon ios="ios-arrow-forward-outline"></ion-icon>\n		</div>\n	</div>\n</div>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */]])
    ], LoginPage);
    return LoginPage;
}());

var USERNAME_UNKNOWN = -1;
var USERNAME_EMPTY = 1;
var USERNAME_INVALID = 2;
var USERNAME_TAKEN = 3;
var USERNAME_FREE = 4;
var USERNAME_LOGIN_ERROR = 5;
var USERNAME_LOGIN_SUCCESS = 6;
var USERNAME_PASSWORD_CONFIRM = 7;
var USERNAME_REGISTER_SUCCESS = 8;
var USERNAME_REGISTER_ERROR = 9;
var USERNAME_LOGIN_INCORRECT_PASSWORD = 10;
var USERNAME_NO_CONNECTION = 11;
var USERNAME_PASSWORDS_DONT_MATCH = 12;
var USERNAME_PASSWORD_TOO_SHORT = 13;
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (password) {
    if (!password) {
        return 0;
    } // obsolete when completely turned to ts
    var strength = 1;
    /*
        >=7  +1*1
        >=10 +1
        >=13 +1
        >=16 +1
        >=20 +1
        Gross&Klein +2
        1 Sonderzeichen +1
        1 Sonderzeichen +1
        Zahl +1
    */
    if (password.length < 8) {
        return 0;
    } // Greater than 8 chars minimum!
    if (password.length >= 10) {
        strength += 1;
    } // Longer than 10 chars
    if (password.length >= 13) {
        strength += 2;
    } // Longer than 13 chars
    if (password.length >= 16) {
        strength += 2;
    } // Longer than 16 chars
    if (password.length >= 20) {
        strength += 1;
    } // Longer than 20 chars
    if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) {
        strength += 1;
    } // Mix of upper and lower chars
    if (password.match(/\d+/)) {
        strength += 1;
    } // Contains a number
    if (password.match(/[+,!,@,#,$,%,\^,&,*,?,_,~,\-]/)) {
        strength += 1;
    } // Contains a special chars
    return strength;
});;
//# sourceMappingURL=passwordStrength.service.js.map

/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyStoreService = __webpack_require__(34).default;
var socketService = __webpack_require__(10).default;
var Profile = __webpack_require__(161).default;
var Storage = __webpack_require__(91);
var errorService = __webpack_require__(32).errorServiceInstance;

var Bluebird = __webpack_require__(3);
var h = __webpack_require__(6).default;

var trustManager = __webpack_require__(71).default;
var SecuredData = __webpack_require__(26).default;

var keyGenPromise,
    sessionStorage = Storage.withPrefix("whispeer.session"),
    clientStorage = Storage.withPrefix("whispeer.client");
var registerPromise;

var registerService = {
	register: function register(nickname, mail, password, profile, settings, inviteCode) {
		var keys;

		if (!registerPromise) {
			registerPromise = Bluebird.try(function register1() {
				return registerService.startKeyGeneration();
			}).then(function register2(theKeys) {
				keys = theKeys;

				if (nickname) {
					keyStoreService.setKeyGenIdentifier(nickname);
				} else {
					throw new Error("need nickname");
				}

				var privateProfile = new Profile({
					content: profile.priv
				});

				var privateProfileMe = new Profile({
					content: h.objectJoin(h.objectJoin(profile.priv, profile.pub), profile.nobody),
					meta: { myProfile: true }
				});

				var publicProfile = new Profile({
					content: profile.pub || {}
				}, { isPublicProfile: true });

				var correctKeys = h.objectMap(keys, keyStoreService.correctKeyIdentifier);
				var ownKeys = { main: correctKeys.main, sign: correctKeys.sign };
				delete correctKeys.main;
				delete correctKeys.profile;

				var signedKeys = SecuredData.load(undefined, correctKeys, { type: "signedKeys" });

				trustManager.allow(5);

				return Bluebird.all([privateProfile.signAndEncrypt(keys.sign, keys.profile), privateProfileMe.signAndEncrypt(keys.sign, keys.main), publicProfile.sign(keys.sign), SecuredData.createAsync(settings.content, settings.meta, { type: "settings" }, keys.sign, keys.main), signedKeys.sign(keys.sign), keyStoreService.security.makePWVerifiable(ownKeys, password), keyStoreService.random.hex(16), keyStoreService.sym.pwEncryptKey(keys.main, password), keyStoreService.sym.symEncryptKey(keys.profile, keys.friends)]);
			}).spread(function register3(privateProfile, privateProfileMe, publicProfile, settings, signedKeys, signedOwnKeys, salt) {
				keys = h.objectMap(keys, keyStoreService.correctKeyIdentifier);
				trustManager.disallow();

				var registerData = {
					password: {
						salt: salt,
						hash: keyStoreService.hash.hashPW(password, salt)
					},
					keys: h.objectMap(keys, keyStoreService.upload.getKey),
					signedKeys: signedKeys,
					signedOwnKeys: signedOwnKeys,
					inviteCode: "whispeerfj",
					profile: {
						pub: publicProfile,
						priv: [privateProfile],
						me: privateProfileMe
					},
					settings: settings
				};

				if (mail) {
					registerData.mail = mail;
				}

				if (nickname) {
					registerData.nickname = nickname;
				}

				if (inviteCode) {
					registerData.inviteCode = inviteCode;
				}

				registerData.preID = clientStorage.get("preID") || "";

				return socketService.emit("session.register", registerData);
			}).then(function (result) {
				if (result.sid) {
					sessionStorage.set("sid", result.sid);
					sessionStorage.set("userid", result.userid);
					sessionStorage.set("loggedin", true);
					sessionStorage.set("password", password);
				}

				keyStoreService.security.setPassword(password);

				return result;
			}).finally(function () {
				registerPromise = null;
			});
		}

		return registerPromise;
	},
	setPreID: function setPreID() {
		Bluebird.try(function () {
			return socketService.awaitConnection();
		}).then(function () {
			if (clientStorage.get("preID")) {
				return clientStorage.get("preID");
			}

			return keyStoreService.random.hex(40);
		}).then(function (preID) {
			clientStorage.set("preID", preID);

			return socketService.emit("preRegisterID", {
				id: preID
			});
		}).catch(errorService.criticalError);
	},

	startKeyGeneration: function startKeyGeneration() {
		var toGenKeys = [["main", "sym"], ["sign", "sign"], ["crypt", "asym"], ["profile", "sym"], ["friends", "sym"]];

		var ks = keyStoreService;

		function getCorrectKeystore(key) {
			return ks[key[1]];
		}

		if (!keyGenPromise) {
			keyGenPromise = Bluebird.try(function () {
				return Bluebird.all(toGenKeys.map(function (key) {
					return getCorrectKeystore(key).generateKey(null, key[0]);
				})).then(function (resultKeys) {
					var keys = {};

					return Bluebird.all(toGenKeys.map(function (key, index) {
						var resultKey = resultKeys[index];

						keys[key[0]] = resultKey;

						if (index > 0) {
							return getCorrectKeystore(key).symEncryptKey(resultKey, resultKeys[0]);
						}
					})).thenReturn(keys);
				});
			});
		}

		return keyGenPromise;
	},

	mailUsed: function mailUsed(mail, callback) {
		if (mail === "" || !h.isMail(mail)) {
			return Bluebird.resolve(true).nodeify(callback);
		}

		return Bluebird.try(function mailCheck() {
			return socketService.emit("mailFree", {
				mail: mail
			});
		}).then(function mailResult(data) {
			if (data.mailUsed === true) {
				return true;
			}

			if (data.mailUsed === false) {
				return false;
			}

			throw new Error("invalid server response");
		}).nodeify(callback);
	},

	nicknameUsed: function nicknameUsed(nickname, callback) {
		if (nickname === "" || !h.isNickname(nickname)) {
			return Bluebird.resolve(true).nodeify(callback);
		}

		return socketService.awaitConnection().then(function () {
			return socketService.emit("nicknameFree", {
				nickname: nickname
			});
		}).then(function nicknameResult(data) {
			if (data.nicknameUsed === true) {
				return true;
			} else if (data.nicknameUsed === false) {
				return false;
			}

			throw new Error("invalid server response");
		}).nodeify(callback);
	}
};

module.exports = registerService;

/***/ })

});
//# sourceMappingURL=3.js.map