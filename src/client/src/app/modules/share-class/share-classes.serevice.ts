import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl + "/api/ShareClasses";

@Injectable()
export class ShareClassService {

  constructor(private http: HttpClient) {
  }

  all(userName): Observable<any> {
    return this.http.post(`${apiUrl}/shareClasses`, userName);
  }

  update(data): Observable<any>{
    return this.http.post(`${apiUrl}/upadte`,data);
  }
}
