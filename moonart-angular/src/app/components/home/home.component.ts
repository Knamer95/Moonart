import { Component, OnInit, EventEmitter, Output, HostListener, HostBinding, Renderer2 } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { emitterTypes } from '../../models/struct';
import { SharedService } from '../../components/shared-service/shared-service.component';
import { Identity } from 'src/app/types/user';
import { Image } from 'src/app/types/image';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [UserService, ImageService, CommonService]
})

export class HomeComponent implements OnInit {
    @HostBinding('attr.listener') listener = 'idle'; // To add attribute listener to the main element (<app-home />)

    public pageTitle: string = "Latest";
    public identity: Identity;
    public token: string;
    public images: Image[] = [];
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
    public language: any;
    public currentLang: any;
    public lang: number = 1;
    public emitType: number;

    @Output() emitter = new EventEmitter();

    constructor(
        private _sharedService: SharedService,
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private render: Renderer2,
    ) {
    }

    ngOnInit() {
        this._sharedService.statusNotifier$.subscribe(value => {
            if (value === true) {
                this._sharedService.needsReload(false);
                // this.ngOnInit();
            }
        });

        document.title = this.pageTitle;

        this.loadUser();

        const lsConfig = localStorage.getItem("config");
        if (![null, 'undefined'].includes(lsConfig)) {
            const lsParsedConfig = JSON.parse(lsConfig);
            this.lang = lsParsedConfig.lang;
            this.nightMode = lsParsedConfig.nightMode;
            this.scroll = lsParsedConfig.scroll;

            this.emitter.emit({
                type: emitterTypes.LANG,
                status: "success",
                notificationType: "success",
                lang: this.lang
            });

            this._commonService.changeNightModeAttr(this.nightMode);
        }

        this.hasElements = true; // If false or unset, it will show the message of no elements found until the AJAX call is done

        this.pageImages();

        this.currentLang = {};
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

            const lsConfig = localStorage.getItem("config");
            if ([null, undefined].includes(lsConfig)) {
                const lsParsedConfig = JSON.parse(lsConfig);
                this.nsfw = lsParsedConfig.nsfw;
                this.epilepsy = lsParsedConfig.epilepsy;
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
}
