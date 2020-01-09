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
    public nightMode;
    public arrayNightMode;
    public config: any;
    public configJSON: string;
    public userJSON: string;

    constructor(
        private _userService: UserService,
        private _commonService: CommonService
    ) {
        this.page_title = "Registrarse";
        this.user = new User(1, '', '', '', '', '', 'ROLE_USER', '', '');

        this.arrayNightMode = ["day-container", "night-container", "day-bg", "night-bg"];
    }

    ngOnInit() {

        // if (localStorage.getItem("user") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightMode(this.nightMode, this.arrayNightMode);
        // }
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
}
