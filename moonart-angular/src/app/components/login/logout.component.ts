import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { CommonService } from "../../services/common.service";
import { AppComponent } from "../../app.component";
import { SharedService } from "../shared-service/shared-service.component";

@Component({
    selector: "logout-component",
    // templateUrl: './login.component.html',
    // styleUrls: ['./login.component.css'],
    template: ``,
    providers: [UserService, CommonService, AppComponent],
})
export class LogoutComponent implements OnInit {
    public pageTitle: string = "Logout";
    public user: User;
    public checkData: boolean = false; // Flag to disable form while we check if data is correct
    public token: string;
    public status: string;
    public isFirst: boolean;
    public showPassword: boolean = false;
    public currentLang: any;
    public lang;

    constructor(
        private _commonService: CommonService,
        private _sharedService: SharedService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.user = new User(1, "", "", "", "", "", "ROLE_USER", "", "");
    }

    ngOnInit(): void {
        this.logout();
        this.lang = this._sharedService.languageContext.logout;
    }

    logout() {
        this._route.params.subscribe((params) => {
            const sure = parseInt(params["sure"]);

            if (sure) {
                localStorage.removeItem("identity");
                localStorage.removeItem("token");
                localStorage.removeItem("config");

                this._sharedService.identity = null;
                this.token = null;

                // console.log(this._commonService.getLastUrl());
                this._router.navigateByUrl(this._commonService.getLastUrl());
            }
        });
    }
}
