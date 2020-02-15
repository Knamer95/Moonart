import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
    public identity: any;
    public token: string;
    public images: Array<Object>;
    public estado: boolean;
    public page: number;
    public next_page: number;
    public prev_page: number;
    public number_pages: number;
    public total_pages: number;
    public nightMode: boolean;
    public nsfw: boolean;
    public epilepsy: boolean;
    public imagError: number;
    public language: Object;
    public currentLang: Object;
    public lang: number;

    @Output() emitter = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        this.page_title = "  Novedades";
        this.imagError = 0;
    }

    ngOnInit() {
        this.loadUser();

        this.pageImages();

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.lang = JSON.parse(localStorage.getItem("config")).lang;
            this.emitter.emit(this.lang);
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode);
        }

        this.lang = JSON.parse(localStorage.getItem("config")).lang;

        if (!this.lang)
            this.lang = 1;

        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    ngDoCheck() {
        // this.loadUser();
    }

    pageImages() {
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

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Latest",
                    by: "By",
                    previous: "Previous",
                    next: "Next"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Novedades",
                    by: "Por",
                    previous: "Anterior",
                    next: "Siguiente"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
