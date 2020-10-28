import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // if (this.authService.isLoggedIn) { return true; }

    // // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // // Navigate to the login page with extras
    // this.router.navigate(['/error']);
    return false;
  }
  
}
