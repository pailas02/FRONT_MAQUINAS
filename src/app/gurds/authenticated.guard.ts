import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// Update the import path if the service is located elsewhere, for example:
import { SecurityService } from '../services/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private securityService: SecurityService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.securityService.existSession()) {
        this.router.navigate(['/login']);
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }
  }
}