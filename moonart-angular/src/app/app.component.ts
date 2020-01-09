import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { Renderer2 } from '@angular/core';
import { CommonService } from './services/common.service';
// import { SettingsComponent } from '../app/components/settings/settings.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UserService, CommonService],
    // template: `<app-settings
    // (emitter)="onEmited($event)">
    //   </app-settings>`
})
export class AppComponent implements OnInit, DoCheck {
    title = 'moonart-angular';
    public identity: any;
    public token: string;
    public config: any;
    public configJSON: string;
    public arrayNavs: Array<string>;
    public arrayNightMode: Array<string>;
    public i: number;
    public searchQuery;
    public language: Object;
    public currentLang: Object;
    public lang: number;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _router: Router,
        private render: Renderer2
    ) {
        this.i = 0;
        this.searchQuery = '';
    }

    ngOnInit() {
        this.token = this._userService.getToken();

        this._commonService.getUserConfig(this, this.token);

        this.lang = JSON.parse(localStorage.getItem("config")).lang ? JSON.parse(localStorage.getItem("config")).lang : 1;
        this.currentLang = this.getLang(this.lang);
    }

    ngDoCheck() {
        this.header(this);
        this.loadUser();
    }

    loadUser() {

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    changeColor(color) {
        let array = ["nav-red", "nav-green", "nav-blue", "nav-violet", "nav-orange", "nav-yellow", "nav-light"];

        for (let i = 0; i < array.length; i++) {
            this.render.removeClass(document.querySelector(".nav-background"), array[i]);
        }

        this.render.addClass(document.querySelector(".nav-background"), "nav-" + color);
    }

    header(that) {
        if (localStorage.getItem("config") == "undefined" || localStorage.getItem("config") == null) {
            setTimeout(function () {
                that.header(that);
            }, 100);

        }
        else {
            that.configJSON = localStorage.getItem("config");
            that.config = JSON.parse(that.configJSON);
            // console.log(that.config.color);
            that.changeColor(that.config.color);
        }
        that.i++;
    }

    validateSearch() {
        if (this.searchQuery != null && this.searchQuery != "") {
            // this.searchQuery = this.searchQuery.replace(" ", "");
            this._router.navigate(['/search'],
                { queryParams: { q: this.searchQuery } });
        }
    }

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: null,
                    gallery: "Gallery",
                    feed: "Feed",
                    uploadImage: "Upload image",
                    searchImage: "Search images",
                    login: "Login",
                    register: "Register",
                    welcomeMsg: "Hi",
                    profile: "Profile",
                    editProfile: "Edit profile",
                    config: "Configuration",
                    exit: "Exit"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: null,
                    gallery: "Galería",
                    feed: "Feed",
                    uploadImage: "Subir imagen",
                    searchImage: "Buscar imágenes",
                    login: "Entrar",
                    register: "Registrarse",
                    welcomeMsg: "Hola",
                    profile: "Perfil",
                    editProfile: "Editar perfil",
                    config: "Configuración",
                    exit: "Salir"
                }
            }
        ];

        return this.language[(lang - 1)];
    }

    onEmited(lang) {
        this.lang = lang;
        this.currentLang = this.getLang(lang);
        this._commonService.changeLangAttr(lang);
    }

    // https://stackoverflow.com/questions/38393494/how-to-emit-event-in-router-outlet-in-angular2
    onActivate(elementRef) {
        if (elementRef.emitter) // Adds emitter only if there is an EventEmitter defined on the module (Settings)
            elementRef.emitter.subscribe(event => {
                this.onEmited(event)
            });
    }
}

