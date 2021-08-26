import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { CoreCacheService } from 'src/app/core/cache/core-cache.service';
import { AccountService } from 'src/app/modules/account/account.service';
import { DataGateConstants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  date: string
  pathsForRecaptcha = ['/admin/edit', '/admin/create', '/admin/delete'];
  
  constructor(private reCaptchaV3Service: ReCaptchaV3Service,
    private cacheService: CoreCacheService,
    private accountService: AccountService,
    private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.pathsForRecaptcha.includes(location.pathname)) {
        this.executeRecaptcha();
      }
    });
  }


  @HostListener('window:scroll', ['$event'])
  showBackToTop(event) {
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    var scroll = document.getElementsByClassName('back-to-top')[0] as HTMLElement;

    if (scrollPos > 40) {
      scroll.style.display = "inline";
    } else {
      scroll.style.display = "none";
    }
    scroll.addEventListener('click', this.backToTop);
  }

  backToTop() {
    let doc = document.documentElement;
    let left = (doc.clientLeft || 0);
    let top = (doc.clientTop || 0);
    window.scrollTo({
      top: top,
      left: left,
      behavior: 'smooth'
    });
  }

  executeRecaptcha() {
    let key = this.cacheService.getByKeyValidOrNot(DataGateConstants.googleRecaptchaKey);
    if (!key) {
      this.accountService.getGoogleRecaptchaKey().subscribe(_key => {
        this.cacheService.setByKey(DataGateConstants.googleRecaptchaKey, _key);
        this._execute(_key)
      })
    } else {
      this._execute(key);
    }
  }

  _execute(key) {
    this.reCaptchaV3Service.execute(
      key,
      '',
      (token) => {
        this.cacheService.setByKey(DataGateConstants.googleRecaptchaToken, token);
      },
      {
        useGlobalDomain: false,
      },
      () => {
        this.cacheService.setByKey(DataGateConstants.googleRecaptchaToken, null);
      },
    );
  }
}
