import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { ImageService } from "../../services/image.service";
import { CommonService } from "../../services/common.service";
import { SharedService } from "../shared-service/shared-service.component";

@Component({
    selector: "app-error",
    templateUrl: "./error.component.html",
    styleUrls: ["./error.component.css"],
    providers: [UserService, ImageService, CommonService],
})
export class ErrorComponent implements OnInit {
    public pageTitle: string = "Error";
    public identity: any;
    public token: string;
    public nightMode: boolean;
    public lang;

    constructor(
        private _userService: UserService,
        private _sharedService: SharedService
    ) {
        this.pageTitle = "Error";
    }

    ngOnInit() {
        document.title = this.pageTitle;

        this.loadUser();
        this.lang = this._sharedService.languageContext.error;
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
}
