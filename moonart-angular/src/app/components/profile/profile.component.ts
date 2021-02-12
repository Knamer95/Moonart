import { Component, OnInit, HostListener, Input } from '@angular/core';
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

    public pageTitle: string = "User";
    public identity: any;
    public token: string;
    public images: Array<Object>;
    public page: number;
    public nextPage: number;
    public prevPage: number;
    public numberPages: number;
    public totalPages: number;
    public nightMode: boolean;
    public nsfw: boolean;
    public epilepsy: boolean;
    public username: any; // Nick -> Used for login, admits regex [A-z0-9_-]+
    public userCustom: String; // Name to display -> Admits any
    @Input() public urlname: any;
    public followStatus: string;
    public element: number;
    public found: boolean;
    public description: string;
    public isOwner: boolean;
    public isFollowing: boolean;
    public _imageURL: string;
    public followers: number;
    public following: number;
    public fllwError: number;
    public userError: number;
    public tab: any;
    public language: Object;
    public lang: number;
    public currentLang: Object;
    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {

        /* Fixed so if user access a profile from @[+username] (mentions), it will show the proper username. e.g: @nAO !== @Nao */

        // Get next element after 'profile'. If it's 0 (not found), we return 'guest' (should not happen)
        // Could be achieved with an emitter too
        let url = window.location.href.split("/");
        let i = url.findIndex((item) => item.toString().toLowerCase() === 'profile') + 1;
        this.urlname = i ? url[i] : "guest";

        this.followStatus = "Follow";
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
                this.prevPage = 1;
                this.nextPage = 2;
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
            this._commonService.changeNightModeAttr(this.nightMode);
        }

        this._userService.checkFollowing(this);

        this.lang = JSON.parse(localStorage.getItem("config")).lang;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
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

    getUserData() {
        this._userService.getUserByNick(this.urlname).subscribe(
            response => {
                // console.log(response);
                if (response.status == "success") {
                    console.log(response);
                    this._imageURL = "assets/profile-picture/" + response.user_info.image;
                    this.found = true;
                    this.userCustom = response.user_info.name;
                    this.username = response.user_info.nick;
                    this.description = response.user_info.description;

                    if (this.description) {
                        this.description = this._commonService.noscript(this.description);
                        this.description = this._commonService.formatText(this.description);
                        // console.log(this.description);
                    }

                    this._userService.getUserFollows(response.user_info.id).subscribe(
                        response => {
                            if (response.status == "success") {
                                this.followers = response.followers;
                                this.following = response.following;
                            }

                            this.fllwError = 0;
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
                this.userError = 0;
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

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Profile",
                    edit: "Edit",
                    followers: "Followers",
                    following: "Following",
                    noDescription: "User didn't add a description.",
                    gallery: "Gallery",
                    likes: "Likes",
                    favs: "Favs",
                    wrongUserTitle: "User does not exist or has been deleted",
                    wrongUserBody: "If you think this is an error, please contact us at sistemas@moonart.com",
                    goBack: "Back to home"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Perfil",
                    edit: "Editar",
                    followers: "Seguidores",
                    following: "Siguiendo",
                    noDescription: "El usuario no ha agregado ninguna descripción.",
                    gallery: "Galería",
                    likes: "Likes",
                    favs: "Favs",
                    wrongUserTitle: "El usuario no existe o ha borrado su cuenta",
                    wrongUserBody: "Si crees que es un error de la página, por favor contáctanos en sistemas@moonart.com.",
                    goBack: "Volver al inicio"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
