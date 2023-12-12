import {
    Component,
    OnInit,
    DoCheck,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "./services/user.service";
import { Renderer2 } from "@angular/core";
import { CommonService } from "./services/common.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ImageComponent } from "./components/image/image.component";
import { SharedService } from "./components/shared-service/shared-service.component";
import { Alert, Config, TypeMode } from "./types/config";
import { Identity } from "./types/user";
import * as $ from "jquery";
import { getCurrentLanguage, languagePackage } from "./lang/lang";
import { emitterTypes } from "./models/struct";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    providers: [UserService, CommonService],
    // template: `<app-settings
    // (emitter)="onEmited($event)">
    //   </app-settings>`
})
export class AppComponent implements OnInit, DoCheck {
    title = "moonart-angular";

    // Properties to pass to the children
    public identity: Identity;
    public token: string;
    public config: Config;
    public lang;
    public typeMode: TypeMode;

    public domInfo = {};

    public i: number = 0;
    public searchQuery = "";
    public navStatus: number;
    public alertsArray: Alert[] = []; // Array<Object> = []; <- Leave as any, or create a new interface
    public alertCounter: number = 0;

    @ViewChild("loginElement") loginElement: ElementRef<HTMLElement>;
    @ViewChild(ImageComponent, {}) _imageComponent: ImageComponent;
    @ViewChild("menuToggle") menuToggle: ElementRef<HTMLElement>;

    constructor(
        private modalService: NgbModal,
        private _sharedService: SharedService,
        private _userService: UserService,
        private _commonService: CommonService,
        private _router: Router,
        private render: Renderer2,
        private _route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.token = this._userService.getToken();
        this._commonService.getUserConfig();

        this._sharedService.configSubject.subscribe(
            ({ config, languageContext, langName }) => {
                this.config = config;
                this.lang = languageContext.app;
                this._sharedService.setTitle(this.lang.title);
                this.domInfo = {
                    lang: langName,
                    mode: this.config.nightMode ? "night" : "day",
                };
            }
        );

        this.navStatus = 1;

        // console.log(this.alertsArray);
    }

    ngDoCheck() {
        this.setHeader();
        this.loadUser();
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    changeColor(color) {
        this.render.setAttribute(
            document.querySelector(".nav-background > div"),
            "data-theme",
            color
        );

        const elements = Array.from(document.querySelectorAll(".themed"));

        for (const element of elements)
            this.render.setAttribute(element, "data-theme", color);
    }

    setHeader() {
        const lsParsedConfig = JSON.parse(localStorage.getItem("config"));

        if (!lsParsedConfig) {
            setTimeout(function () {
                // this.setHeader();
            }, 100);
        } else {
            this.config = lsParsedConfig;
            // console.log(that.config.color);
            this.changeColor(this.config.color);
        }
        this.i++;
    }

    toggle() {
        const displayMenuToggle = this.menuToggle.nativeElement;
        // console.log("--displayMenuToggle", displayMenuToggle); display style is empty, could control its status with Angular, instead of CSS

        if ($(".menu-toggle").css("display") != "none") {
            const elements = document.querySelectorAll("[data-view]");
            const status = document.querySelector(".navbar[data-theme]");
            this.render.setAttribute(
                status,
                "data-status",
                this.navStatus === 1 ? "solid" : "liquid"
            );

            for (let i = 0; i < elements.length; i++) {
                this.render.setAttribute(
                    elements[i],
                    "data-view",
                    this.navStatus.toString()
                );
            }

            // this.render.setAttribute(document.querySelector("[data-toggle]"), "data-toggle", this.navStatus.toString());

            this.navStatus = (this.navStatus + 1) % 2;
        }
    }

    validateSearch() {
        if (this.searchQuery != null && this.searchQuery != "") {
            // this.searchQuery = this.searchQuery.replace(" ", "");
            this._router.navigate(["/search"], {
                queryParams: { q: this.searchQuery },
            });
        }
    }

    // Function to redirect if user isn't logged in
    isGuest(url) {
        if (
            this.identity.nick === "guest" ||
            !this.identity.nick ||
            url === null
        ) {
            let el: HTMLElement = this.loginElement.nativeElement;
            el.click();
        } else {
            // this._router.navigate([url]);
        }
    }

    // To add custom styles to modal-dialog > https://stackoverflow.com/questions/53178873/ngbmodal-custom-class-styling (custom .modal-centered > .modal-dialog)
    open(type) {
        let modalRef: any = [];

        if (type === "login") {
            modalRef = this.modalService.open(LoginComponent, {
                windowClass: "modal-centered",
            });
        } else if (type === "register") {
            modalRef = this.modalService.open(RegisterComponent, {
                windowClass: "modal-centered",
            });
        }

        // https://github.com/ng-bootstrap/ng-bootstrap/issues/1776#issuecomment-394249029
        setTimeout(
            () => this.render.selectRootElement("#autofocus").focus(),
            0
        );

        modalRef.componentInstance.emitter.subscribe((result) => {
            this.onEmited(result);

            if (result.modal) {
                if (result.status === "success") {
                    modalRef.componentInstance.activeModal.dismiss(
                        "Cross click"
                    );
                }

                if (result.status === "success" && type === 1) {
                }
            }
        });
    }

    /*
     *
     * @params
     *      emit: Emitted element
     *      emitType: Type of emit (defined at ../../models/struct.ts)
     *
     */
    onEmited(emit) {
        console.log({ emit });

        switch (emit.type) {
            case emitterTypes.LANG:
                const langName = getCurrentLanguage(emit.lang).name;
                this.lang = languagePackage[langName].app;
                this._commonService.changeLangAttr(emit.lang);
                break;
            case emitterTypes.ALERT:
                const position =
                    this.alertsArray.length &&
                    this.alertsArray[0].position === 0
                        ? this.alertsArray[this.alertsArray.length - 1]
                              .position + 70
                        : 0;

                const newAlert = {
                    ref: ++this.alertCounter,
                    type: emit.status,
                    message: emit.message,
                    position,
                };

                this.alertsArray.push(newAlert);

                const response = new Promise((resolve, reject) => {
                    this._commonService.displayNotification(
                        newAlert.message,
                        false,
                        this.alertsArray,
                        newAlert.ref,
                        resolve
                    );
                });

                response.then((val: any) => {
                    let arr: Alert[] = this.alertsArray;
                    arr = arr.filter(function (item) {
                        return item.ref !== val.ref;
                    });

                    const initialPosition =
                        arr.length > 0 ? arr[0].position : 0;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].position -= initialPosition;
                    }

                    this.alertsArray = arr;

                    // Close modal (if there is any)
                });

                break;
            case emitterTypes.LOGIN:
                this.isGuest(null);
                break;
            case emitterTypes.RELOAD:
                this._sharedService.needsReload(true);
                window.location.reload();

                // this._imageComponent.update();
                break;
            case emitterTypes.NIGHT_MODE:
                this.typeMode = emit.data;
                break;
            default:
                break;
        }
    }

    // https://stackoverflow.com/questions/38393494/how-to-emit-event-in-router-outlet-in-angular2
    onActivate(elementRef) {
        if (elementRef.emitter) {
            // Adds emitter only if there is an EventEmitter defined on the module (Settings)
            elementRef.emitter.subscribe((event) => {
                this.onEmited(event);
            });
        }
    }
}
