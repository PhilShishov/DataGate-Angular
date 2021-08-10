import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injector, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoaderService } from '../../shared/utils/loader.service';
import { TokenService } from '../../shared/utils/token.service';
import { AccountService } from 'src/app/modules/account/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DataGateTransformOptions implements HttpInterceptor {
  loaderService: LoaderService;
  tokenService: TokenService;
  toaster: ToastrService;
  accountService: AccountService;

  constructor(private _injector: Injector) {
    this.loaderService = this._injector.get(LoaderService);
    this.tokenService = this._injector.get(TokenService);
    this.toaster = this._injector.get(ToastrService);
    this.accountService = this._injector.get(AccountService);
  }

  private requests: HttpRequest<any>[] = [];

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    const token: string = this.tokenService.getToken();
    if (this.accountService.currentUser)
      request = request.clone({
        headers: request.headers.set(
          'userId',
          this.accountService.currentUser.id
        ),
      });
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
    });
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });
    request = request.clone({
      withCredentials: true,
    });
    if (request.method.toUpperCase() == 'POST') {
      request = request.clone({
        body: JSON.stringify(request.body),
      });
    }

    return Observable.create((observer) => {
      const subscription = next.handle(request).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(request);
            observer.next(event);
          }
        },
        (err) => {
          this.removeRequest(request);
          observer.error(err);
        },
        () => {
          this.removeRequest(request);
          observer.complete();
        }
      );
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
}
