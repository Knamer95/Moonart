// https://stackoverflow.com/questions/51568283/how-do-i-get-bootstrap-components-work-with-angular-6

import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from 'jquery';

import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { AppComponent } from '../../app.component';
import { emitterTypes } from '../../models/struct';

declare var jQuery: any;

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [UserService, CommonService, AppComponent]
})
export class SettingsComponent implements OnInit, AfterViewInit {

    public pageTitle: string = "Settings";
    public identity: any;
    public token: string;
    public color: string;
    public nightMode: boolean = false;
    public nsfw: boolean = true;
    public epilepsy: boolean = true;
    public share: boolean = true;
    public feed: number = 15;
    public scroll: boolean = true; // If true, shows galleries as scroll. Otherwise it shows them paginated
    public language: Object;
    public lang: number;
    public currentLang: any;
    public emitType: number;

    // @Input()
    // set currentLang(currentLang: any) {
    // this._currentLang = currentLang;
    // }

    // get currentLang(): Object { return this._currentLang; }
    @Output() emitter = new EventEmitter();

    updateLang() {
        var updateConfigJSON = localStorage.getItem("config");
        var updateConfig = JSON.parse(updateConfigJSON);
        this.lang = parseInt($("select option:selected").attr("data-id"));
        this.currentLang = this.getLang(this.lang);
        
        updateConfig.lang = parseInt($("select option:selected").attr("data-id"));
        localStorage.setItem("config", JSON.stringify(updateConfig));
        
        this.emitter.emit({
            type: emitterTypes.lang,
            status: "success",
            notificationType: "success",
            lang: this.lang
        });

        $(".event-emitter").click(); // To propagate the emitter, you have to bubble (adding the event to a children element). Then we simulate a click on the element with jQuery.
    }

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _appComponent: AppComponent,
        private _route: ActivatedRoute,
        private render: Renderer2,
        private elementRef: ElementRef
    ) {
    }

    ngOnInit() {
        document.title = this.pageTitle;

        this.loadUser();

        var defaultLoadJSON = localStorage.getItem("config");
        var defaultLoad = JSON.parse(defaultLoadJSON);

        this.nightMode = defaultLoad.nightMode;
        this.nsfw = defaultLoad.nsfw;
        this.epilepsy = defaultLoad.epilepsy;
        this.color = defaultLoad.color;
        this.share = defaultLoad.share;
        this.feed = defaultLoad.feed;
        this.scroll = defaultLoad.scroll;

        this.render.addClass(document.querySelector("." + this.color), "chosen");

        // if (localStorage.getItem("user") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode);
        // }

        this.scroll = JSON.parse(localStorage.getItem("config")).scroll;
        this.lang = JSON.parse(localStorage.getItem("config")).lang;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    ngAfterViewInit() {

        // https://select2.github.io/select2/ // Mirar "Infinite Scroll with Remote Data"

        function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='assets/img/flags/png/" + state.id.toLowerCase() + ".png'/>" + state.text;
        }

        $(".lang").select2({
            width: "130px",
            templateResult: format,
            templateSelection: format,
            escapeMarkup: function (m) { return m; }
        });

        document.querySelectorAll(".lang + .select2")[0].addEventListener('click', ($event) => {
            let size = document.getElementsByClassName("select2-results__option").length;
            // console.log(size);

            for (let i = 0; i < size; i++) {
                // console.log(document.getElementsByClassName("select2-results__option")[i]);

                document.getElementsByClassName("select2-results__option")[i].addEventListener('mouseup', ($event) => {
                    this.changeLang($event);
                });
            }
        });

        $('.lang option[data-id="' + this.lang + '"]').prop("selected", true).change();
        jQuery(this.elementRef.nativeElement).find('[data-toggle="tooltip"]').tooltip();
    }

    change(event, variable) {

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

        if (variable == "scroll") {
            this.scroll = this.scroll ? false : true;
            updateConfig.scroll = this.scroll;
        }

        this.updateDB(updateConfig);

        this._commonService.changeNightModeAttr(this.nightMode);
    }

    changeLang(event) {
        var updateConfigJSON = localStorage.getItem("config");
        var updateConfig = JSON.parse(updateConfigJSON);

        setTimeout(() => { // Must be arrow function, or else 'this' context gets lost --> https://stackoverflow.com/questions/41106125/angular-2-using-this-inside-settimeout
            this.lang = parseInt($("select option:selected").attr("data-id"));
            updateConfig.lang = parseInt($("select option:selected").attr("data-id"));
            this.updateDB(updateConfig);
            this.currentLang = this.getLang(this.lang);
            this._commonService.changeLangAttr(this.lang);
            this.updateLang();
        }, 10);
    }

    pickColor(event, color) {
        if (this.color != color) {
            this.render.removeClass(event.target.parentElement.parentElement.parentElement.querySelector(".chosen"), "chosen");
            this.render.addClass(event.target, "chosen");
            this.color = color;

            var updateConfigJSON = localStorage.getItem("config");
            var updateConfig = JSON.parse(updateConfigJSON);
            updateConfig.color = this.color;
            this.updateDB(updateConfig);

            this._appComponent.changeColor(this.color);
        }
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    updateDB(config) {
        config.nightMode = config.nightMode ? 1 : 0;
        config.scroll = config.scroll ? 1 : 0;
        config.nsfw = config.nsfw ? 1 : 0;
        config.epilepsy = config.epilepsy ? 1 : 0;
        config.share = config.share ? 1 : 0;
        config.lang = config.lang ? config.lang : 1;
        config = JSON.stringify(config);

        this._commonService.setUserConfig(this, this.token, config);
        var i = 0;

        // this.storageService.watchStorage().subscribe((data: string) => {
        //     this.color = config.color;
        // });
    }

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Settings",
                    nightMode: "Mode [Day | Night]",
                    showNsfw: "Show sensitive content",
                    showEpilepsy: "Show flashy elements",
                    shareImages: "Share images",
                    feedElements: "Feed elements",
                    paginationType: "Gallery display [By page | Scroll]",
                    language: "Language",
                    themes: "Themes"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Ajustes",
                    nightMode: "Modo [Día | Noche]",
                    showNsfw: "Mostrar contenido sensible",
                    showEpilepsy: "Mostrar elementos llamativos",
                    shareImages: "Compartir imágenes",
                    feedElements: "Elementos de feed",
                    paginationType: "Desplegar galeria [Por página | Scroll]",
                    language: "Idioma",
                    themes: "Temas"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
