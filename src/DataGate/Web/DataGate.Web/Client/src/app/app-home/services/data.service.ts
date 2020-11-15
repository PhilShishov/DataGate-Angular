import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/utility-services/utility.service';
import { CarModel } from '../models/car.model';

@Injectable()
export class DataService {

  constructor (private http: HttpClient,private utilityService:UtilityService) { }

  getCardData() {
    return this.http.get<CarModel[]>("http://localhost:55865/api/data",{headers:new HttpHeaders().set('Authorization',`Bearer ${this.utilityService.getToken()}`)});
  }

  addCarData(payload: CarModel) {
    return this.http.post<CarModel>("http://localhost:55865/api/data",payload,{headers:new HttpHeaders().set('Authorization',`Bearer ${this.utilityService.getToken()}`)})
  }
}
