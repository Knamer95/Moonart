// Check if user is logged. If yes, not allow them to access to pages where it's required not to be. (Login, register...)

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

        if (identity && identity.nick != 'guest'){ // O null (not logged) o Object (logged in)
            this._router.navigate(['/home']);
            return false;
        }
        else{
            return true; // If it returns true, it will go to the path you are trying to access
        }
    }
}