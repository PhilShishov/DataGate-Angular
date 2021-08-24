import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl + "/api/Admin";

@Injectable()
export class AdminService {

    constructor(private http: HttpClient) {
    }

    getRoles(): Observable<any> {
        return this.http.get(`${apiUrl}/getUserRoles`);
    }

    create(data): Observable<any> {
        return this.http.post(`${apiUrl}/create`, data);
    }

    all(): Observable<any> {
        return this.http.get(`${apiUrl}/all`);
    }

    get(id): Observable<any> {
        return this.http.get(`${apiUrl}/edit/${id}`);
    }

    edit(data): Observable<any> {
        return this.http.post(`${apiUrl}/edit`, data);
    }

    delete(data): Observable<any> {
        return this.http.post(`${apiUrl}/delete`, data);
    }
}
