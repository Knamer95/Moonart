// Comprobar si el user está logueado. Si no, no permitir que acceda a las páginas donde se requiera estarlo. (Mi perfil, cerrar sesión...)

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