// Comprobar si el user está logueado. Si sí, no permitir que acceda a las páginas donde se requiera no estarlo. (Login, register...)

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

        if (identity && identity.nick != 'guest'){ // O null (no accedido) o Object (accedido)
            this._router.navigate(['/home']);
            return false;
        }
        else{
            return true; // Si devuelve true, va a la localización a la que se está intentando acceder.
        }
    }
}