import { HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { SpinnerService } from '../../shared/utils/spinner.service';
import { TokenService } from '../../shared/utils/token.service';

export class DataGateTransformOptions {

    spinnerService: SpinnerService
    tokenService: TokenService
    
    constructor(private _injector: Injector) {
        this.spinnerService = this._injector.get(SpinnerService);
        this.tokenService = this._injector.get(TokenService);
    }

    protected transformOptions(options: any): Promise<any> {
        this.spinnerService.activateLoader();
        options.headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.tokenService.getToken()}`,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        });
        return Promise.resolve(options);
    }

    protected transformResult(url: string, response: HttpResponseBase, processor: (response: HttpResponseBase) => any): Observable<any> {
        this.spinnerService.deactivateLoader();
        if (response.status !== 200) {
            // todo alert with error
        }
        return processor(response);
    }
}
