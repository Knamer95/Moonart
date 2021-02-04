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
    public identity: any;
    public token: string;
    public confError: number;
    public setCError: number;

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

    getUserConfig(that, token) { // Gets the getConfig returned object (AJAX request from user.service), and stores it
        if (token != null) {
            that._userService.getConfig(token).subscribe(
                response => {
                    if (!response.status || response.status != 'error') {
                        var config;
                        if (response.config != null) {
                            config = {
                                nightMode: response.config.nightMode,
                                scroll: response.config.scroll,
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
                                nightMode: false,
                                scroll: true,
                                nsfw: false,
                                epilepsy: false,
                                color: "zoe",
                                lang: 1,
                                share: true,
                                feed: 15
                            };
                        }
                        let configJSON = JSON.stringify(config);
                        localStorage.setItem('config', configJSON);
                    }
                    else {
                    }
                    this.confError = 0;
                },
                error => {
                    /*
                    It fails but gets stuff done (?) Idk what this means XD
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
                nightMode: false,
                scroll: true,
                nsfw: false,
                epilepsy: false,
                color: "zoe",
                lang: 1,
                share: true,
                feed: 15
            }

            let configJSON = JSON.stringify(config);
            localStorage.setItem('config', configJSON);
        }
    }

    setUserConfig(that, token, data) {
        that._userService.setConfig(token, data).subscribe(
            response => {
                if (!response.status || response.status != 'error') {
                    console.log(response);
                    let config = {
                        nightMode: response.config.nightMode,
                        scroll: response.config.scroll,
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

                this.setCError = 0;
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



    changeNightModeAttr(nightMode) {

        let container = nightMode == true ? "night-container" : "day-container";
        let background = nightMode == true ? "night-bg" : "day-bg";
        let array = ["day-container", "night-container", "day-bg", "night-bg"];

        if (nightMode == true) {
            this.render.setAttribute(document.querySelector(".container-ma"), "data-container", array[1]);
            this.render.setAttribute(document.body, "data-mode", array[3]);
            this.render.setAttribute(document.querySelector(".navbar"), "data-navbar", "navbar-night");
        }
        else {
            this.render.setAttribute(document.querySelector(".container-ma"), "data-container", array[0]);
            this.render.setAttribute(document.body, "data-mode", array[2]);
            this.render.setAttribute(document.querySelector(".navbar"), "data-navbar", "navbar-day");
        }
    }

    changeLangAttr(lang) {
        let array = ["en", "es"];

        if (!(lang > 0 && lang <= array.length))
            lang = 1;

        this.render.setAttribute(document.querySelector(".container-ma"), "data-language", array[(lang - 1)]);
    }

    noscript(string) {
        // string = string.replace(/\<script\>/g, "Not today..."); // Avoid script injection
        // string = string.replace(/\<\/script\>/g, "... but good try."); // on DB

        if (string.indexOf("\<") !== -1 || string.indexOf("\>") !== -1)
            string = string.replace(/\</g, "{{lt;}}").replace(/\>/g, "{{gt;}}");
        else
            string = string.replace(/{{lt;}}/g, "&lt;").replace(/\</g, "&lt;").replace(/{{gt;}}/g, "&gt;").replace(/\>/g, "&gt;");

        return string;
    }

    formatText(str) {
        let index = 0;
        str = str.replace(/\\n/g, "<br>");
        let search = str.indexOf("@", index);
        let at, end;
        let found = false;
        let foundAt = 999;
        let delimiter = [" ", ".", ",", ":", ";"];
        let userName = "";
        let ats = [];
        let cont = 0;

        // str += String.fromCodePoint(parseInt("ud83e", 16));


        while (search != -1) {

            for (let j = 0; j < delimiter.length; j++) {
                end = str.indexOf(delimiter[j], search);
                if (end < foundAt && end != -1) {
                    foundAt = end;
                }
            }
            if (foundAt === 999)
                foundAt = str.length;

            end = foundAt;

            if (end != 999) {
                found = true;
            }

            if (found) { // Won't let me inject without Sanitizer :(
                at = str.slice(search, end);
                ats.push([at, search, end, "<l" + (cont + 1) + ">"]);

                str = str.replace(at, "<l" + (cont + 1) + ">");
            }

            index = end;

            found = false;
            at = 0; end = 0; foundAt = 999;
            search = str.indexOf("@", index);
            cont++;

            if (cont == 100)
                search = -1;
        }

        for (let i = 0; i < ats.length; i++) {

            userName = ats[i][0].replace("@", "");
            // (click)='this._commonService.redirectToProfile(\"" + userName + "\")'
            let url = "<span class='user-at' data-link='" + userName + "'>@" + userName + "</span>";
            // url = "<span ng-reflect-router-link='/profile," + userName + "' href='/profile/" + userName + "'>@" + userName + "</span>";

            str = str.replace(ats[i][3], url);
        }

        // console.log(str);
        return str;
    }

    redirectToProfile(event) {
        const link = event.target.getAttribute('data-link');

        if (link)
            this._router.navigateByUrl("/profile/" + link)
    }

    dateFormat(that, lang) {

        let str = that;
        let secondsStr: any, minutesStr: any, hoursStr: any, daysStr: any, weeksStr: any, yearsStr: any;

        if (Date.parse(that) > 0) {

            let mydate = new Date(that);

            let month = [
                ["January", "Enero"],
                ["February", "Febrero"],
                ["March", "Marzo"],
                ["April", "Abril"],
                ["May", "Mayo"],
                ["June", "Junio"],
                ["July", "Julio"],
                ["August", "Agosto"],
                ["September", "Septiembre"],
                ["October", "Octubre"],
                ["November", "Noviembre"],
                ["December", "Diciembre"]
            ][mydate.getMonth()][lang - 1];

            let engNum = "";

            switch (mydate.getDate()) {
                case 1: case 21: case 31:
                    engNum = "st";
                    break;
                case 2: case 22:
                    engNum = "nd";
                    break;
                case 3: case 23:
                    engNum = "rd";
                    break;
                default:
                    engNum = "th";
                    break;
            }

            if (lang === 1)
                str = mydate.getDate() + engNum + " of " + month + " of " + mydate.getFullYear() + " at " + ("0" + mydate.getHours()).substr(-2) + ":" + ("0" + mydate.getMinutes()).substr(-2);
            else if (lang === 2)
                str = mydate.getDate() + " de " + month + " del " + mydate.getFullYear() + " a las " + ("0" + mydate.getHours()).substr(-2) + ":" + ("0" + mydate.getMinutes()).substr(-2);
            else // Default
                str = mydate.getDate() + engNum + " of " + month + " " + mydate.getFullYear() + " at " + ("0" + mydate.getHours()).substr(-2) + ":" + ("0" + mydate.getMinutes()).substr(-2);

            // Alternative to display seconds, minutes, days, weeks

            let now = new Date;

            // Get total seconds between the times
            var delta = Math.abs(mydate.getTime() - now.getTime()) / 1000;
            delta = delta > 0 ? delta : 0;  // Added so it won't show negative dates (if server clock is delayed, that could happen) 
            // An alternative would be getting the current server date too
            secondsStr = delta + " " + (hours === 1 ? "second" : "seconds");

            var years = Math.floor(delta / (60 * 60 * 24 * 365));
            yearsStr = years + " " + (years === 1 ? "year" : "years");

            var weeks = Math.floor(delta / (60 * 60 * 24 * 7));
            weeksStr = weeks + " " + (weeks === 1 ? "week" : "weeks");

            var days = Math.floor(delta / (60 * 60 * 24));
            daysStr = days + " " + (days === 1 ? "day" : "days");

            // Calculate (and subtract) whole hours
            var hours = Math.floor(delta / (60 * 60));
            hoursStr = hours + " " + (hours === 1 ? "hour" : "hours");

            // Calculate (and subtract) whole minutes
            var minutes = Math.floor(delta / 60);
            minutesStr = minutes + " " + (minutes === 1 ? "minute" : "minutes");

            // What's left is seconds
            // var seconds = delta % 60;  // In theory the modulus is not required
            // console.log(`${days} ${hours} ${minutes} ${delta}`)

            if (delta < 60)
                return secondsStr
            else if (minutes < 60)
                return minutesStr
            else if (hours < 24)
                return hoursStr
            else if (days < 7)
                return daysStr
            else if (weeks < 54)
                return weeksStr
            else
                return yearsStr
        }

        return str;
    }

    displayNotification(e) {
        setTimeout(function () {
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