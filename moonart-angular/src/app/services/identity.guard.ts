// Check if user is logged. If not, restrict access to pages where being logged is required (Profile, feed...)

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class IdentityGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userService: UserService
    ) { }

    canActivate() {
        let identity = this._userService.getIdentity();

        if (identity && identity.nick != 'guest') {
            return true;
        }
        else {
            this._router.navigate(['/login']);
            return false;
        }
    }
}