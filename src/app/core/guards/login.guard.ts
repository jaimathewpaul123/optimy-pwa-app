import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UtilsService} from 'src/app/core/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  userToken: string;
  constructor(
    private utils: UtilsService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.utils.isLoggedIn) {
      return true;
    }
    return false;
  }

}
