import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService, CommonService, AppComponent]
})
export class LoginComponent implements OnInit {

    public page_title: string;
    public identity;
    public user: User;
    public token: string;
    public status: string;
    public nightMode;
    public arrayNightMode;
    public config;
    public configJSON;
    public isFirst: boolean;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _appComponent: AppComponent,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.page_title = "Identifícate";
        this.user = new User(1, '', '', '', '', '', 'ROLE_USER', '', '');

        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];

    }

    ngOnInit() {

        this.logout();

        if (localStorage.getItem("config") == "undefined" || localStorage.getItem("config") == null) {

            let config = {
                nightMode: 0,
                nsfw: 0,
                epilepsy: 0,
                color: "blue",
                lang: 1,
                share: true,
                feed: 15
            };
            let configJSON = JSON.stringify(config);
            localStorage.setItem("config", configJSON);
        }

        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
    }

    onSubmit(form) {
        this._userService.signup(this.user).subscribe(
            response => {
                if (!response.status || response.status != 'error') {
                    this.status = 'success';
                    this._commonService.displayNotification(this);

                    this.identity = response;

                    // Token
                    this._userService.signup(this.user, true).subscribe(
                        response => {
                            if (!response.status || response.status != 'error') {
                                this.status = 'success';
                                this._commonService.displayNotification(this);

                                this.token = response;

                                this._commonService.getUserConfig(this, this.token);

                                localStorage.setItem('token', this.token);
                                localStorage.setItem('identity', JSON.stringify(this.identity));
                                localStorage.removeItem("config");
                                this.updateDB(this.token);
                                setTimeout(() => { this._router.navigate(['home']); }, 1000);

                            }
                            else {
                                this.status = 'error';
                                this._commonService.displayNotification(this);
                            }
                        },
                        error => {
                            this.status = 'error';
                            this._commonService.displayNotification(this);
                        }
                    );
                    form.reset();
                }
                else {
                    this.status = 'error';
                    this._commonService.displayNotification(this);
                }
            },
            error => {
                this.status = 'error';
                this._commonService.displayNotification(this);
            }
        );
    }

    logout() {
        this._route.params.subscribe(params => {
            let sure = +params['sure'];

            if (sure == 1) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');
                localStorage.removeItem('config');

                this.identity = null;
                this.token = null;

                this._router.navigate(['home']);
            }
        });
    }


    updateDB(token) {
        this._userService.getConfig(token).subscribe(
            response => {
                if (response.status == "error") {

                    this.isFirst = true;
                    this.config = {
                        nightMode: 0,
                        nsfw: 0,
                        epilepsy: 0,
                        color: "blue",
                        lang: 1,
                        share: true,
                        feed: 15
                    }
                    this.configJSON = JSON.stringify(this.config);

                    this._commonService.setUserConfig(this, this.token, this.configJSON);
                }
            },
            error => { }
        );
    }

}
