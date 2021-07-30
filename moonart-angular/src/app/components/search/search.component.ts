import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { SharedService } from '../../components/shared-service/shared-service.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public pageTitle: string = "Search";
    public filter: string;
    public identity: any;
    public token: string;
    public images: Array<Object>;
    public estado: boolean;
    public page: number;
    public nextPage: number;
    public prevPage: number;
    public numberPages: number;
    public totalPages: number;
    public nightMode: boolean;
    public nsfw: boolean;
    public epilepsy: boolean;
    public scroll: boolean;
    public isLast: boolean;
    public loaded: boolean;
    public query: string;
    public q: string;
    public querySelector: string;
    public search: string;
    public searError: number;
    public language: Object;
    public currentLang: any;
    public lang: number;

    constructor(
        private _sharedService: SharedService,
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        this.pageTitle = "  Resultados de: ";
        this.searError = 0;
        this.scroll = true; // Depends on user settings
        this.q = "";
        /*
        _router.events.subscribe(() => {
         });
         */
    }

    ngOnInit() {
        this._sharedService.changeVar.subscribe(value => {
            if (value === true) {
                this._sharedService.needsReload(false);
                // this.ngOnInit();
            }
        });

        document.title = this.pageTitle;
        this.images = [];
        this.isLast == false;
        this.loaded == false;

        this.loadUser();

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode);
            this.scroll = JSON.parse(localStorage.getItem("config")).scroll;
        }

        this._route.queryParams.subscribe(params => {
            this.query = params['q'];
            this.changeURL();
        });

        this.lang = JSON.parse(localStorage.getItem("config")).lang;;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    @HostListener("window:scroll", ['$event'])
    doSomethingOnWindowsScroll($event: Event) { // Copied from home.component.ts -> If possible, make this a common function of image.service.ts

        var d = document.documentElement;
        var zoom = 1; // Establecido en CSS
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight * zoom;

        if (offset >= (height - 5) && this.isLast == false && this.loaded == true) { // 5 is the margin of error
            this.loaded = false; // Checker so it doesn't skip more than one page
            this.page = this.page ? this.page : 1;

            this.page++;
            this.pageSearch();
        }
    }

    changeURL() {
        let tagQuery = this.query.search("tag:");
        let nameQuery = this.query.search("name:");
        this.filter = "";

        if (tagQuery == 0) {
            this.querySelector = "tag";
        }
        else if (nameQuery == 0) {
            this.querySelector = "name";
        }
        else {
            this.querySelector = "all";
        }

        this.search = this.query.replace("tag:", "").replace("name:", "");
        this.q = this.search;
        if (tagQuery != -1 || nameQuery != -1) {
            this.filter = this.querySelector;
        }
        this.pageTitle = "  Results: " + this.search;
        document.title = this.q;

        this.pageSearch();
    }

    pageSearch() {
        this.images = [];
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
            this._imageService.showImageSearch(this, this.page, this.nsfw, this.epilepsy, this.querySelector, this.search);
        });
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        //   console.log(this.token);
    }

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Results:",
                    by: "by",
                    filter: "filter",
                    previous: "Previous",
                    next: "Next"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Resultados de:",
                    by: "por",
                    filter: "filtro",
                    previous: "Anterior",
                    next: "Siguiente"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
