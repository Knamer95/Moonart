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
    public query;
    public searError;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        this.page_title = "  Resultados de: ";
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.searError = 0;
        this._route.queryParams.subscribe(params => {
            this.query = params['q'];
            this.changeURL();
        });

        /*
        _router.events.subscribe(() => {
         });
         */
    }

    ngOnInit() {
        this.loadUser();

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
        }
    }

    changeURL() {
        let tagQuery = this.query.search("tag:");
        let nameQuery = this.query.search("name:");
        let querySelector;
        let search;
        this.filter = "";

            if (tagQuery == 0){
                querySelector = "tag";
            }
            else if(nameQuery == 0){
                querySelector = "name";
            }
            else{
                querySelector = "all";
            }

        search = this.query.replace("tag:","").replace("name:","");
        this.page_title = "  Resultados de: " + search;

        if(tagQuery != -1 || nameQuery != -1){
            this.filter = " (filtro: " + querySelector + ")";
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

}
