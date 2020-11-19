import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor (private utilityService:UtilityService,private router:Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean | UrlTree | Observable<boolean | UrlTree>{
    if (!this.utilityService.hasToken()) {
      this.router.navigate(["signin"])
      return false;
    }
    return true;
  }
}
