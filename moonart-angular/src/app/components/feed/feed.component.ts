import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';

/**
 * 
 * The share feed is ordered by shared time, not by image upload time! On the back-end it checks if they have been repeated, with a set number...
 * This means that if it' hasn't been shared in the last x (being x the number of elements shown), it will show it again. So if an image has been
 * shared in those x elements more than once, it'll only show it once. Otherwise it'll show more than once. Needs to be changed so it checks the shown
 * ones on a bigger scale. Like 100. More than that should be fine to repeat it. (Send an array of the current shown images)
 * 
 */

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css'],
    providers: [UserService, ImageService, CommonService]
})

export class FeedComponent implements OnInit {

    public pageTitle: string = "Feed";
    public identity: any;
    public token: string;
    public images;
    public imageId: any;

    public nightMode: boolean = false;
    public nsfw: boolean = true;
    public epilepsy: boolean = true;
    public username: string;
    public followStatus: string;
    public element: number;
    public found: boolean;
    public hasElements: boolean = true; // If false or unset, it will show the message of no elements found until the AJAX call is done
    public times: number = 0; // Keeps the number of times it has loaded new items
    public description: string;
    public isFollowing: boolean;
    public _imageURL: string;
    public sharedImages: any = [];
    public sharError: number = 0;
    public index: number = 0;  // Every time scroll reaches the bottom, it executes the query, and a new one is assigned
    public loaded: boolean = true;
    public isLast: boolean = false;
    public objectSend: Object;
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
        this.sharError = 0;
    }

    ngOnInit() {
        document.title = this.pageTitle;

        this.loadUser();
        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode);
            this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
            this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
        }

        this.getSharedItems(this.index);
        // this._userService.checkFollowing(this);  // A new case has to be done appart

        this.lang = JSON.parse(localStorage.getItem("config")).lang;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    @HostListener("window:scroll", ['$event'])
    doSomethingOnWindowsScroll($event: Event) { // Event to fire new items on scroll down

        var d = document.documentElement;
        var zoom = 0.8; // Establecido en CSS
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight * zoom;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (offset >= (height - 5) && this.loaded == true && this.isLast == false) { // 5 is the margin of error
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

                console.log(response);
                if (response.is_last == true) {
                    this.isLast = true;
                }

                if (response.status == "success") {
                    if (this.times === 0)
                        this.hasElements = response.element.length > 0 ? true : false;

                    if (this.hasElements || this.times > 0) {
                        this.times++;

                        let counter = 0;
                        for (let i = 0; i < response.element.length; i++) {

                            this.sharedImages.push(response.element[i]);
                            counter++;
                        }

                        // this.sharedImages[0].image.name; // Image name
                        // this.sharedImages[0].image.url; // Image url
                        // this.sharedImages[0].image.createdAt; // Image date
                        // this.sharedImages[0].image.description; // Image description
                        // this.sharedImages[0].image.user.nick; // Nick of the image owner user
                        // this.sharedImages[0].user.nick; // Nick of the user that shared the image

                        // this.sharedImages = response;

                        for (let i = 0; i < this.sharedImages.length; i++) {

                            let descr = this.sharedImages[i].image.description;

                            let date = this.sharedImages[i].image.createdAt;

                            date = this._commonService.dateFormat(date, this.lang, "lapsed");
                            this.sharedImages[i].image.createdAt = date;

                            this.sharedImages[i].image.description = descr;
                            this.sharedImages[i].image.formattedDescription = descr; // We add a new attr instead of modifying the main one.
                            // Otherwise, it caches, and going from feed to image, 
                            // and then back to feed, would cause a bad formatting.

                            if (this.sharedImages[i].image.description != null) {
                                this.sharedImages[i].image.formattedDescription = this._commonService.noscript(this.sharedImages[i].image.formattedDescription);
                                this.sharedImages[i].image.formattedDescription = this._commonService.formatText(this.sharedImages[i].image.formattedDescription);
                            }

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
                }
                else {
                    this.getSharedItems(this.index);
                }
                this.sharError = 0;
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

    saveInteraction(event, element, action) {
        this._imageService = this._imageService;
        this.imageId = element.image.id;
        this.images = element.image;

        this._imageService.saveInteraction(event, this, action, true, 'feedComponent');
    }

    imageInteractions(index) {
        this._imageService.getInteractionsCount(this.sharedImages[index].image.id, this.identity.sub).subscribe(
            response => {

                this.sharedImages[index].image.likes = response.likes;
                this.sharedImages[index].image.favs = response.favs;
                this.sharedImages[index].image.shares = response.shares;
                this.sharedImages[index].image.userLike = response.userLike;
                this.sharedImages[index].image.userFav = response.userFav;
                this.sharedImages[index].image.userShare = response.userShare;

                // console.log(this.sharedImages[index]);
            },
            error => {
                this.imageInteractions(index);
            }
        );
    }

    updateCounter(event, that, action) {
        this.getInteractionsInfo(that);
    }

    getInteractionsInfo(that) {
        that._imageService.getInteractionsCount(that.imageId, that.identity.sub).subscribe(
            response => {
                console.log(response);

                for (let i = 0; i < that.sharedImages.length; i++) {
                    console.log(parseInt(that.sharedImages[i].image.id) == that.imageId);
                    if (parseInt(that.sharedImages[i].image.id) == that.imageId) {
                        that.sharedImages[i].image.likes = response.likes;
                        that.sharedImages[i].image.favs = response.favs;
                        that.sharedImages[i].image.shares = response.shares;
                        that.sharedImages[i].image.userLike = response.userLike;
                        that.sharedImages[i].image.userFav = response.userFav;
                        that.sharedImages[i].image.userShare = response.userShare;

                        console.log(that.sharedImages[i]);
                    }
                }

                // this.element.image.likes = response.likes;
                // this.nFavs = response.favs;
                // this.nShares = response.shares;
                that.iCntError = 0;
            },
            error => {
                console.log(error);
                console.log("Ero..." + " attempt: " + that.iCntError);
                if (that.iCntError < 5) {
                    that.loadImage(that);
                    that.iCntError++;
                }
            }
        );
    }

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Feed",
                    suchEmpty: "Such empty!",
                    followTip: "You don't follow any user, or the users you follow haven't shared anything yet...",
                    noDescription: "User didn't add a description.",
                    sharedBy: "Shared by",
                    by: "by",
                    the: "",
                    ago: " ago"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Feed",
                    suchEmpty: "¡Qué vacío!",
                    followTip: "No sigues a ningún usuario, o éstos no han compartido nada todavía...",
                    noDescription: "El usuario no ha agregado ninguna descripción.",
                    sharedBy: "Compartido por",
                    by: "por",
                    the: "",    // Change to 'El'
                    ago: "ago"  // Leave empty
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
