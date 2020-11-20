import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/utility-services/utility.service';
import { TokenModel } from '../models/token.model';

@Injectable()
export class AuthApiService {

  constructor(private http: HttpClient, private utilityService: UtilityService, private router: Router) { }

  getLogin() {
    return this.http.get("http://localhost:55865/api/identity/login");
  }

  postLogin(payload: any) {
    return this.http.post<TokenModel>("http://localhost:55865/api/identity/login", payload).pipe(
      tap(res => {
        this.utilityService.setToken(res.accessToken);
        this.router.navigate(["home"]);
      })
    )
  }
}
