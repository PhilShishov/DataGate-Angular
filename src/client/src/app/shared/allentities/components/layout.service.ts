import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ISaveLayoutInputModel } from "../../interfaces/ISaveLayoutInputModel";

const apiUrl = environment.apiUrl + "/api/Layout";

@Injectable()
export class LayoutService {

    constructor(private http: HttpClient) {
    }

    save(model: ISaveLayoutInputModel): Observable<any> {
        return this.http.post(`${apiUrl}/save`, model);
    }

    default(controller: string, userName: string) {
        return this.http.get(`${apiUrl}/default?controllerName=${controller}&userName=${userName}`);
    }
}
