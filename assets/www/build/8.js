webpackJsonp([8],{

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var HomePageModule = (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */].forChild(),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

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

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_asset_memoizer__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_messages_chatChunk__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_messages_message__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_messages_chat__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_services_settings_service__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__lib_services_error_service__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var contactsService = __webpack_require__(82);





var chatMemoizer = {};
// Amount of chats after we don't load more initially
// Considered to be at least one filled screen
var CHATS_PER_SCREEN = 10;
var getChatMemoizer = function (chatID) {
    if (!chatMemoizer[chatID]) {
        chatMemoizer[chatID] = new __WEBPACK_IMPORTED_MODULE_5__lib_asset_memoizer__["a" /* default */]([
            function () { return __WEBPACK_IMPORTED_MODULE_8__lib_messages_chat__["b" /* default */].getLoaded(chatID); },
            function () { return __WEBPACK_IMPORTED_MODULE_8__lib_messages_chat__["b" /* default */].getLoaded(chatID).getLatestChunk(); },
            function () { return __WEBPACK_IMPORTED_MODULE_8__lib_messages_chat__["b" /* default */].getLoaded(chatID).getLatestMessage(); },
            function () { return __WEBPACK_IMPORTED_MODULE_8__lib_messages_chat__["b" /* default */].getLoaded(chatID).getUnreadMessageIDs(); },
            function () { return __WEBPACK_IMPORTED_MODULE_9__lib_services_settings_service__["default"].getBlockedUsers(); }
        ], function (chat, latestChunkID, latestMessageID, unreadMessageIDs, blockedUsers, previousValue) {
            var latestChunk = __WEBPACK_IMPORTED_MODULE_6__lib_messages_chatChunk__["b" /* default */].getLoaded(chat.getLatestChunk());
            var info = previousValue || { id: chat.getID() };
            info.id = chat.getID();
            info.unread = chat.getUnreadMessageIDs().length > 0;
            info.unreadCount = chat.getUnreadMessageIDs().length;
            info.blocked = chat.isBlocked();
            info.partners = latestChunk.getPartners();
            info.partnersDisplay = latestChunk.getPartnerDisplay();
            info.title = latestChunk.getTitle();
            info.time = latestChunk.getTime();
            info.type = latestChunk.getReceiver().length > 2 ? "groupChat" : "peerChat";
            if (!__WEBPACK_IMPORTED_MODULE_7__lib_messages_message__["b" /* default */].isLoaded(latestMessageID)) {
                info.latestMessageText = "";
            }
            else {
                var latestMessage = __WEBPACK_IMPORTED_MODULE_7__lib_messages_message__["b" /* default */].getLoaded(latestMessageID);
                info.time = latestMessage.getTime();
                info.latestMessageText = latestMessage.getText();
                info.latestMessageBlocked = latestMessage.isBlocked();
            }
            return info;
        });
    }
    return chatMemoizer[chatID];
};
var HomePage = (function () {
    function HomePage(navCtrl, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.topics = [];
        this.requests = [];
        this.searchTerm = "";
        this.chatsLoading = true;
        this.moreTopicsAvailable = true;
        this.lang = "en";
        this.numberOfChatsToDisplay = 0;
        this.ionViewDidEnter = function () {
            _this.loadTopics();
            _this.loadRequests();
            var en = (_this.translate.currentLang.toLowerCase().indexOf("de") === -1);
            _this.lang = en ? "en" : "de";
        };
        this.loadTopics = function () {
            _this.numberOfChatsToDisplay = CHATS_PER_SCREEN;
            console.warn("load more chats?", _this.getLoadedChats().length);
            if (_this.getLoadedChats().length >= CHATS_PER_SCREEN) {
                return;
            }
            _this.numberOfChatsToDisplay = 0;
            __WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].loadMoreChats(CHATS_PER_SCREEN).then(function (chats) {
                _this.moreTopicsAvailable = !__WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].allChatsLoaded;
                _this.chatsLoading = false;
                _this.numberOfChatsToDisplay = CHATS_PER_SCREEN;
            }).catch(__WEBPACK_IMPORTED_MODULE_10__lib_services_error_service__["default"].criticalError);
        };
        this.getChatCount = function () { return __WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].getChatIDs().length; };
        this.checkNoMissingChats = function () {
            if (_this.chatsLoading) {
                return;
            }
            var missing = __WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].getChatIDs()
                .slice(0, _this.numberOfChatsToDisplay)
                .filter(function (chatID) { return !__WEBPACK_IMPORTED_MODULE_8__lib_messages_chat__["b" /* default */].isLoaded(chatID); });
            if (missing.length === 0) {
                return;
            }
            console.warn("Fetching missing chats:", missing);
            return __WEBPACK_IMPORTED_MODULE_3_bluebird__["all"](missing.map(function (chatID) { return __WEBPACK_IMPORTED_MODULE_8__lib_messages_chat__["b" /* default */].get(chatID); }));
        };
        this.getLoadedChats = function () {
            return __WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].getChatIDs()
                .filter(function (chatID) { return __WEBPACK_IMPORTED_MODULE_8__lib_messages_chat__["b" /* default */].isLoaded(chatID); })
                .filter(function (id, i) { return i < _this.numberOfChatsToDisplay; })
                .map(function (chatID) { return getChatMemoizer(chatID).getValue(); })
                .sort(function (a, b) { return b.time - a.time; });
        };
        this.showNoConversationsPlaceholder = function () { return !_this.chatsLoading && _this.getChatCount() === 0; };
        this.loadMoreTopics = function (infiniteScroll) {
            if (_this.chatsLoading) {
                infiniteScroll.complete();
                return;
            }
            __WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].loadMoreChats(CHATS_PER_SCREEN).then(function (chats) {
                _this.moreTopicsAvailable = !__WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].allChatsLoaded;
                _this.numberOfChatsToDisplay += chats.length;
                if (__WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].allChatsLoaded) {
                    _this.numberOfChatsToDisplay = __WEBPACK_IMPORTED_MODULE_4__lib_messages_messageService__["a" /* default */].getChatIDs().length;
                }
                infiniteScroll.complete();
            });
        };
        this.updateRequests = function () {
            _this.requests = contactsService.getRequests();
        };
        this.loadRequests = function () {
            contactsService.awaitLoading().then(function () {
                _this.updateRequests();
                contactsService.listen(_this.updateRequests);
            });
        };
        this.openContactRequests = function () {
            _this.navCtrl.push("Requests");
        };
        this.openChat = function (chatID) {
            _this.navCtrl.push("Messages", { chatID: chatID });
        };
        this.newMessage = function () {
            _this.navCtrl.push("New Message", {}, {
                animation: "md-transition"
            });
        };
        setInterval(function () { return _this.checkNoMissingChats(); }, 10 * 1000);
    }
    HomePage.prototype.ngOnInit = function () { };
    Object.defineProperty(HomePage.prototype, "requestsLabel", {
        get: function () {
            var count = this.requests.length > 1 ? "many" : "single";
            return this.translate.instant("home.newContact." + count);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])({
            name: "Home",
            segment: "home"
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/pages/home/home.html"*/'<ion-header>\n	<ion-navbar [color]="\'primary\'" no-border>\n		<ion-title>{{ \'home.title\' | translate }}</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content class="list-avatar-page">\n	<div *ngIf="showNoConversationsPlaceholder()" class="home__no-content-container" ion-fixed>\n		<img class="home__no-content-image" src="assets/images/no_conversations_{{lang}}.png">\n	</div>\n	<button *ngIf="requests.length > 0" ion-button full icon-right class="contactRequests" (click)="openContactRequests()">\n		<div class="badgeContainer">\n			<span class="hexBadge">{{requests.length}}</span>\n		</div>\n		{{requestsLabel}}\n		<ion-icon name="arrow-forward"></ion-icon>\n	</button>\n	<ion-list class="space-for-fab">\n		<ion-item *ngFor="let chat of getLoadedChats(); let i = index" class="topic" [ngClass]="{\'topic--new\': !chat.blocked && chat.unread}" tappable (click)="openChat(chat.id)">\n			<div class="user__image-wrap" item-left>\n				<ion-avatar\n					*ngFor="let partner of chat.partnersDisplay"\n					class="hexagon__image hexagon__image--active"\n					[ngClass]="{\'hexagon__image--medium\': chat.partnersDisplay.length > 1}"\n				>\n					<user-image [id]="partner.id" [image]="partner.basic.image"></user-image>\n				</ion-avatar>\n				<ion-avatar\n					*ngIf="chat.partners.length > 3"\n					class="hexagon__image hexagon__image--medium"\n				>\n					<hexagon></hexagon>\n					<span class="hexagon__image__image topic__remainingUsers">+{{chat.partners.length - 2}}</span>\n				</ion-avatar>\n			</div>\n			<div class="topic__header">\n				<h2 class="user__name">\n					<span *ngIf="!chat.title">\n						<span *ngFor="let partner of chat.partners; let l = last">\n							{{ partner.basic.shortname }}{{ l ? "":", " }}\n						</span>\n					</span>\n					<span *ngIf="chat.title">{{chat.title}}</span>\n					<div class="topic__badgeContainer" *ngIf="!chat.blocked && chat.unread">\n						<span class="topic__hexBadge">\n							<span class="topic__hexBadge__text">{{ chat.unreadCount | maxValue: 99 }}</span>\n						</span>\n					</div>\n				</h2>\n				<div>\n					<ion-note item-right>{{chat.time | responsiveDate}} <ion-icon ios="ios-arrow-forward-outline"></ion-icon></ion-note>\n				</div>\n			</div>\n			<p *ngIf="!chat.latestMessageBlocked">{{chat.latestMessageText}}</p>\n			<p *ngIf="chat.latestMessageBlocked">{{ \'blocked.messageReplacement\' | translate }}</p>\n		</ion-item>\n	</ion-list>\n\n	<ion-spinner *ngIf="chatsLoading" text-center margin-vertical class="spinner--full"></ion-spinner>\n\n	<ion-infinite-scroll [enabled]="moreTopicsAvailable" (ionInfinite)="loadMoreTopics($event)">\n		<ion-infinite-scroll-content></ion-infinite-scroll-content>\n	</ion-infinite-scroll>\n\n	<div class="space-for-fab"></div>\n\n	<navigator (invoke)="newMessage()" ion-fixed></navigator>\n</ion-content>\n'/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=8.js.map