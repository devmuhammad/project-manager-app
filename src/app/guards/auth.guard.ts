import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLES } from '../helpers/constants';
import { getRoles,getAccess } from '../helpers/roles.helpers';
// import { group } from '@angular/animations';

interface GpItems{
  roles: any[],

}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return getRoles(ROLES.ADMIN);
      // return getAccess(next.data.allowedRoles);
    } 
}
