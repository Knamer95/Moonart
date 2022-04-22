import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { ImageComponent } from '../components/image/image.component';
import { Observable } from "rxjs";
import { Image } from "../models/image";
import { global } from "./global";

@Injectable()
export class ImageService {
    public apiURL: string;
    public chckError: number;

    constructor(public _http: HttpClient) {
        this.apiURL = global.apiURL;
        this.chckError = 0;
    }

    upload(token, image): Observable<any> {
        const url = `${this.apiURL}/image/new`;
        const json = JSON.stringify(image);
        const params = `json=${json}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);
        // .set('Access-Control-Allow-Origin', '*')
        // .set('Access-Control-Request-Headers', '*');

        return this._http.post(url, params, { headers });
    }

    getImages(token): Observable<any> {
        const url = `${this.apiURL}/image/list`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.get(url, { headers });
    }

    getAllImages(
        page,
        nsfw,
        epilepsy,
        user,
        isProfileUser = false
    ): Observable<any> {
        const url = `${this.apiURL}/image/list/all?page=${
            page || 1
        }&nsfw=${nsfw}&epilepsy=${epilepsy}&user=${user}&isProfileUser=${isProfileUser}`;

        return this._http.get(url);
    }

    getSearchImages(
        page,
        nsfw,
        epilepsy,
        querySelector,
        search
    ): Observable<any> {
        const url = `${this.apiURL}/image/image/search?page=${
            page || 1
        } &nsfw=${nsfw}&epilepsy=${epilepsy}&querySelector=${querySelector}&search=${search}`;

        return this._http.get(url);
    }

    getProfileImages(
        page,
        nsfw,
        epilepsy,
        user_id,
        interaction,
        user = ""
    ): Observable<any> {
        const url = `${this.apiURL}/image/image/faved?page=${
            page || 1
        } &nsfw=${nsfw}&epilepsy=${epilepsy}&user_id=${user_id}&interaction=${interaction}&user=${user}`;

        return this._http.get(url);
    }

    getImage(id): Observable<any> {
        const url = `${this.apiURL}/image/details?id=${id}`;

        return this._http.get(url);
    }

    update(token, image, id): Observable<any> {
        const url = `${this.apiURL}/image/update-image/id=${id}`;
        const json = JSON.stringify(image);
        const params = `json=${json}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.put(url, params, { headers });
    }

    delete(token, id): Observable<any> {
        const url = `${this.apiURL}/image/remove/${id}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.delete(url, { headers });
    }

    hide(token, id, action): Observable<any> {
        const url = `${this.apiURL}/image/hide/${id}`;
        const params = `action=${action}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.put(url, params, { headers }); // If there aren't 3 args, headers is passed as param
    }

    // Remove once image doesn't depend on this
    checkInteractions(token, data): Observable<any> {
        const url = `${this.apiURL}/image/check_interactions`;
        const json = JSON.stringify(data);
        const params = `json=${json}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.post(url, params, { headers });
    }

    interact(token, data): Observable<any> {
        const url = `${this.apiURL}/image/${
            data.method === "PUT" ? "update_interaction" : "create_interaction"
        }`;
        const json = JSON.stringify(data);
        const params = `json=${json}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        console.log('interactData', json);
        console.log('url', url);
        console.log('data.method.toLowerCase()', data.method.toLowerCase());

        return this._http[data.method.toLowerCase()](url, params, { headers });
    }

    getComments(imageId): Observable<any> {
        const url = `${this.apiURL}/image/get-comments?imageId=${imageId}`;

        return this._http.get(url);
    }

    addComment(token, json): Observable<any> {
        const url = `${this.apiURL}/image/add-comment`;
        const params = `json=${json}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.post(url, params, { headers });
    }

    deleteComment(token, id): Observable<any> {
        const url = `${this.apiURL}/image/comment/remove/${id}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.delete(url, { headers });
    }

    getShared(token, index, quantity, nsfw, epilepsy): Observable<any> {
        const url = `${this.apiURL}/user/feed?index=${index}&qt=${quantity}&nsfw=${nsfw}&epilepsy=${epilepsy}`;

        let headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.get(url, { headers });
    }

    getInteractionsCount(id, user): Observable<any> {
        const url = `${this.apiURL}/image/interactions?id=${id}&user=${user}`;

        return this._http.get(url);
    }

    /*
     *
     * Common functions to multiple components
     * Depending on the attributes nsfw and epilepsy (user config), it will display them or not.
     * If it's an user profile, it will show their images. An user can see their own sensitive pictures, no matter their config
     *
     * Depending on if it's scroll or not, it will add it to an existing array or a new one
     *
     */
    showAllImages(that, page, isScroll, check, resolve) {
        let isProfileUser =
            typeof that.isProfileUser !== "undefined"
                ? that.isProfileUser
                : null;
        let user = typeof that.username !== "undefined" ? that.username : null;
        this.getAllImages(
            page,
            that.config.nsfw,
            that.config.epilepsy,
            user,
            isProfileUser
        ).subscribe(
            (response) => {
                console.log(response);
                if (typeof that.hasElements !== "undefined")
                    that.hasElements =
                        response.images.length > 0 || page > 1 ? true : false; // There should never be a totalSize equal to 0 after scrolling, since it returns isLast

                if (!isScroll) {
                    that.images = response.images;

                    var numberPages = [];
                    for (let i = 1; i <= response.total_pages; i++) {
                        numberPages.push(i);
                    }

                    that.numberPages = numberPages;
                    that.totalPages = response.total_pages;
                    if (page >= 2) {
                        that.prevPage = page - 1;
                    } else {
                        that.prevPage = 1;
                    }

                    if (page < response.total_pages) {
                        that.nextPage = page + 1;
                    } else {
                        that.nextPage = response.total_pages;
                    }
                } else {
                    for (let i = 0; i < response.images.length; i++) {
                        that.images.push(response.images[i]);
                    }

                    that.loaded = true;
                    that.isLast =
                        that.images.length == response.total_items
                            ? true
                            : false;
                }

                if (check) {
                    this.getInteractions(that);
                }

                that.imagError = 0;

                if (resolve) {
                    resolve();
                }
            },
            (error) => {
                console.log("getAllImages()");
                console.log("Ero..." + " attempt: " + that.imagError);
                if (that.imagError < 5) {
                    this.showAllImages(that, page, isScroll, check, resolve);
                    that.imagError++;
                }
            }
        );
    }

    showImageSearch(that, page, nsfw, epilepsy, querySelector, search) {
        this.getSearchImages(
            page,
            nsfw,
            epilepsy,
            querySelector,
            search
        ).subscribe(
            (response) => {
                console.log(response);

                if (!that.scroll) {
                    that.images = response.images;

                    var numberPages = [];
                    for (let i = 1; i <= response.total_pages; i++) {
                        numberPages.push(i);
                    }

                    that.numberPages = numberPages;
                    that.totalPages = response.total_pages;
                    if (page >= 2) {
                        that.prevPage = page - 1;
                    } else {
                        that.prevPage = 1;
                    }

                    if (page < response.total_pages) {
                        that.nextPage = page + 1;
                    } else {
                        that.nextPage = response.total_pages;
                    }
                } else {
                    for (let i = 0; i < response.images.length; i++) {
                        that.images.push(response.images[i]);
                    }

                    that.loaded = true;
                    that.isLast =
                        that.images.length == response.total_items
                            ? true
                            : false;
                }

                this.getInteractions(that);
                that.searError = 0;
            },
            (error) => {
                console.log("getSearchImages()");
                console.log("Ero..." + " attempt: " + that.searError);
                if (that.searError < 5) {
                    this.showImageSearch(
                        that,
                        page,
                        nsfw,
                        epilepsy,
                        querySelector,
                        search
                    );
                    that.searError++;
                }
            }
        );
    }

    showProfileInteractions(that, page) {
        this.getProfileImages(
            page,
            that.nsfw,
            that.epilepsy,
            that.id,
            that.interaction,
            that.username
        ).subscribe(
            (response) => {
                console.log(response);

                if (!that.scroll) {
                    that.images = response.images;

                    var numberPages = [];
                    for (let i = 1; i <= response.total_pages; i++) {
                        numberPages.push(i);
                    }

                    that.numberPages = numberPages;
                    that.totalPages = response.total_pages;
                    if (page >= 2) {
                        that.prevPage = page - 1;
                    } else {
                        that.prevPage = 1;
                    }

                    if (page < response.total_pages) {
                        that.nextPage = page + 1;
                    } else {
                        that.nextPage = response.total_pages;
                    }
                } else {
                    for (let i = 0; i < response.images.length; i++) {
                        that.images.push(response.images[i]);
                    }

                    that.loaded = true;
                    that.isLast =
                        that.images.length == response.total_items
                            ? true
                            : false;
                }

                this.getInteractions(that);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getInteractions(that, unique = false, env = null) {
        // Called by , showAllFavs... 'that' is 'this' of the element that calls it
        // (home.component, images.component...)
        if (that.identity != null && that.identity.nick != "guest") {
            var less: boolean = false;
            var intImages: any;

            // console.log(that.images.length);
            if (unique) {
                intImages = that.image;
                intImages.length = 1;
                // console.log(that.image);
            } else {
                intImages = that.images;
            }

            for (let i = 0; i < intImages.length; i++) {
                var checkLoader = function checkLoader(
                    those,
                    i,
                    chckError = 0
                ) {
                    var imageId, selector;

                    if (unique) {
                        imageId = intImages.id;
                        selector = ".image-actions";
                    } else {
                        imageId = intImages[i][0].id;
                        selector = "#id-" + imageId;
                    }

                    var data = {
                        user_id: that.identity.sub,
                        image_id: imageId,
                        action: "",
                        method: "",
                    };

                    that._imageService
                        .checkInteractions(that.token, data)
                        .subscribe(
                            (response) => {
                                // console.log(response);
                                chckError = 0;

                                if (document.querySelector(selector)) {
                                    if (response.liked) {
                                        that.render.addClass(
                                            document
                                                .querySelector(selector)
                                                .parentElement.parentElement.querySelector(
                                                    ".image-heart"
                                                ),
                                            "image-liked"
                                        );
                                    }
                                    if (response.faved) {
                                        that.render.addClass(
                                            document
                                                .querySelector(selector)
                                                .parentElement.parentElement.querySelector(
                                                    ".image-star"
                                                ),
                                            "image-faved"
                                        );
                                    }
                                    if (response.shared) {
                                        that.render.addClass(
                                            document
                                                .querySelector(selector)
                                                .parentElement.parentElement.querySelector(
                                                    ".image-arrows"
                                                ),
                                            "image-shared"
                                        );
                                    }
                                } else if (env === "imageComponent") {
                                    if (response.liked) {
                                        that.render.setAttribute(
                                            document.querySelector(
                                                ".like-container"
                                            ),
                                            "data-status",
                                            "1"
                                        );
                                        document.querySelector(
                                            ".like-container span"
                                        ).textContent = "LIKED";
                                        document
                                            .querySelector(".like-container i")
                                            .classList.remove("far");
                                        document
                                            .querySelector(".like-container i")
                                            .classList.add("fas");
                                    } else {
                                        that.render.setAttribute(
                                            document.querySelector(
                                                ".like-container"
                                            ),
                                            "data-status",
                                            "0"
                                        );
                                        document.querySelector(
                                            ".like-container span"
                                        ).textContent = "LIKE";
                                        document
                                            .querySelector(".like-container i")
                                            .classList.remove("fas");
                                        document
                                            .querySelector(".like-container i")
                                            .classList.add("far");
                                    }
                                    if (response.faved) {
                                        that.render.setAttribute(
                                            document.querySelector(
                                                ".fav-container"
                                            ),
                                            "data-status",
                                            "1"
                                        );
                                        document.querySelector(
                                            ".fav-container span"
                                        ).textContent = "ADDED TO FAVOURITES";
                                        document
                                            .querySelector(".fav-container i")
                                            .classList.remove("far");
                                        document
                                            .querySelector(".fav-container i")
                                            .classList.add("fas");
                                    } else {
                                        that.render.setAttribute(
                                            document.querySelector(
                                                ".fav-container"
                                            ),
                                            "data-status",
                                            "0"
                                        );
                                        document.querySelector(
                                            ".fav-container span"
                                        ).textContent = "ADD TO FAVOURITES";
                                        document
                                            .querySelector(".fav-container i")
                                            .classList.remove("fas");
                                        document
                                            .querySelector(".fav-container i")
                                            .classList.add("far");
                                    }
                                    if (response.shared) {
                                        that.render.setAttribute(
                                            document.querySelector(
                                                ".share-container"
                                            ),
                                            "data-status",
                                            "1"
                                        );
                                        document.querySelector(
                                            ".share-container span"
                                        ).textContent = "SHARED";
                                    } else {
                                        that.render.setAttribute(
                                            document.querySelector(
                                                ".share-container"
                                            ),
                                            "data-status",
                                            "0"
                                        );
                                        document.querySelector(
                                            ".share-container span"
                                        ).textContent = "SHARE";
                                    }
                                } else if (env === "feedComponent") {
                                    if (response.liked) {
                                        that.render.setAttribute(
                                            document.querySelector(".fa-heart"),
                                            "data-status",
                                            "1"
                                        );
                                    } else {
                                        that.render.setAttribute(
                                            document.querySelector(".fa-heart"),
                                            "data-status",
                                            "0"
                                        );
                                    }
                                    if (response.faved) {
                                        that.render.setAttribute(
                                            document.querySelector(".fa-star"),
                                            "data-status",
                                            "1"
                                        );
                                    } else {
                                        that.render.setAttribute(
                                            document.querySelector(".fa-star"),
                                            "data-status",
                                            "0"
                                        );
                                    }
                                    if (response.shared) {
                                        that.render.setAttribute(
                                            document.querySelector(
                                                ".fa-retweet"
                                            ),
                                            "data-status",
                                            "1"
                                        );
                                    } else {
                                        that.render.setAttribute(
                                            document.querySelector(
                                                ".fa-retweet"
                                            ),
                                            "data-status",
                                            "0"
                                        );
                                    }
                                }

                                var hasBeen = false;

                                if (
                                    response.liked != null ||
                                    response.faved != null ||
                                    response.shared != null
                                ) {
                                    hasBeen = true;
                                } else {
                                    hasBeen = false;
                                }

                                if (
                                    (response.liked == null ||
                                        response.faved == null ||
                                        response.shared == null) &&
                                    hasBeen
                                ) {
                                    checkLoader(that, i);
                                }
                            },
                            (error) => {
                                chckError++;

                                if (chckError < 5) {
                                    checkLoader(that, i, chckError);
                                }
                            }
                        );
                };
                checkLoader(this, i);
            }
        }
    }

    // TODO - Pass ID!!
    saveInteraction(
        data, // {id, action}
        callback = null
    ) {
        const { user, image, action } = data;
        // 'unique' is an optional param, that if true, means it's a single image

        // console.log(that);

        const formattedData = {
            user_id: user.sub,
            image_id: image.id,
            action: "",
            method: "",
        };

        this.checkInteractions(user.token, formattedData).subscribe(
            (response) => {
                if (!response.status || response.status != "error") {
                    // console.log(response.isset_interactions);
                    formattedData.action = action;
                    formattedData.method = response.found ? "PUT" : "POST";

                    this.interact(user.token, formattedData).subscribe(
                        (response) => {
                            // console.log(env);
                        },
                        (error) => console.log(error)
                    );
                } else {
                }
            }
        );
    }

    // Methods to apply styles on hover to parents and children, for the interactions bar (gallery and profile)

    in(event, that, value) {
        var newTarget = event.target.parentElement;

        that.render.addClass(
            newTarget.parentElement.parentElement.querySelector(
                ".image-element"
            ),
            "hovered-children"
        );
        that.render.addClass(
            newTarget.parentElement.parentElement.parentElement.querySelector(
                ".image-parent"
            ),
            "hovered-parent"
        );

        if (value == 1) {
            that.render.addClass(
                newTarget.parentElement.parentElement.querySelector(".like"),
                "like-hovered"
            );
        } else if (value == 2) {
            that.render.addClass(
                newTarget.parentElement.parentElement.querySelector(".fav"),
                "fav-hovered"
            );
        } else if (value == 3) {
            that.render.addClass(
                newTarget.parentElement.parentElement.querySelector(".share"),
                "share-hovered"
            );
        }
    }

    out(event, that, value) {
        var newTarget = event.target.parentElement;

        that.render.removeClass(
            newTarget.parentElement.parentElement.querySelector(
                ".image-element"
            ),
            "hovered-children"
        );
        that.render.removeClass(
            newTarget.parentElement.parentElement.parentElement.querySelector(
                ".image-parent"
            ),
            "hovered-parent"
        );

        if (value == 1) {
            that.render.removeClass(
                newTarget.parentElement.parentElement.querySelector(".like"),
                "like-hovered"
            );
        } else if (value == 2) {
            that.render.removeClass(
                newTarget.parentElement.parentElement.querySelector(".fav"),
                "fav-hovered"
            );
        } else if (value == 3) {
            that.render.removeClass(
                newTarget.parentElement.parentElement.querySelector(".share"),
                "share-hovered"
            );
        }
    }
}
