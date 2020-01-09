import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public imageId;
    public nightMode;
    public arrayNightMode;
    public nsfw;
    public epilepsy;
    public username;
    public followStatus;
    public description;
    public isOwner: boolean;
    public isFollowing: boolean;
    public image;
    public images;
    public tags;
    public isTags;
    public role;
    public addComment;
    public comments;
    public commentAdded;
    public deleted;
    public hidden;
    public visible;
    public found: boolean;
    public nLikes: number;
    public nFavs: number;
    public nShares: number;
    public commentToDelete;

    formVar: FormGroup;
    public commError: number;
    public isFwError: number;
    public loadError: number;
    public iCntError: number;


    constructor(
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
        private _route: ActivatedRoute,
        private _router: Router,
        private render: Renderer2,
        private fb: FormBuilder
    ) {
        this.isTags = false;
        this.loadError = 0;         // Para loadImage();
        this.isFwError = 0;         // Para follow();
        this.commError = 0;         // Para getAllComments();
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

    ngOnInit() {

        this.page_title = "Profile";
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
        this.loadUser();
        this.imageId = window.location.href.split("/");
        for (let i = 0; i < this.imageId.length; i++) {
            if (this.imageId[i] == "images" && (i + 1) < this.imageId.length) {
                this.imageId = this.imageId[i + 1];
            }
        }

        if (/^[0-9]*$/.test(this.imageId) == false) {
            this.error();
        }
        this.loadImage(this);

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
        }

        this.formVar = this.fb.group({
            comment: ''
        });

        this.getAllComments(this.imageId);

    }

    loadImage(that) {
        that._imageService.getImage(that.imageId).subscribe(
            response => {
                if (response.status == "success") {
                    this._commonService.displayNotification(this);

                    that.username = response.imagen.user.nick;
                    this._userService.checkFollowing(that);
                    that.image = response.imagen;

                    that.images = that.image;

                    this._imageService.getInteractions(this, true);

                    if (that.image.description != null) {
                        that.image.description = that._commonService.noscript(that.image.description);
                        that.image.description = that._commonService.formatText(that.image.description);
                    }

                    that.image.createdAt = that._commonService.dateFormat(that.image.createdAt);

                    that.image.rights = that.image.rights.charAt(0).toUpperCase() + that.image.rights.slice(1);

                    that.nsfw = JSON.parse(localStorage.getItem("config")).nsfw;
                    that.epilepsy = JSON.parse(localStorage.getItem("config")).epilepsy;

                    if (that.identity.nick != that.image.user.nick && ((that.nsfw == false && that.image.nsfw == true)
                        || (that.epilepsy == false && that.image.epilepsy == true))) {
                        that.visible = false;
                    }

                    if (response.imagen.tags != null) {
                        that.isTags = true;
                        that.tags = response.imagen.tags.trim().split(",");
                        console.log(that.tags[0].charAt(0));
                    }
                }
                else {
                    this.error();
                }
            },
            error => {
                console.log("Ero..." + " attempt: " + that.loadError);
                if (that.loadError < 5) {
                    that.loadImage(that);
                    that.loadError++;
                }
            }
        );

        that._imageService.getInteractionsCount(that.imageId).subscribe(
            response => {
                console.log(response);
                this.nLikes = response.likes;
                this.nFavs = response.favs;
                this.nShares = response.shares;

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


    /*
        Función para la carga del usuario, sus datos y demás.
    */

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // console.log(this.token);
    }


    /*
        Función para comprobar si el usuario que está viendo la imagen sigue al propietario de ésta.
    */

    follow(token, nick) {
        this._userService.follow(token, nick).subscribe(
            response => {
                if (response.status == "success") {
                    this._commonService.displayNotification(this);
                    this._userService.checkFollowing(this);
                }
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
        Función para conseguir todos los comentarios
        Transforma el formato de fecha a uno más legible.
        También sustituye < y > para evitar que se inyecte html, ya que para que los saltos de línea se tengan en cuenta,
        se transforman los \n en <br>, y se inyecta en la etiqueta como html (en image.component.html)
    */

    getAllComments(imageId) {
        this._imageService.getComments(imageId).subscribe(
            response => {
                this.comments = response.comments;
                console.log(this.comments);

                for (let i = 0; i < this.comments.length; i++) { // Dar formato a las fechas
                    
                    this.comments[i].createdAt = this._commonService.dateFormat(this.comments[i].createdAt);
                    this.comments[i].comment = this._commonService.noscript(this.comments[i].comment);
                    this.comments[i].comment = this._commonService.formatText(this.comments[i].comment);

                    // this.comments[i].comment = this.comments[i].comment.replace(/\</g, "◄");
                    // this.comments[i].comment = this.comments[i].comment.replace(/\>/g, "►");
                    // this.comments[i].comment = this.comments[i].comment.replace(/\\n/g, "<br>");
                }
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
        Función onSubmit, para el envío del comentario.
        Para que sean posibles los saltos de línea, coge los caracteres charCode cuyo valor sea 10 (salto de línea),
        ya que en la DB se guardan como simples espacios, y los sustituye por \n.
        Luego se tratan más arriba.
    */

    onSubmit(form) {
        let comment = this.formVar.value.comment;
        for (let i = 0; i < comment.length; i++) {
            if (comment.charCodeAt(i) == 10) {
                comment = comment.substr(0, i) + '\\n' + comment.substr(i + 1);
            }
        }

        comment =  this._commonService.noscript(comment);

        this.formVar.value.comment = comment;

        let data = {
            userId: this.identity.sub,
            imageId: this.imageId,
            comment: this.formVar.value.comment
        }
        let json = JSON.stringify(data);
        this._imageService.addComment(this.token, json).subscribe(
            response => {
                if (response.status == "success") {
                    this._commonService.displayNotification(this);

                    form.reset();
                    /*
                    this.commentAdded = true;
                    setTimeout(function(){
                        this.commentAdded = false;
                    }, 1000); 
                    */
                    this.getAllComments(this.imageId); // Recarga los comentarios, para que se vea el que has añadido sin necesidad de recargar.
                    // console.log(response);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    addName($element, nick, taVal){ // taVal = textarea value (en el html es tarea)
        console.log(this.addComment);
        this.addComment = "@" + nick + " " + taVal;
    }

    doSomething(index: number) {

      }

    /* 
        Función para borrar una imagen. Solo pueden acceder a esta los role_admin, y los propios usuarios que la hayan subido.
        LLama a la función delete del servicio ImageService. Si todo va bien, efectúa la query, y redirige al home.
    */

    delete(id) {
        this._imageService.delete(this.token, id).subscribe(
            response => {
                console.log(response);
                if (response.status == "success") {
                    this._commonService.displayNotification(this);
                    this.deleted = true;
                    setTimeout(() => { this._router.navigate(['home']); }, 1000);
                }
            },
            error => {
                // console.log(error);
            }
        );
    }

    assignDelete(id){
        this.commentToDelete = id;
    }

    deleteComment(id){

        this._imageService.deleteComment(this.token, id).subscribe(
            response => {
                console.log(response);
                if (response.status == "success") {
                    this.ngOnInit();
                    this._commonService.displayNotification(this);
                }
            },
            error => {
                // console.log(error);
            }
        );
    }


    /*  
        Función para ocultar una imagen. Sólo si user_role=="role_mod". Oculta la imagen (Cambia la propiedad status a hidden)
        LLama a la función hide del servicio ImageService. Si todo va bien, efectúa la query, y redirige al home.
        Si es su propia imagen, no puede ocultarla (está en image.component.html), ya que no tendría mucha lógica.
    */

    hideToggle(id, action) {
        this._imageService.hide(this.token, id, action).subscribe(
            response => {
                console.log(response);
                if (response.status == "success") {
                    this._commonService.displayNotification(this);
                    this.hidden = true;
                    setTimeout(() => { this._router.navigate(['home']); }, 1000);
                }
            },
            error => {
                console.log(error);
            }
        );
    }


    updateCounter(event, that, action) {
        // that == this aquí
        let selector;
        if (action == "like") { selector = "liked" }
        else if (action == "fav") { selector = "faved" }
        else { selector = "shared" }

        let check = event.target.parentElement.querySelector(".image-" + selector);

        if (check == null) {
            if (action == "like") { that.nLikes++; }
            else if (action == "fav") { that.nFavs++ }
            else { that.nShares++ }
        }
        else {
            if (action == "like") { that.nLikes--; }
            else if (action == "fav") { that.nFavs-- }
            else { that.nShares-- }
        }
    }

    navigate(tag){
         this._router.navigateByUrl("/search?q=" + tag)
    }

    /*
        Función para parar propagación de eventos.
    */

    doNothing(e) {
        e.stopPropagation();
    }
}
