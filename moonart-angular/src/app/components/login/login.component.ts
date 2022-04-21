import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { CommonService } from "../../services/common.service";
import { emitterTypes } from "../../models/struct";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SharedService } from "../shared-service/shared-service.component";
import { Identity } from "src/app/types/user";

@Component({
    selector: "login-component",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [UserService, CommonService],
})
export class LoginComponent implements OnInit {
    public identity: Identity;
    public user: User;
    public checkData: boolean = false; // Flag to disable form while we check if data is correct
    public token: string;
    public status: string;
    public isFirst: boolean;
    public showPassword: boolean = false;
    public lang;
    public emitType: number;

    @Output() emitter: EventEmitter<any> = new EventEmitter();

    constructor(
        public activeModal: NgbActiveModal,
        private _userService: UserService,
        private _commonService: CommonService,
        private _router: Router,
        private _route: ActivatedRoute,
        public _sharedService: SharedService
    ) {
        this.user = new User(1, "", "", "", "", "", "ROLE_USER", "", "");
    }

    ngOnInit() {
        // this._sharedService.setTitle(this.lang.title); // Login is a component
        this.lang = this._sharedService.languageContext.login;
        this._sharedService.setTitle(this.lang.title);
    }

    toggle(el) {
        if (el === 1) this.showPassword = this.showPassword ? false : true;
    }

    onSubmit(form) {
        this.checkData = true;
        // https://github.com/angular/angular/issues/22556
        // setTimeout( () => form.form.disable(), 1);

        this._userService.signup(this.user).subscribe(
            (response) => {
                if (!response.status || response.status != "error") {
                    this.status = "success";

                    this.identity = response;

                    // Token
                    this._userService.signup(this.user, true).subscribe(
                        (response) => {
                            if (
                                !response.status ||
                                response.status != "error"
                            ) {
                                this.status = "success";
                                this._commonService.getUserConfig();

                                localStorage.setItem("token", response);
                                localStorage.setItem(
                                    "identity",
                                    JSON.stringify(this.identity)
                                );
                                localStorage.removeItem("config");
                                this.updateDB();

                                // setTimeout(() => { this._router.navigate(['home']); }, 1500);
                            } else {
                                this.status = "error";
                                this.checkData = false;
                            }
                        },
                        (error) => {
                            this.status = "error";
                            this.checkData = false;
                        }
                    );
                    // form.reset();
                } else {
                    this.status = "error";
                    this.checkData = false;
                    // form.reset(); // Uncomment to reset when password is incorrect
                }

                // If the status is error (meaning wrong credentials), response.status is 'error', but otherwise the response is just the token
                let message =
                    response.status === "error"
                        ? this.lang.messageError
                        : this.lang.messageSuccess;

                this.emitter.emit({
                    type: emitterTypes.ALERT,
                    status: response.status === "error" ? "error" : "success",
                    notificationType:
                        response.status === "error" ? "error" : "success",
                    message: message,
                    modal: "login-modal",
                    timer: 3000,
                });
            },
            (error) => {
                this.status = "error";
            }
        );
    }

    updateDB() {
        this._userService.getConfig().subscribe(
            (response) => {
                console.log("response", response);
                if (response.status === "error") {
                    this.isFirst = true;
                    const config = this._sharedService.config;
                    const configJSON = JSON.stringify(config);

                    this._commonService.setUserConfig(configJSON);
                }

                /*
                // Due to reloading page instead (to avoid issues with pagination/scroll), it doesn't make sense that the user sees the config updating
                this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
                this._commonService.changeNightModeAttr(this.nightMode);
                */
                // console.log(`Changed to ${this.nightMode ? "night" : "day"} mode.`);

                this.emitter.emit({
                    type: emitterTypes.RELOAD,
                    status: "logged",
                    notificationType: null,
                    message: null,
                    timer: 0,
                });
            },
            (error) => {}
        );
    }
}
