import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Injectable({ providedIn: 'root' })
export class AuthGuards implements CanActivate {
    constructor(private router: Router,
        private authService: UsuarioService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authenticatedUser = this.authService.authenticatedUserValue;
        if (authenticatedUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
