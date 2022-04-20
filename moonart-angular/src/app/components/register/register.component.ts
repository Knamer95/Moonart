import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { emitterTypes } from '../../models/struct';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'register-component',
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
    public showPassword: boolean = false;
    public showPassword2: boolean = false;
    public language: Object;
    public currentLang: any;
    public lang: number;
    public emitType: number;

    @Output() emitter = new EventEmitter();

    constructor(
        public activeModal: NgbActiveModal,
        private _userService: UserService,
        private _commonService: CommonService,
        private _router: Router,
    ) {
        this.user = new User(1, '', '', '', '', '', 'ROLE_USER', '', '');
    }

    ngOnInit() {
        // document.title = this.pageTitle;

        // if (localStorage.getItem("user") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode);
        // }

        this.lang = JSON.parse(localStorage.getItem("config")).lang;;
        this.currentLang = {};
        this._commonService.changeLangAttr(this.lang);
    }

    onSubmit(form) {
        this.checkData = true;

        if (form.value.password == form.value.password_2) {

            this._userService.register(this.user).subscribe(
                response => {
                    console.log(response);

                    if (response.status == 'success') {
                        this.status = 'success';
                        // form.reset();
                    }
                    else {
                        this.status = 'error';
                        this.checkData = false;

                    }

                    let message = this.currentLang.attributes.messageError;

                    if (response.status === "success") {
                        message = `${this.currentLang.attributes.messageSuccess1}, ${this.currentLang.attributes.messageSuccess2}`;
                    }
                    else if (response.messageError === 1) {
                        message = this.currentLang.attributes.messageError1;
                    }
                    else if (response.messageError === 2) {
                        message = this.currentLang.attributes.messageError2;
                    }
                    else if (response.messageError === 3) {
                        message = this.currentLang.attributes.messageError3;
                    }

                    // if (response.status === "success")
                        // setTimeout(() => { this._router.navigate(['login']); }, 1500);


                    this.emitter.emit({
                        type: emitterTypes.ALERT,
                        status: response.status,
                        notificationType: response.status,
                        message: message,
                        modal: 'register-modal',
                        timer: 3000
                    });
                },
                error => {
                    this.status = 'error';
                    this.checkData = false;

                    this.emitter.emit({
                        type: emitterTypes.ALERT,
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
                type: emitterTypes.ALERT,
                status: "error",
                notificationType: "error",
                message: this.currentLang.attributes.passwordsDontMatch,
                timer: 3000
            });

            console.log("The passwords don't match."); // Show on notification instead
            this.checkData = false;
        }
    }

    toggle(el) {
        if (el === 1)
            this.showPassword = this.showPassword ? false : true;
        else if (el === 2)
            this.showPassword2 = this.showPassword2 ? false : true;
    }
}
