import { Component, OnInit, HostListener } from "@angular/core";
import { UserService } from "../../services/user.service";
import { ImageService } from "../../services/image.service";
import { CommonService } from "../../services/common.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Renderer2 } from "@angular/core";
import { SharedService } from "../shared-service/shared-service.component";
import { Identity } from "src/app/types/user";
import { Config } from "src/app/types/config";
import { FollowStatus, Image, UserInteractions } from "src/app/types/image";

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

    public username: string;
    public followStatus: string;
    public item: number;
    public found: boolean;
    public hasElements: boolean = true; // If false or unset, it will show the message of no elements found until the AJAX call is done
    public times: number = 0; // Keeps the number of times it has loaded new items
    public description: string;
    public isFollowing: boolean;
    public _imageURL: string;
    public sharedImages: Array<{
        image: Image & { userInteractions: UserInteractions } & {
            followStatus: FollowStatus;
        };
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
                    console.log("response", response);

                    if (response.status === "success") {
                        if (this.times === 0)
                            this.hasElements =
                                response.item.length > 0 ? true : false;

                        if (this.hasElements || this.times > 0) {
                            this.times++;
                            this.sharedImages = response.item.map((el) => ({
                                user: el.user,
                                image: {
                                    ...el.image,
                                    formattedDescription:
                                        el.image.description ||
                                        this._commonService.formatText(
                                            this._commonService.noscript(
                                                el.image.description
                                            )
                                        ),
                                },
                                userInteractions: {
                                    liked: el.liked,
                                    faved: el.faved,
                                    shared: el.shared,
                                    loading: {
                                        liked: false,
                                        faved: false,
                                        shared: false,
                                    },
                                },
                                followStatus: el.image.followStatus,
                            }));

                            console.log(this.sharedImages);

                            // We add formattedDescription instead of modifying the main one.
                            // Otherwise, it caches, and going from feed to image,
                            // and then back to feed, would cause a bad formatting.

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

    saveInteraction(event, item, action) {
        // Initially we update the GUI as selected/unselected, and increment/decrement the interaction counter
        // - If the transaction fails, we return to the previous value
        // - If it goes well, we update both the status and the counter

        const data = {
            user_id: this.identity.sub,
            image_id: item.image.id,
            action,
            method: "PUT",
        };

        // {key: value}: { action: model }
        const mapper = [
            {
                action: "like",
                userInteraction: "liked",
                imageInteraction: "likes",
            },
            {
                action: "fav",
                userInteraction: "faved",
                imageInteraction: "favs",
            },
            {
                action: "share",
                userInteraction: "shared",
                imageInteraction: "shares",
            },
        ];

        const mapperAction = mapper.find((item) => item.action === action);

        if (!mapperAction) throw new Error("MapperAction. No such action was found.");

        // If the interaction is being saved, we disable the possibility to update it again
        if (item.userInteractions.loading[mapperAction.userInteraction]) return;

        const prevUserAction = item.userInteractions[mapperAction.userInteraction];
        const prevInteractionCounter = item.image.interactions[mapperAction.imageInteraction];

        const indecrement = prevUserAction ? -1 : 1;

        item.userInteractions[mapperAction.userInteraction] = !prevUserAction;
        item.image.interactions[mapperAction.imageInteraction] += indecrement;

        item.userInteractions.loading[mapperAction.userInteraction] = true;

        this._imageService.interact(this.token, data).subscribe(
            (response) => {
                if (response.status === "success") {
                    item.userInteractions = {
                        ...item.userInteractions,
                        liked: response.data.liked,
                        faved: response.data.faved,
                        shared: response.data.shared,
                        loading: {
                            ...item.userInteractions.loading,
                            [mapperAction.userInteraction]: false,
                        },
                    }

                    item.image.interactions = {
                        ...item.image.interactions,
                        likes: response.data.image.interactions.likes,
                        favs: response.data.image.interactions.favs,
                        shares: response.data.image.interactions.shares,
                    }   
                }

                console.log(response);
            },
            (error) => {
                console.log(error);
                item.userInteractions[mapperAction.userInteraction] = prevUserAction;
                item.image.interactions[mapperAction.imageInteraction] -= indecrement;
            }
        );
    }
}
