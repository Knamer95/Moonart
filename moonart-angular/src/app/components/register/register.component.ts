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

    public pageTitle: string;
    public user: User;
    public checkData: boolean = false; // Flag to disable form while we check if data is correct
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
        this.pageTitle = "Register";
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
        this.checkData = true;

        if (form.value.password == form.value.password_2) {
            this._userService.register(this.user).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.status = 'success';
                        // form.reset();
                    }
                    else {
                        this.status = 'error';
                        this.checkData = false;

                    }
                    console.log(response);

                    this._commonService.displayNotification(this, this.status);
                },
                error => {
                    this.status = 'error';
                    this.checkData = false;
                    this._commonService.displayNotification(this, this.status);
                    console.log(error);
                }
            );
        }
        else {
            console.log("The passwords don't match."); // Show on notification instead
            this.checkData = false;
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
                    invalidName: "Invalid name. It must contain at least one character",
                    invalidUser: "Invalid nick. Must be between 4 and 10 characters. It admits alphanumerics, hyphen, and underscore",
                    invalidEmail: "Invalid email. Please introduce a valid one.",
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
                    invalidName: "Nombre no válido. Debe contener al menos un caracter.",
                    invalidUser: "Nick no válido. Debe tener entre 4 y 10 caracteres. Admite alfanuméricos, guión, y guión bajo.",
                    invalidEmail: "Email no válido. Por favor introduzca un email válido.",
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
