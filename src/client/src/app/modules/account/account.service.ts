import { DataGateConstants } from 'src/app/shared/utils/constants';
import { CoreCacheService } from 'src/app/core/cache/core-cache.service';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IUser } from '../../shared/interfaces/user';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';

const apiUrl = environment.apiUrl + "/api/identity";

@Injectable()
export class AccountService {

  currentUser: IUser | null;

  get isLogged(): boolean { return !!this.currentUser; }

  constructor(private http: HttpClient, private router: Router, private coreCacheService: CoreCacheService) { }

  getCurrentUserProfile(): Observable<any> {
    return this.http.get(`${apiUrl}/profile`).pipe(
      tap(((user: IUser) => this.currentUser = user)),
      catchError(() => { this.currentUser = null; return of(null); })
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, data).pipe(
      tap((user: IUser) => {
        this.currentUser = user;
      })
    );
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/forgot-password`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/reset-password`, data);
  }

  renewToken(data): Observable<any> {
    return this.http.post(`${apiUrl}/renewtoken`, data);
  }

  getGoogleRecaptchaKey(): Observable<any>{
    return this.http.get(`${apiUrl}/getGoogleRecaptchaKey`);
  }

  logout() {
    this.currentUser = null;
    this.coreCacheService.removeByKey(DataGateConstants.userKey);
    this.router.navigate(['/account/logout']);
  }
}
