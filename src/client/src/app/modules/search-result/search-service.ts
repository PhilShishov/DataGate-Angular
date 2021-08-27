import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl + "/api/Search";

@Injectable()
export class SearchService{

  constructor(private http: HttpClient) {
  }

  searchResult(searchTerm: string,userId: string): Observable<any> {
    return this.http.get(`${apiUrl}/search-results?searchTerm=${searchTerm}&userId=${userId}`);
  }
}