webpackJsonp([1],{

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesPageModule", function() { return MessagesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__messages__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_topic_topicComponentsModule__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var MessagesPageModule = (function () {
    function MessagesPageModule() {
    }
    MessagesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__messages__["a" /* MessagesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__messages__["a" /* MessagesPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_topic_topicComponentsModule__["a" /* TopicComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forChild(),
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__messages__["a" /* MessagesPage */]
            ]
        })
    ], MessagesPageModule);
    return MessagesPageModule;
}());

//# sourceMappingURL=messages.module.js.map

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

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopicComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_pipes_seperatorDate__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__burstDifference__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__message__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__voicemailPlayer__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__syntaxify__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gallery_gallery__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_module__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(156);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__lib_pipes_seperatorDate__["a" /* SeperatorDatePipe */],
                __WEBPACK_IMPORTED_MODULE_4__burstDifference__["a" /* BurstDifferenceComponent */],
                __WEBPACK_IMPORTED_MODULE_7__syntaxify__["a" /* SyntaxifyDirective */],
                __WEBPACK_IMPORTED_MODULE_8__gallery_gallery__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_5__message__["a" /* MessageComponent */],
                __WEBPACK_IMPORTED_MODULE_6__voicemailPlayer__["a" /* VoicemailPlayerComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_9__components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["b" /* TranslateModule */].forChild(),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__lib_pipes_seperatorDate__["a" /* SeperatorDatePipe */],
                __WEBPACK_IMPORTED_MODULE_4__burstDifference__["a" /* BurstDifferenceComponent */],
                __WEBPACK_IMPORTED_MODULE_7__syntaxify__["a" /* SyntaxifyDirective */],
                __WEBPACK_IMPORTED_MODULE_8__gallery_gallery__["a" /* GalleryComponent */],
                __WEBPACK_IMPORTED_MODULE_5__message__["a" /* MessageComponent */],
                __WEBPACK_IMPORTED_MODULE_6__voicemailPlayer__["a" /* VoicemailPlayerComponent */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            ]
        })
    ], TopicComponentsModule);
    return TopicComponentsModule;
}());

//# sourceMappingURL=topicComponentsModule.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SeperatorDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(156);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: "seperatorDate"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], SeperatorDatePipe);
    return SeperatorDatePipe;
}());

//# sourceMappingURL=seperatorDate.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BurstDifferenceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_helper_helper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_messages_chatChunk__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_messages_chat__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_messages_burst__ = __webpack_require__(302);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__lib_messages_chat__["a" /* Chat */])
    ], BurstDifferenceComponent.prototype, "chat", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__lib_messages_burst__["a" /* default */])
    ], BurstDifferenceComponent.prototype, "burst", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__lib_messages_burst__["a" /* default */])
    ], BurstDifferenceComponent.prototype, "previousBurst", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], BurstDifferenceComponent.prototype, "noDates", void 0);
    BurstDifferenceComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "BurstDifference",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/topic/burstDifference.html"*/`<div class="messages_message" *ngIf="differentDay()">\n	<div class="burst-seperator burst-seperator-date">\n		<span class="burst-seperator-text">\n			{{getTime()|seperatorDate}}\n		</span>\n	</div>\n</div>\n<div *ngIf="differentChunk()">\n	<div class="messages_message" *ngIf="!hasPreviousChunk()">\n		<div class="burst-seperator burst-seperator-date">\n			<span class="burst-seperator-text">\n				Nutzer in diesem Chat: <br />\n				<ng-container *ngFor="let user of receiver()">\n					{{ user.name }} <br />\n				</ng-container>\n			</span>\n		</div>\n	</div>\n\n	<ng-container *ngFor="let chunk of chunksBetweenBursts()">\n		<div class="messages_message" *ngIf="addedReceiver(chunk).length > 0">\n			<div class="burst-seperator burst-seperator-date">\n				<span class="burst-seperator-text">\n					{{ getCreator(chunk).name }} hat Nutzer hinzugefügt: <br />\n					<ng-container *ngFor="let user of addedReceiver(chunk)">\n						{{ user.name }} <br />\n					</ng-container>\n				</span>\n			</div>\n		</div>\n\n		<div class="messages_message" *ngIf="removedReceiver(chunk).length > 0">\n			<div class="burst-seperator burst-seperator-date">\n				<span class="burst-seperator-text">\n					{{ getCreator(chunk).name }} hat Nutzer entfernt: <br />\n					<ng-container *ngFor="let user of removedReceiver(chunk)">\n						{{ user.name }} <br />\n					</ng-container>\n				</span>\n			</div>\n		</div>\n\n		<div class="messages_message" *ngIf="changedTitle(chunk)">\n			<div class="burst-seperator burst-seperator-date">\n				<span class="burst-seperator-text">\n					{{ getCreator(chunk).name }} hat den Chattitel geändert: <br />\n					{{ changedTitle(chunk) }}\n				</span>\n			</div>\n		</div>\n	</ng-container>\n</div>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/topic/burstDifference.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], BurstDifferenceComponent);
    return BurstDifferenceComponent;
}());

//# sourceMappingURL=burstDifference.js.map

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_messages_message__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_asset_Progress__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_services_blobService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_asset_blobCache__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_services_fileTransferQueue__ = __webpack_require__(303);
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
        this.downloadFile = function (file) {
            var loadProgress = new __WEBPACK_IMPORTED_MODULE_3__lib_asset_Progress__["a" /* default */]();
            file.getProgress = function () { return loadProgress.getProgress(); };
            __WEBPACK_IMPORTED_MODULE_6__lib_services_fileTransferQueue__["a" /* queue */].enqueue(1, function () {
                return __WEBPACK_IMPORTED_MODULE_4__lib_services_blobService__["a" /* default */]
                    .getBlobUrl(file.blobID, loadProgress, file.size)
                    .then(function (url) { return __WEBPACK_IMPORTED_MODULE_5__lib_asset_blobCache__["a" /* default */].copyBlobToDownloads(file.blobID, file.name); })
                    .delay(FILE_DOWNLOAD_DELAY)
                    .then(function (url) {
                    file.loaded = true;
                    file.url = url;
                    return __WEBPACK_IMPORTED_MODULE_5__lib_asset_blobCache__["a" /* default */].getFileMimeType(url).then(function (mimeType) {
                        return new __WEBPACK_IMPORTED_MODULE_1_bluebird__(function (success, error) {
                            return window.cordova.plugins.fileOpener2.showOpenWithDialog(url, mimeType || "", { success: success, error: error });
                        });
                    });
                })
                    .catch(function (e) {
                    delete file.getProgress;
                    alert(parseInt(e.status, 10) === 9
                        ? "Could not open file. No app found to open file type for " + file.name
                        : "Download of file " + file.name + " failed");
                });
            });
        };
    }
    Object.defineProperty(MessageComponent.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (_message) {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__lib_messages_message__["a" /* Message */]),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__lib_messages_message__["a" /* Message */]])
    ], MessageComponent.prototype, "message", null);
    MessageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "Message",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/topic/message.html"*/`<div *ngIf="message.isBlockedSince()" attr.data-messageid="{{message.data.id}}" class="messages__wrap">\n	<div class="messages__message messages__message-blocked">\n		<span>{{ \'blocked.messageReplacement\' | translate }}</span>\n	</div>\n	<span class="messages__time"></span>\n</div>\n\n<ng-container *ngIf="!message.isBlockedSince()">\n\n	<div *ngIf="message.hasText() || message.hasImages()" attr.data-messageid="{{message.data.id}}" class="messages__wrap">\n		<div class="messages__message last" [ngClass]="{\'messages__message--emoji-only\': message.data.emojiOnly, \'sending\': !message.hasBeenSent()}">\n			<span whispeerSyntaxify content="{{message.data.text}}" *ngIf="message.data.text"></span>\n			<gallery *ngIf="message.data.images && message.data.images.length > 0" [images]="message.data.images"></gallery>\n		</div>\n		<ng-container *ngTemplateOutlet="message_time"></ng-container>\n	</div>\n\n	<div *ngFor="let file of message.data.files; let last = last;" class="messages__wrap">\n		<div class="messages__message message__file" [ngClass]="{\'sending\': !message.hasBeenSent(), \'last\': last}">\n			<div class="message__voicemail__actions">\n				<ion-icon *ngIf="!file.loaded && !file.getProgress" (click)="downloadFile(file)" class="message__voicemail__action" name="md-download"></ion-icon>\n				<ion-icon *ngIf="file.loaded && !file.sending" (click)="downloadFile(file)" class="message__voicemail__action" name="md-document"></ion-icon>\n				<loading-progress\n					*ngIf="(!file.loaded && file.getProgress) || file.sending"\n					backgroundClass="messages__message"\n					foregroundClass="progressIndicator"\n					[progress]="file.getProgress">\n				</loading-progress>\n			</div>\n			<span class="message__file__info">\n				<span class="message__file__name">{{ file.name | filenameLimit: 25 }}</span>\n				<span class="message__file__size" *ngIf="!file.loaded">[{{ formatSize(file.size) }}]</span>\n			</span>\n		</div>\n		<ng-container *ngTemplateOutlet="message_time"></ng-container>\n	</div>\n\n	<div *ngIf="message.hasVoicemail()" class="messages__wrap messages__wrap--file">\n		<div class="messages__message message__voicemail last" [ngClass]="{\'sending\': !message.hasBeenSent()}">\n			<voicemailplayer [voicemails]="message.data.voicemails" [hasBeenSent]="message.hasBeenSent()"></voicemailplayer>\n		</div>\n		<ng-container *ngTemplateOutlet="message_time"></ng-container>\n	</div>\n</ng-container>\n\n<ng-template #message_time>\n		<span *ngIf="message.hasBeenSent()" class="messages__time">\n			{{ message.sendTime | date: "shortTime" }}\n		</span>\n		<ng-container *ngIf="!message.hasBeenSent()">\n			<span *ngIf="message.hasVoicemail() || message.hasFiles()" class="messages__time"> </span>\n			<span *ngIf="!message.hasVoicemail() && !message.hasFiles()" class="messages__time messageSpinner">\n				<ion-spinner text-center name="ios-small"></ion-spinner>\n			</span>\n		</ng-container>\n</ng-template>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/topic/message.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], MessageComponent);
    return MessageComponent;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VoicemailPlayerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_asset_sizeFormatter__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_asset_voicemailPlayer__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_services_blobService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_asset_Progress__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var loadVoicemail = function (voicemail) {
    var loadProgress = new __WEBPACK_IMPORTED_MODULE_5__lib_asset_Progress__["a" /* default */]();
    voicemail.loading = true;
    voicemail.getProgress = function () { return loadProgress.getProgress(); };
    return __WEBPACK_IMPORTED_MODULE_4__lib_services_blobService__["a" /* default */].getBlobUrl(voicemail.blobID, loadProgress, voicemail.size).then(function (url) {
        voicemail.url = url;
        voicemail.loading = false;
        voicemail.loaded = true;
        return voicemail;
    });
};
var playBackBlocked = false;
var VoicemailPlayerComponent = (function () {
    function VoicemailPlayerComponent(element) {
        var _this = this;
        this.element = element;
        this.hasBeenSent = true;
        this.startTime = 0;
        this.seekVal = 0;
        this.toggle = function () { return _this.isPlaying() ? _this.pause() : _this.play(); };
        this.downloadable = function () { return !_this.isLoaded() && _this.hasBeenSent; };
        this.isPlaying = function () { return _this.player ? _this.player.isPlaying() : false; };
        this.isLoading = function () { return !!_this.voicemails.find(function (_a) {
            var loading = _a.loading;
            return loading;
        }); };
        this.getProgress = function () { return _this.voicemails.reduce(function (prev, _a) {
            var getProgress = _a.getProgress;
            return getProgress ? prev + getProgress() : 0;
        }, 0) / _this.voicemails.length; };
        this.getSize = function () { return _this.voicemails.reduce(function (prev, _a) {
            var size = _a.size;
            return prev + size;
        }, 0); };
        this.isLoaded = function () { return _this.voicemails.reduce(function (prev, _a) {
            var loaded = _a.loaded;
            return prev && loaded;
        }, true); };
        this.timeUpdate = function (position) {
            var time = Math.floor(position);
            var progress = position * 100 / _this.getDuration();
            var ele = _this.element.nativeElement;
            var progressBar = ele.querySelector(".vom--progress--bar");
            if (progressBar instanceof HTMLElement) {
                progressBar.style.width = Math.round(progress * 10) / 10 + "%";
            }
            if (_this.previousTime === time) {
                return;
            }
            _this.previousTime = time;
            ele.querySelector(".vom--position").innerHTML = _this.formatPosition(time);
        };
        this.formatPosition = function (position) {
            var minutes = Math.floor(position / 60);
            var seconds = Math.floor(position % 60);
            var secondsString = ("0" + seconds).substr(-2);
            return minutes + ":" + secondsString;
        };
        this.formatSize = __WEBPACK_IMPORTED_MODULE_2__lib_asset_sizeFormatter__["a" /* formatSize */];
        this.seekTo = function (position) {
            if (_this.player) {
                return _this.player.seekTo(position);
            }
            _this.startTime = position;
            _this.timeUpdate(position);
        };
        this.loadAndPlay = function () {
            var voicemails = _this.voicemails;
            return __WEBPACK_IMPORTED_MODULE_1_bluebird__["resolve"](voicemails)
                .map(function (voicemail) { return loadVoicemail(voicemail); })
                .map(function (_a) {
                var url = _a.url, duration = _a.duration;
                return ({ url: url, estimatedDuration: duration });
            })
                .then(function (voicemails) { return new __WEBPACK_IMPORTED_MODULE_3__lib_asset_voicemailPlayer__["a" /* default */](voicemails); })
                .then(function (player) {
                _this.player = player;
                _this.player.onPositionUpdateRAF(_this.timeUpdate);
                _this.player.awaitLoading().then(function () {
                    _this.player.seekTo(_this.startTime);
                    _this.player.play();
                });
            });
        };
        this.play = function () { return _this.player ? _this.player.play() : _this.loadAndPlay(); };
        this.pause = function () { return _this.player.pause(); };
        this.getDuration = function () { return _this.player ? _this.player.getDuration() : _this.voicemails.reduce(function (prev, _a) {
            var duration = _a.duration;
            return prev + duration;
        }, 0); };
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], VoicemailPlayerComponent.prototype, "voicemails", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], VoicemailPlayerComponent.prototype, "hasBeenSent", void 0);
    VoicemailPlayerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "voicemailplayer",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/topic/voicemailPlayer.html"*/`<ng-container>\n	<div class="vom--icon">\n		<ion-icon name="md-play" *ngIf="!isLoading() && !isPlaying() && hasBeenSent" (click)="play()"></ion-icon>\n		<ion-icon name="md-pause" *ngIf="isPlaying()" (click)="pause()"></ion-icon>\n		<loading-progress *ngIf="isLoading() || !hasBeenSent"\n			backgroundClass="messages__message"\n			foregroundClass="progressIndicator"\n			[progress]="getProgress"\n		>\n		</loading-progress>\n	</div>\n	<div class="vom--info" [ngClass]="{\'vom--playing\': isPlaying()}">\n		<ion-icon icon name="stats"></ion-icon>\n		<span class="vom--position" *ngIf="!downloadable()">0:00</span>\n		<span class="vom--dividor" *ngIf="!downloadable()"> / </span>\n		<span class="vom--duration">{{ formatPosition(getDuration()) }}</span>\n		<span class="vom--size" *ngIf="downloadable()">[{{formatSize(getSize())}}]</span>\n\n		<div class="vom--progress" *ngIf="isLoaded()">\n			<div class="vom--progress--bar"></div>\n		</div>\n	</div>\n</ng-container>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/topic/voicemailPlayer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], VoicemailPlayerComponent);
    return VoicemailPlayerComponent;
}());

//# sourceMappingURL=voicemailPlayer.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatSize; });
var EMOJIS = ["💩", "👻", "🤖", "🐋", "🌍"];
var formatSize = function (size) {
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
//# sourceMappingURL=sizeFormatter.js.map

/***/ }),

/***/ 512:
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SyntaxifyDirective.prototype, "content", null);
    SyntaxifyDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({ selector: '[whispeerSyntaxify]' }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */]])
    ], SyntaxifyDirective);
    return SyntaxifyDirective;
}());

//# sourceMappingURL=syntaxify.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GalleryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_services_error_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_services_blobService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__ = __webpack_require__(301);
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
        this.isLoading = function (image) {
            return image.highest && image.highest.loading
                || image.middle && image.middle.loading
                || image.lowest && image.lowest.loading;
        };
        this.getProgress = function () { return 0; };
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], GalleryComponent.prototype, "images", null);
    GalleryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "gallery",template:/*ion-inline-start:"/Users/nilos/software/whispeer/messenger/src/components/gallery/gallery.html"*/`<div>\n	<ng-container *ngFor="let image of images">\n		<div class="imageContainer" [ngClass]="{\'loading\': isLoading(image) }" *ngIf="image.lowest.url">\n			<img class="post-image" *ngIf="!runGif($index)" [src]="image.lowest.url" (click)="displayImage(image)" />\n			<span class="post-image--play fa fa-play fa-2x" *ngIf="image.lowest.gif && !runGif($index)"></span>\n			<div *ngIf="runGif($index)">\n				<img class="post-image" [src]="image.highest.url" *ngIf="!image.highest.loading" />\n				<img class="post-image" [src]="image.lowest.url" *ngIf="image.highest.loading" />\n			</div>\n			<div *ngIf="isLoading(image)" class="overlay">\n				<ion-spinner text-center name="ios-small"></ion-spinner>\n			</div>\n		</div>\n	</ng-container>\n</div>\n\n<div *ngIf="images.length > preview">\n	<button (click)="loadMoreImages()" ion-button block>Load more images</button>\n</div>\n`/*ion-inline-end:"/Users/nilos/software/whispeer/messenger/src/components/gallery/gallery.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__["a" /* PhotoViewer */]])
    ], GalleryComponent);
    return GalleryComponent;
}());

//# sourceMappingURL=gallery.js.map

/***/ })

});
//# sourceMappingURL=1.js.map