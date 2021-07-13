import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { Renderer2 } from '@angular/core';
import { CommonService } from './services/common.service';
import * as $ from 'jquery';

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
    public navHeight: number;
    public i: number;
    public searchQuery;
    public navStatus: number;
    public language: Object;
    public currentLang: any;
    public lang: number;
    public alertStatus: String;
    public alertMessage: String;
    public alertsArray: any = []; // Array<Object> = []; <- Leave as any, or create a new interface
    public alertCounter: number = 0;
    public position: number = 0;


    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _router: Router,
        private render: Renderer2
    ) {
        this.i = 0;
        this.searchQuery = '';
        this.alertStatus = 'iddle';
    }

    ngOnInit() {
        this.token = this._userService.getToken();

        this._commonService.getUserConfig(this, this.token);

        this.lang = JSON.parse(localStorage.getItem("config")).lang ? JSON.parse(localStorage.getItem("config")).lang : 1;
        this.currentLang = this.getLang(this.lang);

        this.navHeight = $(".clip").height();
        this.navStatus = 1;

        console.log(this.alertsArray);
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
        let array = ["red", "green", "blue", "violet", "orange", "yellow", "light", "zoe"];
        this.render.setAttribute(document.querySelector(".nav-background > div"), "data-theme", color);

        let elements = document.querySelectorAll(".themed");

        for (let i = 0; i < elements.length; i++) {
            this.render.setAttribute(elements[i], "data-theme", color);
        }
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

    toggle() {
        if ($(".menu-toggle").css("display") != "none") {
            let elements = document.querySelectorAll("[data-view]");
            let status = document.querySelector(".navbar[data-theme]");
            this.render.setAttribute(status, "data-status", (this.navStatus === 1 ? "solid" : "liquid"));


            for (let i = 0; i < elements.length; i++) {
                this.render.setAttribute(elements[i], "data-view", this.navStatus.toString());
            }

            // this.render.setAttribute(document.querySelector("[data-toggle]"), "data-toggle", this.navStatus.toString());

            this.navStatus = (this.navStatus + 1) % 2;
        }
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
                    exit: "Log out"
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

    /*
     *
     * @params
     *      emit: Emitted element
     *      emitType: Type of emit (defined at ../../models/struct.ts)
     *
     */
    onEmited(emit) {
        console.log(emit);

        switch (emit.type) {
            case 1:
                this.lang = emit.lang;
                this.currentLang = this.getLang(emit.lang);
                this._commonService.changeLangAttr(emit.lang);
                break;

            case 2:
                this.alertStatus = emit.notificationType;

                this.position = this.alertsArray.length && this.alertsArray[0].position === 0 ? this.alertsArray[this.alertsArray.length - 1].position + 70 : 0;
                const newAlert = {
                    ref: ++this.alertCounter,
                    type: emit.status,
                    message: emit.message,
                    position: this.position
                }
                this.alertsArray.push(newAlert);

                const response = new Promise((resolve, reject) => {
                    this._commonService.displayNotification(newAlert.message, false, this.alertsArray, newAlert.ref, resolve);
                });

                response.then((val: any) => {
                    let arr: any = this.alertsArray;
                    arr = arr.filter(function (item) {
                        return item.ref !== val.ref
                    });

                    const initialPosition = arr.length > 0 ? arr[0].position : 0;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].position -= initialPosition;
                    };

                    this.alertsArray = arr;
                });

                break;

            default:
                break;
        }
    }

    // https://stackoverflow.com/questions/38393494/how-to-emit-event-in-router-outlet-in-angular2
    onActivate(elementRef) {
        if (elementRef.emitter) { // Adds emitter only if there is an EventEmitter defined on the module (Settings)
            elementRef.emitter.subscribe(event => {
                console.log(elementRef);
                this.onEmited(event)
            });
        }
    }
}

