import { Component, OnInit } from "@angular/core";
import { CoreCacheService } from 'src/app/core/cache/core-cache.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { LanguageService } from "src/app/shared/utils/language.service";

@Component({
  selector: 'login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {
  flag: string;
  currentYear: number;
  showConsent: boolean;
  action: string = 'login';

  readonly SITE_KEY = '6LfVtaMZAAAAAHPJhuGhRbOE-MYdpEJZBNPXDUed';

  constructor(private languageService: LanguageService,
    private cacheService: CoreCacheService,
    private reCaptchaV3Service: ReCaptchaV3Service) { }


  ngOnInit() {
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
    let consent = this.cacheService.getByKey('ConsentCookie');
    return consent != null;
  }

  acceptCookies() {
    this.cacheService.setByKey('ConsentCookie', 'yes');
    this.showConsent = false;
  }

  executeRecaptcha() {
    this.reCaptchaV3Service.execute(
      this.SITE_KEY,
      this.action,
      token => {
        this.cacheService.setByKey('GRECAPTCHA', token);
      },
      {
        useGlobalDomain: false
      }
    );
  }
}
