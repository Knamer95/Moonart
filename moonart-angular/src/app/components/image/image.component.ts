import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { callbackify } from 'util';

declare var jQuery: any;

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit {

    public page_title: string;
    public identity: any;
    public token: string;
    public imageId: any;
    public tarea: any;
    public nightMode: boolean;
    public nsfw: boolean;
    public epilepsy: boolean;
    public username: string;
    public followStatus: string;
    public description: string;
    public isOwner: boolean;
    public isFollowing: boolean;
    public _imageURL: string; // The image of the logged in user
    public image: Object;
    public images: Array<Object>;
    public images2: Array<Object>;
    public moreImagesLoaded: boolean = false; // Flag to avoid loading them every time
    public tags: Array<string>;
    public isTags: boolean;
    public role: string;
    public addComment: string;
    public parent = null;
    public comments: any;
    public commentsLength: number;
    public commentAdded;
    public deleted: boolean;
    public hidden: boolean;
    public visible: boolean;
    public found: boolean;
    public nLikes: number;
    public nFavs: number;
    public nShares: number;
    public commentToDelete: string;
    public customAlert: string;

    formVar: FormGroup;
    public commError: number;
    public isFwError: number;
    public loadError: number;
    public iCntError: number;
    public moreError: number;
    public chckError: number = 0;
    public language: Object;
    public lang: number;
    public currentLang: any;

    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2,
        private fb: FormBuilder,
        private elementRef: ElementRef
    ) {
        this.isTags = false;
        this.loadError = 0;         // For loadImage();
        this.isFwError = 0;         // For follow();
        this.commError = 0;         // For getAllComments();
        this.iCntError = 0;
        this.found = false;
        this.nLikes = 0;
        this.nShares = 0;
        this.nFavs = 0;
        this.addComment = "";

        this.image = {
            url: '',
            description: '',
            user: {
                image: '',
                nick: '',
            },
            status: '',
        }
    }

    reload(newImg) {
        this.imageId = newImg[0].id;

        if (window.history.replaceState) {
            //prevents browser from storing history with each change:
            window.history.replaceState('page', 'Title', '/images/' + this.imageId);
        }
        else{
            window.history.pushState('page', 'Title', '/images/' + this.imageId);
        }

        this.ngOnInit();
        window.scrollTo(0, 0);
    }

    ngOnInit() {

        this.page_title = "Image";
        this.loadUser();

        if (!this.imageId) {
            this.imageId = window.location.href.split("/");

            for (let i = 0; i < this.imageId.length; i++) {
                if (this.imageId[i] == "images" && (i + 1) < this.imageId.length) {
                    this.imageId = this.imageId[i + 1];
                }
            }
        }

        if (/^[0-9]*$/.test(this.imageId) == false) {
            this.error();
        }
        this.loadImage(this);

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightModeAttr(this.nightMode);
        }

        this.formVar = this.fb.group({
            comment: ''
        });

        this.getAllComments(this.imageId);

        this.lang = JSON.parse(localStorage.getItem("config")).lang;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    ngAfterViewInit() {
        this.tarea = document.getElementById("tarea");
        jQuery(this.elementRef.nativeElement).find('[data-toggle="tooltip"]').tooltip();

        // console.log(this.tarea);
    }

    loadImage(that) {
        that._imageService.getImage(that.imageId).subscribe(
            response => {
                if (response.status == "success") {
                    console.log(response);

                    this._commonService.displayNotification(this, response.status);

                    that.username = response.image.user.nick;

                    this._userService.checkFollowing(that);
                    that.image = response.image;
                    // that.images = that.image;
                    // console.log(that.images);

                    this._imageService.getInteractions(this, true, "imageComponent");

                    if (that.image.description != null) {
                        that.image.description = that._commonService.noscript(that.image.description);
                        that.image.description = that._commonService.formatText(that.image.description);
                    }

                    that.image.createdAt = that._commonService.dateFormat(that.image.createdAt, this.lang, "timestamp");
                    
                    // that.image.rights = that.image.rights.charAt(0).toUpperCase() + that.image.rights.slice(1);

                    switch (that.image.rights) {
                        case "ninguno": that.image.rights = this.currentLang.attributes.none; break;
                        case "parciales": that.image.rights = this.currentLang.attributes.partial; break;
                        case "totales": default: that.image.rights = this.currentLang.attributes.total; break;
                    }

                    that.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                    that.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;

                    if (that.identity.nick != that.image.user.nick && ((that.nsfw == false && that.image.nsfw == true)
                        || (that.epilepsy == false && that.image.epilepsy == true))) {
                        that.visible = false;
                    }

                    if (response.image.tags != null) {
                        that.isTags = true;
                        that.tags = response.image.tags.trim().split(",");
                        // console.log(that.tags[0].charAt(0));
                    }

                    that.customAlert = this.currentLang.attributes.imageAlert1;
                    if (that.image.nsfw)
                        that.customAlert += this.currentLang.attributes.imageAlert2;

                    if (that.image.nsfw && that.image.epilepsy)
                        that.customAlert += this.currentLang.attributes.imageAlert3;

                    if (that.image.epilepsy)
                        that.customAlert += this.currentLang.attributes.imageAlert4;

                    that.customAlert += this.currentLang.attributes.imageAlert5;

                    if (!this.moreImagesLoaded) {
                        // console.log(this.moreImagesLoaded);
                        this.moreImagesLoaded = true;
                        this.getMoreImages(); // We load more images by the user
                    }
                }
                else {
                    this.error();
                }
                that.loadError = 0;
            },
            error => {
                console.log("Ero..." + " attempt: " + that.loadError);
                if (that.loadError < 5) {
                    that.loadImage(that);
                    that.loadError++;
                }
            }
        );

        this.getInteractionsInfo(that);
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
            response => {
                if (response.status == "success") {
                    this._commonService.displayNotification(this, response.status);
                    this._userService.checkFollowing(this);
                }
                this.isFwError = 0;
            },
            error => {
                console.log("Ero..." + " attempt: " + this.isFwError);
                if (this.isFwError < 5) {
                    this.follow(token, nick);
                    this.isFwError++;
                }
            }
        );
    }


    error() {
        this._router.navigate(['error']);
    }


    /*
     *
     * Function to get all comments. It transforms the date to a more readable one
     *
     */
    getAllComments(imageId) {
        this._imageService.getComments(imageId).subscribe(
            response => {
                this.comments = response.comments;
                this.commentsLength = this.comments.length;
                for (let i = 0; i < this.comments.length; i++) {
                    this.comments[i].children = [];
                }

                for (let i = 0; i < this.comments.length; i++) { // To dormat dates

                    // console.log(this.comments[i].user);

                    this.comments[i].createdAt = this._commonService.dateFormat(this.comments[i].createdAt, this.lang, "lapsed");
                    try {
                        this.comments[i].comment = JSON.parse(this.comments[i].comment);
                    }
                    catch (err) { }

                    if (this.comments[i].status == "deleted") {
                        this.comments[i].comment = this.currentLang.attributes.deletedComment;
                    }

                    this.comments[i].comment = this._commonService.noscript(this.comments[i].comment);
                    this.comments[i].comment = this._commonService.formatText(this.comments[i].comment);

                    if (this.comments[i].parent) {
                        let found = false;
                        for (let j = 0; j < this.comments.length; j++) {
                            if (this.comments[j].id === this.comments[i].parent) {
                                this.comments[j].children.push(this.comments[i]);
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
            error => {
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
                if (comment.charCodeAt(i) == 10) {
                    comment = comment.substr(0, i) + '\\n' + comment.substr(i + 1);
                }
            }

            comment = this._commonService.noscript(comment);
            this.formVar.value.comment = comment;

            let data = {
                userId: this.identity.sub,
                imageId: this.imageId,
                parent: this.parent ? this.parent : null,
                comment: this.formVar.value.comment
            }
            let json = JSON.stringify(data);
            this._imageService.addComment(this.token, json).subscribe(
                response => {
                    if (response.status == "success") {
                        this._commonService.displayNotification(this, response.status);

                        form.reset();
                        /*
                        this.commentAdded = true;
                        setTimeout(function(){
                            this.commentAdded = false;
                        }, 1000); 
                        */
                        this.getAllComments(this.imageId); // Reloads the comments, so you don't have to reload the page to see the one you added 
                        // console.log(response);
                    }
                    else {
                        console.log(response);
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    addName(event, nick, taVal) { // taVal = textarea value (on the html it's 'tarea')
        // console.log(event.target.closest(".comment"));
        this.parent = event.target.closest(".comment").getElementsByClassName("comment-id")[0].id.replace("comment-", "");
        // console.log(this.parent);
        this.addComment = "@" + nick + " " + taVal;
    }

    doSomething(index: number) {

    }

    /*
     *
     * Function to delete an image. Only roles [role_admin | role_owner] can access this function. If everything goes well, it deletes the image, and redirects home
     *
     */
    delete(id) {
        this._imageService.delete(this.token, id).subscribe(
            response => {
                console.log(response);
                if (response.status == "success") {
                    this._commonService.displayNotification(this, response.status);
                    this.deleted = true;
                    setTimeout(() => { this._router.navigate(['home']); }, 3000);
                }
            },
            error => {
                // console.log(error);
            }
        );
    }

    assignDelete(id) {
        this.commentToDelete = id;
    }

    deleteComment(id) {

        this._imageService.deleteComment(this.token, id).subscribe(
            response => {
                console.log(response);
                if (response.status == "success") {
                    this.ngOnInit();
                    this._commonService.displayNotification(this, response.status);
                }
            },
            error => {
                // console.log(error);
            }
        );
    }


    /*
     *
     * Function to hide an image if role user_role == role_admin || role_mod (Image status is set to hidden, so only the owner can see it at their profile)
     * Only if the user hiding it is not the owner, cause it wouldn't make sense otherwise to hide your own image 
     *
     */
    hideToggle(id, action) {
        this._imageService.hide(this.token, id, action).subscribe(
            response => {
                console.log(response);
                if (response.status == "success") {
                    this._commonService.displayNotification(this, response.status);
                    this.hidden = true;
                    setTimeout(() => { this._router.navigate(['home']); }, 3000);
                }
            },
            error => {
                console.log(error);
            }
        );
    }


    navigate(tag) {
        this._router.navigateByUrl("/search?q=tag:" + tag)
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
        let elements = document.querySelectorAll('.user-at');
        // that.image.description.querySelector('[data-link]').addEventListener('click', ));
        // console.log(elements);

        elements.forEach((element) => {
            element.addEventListener('click', () => {
                this._commonService.redirectToProfile(element.getAttribute("data-link"));
            });
        });
    }

    checkText(event) {
        this.addComment = event.target.value;
        this.parent = this.addComment ? this.parent : null;
        // console.log(this.parent);
    }


    updateCounter(event, that, action) {
        this.getInteractionsInfo(that);
    }

    getInteractionsInfo(that) {
        that._imageService.getInteractionsCount(that.imageId, that.identity.sub).subscribe(
            response => {
                // console.log(response);
                this.nLikes = response.likes;
                this.nFavs = response.favs;
                this.nShares = response.shares;

                that.iCntError = 0;
            },
            error => {
                console.log(error);
                console.log("Ero..." + " attempt: " + that.iCntError);
                if (that.iCntError < 5) {
                    that.getInteractionsInfo(that);
                    that.iCntError++;
                }
            }
        );
    }

    getMoreImages() {
        this._route.params.subscribe(params => {
            if (localStorage.getItem("config") != null || localStorage.getItem("config") != undefined) {
                this.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                this.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;
            }

            if (this.username != this.identity.nick) {
                this._imageService.showAllImages(this, 1, this.nsfw, this.epilepsy, this.username, false, "getMoreImages");
            }

            else {
                this._imageService.showAllImages(this, 1, "true", "true", this.username, false, "getMoreImages");
            }
        });
    }

    getRatio(img) {
        img = document.getElementById(img);
        // console.log(img.clientWidth, img.clientHeight);

        if (img.clientWidth > img.clientHeight) {
            img.classList.add("aspect-width");
        }
        else {
            img.classList.add("aspect-height");
        }
    }

    prop(el){
        jQuery(el).modal("show");
    }

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Image",
                    imageHidden: "This image has been disabled due to infringement of rules. If you think this is a mistake, please contact with a moderator.",
                    imageDeleted: "Image deleted successfully. You will be redirected soon.",
                    commentAdded: "Comment added.",
                    description: "Description",
                    noDescription: "User didn't add a description.",
                    rights: "Rights",
                    total: "All",
                    partial: "Partial",
                    none: "None",
                    tags: "Tags",
                    by: "by",
                    moreBy: "More by",
                    uploaded: "Upload date",
                    comments: "Comments",
                    addComment: "COMMENT",
                    show: "Show",
                    reply: "Reply",
                    delete: "Delete",
                    remove: "Delete",
                    hide: "Hide",
                    unban: "Unban",
                    report: "Report",
                    edit: "Edit",
                    cancel: "Cancel",
                    the: "",
                    ago: " ago",
                    newComment: "Add a new comment...",
                    deletedComment: "This comment was deleted.",
                    deleteModalTitle: "Delete image?",
                    deleteModalBody: "The image will be deleted permanently.",
                    hideModalTitle: "Hide image?",
                    hideModalBody: "The image won't show up again.",
                    showModalTitle: "Unban image?",
                    showModalBody: "The image will be shown again.",
                    deleteCommentModalTitle: "Delete comment?",
                    deleteCommentModalBody: "The comment will be deleted permanently.",
                    imageAlert1: "This image may contain",
                    imageAlert2: " sensitive elements",
                    imageAlert3: " | ",
                    imageAlert4: " elements that cause epilepsy",
                    imageAlert5: "."
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Imagen",
                    imageHidden: "La imagen ha sido deshabilitada porque inflingía las normas. Si crees que esto es un error, por favor contacta con un moderador.",
                    imageDeleted: "La imagen se ha borrado correctamente. Se te redirigirá en seguida.",
                    commentAdded: "Comentario añadido.",
                    description: "Descripción",
                    noDescription: "El usuario no ha agregado ninguna descripción.",
                    rights: "Derechos",
                    total: "Totales",
                    partial: "Parciales",
                    none: "Ninguno",
                    tags: "Tags",
                    by: "por",
                    moreBy: "Más de",
                    uploaded: "Fecha de subida",
                    comments: "Comentarios",
                    addComment: "COMENTAR",
                    show: "Mostrar",
                    reply: "Responder",
                    delete: "Eliminar",
                    remove: "Borrar",
                    hide: "Ocultar",
                    unban: "Desbanear",
                    report: "Reportar",
                    edit: "Editar",
                    cancel: "Cancelar",
                    the: "",
                    ago: " ago",
                    newComment: "Añadir nuevo comentario...",
                    deletedComment: "Este comentario fue borrado.",
                    deleteModalTitle: "¿Borrar imagen?",
                    deleteModalBody: "La imagen se borrará permanentemente.",
                    hideModalTitle: "¿Ocultar imagen?",
                    hideModalBody: "La imagen ya no se mostrará.",
                    showModalTitle: "¿Desbanear imagen?",
                    showModalBody: "La imagen se mostrará de nuevo.",
                    deleteCommentModalTitle: "¿Borrar comentario?",
                    deleteCommentModalBody: "El comentario se borrará permanentemente.",
                    imageAlert1: "Esta imagen puede contener elementos",
                    imageAlert2: " sensibles",
                    imageAlert3: " | ",
                    imageAlert4: " que causen epilepsia",
                    imageAlert5: "."
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}