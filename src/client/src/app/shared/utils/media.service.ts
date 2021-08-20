import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IDownloadInputModel } from "../interfaces/IDownloadInputModel";

const mediaUrl = environment.apiUrl + "/api/Media";

@Injectable({
  providedIn: 'root'
})
export class MediaService{

  constructor(private http: HttpClient) {
  }

  generateReport(model: IDownloadInputModel) {
    return this.http.post(`${mediaUrl}/generateReport`, model);
  }
}
