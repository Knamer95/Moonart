import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ImageComponent } from '../components/image/image.component';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { global } from './global';

@Injectable()
export class ImageService {

    public url: string;
    public chckError: number;

    constructor(
        public _http: HttpClient,
    ) {
        this.url = global.url;
        this.chckError = 0;
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

    getAllImages(page, nsfw, epilepsy, user = "", isProfileUser = false): Observable<any> {

        if (!page) {
            page = 1;
        }
        return this._http.get(this.url + 'image/list/all?page=' + page + '&nsfw=' + nsfw + '&epilepsy=' + epilepsy
            + '&user=' + user + '&isProfileUser=' + isProfileUser);
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

        return this._http.put(this.url + 'image/hide/' + id, params, { headers: headers }); // If there aren't 3 args, headers is passed as param
    }

    checkInteractions(token, data): Observable<any> {
        let json = JSON.stringify(data);
        let params = 'json=' + json;
        // console.log(data);

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'check', params, { headers: headers });
    }

    interact(token, data, status): Observable<any> {
        let json = JSON.stringify(data);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        if (status) {
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

    getInteractionsCount(id, user): Observable<any> {

        return this._http.get(this.url + 'image/interactions?id=' + id + '&user=' + user);
    }


    // Common functions to multiple components

    showAllImages(that, page, nsfw, epilepsy, user = null, isProfileUser = false) {
        this.getAllImages(page, nsfw, epilepsy, user, isProfileUser).subscribe(
            response => {
                console.log(response);

                if (!that.scroll) {
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
                }
                else {
                    for (let i = 0; i < response.images.length; i++) {
                        that.images.push(response.images[i]);
                    }

                    that.loaded = true;
                    that.isLast = that.images.length == response.total_items ? true : false;
                }

                // console.log(that.images);
                this.getInteractions(that);

                that.imagError = 0;
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

                if (!that.scroll) {
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
                }
                else {
                    for (let i = 0; i < response.images.length; i++) {
                        that.images.push(response.images[i]);
                    }

                    that.loaded = true;
                    that.isLast = that.images.length == response.total_items ? true : false;
                }

                this.getInteractions(that);
                that.searError = 0;
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
                console.log(response);

                if (!that.scroll) {
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
                }
                else {
                    for (let i = 0; i < response.images.length; i++) {
                        that.images.push(response.images[i]);
                    }

                    that.loaded = true;
                    that.isLast = that.images.length == response.total_items ? true : false;
                }

                this.getInteractions(that);
            },
            error => {
                console.log(error);
            }
        );
    }

    getInteractions(that, unique = null, env = null) {  // Called by showAllImages, showAllFavs... 'that' is 'this' of the element that calls it 
        // (home.component, images.component...)
        if (that.identity != null && that.identity.nick != 'guest') {
            var less: boolean = false;
            var intImages: Array<any>;

            // console.log(that.images.length);
            if (unique) {
                intImages = that.image;
                intImages.length = 1;
                // console.log(that.image);
            }
            else{
                intImages = that.images;
            }

            for (let i = 0; i < intImages.length; i++) {

                var checkLoader = function checkLoader(those, i, chckError = 0) {
                    var imageId, selector;

                    if (unique) {
                        imageId = intImages.id;
                        selector = ".image-actions";
                    }
                    else {
                        imageId = intImages[i][0].id;
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

                            // console.log(response);
                            chckError = 0;

                            if (document.querySelector(selector)) {

                                if (response.liked) {
                                    that.render.addClass(document.querySelector(selector).parentElement.parentElement.querySelector(".image-heart"), "image-liked");
                                }
                                if (response.faved) {
                                    that.render.addClass(document.querySelector(selector).parentElement.parentElement.querySelector(".image-star"), "image-faved");
                                }
                                if (response.shared) {
                                    that.render.addClass(document.querySelector(selector).parentElement.parentElement.querySelector(".image-arrows"), "image-shared");
                                }
                            }
                            else if (env === 'imageComponent') {
                                if (response.liked) {
                                    that.render.setAttribute(document.querySelector(".like-container"), "data-status", "1");
                                    document.querySelector(".like-container span").textContent = "LIKED";
                                    document.querySelector(".like-container i").classList.remove("far");
                                    document.querySelector(".like-container i").classList.add("fas");
                                } else {
                                    that.render.setAttribute(document.querySelector(".like-container"), "data-status", "0");
                                    document.querySelector(".like-container span").textContent = "LIKE";
                                    document.querySelector(".like-container i").classList.remove("fas");
                                    document.querySelector(".like-container i").classList.add("far");
                                }
                                if (response.faved) {
                                    that.render.setAttribute(document.querySelector(".fav-container"), "data-status", "1");
                                    document.querySelector(".fav-container span").textContent = "ADDED TO FAVOURITES";
                                    document.querySelector(".fav-container i").classList.remove("far");
                                    document.querySelector(".fav-container i").classList.add("fas");
                                } else {
                                    that.render.setAttribute(document.querySelector(".fav-container"), "data-status", "0");
                                    document.querySelector(".fav-container span").textContent = "ADD TO FAVOURITES";
                                    document.querySelector(".fav-container i").classList.remove("fas");
                                    document.querySelector(".fav-container i").classList.add("far");
                                }
                                if (response.shared) {
                                    that.render.setAttribute(document.querySelector(".share-container"), "data-status", "1");
                                    document.querySelector(".share-container span").textContent = "SHARED";
                                } else {
                                    that.render.setAttribute(document.querySelector(".share-container"), "data-status", "0");
                                    document.querySelector(".share-container span").textContent = "SHARE";
                                }
                            }
                            else if (env === 'feedComponent') {
                                if (response.liked) {
                                    that.render.setAttribute(document.querySelector(".fa-heart"), "data-status", "1");
                                } else {
                                    that.render.setAttribute(document.querySelector(".fa-heart"), "data-status", "0");
                                }
                                if (response.faved) {
                                    that.render.setAttribute(document.querySelector(".fa-star"), "data-status", "1");
                                } else {
                                    that.render.setAttribute(document.querySelector(".fa-star"), "data-status", "0");
                                }
                                if (response.shared) {
                                    that.render.setAttribute(document.querySelector(".fa-retweet"), "data-status", "1");
                                } else {
                                    that.render.setAttribute(document.querySelector(".fa-retweet"), "data-status", "0");
                                }
                            }

                            var hasBeen = false;

                            if (response.liked != null || response.faved != null || response.shared != null) {
                                hasBeen = true;
                            }

                            else {
                                hasBeen = false;
                            }

                            if ((response.liked == null || response.faved == null || response.shared == null) && hasBeen) {
                                checkLoader(that, i);
                            }

                        },
                        error => {
                            chckError++;

                            if (chckError < 5) {
                                checkLoader(that, i, chckError);
                            }
                        }
                    );
                }
                checkLoader(this, i);
            }
        }
    }



    saveInteraction(event, that, action, unique = null, env = null, callback = null) { // 'unique' is an optional param, that if true, means it's a single image

        var id;
        var estado;
        var selectedImage;

        // console.log(that);
        var newTarget = event.target.parentElement;

        if (unique) {
            selectedImage = document.querySelector(".image");
            selectedImage = selectedImage.src;
            id = that.imageId;
        }
        else {
            selectedImage = newTarget.parentElement.parentElement.querySelector(".image-element").src;
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
                    if (response.found) {
                        data.method = "PUT";
                    }
                    else {
                        data.method = "POST";
                    }

                    that._imageService.interact(that.token, data, estado).subscribe(
                        response => {
                            console.log(env);
                            if (!env) {
                                if (response.params.liked) {
                                    that.render.addClass(newTarget.parentElement.querySelector(".image-heart"), "image-liked");
                                } else {
                                    that.render.removeClass(newTarget.parentElement.querySelector(".image-heart"), "image-liked");
                                }
                                if (response.params.faved) {
                                    that.render.addClass(newTarget.parentElement.querySelector(".image-star"), "image-faved");
                                } else {
                                    that.render.removeClass(newTarget.parentElement.querySelector(".image-star"), "image-faved");
                                }
                                if (response.params.shared) {
                                    that.render.addClass(newTarget.parentElement.querySelector(".image-arrows"), "image-shared");
                                } else {
                                    that.render.removeClass(newTarget.parentElement.querySelector(".image-arrows"), "image-shared");
                                }
                            }
                            else if (env === 'imageComponent') {
                                if (response.params.liked) {
                                    that.render.setAttribute(document.querySelector(".like-container"), "data-status", "1");
                                    document.querySelector(".like-container span").textContent = "LIKED";
                                    document.querySelector(".like-container i").classList.remove("far");
                                    document.querySelector(".like-container i").classList.add("fas");
                                } else {
                                    that.render.setAttribute(document.querySelector(".like-container"), "data-status", "0");
                                    document.querySelector(".like-container span").textContent = "LIKE";
                                    document.querySelector(".like-container i").classList.remove("fas");
                                    document.querySelector(".like-container i").classList.add("far");
                                }
                                if (response.params.faved) {
                                    that.render.setAttribute(document.querySelector(".fav-container"), "data-status", "1");
                                    document.querySelector(".fav-container span").textContent = "ADDED TO FAVOURITES";
                                    document.querySelector(".fav-container i").classList.remove("far");
                                    document.querySelector(".fav-container i").classList.add("fas");
                                } else {
                                    that.render.setAttribute(document.querySelector(".fav-container"), "data-status", "0");
                                    document.querySelector(".fav-container span").textContent = "ADD TO FAVOURITES";
                                    document.querySelector(".fav-container i").classList.remove("fas");
                                    document.querySelector(".fav-container i").classList.add("far");
                                }
                                if (response.params.shared) {
                                    that.render.setAttribute(document.querySelector(".share-container"), "data-status", "1");
                                    document.querySelector(".share-container span").textContent = "SHARED";
                                } else {
                                    that.render.setAttribute(document.querySelector(".share-container"), "data-status", "0");
                                    document.querySelector(".share-container span").textContent = "SHARE";
                                }
                            }

                            if (env) {
                                that.updateCounter(event, that, action);
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


    // Methods to apply styles on hover to parents and children, for the interactions bar (gallery and profile)

    in(event, that, value) {
        var newTarget = event.target.parentElement;

        that.render.addClass(newTarget.parentElement.parentElement.querySelector(".image-element"), "hovered-children");
        that.render.addClass(newTarget.parentElement.parentElement.parentElement.querySelector(".image-parent"), "hovered-parent");


        if (value == 1) {
            that.render.addClass(newTarget.parentElement.parentElement.querySelector(".like"), "like-hovered");
        }
        else if (value == 2) {
            that.render.addClass(newTarget.parentElement.parentElement.querySelector(".fav"), "fav-hovered");
        }
        else if (value == 3) {
            that.render.addClass(newTarget.parentElement.parentElement.querySelector(".share"), "share-hovered");
        }
    }

    out(event, that, value) {
        var newTarget = event.target.parentElement;

        that.render.removeClass(newTarget.parentElement.parentElement.querySelector(".image-element"), "hovered-children");
        that.render.removeClass(newTarget.parentElement.parentElement.parentElement.querySelector(".image-parent"), "hovered-parent");

        if (value == 1) {
            that.render.removeClass(newTarget.parentElement.parentElement.querySelector(".like"), "like-hovered");
        }
        else if (value == 2) {
            that.render.removeClass(newTarget.parentElement.parentElement.querySelector(".fav"), "fav-hovered");
        }
        else if (value == 3) {
            that.render.removeClass(newTarget.parentElement.parentElement.querySelector(".share"), "share-hovered");
        }
    }
}