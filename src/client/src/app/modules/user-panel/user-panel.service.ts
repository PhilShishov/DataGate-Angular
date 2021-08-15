import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl + "/api/User";

@Injectable()
export class UserPanelService{

  constructor(private http: HttpClient) {
  }

  getUserPanelData(userid: string): Observable<any> {
    return this.http.get(`${apiUrl}/getUserPanelData?userId=${userid}`);
  }
}
