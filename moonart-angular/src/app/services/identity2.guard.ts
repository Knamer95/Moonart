// Check if user is logged. If yes, restrict access to pages where not being logged is required (Login, register...)

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class Identity2Guard implements CanActivate{
    
    constructor(
        private _router: Router,
        private _userService: UserService
    ){}
    
    canActivate(){
        let identity = this._userService.getIdentity();

        if (identity && identity.nick != 'guest'){ // Either null (not logged) or Object (logged)
            this._router.navigate(['/home']);
            return false;
        }
        else{
            return true; // If it returns true, it redirects to the location
        }
    }
}