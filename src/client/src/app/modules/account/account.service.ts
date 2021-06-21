import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IUser } from '../../shared/interfaces/user';

import { TokenService } from '../../shared/utils/token.service';

const apiUrl = environment.apiUrl;

@Injectable()
export class AccountService {

  tokenService: TokenService
  currentUser: IUser | null;

  get isLogged(): boolean { return !!this.currentUser; }

  constructor(private http: HttpClient, private _injector: Injector, private router: Router) {
    this.tokenService = this._injector.get(TokenService);
  }

  getCurrentUserProfile(): Observable<any> {
    return this.http.get(`${apiUrl}/profile`, { withCredentials: true }).pipe(
      tap(((user: IUser) => this.currentUser = user)),
      catchError(() => { this.currentUser = null; return of(null); })
    );
  }

  login(data: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, data, { withCredentials: true }).pipe(
      tap((user: IUser) => this.currentUser = user)
    );
  }

  // logout(): Observable<any> {
  //   return this.http.post(`${apiUrl}/logout`, {}, { withCredentials: true }).pipe(
  //     tap(() => this.currentUser = null)
  //   );
  // }

  logout() {
    this.tokenService.setToken(null);
    this.router.navigate(['/logout']);
  }
}
