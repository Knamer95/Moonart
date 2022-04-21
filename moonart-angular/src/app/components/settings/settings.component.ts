// https://stackoverflow.com/questions/51568283/how-do-i-get-bootstrap-components-work-with-angular-6

import {
    Component,
    OnInit,
    Renderer2,
    AfterViewInit,
    ElementRef,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import * as $ from "jquery";

import { UserService } from "../../services/user.service";
import { CommonService } from "../../services/common.service";
import { AppComponent } from "../../app.component";
import { emitterTypes } from "../../models/struct";
import { SharedService } from "../shared-service/shared-service.component";
import { Identity } from "src/app/types/user";
import { Config } from "src/app/types/config";
import { defaultLanguage, getCurrentLanguage } from "src/app/lang/lang";

declare var jQuery: any;
@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"],
    providers: [UserService, CommonService, AppComponent],
})

export class SettingsComponent implements OnInit, AfterViewInit {
    public identity: Identity;
    public config: Config;
    public lang;
    public selectedLangID: number;
    public emitType: number;

    // @Input()
    // set currentLang(currentLang: any) {
    // this._currentLang = currentLang;
    // }

    // get currentLang(): Object { return this._currentLang; }
    @Output() emitter = new EventEmitter();

    updateLang() {
        const lang = $("select option:selected").attr("data-id");

        this.emitter.emit({
            type: emitterTypes.LANG,
            status: "success",
            notificationType: "success",
            lang,
        });

        $(".event-emitter").click(); // To propagate the emitter, you have to bubble (adding the event to a children element). Then we simulate a click on the element with jQuery.
    }

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _appComponent: AppComponent,
        private _sharedService: SharedService,
        private render: Renderer2,
        private elementRef: ElementRef
    ) {}

    ngOnInit() {
        this.lang = this._sharedService.languageContext.settings;
        this._sharedService.setTitle(this.lang.title);

        this.loadUser();

        this.config = this._sharedService.config;
        this.render.addClass(
            document.querySelector("." + this.config.color),
            "chosen"
        );
    }

    ngAfterViewInit() {
        // https://select2.github.io/select2/ // Mirar "Infinite Scroll with Remote Data"

        function format(state) {
            if (!state.id) return state.text; // optgroup
            return (
                "<img class='flag' src='assets/img/flags/png/" +
                state.id.toLowerCase() +
                ".png'/>" +
                state.text
            );
        }

        $(".lang").select2({
            width: "130px",
            templateResult: format,
            templateSelection: format,
            escapeMarkup: function (m) {
                return m;
            },
        });

        document
            .querySelectorAll(".lang + .select2")[0]
            .addEventListener("click", ($event) => {
                let size = document.getElementsByClassName(
                    "select2-results__option"
                ).length;
                // console.log(size);

                for (let i = 0; i < size; i++) {
                    // console.log(document.getElementsByClassName("select2-results__option")[i]);

                    document
                        .getElementsByClassName("select2-results__option")
                        [i].addEventListener("mouseup", ($event) => {
                            this.changeLang($event);
                        });
                }
            });

        $('.lang option[data-id="' + this.selectedLangID + '"]')
            .prop("selected", true)
            .change();
        jQuery(this.elementRef.nativeElement)
            .find('[data-toggle="tooltip"]')
            .tooltip();
    }

    change(e, prop) {
        const allowed = ["nightMode", "nsfw", "epilepsy", "share", "scroll"];

        if (allowed.includes(prop)) this.config[prop] = !this.config[prop];

        if (prop === "feed") {
            if (this.config.feed > 100) this.config.feed = 100;
            else if (this.config.feed < 5) this.config.feed = 5;
        }

        this.updateDB(this.config);
        this._commonService.changeNightModeAttr(this.config.nightMode);
    }

    changeLang(e) {
        setTimeout(() => {
            // Must be arrow function, or else 'this' context gets lost --> https://stackoverflow.com/questions/41106125/angular-2-using-this-inside-settimeout
            this.selectedLangID = parseInt(
                $("select option:selected").attr("data-id")
            );
            this._sharedService.config.lang = parseInt(
                $("select option:selected").attr("data-id")
            );

            // Update the general config
            this._sharedService.updateConfig({
                ...this.config,
                lang: this.selectedLangID,
            });

            // Update the config in the database
            this.updateDB(this._sharedService.config);

            // Change the language in the DOM and emit it (not used since MoonArt v2.0)
            this._commonService.changeLangAttr(this.lang);
            this.updateLang();
        }, 10);
    }

    pickColor(event, color) {
        if (this.config.color != color) {
            this.render.removeClass(
                event.target.parentElement.parentElement.parentElement.querySelector(
                    ".chosen"
                ),
                "chosen"
            );
            this.render.addClass(event.target, "chosen");
            this.config.color = color;
            this.updateDB(this.config);

            this._appComponent.changeColor(this.config.color);
        }
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
    }

    updateDB(config) {
        const parsedConfig = {
            ...config,
            nightMode: config.nightMode || 0,
            scroll: config.scroll || 0,
            nsfw: config.nsfw || 0,
            epilepsy: config.epilepsy || 0,
            share: config.share || 0,
            lang: config.lang || 1,
        };

        this._commonService.setUserConfig(JSON.stringify(parsedConfig));
        const i = 0;

        // this.storageService.watchStorage().subscribe((data: string) => {
        //     this.color = config.color;
        // });
    }
}
