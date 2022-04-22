import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";
import { Identity } from "../types/user";

@Injectable()
export class UserService {
    public apiURL: string;
    public identity: Identity;
    public token: string;
    public isFwError: number;

    constructor(public _http: HttpClient) {
        this.apiURL = global.apiURL;
        this.isFwError = 0;
    }

    register(user): Observable<any> {
        const url = `${this.apiURL}/register`;
        const json = JSON.stringify(user);
        const params = `json=${json}`;

        const headers = new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        return this._http.post(url, params, { headers });
    }

    signup(user, getToken = null): Observable<any> {
        const url = `${this.apiURL}/login`;
        const json = JSON.stringify({ ...user, getToken: !!getToken });
        const params = `json=${json}`;

        const headers = new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        return this._http.post(url, params, { headers });
    }

    update(token, user): Observable<any> {
        const url = `${this.apiURL}/user/update_user`;
        const json = JSON.stringify(user);
        const params = `json=${json}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.put(url, params, { headers });
    }

    checkPass(token, password): Observable<any> {
        const url = `${this.apiURL}/user/check_password`;
        const json = JSON.stringify(password);
        const params = `json=${json}`;

        let headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.post(url, params, { headers });
    }

    getIdentity() {
        return (
            JSON.parse(localStorage.getItem("identity")) || {
                id: 0,
                nick: "guest",
                role: "role_guest",
            }
        );
    }

    getToken() {
        return localStorage.getItem("token") || null;
    }

    setToken(token) {
        this.token = token;
    }

    setIdentity(identity) {
        this.identity = identity;
    }

    setConfig(data): Observable<any> {
        const url = `${this.apiURL}/user/update_config`;
        const params = `json=${data}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", this.getToken());

        return this._http.put(url, params, { headers });
    }

    getConfig(): Observable<any> {
        const url = `${this.apiURL}/user/get_config`;

        let headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", this.getToken());

        return this._http.get(url, { headers });
    }

    getUserByNick(nick): Observable<any> {
        const url = `${this.apiURL}/user/get_user?nick=${nick}`;
        return this._http.get(url);
    }

    userInfo(that, nick) {}

    getIsFollowing(token, nick): Observable<any> {
        const url = `${this.apiURL}/user/get-follow?nick=${nick}`;
        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.get(url, { headers });
    }

    follow(token, userToFollow): Observable<any> {
        const url = `${this.apiURL}/user/follow-unfollow`;
        const params = `nick=${userToFollow}`;

        const headers = new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded")
            .set("Authorization", token);

        return this._http.post(url, params, { headers });
    }

    getUserFollows(id): Observable<any> {
        const url = `${this.apiURL}/user/get-user-follows?id=${id}`;

        return this._http.get(url);
    }

    checkFollowing(that, name = '', userclass = "") {
        let unique = true;
        let selector;

        // console.log(that.username);

        if (name !== '') {
            that.username = name;
            unique = false;
            selector = "button[name=" + userclass + "]";
        }

        if (
            that.username != that.identity.nick &&
            that.identity.nick != "guest"
        ) {
            that.isOwner = false;

            that._userService
                .getIsFollowing(that.token, that.username)
                .subscribe(
                    (response) => {
                        if (response.status == "success") {
                            that.isFollowing = response.following;

                            if (that.isFollowing == true) {
                                if (unique == true) {
                                    that.render.removeClass(
                                        document.querySelector(
                                            ".button-follow"
                                        ),
                                        "no-follow"
                                    );
                                    that.render.addClass(
                                        document.querySelector(
                                            ".button-follow"
                                        ),
                                        "follow"
                                    );
                                } else {
                                    let query =
                                        document.querySelectorAll(selector);

                                    for (let i = 0; i < query.length; i++) {
                                        that.render.removeClass(
                                            query[i],
                                            "no-follow"
                                        );
                                        that.render.addClass(
                                            query[i],
                                            "follow"
                                        );
                                    }
                                    // that.render.removeClass(document.querySelectorAll(selector), "no-follow");
                                    // that.render.addClass(document.querySelectorAll(selector), "follow");
                                }
                            } else {
                                if (unique == true) {
                                    that.render.addClass(
                                        document.querySelector(
                                            ".button-follow"
                                        ),
                                        "no-follow"
                                    );
                                    that.render.removeClass(
                                        document.querySelector(
                                            ".button-follow"
                                        ),
                                        "follow"
                                    );
                                } else {
                                    let query =
                                        document.querySelectorAll(selector);

                                    for (let i = 0; i < query.length; i++) {
                                        that.render.addClass(
                                            query[i],
                                            "no-follow"
                                        );
                                        that.render.removeClass(
                                            query[i],
                                            "follow"
                                        );
                                    }
                                    // that.render.addClass(document.querySelectorAll(selector), "no-follow");
                                    // that.render.removeClass(document.querySelectorAll(selector), "follow");
                                }
                            }
                        }
                        this.isFwError = 0;
                    },
                    (error) => {
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
