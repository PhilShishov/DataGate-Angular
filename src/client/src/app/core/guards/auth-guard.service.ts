import { AccountService } from './../../modules/account/account.service';
import { DataGateConstants } from './../../shared/utils/constants';
import { CoreCacheService } from './../cache/core-cache.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private accountService: AccountService,
    private router: Router, private coreCacheService: CoreCacheService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.coreCacheService.getByKey(DataGateConstants.userKey);
    if (user) {
      return true;
    }

    user = this.coreCacheService.getByKeyValidOrNot(DataGateConstants.userKey);
    if (user && this._isTimeExpired(user.tokenInfo.exceedDateRenewToken) === false)
    {
      this.accountService.renewToken(JSON.stringify(user.tokenInfo.authToken)).subscribe(result => {
        user.tokenInfo.authToken = result;
        this.coreCacheService.setByKey(DataGateConstants.userKey, user);
        this.router.navigate([route['_routerState'].url]);
        return of(true);
      });
    }
    else
    {
      // this.accountService.logout();
      this.router.navigate(['/']);
      return false;
    }
    return false;
  }

  private _isTimeExpired(exceedDateRenewToken: Date): boolean {
    const now = new Date();
    const now_utc = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds());
    if (now_utc > new Date(exceedDateRenewToken)) {
      return true;
    }
    return false;
  }
}
