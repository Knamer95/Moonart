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
    public nightMode: boolean;
    public config: any;
    public configJSON: string;
    public isFirst: boolean;
    public language: Object;
    public currentLang: Object;
    public lang: number;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _appComponent: AppComponent,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.page_title = "Identifícate";
        this.user = new User(1, '', '', '', '', '', 'ROLE_USER', '', '');
    }

    ngOnInit() {

        this.logout();

        if (localStorage.getItem("config") == "undefined" || localStorage.getItem("config") == null) {

            let config = {
                nightMode: 0,
                nsfw: 0,
                epilepsy: 0,
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
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
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
                        color: "zoe",
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

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Login",
                    messageSuccess: "Logged in succesfully. You will be redirected soon.",
                    messageError: "Error while trying to log in. Please try again.",
                    invalidUser: "Invalid user. Please, introduce your nick or email here.",
                    invalidPassword: "Invalid password. Minimum 8 characters. It must contain a capital letter and a number at least.",
                    rememberMe: "Remember me",
                    login: "Log in",
                    placeholderUser: "Nick / Email",
                    placeholderPassword: "Password",
                    forgotPassword: "Forgot password"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Acceso",
                    messageSuccess: "Te has identificado correctamente. Se te redirigirá en seguida.",
                    messageError: "Error al identificarse. Inténtalo de nuevo",
                    invalidUser: "Usuario no válido. Por favor, introduce tu nick o tu email aquí.",
                    invalidPassword: "Contraseña no válida. Mínimo 8 caracteres. Debe contener al menos una letra mayúscula y un número.",
                    rememberMe: "Recordarme",
                    login: "Iniciar sesión",
                    placeholderUser: "Nick / Email",
                    placeholderPassword: "Contraseña",
                    forgotPassword: "Olvidé mi contraseña"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
