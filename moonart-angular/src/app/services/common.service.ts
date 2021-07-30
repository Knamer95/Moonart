import { Component, Injectable, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { UserService } from '../services/user.service';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable()
export class CommonService {

    public url: string;
    public identity: any;
    public token: string;
    public confError: number;
    public setCError: number;
    public lastURL: string = 'not defined';
    public events: Array<any> = [];

    constructor(
        public _http: HttpClient,
        private _userService: UserService,
        private _router: Router,
        private render: Renderer2
    ) {
        this.url = global.url;
        this.confError = 0;
        this.setCError = 0;

        // https://stackoverflow.com/questions/41038970/how-to-determine-previous-page-url-in-angular
        this._router.events
            .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
            .subscribe((events: RoutesRecognized[]) => {
                // console.log('previous url', events[0].urlAfterRedirects);
                // console.log('current url', events[1].urlAfterRedirects);

                if (events[0].urlAfterRedirects !== events[1].urlAfterRedirects) { // We make sure to not add to the history the same webpage if it's reloaded
                    this.lastURL = events[0].urlAfterRedirects || 'not defined';
                    localStorage.setItem("lastURL", this.lastURL);
                }
            });
    }

    getLastUrl() {
        return localStorage.getItem("lastURL");
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
                                navBarAlwaysOnTop: true, // Change once it's implemented
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
                                navBarAlwaysOnTop: true,
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
                navBarAlwaysOnTop: true,
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
                        navBarAlwaysOnTop: true, // Change once it's implemented
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
            this.render.setAttribute(document.querySelector(".nav-container"), "data-navbar", "navbar-night");
        }
        else {
            this.render.setAttribute(document.querySelector(".container-ma"), "data-container", array[0]);
            this.render.setAttribute(document.body, "data-mode", array[2]);
            this.render.setAttribute(document.querySelector(".nav-container"), "data-navbar", "navbar-day");
        }
    }

    changeLangAttr(lang) {
        let array = ["en", "es"];

        if (!(lang > 0 && lang <= array.length))
            lang = 1;

        this.render.setAttribute(document.querySelector(".container-ma"), "data-language", array[(lang - 1)]);
    }

    /*
     *
     * Basic function to prevent script injection
     * 
     */
    noscript(string) {
        // string = string.replace(/\<script\>/g, "Not today..."); // Avoid script injection
        // string = string.replace(/\<\/script\>/g, "... but good try."); // on DB

        if (string.indexOf("\<") !== -1 || string.indexOf("\>") !== -1)
            string = string.replace(/\</g, "{{lt;}}").replace(/\>/g, "{{gt;}}");
        else
            string = string.replace(/{{lt;}}/g, "&lt;").replace(/\</g, "&lt;").replace(/{{gt;}}/g, "&gt;").replace(/\>/g, "&gt;");

        return string;
    }

    /*
     *
     * Function to add the link to the @ users. Should look up at Angular sanitization
     * 
     */
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

    /*
     *
     * Function to redirect to a profile of an user that has been inserted as plain text (a comment mentioning an user for example) 
     * 
     */
    redirectToProfile(event) {
        const link = event.target.getAttribute('data-link');

        if (link)
            this._router.navigateByUrl("/profile/" + link)
    }

    /*
     *
     * Function to format the date. Depending on the type, it will return different types:
     *  - Timestamp: Returns a full timestamp of the picture
     *  - Lapsed: Returns the lapsed time between the date and now
     * 
     */

    dateFormat(that, lang, type) {

        let str = that;
        let secondsStr: any, minutesStr: any, hoursStr: any, daysStr: any, weeksStr: any, yearsStr: any;

        if (Date.parse(that) > 0) {
            let mydate = new Date(that);

            if (type === "timestamp") {

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

            } else {
                // Alternative to display seconds, minutes, days, weeks

                let now = new Date;

                // Get total seconds between the times
                var delta = Math.abs(mydate.getTime() - now.getTime()) / 1000;
                delta = delta > 0 ? delta : 0;  // Added so it won't show negative dates (if server clock is delayed, that could happen)
                // An alternative would be getting the current server date too

                var seconds = Math.floor(delta);
                secondsStr = seconds + " " + (seconds === 1 ? "second" : "seconds");

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
        }
        return str;
    }

    /* 
     *
     * Function to display popups. The alert element has a transition of 0.5 seconds, which is what makes opacity changes look like a fadein-fadeout
     * Important that if it redirects, that the timeout until redirection is bigger than the one stated here (2000ms), so this timeout runs.
     * 
     * Otherwise, it won't do the animation anymore... could look for different approaches too if this turns out to be inconvenient :)
     * 
     */
    displayNotification(message, permanent, arr, ref = null, resolve = null) {

        const alertType = permanent ? `.alert-permanent` : `.alert[data-ref='${ref}']`;
        let alert;

        setTimeout(function () {
            alert = <HTMLElement>document.querySelectorAll(`${alertType}`)[0];
            alert.innerHTML = message;
            alert.style.opacity = "1";
        }, 0, alert);

        if (!permanent) {
            console.log(permanent);

            var timeout;

            timeout = setTimeout(function () {
                try {
                    alert.style.opacity = "0";

                    setTimeout(function () {
                        const response = {
                            arr: arr,
                            ref: ref
                        }
                        resolve(response);
                    }, 500, alert); // Once the opacity animation has ended, we clear its value.
                }
                catch (err) {
                }
            }, 3000, alert);
        }
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