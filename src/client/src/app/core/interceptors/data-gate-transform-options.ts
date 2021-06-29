import { SnackBarsService } from './../layouts/ui-input/snackbars/services/snackbars.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injector, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoaderService } from '../../shared/utils/loader.service';
import { TokenService } from '../../shared/utils/token.service';

@Injectable()
export class DataGateTransformOptions implements HttpInterceptor {

  loaderService: LoaderService
  tokenService: TokenService
  snackBarsService: SnackBarsService;

  constructor(private _injector: Injector) {
    this.loaderService = this._injector.get(LoaderService);
    this.tokenService = this._injector.get(TokenService);
    this.snackBarsService = this._injector.get(SnackBarsService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.activateLoader();
    const token: string = this.tokenService.getToken();
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    request = request.clone({
      withCredentials: true
    });
    if(request.method.toUpperCase() == 'POST'){
      request = request.clone({
        body: JSON.stringify(request.body)
      })
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderService.deactivateLoader();
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.deactivateLoader();
        this.snackBarsService.openSnackBarError('An error occurred. Please contact Admin.');
        return throwError(error);
      }));
  }
}
