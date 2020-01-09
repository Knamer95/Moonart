import { Component, Injectable, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class CommonService {

    public url: string;
    public identity;
    public token;
    public confError;
    public setCError;

    constructor(
        public _http: HttpClient,
        private _userService: UserService,
        private _router: Router,
        private render: Renderer2
    ) {
        this.url = global.url;
        this.confError = 0;
        this.setCError = 0;
    }

    getUserConfig(that, token) { // Coge el objeto de getConfig (petición AJAX de user.service) y lo almacena.
        if (token != null) {
            that._userService.getConfig(token).subscribe(
                response => {
                    if (!response.status || response.status != 'error') {
                        var config;
                        if (response.config != null) {
                            config = {
                                nightMode: response.config.nightMode,
                                nsfw: response.config.nsfw,
                                epilepsy: response.config.epilepsy,
                                lang: response.config.lang,
                                color: response.config.color,
                                share: response.config.share,
                                feed: response.config.feed
                            }
                        }
                        else {
                            config = {
                                nightMode: 0,
                                nsfw: 0,
                                epilepsy: 0,
                                color: "blue",
                                lang: 1,
                                share: 1,
                                feed: 15
                            };
                        }
                        let configJSON = JSON.stringify(config);
                        localStorage.setItem('config', configJSON);
                    }
                    else {
                    }
                },
                error => {
                    /*
                    Falla pero hace las cosas (?)
                    */
                    console.log("getConfig()");
                    console.log("Ero..." + " attempt: " + this.confError);
                    if (this.confError < 5) {
                        this.getUserConfig(that, token);
                        this.confError++;
                    }

                }
            );
        }
        else {
            let config = {
                nightMode: 0,
                nsfw: 0,
                epilepsy: 0,
                color: "blue",
                lang: 1,
                share: 1,
                feed: 15
            }

            let configJSON = JSON.stringify(config);
            localStorage.setItem('config', configJSON);
        }
    }

    setUserConfig(that, token, data) { // Coge el objeto de getConfig (petición AJAX de user.service) y lo almacena.
        that._userService.setConfig(token, data).subscribe(
            response => {
                if (!response.status || response.status != 'error') {
                    console.log(response);
                    let config = {
                        nightMode: response.config.nightMode,
                        nsfw: response.config.nsfw,
                        epilepsy: response.config.epilepsy,
                        lang: response.config.lang,
                        color: response.config.color,
                        share: response.config.share,
                        feed: response.config.feed
                    }

                    let configJSON = JSON.stringify(config);

                    localStorage.setItem('config', configJSON);
                    this.getUserConfig(this, token);
                }
                else {
                }
                // console.log(response);
            },
            error => {
                console.log("setConfig()");
                console.log("Ero..." + " attempt: " + this.setCError);
                if (this.setCError < 5) {
                    this.setUserConfig(that, token, data);
                    this.setCError++;
                }
            }
        );
    }



    changeNightMode(nightMode, array) {

        let container = nightMode == true ? "night-container" : "day-container";
        let background = nightMode == true ? "night-bg" : "day-bg";

        if (nightMode == true) {
            this.render.removeClass(document.querySelector(".container-ma"), array[0]);
            this.render.addClass(document.querySelector(".container-ma"), array[1]);
            this.render.removeClass(document.body, array[2]);
            this.render.addClass(document.body, array[3]);
            this.render.removeClass(document.querySelector(".navbar"), "navbar-day");
            this.render.addClass(document.querySelector(".navbar"), "navbar-night");
        }
        else {
            this.render.addClass(document.querySelector(".container-ma"), array[0]);
            this.render.removeClass(document.querySelector(".container-ma"), array[1]);
            this.render.addClass(document.body, array[2]);
            this.render.removeClass(document.body, array[3]);
            this.render.removeClass(document.querySelector(".navbar"), "navbar-night");
            this.render.addClass(document.querySelector(".navbar"), "navbar-day");
        }
    }

    noscript(string) {
        console.log(string);
        string = string.replace(/\<script\>/g, "Not today..."); // Evitar que se metan scripts
        string = string.replace(/\<\/script\>/g, "... but good try."); // en la db
        string = string.replace(/\</g, "(");
        string = string.replace(/\>/g, ")");

        return string;
    }

    formatText(str) {

        str = str.replace(/\\n/g, "<br>");
        let search = str.search(/@/g);
        let at, end;
        let found = false;
        let foundAt = 999;
        let delimiter = [" ", ".", ",", ":", ";"];

        if (search != -1) {

            for (let j = 0; j < delimiter.length; j++) {
                end = str.indexOf(delimiter[j], search);
                if (end < foundAt && end != -1) {
                    foundAt = end;
                }
            }
            end = foundAt;
            if (end != 999) {
                found = true;
            }

            if (found == true) {
                at = str.slice(search, end);
                str = str.replace(at, "<span class='user-at' (click)='this._commonService.redirectToProfile(at)'>" + at + "</span>");
            }

        }

        return str;
    }

    redirectToProfile(at) {
        this._router.navigateByUrl("/profile" + at)

    }

    dateFormat(that) {

        var str = that;

        if (Date.parse(that) > 0) {

            var mydate = new Date(that);

            var month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][mydate.getMonth()];
            str = mydate.getDate() + " de " + month + " del " + mydate.getFullYear() + " a las " + mydate.getHours() + ":" + mydate.getMinutes();
        }
        return str;
    }

    displayNotification(e){
        setTimeout(function(){
            e.status = "";
        }, 3000);
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // console.log(this.token);
    }
}

/*


    formatText(str) {

        str = str.replace(/\\n/g, "<br>");
        // let search = str.search(/@/g);
        let search;
        let found;
        let delimiter = [" ", ".", ",", ":", ";"];

        for (let i = 0; i < str.length; i++) {
            found = false;
            search = str.charAt(i);
            if (search == "@") {
                found = true;
                let at, end, foundAt = 999;

                for (let j = 0; j < delimiter.length; j++) {
                    end = str.indexOf(delimiter[j], i);
                    if (end < foundAt) {
                        foundAt = end;
                    }
                }

                if (end == -1) {
                    end = str.length;
                }
                at = str.slice(i, end);
                str = str.replace(at, "<span class='user-at' [href]=['/profile'," + at + "]>" + at + "</span>");
                i = end + 1;
            }
        }

        return str;
    }

*/