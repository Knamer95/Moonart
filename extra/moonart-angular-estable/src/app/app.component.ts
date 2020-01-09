import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { Renderer2 } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UserService, CommonService]
})
export class AppComponent implements OnInit, DoCheck {
    title = 'moonart-angular';
    public identity;
    public token;
    public config;
    public configJSON;
    public arrayNavs;
    public arrayNightMode;
    public i;
    public searchQuery;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _router: Router,
        private render: Renderer2
    ) {
        this.i = 0;
        this.searchQuery = '';
    }

    ngOnInit() {
        this.token = this._userService.getToken();

        this._commonService.getUserConfig(this, this.token);
    }

    ngDoCheck() {
        this.header(this);
        this.loadUser();
    }

    loadUser() {

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    (color, array) {

        for (let i = 0; i < array.length; i++) {
            this.render.removeClass(document.querySelector(".nav-background"), array[i]);
        }

        this.render.addClass(document.querySelector(".nav-background"), "nav-" + color);
    }

    header(that) {
        if (localStorage.getItem("config") == "undefined" || localStorage.getItem("config") == null) {
            setTimeout(function () {
                that.header(that);
            }, 100);

        }
        else {
            that.arrayNavs = ["nav-red", "nav-green", "nav-blue", "nav-violet", "nav-orange", "nav-yellow"];
            that.configJSON = localStorage.getItem("config");
            that.config = JSON.parse(that.configJSON);
            // console.log(that.config.color);
            that.(that.config.color, that.arrayNavs);
        }
        that.i++;
    }

    validateSearch(){
        if (this.searchQuery != null && this.searchQuery != ""){
            // this.searchQuery = this.searchQuery.replace(" ", "");
            this._router.navigate(['/search'],
            {queryParams: {q: this.searchQuery}});
        }
    }
}

