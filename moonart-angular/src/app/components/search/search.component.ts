import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public page_title: string;
    public filter: string;
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
    public query: string;
    public q: string;
    public searError: number;
    public language: Object;
    public currentLang: any;
    public lang: number;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        this.page_title = "  Resultados de: ";
        this.searError = 0;
        this.q = "";
        /*
        _router.events.subscribe(() => {
         });
         */
    }

    ngOnInit() {
        this.loadUser();

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode);
        }

        this._route.queryParams.subscribe(params => {
            this.query = params['q'];
            this.changeURL();
        });
    
        this.lang = JSON.parse(localStorage.getItem("config")).lang;;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    changeURL() {
        let tagQuery = this.query.search("tag:");
        let nameQuery = this.query.search("name:");
        let querySelector;
        let search;
        this.filter = "";

        if (tagQuery == 0) {
            querySelector = "tag";
        }
        else if (nameQuery == 0) {
            querySelector = "name";
        }
        else {
            querySelector = "all";
        }

        search = this.query.replace("tag:", "").replace("name:", "");
        this.page_title = "  Resultados de: " + search;
        this.q = search;
        if (tagQuery != -1 || nameQuery != -1) {
            this.filter = querySelector;
        }
        this.pageSearch(querySelector, search);
    }

    pageSearch(querySelector, search) {
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
            this._imageService.showImageSearch(this, this.page, this.nsfw, this.epilepsy, querySelector, search);
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
                    title: "Results: " + this.query.replace("tag:", "").replace("name:", ""),
                    by: "by",
                    filter: "filter",
                    previous: "Previous",
                    next: "Next"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Resultados de: " + this.query.replace("tag:", "").replace("name:", ""),
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
