import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private readonly accessToken: string = "token";
  constructor () { }

  setToken(token:string) {
    localStorage.setItem(this.accessToken, token);
  }

  getToken():string {
    let token = localStorage.getItem(this.accessToken);
    return token;
  }

  removeToken() {
    localStorage.removeItem(this.accessToken);
  }

  hasToken():boolean {
    if (this.getToken() != null) {
      return true;
    } else {
      return false;
    }
  }
}
