import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService, CommonService]
})
export class RegisterComponent implements OnInit {

    public page_title: string;
    public user: User;
    public status: string;
    public nightMode: boolean;
    public config: any;
    public configJSON: string;
    public userJSON: string;
    public language: Object;
    public currentLang: Object;
    public lang: number;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService
    ) {
        this.page_title = "Registrarse";
        this.user = new User(1, '', '', '', '', '', 'ROLE_USER', '', '');
    }

    ngOnInit() {

        // if (localStorage.getItem("user") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode);
        // }

        this.lang = JSON.parse(localStorage.getItem("config")).lang;;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    onSubmit(form) {
        if (form.value.password == form.value.password_2) {
            this._userService.register(this.user).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.status = 'success';
                        form.reset();
                    }
                    else {
                        this.status = 'error';
                        this._commonService.displayNotification(this);
                    }
                    console.log(response);
                },
                error => {
                    this.status = 'error';
                    this._commonService.displayNotification(this);
                    console.log(error);
                }
            );
        }
        else {
            console.log("Las contraseñas no coinciden.")
        }
    }

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Register",
                    messageSuccess1: "You were registered successfully",
                    messageSuccess2: "log in here",
                    messageError: "You were not registered. Check the console to see the error (F12).",
                    invalidName: "Invalid name.",
                    invalidUser: "Invalid nick.",
                    invalidEmail: "Invalid email.",
                    invalidPassword: "Invalid password. Minimum 8 characters. It must contain a capital letter and a number at least.",
                    register: "Register",
                    placeholderName: "Name",
                    placeholderUser: "Nick (Max 10 characters)",
                    placeholderEmail: "Email",
                    placeholderPassword: "Password",
                    placeholderConfirmPassword: "Confirm password"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Registro",
                    messageSuccess1: "Te has registrado correctamente",
                    messageSuccess2: "identifícate aquí",
                    messageError: "No te has registrado. Consulta la consola para ver el error (F12).",
                    invalidName: "Nombre no válido.",
                    invalidUser: "Nick no válido.",
                    invalidEmail: "Email no válido.",
                    invalidPassword: "Contraseña no válida. Mínimo 8 caracteres. Debe contener al menos una letra mayúscula y un número.",
                    register: "Registrarse",
                    placeholderName: "Nombre",
                    placeholderUser: "Nick (Máx 10 caracteres)",
                    placeholderEmail: "Email",
                    placeholderPassword: "Contraseña",
                    placeholderConfirmPassword: "Confirmar contraseña"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
