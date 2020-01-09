import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from 'jquery';

import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    providers: [UserService, CommonService, AppComponent]
})
export class SettingsComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public color;
    public nightMode;
    public nsfw;
    public epilepsy;
    public share;
    public feed;
    public arrayNavs;
    public arrayNightMode;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _appComponent: AppComponent,
        private _route: ActivatedRoute,
        private render: Renderer2
    ) {
        this.page_title = "  Ajustes";
        this.nightMode = false;
        this.nsfw = false;
        this.epilepsy = false;
        this.share = true;
        this.feed = 15;
        this.arrayNavs = ["nav-red", "nav-green", "nav-blue", "nav-violet", "nav-orange", "nav-yellow"];
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    }

    ngOnInit() {

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
            this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
        // }
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
            if(this.feed > 100){
                this.feed = 100;
            }
            else if(this.feed < 5) {
                this.feed = 5;
            }
            updateConfig.feed = this.feed;
        }
        this.updateDB(updateConfig);

        this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
    }

    pickColor(event, color) {
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
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    updateDB(config) {
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
    }
}
