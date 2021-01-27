import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { global } from './global';

@Injectable()
export class ImageService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    upload(token, image): Observable<any> {

        let json = JSON.stringify(image);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);
        // .set('Access-Control-Allow-Origin', '*')
        // .set('Access-Control-Request-Headers', '*');

        return this._http.post(this.url + 'image/new', params, { headers: headers });
    }

    getImages(token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'image/list', { headers: headers });
    }

    getAllImages(page, nsfw, epilepsy, user = ""): Observable<any> {

        if (!page) {
            page = 1;
        }
        return this._http.get(this.url + 'image/list/all?page=' + page + '&nsfw=' + nsfw + '&epilepsy=' + epilepsy + '&user=' + user);
    }

    getSearchImages(page, nsfw, epilepsy, querySelector, search): Observable<any> {

        if (!page) {
            page = 1;
        }
        return this._http.get(this.url + 'image/search?page=' + page + '&nsfw=' + nsfw + '&epilepsy=' + epilepsy
            + '&querySelector=' + querySelector + '&search=' + search);
    }

    getProfileImages(page, nsfw, epilepsy, user_id, interaction, user = ""): Observable<any> {

        if (!page) {
            page = 1;
        }
        return this._http.get(this.url + 'image/faved?page=' + page + '&nsfw=' + nsfw + '&epilepsy=' + epilepsy
            + '&user_id=' + user_id + '&interaction=' + interaction + '&user=' + user);
    }

    getImage(id): Observable<any> {

        return this._http.get(this.url + 'image/details?id=' + id);
    }

    update(token, image, id): Observable<any> {

        let json = JSON.stringify(image);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + 'image/update-image/' + id, params, { headers: headers });
    }

    delete(token, id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.delete(this.url + 'image/remove/' + id, { headers: headers });
    }

    hide(token, id, action): Observable<any> {

        let params = 'action=' + action;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + 'image/hide/' + id, params, { headers: headers }); // Si no hay 3 args, headers se pasa como parámentro
    }

    checkInteractions(token, data): Observable<any> {

        let json = JSON.stringify(data);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'check', params, { headers: headers });
    }

    interact(token, data, status): Observable<any> {
        let json = JSON.stringify(data);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        if (status == true) {
            return this._http.put(this.url + 'update_interaction', params, { headers: headers });
        }
        else {
            return this._http.post(this.url + 'create_interaction', params, { headers: headers });
        }
    }

    getComments(imageId): Observable<any> {

        return this._http.get(this.url + 'image/get-comments?imageId=' + imageId);
    }

    addComment(token, json): Observable<any> {
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'image/add-comment', params, { headers: headers });
    }

    deleteComment(token, id): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.delete(this.url + 'image/comment/remove/' + id, { headers: headers });
    }

    getShared(token, index, quantity, nsfw, epilepsy): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'user/feed?index=' + index + "&qt=" + quantity + "&nsfw=" + nsfw 
            + "&epilepsy=" + epilepsy, { headers: headers });
    }

    getInteractionsCount(id): Observable<any> {

        return this._http.get(this.url + 'image/interactions?id=' + id);
    }


    // Funciones comunes a varios componentes

    showAllImages(that, page, nsfw, epilepsy, user = null) {
        this.getAllImages(page, nsfw, epilepsy, user).subscribe(
            response => {
                console.log(response);
                that.images = response.images;

                var number_pages = [];
                for (let i = 1; i <= response.total_pages; i++) {
                    number_pages.push(i);
                }

                that.number_pages = number_pages;
                that.total_pages = response.total_pages;
                if (page >= 2) {
                    that.prev_page = page - 1;
                }
                else {
                    that.prev_page = 1;
                }

                if (page < response.total_pages) {
                    that.next_page = page + 1;
                }
                else {
                    that.next_page = response.total_pages;
                }

                this.getInteractions(that);
            },
            error => {
                console.log("getAllImages()");
                console.log("Ero..." + " attempt: " + that.imagError);
                if (that.imagError < 5) {
                    this.showAllImages(that, page, nsfw, epilepsy, user = null);
                    that.imagError++;
                }
            }
        );
    }


    showImageSearch(that, page, nsfw, epilepsy, querySelector, search) {
        this.getSearchImages(page, nsfw, epilepsy, querySelector, search).subscribe(
            response => {
                console.log(response);
                that.images = response.images;

                var number_pages = [];
                for (let i = 1; i <= response.total_pages; i++) {
                    number_pages.push(i);
                }

                that.number_pages = number_pages;
                that.total_pages = response.total_pages;
                if (page >= 2) {
                    that.prev_page = page - 1;
                }
                else {
                    that.prev_page = 1;
                }

                if (page < response.total_pages) {
                    that.next_page = page + 1;
                }
                else {
                    that.next_page = response.total_pages;
                }

                this.getInteractions(that);
            },
            error => {
                console.log("getSearchImages()");
                console.log("Ero..." + " attempt: " + that.searError);
                if (that.searError < 5) {
                    this.showImageSearch(that, page, nsfw, epilepsy, querySelector, search);
                    that.searError++;
                }
            }
        );
    }


    showProfileInteractions(that, page, nsfw, epilepsy, user_id, interaction, user = null) {

        this.getProfileImages(page, nsfw, epilepsy, user_id, interaction, user = "").subscribe(
            response => {
                that.images = response.images;
                console.log(response);

                var number_pages = [];
                for (let i = 1; i <= response.total_pages; i++) {
                    number_pages.push(i);
                }

                that.number_pages = number_pages;
                that.total_pages = response.total_pages;
                if (page >= 2) {
                    that.prev_page = page - 1;
                }
                else {
                    that.prev_page = 1;
                }

                if (page < response.total_pages) {
                    that.next_page = page + 1;
                }
                else {
                    that.next_page = response.total_pages;
                }
                this.getInteractions(that);
            },
            error => {
                console.log(error);
            }
        );
    }

    getInteractions(that, unique = null) {  // Llamado por showAllImages, showAllFavs... Le pasamos that, que es this del elemento que lo llama 
        // (home.component, images.component...) Se encarga de
        if (that.identity != null && that.identity.nick != 'guest') {
            var less = false;

            if (unique == true) {
                that.images.length = 1;
            }

            for (let i = 0; i < that.images.length; i++) {

                var checkLoader = function checkLoader(those, i) {
                    var imageId, selector;

                    if (unique == true) {
                        imageId = that.images.id;
                        selector = ".image-actions";
                    }
                    else {
                        imageId = that.images[i][0].id;
                        selector = "#id-" + imageId;
                    }

                    var data = {
                        user_id: that.identity.sub,
                        image_id: imageId,
                        action: "",
                        method: ""
                    };

                    that._imageService.checkInteractions(that.token, data).subscribe(
                        response => {

                            if (document.querySelector(selector)) {

                                if (response.liked) {
                                    that.render.addClass(document.querySelector(selector).parentElement
                                        .parentElement.querySelector(".image-heart"), "image-liked");
                                }
                                if (response.faved) {
                                    that.render.addClass(document.querySelector(selector).parentElement
                                        .parentElement.querySelector(".image-star"), "image-faved");
                                }
                                if (response.shared) {
                                    that.render.addClass(document.querySelector(selector).parentElement
                                        .parentElement.querySelector(".image-arrows"), "image-shared");
                                }

                                var hasBeen = false;

                                if (response.liked != null || response.faved != null || response.shared != null) {
                                    hasBeen = true;
                                }

                                else {
                                    hasBeen = false;
                                }

                                if ((response.liked == null || response.faved == null || response.shared == null) && hasBeen == true) {
                                    checkLoader(that, i);
                                }
                            }

                        },
                        error => {
                            checkLoader(that, i);
                        }
                    );
                }
                checkLoader(this, i);
            }
        }
    }



    saveInteraction(event, that, action, unique = null) { // 'unique' is an optional boolean param, that if true, means that it's a single image

        var id;
        var estado;
        var selectedImage;

        if (unique == true) {
            selectedImage = document.querySelector(".image");
            selectedImage = selectedImage.src;
            id = that.imageId;

            that.updateCounter(event, that, action);

        }
        else {
            selectedImage = event.target.parentElement.parentElement.querySelector(".image-element").src;
            selectedImage = selectedImage.split("/");
            selectedImage = selectedImage[selectedImage.length - 1];

            for (let i = 0; i < that.images.length; i++) {

                if (that.images[i][0].url == selectedImage) {
                    id = that.images[i][0].id;
                }
            }
        }


        var data = {
            user_id: that.identity.sub,
            image_id: id,
            action: "",
            method: ""
        };

        that._imageService.checkInteractions(that.token, data).subscribe(
            response => {
                if (!response.status || response.status != 'error') {
                    estado = response;
                    // console.log(response.isset_interactions);
                    data.action = action;
                    if (response.found == true) {
                        data.method = "PUT";
                    }
                    else {
                        data.method = "POST";
                    }

                    that._imageService.interact(that.token, data, estado).subscribe(
                        response => {
                            if (response.params.liked) {
                                that.render.addClass(event.target.parentElement.querySelector(".image-heart"), "image-liked");
                            }
                            else {
                                that.render.removeClass(event.target.parentElement.querySelector(".image-heart"), "image-liked");
                            }

                            if (response.params.faved) {
                                that.render.addClass(event.target.parentElement.querySelector(".image-star"), "image-faved");
                            }
                            else {
                                that.render.removeClass(event.target.parentElement.querySelector(".image-star"), "image-faved");
                            }

                            if (response.params.shared) {
                                that.render.addClass(event.target.parentElement.querySelector(".image-arrows"), "image-shared");
                            }
                            else {
                                that.render.removeClass(event.target.parentElement.querySelector(".image-arrows"), "image-shared");
                            }
                        },
                        error => {
                            console.log(error);
                        }
                    );
                }
                else {
                }
            },
            error => {
            }
        );
    }


    // Methods for image hovers (gallery and profile), so parents and children have the right styles

    in(event, that, value) {
        that.render.addClass(event.target.parentElement.parentElement.querySelector(".image-element"), "hovered-children");
        that.render.addClass(event.target.parentElement.parentElement.parentElement.querySelector(".image-parent"), "hovered-parent");

        if (value == 1) {
            that.render.addClass(event.target.parentElement.parentElement.querySelector(".like"), "like-hovered");
        }
        else if (value == 2) {
            that.render.addClass(event.target.parentElement.parentElement.querySelector(".fav"), "fav-hovered");
        }
        else if (value == 3) {
            that.render.addClass(event.target.parentElement.parentElement.querySelector(".share"), "share-hovered");
        }
    }

    out(event, that, value) {
        that.render.removeClass(event.target.parentElement.parentElement.querySelector(".image-element"), "hovered-children");
        that.render.removeClass(event.target.parentElement.parentElement.parentElement.querySelector(".image-parent"), "hovered-parent");

        if (value == 1) {
            that.render.removeClass(event.target.parentElement.parentElement.querySelector(".like"), "like-hovered");
        }
        else if (value == 2) {
            that.render.removeClass(event.target.parentElement.parentElement.querySelector(".fav"), "fav-hovered");
        }
        else if (value == 3) {
            that.render.removeClass(event.target.parentElement.parentElement.querySelector(".share"), "share-hovered");
        }
    }
}