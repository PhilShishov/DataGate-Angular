import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl + "/api/SubFunds";
const mediaUrl = environment.apiUrl + "/api/Media";

@Injectable()
export class SubFundsService {

  constructor(private http: HttpClient) {
  }

  all(userName): Observable<any> {
    return this.http.post(`${apiUrl}/allSubFunds`, userName);
  }

  update(data): Observable<any>{
    return this.http.post(`${apiUrl}/upadte`,data);
  }
}
