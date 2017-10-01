import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../security/authentication-service.service';

@Injectable()
export class AuthGuardService {

  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
        // logged in so return true
        return true;
    }
    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['login']);
    return false;
  }

}
