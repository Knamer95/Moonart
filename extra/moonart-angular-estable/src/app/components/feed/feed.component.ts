import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';


@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
    providers: [UserService, ImageService, CommonService]
})

export class FeedComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public images;
    // public page;
    // public next_page;
    // public prev_page;
    // public number_pages;
    // public total_pages;
    public nightMode;
    public arrayNightMode;
    public nsfw;
    public epilepsy;
    public username;
    public followStatus;
    public element: number;
    public found;
    public description;
    public isFollowing: boolean;
    public _imageURL: string;
    public sharedImages: any = [];
    public sharError;
    public index: number;  // Cada vez que se llega abajo, hace query y se asigna uno nuevo.
    public loaded: boolean;
    public isLast: boolean;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        this.sharError = 0;
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    }

    ngOnInit() {

        this.loadUser();
        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);

        }
        this.loaded = true;
        this.index = 0;
        this.isLast = false;

        this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
        this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;

        this.getSharedItems(this.index);
        // this._userService.checkFollowing(this);  // Hay que hacer un caso a parte

    }

    @HostListener("window:scroll", ['$event'])
    doSomethingOnWindowsScroll($event: Event) {

        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (offset >= (height - 5) && this.loaded == true && this.isLast == false) { // 5 es el margen de error
            this.loaded = false;
            this.getSharedItems(this.index);
        }
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

    follow(token, nick) {
        this._userService.follow(token, nick).subscribe(
            response => {
                if (response.status == "success") {
                    var userclass = "user-" + nick;
                    this._userService.checkFollowing(this, nick, userclass);
                }
            },
            error => {
                console.log("Ero");
            }
        );
    }

    getSharedItems(index) {
        let quantity = JSON.parse(localStorage.getItem("config")).feed;
        this._imageService.getShared(this.token, index, quantity, this.nsfw, this.epilepsy).subscribe(
            response => {
                if (response.is_last == true) {
                    this.isLast = true;
                }
                if (response.status == "success") {
                    let counter = 0;
                    for (let i = 0; i < response.element.length; i++) {
                        this.sharedImages.push(response.element[i]);
                        counter++;
                    }

                    // this.sharedImages[0].image.name; // Nombre de imagen
                    // this.sharedImages[0].image.url; // Url de la imagen
                    // this.sharedImages[0].image.createdAt; // Fecha de imagen
                    // this.sharedImages[0].image.description; // Descripción de imagen
                    // this.sharedImages[0].image.user.nick; // Nick de propietario de la imagen
                    // this.sharedImages[0].user.nick; // Nick de quien la ha compartido

                    console.log(this.sharedImages);
                    // this.sharedImages = response;

                    for (let i = 0; i < this.sharedImages.length; i++) {

                        let descr = this.sharedImages[i].image.description;

                        if (descr != null) {
                            descr = descr.replace(/\\n/g, "<br>");
                        }

                        let date = this.sharedImages[i].image.createdAt;

                        date = this._commonService.dateFormat(date);
                        this.sharedImages[i].image.createdAt = date;

                        this.sharedImages[i].image.description = descr;

                        var nick = this.sharedImages[i].image.user.nick;
                        var userclass = "user-" + nick;
                        this._userService.checkFollowing(this, nick, userclass);
                        this.imageInteractions(i);
                    }
                    this.loaded = true;
                    this.index = response.index;

                    if (response.isLast == true) {
                        this.isLast = true;
                    }
                }
                else {
                    this.getSharedItems(this.index);
                }
            },
            error => {
                this.sharedImages = [];
                console.log("getShared()");
                console.log("Ero..." + " attempt: " + this.sharError);
                if (this.sharError < 5) {
                    this.getSharedItems(this.index);
                    this.sharError++;
                }
            }
        );
    }

    imageInteractions(index){
        this._imageService.getInteractionsCount(this.sharedImages[index].image.id).subscribe(
            response => {
                this.sharedImages[index].image.likes = response.likes;
                this.sharedImages[index].image.favs = response.favs;
                this.sharedImages[index].image.shares = response.shares;

                console.log(this.sharedImages[index]);
            },
            error => {
                this.imageInteractions(index);
            }
        );
    }
}
