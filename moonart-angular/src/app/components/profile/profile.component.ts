import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { SharedService } from '../../components/shared-service/shared-service.component';

declare var jQuery: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [UserService, ImageService, CommonService]
})
export class ProfileComponent implements OnInit {

    public pageTitle: string = "Profile";
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
    public element: number = 1;
    public found: boolean;
    public description: string;
    public isOwner: boolean;
    public isFollowing: boolean;
    public _imageURL: string;
    public nFollowers: number;
    public nFollowing: number;
    public followers: Array<Object>;
    public following: Array<Object>;
    public fllwError: number;
    public userError: number;
    public tab: any;
    public language: Object;
    public lang: number;
    public currentLang: any;
    constructor(
        private _sharedService: SharedService,
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        // Force reloading on routerLink:
        // https://stackoverflow.com/questions/38971660/angular-2-reload-route-on-param-change
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;

        /* Fixed so if user access a profile from @[+username] (mentions), it will show the proper username. e.g: @nAO !== @Nao */

        // Get next element after 'profile'. If it's 0 (not found), we return 'guest' (should not happen)
        // Could be achieved with an emitter too
        let url = window.location.href.split("/");
        let i = url.findIndex((item) => item.toString().toLowerCase() === 'profile') + 1;
        this.urlname = i ? url[i] : "guest";

        this.followStatus = "Follow";
        this.tab = "comments";
        this.nFollowers = 0;
        this.nFollowing = 0;
        this.followers = [];
        this.following = [];
        this.fllwError = 0;
        this.userError = 0;
    }

    ngOnInit() {
        console.log(this.element);
        this._sharedService.changeVar.subscribe(value => {
            if (value === true) {
                this._sharedService.needsReload(false);
                this.ngOnInit();
            }
        });

        const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];

        if (modalBackdrop)
            modalBackdrop.remove();

        const modalSelectors = ["#followersModal", "#followingModal"];

        for (let i = 0; i < modalSelectors.length; i++) {
            // this.unprop(modalSelectors[i]);
        }

        this.loadUser();
        this.tab = window.location.href.split("/");
        this.tab = this.tab[this.tab.length - 2];
        // console.log(this.tab);
        
        if (this.tab == "comments") {
            this.element = 1;
        }
        if (this.tab == "gallery") {
            this.element = 2;
        }
        if (this.tab == "likes") {
            this.element = 3;
        }
        else if (this.tab == "favs") {
            this.element = 4;
        }
        else {
            this.element = 1;
        }

        this.getUserData(this.urlname, true);

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
                    this.getUserData(this.urlname, true);
                }
            },
            error => {
                console.log("Ero");
            }
        );
    }

    /*
     *
     * Function to compare the arrays of followers and following, to then show if the user viewing the profile follows them or not
     * 
     * @args
     *   followersP -> Followers from profile 
     *   followingP -> Following from profile
     *   followingU -> Following from user (null if user viewing profile is the profile user)
     */
    compareFollowers(followersP, followingP, followingU) {
        // this.followers = arr1;
        // this.following = arr2;

        console.log(followersP);
        console.log(followingP);
        console.log(followingU);


        if (followingU === null) { // Different to empty array!
            // If this param is null, it means that logged user != profile user, and so every following is true

            if (followersP.length > 0) {
                for (let i = 0; i < followersP.length; i++) {
                    let found = false;
                    for (let j = 0; j < followingP.length; j++) {
                        if (followersP[i].follower.nick === followingP[j].followed.nick) {
                            found = true;
                            break;
                        }
                    }
                    followersP[i].isFollowedByUser = found;
                }
            }

            if (followingP.length > 0) {
                for (let i = 0; i < followingP.length; i++) {
                    followingP[i].isFollowedByUser = true;
                }
            }
        }
        else {
            // logged user != profile user

            // Following followed by logged user
            if (followingP.length > 0) {
                for (let i = 0; i < followingP.length; i++) {
                    let found = false;
                    for (let j = 0; j < followingU.length; j++) {
                        if (followingP[i].followed.nick === followingU[j].followed.nick) {
                            found = true;
                            break;
                        }
                    }
                    followingP[i].isFollowedByUser = found;
                }
            }

            // Followers followed by logged user
            if (followersP.length > 0) {
                for (let i = 0; i < followersP.length; i++) {
                    let found = false;
                    for (let j = 0; j < followingU.length; j++) {
                        if (followersP[i].follower.nick === followingU[j].followed.nick) {
                            found = true;
                            break;
                        }
                    }
                    followersP[i].isFollowedByUser = found;
                }
            }
        }

        this.followers = followersP;
        this.following = followingP;
    }

    getLoggedUserData(user, profileFollowers, profileFollowing) {
        // console.log(`getLoggedUserData: ${user.nick}`);

        this._userService.getUserFollows(user.sub).subscribe(
            response => {
                if (response.status == "success") {
                    // this._userService.checkFollowing(this, nick, userclass);
                    this.compareFollowers(profileFollowers, profileFollowing, response.following);
                }

                this.fllwError = 0;
            },
            error => {
                console.log("getUserFollows()");
                console.log("Ero..." + " attempt: " + this.fllwError);
                if (this.fllwError < 5) {
                    this.getLoggedUserData(user, profileFollowers, profileFollowing);
                    this.fllwError++;
                }
            }
        );
    }

    getUserData(nick, isProfileUser) {
        // console.log(`getUserData: ${nick}`);
        isProfileUser = true;

        this._userService.getUserByNick(nick).subscribe(
            response => {
                // console.log(response);
                if (response.status == "success") {
                    this._imageURL = "assets/profile-picture/" + response.user_info.image;
                    this.found = true;
                    this.userCustom = response.user_info.name;
                    this.username = response.user_info.nick;
                    this.description = response.user_info.description;
                    document.title = `${this.userCustom} (@${this.username})`; // Make it string concat if you want IE11 support

                    if (this.description) {
                        this.description = this._commonService.noscript(this.description);
                        this.description = this._commonService.formatText(this.description);
                        // console.log(this.description);
                    }

                    this._userService.getUserFollows(response.user_info.id).subscribe(
                        response => {
                            if (response.status == "success") {
                                this.nFollowers = response.nFollowers;
                                this.nFollowing = response.nFollowing;

                                // this._userService.checkFollowing(this, nick, userclass);

                                if (nick !== this.identity.nick) {
                                    const currentUserData = this.getLoggedUserData(this.identity, response.followers, response.following);
                                }
                                else {
                                    this.compareFollowers(response.followers, response.following, null);
                                }
                            }

                            this.fllwError = 0;
                        },
                        error => {
                            console.log("getUserFollows()");
                            console.log("Ero..." + " attempt: " + this.fllwError);
                            if (this.fllwError < 5) {
                                this.getUserData(nick, isProfileUser);
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
                    this.getUserData(this.urlname, true);
                    this.userError++;
                }
            }
        );
    }

    unprop(el) {
        jQuery(el).modal("hide");
    }

    prop(el) {
        jQuery(el).modal("show");
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
                    comments: "Comments",
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
                    comments: "Comentarios",
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
