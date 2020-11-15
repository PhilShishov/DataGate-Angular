import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { UtilityService } from 'src/app/utility-services/utility.service';
import { TokenModel } from '../models/token.model';

@Injectable()
export class AuthApiService {

  constructor (private http: HttpClient,private utilityService:UtilityService,private rotuer:Router) { }
  
  signin(payload: any) {
    return this.http.post<TokenModel>("http://localhost:55865/api/identity/signin", payload).pipe(
      tap(res => {
        this.utilityService.setToken(res.accessToken);
        this.rotuer.navigate(["home"]);
      })
    )
  }

  signUp(payload: any) {
    return this.http.post("http://localhost:55865/api/identity/signup", payload).pipe(tap(res => {
      this.rotuer.navigate(["signin"]);
    }))
  }
}
