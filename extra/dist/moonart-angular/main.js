(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"nav-background fixed-top\">\n\n    <nav class=\"navbar navbar-expand-lg navbar-dark fixed-top\">\n        <a><img class=\"img-over tremble\" src=\"assets/img/moon2-ico.png\"></a>\n        <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarColor01\" aria-controls=\"navbarColor01\"\n            aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n            <span class=\"navbar-toggler-icon\"></span>\n        </button>\n        <div class=\"collapse navbar-collapse\" id=\"navbarColor01\">\n            <span><a [routerLink]=\"['/home']\" class=\"nav-title\">MoonArt</a></span>\n            <ul class=\"navbar-nav mr-auto\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [routerLink]=\"['/home']\">Galería<span class=\"sr-only\">(current)</span></a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [routerLink]=\"['/feed']\">Feed<span class=\"sr-only\"></span></a>\n                </li>\n                <!--\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" [routerLink]=\"['/discover']\">Descubre</a>\n                </li>\n            -->\n                <li class=\"nav-item mr-auto\">\n                    <a class=\"nav-link olive\" [routerLink]=\"['/upload-image']\">Subir imagen <i class=\"fas fa-upload\"></i></a>\n                </li>\n            </ul>\n\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"text search-input\" [(ngModel)]=\"searchQuery\" placeholder=\"Buscar imágenes\"\n                    (keyup.enter)=\"validateSearch()\" required pattern=\"[A-z0-9_-]+\" />\n            </div>\n            <i class=\"fas fa-search searchbar\" (click)=\"validateSearch()\"></i>\n            <!-- <a class=\"navbar-brand ml-auto admin\" href=\"#\">Administrar</a> -->\n            <ul class=\"navbar-nav right-position\">\n                <li class=\"nav-item\" *ngIf=\"!identity || identity.nick == 'guest'\">\n                    <a class=\"nav-link\" [routerLink]=\"['/login']\">Entrar</a>\n                </li>\n                <li class=\"nav-item\" *ngIf=\"!identity || identity.nick == 'guest'\">\n                    <a class=\"nav-link\" [routerLink]=\"['/register']\">Registrarse</a>\n                </li>\n\n                <li class=\"nav-item\" *ngIf=\"identity && identity.nick != 'guest'\">\n                    <span class=\"nav-welcome\">Hola, </span>\n                </li>\n                <li class=\"user-toggle\" *ngIf=\"identity && identity.nick != 'guest'\">\n                    <div class=\"dropdown show\">\n                        <button class=\"btn dropdown-toggle username nav-link nav-item\" role=\"button\" id=\"dropdownMenuLink\"\n                            data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">{{identity.nick}}</button>\n\n                        <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"dropdownMenuLink\">\n                            <a class=\"dropdown-item\" id=\"view-profile\" [href]=\"['/profile/' + identity.nick]\">Perfil</a>\n                            <a class=\"dropdown-item\" id=\"edit-profile\" [routerLink]=\"['/edit']\">Editar perfil</a>\n                            <a class=\"dropdown-item\" id=\"edit-profile\" [routerLink]=\"['/settings']\">Configuración</a>\n                            <a class=\"dropdown-item\" id=\"logout\" [routerLink]=\"['/logout/1']\">Salir</a>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n\n            <!-- <button class=\"btn btn-outline-info btn-toggle\" onclick=\"this.blur(); swap();\"><i class=\"fas fa-lightbulb\"></i></button> -->\n        </div>\n    </nav> <!-- Fin de barra de navegación -->\n</div>\n<div class=\"nav-spacing\"></div>\n\n<!-- Contenido -->\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/common.service */ "./src/app/services/common.service.ts");






var AppComponent = /** @class */ (function () {
    function AppComponent(_userService, _commonService, _router, render) {
        this._userService = _userService;
        this._commonService = _commonService;
        this._router = _router;
        this.render = render;
        this.title = 'moonart-angular';
        this.i = 0;
        this.searchQuery = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.token = this._userService.getToken();
        this._commonService.getUserConfig(this, this.token);
    };
    AppComponent.prototype.ngDoCheck = function () {
        this.header(this);
        this.loadUser();
    };
    AppComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    };
    AppComponent.prototype.changeColor = function (color, array) {
        for (var i = 0; i < array.length; i++) {
            this.render.removeClass(document.querySelector(".nav-background"), array[i]);
        }
        this.render.addClass(document.querySelector(".nav-background"), "nav-" + color);
    };
    AppComponent.prototype.header = function (that) {
        if (localStorage.getItem("config") == "undefined" || localStorage.getItem("config") == null) {
            setTimeout(function () {
                that.header(that);
            }, 100);
        }
        else {
            that.arrayNavs = ["nav-red", "nav-green", "nav-blue", "nav-violet", "nav-orange", "nav-yellow"];
            that.configJSON = localStorage.getItem("config");
            that.config = JSON.parse(that.configJSON);
            // console.log(that.config.color);
            that.changeColor(that.config.color, that.arrayNavs);
        }
        that.i++;
    };
    AppComponent.prototype.validateSearch = function () {
        if (this.searchQuery != null && this.searchQuery != "") {
            // this.searchQuery = this.searchQuery.replace(" ", "");
            this._router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
        }
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]],
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_feed_feed_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/feed/feed.component */ "./src/app/components/feed/feed.component.ts");
/* harmony import */ var _components_discover_discover_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/discover/discover.component */ "./src/app/components/discover/discover.component.ts");
/* harmony import */ var _components_upload_image_upload_image_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/upload-image/upload-image.component */ "./src/app/components/upload-image/upload-image.component.ts");
/* harmony import */ var _components_image_image_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/image/image.component */ "./src/app/components/image/image.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/register/register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/profile/profile.component */ "./src/app/components/profile/profile.component.ts");
/* harmony import */ var _components_profile_userImages_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/profile/userImages.component */ "./src/app/components/profile/userImages.component.ts");
/* harmony import */ var _components_profile_likes_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/profile/likes.component */ "./src/app/components/profile/likes.component.ts");
/* harmony import */ var _components_profile_favs_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/profile/favs.component */ "./src/app/components/profile/favs.component.ts");
/* harmony import */ var _components_user_edit_user_edit_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/user-edit/user-edit.component */ "./src/app/components/user-edit/user-edit.component.ts");
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/settings/settings.component */ "./src/app/components/settings/settings.component.ts");
/* harmony import */ var _components_error_error_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/error/error.component */ "./src/app/components/error/error.component.ts");
/* harmony import */ var _services_identity_guard__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./services/identity.guard */ "./src/app/services/identity.guard.ts");
/* harmony import */ var _services_identity2_guard__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./services/identity2.guard */ "./src/app/services/identity2.guard.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _components_search_search_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/search/search.component */ "./src/app/components/search/search.component.ts");



























var routes = [
    { path: '', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"], outlet: 'home' },
    { path: '', component: _components_feed_feed_component__WEBPACK_IMPORTED_MODULE_9__["FeedComponent"], outlet: 'feed' },
    { path: '', component: _components_discover_discover_component__WEBPACK_IMPORTED_MODULE_10__["DiscoverComponent"], outlet: 'discover' },
    { path: '', component: _components_upload_image_upload_image_component__WEBPACK_IMPORTED_MODULE_11__["UploadImageComponent"], outlet: "upload" },
    { path: '', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_13__["LoginComponent"], outlet: 'login' },
    { path: '', component: _components_register_register_component__WEBPACK_IMPORTED_MODULE_14__["RegisterComponent"], outlet: 'register' },
    { path: '', component: _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_15__["ProfileComponent"], outlet: 'profile' },
    { path: '', component: _components_user_edit_user_edit_component__WEBPACK_IMPORTED_MODULE_19__["UserEditComponent"], outlet: 'edit' },
    { path: '', component: _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_20__["SettingsComponent"], outlet: 'settings' }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"],
                _components_feed_feed_component__WEBPACK_IMPORTED_MODULE_9__["FeedComponent"],
                _components_discover_discover_component__WEBPACK_IMPORTED_MODULE_10__["DiscoverComponent"],
                _components_upload_image_upload_image_component__WEBPACK_IMPORTED_MODULE_11__["UploadImageComponent"],
                _components_image_image_component__WEBPACK_IMPORTED_MODULE_12__["ImageComponent"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_13__["LoginComponent"],
                _components_register_register_component__WEBPACK_IMPORTED_MODULE_14__["RegisterComponent"],
                _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_15__["ProfileComponent"],
                _components_profile_userImages_component__WEBPACK_IMPORTED_MODULE_16__["ImagesComponent"],
                _components_profile_likes_component__WEBPACK_IMPORTED_MODULE_17__["LikesComponent"],
                _components_profile_favs_component__WEBPACK_IMPORTED_MODULE_18__["FavsComponent"],
                _components_user_edit_user_edit_component__WEBPACK_IMPORTED_MODULE_19__["UserEditComponent"],
                _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_20__["SettingsComponent"],
                _components_error_error_component__WEBPACK_IMPORTED_MODULE_21__["ErrorComponent"],
                _components_search_search_component__WEBPACK_IMPORTED_MODULE_26__["SearchComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_5__["routing"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forRoot(routes, {
                    scrollPositionRestoration: 'enabled'
                })
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"]
            ],
            providers: [
                _app_routing__WEBPACK_IMPORTED_MODULE_5__["appRoutingProviders"],
                _services_identity_guard__WEBPACK_IMPORTED_MODULE_22__["IdentityGuard"],
                _services_identity2_guard__WEBPACK_IMPORTED_MODULE_23__["Identity2Guard"],
                _services_user_service__WEBPACK_IMPORTED_MODULE_24__["UserService"],
                _services_image_service__WEBPACK_IMPORTED_MODULE_25__["ImageService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: appRoutingProviders, routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutingProviders", function() { return appRoutingProviders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_feed_feed_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/feed/feed.component */ "./src/app/components/feed/feed.component.ts");
/* harmony import */ var _components_discover_discover_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/discover/discover.component */ "./src/app/components/discover/discover.component.ts");
/* harmony import */ var _components_upload_image_upload_image_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/upload-image/upload-image.component */ "./src/app/components/upload-image/upload-image.component.ts");
/* harmony import */ var _components_search_search_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/search/search.component */ "./src/app/components/search/search.component.ts");
/* harmony import */ var _components_image_image_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/image/image.component */ "./src/app/components/image/image.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/register/register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/profile/profile.component */ "./src/app/components/profile/profile.component.ts");
/* harmony import */ var _components_user_edit_user_edit_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/user-edit/user-edit.component */ "./src/app/components/user-edit/user-edit.component.ts");
/* harmony import */ var _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/settings/settings.component */ "./src/app/components/settings/settings.component.ts");
/* harmony import */ var _components_error_error_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/error/error.component */ "./src/app/components/error/error.component.ts");
/* harmony import */ var _services_identity_guard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/identity.guard */ "./src/app/services/identity.guard.ts");
/* harmony import */ var _services_identity2_guard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/identity2.guard */ "./src/app/services/identity2.guard.ts");















var appRoutes = [
    { path: '', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: 'home', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: 'home/:page', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: 'feed', component: _components_feed_feed_component__WEBPACK_IMPORTED_MODULE_2__["FeedComponent"], canActivate: [_services_identity_guard__WEBPACK_IMPORTED_MODULE_13__["IdentityGuard"]] },
    { path: 'discover', component: _components_discover_discover_component__WEBPACK_IMPORTED_MODULE_3__["DiscoverComponent"] },
    { path: 'search', component: _components_search_search_component__WEBPACK_IMPORTED_MODULE_5__["SearchComponent"] },
    { path: 'upload-image', component: _components_upload_image_upload_image_component__WEBPACK_IMPORTED_MODULE_4__["UploadImageComponent"], canActivate: [_services_identity_guard__WEBPACK_IMPORTED_MODULE_13__["IdentityGuard"]] },
    { path: 'images/:image', component: _components_image_image_component__WEBPACK_IMPORTED_MODULE_6__["ImageComponent"] },
    { path: 'login', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"], canActivate: [_services_identity2_guard__WEBPACK_IMPORTED_MODULE_14__["Identity2Guard"]] },
    { path: 'logout/:sure', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"], canActivate: [_services_identity_guard__WEBPACK_IMPORTED_MODULE_13__["IdentityGuard"]] },
    { path: 'register', component: _components_register_register_component__WEBPACK_IMPORTED_MODULE_8__["RegisterComponent"], canActivate: [_services_identity2_guard__WEBPACK_IMPORTED_MODULE_14__["Identity2Guard"]] },
    { path: 'profile/:username/:page', component: _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_9__["ProfileComponent"] },
    { path: 'profile/:username', component: _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_9__["ProfileComponent"] },
    { path: 'edit', component: _components_user_edit_user_edit_component__WEBPACK_IMPORTED_MODULE_10__["UserEditComponent"], canActivate: [_services_identity_guard__WEBPACK_IMPORTED_MODULE_13__["IdentityGuard"]] },
    { path: 'settings', component: _components_settings_settings_component__WEBPACK_IMPORTED_MODULE_11__["SettingsComponent"], canActivate: [_services_identity_guard__WEBPACK_IMPORTED_MODULE_13__["IdentityGuard"]] },
    { path: 'error', component: _components_error_error_component__WEBPACK_IMPORTED_MODULE_12__["ErrorComponent"] },
    { path: '**', component: _components_error_error_component__WEBPACK_IMPORTED_MODULE_12__["ErrorComponent"] },
];
var appRoutingProviders = [];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes);


/***/ }),

/***/ "./src/app/components/discover/discover.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/discover/discover.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZGlzY292ZXIvZGlzY292ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/discover/discover.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/discover/discover.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  discover works!\n</p>\n"

/***/ }),

/***/ "./src/app/components/discover/discover.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/discover/discover.component.ts ***!
  \***********************************************************/
/*! exports provided: DiscoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscoverComponent", function() { return DiscoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var DiscoverComponent = /** @class */ (function () {
    function DiscoverComponent() {
    }
    DiscoverComponent.prototype.ngOnInit = function () {
    };
    DiscoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-discover',
            template: __webpack_require__(/*! ./discover.component.html */ "./src/app/components/discover/discover.component.html"),
            styles: [__webpack_require__(/*! ./discover.component.css */ "./src/app/components/discover/discover.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DiscoverComponent);
    return DiscoverComponent;
}());



/***/ }),

/***/ "./src/app/components/error/error.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/error/error.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZXJyb3IvZXJyb3IuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/error/error.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/error/error.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid error\">\n  <img src=\"assets/img/404.png\">\n  <h2>La página a la que intentas acceder no existe</h2>\n  <p>Si crees que es un error de la página, por favor contáctanos en sistemas@moonart.com</p>\n  <a [routerLink]=\"['/home']\"> Volver al inicio </a>\n</div>"

/***/ }),

/***/ "./src/app/components/error/error.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/error/error.component.ts ***!
  \*****************************************************/
/*! exports provided: ErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorComponent", function() { return ErrorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ErrorComponent = /** @class */ (function () {
    function ErrorComponent() {
        this.page_title = "Error";
    }
    ErrorComponent.prototype.ngOnInit = function () {
    };
    ErrorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-error',
            template: __webpack_require__(/*! ./error.component.html */ "./src/app/components/error/error.component.html"),
            styles: [__webpack_require__(/*! ./error.component.css */ "./src/app/components/error/error.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ErrorComponent);
    return ErrorComponent;
}());



/***/ }),

/***/ "./src/app/components/feed/feed.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/feed/feed.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    width: 100%;\r\n    margin: 0;\r\n    padding: 0;\r\n    margin-top: 30px;\r\n    margin-bottom: 30px;\r\n    /* background: fuchsia; */\r\n}\r\n\r\n.tweet{\r\n    font-family: 'M PLUS Rounded 1c', sans-serif;\r\n    padding: 10px 40px 40px 40px;\r\n    border-top: 1px solid rgb(221, 221, 221);\r\n    border-bottom: 1px solid rgb(221, 221, 221);\r\n    position: relative;\r\n}\r\n\r\n.image{\r\n    min-width: 300px;\r\n    max-width: 350px;\r\n    max-height: 300px;\r\n}\r\n\r\n.shared-by{\r\n    font-size: 20px;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    color: rgb(30, 172, 42);\r\n\r\n}\r\n\r\n.user-sharing{\r\n    color: rgb(30, 172, 42);\r\n}\r\n\r\n.name, .description, .by, .by-user, .date, .interactions, .counter{\r\n    font-size: 30px;\r\n}\r\n\r\n.name{\r\n    font-size: 40px;\r\n    color: rgb(48, 196, 196);\r\n}\r\n\r\n.by-user{\r\n    /* display: inline; */\r\n    margin-right: 27px;\r\n    color: rgb(48, 196, 196);\r\n}\r\n\r\n.description{\r\n    font-size: 25px;\r\n    max-height: 115px;\r\n    margin-bottom: 40px;\r\n    /* Does the magic */\r\n    overflow :hidden;\r\n    white-space: nowrap;\r\n    \r\n    text-overflow: ellipsis; /* Adds the ... */\r\n}\r\n\r\n.date{\r\n    font-size: 23px;\r\n    /* position: absolute;\r\n    bottom: -5px; */\r\n    color: rgba(170, 170, 170, 0.685);\r\n    position: relative;\r\n    bottom: -5px;\r\n}\r\n\r\n.counter{\r\n    font-size: 27px;\r\n    /* position: absolute;\r\n    bottom: -7px; */\r\n}\r\n\r\n.bottom{\r\n    position: absolute; bottom: 0; width: 100%;\r\n}\r\n\r\n.empty{\r\n    height: 35px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mZWVkL2ZlZWQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxTQUFTO0lBQ1QsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksNENBQTRDO0lBQzVDLDRCQUE0QjtJQUM1Qix3Q0FBd0M7SUFDeEMsMkNBQTJDO0lBQzNDLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsdUJBQXVCOztBQUUzQjs7QUFFQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjs7SUFFbkIsdUJBQXVCLEVBQUUsaUJBQWlCO0FBQzlDOztBQUVBO0lBQ0ksZUFBZTtJQUNmO21CQUNlO0lBQ2YsaUNBQWlDO0lBQ2pDLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksZUFBZTtJQUNmO21CQUNlO0FBQ25COztBQUVBO0lBQ0ksa0JBQWtCLEVBQUUsU0FBUyxFQUFFLFdBQVc7QUFDOUM7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9mZWVkL2ZlZWQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXItbWF7IFxyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgICAvKiBiYWNrZ3JvdW5kOiBmdWNoc2lhOyAqL1xyXG59XHJcblxyXG4udHdlZXR7XHJcbiAgICBmb250LWZhbWlseTogJ00gUExVUyBSb3VuZGVkIDFjJywgc2Fucy1zZXJpZjtcclxuICAgIHBhZGRpbmc6IDEwcHggNDBweCA0MHB4IDQwcHg7XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiKDIyMSwgMjIxLCAyMjEpO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYigyMjEsIDIyMSwgMjIxKTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLmltYWdle1xyXG4gICAgbWluLXdpZHRoOiAzMDBweDtcclxuICAgIG1heC13aWR0aDogMzUwcHg7XHJcbiAgICBtYXgtaGVpZ2h0OiAzMDBweDtcclxufVxyXG5cclxuLnNoYXJlZC1ieXtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDEwcHg7XHJcbiAgICBjb2xvcjogcmdiKDMwLCAxNzIsIDQyKTtcclxuXHJcbn1cclxuXHJcbi51c2VyLXNoYXJpbmd7XHJcbiAgICBjb2xvcjogcmdiKDMwLCAxNzIsIDQyKTtcclxufVxyXG5cclxuLm5hbWUsIC5kZXNjcmlwdGlvbiwgLmJ5LCAuYnktdXNlciwgLmRhdGUsIC5pbnRlcmFjdGlvbnMsIC5jb3VudGVye1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1xyXG59XHJcblxyXG4ubmFtZXtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIGNvbG9yOiByZ2IoNDgsIDE5NiwgMTk2KTtcclxufVxyXG5cclxuLmJ5LXVzZXJ7XHJcbiAgICAvKiBkaXNwbGF5OiBpbmxpbmU7ICovXHJcbiAgICBtYXJnaW4tcmlnaHQ6IDI3cHg7XHJcbiAgICBjb2xvcjogcmdiKDQ4LCAxOTYsIDE5Nik7XHJcbn1cclxuXHJcbi5kZXNjcmlwdGlvbntcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIG1heC1oZWlnaHQ6IDExNXB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICAgIC8qIERvZXMgdGhlIG1hZ2ljICovXHJcbiAgICBvdmVyZmxvdyA6aGlkZGVuO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIFxyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IC8qIEFkZHMgdGhlIC4uLiAqL1xyXG59XHJcblxyXG4uZGF0ZXtcclxuICAgIGZvbnQtc2l6ZTogMjNweDtcclxuICAgIC8qIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogLTVweDsgKi9cclxuICAgIGNvbG9yOiByZ2JhKDE3MCwgMTcwLCAxNzAsIDAuNjg1KTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGJvdHRvbTogLTVweDtcclxufVxyXG5cclxuLmNvdW50ZXJ7XHJcbiAgICBmb250LXNpemU6IDI3cHg7XHJcbiAgICAvKiBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3R0b206IC03cHg7ICovXHJcbn1cclxuXHJcbi5ib3R0b217XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogMDsgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5lbXB0eXtcclxuICAgIGhlaWdodDogMzVweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/components/feed/feed.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/feed/feed.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid col-md-12 container-ma\">\n  <div class=\"tweet\" *ngFor=\"let element of sharedImages; let i = index\">\n\n    <div class=\"row\" *ngIf=\"element.user.nick != element.image.user.nick else empty\">\n      <div class=\"col-md-4 text-center shared-by\">\n        <i class=\"fas fa-retweet\"></i> Compartido por <a class=\"user-sharing\" [routerLink]=\"['/profile', element.user.nick]\">{{element.user.nick}}</a>\n      </div>\n      <div class=\"col-md-8\"></div>\n    </div>\n    <ng-template #empty>\n      <div class=\"col-md-12 empty\"></div>\n    </ng-template>\n    <div class=\"row\">\n      <div class=\"col-md-4 text-center\">\n        <a [routerLink]=\"['/images', element.image.id]\">\n          <img class=\"image\" [src]=\"['assets/public/' + element.image.url]\">\n        </a>\n      </div>\n      <div class=\"col-md-8\">\n        <div class=\"row pb-4\">\n          <div class=\"col-md-12\">\n            <a [routerLink]=\"['/images', element.image.id]\" class=\"name\">[{{element.image.name}}]</a>\n          </div>\n          <div class=\"col-md-12\">\n            <span class=\"by\">por </span> <a [routerLink]=\"['/profile', element.image.user.nick]\" class=\"by-user\">{{element.image.user.nick}}</a>\n            <button type=\"button\" *ngIf=\"element.image.user.nick != this.identity.nick\" class=\"button button-follow no-follow\"\n              [name]=\"'user-' + element.image.user.nick\" (click)=\"follow(token, element.image.user.nick)\"></button>\n            <!-- *ngIf=\"this.username != this.identity.nick\" -->\n          </div>\n        </div>\n        <div class=\"row pb-3\">\n          <div class=\"col-md-12 description\">\n            <div *ngIf=\"element.image.description != null else nodescr\">\n              <span [innerHTML]=\"element.image.description\"></span>\n            </div>\n            <ng-template #nodescr>\n              <span> El usuario no ha agregado ninguna descripción.</span>\n            </ng-template>\n          </div>\n        </div>\n\n        <div class=\"row bottom\">\n          <div class=\"col-md-6 counter\">\n            <!--  bottom-align-text -->\n            <i class=\"fas fa-heart\"></i> {{element.image.likes}}\n            <i class=\"fas fa-star\"></i> {{element.image.favs}} \n            <i class=\"fas fa-retweet\"></i> {{element.image.shares}}\n          </div>\n          <div class=\"col-md-6 date\">\n            El {{element.image.createdAt}}\n            <!-- <br> -->\n            <!-- CE {{element.sharedAt}} -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/feed/feed.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/feed/feed.component.ts ***!
  \***************************************************/
/*! exports provided: FeedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedComponent", function() { return FeedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var FeedComponent = /** @class */ (function () {
    function FeedComponent(_userService, _imageService, _commonService, _route, _router, render) {
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._route = _route;
        this._router = _router;
        this.render = render;
        this.sharedImages = [];
        this.sharError = 0;
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    }
    FeedComponent.prototype.ngOnInit = function () {
        this.loadUser();
        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        }
        this.loaded = true;
        this.index = 0;
        this.isLast = false;
        this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
        this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
        this.getSharedItems(this.index);
        // this._userService.checkFollowing(this);  // Hay que hacer un caso a parte
    };
    FeedComponent.prototype.doSomethingOnWindowsScroll = function ($event) {
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;
        // console.log('offset = ' + offset);
        // console.log('height = ' + height);
        if (offset >= (height - 5) && this.loaded == true && this.isLast == false) { // 5 es el margen de error
            this.loaded = false;
            this.getSharedItems(this.index);
        }
    };
    FeedComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        if (this.identity == null) {
            this.identity = {
                id: 0,
                nick: 'guest'
            };
        }
    };
    FeedComponent.prototype.follow = function (token, nick) {
        var _this = this;
        this._userService.follow(token, nick).subscribe(function (response) {
            if (response.status == "success") {
                var userclass = "user-" + nick;
                _this._userService.checkFollowing(_this, nick, userclass);
            }
        }, function (error) {
            console.log("Ero");
        });
    };
    FeedComponent.prototype.getSharedItems = function (index) {
        var _this = this;
        var quantity = JSON.parse(localStorage.getItem("config")).feed;
        this._imageService.getShared(this.token, index, quantity, this.nsfw, this.epilepsy).subscribe(function (response) {
            if (response.is_last == true) {
                _this.isLast = true;
            }
            if (response.status == "success") {
                var counter = 0;
                for (var i = 0; i < response.element.length; i++) {
                    _this.sharedImages.push(response.element[i]);
                    counter++;
                }
                // this.sharedImages[0].image.name; // Nombre de imagen
                // this.sharedImages[0].image.url; // Url de la imagen
                // this.sharedImages[0].image.createdAt; // Fecha de imagen
                // this.sharedImages[0].image.description; // Descripción de imagen
                // this.sharedImages[0].image.user.nick; // Nick de propietario de la imagen
                // this.sharedImages[0].user.nick; // Nick de quien la ha compartido
                console.log(_this.sharedImages);
                // this.sharedImages = response;
                for (var i = 0; i < _this.sharedImages.length; i++) {
                    var descr = _this.sharedImages[i].image.description;
                    if (descr != null) {
                        descr = descr.replace(/\\n/g, "<br>");
                    }
                    var date = _this.sharedImages[i].image.createdAt;
                    date = _this._commonService.dateFormat(date);
                    _this.sharedImages[i].image.createdAt = date;
                    _this.sharedImages[i].image.description = descr;
                    var nick = _this.sharedImages[i].image.user.nick;
                    var userclass = "user-" + nick;
                    _this._userService.checkFollowing(_this, nick, userclass);
                    _this.imageInteractions(i);
                }
                _this.loaded = true;
                _this.index = response.index;
                if (response.isLast == true) {
                    _this.isLast = true;
                }
            }
            else {
                _this.getSharedItems(_this.index);
            }
        }, function (error) {
            _this.sharedImages = [];
            console.log("getShared()");
            console.log("Ero..." + " attempt: " + _this.sharError);
            if (_this.sharError < 5) {
                _this.getSharedItems(_this.index);
                _this.sharError++;
            }
        });
    };
    FeedComponent.prototype.imageInteractions = function (index) {
        var _this = this;
        this._imageService.getInteractionsCount(this.sharedImages[index].image.id).subscribe(function (response) {
            _this.sharedImages[index].image.likes = response.likes;
            _this.sharedImages[index].image.favs = response.favs;
            _this.sharedImages[index].image.shares = response.shares;
            console.log(_this.sharedImages[index]);
        }, function (error) {
            _this.imageInteractions(index);
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])("window:scroll", ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Event]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], FeedComponent.prototype, "doSomethingOnWindowsScroll", null);
    FeedComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-feed',
            template: __webpack_require__(/*! ./feed.component.html */ "./src/app/components/feed/feed.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]],
            styles: [__webpack_require__(/*! ./feed.component.css */ "./src/app/components/feed/feed.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], FeedComponent);
    return FeedComponent;
}());



/***/ }),

/***/ "./src/app/components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/home/home.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    margin-top: 40px; \r\n    margin-bottom: 40px; \r\n    border-radius: 5px; \r\n    padding-top: 30px;\r\n    padding-bottom: 40px;\r\n    width: 95%;\r\n    min-height: 10vh;\r\n}\r\n\r\n.row div:nth-child(1){ padding-left: 40px; }\r\n\r\n.row div:nth-child(4){ padding-right: 40px; }\r\n\r\n/* .box #image-box{ background: rgba(0, 0, 0, 0.123); height: 300px; } */\r\n\r\n.container-images{ display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; }\r\n\r\n/* grid-template-rows: 1fr 1fr 1fr 1fr; -> Si no hay las 4 filas, no quiero que aparezcan elementos invisibles. */\r\n\r\n.grid-col-1 { grid-row: 1; grid-column: 1; }\r\n\r\n.grid-col-2 { grid-row: 1; grid-column: 2; }\r\n\r\n.grid-col-3 { grid-row: 1; grid-column: 3; }\r\n\r\n.grid-col-4 { grid-row: 1; grid-column: 4; }\r\n\r\n.grid-col-5 { grid-row: 2; grid-column: 1; }\r\n\r\n.grid-col-6 { grid-row: 2; grid-column: 2; }\r\n\r\n.grid-col-7 { grid-row: 2; grid-column: 3; }\r\n\r\n.grid-col-8 { grid-row: 2; grid-column: 4; }\r\n\r\n.grid-col-9 { grid-row: 3; grid-column: 1; }\r\n\r\n.grid-col-10{ grid-row: 3; grid-column: 2; }\r\n\r\n.grid-col-11{ grid-row: 3; grid-column: 3; }\r\n\r\n.grid-col-12{ grid-row: 3; grid-column: 4; }\r\n\r\n.grid-col-13{ grid-row: 4; grid-column: 1; }\r\n\r\n.grid-col-14{ grid-row: 4; grid-column: 2; }\r\n\r\n.grid-col-15{ grid-row: 4; grid-column: 3; }\r\n\r\n.grid-col-16{ grid-row: 4; grid-column: 4; }\r\n\r\n/* .{  } */\r\n\r\n.box{ padding: 10px 10px 10px 10px; justify-self: center; align-self: center;}\r\n\r\n.box #image-box{ width: 300px; height: 250px; display: grid; }\r\n\r\n.image-parent, .image-element{ max-height: 250px; max-width: 300px; /*250px*/ align-self: center; justify-self: center; cursor: pointer; position: relative; }\r\n\r\n/* Añadir como requisito un min width y height de 150px al subir imagen.*/\r\n\r\n.image-parent:hover, .hovered-parent{\r\n    background-image: linear-gradient(transparent 20%,rgb(40, 44, 0) 100%); \r\n    opacity: 1; }\r\n\r\n.image-element { min-width: 233px; }\r\n\r\n/* Para la barra de acciones */\r\n\r\n.image-element:hover, .hovered-children{\r\n    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.2));\r\n            mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.2)); }\r\n\r\n/* Blue ver.\r\n.image-element:hover, .hovered-children{-webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0.2)));\r\n    mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.2)); }\r\n*/\r\n\r\n.image-description{\r\n    visibility: hidden;\r\n    opacity: 0;\r\n    transition: opacity 0.3s ease-out;\r\n    pointer-events: none; \r\n    position: absolute; \r\n    color: white; \r\n    font-size: 22px;\r\n    line-height: 110%; \r\n    bottom: 15px; \r\n    left: 0px; \r\n    margin-left: 20px; \r\n    margin-right: 20px; \r\n}\r\n\r\n.image-parent:hover > .image-description{\r\n    visibility: visible;\r\n    opacity: 1;\r\n}\r\n\r\n.image-description:hover{ visibility: visible;\r\n    opacity: 1; transition: opacity 0.3s ease-out; }\r\n\r\n.image-by{\r\n    font-size: 16px;\r\n}\r\n\r\n.image-user{\r\n    color: rgb(242, 255, 168);\r\n}\r\n\r\n/* Blue ver. \r\n.image-user{ color: rgb(128, 215, 255); } \r\n*/\r\n\r\n.image-action{ position: absolute; top: 0; right: 0; visibility: hidden; \r\n}\r\n\r\n.image-frame, .image-heart, .image-star, .image-arrows{ position: absolute; }\r\n\r\n.like{ top: -2px; right: -1px; cursor: default; z-index: 1; }\r\n\r\n.fav{ top: -2px; right: 64px; cursor: default; width: 94px; height: 46px;  z-index: 2;  }\r\n\r\n.share{ top: -2px; right: 129px; cursor: default; width: 94px; height: 46px;  z-index: 3; }\r\n\r\n.like, .fav, .share{ opacity: 0.9; }\r\n\r\n.like:hover, .like-hovered, .fav:hover, .fav-hovered, .share:hover, .share-hovered{ -webkit-transform: scale(1.1, 1.1); transform: scale(1.1, 1.1); z-index: 4; }\r\n\r\n.image-heart, .image-star, .image-arrows{ cursor: pointer; width: 17px; height: 17px; -webkit-transform: scale(1.5, 1.5); transform: scale(1.5, 1.5); \r\n    z-index: 4; background-repeat: no-repeat; }\r\n\r\n.image-heart:hover, .image-star:hover, .image-arrows:hover{ -webkit-transform: scale(2, 2); transform: scale(2, 2); }\r\n\r\n.image-heart, .image-not-liked{ background-image: url('heart.png'); top: 14px; right: 27px; }\r\n\r\n.like:hover ~ .image-heart{ background-image: url('heart-active.png'); }\r\n\r\n.image-heart:hover, .image-liked{background-image: url('heart-active.png'); }\r\n\r\n.image-star, .image-not-faved{ background-image: url('star.png');  top: 13px; right: 99px; }\r\n\r\n.fav:hover ~ .image-star{ background-image: url('star-active.png'); }\r\n\r\n.image-star:hover, .image-faved{ background-image: url('star-active.png'); }\r\n\r\n.image-arrows, .image-not-shared{ background-image: url('repost.png');  top: 14px; right: 163px; }\r\n\r\n.share:hover ~ .image-arrows{ background-image: url('repost-active.png'); }\r\n\r\n.image-arrows:hover, .image-shared{ background-image: url('repost-active.png'); }\r\n\r\n.image-parent:hover .image-action{ visibility: visible; }\r\n\r\n.pagination{ margin-right: 30px; margin-bottom: 30px; }\r\n\r\n.active{ background: rgb(29, 146, 255); color: white; cursor: none; pointer-events: none; }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsVUFBVTtJQUNWLGdCQUFnQjtBQUNwQjs7QUFFQSx1QkFBdUIsa0JBQWtCLEVBQUU7O0FBRTNDLHVCQUF1QixtQkFBbUIsRUFBRTs7QUFFNUMsd0VBQXdFOztBQUV4RSxtQkFBbUIsYUFBYSxFQUFFLHNDQUFzQyxFQUFFOztBQUMxRSxpSEFBaUg7O0FBQ2pILGNBQWMsV0FBVyxFQUFFLGNBQWMsRUFBRTs7QUFDM0MsY0FBYyxXQUFXLEVBQUUsY0FBYyxFQUFFOztBQUMzQyxjQUFjLFdBQVcsRUFBRSxjQUFjLEVBQUU7O0FBQzNDLGNBQWMsV0FBVyxFQUFFLGNBQWMsRUFBRTs7QUFDM0MsY0FBYyxXQUFXLEVBQUUsY0FBYyxFQUFFOztBQUMzQyxjQUFjLFdBQVcsRUFBRSxjQUFjLEVBQUU7O0FBQzNDLGNBQWMsV0FBVyxFQUFFLGNBQWMsRUFBRTs7QUFDM0MsY0FBYyxXQUFXLEVBQUUsY0FBYyxFQUFFOztBQUMzQyxjQUFjLFdBQVcsRUFBRSxjQUFjLEVBQUU7O0FBQzNDLGNBQWMsV0FBVyxFQUFFLGNBQWMsRUFBRTs7QUFDM0MsY0FBYyxXQUFXLEVBQUUsY0FBYyxFQUFFOztBQUMzQyxjQUFjLFdBQVcsRUFBRSxjQUFjLEVBQUU7O0FBQzNDLGNBQWMsV0FBVyxFQUFFLGNBQWMsRUFBRTs7QUFDM0MsY0FBYyxXQUFXLEVBQUUsY0FBYyxFQUFFOztBQUMzQyxjQUFjLFdBQVcsRUFBRSxjQUFjLEVBQUU7O0FBQzNDLGNBQWMsV0FBVyxFQUFFLGNBQWMsRUFBRTs7QUFFM0MsVUFBVTs7QUFFVixNQUFNLDRCQUE0QixFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDOztBQUU3RSxpQkFBaUIsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUU7O0FBRTdELCtCQUErQixpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFOztBQUFFLHlFQUF5RTs7QUFFeE87SUFDSSxzRUFBc0U7SUFDdEUsVUFBVSxFQUFFOztBQUVoQixpQkFBaUIsZ0JBQWdCLEVBQUU7O0FBQUUsOEJBQThCOztBQUVuRTtJQUNJLDhFQUFzRTtZQUF0RSxzRUFBc0UsRUFBRTs7QUFFNUU7OztDQUdDOztBQUVEO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixpQ0FBaUM7SUFDakMsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osU0FBUztJQUNULGlCQUFpQjtJQUNqQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsVUFBVTtBQUNkOztBQUVBLDBCQUEwQixtQkFBbUI7SUFDekMsVUFBVSxFQUFFLGlDQUFpQyxFQUFFOztBQUVuRDtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBR0E7O0NBRUM7O0FBRUQsZUFBZSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGtCQUFrQjtBQUN2RTs7QUFDQSx3REFBd0Qsa0JBQWtCLEVBQUU7O0FBQzVFLE9BQU8sU0FBUyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFOztBQUM1RCxNQUFNLFNBQVMsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxZQUFZLEdBQUcsVUFBVSxHQUFHOztBQUN4RixRQUFRLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxZQUFZLEdBQUcsVUFBVSxFQUFFOztBQUMxRixxQkFBcUIsWUFBWSxFQUFFOztBQUNuQyxvRkFBb0Ysa0NBQTBCLEVBQTFCLDBCQUEwQixFQUFFLFVBQVUsRUFBRTs7QUFFNUgsMENBQTBDLGVBQWUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGtDQUEwQixFQUExQiwwQkFBMEI7SUFDNUcsVUFBVSxFQUFFLDRCQUE0QixFQUFFOztBQUM5Qyw0REFBNEQsOEJBQXNCLEVBQXRCLHNCQUFzQixFQUFFOztBQUdwRixnQ0FBZ0Msa0NBQXNELEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRTs7QUFDaEgsNEJBQTRCLHlDQUE2RCxFQUFFOztBQUMzRixpQ0FBaUMseUNBQTZELEVBQUU7O0FBRWhHLCtCQUErQixpQ0FBcUQsR0FBRyxTQUFTLEVBQUUsV0FBVyxFQUFFOztBQUMvRywwQkFBMEIsd0NBQTRELEVBQUU7O0FBQ3hGLGlDQUFpQyx3Q0FBNEQsRUFBRTs7QUFFL0Ysa0NBQWtDLG1DQUF1RCxHQUFHLFNBQVMsRUFBRSxZQUFZLEVBQUU7O0FBQ3JILDhCQUE4QiwwQ0FBOEQsRUFBRTs7QUFDOUYsb0NBQW9DLDBDQUE4RCxFQUFFOztBQUVwRyxtQ0FBbUMsbUJBQW1CLEVBQUU7O0FBRXhELGFBQWEsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUU7O0FBRXRELFNBQVMsNkJBQTZCLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyLW1heyBcclxuICAgIG1hcmdpbi10b3A6IDQwcHg7IFxyXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDsgXHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7IFxyXG4gICAgcGFkZGluZy10b3A6IDMwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNDBweDtcclxuICAgIHdpZHRoOiA5NSU7XHJcbiAgICBtaW4taGVpZ2h0OiAxMHZoO1xyXG59XHJcblxyXG4ucm93IGRpdjpudGgtY2hpbGQoMSl7IHBhZGRpbmctbGVmdDogNDBweDsgfVxyXG5cclxuLnJvdyBkaXY6bnRoLWNoaWxkKDQpeyBwYWRkaW5nLXJpZ2h0OiA0MHB4OyB9XHJcblxyXG4vKiAuYm94ICNpbWFnZS1ib3h7IGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xMjMpOyBoZWlnaHQ6IDMwMHB4OyB9ICovXHJcblxyXG4uY29udGFpbmVyLWltYWdlc3sgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7IH1cclxuLyogZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMWZyIDFmciAxZnI7IC0+IFNpIG5vIGhheSBsYXMgNCBmaWxhcywgbm8gcXVpZXJvIHF1ZSBhcGFyZXpjYW4gZWxlbWVudG9zIGludmlzaWJsZXMuICovIFxyXG4uZ3JpZC1jb2wtMSB7IGdyaWQtcm93OiAxOyBncmlkLWNvbHVtbjogMTsgfVxyXG4uZ3JpZC1jb2wtMiB7IGdyaWQtcm93OiAxOyBncmlkLWNvbHVtbjogMjsgfVxyXG4uZ3JpZC1jb2wtMyB7IGdyaWQtcm93OiAxOyBncmlkLWNvbHVtbjogMzsgfVxyXG4uZ3JpZC1jb2wtNCB7IGdyaWQtcm93OiAxOyBncmlkLWNvbHVtbjogNDsgfVxyXG4uZ3JpZC1jb2wtNSB7IGdyaWQtcm93OiAyOyBncmlkLWNvbHVtbjogMTsgfVxyXG4uZ3JpZC1jb2wtNiB7IGdyaWQtcm93OiAyOyBncmlkLWNvbHVtbjogMjsgfVxyXG4uZ3JpZC1jb2wtNyB7IGdyaWQtcm93OiAyOyBncmlkLWNvbHVtbjogMzsgfVxyXG4uZ3JpZC1jb2wtOCB7IGdyaWQtcm93OiAyOyBncmlkLWNvbHVtbjogNDsgfVxyXG4uZ3JpZC1jb2wtOSB7IGdyaWQtcm93OiAzOyBncmlkLWNvbHVtbjogMTsgfVxyXG4uZ3JpZC1jb2wtMTB7IGdyaWQtcm93OiAzOyBncmlkLWNvbHVtbjogMjsgfVxyXG4uZ3JpZC1jb2wtMTF7IGdyaWQtcm93OiAzOyBncmlkLWNvbHVtbjogMzsgfVxyXG4uZ3JpZC1jb2wtMTJ7IGdyaWQtcm93OiAzOyBncmlkLWNvbHVtbjogNDsgfVxyXG4uZ3JpZC1jb2wtMTN7IGdyaWQtcm93OiA0OyBncmlkLWNvbHVtbjogMTsgfVxyXG4uZ3JpZC1jb2wtMTR7IGdyaWQtcm93OiA0OyBncmlkLWNvbHVtbjogMjsgfVxyXG4uZ3JpZC1jb2wtMTV7IGdyaWQtcm93OiA0OyBncmlkLWNvbHVtbjogMzsgfVxyXG4uZ3JpZC1jb2wtMTZ7IGdyaWQtcm93OiA0OyBncmlkLWNvbHVtbjogNDsgfVxyXG5cclxuLyogLnsgIH0gKi9cclxuXHJcbi5ib3h7IHBhZGRpbmc6IDEwcHggMTBweCAxMHB4IDEwcHg7IGp1c3RpZnktc2VsZjogY2VudGVyOyBhbGlnbi1zZWxmOiBjZW50ZXI7fVxyXG5cclxuLmJveCAjaW1hZ2UtYm94eyB3aWR0aDogMzAwcHg7IGhlaWdodDogMjUwcHg7IGRpc3BsYXk6IGdyaWQ7IH1cclxuXHJcbi5pbWFnZS1wYXJlbnQsIC5pbWFnZS1lbGVtZW50eyBtYXgtaGVpZ2h0OiAyNTBweDsgbWF4LXdpZHRoOiAzMDBweDsgLyoyNTBweCovIGFsaWduLXNlbGY6IGNlbnRlcjsganVzdGlmeS1zZWxmOiBjZW50ZXI7IGN1cnNvcjogcG9pbnRlcjsgcG9zaXRpb246IHJlbGF0aXZlOyB9IC8qIEHDsWFkaXIgY29tbyByZXF1aXNpdG8gdW4gbWluIHdpZHRoIHkgaGVpZ2h0IGRlIDE1MHB4IGFsIHN1YmlyIGltYWdlbi4qL1xyXG5cclxuLmltYWdlLXBhcmVudDpob3ZlciwgLmhvdmVyZWQtcGFyZW50e1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDIwJSxyZ2IoNDAsIDQ0LCAwKSAxMDAlKTsgXHJcbiAgICBvcGFjaXR5OiAxOyB9XHJcblxyXG4uaW1hZ2UtZWxlbWVudCB7IG1pbi13aWR0aDogMjMzcHg7IH0gLyogUGFyYSBsYSBiYXJyYSBkZSBhY2Npb25lcyAqL1xyXG5cclxuLmltYWdlLWVsZW1lbnQ6aG92ZXIsIC5ob3ZlcmVkLWNoaWxkcmVuey13ZWJraXQtbWFzay1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBmcm9tKHJnYmEoMCwwLDAsMSkpLCB0byhyZ2JhKDAsMCwwLDAuMikpKTtcclxuICAgIG1hc2staW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwwLDAsMSksIHJnYmEoMCwwLDAsMC4yKSk7IH1cclxuXHJcbi8qIEJsdWUgdmVyLlxyXG4uaW1hZ2UtZWxlbWVudDpob3ZlciwgLmhvdmVyZWQtY2hpbGRyZW57LXdlYmtpdC1tYXNrLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGZyb20ocmdiYSgwLDAsMCwxKSksIHRvKHJnYmEoMCwwLDAsMC4yKSkpO1xyXG4gICAgbWFzay1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLDAsMCwxKSwgcmdiYSgwLDAsMCwwLjIpKTsgfVxyXG4qL1xyXG5cclxuLmltYWdlLWRlc2NyaXB0aW9ue1xyXG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLW91dDtcclxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyBcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXHJcbiAgICBjb2xvcjogd2hpdGU7IFxyXG4gICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDExMCU7IFxyXG4gICAgYm90dG9tOiAxNXB4OyBcclxuICAgIGxlZnQ6IDBweDsgXHJcbiAgICBtYXJnaW4tbGVmdDogMjBweDsgXHJcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7IFxyXG59XHJcblxyXG4uaW1hZ2UtcGFyZW50OmhvdmVyID4gLmltYWdlLWRlc2NyaXB0aW9ue1xyXG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxuICAgIG9wYWNpdHk6IDE7XHJcbn1cclxuXHJcbi5pbWFnZS1kZXNjcmlwdGlvbjpob3ZlcnsgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxuICAgIG9wYWNpdHk6IDE7IHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLW91dDsgfVxyXG5cclxuLmltYWdlLWJ5e1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4uaW1hZ2UtdXNlcntcclxuICAgIGNvbG9yOiByZ2IoMjQyLCAyNTUsIDE2OCk7XHJcbn1cclxuXHJcblxyXG4vKiBCbHVlIHZlci4gXHJcbi5pbWFnZS11c2VyeyBjb2xvcjogcmdiKDEyOCwgMjE1LCAyNTUpOyB9IFxyXG4qL1xyXG5cclxuLmltYWdlLWFjdGlvbnsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyB2aXNpYmlsaXR5OiBoaWRkZW47IFxyXG59XHJcbi5pbWFnZS1mcmFtZSwgLmltYWdlLWhlYXJ0LCAuaW1hZ2Utc3RhciwgLmltYWdlLWFycm93c3sgcG9zaXRpb246IGFic29sdXRlOyB9XHJcbi5saWtleyB0b3A6IC0ycHg7IHJpZ2h0OiAtMXB4OyBjdXJzb3I6IGRlZmF1bHQ7IHotaW5kZXg6IDE7IH1cclxuLmZhdnsgdG9wOiAtMnB4OyByaWdodDogNjRweDsgY3Vyc29yOiBkZWZhdWx0OyB3aWR0aDogOTRweDsgaGVpZ2h0OiA0NnB4OyAgei1pbmRleDogMjsgIH1cclxuLnNoYXJleyB0b3A6IC0ycHg7IHJpZ2h0OiAxMjlweDsgY3Vyc29yOiBkZWZhdWx0OyB3aWR0aDogOTRweDsgaGVpZ2h0OiA0NnB4OyAgei1pbmRleDogMzsgfVxyXG4ubGlrZSwgLmZhdiwgLnNoYXJleyBvcGFjaXR5OiAwLjk7IH1cclxuLmxpa2U6aG92ZXIsIC5saWtlLWhvdmVyZWQsIC5mYXY6aG92ZXIsIC5mYXYtaG92ZXJlZCwgLnNoYXJlOmhvdmVyLCAuc2hhcmUtaG92ZXJlZHsgdHJhbnNmb3JtOiBzY2FsZSgxLjEsIDEuMSk7IHotaW5kZXg6IDQ7IH1cclxuXHJcbi5pbWFnZS1oZWFydCwgLmltYWdlLXN0YXIsIC5pbWFnZS1hcnJvd3N7IGN1cnNvcjogcG9pbnRlcjsgd2lkdGg6IDE3cHg7IGhlaWdodDogMTdweDsgdHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuNSk7IFxyXG4gICAgei1pbmRleDogNDsgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsgfVxyXG4uaW1hZ2UtaGVhcnQ6aG92ZXIsIC5pbWFnZS1zdGFyOmhvdmVyLCAuaW1hZ2UtYXJyb3dzOmhvdmVyeyB0cmFuc2Zvcm06IHNjYWxlKDIsIDIpOyB9XHJcblxyXG5cclxuLmltYWdlLWhlYXJ0LCAuaW1hZ2Utbm90LWxpa2VkeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1nL2hlYXJ0LnBuZ1wiKTsgdG9wOiAxNHB4OyByaWdodDogMjdweDsgfVxyXG4ubGlrZTpob3ZlciB+IC5pbWFnZS1oZWFydHsgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltZy9oZWFydC1hY3RpdmUucG5nXCIpOyB9XHJcbi5pbWFnZS1oZWFydDpob3ZlciwgLmltYWdlLWxpa2Vke2JhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uL2Fzc2V0cy9pbWcvaGVhcnQtYWN0aXZlLnBuZ1wiKTsgfVxyXG5cclxuLmltYWdlLXN0YXIsIC5pbWFnZS1ub3QtZmF2ZWR7IGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uL2Fzc2V0cy9pbWcvc3Rhci5wbmdcIik7ICB0b3A6IDEzcHg7IHJpZ2h0OiA5OXB4OyB9XHJcbi5mYXY6aG92ZXIgfiAuaW1hZ2Utc3RhcnsgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltZy9zdGFyLWFjdGl2ZS5wbmdcIik7IH1cclxuLmltYWdlLXN0YXI6aG92ZXIsIC5pbWFnZS1mYXZlZHsgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltZy9zdGFyLWFjdGl2ZS5wbmdcIik7IH1cclxuXHJcbi5pbWFnZS1hcnJvd3MsIC5pbWFnZS1ub3Qtc2hhcmVkeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1nL3JlcG9zdC5wbmdcIik7ICB0b3A6IDE0cHg7IHJpZ2h0OiAxNjNweDsgfVxyXG4uc2hhcmU6aG92ZXIgfiAuaW1hZ2UtYXJyb3dzeyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIuLi8uLi8uLi9hc3NldHMvaW1nL3JlcG9zdC1hY3RpdmUucG5nXCIpOyB9XHJcbi5pbWFnZS1hcnJvd3M6aG92ZXIsIC5pbWFnZS1zaGFyZWR7IGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi4uLy4uLy4uL2Fzc2V0cy9pbWcvcmVwb3N0LWFjdGl2ZS5wbmdcIik7IH1cclxuXHJcbi5pbWFnZS1wYXJlbnQ6aG92ZXIgLmltYWdlLWFjdGlvbnsgdmlzaWJpbGl0eTogdmlzaWJsZTsgfVxyXG5cclxuLnBhZ2luYXRpb257IG1hcmdpbi1yaWdodDogMzBweDsgbWFyZ2luLWJvdHRvbTogMzBweDsgfVxyXG5cclxuLmFjdGl2ZXsgYmFja2dyb3VuZDogcmdiKDI5LCAxNDYsIDI1NSk7IGNvbG9yOiB3aGl0ZTsgY3Vyc29yOiBub25lOyBwb2ludGVyLWV2ZW50czogbm9uZTsgfSJdfQ== */"

/***/ }),

/***/ "./src/app/components/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid col-md-12 container-ma\">\n  <h1 class=\"index-title\">{{page_title}}</h1>\n  <hr>\n  <!-- <div class=\"espaciado\"></div> -->\n    <div class=\"container-images\">\n    <div class=\"box grid-col-{{i+1}} pb-5\" *ngFor=\"let image of images; let i = index\">\n      <div id=\"image-box\">\n        <div #imageParent class=\"image-parent\" id=\"hover-parent\">\n          <a [routerLink]=\"['/images', image[0].id]\">\n            <img src=\"assets/public/{{image[0].url}}\" class=\"image-element\" id=\"id-{{image[0].id}}\" (mouseleave)=\"_imageService.out($event, this, null);\">\n          </a>\n          <span class=\"image-description\">\n            {{image[0].name}}\n            <br>\n            <span class=\"image-by\">\n              by <span class=\"image-user\">{{image.username}}</span>\n            </span>\n          </span>\n          <div class=\"image-action\" *ngIf=\"identity && identity.nick != 'guest'\">\n            <img class=\"image-frame like\" src=\"assets/img/image-like-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-heart\" (mouseover)=\"_imageService.in($event, this, 1);\" (mouseleave)=\"_imageService.out($event, this, 1);\" (click)=\"_imageService.saveInteraction($event, this, 'like');\"></div>\n            <img class=\"image-frame fav\" src=\"assets/img/image-fav-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-star\" (mouseover)=\"_imageService.in($event, this, 2);\" (mouseleave)=\"_imageService.out($event, this, 2);\" (click)=\"_imageService.saveInteraction($event, this, 'fav');\"></div>\n            <img class=\"image-frame share\" src=\"assets/img/image-share-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-arrows\" (mouseover)=\"_imageService.in($event,this, 3);\" (mouseleave)=\"_imageService.out($event, this, 3);\" (click)=\"_imageService.saveInteraction($event, this, 'share');\"></div>\n          </div>\n        </div>\n        <!-- <img src=\"../api-rest-symfony/public/storage/images/image-example.jpg\" class=\"image-element\"> -->\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- <a href=\"index_2.html\">Siguiente</a> -->\n\n<nav aria-label=\"Page navigation example\">\n  <ul class=\"pagination float-right\">\n    <li *ngIf=\"page != 1 && total_pages > 1\">\n      <a class=\"page-link\" [routerLink]=\"['/home', prev_page]\">Anterior</a>\n    </li>\n    <li *ngFor=\"let num of number_pages; let i = index\">\n      <a class=\"page-link\" *ngIf=\"i<5\" [routerLink]=\"['/home', num]\" [ngClass]=\"{'active': num == page}\">{{num}}</a>\n      <!-- Cambiar para que si p.e estás en la pág 20, salga 18 - 19 - 20 - 21 - 22 -->\n    </li>\n    <li *ngIf=\"page != total_pages\"> <!--  && total_pages > 1 -->\n      <a class=\"page-link\" [routerLink]=\"['/home', next_page]\">Siguiente</a>\n    </li>\n  </ul>\n</nav>\n\n<!-- div class=\"container-images\">\n    <div class=\"row\" *ngFor=\"let item of [].constructor(4); let i = index\">\n      <div class=\"col-md-3 box\" *ngFor=\"let item of [].constructor(4); let j = index\">\n        <div id=\"image-box\"></div>\n      </div>\n    </div>\n  </div -->"

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var HomeComponent = /** @class */ (function () {
    function HomeComponent(_userService, _imageService, _commonService, _route, _router, render) {
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._route = _route;
        this._router = _router;
        this.render = render;
        this.page_title = "  Novedades";
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.imagError = 0;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadUser();
        this.pageImages();
        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        }
    };
    HomeComponent.prototype.ngDoCheck = function () {
        // this.loadUser();
    };
    HomeComponent.prototype.pageImages = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.page = +params['page'];
            if (!_this.page) {
                _this.page = 1;
                _this.prev_page = 1;
                _this.next_page = 2;
            }
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                _this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                _this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
            _this._imageService.showAllImages(_this, _this.page, _this.nsfw, _this.epilepsy);
        });
    };
    HomeComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // console.log(this.token);
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/components/home/home.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]],
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/components/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/image/image.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/image/image.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    margin-top: 40px; \r\n    margin-bottom: 40px; \r\n    border-radius: 5px; \r\n    padding-top: 30px;\r\n    padding-bottom: 40px;\r\n    width: 80%;\r\n    min-height: 10vh;\r\n}\r\n\r\n.edit, .delete, .unban{\r\n    position: absolute; \r\n    font-size: 40px;\r\n    cursor: pointer;\r\n    z-index: 1;\r\n}\r\n\r\n.delete{\r\n    top: 16px; \r\n    right: 16px;\r\n    color: rgb(110, 0, 0);\r\n}\r\n\r\n.edit{\r\n    top: 16px;\r\n    right: 60px;\r\n    color: rgb(180, 122, 15);\r\n}\r\n\r\n.unban{\r\n    top: 16px; \r\n    right: 16px;\r\n    color: rgb(4, 196, 106);\r\n}\r\n\r\n.title{\r\n    font-size: 40px;\r\n}\r\n\r\n.author{\r\n    font-size: 25px;\r\n}\r\n\r\n.author span{\r\n    color: rgb(77, 238, 63);\r\n    cursor: pointer;\r\n}\r\n\r\n.image{\r\n    max-width: 640px;\r\n    cursor: zoom-in;\r\n}\r\n\r\n.image-container{\r\n    align-self: center;\r\n}\r\n\r\n.nocursor{\r\n    cursor: default;\r\n}\r\n\r\n.image-actions{\r\n    position: absolute;\r\n    bottom: -42px;\r\n    left: 50%;\r\n    -webkit-transform: translateX(-50%);\r\n            transform: translateX(-50%);\r\n}\r\n\r\n.image-arrows-black{ position: static;}\r\n\r\n.image-star-black{ position: static;}\r\n\r\n.image-heart-black{ position: static;  }\r\n\r\n.image-arrows, .image-star, .image-heart{ z-index: 200; -webkit-transform: scale(1.5); transform: scale(1.5); position: static; display: inline-block; width: 24px; margin-right: 20px; }\r\n\r\n.rights{\r\n    font-size: 18px;\r\n}\r\n\r\n.rights .highlighed{\r\n    margin-left: 5px;\r\n    padding: 5px 10px;\r\n    background:rgba(184, 197, 0, 0.164);\r\n    border-radius: 5px;\r\n}\r\n\r\n.tags-container{\r\n    font-size: 20px;\r\n}\r\n\r\n.tags{\r\n    font-size: 15px;\r\n    padding: 5px;\r\n    margin-right: 5px; \r\n    background: rgb(46, 115, 218);\r\n    color: white;\r\n    border-radius: 20px;\r\n    display:inline-block;\r\n    margin-bottom: 5px;\r\n    /* user-select: none; */\r\n    cursor: pointer;\r\n}\r\n\r\n.comments{\r\n    font-size: 30px; \r\n}\r\n\r\n.comment-image{\r\n    width: 100px;\r\n    height: 100px;\r\n    cursor: pointer;\r\n}\r\n\r\n.comment-name{\r\n    position: relative;\r\n    cursor: pointer;\r\n    top: -7px;\r\n    font-size: 18px;\r\n    font-weight: bold;\r\n}\r\n\r\n.comment-date{\r\n    position: relative;\r\n    top: -7px;\r\n    right: 0px;\r\n}\r\n\r\n.comment-text{\r\n    min-height: 64px;\r\n}\r\n\r\n.reply-comment{\r\n    color: grey;\r\n    cursor: pointer;\r\n    margin-right: 10px;\r\n}\r\n\r\n.delete-comment{\r\n    color: rgb(175, 10, 10);\r\n    cursor: pointer;\r\n}\r\n\r\n.reply-comment, .delete-comment{\r\n    font-size: 14px;\r\n}\r\n\r\ntextarea{\r\n    padding: 10px;\r\n    width: 100%;\r\n    height: 115px;\r\n    resize: none;\r\n}\r\n\r\n.blur{\r\n    -webkit-filter: blur(8px);\r\n    -moz-filter: blur(8px);\r\n    -ms-filter: blur(8px);\r\n    -o-filter: blur(8px);\r\n    filter: blur(8px);\r\n}\r\n\r\n.view{\r\n    position: absolute;\r\n    z-index: 100;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    background: rgba(0,0,0,0.5);\r\n    padding: 10px 20px;\r\n    font-weight: bold;\r\n    color: white;\r\n    border-radius: 5px;\r\n    font-size: 47px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9pbWFnZS9pbWFnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQixVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixlQUFlO0lBQ2YsVUFBVTtBQUNkOztBQUVBO0lBQ0ksU0FBUztJQUNULFdBQVc7SUFDWCxxQkFBcUI7QUFDekI7O0FBQ0E7SUFDSSxTQUFTO0lBQ1QsV0FBVztJQUNYLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLFNBQVM7SUFDVCxXQUFXO0lBQ1gsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixlQUFlO0FBQ25COztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsU0FBUztJQUNULG1DQUEyQjtZQUEzQiwyQkFBMkI7QUFDL0I7O0FBRUEscUJBQXFCLGdCQUFnQixDQUFDOztBQUN0QyxtQkFBbUIsZ0JBQWdCLENBQUM7O0FBQ3BDLG9CQUFvQixnQkFBZ0IsR0FBRzs7QUFFdkMsMENBQTBDLFlBQVksRUFBRSw2QkFBcUIsRUFBckIscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFOztBQUV6SjtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLG1DQUFtQztJQUNuQyxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsNkJBQTZCO0lBQzdCLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLFNBQVM7SUFDVCxlQUFlO0lBQ2YsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsYUFBYTtJQUNiLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixvQkFBb0I7SUFDcEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixRQUFRO0lBQ1IsU0FBUztJQUNULHdDQUFnQztZQUFoQyxnQ0FBZ0M7SUFDaEMsMkJBQTJCO0lBQzNCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsZUFBZTtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXItbWF7IFxyXG4gICAgbWFyZ2luLXRvcDogNDBweDsgXHJcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4OyBcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDsgXHJcbiAgICBwYWRkaW5nLXRvcDogMzBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA0MHB4O1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICAgIG1pbi1oZWlnaHQ6IDEwdmg7XHJcbn1cclxuXHJcbi5lZGl0LCAuZGVsZXRlLCAudW5iYW57XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgei1pbmRleDogMTtcclxufVxyXG5cclxuLmRlbGV0ZXtcclxuICAgIHRvcDogMTZweDsgXHJcbiAgICByaWdodDogMTZweDtcclxuICAgIGNvbG9yOiByZ2IoMTEwLCAwLCAwKTtcclxufVxyXG4uZWRpdHtcclxuICAgIHRvcDogMTZweDtcclxuICAgIHJpZ2h0OiA2MHB4O1xyXG4gICAgY29sb3I6IHJnYigxODAsIDEyMiwgMTUpO1xyXG59XHJcblxyXG4udW5iYW57XHJcbiAgICB0b3A6IDE2cHg7IFxyXG4gICAgcmlnaHQ6IDE2cHg7XHJcbiAgICBjb2xvcjogcmdiKDQsIDE5NiwgMTA2KTtcclxufVxyXG5cclxuLnRpdGxle1xyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG59XHJcblxyXG4uYXV0aG9ye1xyXG4gICAgZm9udC1zaXplOiAyNXB4O1xyXG59XHJcblxyXG4uYXV0aG9yIHNwYW57XHJcbiAgICBjb2xvcjogcmdiKDc3LCAyMzgsIDYzKTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmltYWdle1xyXG4gICAgbWF4LXdpZHRoOiA2NDBweDtcclxuICAgIGN1cnNvcjogem9vbS1pbjtcclxufVxyXG5cclxuLmltYWdlLWNvbnRhaW5lcntcclxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcclxufVxyXG5cclxuLm5vY3Vyc29ye1xyXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xyXG59XHJcblxyXG4uaW1hZ2UtYWN0aW9uc3tcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvdHRvbTogLTQycHg7XHJcbiAgICBsZWZ0OiA1MCU7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XHJcbn1cclxuXHJcbi5pbWFnZS1hcnJvd3MtYmxhY2t7IHBvc2l0aW9uOiBzdGF0aWM7fVxyXG4uaW1hZ2Utc3Rhci1ibGFja3sgcG9zaXRpb246IHN0YXRpYzt9XHJcbi5pbWFnZS1oZWFydC1ibGFja3sgcG9zaXRpb246IHN0YXRpYzsgIH1cclxuXHJcbi5pbWFnZS1hcnJvd3MsIC5pbWFnZS1zdGFyLCAuaW1hZ2UtaGVhcnR7IHotaW5kZXg6IDIwMDsgdHJhbnNmb3JtOiBzY2FsZSgxLjUpOyBwb3NpdGlvbjogc3RhdGljOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHdpZHRoOiAyNHB4OyBtYXJnaW4tcmlnaHQ6IDIwcHg7IH1cclxuXHJcbi5yaWdodHN7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbn1cclxuXHJcbi5yaWdodHMgLmhpZ2hsaWdoZWR7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOnJnYmEoMTg0LCAxOTcsIDAsIDAuMTY0KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLnRhZ3MtY29udGFpbmVye1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcblxyXG4udGFnc3tcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIG1hcmdpbi1yaWdodDogNXB4OyBcclxuICAgIGJhY2tncm91bmQ6IHJnYig0NiwgMTE1LCAyMTgpO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG4gICAgLyogdXNlci1zZWxlY3Q6IG5vbmU7ICovXHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5jb21tZW50c3tcclxuICAgIGZvbnQtc2l6ZTogMzBweDsgXHJcbn1cclxuXHJcbi5jb21tZW50LWltYWdle1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNvbW1lbnQtbmFtZXtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIHRvcDogLTdweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uY29tbWVudC1kYXRle1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdG9wOiAtN3B4O1xyXG4gICAgcmlnaHQ6IDBweDtcclxufVxyXG5cclxuLmNvbW1lbnQtdGV4dHtcclxuICAgIG1pbi1oZWlnaHQ6IDY0cHg7XHJcbn1cclxuXHJcbi5yZXBseS1jb21tZW50e1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5kZWxldGUtY29tbWVudHtcclxuICAgIGNvbG9yOiByZ2IoMTc1LCAxMCwgMTApO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ucmVwbHktY29tbWVudCwgLmRlbGV0ZS1jb21tZW50e1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcblxyXG50ZXh0YXJlYXtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTE1cHg7XHJcbiAgICByZXNpemU6IG5vbmU7XHJcbn1cclxuXHJcbi5ibHVye1xyXG4gICAgLXdlYmtpdC1maWx0ZXI6IGJsdXIoOHB4KTtcclxuICAgIC1tb3otZmlsdGVyOiBibHVyKDhweCk7XHJcbiAgICAtbXMtZmlsdGVyOiBibHVyKDhweCk7XHJcbiAgICAtby1maWx0ZXI6IGJsdXIoOHB4KTtcclxuICAgIGZpbHRlcjogYmx1cig4cHgpO1xyXG59XHJcblxyXG4udmlld3tcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHotaW5kZXg6IDEwMDtcclxuICAgIHRvcDogNTAlO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNSk7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGZvbnQtc2l6ZTogNDdweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/image/image.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/image/image.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-danger notification\" *ngIf=\"this.image.status == 'hidden'\">\n  La imagen ha sido deshabilitada porque inflingía las normas. Si crees que esto es un error, por favor contacta con un\n  moderador.\n</div>\n\n<div class=\"alert alert-danger notification\" *ngIf=\"this.deleted == true\">\n  La imagen se ha borrado correctamente. Se te redirigirá en seguida.\n</div>\n\n<div class=\"alert alert-success notification\" *ngIf=\"this.commentAdded == true\">\n  <!-- class=\"... fixed success\"-->\n  Comentario añadido.\n</div>\n\n<div class=\"container-fluid col-md-12 container-ma\">\n  <div class=\"row\">\n\n    <i *ngIf=\"this.identity.nick == this.image.user.nick\" class=\"edit fas fa-edit\"></i>\n\n    <i *ngIf=\"this.identity.nick == this.image.user.nick || this.identity.role == 'role_admin'\" class=\"delete fas fa-trash-alt\"\n      data-toggle=\"modal\" data-target=\"#deleteModal\"></i>\n\n    <i *ngIf=\"this.identity.role == 'role_mod' && this.identity.nick != this.image.user.nick && this.image.status == 'published'\"\n      class=\"delete fas fa-ban\" data-toggle=\"modal\" data-target=\"#hideModal\"></i>\n\n    <i *ngIf=\"this.identity.role == 'role_mod' && this.identity.nick != this.image.user.nick && this.image.status == 'hidden'\"\n      class=\"unban fas fa-unlock\" data-toggle=\"modal\" data-target=\"#showModal\"></i>\n\n    <div class=\"col-md-8 text-center image-container\">\n\n      <span *ngIf=\"visible==false\" class=\"view\" (click)=\"visible=true\">Mostrar</span>\n\n      <div *ngIf=\"visible==false else noblur\" (click)=\"doNothing($event)\" class=\"blur\">\n        <img [src]=\"['assets/public/' + this.image.url]\" class=\"image nocursor\" id=\"\">\n      </div>\n\n      <ng-template #noblur>\n\n        <a [href]=\"['assets/public/' + this.image.url]\">\n          <img [src]=\"['assets/public/' + this.image.url]\" class=\"image\" id=\"\">\n        </a>\n\n        <div *ngIf=\"this.image.status != 'hidden' && identity && identity.nick != 'guest'\" class=\"image-actions\">\n          <div class=\"image-heart black\" (click)=\"_imageService.saveInteraction($event, this, 'like', true);\"></div>\n          <div class=\"image-star black\" (click)=\"_imageService.saveInteraction($event, this, 'fav', true);\"></div>\n          <div class=\"image-arrows black\" (click)=\"_imageService.saveInteraction($event, this, 'share', true);\"></div>\n        </div>\n\n      </ng-template>\n\n    </div>\n    <div class=\"col-md-4 float-left\">\n      <div class=\"details-container mr-5 pr-2 mt-2\">\n\n        <div class=\"title pb-2\">\n          {{this.image.name}}\n        </div>\n\n        <div class=\"author pb-5\">\n          Por <span [routerLink]=\"['/profile', this.image.user.nick]\">{{this.image.user.nick}}</span>\n          <button type=\"button\" class=\"button button-follow no-follow ml-4\" *ngIf=\"this.identity.nick != this.image.user.nick && this.identity.nick != 'guest'\"\n            (click)=\"follow(token, username)\"></button><!-- {{followStatus}} -->\n        </div>\n\n        <div class=\"description pb-5\">\n          <span *ngIf=\"this.image.description!=null\" [innerHTML]=\"this.image.description\"></span>\n          <span *ngIf=\"this.image.description==null\">El usuario no ha agregado ninguna descripción.</span>\n        </div>\n\n        <div class=\"rights pb-5\">\n          <span>Derechos: <span class=\"highlighed\">{{this.image.rights}}</span></span>\n        </div>\n\n        <div *ngIf=\"isTags == true\" class=\"tags-container pb-5\">\n          <span class=\"mr-2 mb-3\">Tags:</span>\n          <span *ngFor=\"let tag of tags; let i = index\">\n            <span class=\"tags\" (click)=\"navigate(tag)\">{{tag}}</span></span>\n        </div>\n\n        <div class=\"counter pb-5\">\n          <i class=\"fas fa-heart\"></i> <span> {{this.nLikes}}</span>  \n          <i class=\"fas fa-star\"></i> <span> {{this.nFavs}}</span>  \n          <i class=\"fas fa-retweet\"></i><span> {{this.nShares}}</span>\n        </div>\n\n        <div class=\"created-at\">Subida el {{this.image.createdAt}}</div>\n\n      </div>\n    </div>\n  </div>\n  <div class=\"row ml-5 mt-5 mr-5\" *ngIf=\"this.image.status != 'hidden'\">\n    <div class=\"col-md-12\">\n      <div class=\"comments mb-3\">Comentarios</div>\n      <div class=\"row\">\n        <form [formGroup]=\"formVar\" (ngSubmit)=\"onSubmit(formVar)\" class=\"col-md-12 mb-4\">\n          <textarea formControlName=\"comment\" maxlength=\"300\" [value]=\"addComment\" #tarea></textarea>\n          <button type=\"submit\" class=\"btn btn-primary btn-success float-right\" [disabled]=\"identity.nick == 'guest'\">Agregar\n            comentario</button>\n        </form>\n      </div>\n      <div class=\"comment\" *ngFor=\"let comment of this.comments; let i = index\">\n        <div class=\"row mb-5\">\n          <div class=\"col-md-2\">\n            <img [src]=\"['assets/profile-picture/' + comment.user.image]\" [routerLink]=\"['/profile', comment.user.nick]\" \n              class=\"comment-image ml-3\">\n          </div>\n          <div class=\"col-md-9 ml-n5\" [id]=\"'comment-' + comment.id\">\n            <div class=\"mt-1\">\n              <span class=\"comment-name\" [routerLink]=\"['/profile', comment.user.nick]\">{{comment.user.nick}}</span><span\n                class=\"comment-date\"> - {{comment.createdAt}}</span></div>\n            <div class=\"comment-text mt-2\" [innerHTML]=\"comment.comment\"></div>\n            <div class=\"ml-1\">\n              <span class=\"reply-comment\" (click)=\"tarea.focus(); addName($element, comment.user.nick, tarea.value)\">Responder</span>\n              <span class=\"delete-comment\" (click)=\"assignDelete(comment.id)\" data-toggle=\"modal\" data-target=\"#deleteCommentModal\"\n                *ngIf=\"comment.user.nick == identity.nick || identity.role == 'role_admin'\">Eliminar</span>\n            </div>\n            <!-- [innerHTML]=\"permissionArray\" -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class=\"modal fade\" id=\"deleteModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">¿Borrar imagen?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        La imagen se borrará permanentemente.\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" (click)=\"delete(this.imageId)\" class=\"btn btn-primary btn-danger\" data-dismiss=\"modal\">Borrar</button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cerrar</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade\" id=\"hideModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"hideModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"example2ModalLabel\">¿Ocultar imagen?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        La imagen ya no se mostrará.\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" (click)=\"hideToggle(this.imageId, 'hidden')\" class=\"btn btn-primary btn-danger\"\n          data-dismiss=\"modal\">Ocultar</button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cerrar</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade\" id=\"showModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"showModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"example3ModalLabel\">¿Desbanear imagen?</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        La imagen se mostrará de nuevo.\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" (click)=\"hideToggle(this.imageId, 'published')\" class=\"btn btn-primary btn-success\"\n          data-dismiss=\"modal\">Mostrar</button>\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cerrar</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade\" id=\"deleteCommentModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteCommentModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\" id=\"exampleModal4Label\">¿Borrar comentario?</h5>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n          El comentario se borrará permanentemente.\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" (click)=\"deleteComment(commentToDelete)\" class=\"btn btn-primary btn-danger\" data-dismiss=\"modal\">Borrar</button>\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cerrar</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  "

/***/ }),

/***/ "./src/app/components/image/image.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/image/image.component.ts ***!
  \*****************************************************/
/*! exports provided: ImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageComponent", function() { return ImageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");








var ImageComponent = /** @class */ (function () {
    function ImageComponent(_userService, _imageService, _commonService, _route, _router, render, fb) {
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._route = _route;
        this._router = _router;
        this.render = render;
        this.fb = fb;
        this.isTags = false;
        this.loadError = 0; // Para loadImage();
        this.isFwError = 0; // Para follow();
        this.commError = 0; // Para getAllComments();
        this.iCntError = 0;
        this.found = false;
        this.nLikes = 0;
        this.nShares = 0;
        this.nFavs = 0;
        this.addComment = "";
        this.image = {
            url: '',
            description: '',
            user: {
                image: '',
                nick: '',
            },
            status: '',
        };
    }
    ImageComponent.prototype.ngOnInit = function () {
        this.page_title = "Profile";
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.loadUser();
        this.imageId = window.location.href.split("/");
        for (var i = 0; i < this.imageId.length; i++) {
            if (this.imageId[i] == "images" && (i + 1) < this.imageId.length) {
                this.imageId = this.imageId[i + 1];
            }
        }
        if (/^[0-9]*$/.test(this.imageId) == false) {
            this.error();
        }
        this.loadImage(this);
        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        }
        this.formVar = this.fb.group({
            comment: ''
        });
        this.getAllComments(this.imageId);
    };
    ImageComponent.prototype.loadImage = function (that) {
        var _this = this;
        that._imageService.getImage(that.imageId).subscribe(function (response) {
            if (response.status == "success") {
                _this._commonService.displayNotification(_this);
                that.username = response.imagen.user.nick;
                _this._userService.checkFollowing(that);
                that.image = response.imagen;
                that.images = that.image;
                _this._imageService.getInteractions(_this, true);
                if (that.image.description != null) {
                    that.image.description = that._commonService.noscript(that.image.description);
                    that.image.description = that._commonService.formatText(that.image.description);
                }
                that.image.createdAt = that._commonService.dateFormat(that.image.createdAt);
                that.image.rights = that.image.rights.charAt(0).toUpperCase() + that.image.rights.slice(1);
                that.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                that.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
                if (that.identity.nick != that.image.user.nick && ((that.nsfw == false && that.image.nsfw == true)
                    || (that.epilepsy == false && that.image.epilepsy == true))) {
                    that.visible = false;
                }
                if (response.imagen.tags != null) {
                    that.isTags = true;
                    that.tags = response.imagen.tags.trim().split(",");
                    console.log(that.tags[0].charAt(0));
                }
            }
            else {
                _this.error();
            }
        }, function (error) {
            console.log("Ero..." + " attempt: " + that.loadError);
            if (that.loadError < 5) {
                that.loadImage(that);
                that.loadError++;
            }
        });
        that._imageService.getInteractionsCount(that.imageId).subscribe(function (response) {
            console.log(response);
            _this.nLikes = response.likes;
            _this.nFavs = response.favs;
            _this.nShares = response.shares;
        }, function (error) {
            console.log(error);
            console.log("Ero..." + " attempt: " + that.iCntError);
            if (that.iCntError < 5) {
                that.loadImage(that);
                that.iCntError++;
            }
        });
    };
    /*
        Función para la carga del usuario, sus datos y demás.
    */
    ImageComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // console.log(this.token);
    };
    /*
        Función para comprobar si el usuario que está viendo la imagen sigue al propietario de ésta.
    */
    ImageComponent.prototype.follow = function (token, nick) {
        var _this = this;
        this._userService.follow(token, nick).subscribe(function (response) {
            if (response.status == "success") {
                _this._commonService.displayNotification(_this);
                _this._userService.checkFollowing(_this);
            }
        }, function (error) {
            console.log("Ero..." + " attempt: " + _this.isFwError);
            if (_this.isFwError < 5) {
                _this.follow(token, nick);
                _this.isFwError++;
            }
        });
    };
    ImageComponent.prototype.error = function () {
        this._router.navigate(['error']);
    };
    /*
        Función para conseguir todos los comentarios
        Transforma el formato de fecha a uno más legible.
        También sustituye < y > para evitar que se inyecte html, ya que para que los saltos de línea se tengan en cuenta,
        se transforman los \n en <br>, y se inyecta en la etiqueta como html (en image.component.html)
    */
    ImageComponent.prototype.getAllComments = function (imageId) {
        var _this = this;
        this._imageService.getComments(imageId).subscribe(function (response) {
            _this.comments = response.comments;
            console.log(_this.comments);
            for (var i = 0; i < _this.comments.length; i++) { // Dar formato a las fechas
                _this.comments[i].createdAt = _this._commonService.dateFormat(_this.comments[i].createdAt);
                _this.comments[i].comment = _this._commonService.noscript(_this.comments[i].comment);
                _this.comments[i].comment = _this._commonService.formatText(_this.comments[i].comment);
                // this.comments[i].comment = this.comments[i].comment.replace(/\</g, "◄");
                // this.comments[i].comment = this.comments[i].comment.replace(/\>/g, "►");
                // this.comments[i].comment = this.comments[i].comment.replace(/\\n/g, "<br>");
            }
        }, function (error) {
            console.log("Ero..." + " attempt: " + _this.commError);
            if (_this.commError < 5) {
                _this.getAllComments(imageId);
                _this.commError++;
            }
        });
    };
    /*
        Función onSubmit, para el envío del comentario.
        Para que sean posibles los saltos de línea, coge los caracteres charCode cuyo valor sea 10 (salto de línea),
        ya que en la DB se guardan como simples espacios, y los sustituye por \n.
        Luego se tratan más arriba.
    */
    ImageComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var comment = this.formVar.value.comment;
        for (var i = 0; i < comment.length; i++) {
            if (comment.charCodeAt(i) == 10) {
                comment = comment.substr(0, i) + '\\n' + comment.substr(i + 1);
            }
        }
        comment = this._commonService.noscript(comment);
        this.formVar.value.comment = comment;
        var data = {
            userId: this.identity.sub,
            imageId: this.imageId,
            comment: this.formVar.value.comment
        };
        var json = JSON.stringify(data);
        this._imageService.addComment(this.token, json).subscribe(function (response) {
            if (response.status == "success") {
                _this._commonService.displayNotification(_this);
                form.reset();
                /*
                this.commentAdded = true;
                setTimeout(function(){
                    this.commentAdded = false;
                }, 1000);
                */
                _this.getAllComments(_this.imageId); // Recarga los comentarios, para que se vea el que has añadido sin necesidad de recargar.
                // console.log(response);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ImageComponent.prototype.addName = function ($element, nick, taVal) {
        console.log(this.addComment);
        this.addComment = "@" + nick + " " + taVal;
    };
    ImageComponent.prototype.doSomething = function (index) {
    };
    /*
        Función para borrar una imagen. Solo pueden acceder a esta los role_admin, y los propios usuarios que la hayan subido.
        LLama a la función delete del servicio ImageService. Si todo va bien, efectúa la query, y redirige al home.
    */
    ImageComponent.prototype.delete = function (id) {
        var _this = this;
        this._imageService.delete(this.token, id).subscribe(function (response) {
            console.log(response);
            if (response.status == "success") {
                _this._commonService.displayNotification(_this);
                _this.deleted = true;
                setTimeout(function () { _this._router.navigate(['home']); }, 1000);
            }
        }, function (error) {
            // console.log(error);
        });
    };
    ImageComponent.prototype.assignDelete = function (id) {
        this.commentToDelete = id;
    };
    ImageComponent.prototype.deleteComment = function (id) {
        var _this = this;
        this._imageService.deleteComment(this.token, id).subscribe(function (response) {
            console.log(response);
            if (response.status == "success") {
                _this.ngOnInit();
                _this._commonService.displayNotification(_this);
            }
        }, function (error) {
            // console.log(error);
        });
    };
    /*
        Función para ocultar una imagen. Sólo si user_role=="role_mod". Oculta la imagen (Cambia la propiedad status a hidden)
        LLama a la función hide del servicio ImageService. Si todo va bien, efectúa la query, y redirige al home.
        Si es su propia imagen, no puede ocultarla (está en image.component.html), ya que no tendría mucha lógica.
    */
    ImageComponent.prototype.hideToggle = function (id, action) {
        var _this = this;
        this._imageService.hide(this.token, id, action).subscribe(function (response) {
            console.log(response);
            if (response.status == "success") {
                _this._commonService.displayNotification(_this);
                _this.hidden = true;
                setTimeout(function () { _this._router.navigate(['home']); }, 1000);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ImageComponent.prototype.updateCounter = function (event, that, action) {
        // that == this aquí
        var selector;
        if (action == "like") {
            selector = "liked";
        }
        else if (action == "fav") {
            selector = "faved";
        }
        else {
            selector = "shared";
        }
        var check = event.target.parentElement.querySelector(".image-" + selector);
        if (check == null) {
            if (action == "like") {
                that.nLikes++;
            }
            else if (action == "fav") {
                that.nFavs++;
            }
            else {
                that.nShares++;
            }
        }
        else {
            if (action == "like") {
                that.nLikes--;
            }
            else if (action == "fav") {
                that.nFavs--;
            }
            else {
                that.nShares--;
            }
        }
    };
    ImageComponent.prototype.navigate = function (tag) {
        this._router.navigateByUrl("/search?q=" + tag);
    };
    /*
        Función para parar propagación de eventos.
    */
    ImageComponent.prototype.doNothing = function (e) {
        e.stopPropagation();
    };
    ImageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-image',
            template: __webpack_require__(/*! ./image.component.html */ "./src/app/components/image/image.component.html"),
            styles: [__webpack_require__(/*! ./image.component.css */ "./src/app/components/image/image.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"]])
    ], ImageComponent);
    return ImageComponent;
}());



/***/ }),

/***/ "./src/app/components/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/login/login.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    margin-top: 40px; \r\n    margin-bottom: 40px; \r\n    border-radius: 2px; \r\n    padding-top: 30px;\r\n    padding-bottom: 30px;\r\n    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3)\r\n}\r\n\r\n.btn-red-ma{\r\n    background-color: #c9302c;\r\n}\r\n\r\ninput:not([type=submit]){ height: 48px; }\r\n\r\n.title{\r\n    font-size: 40px;\r\n    color: rgb(88, 88, 88);\r\n}\r\n\r\nimg{\r\n    width: 60px;\r\n    margin-right: 15px;\r\n}\r\n\r\n.form-ma{\r\n    padding-left: 30px;\r\n    padding-right: 30px; \r\n}\r\n\r\nhr{ \r\n    display: block; \r\n    margin-bottom: 40px; \r\n    width: 90%; \r\n}\r\n\r\ninput[type=submit]{\r\n    letter-spacing: 0.5px;\r\n    font-family: 'Oxygen', sans-serif;\r\n}\r\n\r\n.vertical-align {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.btn{\r\n    width: 100%;\r\n    background: rgb(104, 145, 162);\r\n    border: none;\r\n}\r\n\r\n.profile-img-card{\r\n    width: 96px;\r\n    height: 96px;\r\n    margin: 0 auto 0;\r\n    display: block;\r\n    border-radius: 50%;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQjtBQUNKOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBLDBCQUEwQixZQUFZLEVBQUU7O0FBRXhDO0lBQ0ksZUFBZTtJQUNmLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksY0FBYztJQUNkLG1CQUFtQjtJQUNuQixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLFdBQVc7SUFDWCw4QkFBOEI7SUFDOUIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGNBQWM7SUFHZCxrQkFBa0I7QUFDdEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyLW1heyBcclxuICAgIG1hcmdpbi10b3A6IDQwcHg7IFxyXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDsgXHJcbiAgICBib3JkZXItcmFkaXVzOiAycHg7IFxyXG4gICAgcGFkZGluZy10b3A6IDMwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxuICAgIGJveC1zaGFkb3c6IDBweCAycHggMnB4IHJnYmEoMCwgMCwgMCwgMC4zKVxyXG59XHJcblxyXG4uYnRuLXJlZC1tYXtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjOTMwMmM7XHJcbn1cclxuXHJcbmlucHV0Om5vdChbdHlwZT1zdWJtaXRdKXsgaGVpZ2h0OiA0OHB4OyB9XHJcblxyXG4udGl0bGV7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBjb2xvcjogcmdiKDg4LCA4OCwgODgpO1xyXG59XHJcblxyXG5pbWd7XHJcbiAgICB3aWR0aDogNjBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxufVxyXG5cclxuLmZvcm0tbWF7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4OyBcclxufVxyXG5cclxuaHJ7IFxyXG4gICAgZGlzcGxheTogYmxvY2s7IFxyXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDsgXHJcbiAgICB3aWR0aDogOTAlOyBcclxufVxyXG5cclxuaW5wdXRbdHlwZT1zdWJtaXRde1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICdPeHlnZW4nLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4udmVydGljYWwtYWxpZ24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5idG57XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQ6IHJnYigxMDQsIDE0NSwgMTYyKTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLnByb2ZpbGUtaW1nLWNhcmR7XHJcbiAgICB3aWR0aDogOTZweDtcclxuICAgIGhlaWdodDogOTZweDtcclxuICAgIG1hcmdpbjogMCBhdXRvIDA7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/components/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  <div class=\"alert alert-success notification\" *ngIf=\"status == 'success'\">\n      Te has identificado correctamente. Se te redirigirá en seguida.\n    </div>\n  \n    <div class=\"alert alert-danger notification\" *ngIf=\"status == 'error'\">\n      Error al identificarse. Inténtalo de nuevo\n    </div>\n\n<div class=\"container-fluid col-md-3 container-ma\">\n  <div class=\"row form-ma\">\n    <!-- <div class=\"d-flex justify-content-center\"> -->\n    <div class=\"col-md-12 text-center\">\n      <img id=\"profile-img\" class=\"profile-img-card\" src=\"assets/img/register.png\">\n      <div class=\"title mb-3\">\n        <span>Login</span>\n      </div>\n    </div>\n    <!-- </div> -->\n  </div>\n\n  <div class=\"row form-ma\">\n    <form class=\"col-md-12\" #loginForm=\"ngForm\" (ngSubmit)=\"onSubmit(loginForm)\">\n      \n      <div class=\"form-group\">\n        <input type=\"text\" name=\"login\" #login=\"ngModel\" [(ngModel)]=\"user.login\" class=\"form-control\" required pattern=\"[A-z0-9_-]+(@[a-z0-9.-]+\\.[a-z]{2,4})*\"\n          placeholder=\"Nick / Email\">\n\n        <small *ngIf=\"!login.valid && login.touched\" class=\"invalid-feedback d-block\">\n          Usuario no válido. Por favor, introduce tu nick o tu email aquí.\n        </small>\n      </div>\n\n      <div class=\"form-group\">\n        <input type=\"password\" name=\"password\" #password=\"ngModel\" [(ngModel)]=\"user.password\" class=\"form-control\"\n          required pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\" placeholder=\"Contraseña\">\n\n        <small *ngIf=\"!password.valid && password.touched\" class=\"invalid-feedback d-block\">\n          Contraseña no válida. Mínimo 8 caracteres. Debe contener al menos una letra mayúscula, un número.\n        </small>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-6 vertical-align\">\n          <input type=\"checkbox\"> Recordarme\n        </div>\n        <div class=\"col-md-12 pt-2 pb-2\">\n          <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"loginForm.invalid\">Iniciar sesión</button>\n        </div>\n        <div class=\"col-md-12 text-left pt-2\">\n          <a href=#>Olvidé mi contraseña</a>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../app.component */ "./src/app/app.component.ts");







var LoginComponent = /** @class */ (function () {
    function LoginComponent(_userService, _commonService, _appComponent, _router, _route) {
        this._userService = _userService;
        this._commonService = _commonService;
        this._appComponent = _appComponent;
        this._router = _router;
        this._route = _route;
        this.page_title = "Identifícate";
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_3__["User"](1, '', '', '', '', '', 'ROLE_USER', '', '');
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.logout();
        if (localStorage.getItem("config") == "undefined" || localStorage.getItem("config") == null) {
            var config = {
                nightMode: 0,
                nsfw: 0,
                epilepsy: 0,
                color: "blue",
                lang: "spanish",
                share: true,
                feed: 15
            };
            var configJSON = JSON.stringify(config);
            localStorage.setItem("config", configJSON);
        }
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
    };
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this._userService.signup(this.user).subscribe(function (response) {
            if (!response.status || response.status != 'error') {
                _this.status = 'success';
                _this._commonService.displayNotification(_this);
                _this.identity = response;
                // Token
                _this._userService.signup(_this.user, true).subscribe(function (response) {
                    if (!response.status || response.status != 'error') {
                        _this.status = 'success';
                        _this._commonService.displayNotification(_this);
                        _this.token = response;
                        _this._commonService.getUserConfig(_this, _this.token);
                        localStorage.setItem('token', _this.token);
                        localStorage.setItem('identity', JSON.stringify(_this.identity));
                        localStorage.removeItem("config");
                        _this.updateDB(_this.token);
                        setTimeout(function () { _this._router.navigate(['home']); }, 1000);
                    }
                    else {
                        _this.status = 'error';
                        _this._commonService.displayNotification(_this);
                    }
                }, function (error) {
                    _this.status = 'error';
                    _this._commonService.displayNotification(_this);
                });
                form.reset();
            }
            else {
                _this.status = 'error';
                _this._commonService.displayNotification(_this);
            }
        }, function (error) {
            _this.status = 'error';
            _this._commonService.displayNotification(_this);
        });
    };
    LoginComponent.prototype.logout = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var sure = +params['sure'];
            if (sure == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                localStorage.removeItem('config');
                _this.identity = null;
                _this.token = null;
                _this._router.navigate(['home']);
            }
        });
    };
    LoginComponent.prototype.updateDB = function (token) {
        var _this = this;
        this._userService.getConfig(token).subscribe(function (response) {
            if (response.status == "error") {
                _this.isFirst = true;
                _this.config = {
                    nightMode: 0,
                    nsfw: 0,
                    epilepsy: 0,
                    color: "blue",
                    lang: "spanish",
                    share: true,
                    feed: 15
                };
                _this.configJSON = JSON.stringify(_this.config);
                _this._commonService.setUserConfig(_this, _this.token, _this.configJSON);
            }
        }, function (error) { });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/components/login/login.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"], _services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]],
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/components/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/components/profile/favs.component.ts":
/*!******************************************************!*\
  !*** ./src/app/components/profile/favs.component.ts ***!
  \******************************************************/
/*! exports provided: FavsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavsComponent", function() { return FavsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var FavsComponent = /** @class */ (function () {
    function FavsComponent(_userService, _imageService, _commonService, _route, _router, render) {
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._route = _route;
        this._router = _router;
        this.render = render;
        this.username = window.location.href.split("/");
        for (var i = 0; i < this.username.length; i++) {
            if (this.username[i] == "profile" && (i + 1) < this.username.length) {
                this.username = this.username[i + 1];
            }
        }
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.interaction = "faved";
        this.page = 1;
    }
    FavsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadUser();
        this._userService.userInfo(this, this.username);
        this._route.params.subscribe(function (params) {
            if (!_this.page) {
                _this.page = 1;
                _this.prev_page = 1;
                _this.next_page = 2;
            }
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                _this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                _this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
        });
        this._userService.getUserByNick(this.username).subscribe(function (response) {
            console.log(response);
            _this.id = response.user_info.id;
            _this.getLikedPics();
        }, function (error) {
            console.log(error);
        });
    };
    FavsComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    };
    FavsComponent.prototype.getLikedPics = function () {
        if (this.username != this.identity.nick) {
            this._imageService.showProfileInteractions(this, this.page, this.nsfw, this.epilepsy, this.id, this.interaction, this.username);
        }
        else {
            this._imageService.showProfileInteractions(this, this.page, "true", "true", this.id, this.interaction, this.username);
        }
    };
    FavsComponent.prototype.nextPage = function (param) {
        if (param == "++") {
            this.page++;
        }
        else if (param == "--") {
            this.page--;
        }
        else {
            this.page = param;
        }
        this.ngOnInit();
    };
    FavsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'favs-component',
            template: "\n  <div class=\"container-images\">\n    <div class=\"box grid-col-{{i+1}} pb-5\" *ngFor=\"let image of images; let i = index\">\n      <div id=\"image-box\">\n        <div #imageParent class=\"image-parent\" id=\"hover-parent\">\n          <a [routerLink]=\"['/images', image[0].id]\">\n            <img src=\"assets/public/{{image[0].url}}\" class=\"image-element\" id=\"id-{{image[0].id}}\" (mouseleave)=\"_imageService.out($event, this, null);\">\n          </a>\n          <span class=\"image-description\">\n            {{image[0].name}}\n            <br>\n            <span class=\"image-by\">\n              by <span class=\"image-user\">{{image.username}}</span>\n            </span>\n          </span>\n          <div class=\"image-action\" *ngIf=\"identity && identity.nick != 'guest'\">\n            <img class=\"image-frame like\" src=\"assets/img/image-like-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-heart\" (mouseover)=\"_imageService.in($event, this, 1);\" (mouseleave)=\"_imageService.out($event, this, 1);\" (click)=\"_imageService.saveInteraction($event, this, 'like');\"></div>\n            <img class=\"image-frame fav\" src=\"assets/img/image-fav-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-star\" (mouseover)=\"_imageService.in($event, this, 2);\" (mouseleave)=\"_imageService.out($event, this, 2);\" (click)=\"_imageService.saveInteraction($event, this, 'fav');\"></div>\n            <img class=\"image-frame share\" src=\"assets/img/image-share-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-arrows\" (mouseover)=\"_imageService.in($event,this, 3);\" (mouseleave)=\"_imageService.out($event, this, 3);\" (click)=\"_imageService.saveInteraction($event, this, 'share');\"></div>\n          </div>\n        </div>\n        <!-- <img src=\"../api-rest-symfony/public/storage/images/image-example.jpg\" class=\"image-element\"> -->\n      </div>\n    </div>\n  </div>\n  \n  <nav aria-label=\"Page navigation example\">\n  <ul class=\"pagination profile-pagination float-right\">\n    <li *ngIf=\"page != 1 && total_pages > 1\">\n      <a class=\"page-link\" (click)=\"nextPage('--')\">Anterior</a>\n    </li>\n    <li *ngFor=\"let num of number_pages; let i = index\">\n      <a class=\"page-link\" *ngIf=\"i<5\" (click)=\"nextPage(num)\" [ngClass]=\"{'active': num == page}\">{{num}}</a>\n      <!-- Cambiar para que si p.e est\u00E1s en la p\u00E1g 20, salga 18 - 19 - 20 - 21 - 22 -->\n    </li>\n    <li *ngIf=\"page != total_pages && total_pages > 1\">\n      <!--  && total_pages > 1 -->\n      <a class=\"page-link\" (click)=\"nextPage('++')\">Siguiente</a>\n    </li>\n  </ul>\n  </nav>\n  ",
            // styleUrls: ['./home.component.css'],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], FavsComponent);
    return FavsComponent;
}());



/***/ }),

/***/ "./src/app/components/profile/likes.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/profile/likes.component.ts ***!
  \*******************************************************/
/*! exports provided: LikesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LikesComponent", function() { return LikesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var LikesComponent = /** @class */ (function () {
    function LikesComponent(_userService, _imageService, _commonService, _route, _router, render) {
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._route = _route;
        this._router = _router;
        this.render = render;
        this.username = window.location.href.split("/");
        for (var i = 0; i < this.username.length; i++) {
            if (this.username[i] == "profile" && (i + 1) < this.username.length) {
                this.username = this.username[i + 1];
            }
        }
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.interaction = "liked";
        this.page = 1;
    }
    LikesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadUser();
        this._userService.userInfo(this, this.username);
        this._route.params.subscribe(function (params) {
            if (!_this.page) {
                _this.page = 1;
                _this.prev_page = 1;
                _this.next_page = 2;
            }
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                _this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                _this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
        });
        this._userService.getUserByNick(this.username).subscribe(function (response) {
            console.log(response);
            _this.id = response.user_info.id;
            _this.getLikedPics();
        }, function (error) {
            console.log(error);
        });
    };
    LikesComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        if (this.identity == null) {
            this.identity = {
                id: 0,
                nick: 'guest'
            };
        }
    };
    LikesComponent.prototype.getLikedPics = function () {
        if (this.username != this.identity.nick) {
            this._imageService.showProfileInteractions(this, this.page, this.nsfw, this.epilepsy, this.id, this.interaction, this.username);
        }
        else {
            this._imageService.showProfileInteractions(this, this.page, "true", "true", this.id, this.interaction, this.username);
        }
    };
    LikesComponent.prototype.nextPage = function (param) {
        if (param == "++") {
            this.page++;
        }
        else if (param == "--") {
            this.page--;
        }
        else {
            this.page = param;
        }
        this.ngOnInit();
    };
    LikesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'likes-component',
            template: "\n  <div class=\"container-images\">\n    <div class=\"box grid-col-{{i+1}} pb-5\" *ngFor=\"let image of images; let i = index\">\n      <div id=\"image-box\">\n        <div #imageParent class=\"image-parent\" id=\"hover-parent\">\n          <a [routerLink]=\"['/images', image[0].id]\">\n            <img src=\"assets/public/{{image[0].url}}\" class=\"image-element\" id=\"id-{{image[0].id}}\" (mouseleave)=\"_imageService.out($event, this, null);\">\n          </a>\n          <span class=\"image-description\">\n            {{image[0].name}}\n            <br>\n            <span class=\"image-by\">\n              by <span class=\"image-user\">{{image.username}}</span>\n            </span>\n          </span>\n          <div class=\"image-action\" *ngIf=\"identity && identity.nick != 'guest'\">\n            <img class=\"image-frame like\" src=\"assets/img/image-like-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-heart\" (mouseover)=\"_imageService.in($event, this, 1);\" (mouseleave)=\"_imageService.out($event, this, 1);\" (click)=\"_imageService.saveInteraction($event, this, 'like');\"></div>\n            <img class=\"image-frame fav\" src=\"assets/img/image-fav-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-star\" (mouseover)=\"_imageService.in($event, this, 2);\" (mouseleave)=\"_imageService.out($event, this, 2);\" (click)=\"_imageService.saveInteraction($event, this, 'fav');\"></div>\n            <img class=\"image-frame share\" src=\"assets/img/image-share-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-arrows\" (mouseover)=\"_imageService.in($event,this, 3);\" (mouseleave)=\"_imageService.out($event, this, 3);\" (click)=\"_imageService.saveInteraction($event, this, 'share');\"></div>\n          </div>\n        </div>\n        <!-- <img src=\"../api-rest-symfony/public/storage/images/image-example.jpg\" class=\"image-element\"> -->\n      </div>\n    </div>\n  </div>\n\n  <nav aria-label=\"Page navigation example\">\n  <ul class=\"pagination profile-pagination float-right\">\n    <li *ngIf=\"page != 1 && total_pages > 1\">\n      <a class=\"page-link\" (click)=\"nextPage('--')\">Anterior</a>\n    </li>\n    <li *ngFor=\"let num of number_pages; let i = index\">\n      <a class=\"page-link\" *ngIf=\"i<5\" (click)=\"nextPage(num)\" [ngClass]=\"{'active': num == page}\">{{num}}</a>\n      <!-- Cambiar para que si p.e est\u00E1s en la p\u00E1g 20, salga 18 - 19 - 20 - 21 - 22 -->\n    </li>\n    <li *ngIf=\"page != total_pages && total_pages > 1\">\n      <!--  && total_pages > 1 -->\n      <a class=\"page-link\" (click)=\"nextPage('++')\">Siguiente</a>\n    </li>\n  </ul>\n  </nav>\n  ",
            // styleUrls: ['./home.component.css'],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], LikesComponent);
    return LikesComponent;
}());



/***/ }),

/***/ "./src/app/components/profile/profile.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/profile/profile.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    margin-top: 40px; \r\n    margin-bottom: 20px; \r\n    border-radius: 5px; \r\n    padding-top: 30px;\r\n    /* padding-bottom: 40px; */\r\n    width: 100%;\r\n    min-height: 70vh;\r\n    font-family: 'M PLUS Rounded 1c', sans-serif;\r\n}\r\n\r\n.profile-picture{\r\n    width: 160px; \r\n    height: 160px;\r\n    border-radius: 50%;\r\n}\r\n\r\n.user{\r\n    font-size: 40px;\r\n    font-weight: bold;\r\n}\r\n\r\n.followers, .following{\r\n    font-size: 20px;\r\n    font-weight: bold;\r\n}\r\n\r\n.followers span, .following span{ margin-left: 10px;}\r\n\r\n.description{\r\n    width: 95%;\r\n    height: 125px;\r\n    border-radius: 10px;\r\n    border: 1px solid lightgray;\r\n    padding: 10px 20px;\r\n    font-size: 18px;\r\n    word-break: break-all;\r\n\toverflow-y: scroll;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.profile-navbar{\r\n    font-size: 35px;\r\n    padding-left: 95px;\r\n}\r\n\r\n.profile-navbar span:hover{\r\n    cursor: pointer;\r\n    padding-bottom: 1px;\r\n}\r\n\r\n.chosen{\r\n    padding-bottom: 1px;\r\n}\r\n\r\n.profile-navbar-content{\r\n    background: rgba(9, 124, 218, 0.233);\r\n    width: 90%;\r\n}\r\n\r\n.day-container .profile-navbar{\r\n    color: rgb(116, 116, 116);\r\n}\r\n\r\n.day-container .profile-navbar span:hover{\r\n    border-bottom: 1.3px solid rgba(0, 0, 0, 0.603);\r\n}\r\n\r\n.day-container .chosen{\r\n    color: rgb(66, 66, 66);\r\n    border-bottom: 1.3px solid rgba(0, 0, 0, 0.603);\r\n}\r\n\r\n.night-container .profile-navbar{\r\n    color: rgb(134, 134, 134);\r\n}\r\n\r\n.night-container .profile-navbar span:hover{\r\n    border-bottom: 1.3px solid rgba(238, 238, 238, 0.603);\r\n}\r\n\r\n.night-container .chosen{\r\n    color: rgb(255, 255, 255);\r\n    border-bottom: 1.3px solid rgba(238, 238, 238, 0.603);\r\n}\r\n\r\n.images-container{\r\n    min-height: 40vh;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n    width: 10px;\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n    -webkit-box-shadow: none;\r\n    border-radius: 0px;\r\n    background: none;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n    border-radius: 10px;\r\n    background: rgba(0, 183, 255, 0.8); \r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQiwwQkFBMEI7SUFDMUIsV0FBVztJQUNYLGdCQUFnQjtJQUNoQiw0Q0FBNEM7QUFDaEQ7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsaUJBQWlCO0FBQ3JCOztBQUVBLGtDQUFrQyxpQkFBaUIsQ0FBQzs7QUFFcEQ7SUFDSSxVQUFVO0lBQ1YsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQiwyQkFBMkI7SUFDM0Isa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixxQkFBcUI7Q0FDeEIsa0JBQWtCO0lBQ2YsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxvQ0FBb0M7SUFDcEMsVUFBVTtBQUNkOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUNBO0lBQ0ksK0NBQStDO0FBQ25EOztBQUNBO0lBQ0ksc0JBQXNCO0lBQ3RCLCtDQUErQztBQUNuRDs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFDQTtJQUNJLHFEQUFxRDtBQUN6RDs7QUFDQTtJQUNJLHlCQUF5QjtJQUN6QixxREFBcUQ7QUFDekQ7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBR0E7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx3QkFBd0I7SUFFeEIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUVJLG1CQUFtQjtJQUNuQixrQ0FBa0M7QUFDdEMiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lci1tYXsgXHJcbiAgICBtYXJnaW4tdG9wOiA0MHB4OyBcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7IFxyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4OyBcclxuICAgIHBhZGRpbmctdG9wOiAzMHB4O1xyXG4gICAgLyogcGFkZGluZy1ib3R0b206IDQwcHg7ICovXHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1pbi1oZWlnaHQ6IDcwdmg7XHJcbiAgICBmb250LWZhbWlseTogJ00gUExVUyBSb3VuZGVkIDFjJywgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLnByb2ZpbGUtcGljdHVyZXtcclxuICAgIHdpZHRoOiAxNjBweDsgXHJcbiAgICBoZWlnaHQ6IDE2MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcblxyXG4udXNlcntcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uZm9sbG93ZXJzLCAuZm9sbG93aW5ne1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5mb2xsb3dlcnMgc3BhbiwgLmZvbGxvd2luZyBzcGFueyBtYXJnaW4tbGVmdDogMTBweDt9XHJcblxyXG4uZGVzY3JpcHRpb257XHJcbiAgICB3aWR0aDogOTUlO1xyXG4gICAgaGVpZ2h0OiAxMjVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XHJcblx0b3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbn1cclxuXHJcbi5wcm9maWxlLW5hdmJhcntcclxuICAgIGZvbnQtc2l6ZTogMzVweDtcclxuICAgIHBhZGRpbmctbGVmdDogOTVweDtcclxufVxyXG5cclxuLnByb2ZpbGUtbmF2YmFyIHNwYW46aG92ZXJ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMXB4O1xyXG59XHJcblxyXG4uY2hvc2Vue1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFweDtcclxufVxyXG5cclxuLnByb2ZpbGUtbmF2YmFyLWNvbnRlbnR7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDksIDEyNCwgMjE4LCAwLjIzMyk7XHJcbiAgICB3aWR0aDogOTAlO1xyXG59XHJcblxyXG4uZGF5LWNvbnRhaW5lciAucHJvZmlsZS1uYXZiYXJ7XHJcbiAgICBjb2xvcjogcmdiKDExNiwgMTE2LCAxMTYpO1xyXG59XHJcbi5kYXktY29udGFpbmVyIC5wcm9maWxlLW5hdmJhciBzcGFuOmhvdmVye1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMS4zcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjYwMyk7XHJcbn1cclxuLmRheS1jb250YWluZXIgLmNob3NlbntcclxuICAgIGNvbG9yOiByZ2IoNjYsIDY2LCA2Nik7XHJcbiAgICBib3JkZXItYm90dG9tOiAxLjNweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuNjAzKTtcclxufVxyXG5cclxuLm5pZ2h0LWNvbnRhaW5lciAucHJvZmlsZS1uYXZiYXJ7XHJcbiAgICBjb2xvcjogcmdiKDEzNCwgMTM0LCAxMzQpO1xyXG59XHJcbi5uaWdodC1jb250YWluZXIgLnByb2ZpbGUtbmF2YmFyIHNwYW46aG92ZXJ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxLjNweCBzb2xpZCByZ2JhKDIzOCwgMjM4LCAyMzgsIDAuNjAzKTtcclxufVxyXG4ubmlnaHQtY29udGFpbmVyIC5jaG9zZW57XHJcbiAgICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMS4zcHggc29saWQgcmdiYSgyMzgsIDIzOCwgMjM4LCAwLjYwMyk7XHJcbn1cclxuXHJcbi5pbWFnZXMtY29udGFpbmVye1xyXG4gICAgbWluLWhlaWdodDogNDB2aDtcclxufVxyXG5cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgd2lkdGg6IDEwcHg7XHJcbn1cclxuIFxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTsgXHJcbiAgICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDBweDtcclxuICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbn1cclxuIFxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDE4MywgMjU1LCAwLjgpOyBcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/profile/profile.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/profile/profile.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid col-md-12 container-ma\">\n  <div *ngIf=\"found==true\">\n    <div class=\"row\">\n      <div class=\"col-md-2 pl-5 ml-3\">\n        <img [src]=\"_imageURL\" class=\"profile-picture\">\n      </div>\n      <div class=\"col\">\n        <div class=\"row pt-3 pl-2\">\n          <span class=\"user\">{{username}}</span>\n        </div>\n        <div class=\"row pt-4\">\n          <button type=\"button\" class=\"button button-follow no-follow\" *ngIf=\"this.username != this.identity.nick\"\n            (click)=\"follow(token, username)\"></button><!-- {{followStatus}} -->\n          <button type=\"button\" [routerLink]=\"['/edit']\" class=\"button button-edit edit\" *ngIf=\"this.username == this.identity.nick\">Editar</button>\n        </div>\n      </div>\n      <div class=\"col-md-2 pt-4\">\n        <div class=\"row pt-3 followers\">Seguidores<span>{{followers}}</span></div>\n        <div class=\"row pt-4 following\">Siguiendo<span>{{following}}</span></div>\n      </div>\n      <div class=\"col-md-6 pt-3\">\n        <div class=\"description\">\n          <span *ngIf=\"description != null else nodesc\">{{description}}</span>\n          <ng-template #nodesc>\n              <span>El usuario no ha agregado ninguna descripción.</span>\n            </ng-template>\n        </div>\n      </div>\n    </div>\n    <hr class=\"index-title mt-5\">\n    <div class=\"row profile-navbar mt-4\">\n      <div class=\"col-md-2 pr-5\">\n        <span class=\"chosen\" (click)=\"pickElement($event,1)\">Imágenes</span>\n      </div>\n      <div class=\"col-md-1 mr-5\">\n        <span (click)=\"pickElement($event,2)\">Likes</span>\n      </div>\n      <div class=\"col-md-2\" *ngIf=\"this.username == this.identity.nick\">\n        <span (click)=\"pickElement($event,3)\">Favs</span>\n      </div>\n    </div>\n    <div class=\"container-fluid col-md-12 profile-na  vbar-content mt-5\">\n      <div class=\"row\">\n        <div class=\"col-md-12 images-container\">\n          <images-component *ngIf=\"this.element == 1\"></images-component>\n          <likes-component *ngIf=\"this.element == 2\"></likes-component>\n          <favs-component *ngIf=\"this.element == 3\"></favs-component>\n        </div> <!-- Aquí cargaremos los componentes de Imágenes, Likes y Favs en función de cual esté seleccionado. -->\n      </div>\n    </div>\n  </div>\n  <div class=\"container-fluid error\" *ngIf=\"found==false\">\n    <img src=\"assets/img/404.png\">\n    <h2>El usuario no existe o ha borrado su cuenta.</h2>\n    <p>Si crees que es un error de la página, por favor contáctanos en sistemas@moonart.com</p>\n    <a [routerLink]=\"['/home']\"> Volver al inicio </a>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/profile/profile.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/profile/profile.component.ts ***!
  \*********************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(_userService, _imageService, _commonService, _route, _router, render) {
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._route = _route;
        this._router = _router;
        this.render = render;
        this.page_title = "Profile";
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.username = window.location.href.split("/");
        for (var i = 0; i < this.username.length; i++) {
            if (this.username[i] == "profile" && (i + 1) < this.username.length) {
                this.username = this.username[i + 1];
            }
        }
        // this.username = "Nao";
        this.followStatus = "Seguir";
        this.tab = "images";
        this.followers = 0;
        this.following = 0;
        this.fllwError = 0;
        this.userError = 0;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadUser();
        this.tab = window.location.href.split("/");
        this.tab = this.tab[this.tab.length - 2];
        this.element = 1;
        if (this.tab == "likes") {
            this.element = 2;
        }
        else if (this.tab == "favs") {
            this.element = 3;
        }
        else {
            this.element = 1;
        }
        this.getUserData();
        this._route.params.subscribe(function (params) {
            _this.page = +params['page'];
            if (!_this.page) {
                _this.page = 1;
                _this.prev_page = 1;
                _this.next_page = 2;
            }
            /*
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
            */
            // this.getImages(this.page, this.user);
        });
        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        }
        this._userService.checkFollowing(this);
    };
    ProfileComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        if (this.identity == null) {
            this.identity = {
                id: 0,
                nick: 'guest'
            };
        }
    };
    ProfileComponent.prototype.pickElement = function (event, element) {
        this.render.removeClass(document.querySelector(".chosen"), "chosen");
        this.render.addClass(event.target, "chosen");
        this.element = element;
    };
    ProfileComponent.prototype.follow = function (token, nick) {
        var _this = this;
        this._userService.follow(token, nick).subscribe(function (response) {
            if (response.status == "success") {
                _this._userService.checkFollowing(_this);
                _this.getUserData();
            }
        }, function (error) {
            console.log("Ero");
        });
    };
    ProfileComponent.prototype.getUserData = function () {
        var _this = this;
        this._userService.getUserByNick(this.username).subscribe(function (response) {
            // console.log(response);
            if (response.status == "success") {
                console.log(response);
                _this._imageURL = "assets/profile-picture/" + response.user_info.image;
                _this.found = true;
                _this.description = response.user_info.description;
                _this._userService.getUserFollows(response.user_info.id).subscribe(function (response) {
                    if (response.status == "success") {
                        _this.followers = response.followers;
                        _this.following = response.following;
                    }
                }, function (error) {
                    console.log("getUserFollows()");
                    console.log("Ero..." + " attempt: " + _this.fllwError);
                    if (_this.fllwError < 5) {
                        _this.getUserData();
                        _this.fllwError++;
                    }
                });
            }
            else {
                _this.found = false;
            }
        }, function (error) {
            console.log("getUserByNick()");
            console.log("Ero..." + " attempt: " + _this.userError);
            if (_this.userError < 5) {
                _this.getUserData();
                _this.userError++;
            }
        });
    };
    ProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/components/profile/profile.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]],
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/components/profile/profile.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/components/profile/userImages.component.ts":
/*!************************************************************!*\
  !*** ./src/app/components/profile/userImages.component.ts ***!
  \************************************************************/
/*! exports provided: ImagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImagesComponent", function() { return ImagesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var ImagesComponent = /** @class */ (function () {
    function ImagesComponent(_userService, _imageService, _commonService, _route, _router, render) {
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._route = _route;
        this._router = _router;
        this.render = render;
        this.username = window.location.href.split("/");
        for (var i = 0; i < this.username.length; i++) {
            if (this.username[i] == "profile" && (i + 1) < this.username.length) {
                this.username = this.username[i + 1];
            }
        }
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.page = 1;
    }
    ImagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadUser();
        this._route.params.subscribe(function (params) {
            if (!_this.page) {
                _this.page = 1;
                _this.prev_page = 1;
                _this.next_page = 2;
            }
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                _this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                _this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
            if (_this.username != _this.identity.nick) {
                _this._imageService.showAllImages(_this, _this.page, _this.nsfw, _this.epilepsy, _this.username);
            }
            else {
                _this._imageService.showAllImages(_this, _this.page, "true", "true", _this.username, true);
            }
        });
    };
    ImagesComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        if (this.identity == null) {
            this.identity = {
                id: 0,
                nick: 'guest'
            };
        }
    };
    ImagesComponent.prototype.nextPage = function (param) {
        if (param == "++") {
            this.page++;
        }
        else if (param == "--") {
            this.page--;
        }
        else {
            this.page = param;
        }
        this.ngOnInit();
    };
    ImagesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'images-component',
            template: "\n  <div class=\"container-images\">\n    <div class=\"box grid-col-{{i+1}} pb-5\" *ngFor=\"let image of images; let i = index\">\n      <div id=\"image-box\">\n        <div #imageParent class=\"image-parent\" id=\"hover-parent\">\n          <a [routerLink]=\"['/images', image[0].id]\">\n            <img src=\"assets/public/{{image[0].url}}\" class=\"image-element\" [class.hidden]=\"image[0].status == 'hidden'\" id=\"id-{{image[0].id}}\" (mouseleave)=\"_imageService.out($event, this, null);\">\n          </a>\n          <span class=\"image-description\">\n            {{image[0].name}}\n            <br>\n            <span class=\"image-by\">\n              by <span class=\"image-user\">{{image.username}}</span>\n            </span>\n          </span>\n          <div class=\"image-action\" *ngIf=\"identity && identity.nick != 'guest'\">\n            <img class=\"image-frame like\" src=\"assets/img/image-like-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-heart\" (mouseover)=\"_imageService.in($event, this, 1);\" (mouseleave)=\"_imageService.out($event, this, 1);\" (click)=\"_imageService.saveInteraction($event, this, 'like');\"></div>\n            <img class=\"image-frame fav\" src=\"assets/img/image-fav-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-star\" (mouseover)=\"_imageService.in($event, this, 2);\" (mouseleave)=\"_imageService.out($event, this, 2);\" (click)=\"_imageService.saveInteraction($event, this, 'fav');\"></div>\n            <img class=\"image-frame share\" src=\"assets/img/image-share-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-arrows\" (mouseover)=\"_imageService.in($event,this, 3);\" (mouseleave)=\"_imageService.out($event, this, 3);\" (click)=\"_imageService.saveInteraction($event, this, 'share');\"></div>\n          </div>\n        </div>\n        <!-- <img src=\"../api-rest-symfony/public/storage/images/image-example.jpg\" class=\"image-element\"> -->\n      </div>\n    </div>\n  </div>\n  \n  <nav aria-label=\"Page navigation example\">\n  <ul class=\"pagination profile-pagination float-right\">\n    <li *ngIf=\"page != 1 && total_pages > 1\">\n      <a class=\"page-link\" (click)=\"nextPage('--')\">Anterior</a>\n    </li>\n    <li *ngFor=\"let num of number_pages; let i = index\">\n      <a class=\"page-link\" *ngIf=\"i<5\" (click)=\"nextPage(num)\" [ngClass]=\"{'active': num == page}\">{{num}}</a>\n      <!-- Cambiar para que si p.e est\u00E1s en la p\u00E1g 20, salga 18 - 19 - 20 - 21 - 22 -->\n    </li>\n    <li *ngIf=\"page != total_pages && total_pages > 1\">\n      <!--  && total_pages > 1 -->\n      <a class=\"page-link\" (click)=\"nextPage('++')\">Siguiente</a>\n    </li>\n  </ul>\n  </nav>\n  ",
            // styleUrls: ['./home.component.css'],
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], ImagesComponent);
    return ImagesComponent;
}());



/***/ }),

/***/ "./src/app/components/register/register.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/register/register.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    margin-top: 40px; \r\n    margin-bottom: 40px; \r\n    border-radius: 5px; \r\n    padding-top: 30px;\r\n    padding-bottom: 40px;\r\n    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3)\r\n}\r\n\r\ninput:not([type=submit]){ height: 48px; }\r\n\r\n.title{\r\n    font-size: 40px;\r\n    color: rgb(88, 88, 88);\r\n}\r\n\r\nimg{\r\n    width: 60px;\r\n    margin-right: 15px;\r\n}\r\n\r\n.form-ma{\r\n    padding-left: 30px;\r\n    padding-right: 30px; \r\n}\r\n\r\nhr{ display: block; margin-bottom: 40px; width: 90%; }\r\n\r\ninput[type=submit]{\r\n    letter-spacing: 0.5px;\r\n    font-family: 'Oxygen', sans-serif;\r\n}\r\n\r\n.btn{\r\n    width: 100%;\r\n    background: rgb(104, 145, 162);\r\n    border: none;\r\n}\r\n\r\n.btn-red-ma{\r\n    background-color: #c9302c;\r\n}\r\n\r\n.profile-img-card{\r\n    width: 96px;\r\n    height: 96px;\r\n    margin: 0 auto 0;\r\n    display: block;\r\n    border-radius: 50%;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQjtBQUNKOztBQUVBLDBCQUEwQixZQUFZLEVBQUU7O0FBRXhDO0lBQ0ksZUFBZTtJQUNmLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0FBQ3ZCOztBQUVBLElBQUksY0FBYyxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRTs7QUFFckQ7SUFDSSxxQkFBcUI7SUFDckIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksV0FBVztJQUNYLDhCQUE4QjtJQUM5QixZQUFZO0FBQ2hCOztBQUdBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsY0FBYztJQUdkLGtCQUFrQjtBQUN0QiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXItbWF7IFxyXG4gICAgbWFyZ2luLXRvcDogNDBweDsgXHJcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4OyBcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDsgXHJcbiAgICBwYWRkaW5nLXRvcDogMzBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA0MHB4O1xyXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAycHggcmdiYSgwLCAwLCAwLCAwLjMpXHJcbn1cclxuXHJcbmlucHV0Om5vdChbdHlwZT1zdWJtaXRdKXsgaGVpZ2h0OiA0OHB4OyB9XHJcblxyXG4udGl0bGV7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBjb2xvcjogcmdiKDg4LCA4OCwgODgpO1xyXG59XHJcblxyXG5pbWd7XHJcbiAgICB3aWR0aDogNjBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxufVxyXG5cclxuLmZvcm0tbWF7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4OyBcclxufVxyXG5cclxuaHJ7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW4tYm90dG9tOiA0MHB4OyB3aWR0aDogOTAlOyB9XHJcblxyXG5pbnB1dFt0eXBlPXN1Ym1pdF17XHJcbiAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XHJcbiAgICBmb250LWZhbWlseTogJ094eWdlbicsIHNhbnMtc2VyaWY7XHJcbn1cclxuXHJcbi5idG57XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJhY2tncm91bmQ6IHJnYigxMDQsIDE0NSwgMTYyKTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuXHJcbi5idG4tcmVkLW1he1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2M5MzAyYztcclxufVxyXG5cclxuLnByb2ZpbGUtaW1nLWNhcmR7XHJcbiAgICB3aWR0aDogOTZweDtcclxuICAgIGhlaWdodDogOTZweDtcclxuICAgIG1hcmdpbjogMCBhdXRvIDA7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/register/register.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/register/register.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-success notification\" *ngIf=\"status == 'success'\">\n  Te has registrado correctamente, <a [routerLink]=\"['/login']\">identifícate aquí</a>\n</div>\n\n<div class=\"alert alert-danger notification\" *ngIf=\"status == 'error'\">\n  No te has registrado. Consulta la consola para ver el error.\n</div>\n\n<div class=\"container-fluid col-md-3 container-ma\">\n  <div class=\"row form-ma\">\n    <!-- <div class=\"d-flex justify-content-center\"> -->\n    <div class=\"col-md-12 text-center\">\n      <img id=\"profile-img\" class=\"profile-img-card\" src=\"assets/img/register.png\">\n      <div class=\"title mb-3\">\n        <span>Registro</span>\n      </div>\n    </div>\n    <!-- </div> -->\n  </div>\n\n  <div class=\"row form-ma\">\n    <form class=\"col-md-12\" #registerForm=\"ngForm\" (ngSubmit)=\"onSubmit(registerForm)\">\n      <div class=\"form-group\">\n        <input type=\"text\" name=\"name\" #name=\"ngModel\" [(ngModel)]=\"user.name\" class=\"form-control\" required pattern=\"[A-zÁÉÍÓÚÀÈÌÒÙáéíóúàèìòùñ \\s]+\"\n          placeholder=\"Nombre\">\n\n        <small *ngIf=\"!name.valid && name.touched\" class=\"invalid-feedback d-block\">\n          Nombre no válido.\n        </small>\n      </div>\n\n      <div class=\"form-group\">\n        <input type=\"text\" name=\"nick\" #nick=\"ngModel\" [(ngModel)]=\"user.nick\" class=\"form-control\" required pattern=\"[A-z0-9_-]+\"\n          maxlength=\"10\" placeholder=\"Nick (Máx 10 caracteres)\">\n\n        <small *ngIf=\"!nick.valid && nick.touched\" class=\"invalid-feedback d-block\">\n          Nick no válido.\n        </small>\n      </div>\n\n      <div class=\"form-group\">\n        <input type=\"email\" name=\"email\" #email=\"ngModel\" [(ngModel)]=\"user.email\" class=\"form-control\" required\n          pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$\" placeholder=\"Email\">\n\n        <small *ngIf=\"!email.valid && email.touched\" class=\"invalid-feedback d-block\">\n          Email no válido.\n        </small>\n      </div>\n\n      <div class=\"form-group\">\n        <input type=\"password\" name=\"password\" #password=\"ngModel\" [(ngModel)]=\"user.password\" class=\"form-control\"\n          required pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\" placeholder=\"Contraseña\">\n\n        <small *ngIf=\"!password.valid && password.touched\" class=\"invalid-feedback d-block\">\n          Contraseña no válida. Mínimo 8 caracteres. Debe contener al menos una letra mayúscula, un número.\n        </small>\n      </div>\n\n      <div class=\"form-group\" id=\"password_match_check\">\n        <input type=\"password\" name=\"password_2\" #password_2=\"ngModel\" [(ngModel)]=\"user.password_confirm\" class=\"form-control\"\n          required pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\" placeholder=\"Repite la contraseña\">\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12 mb-2\">\n          <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"registerForm.invalid\">Registrarse</button>\n        </div>\n      </div>\n      <!-- <div class=\"row\">\n        <div class=\"col-md-12\">\n          <button type=\"submit\" class=\"btn btn-danger btn-red-ma\">Google</button>\n        </div>\n      </div> -->\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");





var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_userService, _commonService) {
        this._userService = _userService;
        this._commonService = _commonService;
        this.page_title = "Registrarse";
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_2__["User"](1, '', '', '', '', '', 'ROLE_USER', '', '');
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        // if (localStorage.getItem("user") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        // }
    };
    RegisterComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.value.password == form.value.password_2) {
            this._userService.register(this.user).subscribe(function (response) {
                if (response.status == 'success') {
                    _this.status = 'success';
                    form.reset();
                }
                else {
                    _this.status = 'error';
                    _this._commonService.displayNotification(_this);
                }
                console.log(response);
            }, function (error) {
                _this.status = 'error';
                _this._commonService.displayNotification(_this);
                console.log(error);
            });
        }
        else {
            console.log("Las contraseñas no coinciden.");
        }
    };
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/components/register/register.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]],
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/components/register/register.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/components/search/search.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/search/search.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    margin-top: 40px; \r\n    margin-bottom: 40px; \r\n    border-radius: 5px; \r\n    padding-top: 30px;\r\n    padding-bottom: 40px;\r\n    width: 95%;\r\n    min-height: 10vh;\r\n}\r\n\r\n.row div:nth-child(1){ padding-left: 40px; }\r\n\r\n.row div:nth-child(4){ padding-right: 40px; }\r\n\r\nh1 span{\r\n    font-size: 25px;\r\n    margin-left: 20px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7O0FBRUEsdUJBQXVCLGtCQUFrQixFQUFFOztBQUUzQyx1QkFBdUIsbUJBQW1CLEVBQUU7O0FBRTVDO0lBQ0ksZUFBZTtJQUNmLGlCQUFpQjtBQUNyQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lci1tYXsgXHJcbiAgICBtYXJnaW4tdG9wOiA0MHB4OyBcclxuICAgIG1hcmdpbi1ib3R0b206IDQwcHg7IFxyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4OyBcclxuICAgIHBhZGRpbmctdG9wOiAzMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDQwcHg7XHJcbiAgICB3aWR0aDogOTUlO1xyXG4gICAgbWluLWhlaWdodDogMTB2aDtcclxufVxyXG5cclxuLnJvdyBkaXY6bnRoLWNoaWxkKDEpeyBwYWRkaW5nLWxlZnQ6IDQwcHg7IH1cclxuXHJcbi5yb3cgZGl2Om50aC1jaGlsZCg0KXsgcGFkZGluZy1yaWdodDogNDBweDsgfVxyXG5cclxuaDEgc3BhbntcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/components/search/search.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/search/search.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid col-md-12 container-ma\">\n  <h1 class=\"index-title\">{{page_title}}<span>{{filter}}</span></h1>\n  <hr>\n  <!-- <div class=\"espaciado\"></div> -->\n    <div class=\"container-images\">\n    <div class=\"box grid-col-{{i+1}} pb-5\" *ngFor=\"let image of images; let i = index\">\n      <div id=\"image-box\">\n        <div #imageParent class=\"image-parent\" id=\"hover-parent\">\n          <a [routerLink]=\"['/images', image[0].id]\">\n            <img src=\"assets/public/{{image[0].url}}\" class=\"image-element\" id=\"id-{{image[0].id}}\" (mouseleave)=\"_imageService.out($event, this, null);\">\n          </a>\n          <span class=\"image-description\">\n            {{image[0].name}}\n            <br>\n            <span class=\"image-by\">\n              by <span class=\"image-user\">{{image.username}}</span>\n            </span>\n          </span>\n          <div class=\"image-action\" *ngIf=\"identity && identity.nick != 'guest'\">\n            <img class=\"image-frame like\" src=\"assets/img/image-like-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-heart\" (mouseover)=\"_imageService.in($event, this, 1);\" (mouseleave)=\"_imageService.out($event, this, 1);\" (click)=\"_imageService.saveInteraction($event, this, 'like');\"></div>\n            <img class=\"image-frame fav\" src=\"assets/img/image-fav-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-star\" (mouseover)=\"_imageService.in($event, this, 2);\" (mouseleave)=\"_imageService.out($event, this, 2);\" (click)=\"_imageService.saveInteraction($event, this, 'fav');\"></div>\n            <img class=\"image-frame share\" src=\"assets/img/image-share-border.png\" (mouseover)=\"_imageService.in($event, this, null);\"\n              (mouseleave)=\"_imageService.out($event, this, null);\">\n            <div class=\"image-arrows\" (mouseover)=\"_imageService.in($event,this, 3);\" (mouseleave)=\"_imageService.out($event, this, 3);\" (click)=\"_imageService.saveInteraction($event, this, 'share');\"></div>\n          </div>\n        </div>\n        <!-- <img src=\"../api-rest-symfony/public/storage/images/image-example.jpg\" class=\"image-element\"> -->\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- <a href=\"index_2.html\">Siguiente</a> -->\n\n<nav aria-label=\"Page navigation example\">\n  <ul class=\"pagination float-right\">\n    <li *ngIf=\"page != 1 && total_pages > 1\">\n      <a class=\"page-link\" [routerLink]=\"['/search', prev_page]\">Anterior</a>\n    </li>\n    <li *ngFor=\"let num of number_pages; let i = index\">\n      <a class=\"page-link\" *ngIf=\"i<5\" [routerLink]=\"['/search', num]\" [ngClass]=\"{'active': num == page}\">{{num}}</a>\n      <!-- Cambiar para que si p.e estás en la pág 20, salga 18 - 19 - 20 - 21 - 22 -->\n    </li>\n    <li *ngIf=\"page != total_pages\"> <!--  && total_pages > 1 -->\n      <a class=\"page-link\" [routerLink]=\"['/search', next_page]\">Siguiente</a>\n    </li>\n  </ul>\n</nav>\n\n<!-- div class=\"container-images\">\n    <div class=\"row\" *ngFor=\"let item of [].constructor(4); let i = index\">\n      <div class=\"col-md-3 box\" *ngFor=\"let item of [].constructor(4); let j = index\">\n        <div id=\"image-box\"></div>\n      </div>\n    </div>\n  </div -->"

/***/ }),

/***/ "./src/app/components/search/search.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/search/search.component.ts ***!
  \*******************************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");







var SearchComponent = /** @class */ (function () {
    function SearchComponent(_userService, _imageService, _commonService, _route, _router, render) {
        var _this = this;
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._route = _route;
        this._router = _router;
        this.render = render;
        this.page_title = "  Resultados de: ";
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.searError = 0;
        this._route.queryParams.subscribe(function (params) {
            _this.query = params['q'];
            _this.changeURL();
        });
        /*
        _router.events.subscribe(() => {
         });
         */
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.loadUser();
        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        }
    };
    SearchComponent.prototype.changeURL = function () {
        var tagQuery = this.query.search("tag:");
        var nameQuery = this.query.search("name:");
        var querySelector;
        var search;
        this.filter = "";
        if (tagQuery == 0) {
            querySelector = "tag";
        }
        else if (nameQuery == 0) {
            querySelector = "name";
        }
        else {
            querySelector = "all";
        }
        search = this.query.replace("tag:", "").replace("name:", "");
        this.page_title = "  Resultados de: " + search;
        if (tagQuery != -1 || nameQuery != -1) {
            this.filter = " (filtro: " + querySelector + ")";
        }
        this.pageSearch(querySelector, search);
    };
    SearchComponent.prototype.pageSearch = function (querySelector, search) {
        var _this = this;
        this._route.params.subscribe(function (params) {
            _this.page = +params['page'];
            if (!_this.page) {
                _this.page = 1;
                _this.prev_page = 1;
                _this.next_page = 2;
            }
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                _this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                _this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
            _this._imageService.showImageSearch(_this, _this.page, _this.nsfw, _this.epilepsy, querySelector, search);
        });
    };
    SearchComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        //   console.log(this.token);
    };
    SearchComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-search',
            template: __webpack_require__(/*! ./search.component.html */ "./src/app/components/search/search.component.html"),
            styles: [__webpack_require__(/*! ./search.component.css */ "./src/app/components/search/search.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_3__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "./src/app/components/settings/settings.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/settings/settings.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n  margin-top: 40px; \r\n  margin-bottom: 40px; \r\n  border-radius: 5px; \r\n  padding-top: 30px;\r\n  padding-bottom: 40px;\r\n  width: 30%;\r\n  min-height: 70vh;\r\n}\r\n\r\nhr{ margin-bottom: 60px; }\r\n\r\ninput[type=\"checkbox\"].switch{\r\n  -webkit-appearance: none;\r\n     -moz-appearance: none;\r\n          appearance: none;\r\n  width: 3.5em;\r\n  height: 2em;\r\n  background: #ddd;\r\n  border-radius: 3em;\r\n  position: relative;\r\n  cursor: pointer;\r\n  outline: none;\r\n  transition: all .2s ease-in-out;\r\n}\r\n\r\ninput[type=\"checkbox\"].switch:checked{\r\n  background: #0effb7;\r\n}\r\n\r\ninput[type=\"checkbox\"].night:checked{\r\n  background: #00054e;\r\n}\r\n\r\ninput[type=\"checkbox\"].switch:after{\r\n  position: absolute;\r\n  content: \"\";\r\n  width: 2em;\r\n  height: 2em;\r\n  border-radius: 50%;\r\n  background: #fff;\r\n  box-shadow: 0 0 .25em rgba(0,0,0,.3);\r\n  -webkit-transform: scale(.7);\r\n          transform: scale(.7);\r\n  left: 0;\r\n  transition: all .2s ease-in-out;\r\n}\r\n\r\ninput[type=\"checkbox\"].switch:checked:after{\r\n  left: calc(100% - 2em);\r\n}\r\n\r\nspan{\r\n  font-size: 21px;\r\n}\r\n\r\n.color{\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 1px solid rgba(136, 136, 136, 0.685);\r\n  border-radius: 5px;\r\n  cursor: pointer;\r\n}\r\n\r\n.color:hover{\r\n  -webkit-transform: scale(1.1);\r\n          transform: scale(1.1);\r\n}\r\n\r\n.feed{\r\n  width: 56px;\r\n  height: 40px;\r\n  font-size: 20px;\r\n  padding: 0 5px;\r\n  border-radius: 5px;\r\n}\r\n\r\ninput::-webkit-outer-spin-button,\r\ninput::-webkit-inner-spin-button {\r\n    /* display: none; <- Crashes Chrome on hover */\r\n    -webkit-appearance: none;\r\n    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */\r\n}\r\n\r\ninput[type=number] {\r\n    -moz-appearance:textfield; /* Firefox */\r\n}\r\n\r\n.red{  background: rgb(255, 140, 140); }\r\n\r\n.green{ background: rgb(163, 255, 140); }\r\n\r\n.blue{ background: rgb(140, 190, 255); }\r\n\r\n.violet{ background: rgb(194, 140, 255); }\r\n\r\n.orange{ background: rgb(247, 217, 172); }\r\n\r\n.yellow{ background: rgb(255, 253, 140); }\r\n\r\n.chosen{box-shadow: 0px 0px 3px 4px rgba(237, 43, 255, 0.295); -webkit-transform: scale(1.2); transform: scale(1.2);}\r\n\r\n.chosen:hover{ -webkit-transform: scale(1.2); transform: scale(1.2); }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQixVQUFVO0VBQ1YsZ0JBQWdCO0FBQ2xCOztBQUVBLElBQUksbUJBQW1CLEVBQUU7O0FBRXpCO0VBQ0Usd0JBQWdCO0tBQWhCLHFCQUFnQjtVQUFoQixnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsYUFBYTtFQUNiLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsVUFBVTtFQUNWLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG9DQUFvQztFQUNwQyw0QkFBb0I7VUFBcEIsb0JBQW9CO0VBQ3BCLE9BQU87RUFDUCwrQkFBK0I7QUFDakM7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWiw0Q0FBNEM7RUFDNUMsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSw2QkFBcUI7VUFBckIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixlQUFlO0VBQ2YsY0FBYztFQUNkLGtCQUFrQjtBQUNwQjs7QUFFQTs7SUFFSSw4Q0FBOEM7SUFDOUMsd0JBQXdCO0lBQ3hCLFNBQVMsRUFBRSx1RUFBdUU7QUFDdEY7O0FBRUE7SUFDSSx5QkFBeUIsRUFBRSxZQUFZO0FBQzNDOztBQUVBLE9BQU8sOEJBQThCLEVBQUU7O0FBQ3ZDLFFBQVEsOEJBQThCLEVBQUU7O0FBQ3hDLE9BQU8sOEJBQThCLEVBQUU7O0FBQ3ZDLFNBQVMsOEJBQThCLEVBQUU7O0FBQ3pDLFNBQVMsOEJBQThCLEVBQUU7O0FBQ3pDLFNBQVMsOEJBQThCLEVBQUU7O0FBRXpDLFFBQVEscURBQXFELEVBQUUsNkJBQXFCLEVBQXJCLHFCQUFxQixDQUFDOztBQUNyRixlQUFlLDZCQUFxQixFQUFyQixxQkFBcUIsRUFBRSIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXItbWF7IFxyXG4gIG1hcmdpbi10b3A6IDQwcHg7IFxyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7IFxyXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgXHJcbiAgcGFkZGluZy10b3A6IDMwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDQwcHg7XHJcbiAgd2lkdGg6IDMwJTtcclxuICBtaW4taGVpZ2h0OiA3MHZoO1xyXG59XHJcblxyXG5ocnsgbWFyZ2luLWJvdHRvbTogNjBweDsgfVxyXG5cclxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLnN3aXRjaHtcclxuICBhcHBlYXJhbmNlOiBub25lO1xyXG4gIHdpZHRoOiAzLjVlbTtcclxuICBoZWlnaHQ6IDJlbTtcclxuICBiYWNrZ3JvdW5kOiAjZGRkO1xyXG4gIGJvcmRlci1yYWRpdXM6IDNlbTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgdHJhbnNpdGlvbjogYWxsIC4ycyBlYXNlLWluLW91dDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLnN3aXRjaDpjaGVja2Vke1xyXG4gIGJhY2tncm91bmQ6ICMwZWZmYjc7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJjaGVja2JveFwiXS5uaWdodDpjaGVja2Vke1xyXG4gIGJhY2tncm91bmQ6ICMwMDA1NGU7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJjaGVja2JveFwiXS5zd2l0Y2g6YWZ0ZXJ7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGNvbnRlbnQ6IFwiXCI7XHJcbiAgd2lkdGg6IDJlbTtcclxuICBoZWlnaHQ6IDJlbTtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBib3gtc2hhZG93OiAwIDAgLjI1ZW0gcmdiYSgwLDAsMCwuMyk7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSguNyk7XHJcbiAgbGVmdDogMDtcclxuICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2UtaW4tb3V0O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0uc3dpdGNoOmNoZWNrZWQ6YWZ0ZXJ7XHJcbiAgbGVmdDogY2FsYygxMDAlIC0gMmVtKTtcclxufVxyXG5cclxuc3BhbntcclxuICBmb250LXNpemU6IDIxcHg7XHJcbn1cclxuXHJcbi5jb2xvcntcclxuICB3aWR0aDogNDBweDtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgxMzYsIDEzNiwgMTM2LCAwLjY4NSk7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmNvbG9yOmhvdmVye1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcclxufVxyXG5cclxuLmZlZWR7XHJcbiAgd2lkdGg6IDU2cHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxuICBwYWRkaW5nOiAwIDVweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbmlucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxyXG5pbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XHJcbiAgICAvKiBkaXNwbGF5OiBub25lOyA8LSBDcmFzaGVzIENocm9tZSBvbiBob3ZlciAqL1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgbWFyZ2luOiAwOyAvKiA8LS0gQXBwYXJlbnRseSBzb21lIG1hcmdpbiBhcmUgc3RpbGwgdGhlcmUgZXZlbiB0aG91Z2ggaXQncyBoaWRkZW4gKi9cclxufVxyXG5cclxuaW5wdXRbdHlwZT1udW1iZXJdIHtcclxuICAgIC1tb3otYXBwZWFyYW5jZTp0ZXh0ZmllbGQ7IC8qIEZpcmVmb3ggKi9cclxufVxyXG5cclxuLnJlZHsgIGJhY2tncm91bmQ6IHJnYigyNTUsIDE0MCwgMTQwKTsgfVxyXG4uZ3JlZW57IGJhY2tncm91bmQ6IHJnYigxNjMsIDI1NSwgMTQwKTsgfVxyXG4uYmx1ZXsgYmFja2dyb3VuZDogcmdiKDE0MCwgMTkwLCAyNTUpOyB9XHJcbi52aW9sZXR7IGJhY2tncm91bmQ6IHJnYigxOTQsIDE0MCwgMjU1KTsgfVxyXG4ub3JhbmdleyBiYWNrZ3JvdW5kOiByZ2IoMjQ3LCAyMTcsIDE3Mik7IH1cclxuLnllbGxvd3sgYmFja2dyb3VuZDogcmdiKDI1NSwgMjUzLCAxNDApOyB9XHJcblxyXG4uY2hvc2Vue2JveC1zaGFkb3c6IDBweCAwcHggM3B4IDRweCByZ2JhKDIzNywgNDMsIDI1NSwgMC4yOTUpOyB0cmFuc2Zvcm06IHNjYWxlKDEuMik7fVxyXG4uY2hvc2VuOmhvdmVyeyB0cmFuc2Zvcm06IHNjYWxlKDEuMik7IH0iXX0= */"

/***/ }),

/***/ "./src/app/components/settings/settings.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/settings/settings.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid col-md-6 container-ma\">\n  <h1 class=\"index-title\">{{page_title}}</h1>\n  <hr>\n  <div class=\"row pl-4\">\n    <div class=\"col-md-9\">\n      <span>Modo noche</span>\n    </div>\n    <div class=\"col-md-3\">\n      <input type=\"checkbox\" class=\"switch night\" [checked]=\"nightMode==true\" (change)=\"change($event,'nightMode')\">\n    </div>\n  </div>\n\n  <div class=\"pb-4\"></div>\n\n  <div class=\"row pl-4\">\n    <div class=\"col-md-9\">\n      <span>Mostrar contenido sensible</span>\n    </div>\n    <div class=\"col-md-3\">\n      <input type=\"checkbox\" class=\"switch\" [checked]=\"nsfw==true\" (change)=\"change($event,'nsfw')\">\n    </div>\n  </div>\n\n  <div class=\"pb-4\"></div>\n\n  <div class=\"row pl-4\">\n    <div class=\"col-md-9\">\n      <span>Mostrar elementos llamativos</span>\n    </div>\n    <div class=\"col-md-3\">\n      <input type=\"checkbox\" class=\"switch\" [checked]=\"epilepsy==true\" (change)=\"change($event,'epilepsy')\">\n    </div>\n  </div>\n\n  <div class=\"pb-4\"></div>\n\n  <div class=\"row pl-4\">\n    <div class=\"col-md-9\">\n      <span>Compartir imágenes</span>\n    </div>\n    <div class=\"col-md-3\">\n      <input type=\"checkbox\" class=\"switch\" [checked]=\"share==true\" (change)=\"change($event,'share')\">\n    </div>\n  </div>\n\n  <div class=\"pb-4\"></div>\n\n  <div class=\"row pl-4\">\n    <div class=\"col-md-9\">\n      <span>Elementos de feed</span>\n    </div>\n    <div class=\"col-md-3\">\n      <input type=\"number\" class=\"feed\" min=\"5\" max=\"100\" default=\"5\" [(ngModel)]=\"feed\" (change)=\"change($event,'feed')\">\n    </div>\n  </div>\n\n  <div class=\"pb-4\"></div>\n  <div class=\"pb-4\"></div>\n\n  <div class=\"row pl-4 pb-3\">\n    <div class=\"col-md-12 pl-3\">\n      <span>Temas</span>\n    </div>\n  </div>\n  <div class=\"row pl-5 pr-5\">\n    <div class=\"col-md-2\">\n      <div class=\"color red\" (click)=\"pickColor($event, 'red')\"></div>\n    </div>\n    <div class=\"col-md-2\">\n      <div class=\"color green\" (click)=\"pickColor($event, 'green')\"></div>\n    </div>\n    <div class=\"col-md-2\">\n      <div class=\"color blue\" (click)=\"pickColor($event, 'blue')\"></div>\n    </div>\n    <div class=\"col-md-2\">\n      <div class=\"color violet\" (click)=\"pickColor($event, 'violet')\"></div>\n    </div>\n    <div class=\"col-md-2\">\n      <div class=\"color orange\" (click)=\"pickColor($event, 'orange')\"></div>\n    </div>\n    <div class=\"col-md-2\">\n      <div class=\"color yellow\" (click)=\"pickColor($event, 'yellow')\"></div>\n    </div>\n\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/components/settings/settings.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/settings/settings.component.ts ***!
  \***********************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../app.component */ "./src/app/app.component.ts");






var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(_userService, _commonService, _appComponent, _route, render) {
        this._userService = _userService;
        this._commonService = _commonService;
        this._appComponent = _appComponent;
        this._route = _route;
        this.render = render;
        this.page_title = "  Ajustes";
        this.nightMode = false;
        this.nsfw = false;
        this.epilepsy = false;
        this.share = true;
        this.feed = 15;
        this.arrayNavs = ["nav-red", "nav-green", "nav-blue", "nav-violet", "nav-orange", "nav-yellow"];
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.loadUser();
        var defaultLoadJSON = localStorage.getItem("config");
        var defaultLoad = JSON.parse(defaultLoadJSON);
        this.nightMode = defaultLoad.nightMode;
        this.nsfw = defaultLoad.nsfw;
        this.epilepsy = defaultLoad.epilepsy;
        this.color = defaultLoad.color;
        this.share = defaultLoad.share;
        this.feed = defaultLoad.feed;
        this.render.addClass(document.querySelector("." + this.color), "chosen");
        // if (localStorage.getItem("user") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        // }
    };
    SettingsComponent.prototype.change = function (event, variable) {
        var updateConfigJSON = localStorage.getItem("config");
        var updateConfig = JSON.parse(updateConfigJSON);
        if (variable == "nightMode") {
            this.nightMode = this.nightMode ? false : true;
            updateConfig.nightMode = this.nightMode;
        }
        if (variable == "nsfw") {
            this.nsfw = this.nsfw ? false : true;
            updateConfig.nsfw = this.nsfw;
        }
        if (variable == "epilepsy") {
            this.epilepsy = this.epilepsy ? false : true;
            updateConfig.epilepsy = this.epilepsy;
        }
        if (variable == "share") {
            this.share = this.share ? false : true;
            updateConfig.share = this.share;
        }
        if (variable == "feed") {
            if (this.feed > 100) {
                this.feed = 100;
            }
            else if (this.feed < 5) {
                this.feed = 5;
            }
            updateConfig.feed = this.feed;
        }
        this.updateDB(updateConfig);
        this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
    };
    SettingsComponent.prototype.pickColor = function (event, color) {
        if (this.color != color) {
            this.render.removeClass(event.target.parentElement.parentElement.querySelector(".chosen"), "chosen");
            this.render.addClass(event.target, "chosen");
            this.color = color;
            var updateConfigJSON = localStorage.getItem("config");
            var updateConfig = JSON.parse(updateConfigJSON);
            updateConfig.color = this.color;
            this.updateDB(updateConfig);
            this._appComponent.changeColor(this.color, this.arrayNavs);
        }
    };
    SettingsComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    };
    SettingsComponent.prototype.updateDB = function (config) {
        config.nightMode = config.nightMode ? 1 : 0;
        config.nsfw = config.nsfw ? 1 : 0;
        config.epilepsy = config.epilepsy ? 1 : 0;
        config.share = config.share ? 1 : 0;
        config = JSON.stringify(config);
        this._commonService.setUserConfig(this, this.token, config);
        var i = 0;
        // this.storageService.watchStorage().subscribe((data: string) => {
        //     this.color = config.color;
        // });
    };
    SettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/app/components/settings/settings.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
            styles: [__webpack_require__(/*! ./settings.component.css */ "./src/app/components/settings/settings.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/components/upload-image/upload-image.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/upload-image/upload-image.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    margin-top: 40px; \r\n    margin-bottom: 40px; \r\n    border-radius: 5px; \r\n    padding-top: 30px;\r\n    padding-bottom: 40px;\r\n    width: 90%;\r\n    min-height: 10vh;\r\n}\r\n\r\n#upload-image{\r\n    width: 300px;\r\n}\r\n\r\n.descr-image {\r\n    /* max-width: 500px;   */\r\n    height: 120px; \r\n    width: 100%; \r\n    min-width: 200px;\r\n}\r\n\r\n.min-info{\r\n    font-size: 12px; \r\n    color: green;\r\n    margin-top: 20px;  \r\n    line-height: 15px;\r\n}\r\n\r\n.title{\r\n    width: 270px; display: inline;\r\n}\r\n\r\n.tags{\r\n    width: 270px; display: inline;\r\n}\r\n\r\ninput[type=checkbox]{ /* IE */ /* FF */\r\n    -webkit-transform: scale(1.5); /* Safari and Chrome */ /* Opera */\r\n    transform: scale(1.5);\r\n    margin-right: 7px;\r\n}\r\n\r\nlabel{\r\n    position: relative;\r\n    top: -1px;\r\n}\r\n\r\n.pl-10{\r\n    padding-left: 5rem!important;\r\n}\r\n\r\n.example{\r\n    color: rgb(1, 199, 182);\r\n}\r\n\r\n.btn-upload{\r\n    padding: 0.475rem 1rem;\r\n    font-size: 1.5rem;\r\n    line-height: 1.7;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy91cGxvYWQtaW1hZ2UvdXBsb2FkLWltYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLGFBQWE7SUFDYixXQUFXO0lBQ1gsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksWUFBWSxFQUFFLGVBQWU7QUFDakM7O0FBRUE7SUFDSSxZQUFZLEVBQUUsZUFBZTtBQUNqQzs7QUFFQSxzQkFDK0IsT0FBTyxFQUNOLE9BQU87SUFDbkMsNkJBQTZCLEVBQUUsc0JBQXNCLEVBQzNCLFVBQVU7SUFDcEMscUJBQXFCO0lBQ3JCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0FBQ2I7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvdXBsb2FkLWltYWdlL3VwbG9hZC1pbWFnZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lci1tYXsgXHJcbiAgICBtYXJnaW4tdG9wOiA0MHB4OyBcclxuICAgIG1hcmdpbi1ib3R0b206IDQwcHg7IFxyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4OyBcclxuICAgIHBhZGRpbmctdG9wOiAzMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDQwcHg7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gICAgbWluLWhlaWdodDogMTB2aDtcclxufVxyXG5cclxuI3VwbG9hZC1pbWFnZXtcclxuICAgIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLmRlc2NyLWltYWdlIHtcclxuICAgIC8qIG1heC13aWR0aDogNTAwcHg7ICAgKi9cclxuICAgIGhlaWdodDogMTIwcHg7IFxyXG4gICAgd2lkdGg6IDEwMCU7IFxyXG4gICAgbWluLXdpZHRoOiAyMDBweDtcclxufVxyXG5cclxuLm1pbi1pbmZve1xyXG4gICAgZm9udC1zaXplOiAxMnB4OyBcclxuICAgIGNvbG9yOiBncmVlbjtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7ICBcclxuICAgIGxpbmUtaGVpZ2h0OiAxNXB4O1xyXG59XHJcblxyXG4udGl0bGV7XHJcbiAgICB3aWR0aDogMjcwcHg7IGRpc3BsYXk6IGlubGluZTtcclxufVxyXG5cclxuLnRhZ3N7XHJcbiAgICB3aWR0aDogMjcwcHg7IGRpc3BsYXk6IGlubGluZTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1jaGVja2JveF17XHJcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjUpOyAvKiBJRSAqL1xyXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEuNSk7IC8qIEZGICovXHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS41KTsgLyogU2FmYXJpIGFuZCBDaHJvbWUgKi9cclxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoMS41KTsgLyogT3BlcmEgKi9cclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS41KTtcclxuICAgIG1hcmdpbi1yaWdodDogN3B4O1xyXG59XHJcblxyXG5sYWJlbHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRvcDogLTFweDtcclxufVxyXG5cclxuLnBsLTEwe1xyXG4gICAgcGFkZGluZy1sZWZ0OiA1cmVtIWltcG9ydGFudDtcclxufVxyXG5cclxuLmV4YW1wbGV7XHJcbiAgICBjb2xvcjogcmdiKDEsIDE5OSwgMTgyKTtcclxufVxyXG5cclxuLmJ0bi11cGxvYWR7XHJcbiAgICBwYWRkaW5nOiAwLjQ3NXJlbSAxcmVtO1xyXG4gICAgZm9udC1zaXplOiAxLjVyZW07XHJcbiAgICBsaW5lLWhlaWdodDogMS43O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/components/upload-image/upload-image.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/upload-image/upload-image.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-success notification\" *ngIf=\"status == 'success'\">\n  Imagen subida correctamente. Se te redirigirá en seguida.\n</div>\n\n<div class=\"alert alert-danger notification\" *ngIf=\"status == 'error'\">\n  Error al subir la imagen. Inténtalo de nuevo más tarde.\n</div>\n\n<div class=\"container-fluid col-md-12 container-ma\">\n  <h1 class=\"index-title pl-5 pb-3\">{{page_title}}</h1>\n  <hr class=\"index-title pb-3\">\n\n  <form class=\"col-md-12\" #uploadImageForm=\"ngForm\" (ngSubmit)=\"onSubmit(uploadImageForm)\">\n    <div class=\"row mb-5\">\n      <div class=\"col-md-5 pl-10\">\n        <img [src]=\"_imageURL\" class=\"mb-3\" id=\"upload-image\">\n        <div>\n          <input type=\"file\" name=\"file\" id=\"path\" #file (change)=\"fileHandler(file.files)\" accept=\"image/*\" required> <!-- + (change)=\"handleFileInput($event.target.files)\" -->\n          <div class=\"min-info\">\n            <span id=\"image_size\">Máximo 2Mb.</span><br>\n            <span id=\"image_res\">Debe ser una resolución superior a 400x400</span><br>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-7\">\n        <div class=\"mb-3\">\n          <label for=\"name\" class=\"pr-3\">Título de la imagen:</label>\n          <input type=\"text\" name=\"name\" #name=\"ngModel\" [(ngModel)]=\"image.name\" placeholder=\"Máx 30 caracteres\"\n            maxlength=\"30\" class=\"form-control title\" autofocus required>\n          <small *ngIf=\"!name.valid && name.touched\" class=\"invalid-feedback d-block\">\n           Por favor, introduce un título para la imagen.\n          </small>\n        </div>\n        <div class=\"mb-3\">\n          <label for=\"description\">Descripción</label>\n          <div>\n            <textarea name=\"description\" #description=\"ngModel\" [(ngModel)]=\"image.description\" placeholder=\"Máx 300 caracteres\"\n              maxlength=\"300\" class=\"form-control descr-image\" id=\"upload-desc\"></textarea>\n          </div>\n        </div>\n        <div class=\"mb-3\">\n          <input type=\"checkbox\" name=\"nsfw\" #nsfw=\"ngModel\" [(ngModel)]=\"image.nsfw\">\n          <label for=\"nsfw\">Contenido explícito (+18)</label>\n        </div>\n        <div class=\"mb-3\">\n          <input type=\"checkbox\" name=\"epilepsy\" #epilepsy=\"ngModel\" [(ngModel)]=\"image.epilepsy\">\n          <label for=\"epilepsy\">Puede contener elementos que causen epilepsia</label>\n        </div>\n        <div class=\"mb-5\">\n          <label for=\"rights\" class=\"mr-3\">Tipos de derechos:</label>\n          <select name=\"rights\" #rights=\"ngModel\" [(ngModel)]=\"_rights\">\n            <option value=\"totales\" ng-selected=\"selected\">Totales</option>\n            <option value=\"parciales\">Parciales</option>\n            <option value=\"ninguno\">Ninguno</option>\n          </select>\n        </div>\n        <div>\n          <label for=\"tags\" class=\"pr-3\">Tags:</label>\n          <input type=\"text\" name=\"tags\" #tags=\"ngModel\" [(ngModel)]=\"image.tags\" placeholder=\"Tags (separadas por comas)\"\n            maxlength=\"100\" class=\"form-control tags\">\n        </div>\n        <small class=\"example ml-5 pl-1\">Ejemplo: Nebulilla, pokemon, moon</small>\n\n        <!-- <div>\n          Miniatura: <input type=\"file\" name=\"miniatura\" id=\"upload-min\">\n        </div>\n        <div class=\"min-info\">\n          <p>**Una miniatura ayuda a cargar la página de forma más rápida. Es la misma imagen en\n            peor resolución. (No es necesaria)<br><br>\n            Por favor, no introduzca una imagen diferente a la original, o nos veremos\n            obligados a borrarla.</p>\n        </div> -->\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <div style=\"text-align:center\">\n          <button type=\"submit\" class=\"btn btn-success btn-upload\" [disabled]=\"uploadImageForm.invalid\">Subir imagen</button> <!-- ng-disabled=\"message.length > 255\" -->\n        </div>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/components/upload-image/upload-image.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/upload-image/upload-image.component.ts ***!
  \*******************************************************************/
/*! exports provided: UploadImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadImageComponent", function() { return UploadImageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _models_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../models/image */ "./src/app/models/image.ts");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/image.service */ "./src/app/services/image.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");







var UploadImageComponent = /** @class */ (function () {
    function UploadImageComponent(_route, _router, _userService, _imageService, _commonService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._imageService = _imageService;
        this._commonService = _commonService;
        this._rights = "totales"; // Valor por defecto select
        this._imageURL = "assets/img/preview-icon.png";
        this.fileToUpload = null;
        this.page_title = "Subir imagen";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    }
    UploadImageComponent.prototype.ngOnInit = function () {
        this.loadUser();
        this.image = new _models_image__WEBPACK_IMPORTED_MODULE_4__["Image"](1, this.identity.sub, '', '', '', '', 0, 0, null, null, '', '', '');
        this.config = JSON.parse(localStorage.getItem("config"));
        // if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        // }
    };
    /*
    handleFileInput(files: FileList) { // Para ver los atributos del objeto files
        this.fileToUpload = files.item(0);
        console.log(this.fileToUpload);
    }
    */
    UploadImageComponent.prototype.fileHandler = function (files) {
        var _this = this;
        if (files.length === 0)
            return;
        console.log("size:" + files[0].size); // *Cambiar* -> Poner limitaciones, desactivar el botón si no las cumple
        // https://stackoverflow.com/questions/29280473/how-can-i-use-angluarjs-to-disable-a-button-if-a-value-is-bigger-than-255
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            console.log("Sólo se admiten imágenes.");
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this._imageURL = reader.result;
            _this.image.imageToUpload = {
                filename: _this.nameGen(),
                filetype: files[0].type.replace('image/', ''),
                value: reader.result.split(',')[1],
                base64: _this._imageURL
            };
        };
    };
    UploadImageComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.image.name = this._commonService.noscript(this.image.name);
        var nsfw = Boolean(this.image.nsfw);
        if (nsfw == true) {
            this.image.nsfw = 1;
        }
        else {
            this.image.nsfw = 0;
        }
        var description = this.image.description;
        if (this.image.description != null) {
            for (var i = 0; i < description.length; i++) {
                if (description.charCodeAt(i) == 10) {
                    description = description.substr(0, i) + '\\n' + description.substr(i + 1);
                }
            }
            description = this._commonService.noscript(description);
        }
        this.image.description = description;
        if (this.image.tags != null) {
            // this.image.tags = this.image.tags.replace(/ /g, "");
            this.image.tags = this.image.tags.toLowerCase();
            this.image.tags = this.image.tags.trim();
            this.image.tags = this._commonService.noscript(this.image.tags);
        }
        var epilepsy = Boolean(this.image.epilepsy);
        if (epilepsy == true) { // epilepsyFriendy true == puede contener elementos que causen epilepsia.
            this.image.epilepsy = 1;
        }
        else {
            this.image.epilepsy = 0;
        }
        this.image.rights = this._rights; // Asignamos el valor de _rights. Si en el modelo html le asignamos 
        //al campo image.rights, carga sin nada seleccionado
        console.log(this._rights);
        // console.log(this._file);
        console.log(this.image);
        this._imageService.upload(this.token, this.image).subscribe(function (response) {
            if (!response.status || response.status != 'error') {
                _this.status = "success";
                if (_this.config.share == true) {
                    var estado = false;
                    var data = {
                        user_id: response.image.user.id,
                        image_id: response.image.id,
                        action: "share",
                        method: "POST"
                    };
                    console.log(data);
                    _this._imageService.interact(_this.token, data, estado).subscribe(function (response) {
                        if (response.status == "success") {
                            setTimeout(function () { _this._router.navigate(['home']); }, 1000);
                        }
                        console.log(response);
                    }, function (error) {
                        console.log(error);
                    });
                }
                form.reset();
            }
            else {
                _this.status = "error";
                _this._commonService.displayNotification(_this);
            }
        }, function (error) {
            _this.status = "error";
            _this._commonService.displayNotification(_this);
        });
    };
    UploadImageComponent.prototype.nameGen = function () {
        var randomName = "";
        for (var i = 0; i < 10; i++) {
            var letter = Math.random() * 25 + 65;
            randomName += String.fromCharCode(letter);
        }
        randomName += "-";
        for (var i = 0; i < 6; i++) {
            var number = Math.random() * 9 + 48;
            randomName += String.fromCharCode(number);
        }
        return randomName;
    };
    UploadImageComponent.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // console.log(this.token);
    };
    UploadImageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-upload-image',
            template: __webpack_require__(/*! ./upload-image.component.html */ "./src/app/components/upload-image/upload-image.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_image_service__WEBPACK_IMPORTED_MODULE_5__["ImageService"], _services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"]],
            styles: [__webpack_require__(/*! ./upload-image.component.css */ "./src/app/components/upload-image/upload-image.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_image_service__WEBPACK_IMPORTED_MODULE_5__["ImageService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"]])
    ], UploadImageComponent);
    return UploadImageComponent;
}());



/***/ }),

/***/ "./src/app/components/user-edit/user-edit.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/user-edit/user-edit.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-ma{ \r\n    margin-top: 40px; \r\n    margin-bottom: 40px; \r\n    border-radius: 5px; \r\n    padding-top: 30px;\r\n    padding-bottom: 60px;\r\n}\r\n\r\n.btn-red-ma{\r\n    background-color: #c9302c; \r\n    margin-left: 10px; \r\n}\r\n\r\ninput:not([type=submit]){ \r\n    height: 48px; \r\n    width: 300px;\r\n}\r\n\r\n.title{\r\n    font-size: 40px;\r\n}\r\n\r\nimg{\r\n    width: 60px;\r\n    margin-right: 15px;\r\n}\r\n\r\n.form-ma{\r\n    padding-left: 30px;\r\n    padding-right: 30px; \r\n}\r\n\r\nhr{ \r\n    display: block; \r\n    margin-bottom: 40px; \r\n    width: 90%; \r\n}\r\n\r\ninput[type=submit]{\r\n    letter-spacing: 0.5px;\r\n    font-family: 'Oxygen', sans-serif;\r\n}\r\n\r\n.options{\r\n    font-size: 30px;\r\n    width: 200px;\r\n}\r\n\r\n.options div{\r\n    padding: 10px;\r\n}\r\n\r\n.options div:hover{\r\n    background: rgba(0, 0, 0, 0.247);\r\n    cursor: pointer;\r\n}\r\n\r\n.chosen{\r\n    background: rgba(129, 129, 129, 0.247);\r\n}\r\n\r\n.user-image{\r\n    width: 120px;\r\n    height: 120px;\r\n    cursor: pointer;\r\n}\r\n\r\ntextarea{\r\n    width: 70%;\r\n    height: 120px;\r\n    padding: 5px 10px;\r\n    resize: none;\r\n}\r\n\r\n.counter{\r\n    position: absolute;\r\n    bottom: -27px;\r\n    right: 32px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy91c2VyLWVkaXQvdXNlci1lZGl0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksY0FBYztJQUNkLG1CQUFtQjtJQUNuQixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsaUNBQWlDO0FBQ3JDOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksZ0NBQWdDO0lBQ2hDLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxzQ0FBc0M7QUFDMUM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixXQUFXO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3VzZXItZWRpdC91c2VyLWVkaXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXItbWF7IFxyXG4gICAgbWFyZ2luLXRvcDogNDBweDsgXHJcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4OyBcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDsgXHJcbiAgICBwYWRkaW5nLXRvcDogMzBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA2MHB4O1xyXG59XHJcblxyXG4uYnRuLXJlZC1tYXtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjOTMwMmM7IFxyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7IFxyXG59XHJcblxyXG5pbnB1dDpub3QoW3R5cGU9c3VibWl0XSl7IFxyXG4gICAgaGVpZ2h0OiA0OHB4OyBcclxuICAgIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnRpdGxle1xyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG59XHJcblxyXG5pbWd7XHJcbiAgICB3aWR0aDogNjBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxufVxyXG5cclxuLmZvcm0tbWF7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDMwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMHB4OyBcclxufVxyXG5cclxuaHJ7IFxyXG4gICAgZGlzcGxheTogYmxvY2s7IFxyXG4gICAgbWFyZ2luLWJvdHRvbTogNDBweDsgXHJcbiAgICB3aWR0aDogOTAlOyBcclxufVxyXG5cclxuaW5wdXRbdHlwZT1zdWJtaXRde1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICdPeHlnZW4nLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4ub3B0aW9uc3tcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIHdpZHRoOiAyMDBweDtcclxufVxyXG5cclxuLm9wdGlvbnMgZGl2e1xyXG4gICAgcGFkZGluZzogMTBweDtcclxufVxyXG5cclxuLm9wdGlvbnMgZGl2OmhvdmVye1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjI0Nyk7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5jaG9zZW57XHJcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDEyOSwgMTI5LCAxMjksIDAuMjQ3KTtcclxufVxyXG5cclxuLnVzZXItaW1hZ2V7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG50ZXh0YXJlYXtcclxuICAgIHdpZHRoOiA3MCU7XHJcbiAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgICByZXNpemU6IG5vbmU7XHJcbn1cclxuXHJcbi5jb3VudGVye1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm90dG9tOiAtMjdweDtcclxuICAgIHJpZ2h0OiAzMnB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/components/user-edit/user-edit.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/user-edit/user-edit.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-success notification\" *ngIf=\"status == 'success' && status != 'null'\">\n  Has actualizado tu perfil correctamente.\n</div>\n\n<div class=\"alert alert-danger notification\" *ngIf=\"status == 'error'\">\n  Error al actualizar la información.\n</div>\n\n<div class=\"alert alert-danger notification\" *ngIf=\"imageSize == false\">\n  Error, imagen demasiado grande. Sólo imágenes menores de 1Mb.\n</div>\n\n<div class=\"container-fluid col-md-8 container-ma\">\n  <div class=\"row form-ma\">\n    <div class=\"d-flex justify-content-center\">\n      <div class=\"text-center\">\n        <img src=\"assets/img/register.gif\">\n        <span class=\"align-middle title\">{{page_title}}</span>\n      </div>\n    </div>\n  </div>\n  <hr>\n\n  <div class=\"row form-ma\">\n    <div class=\"col-md-5\">\n      <div class=\"options\">\n        <div (click)=\"select($event, 1);\" class=\"chosen\">\n          Básico\n        </div>\n        <div (click)=\"select($event, 2);\">\n          Avanzado\n        </div>\n      </div>\n    </div>\n    <form class=\"col-md-7\" #registerForm=\"ngForm\" (ngSubmit)=\"onSubmit(userEditForm)\">\n      <div *ngIf=\"element==1\">\n        <div class=\"form-group mb-5\">\n          <div class=\"row relative\">\n            <input type=\"file\" name=\"file\" id=\"path\" #file (change)=\"fileHandler(file.files)\" accept=\"image/*\" style=\"display:none\">\n            <img [src]=\"_imageURL\" id=\"upload-image\" class=\"user-image\" (click)=\"file.click()\">\n            <textarea name=\"description\" #description=\"ngModel\" [(ngModel)]=\"user.description\" class=\"form-control\"\n              placeholder=\"Breve descripción sobre ti\" maxlength=\"300\" #counterRef>{{this.identity.description}}</textarea>\n            <span class=\"counter\">{{counterRef.value.length}}/300</span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"name\">Nombre:</label>\n          <input type=\"text\" name=\"name\" #name=\"ngModel\" [(ngModel)]=\"user.name\" class=\"form-control\" pattern=\"[A-zÁÉÍÓÚÀÈÌÒÙáéíóúàèìòùñ \\s]+\"\n            placeholder=\"Nombre\">\n\n          <small *ngIf=\"!name.valid && name.touched\" class=\"invalid-feedback d-block\">\n            Nombre no válido.\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"nick\">Nick:</label>\n          <input type=\"text\" name=\"nick\" #nick=\"ngModel\" [(ngModel)]=\"user.nick\" class=\"form-control\" pattern=\"[A-z0-9_-]+\"\n            placeholder=\"Nick\">\n\n          <small *ngIf=\"!nick.valid && nick.touched\" class=\"invalid-feedback d-block\">\n            Nick no válido.\n          </small>\n        </div>\n      </div>\n      <div *ngIf=\"element == 2\">\n        <div class=\"form-group\">\n          <label for=\"previous-password\">Contraseña actual</label>\n          <input type=\"password\" name=\"previous-password\" [(ngModel)]=\"oldPassword\" class=\"form-control\" pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\"\n            placeholder=\"Contraseña\">\n\n          <small *ngIf=\"checker == 0 && newPwd == false\" class=\"invalid-feedback d-block\">\n            La contraseña introducida no corresponde con la actual.\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"password\">Nueva contraseña</label>\n          <input type=\"password\" name=\"password\" #password=\"ngModel\" [(ngModel)]=\"user.password\" class=\"form-control\"\n            pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\" placeholder=\"Contraseña\">\n\n          <small *ngIf=\"!password.valid && password.touched\" class=\"invalid-feedback d-block\">\n            Contraseña no válida. Mínimo 8 caracteres. Debe contener al menos una letra mayúscula, un número.\n          </small>\n          <small *ngIf=\"passMatch == false\" class=\"invalid-feedback d-block\">\n            Las contraseñas no coinciden\n          </small>\n        </div>\n\n        <div class=\"form-group\" id=\"password_match_check\">\n          <label for=\"password_2\">Repite la contraseña</label>\n          <input type=\"password\" name=\"password_2\" [(ngModel)]=\"confirmPassword\" class=\"form-control\" pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\"\n            placeholder=\"Repite la contraseña\">\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col pt-5\">\n          <button type=\"submit\" class=\"btn btn-success\">Guardar cambios</button>\n          <button type=\"button\" class=\"btn btn-danger btn-red-ma\" [routerLink]=\"['/home']\">Cancelar</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/user-edit/user-edit.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/user-edit/user-edit.component.ts ***!
  \*************************************************************/
/*! exports provided: UserEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserEditComponent", function() { return UserEditComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/common.service */ "./src/app/services/common.service.ts");






var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(_userService, _commonService, render) {
        this._userService = _userService;
        this._commonService = _commonService;
        this.render = render;
        this.fileToUpload = null;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.page_title = "Editar perfil";
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_2__["User"](this.identity.sub, this.identity.name, this.identity.nick, this.identity.password, this.identity.email, this.identity.description, '', '', '');
        this.element = 1;
        this.imageSize = true;
        this.pwdChange = false;
        this.newPwd = false;
    }
    UserEditComponent.prototype.ngOnInit = function () {
        this._imageURL = "assets/profile-picture/" + this.identity.image;
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode, this.arrayNightMode);
        }
    };
    UserEditComponent.prototype.fileHandler = function (files) {
        var _this = this;
        if (files.length === 0)
            return;
        if (files[0].size > 1232896) {
            this.imageSize = false;
        }
        else {
            this.imageSize = true;
        }
        console.log("size:" + files[0].size); // *Cambiar* -> Poner limitaciones, desactivar el botón si no las cumple
        // https://stackoverflow.com/questions/29280473/how-can-i-use-angluarjs-to-disable-a-button-if-a-value-is-bigger-than-255
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            console.log("Sólo se admiten imágenes.");
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this._imageURL = reader.result;
            _this.user.imageToUpload = {
                filename: _this.nameGen(),
                filetype: files[0].type.replace('image/', ''),
                value: reader.result.split(',')[1],
                base64: _this._imageURL
            };
        };
    };
    UserEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.pwdChange = false;
        if (this.user.description != "" && this.user.description != null) {
            console.log(this.user.description);
            this.user.description = this._commonService.noscript(this.user.description);
        }
        if (this.user.password != null || this.confirmPassword != null || this.oldPassword != null) {
            this.pwdChange = true;
            var oldPass = {
                oldPass: this.oldPassword
            };
            if (this.user.password != null && this.confirmPassword != null && this.oldPassword != null) {
                this.passMatch = true;
                if (this.user.password == this.confirmPassword) {
                    this._userService.checkPass(this.token, oldPass).subscribe(function (response) {
                        if (response.status == "success") {
                            _this.changeUserSettings(_this);
                        }
                        else {
                            _this.status = "error";
                            _this._commonService.displayNotification(_this);
                            _this.checker = 0;
                        }
                    }, function (error) { });
                }
                else {
                    this.passMatch = false;
                }
            }
        }
        else {
            this.pwdChange = false;
        }
        if (this.imageSize == true && (this.pwdChange == false || this.newPwd == true)) {
            this.changeUserSettings(this);
        }
    };
    UserEditComponent.prototype.changeUserSettings = function (e) {
        var _this = this;
        this._userService.update(this.token, this.user).subscribe(function (response) {
            if (response && response.status == "success") {
                _this.status = "success";
                _this._commonService.displayNotification(e);
                _this.identity = response.user;
                _this.user = response.user;
                console.log(_this.token);
                console.log(response);
                _this.pwdChange = true;
                localStorage.setItem('identity', JSON.stringify(_this.identity));
                if (_this.oldPassword != null) {
                    _this.oldPassword = null;
                    _this.confirmPassword = null;
                    _this.user.password = null;
                }
            }
            else {
                _this.status = "error";
                _this._commonService.displayNotification(e);
            }
            console.log(response);
        }, function (error) {
            _this.status = "error";
            _this._commonService.displayNotification(e);
            console.log(error);
        });
    };
    UserEditComponent.prototype.select = function (event, element) {
        this.render.removeClass(document.querySelector(".chosen"), "chosen");
        this.render.addClass(event.target, "chosen");
        this.element = element;
    };
    UserEditComponent.prototype.nameGen = function () {
        var randomName = "";
        for (var i = 0; i < 10; i++) {
            var letter = Math.random() * 25 + 65;
            randomName += String.fromCharCode(letter);
        }
        randomName += "-";
        for (var i = 0; i < 6; i++) {
            var number = Math.random() * 9 + 48;
            randomName += String.fromCharCode(number);
        }
        return randomName;
    };
    UserEditComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user-edit',
            template: __webpack_require__(/*! ./user-edit.component.html */ "./src/app/components/user-edit/user-edit.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]],
            styles: [__webpack_require__(/*! ./user-edit.component.css */ "./src/app/components/user-edit/user-edit.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], UserEditComponent);
    return UserEditComponent;
}());



/***/ }),

/***/ "./src/app/models/image.ts":
/*!*********************************!*\
  !*** ./src/app/models/image.ts ***!
  \*********************************/
/*! exports provided: Image */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return Image; });
var Image = /** @class */ (function () {
    function Image(id, user_id, url, name, description, status, nsfw, epilepsy, createdAt, updatedAt, rights, tags, imageToUpload) {
        this.id = id;
        this.user_id = user_id;
        this.url = url;
        this.name = name;
        this.description = description;
        this.status = status;
        this.nsfw = nsfw;
        this.epilepsy = epilepsy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.rights = rights;
        this.tags = tags;
        this.imageToUpload = imageToUpload;
    }
    return Image;
}());



/***/ }),

/***/ "./src/app/models/user.ts":
/*!********************************!*\
  !*** ./src/app/models/user.ts ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(id, name, nick, password, email, description, role, createdAt, imageToUpload // Antes userImage
    ) {
        this.id = id;
        this.name = name;
        this.nick = nick;
        this.password = password;
        this.email = email;
        this.description = description;
        this.role = role;
        this.createdAt = createdAt;
        this.imageToUpload = imageToUpload;
    }
    return User;
}());



/***/ }),

/***/ "./src/app/services/common.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/common.service.ts ***!
  \********************************************/
/*! exports provided: CommonService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonService", function() { return CommonService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






var CommonService = /** @class */ (function () {
    function CommonService(_http, _userService, _router, render) {
        this._http = _http;
        this._userService = _userService;
        this._router = _router;
        this.render = render;
        this.url = _global__WEBPACK_IMPORTED_MODULE_3__["global"].url;
        this.confError = 0;
        this.setCError = 0;
    }
    CommonService.prototype.getUserConfig = function (that, token) {
        var _this = this;
        if (token != null) {
            that._userService.getConfig(token).subscribe(function (response) {
                if (!response.status || response.status != 'error') {
                    var config;
                    if (response.config != null) {
                        config = {
                            nightMode: response.config.nightMode,
                            nsfw: response.config.nsfw,
                            epilepsy: response.config.epilepsy,
                            lang: response.config.lang,
                            color: response.config.color,
                            share: response.config.share,
                            feed: response.config.feed
                        };
                    }
                    else {
                        config = {
                            nightMode: 0,
                            nsfw: 0,
                            epilepsy: 0,
                            color: "blue",
                            lang: "spanish",
                            share: 1,
                            feed: 15
                        };
                    }
                    var configJSON = JSON.stringify(config);
                    localStorage.setItem('config', configJSON);
                }
                else {
                }
            }, function (error) {
                /*
                Falla pero hace las cosas (?)
                */
                console.log("getConfig()");
                console.log("Ero..." + " attempt: " + _this.confError);
                if (_this.confError < 5) {
                    _this.getUserConfig(that, token);
                    _this.confError++;
                }
            });
        }
        else {
            var config = {
                nightMode: 0,
                nsfw: 0,
                epilepsy: 0,
                color: "blue",
                lang: "spanish",
                share: 1,
                feed: 15
            };
            var configJSON = JSON.stringify(config);
            localStorage.setItem('config', configJSON);
        }
    };
    CommonService.prototype.setUserConfig = function (that, token, data) {
        var _this = this;
        that._userService.setConfig(token, data).subscribe(function (response) {
            if (!response.status || response.status != 'error') {
                console.log(response);
                var config = {
                    nightMode: response.config.nightMode,
                    nsfw: response.config.nsfw,
                    epilepsy: response.config.epilepsy,
                    lang: response.config.lang,
                    color: response.config.color,
                    share: response.config.share,
                    feed: response.config.feed
                };
                var configJSON = JSON.stringify(config);
                localStorage.setItem('config', configJSON);
                _this.getUserConfig(_this, token);
            }
            else {
            }
            // console.log(response);
        }, function (error) {
            console.log("setConfig()");
            console.log("Ero..." + " attempt: " + _this.setCError);
            if (_this.setCError < 5) {
                _this.setUserConfig(that, token, data);
                _this.setCError++;
            }
        });
    };
    CommonService.prototype.changeNightModeAttr = function (nightMode, array) {
        var container = nightMode == true ? "night-container" : "day-container";
        var background = nightMode == true ? "night-bg" : "day-bg";
        if (nightMode == true) {
            this.render.removeClass(document.querySelector(".container-ma"), array[0]);
            this.render.addClass(document.querySelector(".container-ma"), array[1]);
            this.render.removeClass(document.body, array[2]);
            this.render.addClass(document.body, array[3]);
            this.render.removeClass(document.querySelector(".navbar"), "navbar-day");
            this.render.addClass(document.querySelector(".navbar"), "navbar-night");
        }
        else {
            this.render.addClass(document.querySelector(".container-ma"), array[0]);
            this.render.removeClass(document.querySelector(".container-ma"), array[1]);
            this.render.addClass(document.body, array[2]);
            this.render.removeClass(document.body, array[3]);
            this.render.removeClass(document.querySelector(".navbar"), "navbar-night");
            this.render.addClass(document.querySelector(".navbar"), "navbar-day");
        }
    };
    CommonService.prototype.noscript = function (string) {
        console.log(string);
        string = string.replace(/\<script\>/g, "Not today..."); // Evitar que se metan scripts
        string = string.replace(/\<\/script\>/g, "... but good try."); // en la db
        string = string.replace(/\</g, "(");
        string = string.replace(/\>/g, ")");
        return string;
    };
    CommonService.prototype.formatText = function (str) {
        str = str.replace(/\\n/g, "<br>");
        var search = str.search(/@/g);
        var at, end;
        var found = false;
        var foundAt = 999;
        var delimiter = [" ", ".", ",", ":", ";"];
        if (search != -1) {
            for (var j = 0; j < delimiter.length; j++) {
                end = str.indexOf(delimiter[j], search);
                if (end < foundAt && end != -1) {
                    foundAt = end;
                }
            }
            end = foundAt;
            if (end != 999) {
                found = true;
            }
            if (found == true) {
                at = str.slice(search, end);
                str = str.replace(at, "<span class='user-at' (click)='this._commonService.redirectToProfile(at)'>" + at + "</span>");
            }
        }
        return str;
    };
    CommonService.prototype.redirectToProfile = function (at) {
        this._router.navigateByUrl("/profile" + at);
    };
    CommonService.prototype.dateFormat = function (that) {
        var str = that;
        if (Date.parse(that) > 0) {
            var mydate = new Date(that);
            var month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][mydate.getMonth()];
            str = mydate.getDate() + " de " + month + " del " + mydate.getFullYear() + " a las " + mydate.getHours() + ":" + mydate.getMinutes();
        }
        return str;
    };
    CommonService.prototype.displayNotification = function (e) {
        setTimeout(function () {
            e.status = "";
        }, 3000);
    };
    CommonService.prototype.loadUser = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // console.log(this.token);
    };
    CommonService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]])
    ], CommonService);
    return CommonService;
}());

/*


    formatText(str) {

        str = str.replace(/\\n/g, "<br>");
        // let search = str.search(/@/g);
        let search;
        let found;
        let delimiter = [" ", ".", ",", ":", ";"];

        for (let i = 0; i < str.length; i++) {
            found = false;
            search = str.charAt(i);
            if (search == "@") {
                found = true;
                let at, end, foundAt = 999;

                for (let j = 0; j < delimiter.length; j++) {
                    end = str.indexOf(delimiter[j], i);
                    if (end < foundAt) {
                        foundAt = end;
                    }
                }

                if (end == -1) {
                    end = str.length;
                }
                at = str.slice(i, end);
                str = str.replace(at, "<span class='user-at' [href]=['/profile'," + at + "]>" + at + "</span>");
                i = end + 1;
            }
        }

        return str;
    }

*/ 


/***/ }),

/***/ "./src/app/services/global.ts":
/*!************************************!*\
  !*** ./src/app/services/global.ts ***!
  \************************************/
/*! exports provided: global */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "global", function() { return global; });
var global = {
    url: 'http://localhost/moonart/api-rest-symfony/public/'
};


/***/ }),

/***/ "./src/app/services/identity.guard.ts":
/*!********************************************!*\
  !*** ./src/app/services/identity.guard.ts ***!
  \********************************************/
/*! exports provided: IdentityGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdentityGuard", function() { return IdentityGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
// Comprobar si el user está logueado. Si no, no permitir que acceda a las páginas donde se requiera estarlo. (Mi perfil, cerrar sesión...)




var IdentityGuard = /** @class */ (function () {
    function IdentityGuard(_router, _userService) {
        this._router = _router;
        this._userService = _userService;
    }
    IdentityGuard.prototype.canActivate = function () {
        var identity = this._userService.getIdentity();
        if (identity && identity.nick != 'guest') {
            return true;
        }
        else {
            this._router.navigate(['/login']);
            return false;
        }
    };
    IdentityGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], IdentityGuard);
    return IdentityGuard;
}());



/***/ }),

/***/ "./src/app/services/identity2.guard.ts":
/*!*********************************************!*\
  !*** ./src/app/services/identity2.guard.ts ***!
  \*********************************************/
/*! exports provided: Identity2Guard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Identity2Guard", function() { return Identity2Guard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
// Comprobar si el user está logueado. Si sí, no permitir que acceda a las páginas donde se requiera no estarlo. (Login, register...)




var Identity2Guard = /** @class */ (function () {
    function Identity2Guard(_router, _userService) {
        this._router = _router;
        this._userService = _userService;
    }
    Identity2Guard.prototype.canActivate = function () {
        var identity = this._userService.getIdentity();
        if (identity && identity.nick != 'guest') { // O null (no accedido) o Object (accedido)
            this._router.navigate(['/home']);
            return false;
        }
        else {
            return true; // Si devuelve true, va a la localización a la que se está intentando acceder.
        }
    };
    Identity2Guard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], Identity2Guard);
    return Identity2Guard;
}());



/***/ }),

/***/ "./src/app/services/image.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/image.service.ts ***!
  \*******************************************/
/*! exports provided: ImageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageService", function() { return ImageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");




var ImageService = /** @class */ (function () {
    function ImageService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_3__["global"].url;
    }
    ImageService.prototype.upload = function (token, image) {
        var json = JSON.stringify(image);
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        // .set('Access-Control-Allow-Origin', '*')
        // .set('Access-Control-Request-Headers', '*');
        return this._http.post(this.url + 'image/new', params, { headers: headers });
    };
    ImageService.prototype.getImages = function (token) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.get(this.url + 'image/list', { headers: headers });
    };
    ImageService.prototype.getAllImages = function (page, nsfw, epilepsy, user, isProfileUser) {
        if (user === void 0) { user = ""; }
        if (isProfileUser === void 0) { isProfileUser = false; }
        if (!page) {
            page = 1;
        }
        return this._http.get(this.url + 'image/list/all?page=' + page + '&nsfw=' + nsfw + '&epilepsy=' + epilepsy
            + '&user=' + user + '&isProfileUser=' + isProfileUser);
    };
    ImageService.prototype.getSearchImages = function (page, nsfw, epilepsy, querySelector, search) {
        if (!page) {
            page = 1;
        }
        return this._http.get(this.url + 'image/search?page=' + page + '&nsfw=' + nsfw + '&epilepsy=' + epilepsy
            + '&querySelector=' + querySelector + '&search=' + search);
    };
    ImageService.prototype.getProfileImages = function (page, nsfw, epilepsy, user_id, interaction, user) {
        if (user === void 0) { user = ""; }
        if (!page) {
            page = 1;
        }
        return this._http.get(this.url + 'image/faved?page=' + page + '&nsfw=' + nsfw + '&epilepsy=' + epilepsy
            + '&user_id=' + user_id + '&interaction=' + interaction + '&user=' + user);
    };
    ImageService.prototype.getImage = function (id) {
        return this._http.get(this.url + 'image/details?id=' + id);
    };
    ImageService.prototype.update = function (token, image, id) {
        var json = JSON.stringify(image);
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.put(this.url + 'image/update-image/' + id, params, { headers: headers });
    };
    ImageService.prototype.delete = function (token, id) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.delete(this.url + 'image/remove/' + id, { headers: headers });
    };
    ImageService.prototype.hide = function (token, id, action) {
        var params = 'action=' + action;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.put(this.url + 'image/hide/' + id, params, { headers: headers }); // Si no hay 3 args, headers se pasa como parámentro
    };
    ImageService.prototype.checkInteractions = function (token, data) {
        var json = JSON.stringify(data);
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.post(this.url + 'check', params, { headers: headers });
    };
    ImageService.prototype.interact = function (token, data, status) {
        var json = JSON.stringify(data);
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        if (status == true) {
            return this._http.put(this.url + 'update_interaction', params, { headers: headers });
        }
        else {
            return this._http.post(this.url + 'create_interaction', params, { headers: headers });
        }
    };
    ImageService.prototype.getComments = function (imageId) {
        return this._http.get(this.url + 'image/get-comments?imageId=' + imageId);
    };
    ImageService.prototype.addComment = function (token, json) {
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.post(this.url + 'image/add-comment', params, { headers: headers });
    };
    ImageService.prototype.deleteComment = function (token, id) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.delete(this.url + 'image/comment/remove/' + id, { headers: headers });
    };
    ImageService.prototype.getShared = function (token, index, quantity, nsfw, epilepsy) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.get(this.url + 'user/feed?index=' + index + "&qt=" + quantity + "&nsfw=" + nsfw
            + "&epilepsy=" + epilepsy, { headers: headers });
    };
    ImageService.prototype.getInteractionsCount = function (id) {
        return this._http.get(this.url + 'image/interactions?id=' + id);
    };
    // Funciones comunes a varios componentes
    ImageService.prototype.showAllImages = function (that, page, nsfw, epilepsy, user, isProfileUser) {
        var _this = this;
        if (user === void 0) { user = null; }
        if (isProfileUser === void 0) { isProfileUser = false; }
        this.getAllImages(page, nsfw, epilepsy, user, isProfileUser).subscribe(function (response) {
            console.log(response);
            that.images = response.images;
            var number_pages = [];
            for (var i = 1; i <= response.total_pages; i++) {
                number_pages.push(i);
            }
            that.number_pages = number_pages;
            that.total_pages = response.total_pages;
            if (page >= 2) {
                that.prev_page = page - 1;
            }
            else {
                that.prev_page = 1;
            }
            if (page < response.total_pages) {
                that.next_page = page + 1;
            }
            else {
                that.next_page = response.total_pages;
            }
            _this.getInteractions(that);
        }, function (error) {
            console.log("getAllImages()");
            console.log("Ero..." + " attempt: " + that.imagError);
            if (that.imagError < 5) {
                _this.showAllImages(that, page, nsfw, epilepsy, user = null);
                that.imagError++;
            }
        });
    };
    ImageService.prototype.showImageSearch = function (that, page, nsfw, epilepsy, querySelector, search) {
        var _this = this;
        this.getSearchImages(page, nsfw, epilepsy, querySelector, search).subscribe(function (response) {
            console.log(response);
            that.images = response.images;
            var number_pages = [];
            for (var i = 1; i <= response.total_pages; i++) {
                number_pages.push(i);
            }
            that.number_pages = number_pages;
            that.total_pages = response.total_pages;
            if (page >= 2) {
                that.prev_page = page - 1;
            }
            else {
                that.prev_page = 1;
            }
            if (page < response.total_pages) {
                that.next_page = page + 1;
            }
            else {
                that.next_page = response.total_pages;
            }
            _this.getInteractions(that);
        }, function (error) {
            console.log("getSearchImages()");
            console.log("Ero..." + " attempt: " + that.searError);
            if (that.searError < 5) {
                _this.showImageSearch(that, page, nsfw, epilepsy, querySelector, search);
                that.searError++;
            }
        });
    };
    ImageService.prototype.showProfileInteractions = function (that, page, nsfw, epilepsy, user_id, interaction, user) {
        var _this = this;
        if (user === void 0) { user = null; }
        this.getProfileImages(page, nsfw, epilepsy, user_id, interaction, user = "").subscribe(function (response) {
            that.images = response.images;
            console.log(response);
            var number_pages = [];
            for (var i = 1; i <= response.total_pages; i++) {
                number_pages.push(i);
            }
            that.number_pages = number_pages;
            that.total_pages = response.total_pages;
            if (page >= 2) {
                that.prev_page = page - 1;
            }
            else {
                that.prev_page = 1;
            }
            if (page < response.total_pages) {
                that.next_page = page + 1;
            }
            else {
                that.next_page = response.total_pages;
            }
            _this.getInteractions(that);
        }, function (error) {
            console.log(error);
        });
    };
    ImageService.prototype.getInteractions = function (that, unique) {
        if (unique === void 0) { unique = null; }
        // (home.component, images.component...) Se encarga de
        if (that.identity != null && that.identity.nick != 'guest') {
            var less = false;
            if (unique == true) {
                that.images.length = 1;
            }
            for (var i = 0; i < that.images.length; i++) {
                var checkLoader = function checkLoader(those, i) {
                    var imageId, selector;
                    if (unique == true) {
                        imageId = that.images.id;
                        selector = ".image-actions";
                    }
                    else {
                        imageId = that.images[i][0].id;
                        selector = "#id-" + imageId;
                    }
                    var data = {
                        user_id: that.identity.sub,
                        image_id: imageId,
                        action: "",
                        method: ""
                    };
                    that._imageService.checkInteractions(that.token, data).subscribe(function (response) {
                        if (document.querySelector(selector)) {
                            if (response.liked) {
                                that.render.addClass(document.querySelector(selector).parentElement
                                    .parentElement.querySelector(".image-heart"), "image-liked");
                            }
                            if (response.faved) {
                                that.render.addClass(document.querySelector(selector).parentElement
                                    .parentElement.querySelector(".image-star"), "image-faved");
                            }
                            if (response.shared) {
                                that.render.addClass(document.querySelector(selector).parentElement
                                    .parentElement.querySelector(".image-arrows"), "image-shared");
                            }
                            var hasBeen = false;
                            if (response.liked != null || response.faved != null || response.shared != null) {
                                hasBeen = true;
                            }
                            else {
                                hasBeen = false;
                            }
                            if ((response.liked == null || response.faved == null || response.shared == null) && hasBeen == true) {
                                checkLoader(that, i);
                            }
                        }
                    }, function (error) {
                        checkLoader(that, i);
                    });
                };
                checkLoader(this, i);
            }
        }
    };
    ImageService.prototype.saveInteraction = function (event, that, action, unique) {
        if (unique === void 0) { unique = null; }
        var id;
        var estado;
        var selectedImage;
        if (unique == true) {
            selectedImage = document.querySelector(".image");
            selectedImage = selectedImage.src;
            id = that.imageId;
            that.updateCounter(event, that, action);
        }
        else {
            selectedImage = event.target.parentElement.parentElement.querySelector(".image-element").src;
            selectedImage = selectedImage.split("/");
            selectedImage = selectedImage[selectedImage.length - 1];
            for (var i = 0; i < that.images.length; i++) {
                if (that.images[i][0].url == selectedImage) {
                    id = that.images[i][0].id;
                }
            }
        }
        var data = {
            user_id: that.identity.sub,
            image_id: id,
            action: "",
            method: ""
        };
        that._imageService.checkInteractions(that.token, data).subscribe(function (response) {
            if (!response.status || response.status != 'error') {
                estado = response;
                // console.log(response.isset_interactions);
                data.action = action;
                if (response.found == true) {
                    data.method = "PUT";
                }
                else {
                    data.method = "POST";
                }
                that._imageService.interact(that.token, data, estado).subscribe(function (response) {
                    if (response.params.liked) {
                        that.render.addClass(event.target.parentElement.querySelector(".image-heart"), "image-liked");
                    }
                    else {
                        that.render.removeClass(event.target.parentElement.querySelector(".image-heart"), "image-liked");
                    }
                    if (response.params.faved) {
                        that.render.addClass(event.target.parentElement.querySelector(".image-star"), "image-faved");
                    }
                    else {
                        that.render.removeClass(event.target.parentElement.querySelector(".image-star"), "image-faved");
                    }
                    if (response.params.shared) {
                        that.render.addClass(event.target.parentElement.querySelector(".image-arrows"), "image-shared");
                    }
                    else {
                        that.render.removeClass(event.target.parentElement.querySelector(".image-arrows"), "image-shared");
                    }
                }, function (error) {
                    console.log(error);
                });
            }
            else {
            }
        }, function (error) {
        });
    };
    // Métodos para los hover en las imágenes, para que los padres e hijos tengan los estilos convenientes.
    ImageService.prototype.in = function (event, that, value) {
        that.render.addClass(event.target.parentElement.parentElement.querySelector(".image-element"), "hovered-children");
        that.render.addClass(event.target.parentElement.parentElement.parentElement.querySelector(".image-parent"), "hovered-parent");
        if (value == 1) {
            that.render.addClass(event.target.parentElement.parentElement.querySelector(".like"), "like-hovered");
        }
        else if (value == 2) {
            that.render.addClass(event.target.parentElement.parentElement.querySelector(".fav"), "fav-hovered");
        }
        else if (value == 3) {
            that.render.addClass(event.target.parentElement.parentElement.querySelector(".share"), "share-hovered");
        }
    };
    ImageService.prototype.out = function (event, that, value) {
        that.render.removeClass(event.target.parentElement.parentElement.querySelector(".image-element"), "hovered-children");
        that.render.removeClass(event.target.parentElement.parentElement.parentElement.querySelector(".image-parent"), "hovered-parent");
        if (value == 1) {
            that.render.removeClass(event.target.parentElement.parentElement.querySelector(".like"), "like-hovered");
        }
        else if (value == 2) {
            that.render.removeClass(event.target.parentElement.parentElement.querySelector(".fav"), "fav-hovered");
        }
        else if (value == 3) {
            that.render.removeClass(event.target.parentElement.parentElement.querySelector(".share"), "share-hovered");
        }
    };
    ImageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ImageService);
    return ImageService;
}());



/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");




var UserService = /** @class */ (function () {
    function UserService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_3__["global"].url;
        this.isFwError = 0;
    }
    UserService.prototype.prueba = function () {
        return 'Hey';
    };
    UserService.prototype.register = function (user) {
        var json = JSON.stringify(user);
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'register', params, { headers: headers });
    };
    UserService.prototype.signup = function (user, getToken) {
        if (getToken === void 0) { getToken = null; }
        if (getToken != null) {
            user.getToken = 'true';
        }
        var json = JSON.stringify(user);
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers: headers });
    };
    UserService.prototype.update = function (token, user) {
        var json = JSON.stringify(user);
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.put(this.url + 'user/update_user', params, { headers: headers });
    };
    UserService.prototype.checkPass = function (token, password) {
        var json = JSON.stringify(password);
        var params = 'json=' + json;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.post(this.url + 'user/check_password', params, { headers: headers });
    };
    UserService.prototype.getIdentity = function () {
        var identity = JSON.parse(localStorage.getItem('identity'));
        if (identity && identity != undefined) {
            this.identity = identity;
            this.nick = identity.nick;
            this.role = identity.role;
        }
        else {
            this.identity = {
                nick: "guest",
                role: "role_guest"
            };
        }
        return this.identity;
    };
    UserService.prototype.getToken = function () {
        var token = localStorage.getItem('token');
        if (token && token != undefined) {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    };
    UserService.prototype.setConfig = function (token, data) {
        var params = 'json=' + data;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.put(this.url + 'user/update_config', params, { headers: headers });
    };
    UserService.prototype.getConfig = function (token) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.get(this.url + 'user/get_config', { headers: headers });
    };
    UserService.prototype.getUserByNick = function (nick) {
        return this._http.get(this.url + 'user/get_user?nick=' + nick);
    };
    UserService.prototype.userInfo = function (that, nick) {
    };
    UserService.prototype.getIsFollowing = function (token, nick) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.get(this.url + 'user/get-follow?nick=' + nick, { headers: headers });
    };
    UserService.prototype.follow = function (token, userToFollow) {
        var params = 'nick=' + userToFollow;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        return this._http.post(this.url + 'user/follow-unfollow', params, { headers: headers });
    };
    UserService.prototype.getUserFollows = function (id) {
        return this._http.get(this.url + 'user/get-user-follows?id=' + id);
    };
    UserService.prototype.checkFollowing = function (that, name, userclass) {
        var _this = this;
        if (name === void 0) { name = false; }
        if (userclass === void 0) { userclass = ""; }
        var unique = true;
        var selector;
        if (name != false) {
            that.username = name;
            unique = false;
            selector = "button[name=" + userclass + "]";
        }
        if (that.username != that.identity.nick && that.identity.nick != 'guest') {
            that.isOwner = false;
            that._userService.getIsFollowing(that.token, that.username).subscribe(function (response) {
                if (response.status == "success") {
                    that.isFollowing = response.following;
                    if (that.isFollowing == true) {
                        if (unique == true) {
                            that.render.removeClass(document.querySelector(".button-follow"), "no-follow");
                            that.render.addClass(document.querySelector(".button-follow"), "follow");
                        }
                        else {
                            var query = document.querySelectorAll(selector);
                            for (var i = 0; i < query.length; i++) {
                                that.render.removeClass(query[i], "no-follow");
                                that.render.addClass(query[i], "follow");
                            }
                            // that.render.removeClass(document.querySelectorAll(selector), "no-follow");
                            // that.render.addClass(document.querySelectorAll(selector), "follow");
                        }
                    }
                    else {
                        if (unique == true) {
                            that.render.addClass(document.querySelector(".button-follow"), "no-follow");
                            that.render.removeClass(document.querySelector(".button-follow"), "follow");
                        }
                        else {
                            var query = document.querySelectorAll(selector);
                            for (var i = 0; i < query.length; i++) {
                                that.render.addClass(query[i], "no-follow");
                                that.render.removeClass(query[i], "follow");
                            }
                            // that.render.addClass(document.querySelectorAll(selector), "no-follow");
                            // that.render.removeClass(document.querySelectorAll(selector), "follow");
                        }
                    }
                }
            }, function (error) {
                console.log("getIsFollowing()");
                console.log("Ero..." + " attempt: " + _this.isFwError);
                if (_this.isFwError < 5) {
                    _this.checkFollowing(that);
                    _this.isFwError++;
                }
            });
        }
    };
    UserService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




// enableProdMode();
if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Programs\wamp64\www\moonart\moonart-angular\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map