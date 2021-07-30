import { Component, OnInit, EventEmitter, Input, Output, HostListener, HostBinding } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';
import * as $ from 'jquery';
import { emitterTypes } from '../../models/struct';
import { SharedService } from '../../components/shared-service/shared-service.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [UserService, ImageService, CommonService]
})

export class HomeComponent implements OnInit {

    @HostBinding('attr.listener') listener = 'idle'; // To add attribute listener to the main element (<app-home />)

    public pageTitle: string = "Latest";
    public identity: any;
    public token: string;
    public images: Array<Object> = [];
    public status: boolean;
    public page: number = 1;
    public hasElements: boolean = true;
    public nextPage: number;
    public prevPage: number;
    public numberPages: number;
    public totalPages: number;
    public nightMode: boolean = false;
    public nsfw: boolean = true;
    public epilepsy: boolean = true;
    public scroll: boolean = true; // Depends on user settings
    public isLast: boolean = false;
    public loaded: boolean = false;
    public imagError: number = 0;
    public language: Object;
    public currentLang: any; localhost: 4200
    public lang: number = 1;
    public emitType: number;

    @Output() emitter = new EventEmitter();

    constructor(
        private _sharedService: SharedService,
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
    }

    ngOnInit() {
        this._sharedService.changeVar.subscribe(value => {
            if (value === true) {
                this._sharedService.needsReload(false);
                // this.ngOnInit();
            }
        });

        document.title = this.pageTitle;

        this.loadUser();

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.lang = JSON.parse(localStorage.getItem("config")).lang;

            this.emitter.emit({
                type: emitterTypes.lang,
                status: "success",
                notificationType: "success",
                lang: this.lang
            });

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this.scroll = JSON.parse(localStorage.getItem("config")).scroll;

            this._commonService.changeNightModeAttr(this.nightMode);
        }

        this.hasElements = true; // If false or unset, it will show the message of no elements found until the AJAX call is done

        this.lang = JSON.parse(localStorage.getItem("config")).lang;

        this.pageImages();

        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    @HostListener("window:scroll", ['$event'])
    doSomethingOnWindowsScroll($event: Event) { // Event to fire new items on scroll down

        var d = document.documentElement;
        var zoom = 1; // Establecido en CSS
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight * zoom;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (offset >= (height - 5) && this.isLast == false && this.loaded == true) { // 5 is the margin of error
            this.loaded = false; // Checker so it doesn't skip more than one page in a row
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
                    this.prevPage = 1;
                    this.nextPage = 2;
                }
            }

            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
            this._imageService.showAllImages(this, this.page, this.scroll, true, null);
        });
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    onEmited(emit) {
        console.log(emit);
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
