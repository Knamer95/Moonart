import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [UserService, ImageService, CommonService]
})
export class ProfileComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public images;
    public page;
    public next_page;
    public prev_page;
    public number_pages;
    public total_pages;
    public nightMode;
    public arrayNightMode;
    public nsfw;
    public epilepsy;
    public username;
    public followStatus;
    public element: number;
    public found;
    public description;
    public isOwner: boolean;
    public isFollowing: boolean;
    public _imageURL: string;
    public followers;
    public following;
    public fllwError;
    public userError;
    public tab;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        this.page_title = "Profile";
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.username = window.location.href.split("/");
        for (let i = 0; i < this.username.length; i++) {
            if (this.username[i] == "profile" && (i + 1) < this.username.length) {
                this.username = this.username[i + 1];
            }
        }
        // this.username = "Nao";
        this.followStatus = "Seguir";
        this.tab = "images";
        this.followers = 0;
        this.following = 0;
        this.fllwError = 0;
        this.userError = 0;
    }

    ngOnInit() {
        this.loadUser();
        this.tab = window.location.href.split("/");
        this.tab = this.tab[this.tab.length - 2];

        this.element = 1;

        if (this.tab == "likes") {
            this.element = 2;
        }
        else if (this.tab == "favs") {
            this.element = 3;
        }
        else {
            this.element = 1;
        }

        this.getUserData();

        this._route.params.subscribe(params => {
            this.page = +params['page'];

            if (!this.page) {
                this.page = 1;
                this.prev_page = 1;
                this.next_page = 2;
            }
            /*
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }
            */
            // this.getImages(this.page, this.user);
        });

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
        }

        this._userService.checkFollowing(this);
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        if (this.identity == null) {
            this.identity = {
                id: 0,
                nick: 'guest'
            };
        }
    }

    pickElement(event, element) {
        this.render.removeClass(document.querySelector(".chosen"), "chosen");
        this.render.addClass(event.target, "chosen");
        this.element = element;
    }

    follow(token, nick) {
        this._userService.follow(token, nick).subscribe(
            response => {
                if (response.status == "success") {
                    this._userService.checkFollowing(this);
                    this.getUserData();
                }
            },
            error => {
                console.log("Ero");
            }
        );
    }

    getUserData(){
        this._userService.getUserByNick(this.username).subscribe(
            response => {
                // console.log(response);
                if (response.status == "success") {
                    console.log(response);
                    this._imageURL = "assets/profile-picture/" + response.user_info.image;
                    this.found = true;
                    this.description = response.user_info.description;
                    this._userService.getUserFollows(response.user_info.id).subscribe(
                        response => {
                            if (response.status == "success"){
                                this.followers = response.followers;
                                this.following = response.following;
                            }
                        },
                        error => {
                            console.log("getUserFollows()");
                            console.log("Ero..." + " attempt: " + this.fllwError);
                            if (this.fllwError < 5) {
                                this.getUserData();
                                this.fllwError++;
                            }
                        }
                    );
                }
                else {
                    this.found = false;
                }
            },
            error => {
                console.log("getUserByNick()");
                console.log("Ero..." + " attempt: " + this.userError);
                if (this.userError < 5) {
                    this.getUserData();
                    this.userError++;
                }
            }
        );
    }
}
