import { Component, OnInit, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Renderer2 } from '@angular/core';
import { emitterTypes } from '../../models/struct';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    providers: [UserService]
})
export class UserEditComponent implements OnInit {

    public pageTitle: string = "Edit profile";
    public user: User;
    public status: string;
    public identity: any;
    public token: string;
    public nightMode: boolean;
    public element: number = 1;
    public _imageURL: any;
    fileToUpload: File = null;
    public imagePath: string;
    public imageSize: boolean = true;
    public oldPassword: string;
    public confirmPassword: any;
    public pwdChange: boolean = false;
    public newPwd: boolean = false;
    public checker: boolean;
    public passMatch: boolean;
    public language: Object;
    public lang: number;
    public currentLang: any;
    public emitType: number;

    @Output() emitter = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private render: Renderer2
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = new User(this.identity.sub, this.identity.name, this.identity.nick, this.identity.password,
            this.identity.email, this.identity.description, '', '', '');
    }

    ngOnInit() {
        document.title = this.pageTitle;

        if (this.user.description)
            this.user.description = this.user.description.replace(/\\n/g, String.fromCharCode(10));

        this._imageURL = "assets/profile-picture/" + this.identity.image

        // if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode);
        // }

        this.lang = JSON.parse(localStorage.getItem("config")).lang;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    fileHandler(files) {
        if (files.length === 0)
            return;

        if (files[0].size > 1232896) {
            this.imageSize = false;
        }
        else {
            this.imageSize = true;
        }

        // console.log("size:" + files[0].size); // *Change* -> Add limitations, deactivate button if they are not fullfilled
        // https://stackoverflow.com/questions/29280473/how-can-i-use-angluarjs-to-disable-a-button-if-a-value-is-bigger-than-255

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            // console.log("Only images allowed.");
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this._imageURL = reader.result;
            this.user.imageToUpload = {
                filename: this.nameGen(),
                filetype: files[0].type.replace('image/', ''),
                value: (<string>reader.result).split(',')[1],
                base64: this._imageURL
            }
        }
    }

    onSubmit() {
        this.pwdChange = false;

        if (this.user.description != "" && this.user.description != null) {
            for (let i = 0; i < this.user.description.length; i++) {
                if (this.user.description.charCodeAt(i) == 10) {
                    this.user.description = this.user.description.substr(0, i) + '\\n' + this.user.description.substr(i + 1);
                }
            }
            this.user.description = this._commonService.noscript(this.user.description);
        }

        if (this.user.password != null || this.confirmPassword != null || this.oldPassword != null) {
            this.pwdChange = true;

            let oldPass = {
                oldPass: this.oldPassword
            }

            if (this.user.password != null && this.confirmPassword != null && this.oldPassword != null) {
                this.passMatch = true;
                if (this.user.password == this.confirmPassword) {
                    this._userService.checkPass(this.token, oldPass).subscribe(
                        response => {
                            if (response.status == "success") {
                                this.changeUserSettings(this);
                            }
                            else {
                                this.status = "error";
                                this.checker = false;
                            }

                            let message = response.status === "success" ? this.currentLang.attributes.profileUpdateSuccess : this.currentLang.attributes.passwordsDontMatch;
                            this.emitter.emit({
                                type: emitterTypes.alert,
                                status: response.status,
                                notificationType: response.status,
                                message: message,
                                timer: 3000
                            });
                        },
                        error => { }
                    );
                }
                else {
                    this.passMatch = false;
                }
            }
        }
        else {
            this.pwdChange = false;
        }
        if (this.imageSize == true && (this.pwdChange == false || this.newPwd == true)) {
            this.changeUserSettings(this);
        }
    }

    changeUserSettings(e) {
        this._userService.update(this.token, this.user).subscribe(
            response => {
                if (response && response.status == "success") {
                    this.status = "success";

                    this.identity = response.user;
                    this.user = response.user;
                    this.user.description = this.user.description.replace(/\\n/g, String.fromCharCode(10));

                    // console.log(this.token);
                    // console.log(response);
                    this.pwdChange = true;

                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    if (this.oldPassword != null) {
                        this.oldPassword = null;
                        this.confirmPassword = null;
                        this.user.password = null;
                    }

                }
                else {
                    this.status = "error";
                }
                console.log(response);

                let message = response.status === "success" ? this.currentLang.attributes.profileUpdateSuccess : this.currentLang.attributes.profileUpdateError;
                this.emitter.emit({
                    type: emitterTypes.alert,
                    status: response.status,
                    notificationType: response.status,
                    message: message,
                    timer: 3000
                });

            },
            error => {
                this.status = "error";

                this.emitter.emit({
                    type: emitterTypes.alert,
                    status: "error",
                    notificationType: "error",
                    message: this.currentLang.attributes.profileUpdateError,
                    timer: 3000
                });
                console.log(error);
            }
        );
    }


    select(event, element) {
        this.render.removeClass(document.querySelector(".chosen"), "chosen");
        this.render.addClass(event.target, "chosen");
        this.element = element;
    }


    nameGen() {
        let randomName = "";
        for (let i = 0; i < 10; i++) {
            let letter = Math.random() * 25 + 65;
            randomName += String.fromCharCode(letter);
        }
        randomName += "-";
        for (let i = 0; i < 6; i++) {
            let number = Math.random() * 9 + 48;
            randomName += String.fromCharCode(number);
        }
        return randomName;
    }

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Edit profile",
                    profileUpdateSuccess: "You have updated your profile successfully.",
                    profileUpdateError: "There was an error while updating the profile.",
                    passwordsDontMatch: "The passwords don't match.",
                    imageError: "Error, image is too big. Only images smaller than 1Mb.",
                    basic: "Basic",
                    advanced: "Advanced",
                    name: "Name:",
                    invalidName: "Invalid name.",
                    user: "Nick",
                    invalidUser: "Invalid nick.",
                    currentPass: "Current password",
                    password: "Password",
                    currentPassNotMatching: "The introduced password doesn't match with the current password.",
                    newPassword: "New password",
                    invalidPassword: "Invalid password. Minimum 8 characters. It must contain a capital letter and a number at least.",
                    passwordsNotMatching: "The passwords don't match.",
                    repeatPassword: "Repeat password",
                    saveChanges: "Save changes",
                    cancel: "Cancel"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Editar perfil",
                    profileUpdateSuccess: "Has actualizado tu perfil correctamente.",
                    profileUpdateError: "Error al actualizar la información.",
                    passwordsDontMatch: "Las contraseñas no coinciden.",
                    imageError: "Error, imagen demasiado grande. Sólo imágenes menores de 1Mb.",
                    basic: "Básico",
                    advanced: "Avanzado",
                    name: "Nombre:",
                    invalidName: "Nombre no válido.",
                    user: "Nick",
                    invalidUser: "Nick no válido.",
                    currentPass: "Contraseña actual",
                    password: "Contraseña",
                    currentPassNotMatching: "La contraseña introducida no corresponde con la actual.",
                    newPassword: "Nueva contraseña",
                    invalidPassword: "Contraseña no válida. Mínimo 8 caracteres. Debe contener al menos una letra mayúscula, un número.",
                    passwordsNotMatching: "Las contraseñas no coinciden.",
                    repeatPassword: "Repite la contraseña",
                    saveChanges: "Guardar cambios",
                    cancel: "Cancelar"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}