import { Component, OnInit, HostListener } from "@angular/core";
import { UserService } from "../../services/user.service";
import { ImageService } from "../../services/image.service";
import { CommonService } from "../../services/common.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Renderer2 } from "@angular/core";
import { SharedService } from "../shared-service/shared-service.component";
import { Identity } from "src/app/types/user";
import { Config } from "src/app/types/config";
import { Image, UserImage } from "src/app/types/image";

/**
 *
 * The share feed is ordered by shared time, not by image upload time! On the back-end it checks if they have been repeated, with a set number...
 * This means that if it' hasn't been shared in the last x (being x the number of elements shown), it will show it again. So if an image has been
 * shared in those x elements more than once, it'll only show it once. Otherwise it'll show more than once. Needs to be changed so it checks the shown
 * ones on a bigger scale. Like 100. More than that should be fine to repeat it. (Send an array of the current shown images)
 *
 */

@Component({
    selector: "app-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.css"],
    providers: [UserService, ImageService, CommonService],
})
export class FeedComponent implements OnInit {
    public identity: Identity;
    public token: string;
    public config: Config;
    public lang: { [key: string]: string | null };

    public images;
    public imageId: any;
    public username: string;
    public followStatus: string;
    public element: number;
    public found: boolean;
    public hasElements: boolean = true; // If false or unset, it will show the message of no elements found until the AJAX call is done
    public times: number = 0; // Keeps the number of times it has loaded new items
    public description: string;
    public isFollowing: boolean;
    public _imageURL: string;
    public sharedImages: Array<{
        image: Image & { userInteractions: UserImage };
    }> = [];
    public sharError: number = 0;
    public index: number = 0; // Every time scroll reaches the bottom, it executes the query, and a new one is assigned
    public loaded: boolean = true;
    public isLast: boolean = false;
    public objectSend: Object;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        public _sharedService: SharedService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2
    ) {
        this.sharError = 0;
    }

    ngOnInit() {
        this._sharedService.configSubject.subscribe(
            ({ config, languageContext }) => {
                this.config = config;
                this.lang = languageContext.settings;
                this._sharedService.setTitle(this.lang.title);
            }
        );

        this.loadUser();
        this.getSharedItems(this.index);
        // this._userService.checkFollowing(this);  // A new case has to be done appart
    }

    @HostListener("window:scroll", ["$event"])
    doSomethingOnWindowsScroll($event: Event) {
        // Event to fire new items on scroll down
        const d = document.documentElement;
        const zoom = 1; // Establecido en CSS
        const offset = d.scrollTop + window.innerHeight;
        const height = d.offsetHeight * zoom;

        // console.log('offset = ' + offset);
        // console.log('height = ' + height);

        if (offset >= height - 5 && this.loaded && !this.isLast) {
            // 5 is the margin of error
            this.loaded = false;
            this.getSharedItems(this.index);
        }
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    follow(token, nick) {
        this._userService.follow(token, nick).subscribe(
            (response) => {
                if (response.status == "success") {
                    var userclass = "user-" + nick;
                    this._userService.checkFollowing(this, nick, userclass);
                }
            },
            (error) => {
                console.log("Ero");
            }
        );
    }

    getSharedItems(index) {
        let quantity = JSON.parse(localStorage.getItem("config")).feed;
        this._imageService
            .getShared(
                this.token,
                index,
                quantity,
                this.config.nsfw,
                this.config.epilepsy
            )
            .subscribe(
                (response) => {
                    if (response.is_last) this.isLast = true;

                    if (response.status === "success") {
                        if (this.times === 0)
                            this.hasElements =
                                response.element.length > 0 ? true : false;

                        if (this.hasElements || this.times > 0) {
                            this.times++;

                            let counter = 0;
                            for (let i = 0; i < response.element.length; i++) {
                                this.sharedImages.push(response.element[i]);
                                counter++;
                            }

                            console.log('sharedImages', this.sharedImages);

                            // this.sharedImages[0].image.name; // Image name
                            // this.sharedImages[0].image.url; // Image url
                            // this.sharedImages[0].image.createdAt; // Image date
                            // this.sharedImages[0].image.description; // Image description
                            // this.sharedImages[0].image.user.nick; // Nick of the image owner user
                            // this.sharedImages[0].user.nick; // Nick of the user that shared the image

                            // this.sharedImages = response;

                            for (let i = 0; i < this.sharedImages.length; i++) {
                                let descr =
                                    this.sharedImages[i].image.description;

                                let date = this.sharedImages[i].image.createdAt;

                                date = this._commonService.dateFormat(
                                    date,
                                    this.lang,
                                    "lapsed"
                                );
                                this.sharedImages[i].image.createdAt = date;

                                this.sharedImages[i].image.description = descr;
                                this.sharedImages[
                                    i
                                ].image.formattedDescription = descr; // We add a new attr instead of modifying the main one.
                                // Otherwise, it caches, and going from feed to image,
                                // and then back to feed, would cause a bad formatting.

                                if (
                                    this.sharedImages[i].image.description !=
                                    null
                                ) {
                                    this.sharedImages[
                                        i
                                    ].image.formattedDescription = this._commonService.noscript(
                                        this.sharedImages[i].image
                                            .formattedDescription
                                    );
                                    this.sharedImages[
                                        i
                                    ].image.formattedDescription = this._commonService.formatText(
                                        this.sharedImages[i].image
                                            .formattedDescription
                                    );
                                }

                                const nick = this.sharedImages[i].image.user.nick;
                                var userclass = "user-" + nick;
                                this._userService.checkFollowing(
                                    this,
                                    nick,
                                    userclass
                                );
                                this.imageInteractions(i);
                            }
                            this.loaded = true;
                            this.index = response.index;

                            if (response.isLast == true) {
                                this.isLast = true;
                            }
                        }
                    } else {
                        this.getSharedItems(this.index);
                    }
                    this.sharError = 0;
                },
                (error) => {
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

        this._imageService.saveInteraction(
            event,
            this,
            action,
            true,
            "feedComponent"
        );
    }

    imageInteractions(index) {
        this._imageService
            .getInteractionsCount(
                this.sharedImages[index].image.id,
                this.identity.sub
            )
            .subscribe(
                (response) => {
                    this.sharedImages[index].image.interactions.likes =
                        response.interactions.likes;
                    this.sharedImages[index].image.interactions.favs =
                        response.interactions.favs;
                    this.sharedImages[index].image.interactions.shares =
                        response.interactions.shares;
                    this.sharedImages[index].image.userInteractions.like =
                        response.interactions.like;
                    this.sharedImages[index].image.userInteractions.fav =
                        response.interactions.fav;
                    this.sharedImages[index].image.userInteractions.share =
                        response.interactions.share;

                    // console.log(this.sharedImages[index]);
                },
                (error) => {
                    this.imageInteractions(index);
                }
            );
    }

    updateCounter(event, that, action) {
        this.getInteractionsInfo(that);
    }

    getInteractionsInfo(that) {
        that._imageService
            .getInteractionsCount(that.imageId, that.identity.sub)
            .subscribe(
                (response) => {
                    console.log(response);

                    for (let i = 0; i < that.sharedImages.length; i++) {
                        console.log(
                            parseInt(that.sharedImages[i].image.id) ==
                                that.imageId
                        );
                        if (
                            parseInt(that.sharedImages[i].image.id) ==
                            that.imageId
                        ) {
                            that.sharedImages[i].image.likes = response.likes;
                            that.sharedImages[i].image.favs = response.favs;
                            that.sharedImages[i].image.shares = response.shares;
                            that.sharedImages[i].image.userLike =
                                response.userLike;
                            that.sharedImages[i].image.userFav =
                                response.userFav;
                            that.sharedImages[i].image.userShare =
                                response.userShare;

                            console.log(that.sharedImages[i]);
                        }
                    }

                    // this.element.image.likes = response.likes;
                    // this.nFavs = response.favs;
                    // this.nShares = response.shares;
                    that.iCntError = 0;
                },
                (error) => {
                    console.log(error);
                    console.log("Ero..." + " attempt: " + that.iCntError);
                    if (that.iCntError < 5) {
                        that.loadImage(that);
                        that.iCntError++;
                    }
                }
            );
    }
}
