import { CoreCacheService } from 'src/app/core/cache/core-cache.service';
import { DataGateConstants } from 'src/app/shared/utils/constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

  constructor(private coreCacheService: CoreCacheService){}

    getToken(): string {
      const userLogonDto = this.coreCacheService.getByKey(DataGateConstants.userKey);
        if (userLogonDto) {
            return userLogonDto.tokenInfo.authToken;
        } else {
            return null;
        }
    }
}
