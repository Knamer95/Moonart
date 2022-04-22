import {
    Component,
    OnInit,
    ElementRef,
    EventEmitter,
    Output,
} from "@angular/core";
import { UserService } from "../../services/user.service";
import { ImageService } from "../../services/image.service";
import { CommonService } from "../../services/common.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Renderer2 } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { emitterTypes } from "../../models/struct";
import { SharedService } from "../../components/shared-service/shared-service.component";
import { Identity, Roles } from "src/app/types/user";
import { Image } from "src/app/types/image";
import { Config } from "src/app/types/config";

// TODO - Remove the scrollbar when viewing images in fullscreen (overflow: hidden)
declare var jQuery: any;

@Component({
    selector: "app-image",
    templateUrl: "./image.component.html",
    styleUrls: ["./image.component.css"],
})
export class ImageComponent implements OnInit {
    public identity: Identity;
    public token: string;
    public config: Config;
    public lang: { [key: string]: string | null };

    public imageId: number;
    public tarea: HTMLElement; // Textarea
    public username: string;
    public followStatus: string;
    public description: string;
    public isOwner: boolean;
    public isFollowing: boolean;
    public _imageURL: string; // The image of the logged in user
    public image: Image;

    public loading: boolean = false; // Tells Angular if the image is loading, to show a loading gif otherwise
    public loadingDelay: boolean = false; // We add a delay of 300 ms, so there's no gif if the image loading is fast

    public images: Image[] = [];
    public hasLeft: boolean = false;
    public hasRight: boolean = false;
    public prevImage = {} as Image;
    public nextImage = {} as Image;

    public maximized: boolean = false; // Set as false when initialized

    // public images2: Array<Object>;
    public moreImagesLoaded: boolean = false; // Flag to avoid loading them every time
    public tags: string[];
    public isTags: boolean = false;
    public role: Roles = "role_user";
    public addComment: string = "";
    public parent = null;
    public comments: any;
    public commentsLength: number;
    public deleted: boolean;
    public hidden: boolean;
    public visible: boolean;
    public found: boolean = false;
    public nLikes: number = 0;
    public nFavs: number = 0;
    public nShares: number = 0;
    public commentToDelete: string;
    public customAlert: string;

    formVar: FormGroup;
    public commError: number = 0;
    public isFwError: number = 0;
    public loadError: number = 0;
    public iCntError: number = 0;
    public moreError: number = 0;
    public chckError: number = 0;
    public imagError: number = 0;
    public alertStatus: String;
    public emitType: number;

    @Output() emitter = new EventEmitter();

    constructor(
        private _sharedService: SharedService,
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _router: Router,
        private fb: FormBuilder,
        private elementRef: ElementRef,
        private _route: ActivatedRoute,
        private render: Renderer2
    ) {
        this.image = {
            url: "",
            description: "",
            user: {
                image: "",
                nick: "",
            },
            status: "",
        };
    }

    ngOnInit() {
        this.loading = true;
        setTimeout(() => (this.loadingDelay = true), 300);

        this._sharedService.statusNotifier$.subscribe((value) => {
            if (value === true) {
                this._sharedService.needsReload(false);
                // this.ngOnInit();
            }
        });

        this.loadUser();

        if (!this.imageId) {
            const location = window.location.href.split("/");

            for (let i = 0; i < location.length; i++) {
                if (location[i] === "images" && i + 1 < location.length) {
                    this.imageId = parseInt(location[i + 1]);
                }
            }
        }

        if (this.images.length) {
            this.getNextPrevImages(this.imageId);
        }

        if (!/^[0-9]*$/.test(String(this.imageId))) {
            this.error();
        }

        this.formVar = this.fb.group({
            comment: "",
        });

        this.loadImage(this);
        this.getAllComments(this.imageId);

        this._commonService.changeLangAttr(this.lang);
    }

    ngOnChanges() {
        // create header using child_id
        // console.log("A");
    }

    ngAfterViewInit() {
        this.tarea = document.getElementById("tarea");
        jQuery(this.elementRef.nativeElement)
            .find('[data-toggle="tooltip"]')
            .tooltip();

        // console.log(this.tarea);
    }

    update(): void {
        this.ngOnInit();
    }

    /*
     *
     * Function to load a new image by updating all the data, but without actually reloading the whole script
     *
     */
    reload(event: MouseEvent, newImg: Image) {
        const self: string = "selected-image"; // Clicked elements that should prop the view
        const classes: Array<string> = (<HTMLInputElement>(
            event.target
        )).classList.value.split(" ");

        if (newImg && !classes.includes(self)) {
            this.imageId = newImg[0].id;

            if (window.history.replaceState) {
                //prevents browser from storing history with each change:
                window.history.replaceState(
                    "page",
                    "Title",
                    "/images/" + this.imageId
                );
            } else {
                window.history.pushState(
                    "page",
                    "Title",
                    "/images/" + this.imageId
                );
            }

            this.ngOnInit();
            window.scrollTo(0, 0);
        }
    }

    /**
     *
     * Function that loads the current image displayed.
     *
     * In order to prevent errors from VSCode, I used that, because this.image.name for example seems to be invalid, since it's assigned in an AJAX call.
     * Another way would be to declare the objects with initial attributes from the beginning, but it's the same...
     *
     */
    loadImage(that) {
        this._imageService.getImage(this.imageId).subscribe(
            (response) => {
                if (response.status === "success") {
                    setTimeout(() => (this.loading = false), 300);

                    this.loadingDelay = false;
                    console.log(response);

                    // Idk what the purpose of this was, it didn't seem to do anything
                    // this._commonService.displayNotification(null, false, response.status);

                    this.username = response.image.user.nick;

                    this._userService.checkFollowing(that);
                    this.image = response.image;
                    document.title = this.image.name;
                    this.getMoreImages();

                    // that.images = that.image;
                    // console.log(that.images);

                    if (that.image.status === "hidden") {
                        this.alertStatus = "success";

                        this._commonService.displayNotification(
                            this.lang.hiddenImage,
                            true,
                            null
                        );
                    } else {
                        this.alertStatus = "idle";
                    }

                    this._imageService.getInteractions(
                        this,
                        true,
                        "imageComponent"
                    );

                    if (that.image.description != null) {
                        that.image.description = that._commonService.noscript(
                            that.image.description
                        );
                        that.image.description = that._commonService.formatText(
                            that.image.description
                        );
                    }

                    that.image.createdAt = that._commonService.dateFormat(
                        that.image.createdAt,
                        this.lang,
                        "timestamp"
                    );

                    // that.image.rights = that.image.rights.charAt(0).toUpperCase() + that.image.rights.slice(1);

                    switch (that.image.rights) {
                        case "none":
                            that.image.rights =
                                this.lang.none;
                            break;
                        case "partial":
                            that.image.rights =
                                this.lang.partial;
                            break;
                        case "total":
                        default:
                            that.image.rights =
                                this.lang.total;
                            break;
                    }

                    that.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                    that.epilepsy = JSON.parse(
                        localStorage.getItem("config")
                    ).epilepsy;

                    if (
                        that.identity.nick != that.image.user.nick &&
                        ((that.nsfw === false && that.image.nsfw === true) ||
                            (that.epilepsy === false &&
                                that.image.epilepsy === true))
                    ) {
                        that.visible = false;
                    }

                    if (response.image.tags != null) {
                        that.isTags = true;
                        that.tags = response.image.tags.trim().split(",");
                        // console.log(that.tags[0].charAt(0));
                    }

                    that.customAlert = this.lang.imageAlert1;
                    if (that.image.nsfw)
                        that.customAlert +=
                            this.lang.imageAlert2;

                    if (that.image.nsfw && that.image.epilepsy)
                        that.customAlert +=
                            this.lang.imageAlert3;

                    if (that.image.epilepsy)
                        that.customAlert +=
                            this.lang.imageAlert4;

                    that.customAlert += this.lang.imageAlert5;

                    if (!this.moreImagesLoaded) {
                        // console.log(this.moreImagesLoaded);
                        this.moreImagesLoaded = true;
                        this.getMoreImages(); // We load more images by the user
                    }
                } else {
                    this.error();
                }
                that.loadError = 0;
            },
            (error) => {
                console.log("Ero..." + " attempt: " + that.loadError);
                if (that.loadError < 5) {
                    that.loadImage(that);
                    that.loadError++;
                }
            }
        );

        this.getInteractionsInfo();
    }

    /*
     *
     * Function to load user and its data
     *
     */
    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this._imageURL = this.identity.image;
    }

    /*
     *
     * Function to check if the user visualizing the image follows the image owner or not
     *
     */
    follow(token, nick) {
        this._userService.follow(token, nick).subscribe(
            (response) => {
                if (response.status === "success") {
                    // No need to display since you can visually see it
                    // this._commonService.displayNotification(null, false, response.status);
                    this._userService.checkFollowing(this);
                }
                this.isFwError = 0;
            },
            (error) => {
                console.log("Ero..." + " attempt: " + this.isFwError);
                if (this.isFwError < 5) {
                    this.follow(token, nick);
                    this.isFwError++;
                }
            }
        );
    }

    error() {
        this._router.navigate(["error"]);
    }

    /*
     *
     * Function to get all comments. It transforms the date to a more readable one
     *
     */
    getAllComments(imageId) {
        this._imageService.getComments(imageId).subscribe(
            (response) => {
                this.comments = response.comments;
                this.commentsLength = this.comments.length;
                for (let i = 0; i < this.comments.length; i++) {
                    this.comments[i].children = [];
                }

                for (let i = 0; i < this.comments.length; i++) {
                    // To dormat dates

                    // console.log(this.comments[i].user);

                    this.comments[i].createdAt = this._commonService.dateFormat(
                        this.comments[i].createdAt,
                        this.lang,
                        "lapsed"
                    );
                    try {
                        this.comments[i].comment = JSON.parse(
                            this.comments[i].comment
                        );
                    } catch (err) {}

                    if (this.comments[i].status === "deleted") {
                        this.comments[i].comment =
                            this.lang.deletedComment;
                    }

                    this.comments[i].comment = this._commonService.noscript(
                        this.comments[i].comment
                    );
                    this.comments[i].comment = this._commonService.formatText(
                        this.comments[i].comment
                    );

                    if (this.comments[i].parent) {
                        let found = false;
                        for (let j = 0; j < this.comments.length; j++) {
                            if (
                                this.comments[j].id === this.comments[i].parent
                            ) {
                                this.comments[j].children.push(
                                    this.comments[i]
                                );
                                found = true;
                            }
                        }

                        // if (found) {
                        this.comments.splice(i, 1);
                        i--;
                        // }
                    }
                }

                // console.log(this.comments);
                this.commError = 0;
            },
            (error) => {
                console.log("Ero..." + " attempt: " + this.commError);
                if (this.commError < 5) {
                    this.getAllComments(imageId);
                    this.commError++;
                }
            }
        );
    }

    /*
     *
     * Function onSubmit, for the comment submission. Changes charCode === 10 (linejumps) with \n to store them on the DB
     *
     */
    onSubmit(form) {
        let comment = this.formVar.value.comment;

        // Cannot submit empty comment
        if (comment) {
            for (let i = 0; i < comment.length; i++) {
                if (comment.charCodeAt(i) === 10) {
                    comment =
                        comment.substr(0, i) + "\\n" + comment.substr(i + 1);
                }
            }

            comment = this._commonService.noscript(comment);
            this.formVar.value.comment = comment;

            let data = {
                userId: this.identity.sub,
                imageId: this.imageId,
                parent: this.parent ? this.parent : null,
                comment: this.formVar.value.comment,
            };
            let json = JSON.stringify(data);
            this._imageService.addComment(this.token, json).subscribe(
                (response) => {
                    if (response.status === "success") {
                        this.emitter.emit({
                            type: emitterTypes.ALERT,
                            status: response.status,
                            notificationType: response.status,
                            message: this.lang.commentAdded,
                            timer: 3000,
                        });

                        form.reset();

                        this.getAllComments(this.imageId); // Reloads the comments, so you don't have to reload the page to see the one you added
                        // console.log(response);
                    } else {
                        console.log(response);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    addName(event, nick, taVal) {
        // taVal = textarea value (on the html it's 'tarea')
        // console.log(event.target.closest(".comment"));
        this.parent = event.target
            .closest(".comment")
            .getElementsByClassName("comment-id")[0]
            .id.replace("comment-", "");
        // console.log(this.parent);
        this.addComment = "@" + nick + " " + taVal;
    }

    doSomething(index: number) {}

    /*
     *
     * Function to delete an image. Only roles [role_admin | role_owner] can access this function. If everything goes well, it deletes the image, and redirects home
     *
     */
    delete(id) {
        this._imageService.delete(this.token, id).subscribe(
            (response) => {
                let message =
                    response.status === "success"
                        ? this.lang.deletedImage
                        : this.lang.deletedImageError;

                this.emitter.emit({
                    type: emitterTypes.ALERT,
                    status: response.status,
                    notificationType: response.status,
                    message: message,
                    timer: 3000,
                });

                if (response.status === "success") {
                    this.deleted = true;
                    this._router.navigate(["home"]);
                }
            },
            (error) => {
                // console.log(error);
            }
        );
    }

    assignDelete(id) {
        this.commentToDelete = id;
    }

    deleteComment(id) {
        this._imageService.deleteComment(this.token, id).subscribe(
            (response) => {
                console.log(response);
                if (response.status === "success") {
                    this.ngOnInit();

                    this.emitter.emit({
                        type: emitterTypes.ALERT,
                        status: response.status,
                        notificationType: response.status,
                        message: this.lang.deletedComment2,
                        timer: 3000,
                    });
                }
            },
            (error) => {
                // console.log(error);
            }
        );
    }

    /*
     *
     * Function to hide an image if role user_role === role_admin || role_mod (Image status is set to hidden, so only the owner can see it at their profile)
     * Only if the user hiding it is not the owner, cause it wouldn't make sense otherwise to hide your own image
     *
     */
    hideToggle(id, action) {
        this._imageService.hide(this.token, id, action).subscribe(
            (response) => {
                console.log(response);
                if (response.status === "success") {
                    this.alertStatus = "success";

                    // If it's published when we call the function, it hides it, and vice-versa
                    if (action === "published")
                        this._commonService.displayNotification(
                            this.lang.hiddenImage,
                            true,
                            null
                        );
                    else
                        this.emitter.emit({
                            type: emitterTypes.ALERT,
                            status: response.status,
                            notificationType: response.status,
                            message: this.lang.unbannedImage,
                            timer: 3000,
                        });

                    this.hidden = true;
                    setTimeout(() => {
                        this._router.navigate(["home"]);
                    }, 1500);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    navigate(tag) {
        this._router.navigateByUrl("/search?q=tag:" + tag);
    }

    /*
     *
     * Function to stop propagation of events
     *
     */
    doNothing(e) {
        e.stopPropagation();
    }

    addEvents() {
        // console.log(this.comments);
        let elements = document.querySelectorAll(".user-at");
        // that.image.description.querySelector('[data-link]').addEventListener('click', ));
        // console.log(elements);

        elements.forEach((element) => {
            element.addEventListener("click", () => {
                this._commonService.redirectToProfile(
                    element.getAttribute("data-link")
                );
            });
        });
    }

    checkText(event) {
        this.addComment = event.target.value;
        this.parent = this.addComment ? this.parent : null;
        // console.log(this.parent);
    }

    updateCounter(event, that, action) {
        this.getInteractionsInfo();
    }

    getInteractionsInfo() {
        this._imageService
            .getInteractionsCount(this.imageId, this.identity.sub)
            .subscribe(
                (response) => {
                    // console.log(response);
                    this.nLikes = response.likes;
                    this.nFavs = response.favs;
                    this.nShares = response.shares;

                    this.iCntError = 0;
                },
                (error) => {
                    console.log(error);
                    console.log("Ero..." + " attempt: " + this.iCntError);
                    if (this.iCntError < 5) {
                        this.getInteractionsInfo();
                        this.iCntError++;
                    }
                }
            );
    }

    getMoreImages() {
        const promise = new Promise((resolve, reject) => {
            this._imageService.showAllImages(this, 1, false, false, resolve);
        });

        // If resolve is called in showAllImages, it will go here
        promise.then((success) => {
            this.getNextPrevImages(null);
        });

        /*
        this._route.params.subscribe(params => {
            this._imageService.showAllImages(this, 1, false, false);
        });
        */
    }

    getNextPrevImages(current) {
        const iid = current !== null ? current : this.image.id;
        this.hasLeft = iid === this.images[0][0].id ? false : true;
        this.hasRight =
            iid === this.images[this.images.length - 1][0].id ? false : true;

        var imageIndex: number = null;

        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i][0].id === iid && i < this.images.length) {
                imageIndex = i;
                break;
            }
        }

        if (imageIndex !== null) {
            if (imageIndex > 0) {
                this.prevImage = this.images[imageIndex - 1];
            }
            if (imageIndex < this.images.length - 1) {
                this.nextImage = this.images[imageIndex + 1];
            }
        }
        // console.log(obj);
    }

    getRatio(img) {
        img = document.getElementById(img);
        // console.log(img.clientWidth, img.clientHeight);

        console.log(img.clientWidth);

        if (img.clientWidth > img.clientHeight) {
            img.classList.add("aspect-width");
        } else {
            img.classList.add("aspect-height");
        }
    }

    prop(el) {
        jQuery(el).modal("show");
    }

    // Function to redirect if user isn't logged in
    isGuest() {
        if (this.identity.nick === "guest" || !this.identity.nick) {
            this.emitter.emit({
                type: emitterTypes.LOGIN,
                status: "not-logged",
                notificationType: null,
                message: null,
                timer: 0,
            });
        } else {
        }
    }

    setMaximized(event: MouseEvent, status: boolean) {
        const closeTargets: Array<string> = [
            "maximized-view",
            "maximized-close",
            "image",
        ]; // Clicked elements that should prop the view
        const classes: Array<string> = (<HTMLInputElement>(
            event.target
        )).classList.value.split(" ");
        let prevent: boolean = true;

        for (let i = 0; i < classes.length; i++) {
            if (closeTargets.includes(classes[i])) {
                prevent = false;
                break;
            }
        }

        if (!prevent) this.maximized = status;

        console.log(this.maximized);
        console.log(classes);
    }
}
