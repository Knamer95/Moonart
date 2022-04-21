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
    public lang;

    constructor(
        private _sharedService: SharedService
    ) {}

    ngOnInit() {
        this.lang = this._sharedService.languageContext.error;
        this._sharedService.setTitle(this.lang.title);
    }
}
