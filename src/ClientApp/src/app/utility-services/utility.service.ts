import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CarModel } from '../app-home/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private readonly accessToken: string = "token";
  private carData: Subject<CarModel> = new Subject<CarModel>();
  carDataListener = this.carData.asObservable();
  constructor () { }
  
  sendData(car: CarModel) {
    this.carData.next(car);
  }

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
