import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { emitterTypes } from '../../models/struct';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService, CommonService]
})
export class RegisterComponent implements OnInit {

    public pageTitle: string = "Register";
    public user: User;
    public checkData: boolean = false; // Flag to disable form while we check if data is correct
    public status: string;
    public nightMode: boolean;
    public config: any;
    public configJSON: string;
    public userJSON: string;
    public language: Object;
    public currentLang: any;
    public lang: number;
    public emitType: number;

    @Output() emitter = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private _router: Router,
    ) {
        this.user = new User(1, '', '', '', '', '', 'ROLE_USER', '', '');
    }

    ngOnInit() {
        document.title = this.pageTitle;

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

                    let message = response.status === "success" ?
                        `${this.currentLang.attributes.messageSuccess1}, <a>${this.currentLang.attributes.messageSuccess2}</a>`
                        :
                        this.currentLang.attributes.messageError;

                    if (response.status === "success")
                        setTimeout(() => { this._router.navigate(['login']); }, 1500);


                    this.emitter.emit({
                        type: emitterTypes.alert,
                        status: response.status,
                        notificationType: response.status,
                        message: message,
                        timer: 3000
                    });
                },
                error => {
                    this.status = 'error';
                    this.checkData = false;

                    this.emitter.emit({
                        type: emitterTypes.alert,
                        status: "error",
                        notificationType: "error",
                        message: this.currentLang.attributes.unbannedImage,
                        timer: 3000
                    });

                    console.log(error);
                }
            );
        }
        else {

            this.emitter.emit({
                type: emitterTypes.alert,
                status: "error",
                notificationType: "error",
                message: this.currentLang.attributes.passwordsDontMatch,
                timer: 3000
            });

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
                    messageSuccess2: "you'll be redirected soon.",
                    messageError: "You were not registered. Check the console to see the error (F12).",
                    passwordsDontMatch: "The passwords don't match.",
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
                    messageSuccess2: "se te redirigirá pronto.",
                    messageError: "No te has registrado. Consulta la consola para ver el error (F12).",
                    passwordsDontMatch: "Las contraseñas no coinciden.",
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
