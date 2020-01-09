import { Component, OnInit, HostListener } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { Renderer2 } from '@angular/core';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    providers: [UserService]
})
export class UserEditComponent implements OnInit {

    public page_title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public arrayNightMode;
    public nightMode;
    public element: number;
    public _imageURL: any;
    fileToUpload: File = null;
    public imagePath;
    public imageSize;
    public oldPassword;
    public confirmPassword;
    public pwdChange;
    public newPwd;
    public checker;
    public passMatch;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService,
        private render: Renderer2
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.page_title = "Editar perfil";
        this.user = new User(this.identity.sub, this.identity.name, this.identity.nick, this.identity.password,
            this.identity.email, this.identity.description, '', '', '');
        this.element = 1;
        this.imageSize = true;
        this.pwdChange = false;
        this.newPwd = false;
    }

    ngOnInit() {
        this._imageURL = "assets/profile-picture/" + this.identity.image
        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];

        if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {

            this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
            this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
        }
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
        console.log("size:" + files[0].size); // *Cambiar* -> Poner limitaciones, desactivar el botón si no las cumple
        // https://stackoverflow.com/questions/29280473/how-can-i-use-angluarjs-to-disable-a-button-if-a-value-is-bigger-than-255

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            console.log("Sólo se admiten imágenes.");
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
            console.log(this.user.description);
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
                                this._commonService.displayNotification(this);
                                this.checker = 0;
                            }
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

    changeUserSettings(e){
            this._userService.update(this.token, this.user).subscribe(
                response => {
                    if (response && response.status == "success") {
                        this.status = "success";
                        this._commonService.displayNotification(e);

                        this.identity = response.user;
                        this.user = response.user;
                        console.log(this.token);
                        console.log(response);
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
                        this._commonService.displayNotification(e);
                    }
                    console.log(response);

                },
                error => {
                    this.status = "error";
                    this._commonService.displayNotification(e);
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
}