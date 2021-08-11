import { Router } from '@angular/router';
import { DataGateConstants } from './../../../../shared/utils/constants';
import { Component, OnInit } from "@angular/core";
import { ReCaptchaV3Service } from 'ngx-captcha';
import { CoreCacheService } from 'src/app/core/cache/core-cache.service';
import { LanguageService } from "src/app/shared/utils/language.service";
import { AccountService } from 'src/app/modules/account/account.service';
import { PageNotFoundHandler } from 'src/app/core/errorHandler/pageNotFoundHandler';
import { NotFoundInfo } from 'src/app/shared/interfaces/notFound';

@Component({
  selector: 'identity-layout',
  templateUrl: './identity-layout.component.html',
  styleUrls: ['./identity-layout.component.scss'],
})
export class IdentityLayoutComponent implements OnInit {
  flag: string;
  currentYear: number;
  showConsent: boolean;
  action: string = 'login';
  showErrorPage: boolean = false;

  constructor(
    private languageService: LanguageService,
    private cacheService: CoreCacheService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private accountService: AccountService,
    private router: Router,
    private pageNotFoundHandler: PageNotFoundHandler) {}

  ngOnInit() {
    this.showErrorPage = this.router.routerState.snapshot.url == '/notfound';
    var currentTime = new Date();
    this.currentYear = currentTime.getFullYear();
    this.flag = this.languageService.getFlag();
    this.showConsent = !this.hasCookiesConsent();
    this.executeRecaptcha();
  }

  changeLanguage() {
    this.languageService.toggleLanguage();
    this.flag = this.languageService.getFlag();
  }

  hasCookiesConsent() {
    let consent = this.cacheService.getByKey(DataGateConstants.consentKey);
    return consent != null;
  }

  acceptCookies() {
    this.cacheService.setByKey(DataGateConstants.consentKey, 'yes');
    this.showConsent = false;
  }

  executeRecaptcha() {
    let key = this.cacheService.getByKeyValidOrNot(DataGateConstants.googleRecaptchaKey);
    if (!key) {
      this.accountService.getGoogleRecaptchaKey().subscribe(_key =>{
        this.cacheService.setByKey(DataGateConstants.googleRecaptchaKey, _key);
        this._execute(_key)
      })
    } else {
      this._execute(key);
    }
  }

  _execute(key){
    this.reCaptchaV3Service.execute(
      key,
      this.action,
      (token) => {
        this.cacheService.setByKey(DataGateConstants.googleRecaptchaToken, token);
      },
      {
        useGlobalDomain: false,
      },
      () =>{
        this.cacheService.setByKey(DataGateConstants.googleRecaptchaToken, null);
      },
    );
  }

  navigateToHome(){
    this.showErrorPage = false;
    this.pageNotFoundHandler.fillNotFoundNoAuth({authenticated: false, notFound: false} as NotFoundInfo);
    this.router.navigate(['/']);
  }

  navigateToPanel(){
    window.location.href = '/userpanel';
  }
}
