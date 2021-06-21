import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Injectable()
export class NotificationService{

  constructor(private http: HttpClient) {
  }

  getNotifications(): Observable<any> {
    return this.http.get(`${apiUrl}/api/Notification/all`, { withCredentials: true });
  }

  status(notifId: string){
    return this.http.get(`${apiUrl}/api/Notification/status?notifId=` + notifId, { withCredentials: true });
  }

  all(){
    return this.http.get(`${apiUrl}/api/Notification/statusAll`, { withCredentials: true });
  }
}
