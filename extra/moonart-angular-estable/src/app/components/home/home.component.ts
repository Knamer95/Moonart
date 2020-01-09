import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [UserService, ImageService, CommonService]
})
export class HomeComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public images;
    public estado;
    public page;
    public next_page;
    public prev_page;
    public number_pages;
    public total_pages;
    public nightMode;
    public arrayNightMode;
    public nsfw;
    public epilepsy;
    public imagError;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        this.page_title = "  Novedades";
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"]
        this.imagError = 0;
    }

    ngOnInit() {
        this.loadUser();

        this.pageImages();

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
        }
    }

    ngDoCheck() {
        // this.loadUser();
    }

    pageImages(){
        this._route.params.subscribe(params => {
            this.page = +params['page'];

            if (!this.page) {
                this.page = 1;
                this.prev_page = 1;
                this.next_page = 2;
            }
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
            this._imageService.showAllImages(this, this.page, this.nsfw, this.epilepsy);
        });
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // console.log(this.token);
    }
}
