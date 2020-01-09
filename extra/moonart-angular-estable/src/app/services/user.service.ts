import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public token;
    public nick;
    public role;
    public isFwError;

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
        this.isFwError = 0;
    }

    prueba() {
        return 'Hey';
    }

    register(user): Observable<any> {

        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, getToken = null): Observable<any> {

        if (getToken != null) {
            user.getToken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    update(token, user): Observable<any> {

        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + 'user/update_user', params, { headers: headers });
    }

    checkPass(token, password): Observable<any> {

        let json = JSON.stringify(password);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token); 
            
        return this._http.post(this.url + 'user/check_password', params, { headers: headers });
    }

    getIdentity() {

        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != undefined) {
            this.identity = identity;
            this.nick = identity.nick;
            this.role = identity.role;
        }
        else {
            this.identity = {
                nick: "guest",
                role: "role_guest"
            };
        }
        return this.identity;
    }

    getToken() {

        let token = localStorage.getItem('token');

        if (token && token != undefined) {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    }

    setConfig(token, data): Observable<any> {

        let params = 'json=' + data;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + 'user/update_config', params, { headers: headers });
    }

    getConfig(token): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'user/get_config', { headers: headers });
    }

    getUserByNick(nick): Observable<any> {

        return this._http.get(this.url + 'user/get_user?nick=' + nick);
    }

    userInfo(that, nick) {

    }

    getIsFollowing(token, nick): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.get(this.url + 'user/get-follow?nick=' + nick, { headers: headers });
    }


    follow(token, userToFollow): Observable<any> {

        let params = 'nick=' + userToFollow;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + 'user/follow-unfollow', params, { headers: headers });
    }

    getUserFollows(id): Observable<any> {

        return this._http.get(this.url + 'user/get-user-follows?id=' + id);
    }

    checkFollowing(that, name = false, userclass = "") {

        let unique = true;
        let selector;

        if (name != false) {
            that.username = name;
            unique = false;
            selector = "button[name=" + userclass + "]";
        }

        if (that.username != that.identity.nick && that.identity.nick != 'guest') {
            that.isOwner = false;

            that._userService.getIsFollowing(that.token, that.username).subscribe(
                response => {
                    if (response.status == "success") {

                        that.isFollowing = response.following;

                        if (that.isFollowing == true) {
                            if (unique == true) {
                                that.render.removeClass(document.querySelector(".button-follow"), "no-follow");
                                that.render.addClass(document.querySelector(".button-follow"), "follow");
                            }
                            else {
                                let query = document.querySelectorAll(selector);

                                for (let i = 0; i < query.length; i++) {
                                    that.render.removeClass(query[i], "no-follow");
                                    that.render.addClass(query[i], "follow");
                                }
                                // that.render.removeClass(document.querySelectorAll(selector), "no-follow");
                                // that.render.addClass(document.querySelectorAll(selector), "follow");
                            }
                        }
                        else {
                            if (unique == true) {
                                that.render.addClass(document.querySelector(".button-follow"), "no-follow");
                                that.render.removeClass(document.querySelector(".button-follow"), "follow");
                            }
                            else {
                                let query = document.querySelectorAll(selector);

                                for (let i = 0; i < query.length; i++) {
                                    that.render.addClass(query[i], "no-follow");
                                    that.render.removeClass(query[i], "follow");
                                }
                                // that.render.addClass(document.querySelectorAll(selector), "no-follow");
                                // that.render.removeClass(document.querySelectorAll(selector), "follow");
                            }
                        }
                    }
                },
                error => {
                    console.log("getIsFollowing()");
                    console.log("Ero..." + " attempt: " + this.isFwError);
                    if (this.isFwError < 5) {
                        this.checkFollowing(that);
                        this.isFwError++;
                    }
                }
            );
        }
    }
}