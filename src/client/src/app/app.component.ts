import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CoreCacheService } from './core/cache/core-cache.service';
import { PageNotFoundHandler } from './core/errorHandler/pageNotFoundHandler';
import { NotFoundInfo } from './shared/interfaces/notFound';
import { DataGateConstants } from './shared/utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DataGate';
  titleKey = "Title";
  pageNotFoundTitle: 'Page Not Found';

  constructor(private titleService: Title,
    private translateService: TranslateService,
    private readonly router: Router,
    private coreCacheService: CoreCacheService,
    private pageNotFoundHandler: PageNotFoundHandler
  ) {
    this.translateService.addLangs(['en', 'it']);
    translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url != event.urlAfterRedirects) {
          let user = this.coreCacheService.getByKey(DataGateConstants.userKey);
          let data = { authenticated: false, notFound: true } as NotFoundInfo
          if (user) {
            data.authenticated = true;
            this.router.navigate(['/userpanel']);
            this.pageNotFoundHandler.fillNotFoundAuth(data);
          } else {
            data.authenticated = false;
            this.router.navigate(['/']);
            this.pageNotFoundHandler.fillNotFoundNoAuth(data);
          }
          this.titleService.setTitle(this.pageNotFoundTitle);
        }
      }
    })
  }
}
