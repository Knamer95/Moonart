import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'logout-component',
    // templateUrl: './login.component.html',
    // styleUrls: ['./login.component.css'],
    template: ``,
    providers: [UserService, CommonService, AppComponent]
})

export class LogoutComponent implements OnInit {

    public pageTitle: string = "Logout";
    public identity;
    public user: User;
    public checkData: boolean = false; // Flag to disable form while we check if data is correct
    public token: string;
    public status: string;
    public nightMode: boolean;
    public config: any;
    public configJSON: string;
    public isFirst: boolean;
    public showPassword: boolean = false;
    public language: Object;
    public currentLang: any;
    public lang: number;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _appComponent: AppComponent,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.user = new User(1, '', '', '', '', '', 'ROLE_USER', '', '');
    }

    ngOnInit(): void {
        this.logout();
        
        if (localStorage.getItem("config") == "undefined" || localStorage.getItem("config") == null) {

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
            };
            let configJSON = JSON.stringify(config);
            localStorage.setItem("config", configJSON);
        }

        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode);

        this.lang = JSON.parse(localStorage.getItem("config")).lang;;
        this._commonService.changeLangAttr(this.lang);
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
}