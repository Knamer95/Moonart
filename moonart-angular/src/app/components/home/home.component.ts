import { Component, OnInit, EventEmitter, Input, Output, HostListener } from '@angular/core';
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
    public status: boolean;
    public page: number;
    public hasElements: boolean;
    public next_page: number;
    public prev_page: number;
    public number_pages: number;
    public total_pages: number;
    public nightMode: boolean;
    public nsfw: boolean;
    public epilepsy: boolean;
    public scroll: boolean;
    public isLast: boolean;
    public loaded: boolean;
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
        this.scroll = true; // Depends on user settings
    }

    ngOnInit() {
        this.images = [];
        this.isLast == false;
        this.loaded == false;

        this.loadUser();

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.lang = JSON.parse(localStorage.getItem("config")).lang;
            this.emitter.emit(this.lang);
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this.scroll = JSON.parse(localStorage.getItem("config")).scroll; 

            this._commonService.changeNightModeAttr(this.nightMode);
        }

        this.hasElements = true; // If false or unset, it will show the message of no elements found until the AJAX call is done

        this.lang = JSON.parse(localStorage.getItem("config")).lang;

        if (!this.lang)
            this.lang = 1;

        this.pageImages();

        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    @HostListener("window:scroll", ['$event'])
    doSomethingOnWindowsScroll($event: Event) { // Event to fire new items on scroll down

        var d = document.documentElement;
        var zoom = 0.8; // Establecido en CSS
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight * zoom;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (offset >= (height - 5) && this.isLast == false && this.loaded == true) { // 5 is the margin of error
            this.loaded = false; // Checker so it doesn't  para que no pase más de una página seguida
            this.page = this.page ? this.page : 1;

            this.page++;
            this.pageImages();
        }
    }

    ngDoCheck() {
        // this.loadUser();
    }

    pageImages() {
        this._route.params.subscribe(params => {
            if (!this.scroll) {
                this.page = +params['page'];

                if (!this.page) {
                    this.page = 1;
                    this.prev_page = 1;
                    this.next_page = 2;
                }
            }

            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
            this._imageService.showAllImages(this, this.page, this.nsfw, this.epilepsy, null, null, "pageImages");
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
                    suchEmpty: "Such empty!",
                    tip: "There are no pictures yet. Why not be the first one?",
                    by: "By",
                    previous: "Previous",
                    next: "Next"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Novedades",
                    suchEmpty: "¡Qué vacío!",
                    tip: "No hay imágenes todavía. ¿Por qué no ser el primero?",
                    by: "Por",
                    previous: "Anterior",
                    next: "Siguiente"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
