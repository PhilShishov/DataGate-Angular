import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';

import { CoreCacheService } from './../cache/core-cache.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Postman-Token': '80f9f453-1a43-4c29-add1-f708d161b44c',
    'cache-control': 'no-cache'
  })
};

@Injectable()
export class RecaptchaService {

  url = 'https://www.google.com/recaptcha/api/siteverify';

  readonly SECRET_KEY = 'SECRET_KEY';

  constructor(private http: HttpClient, private coreCacheService: CoreCacheService) { }

  public getCaptcha(): Observable<any> {
    let token = this.coreCacheService.getByKey('GRECAPTCHA');
    if (token != null) {
      const object = { secret: this.SECRET_KEY, response: token };
      let option = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
        }),
        params: [{ secret: this.SECRET_KEY }, { response: token }]
      };
      let ur = `https://www.google.com/recaptcha/api/siteverify?secret=` +
        `${this.SECRET_KEY}&response=${token}`;

      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('secret', this.SECRET_KEY);
      urlSearchParams.append('response', token);

      return this.http.request('post', ur);
    } else {
      return of(null);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
