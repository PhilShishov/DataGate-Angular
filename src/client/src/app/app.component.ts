import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DataGate';
  titleKey = "Title";

  constructor(private titleService: Title,
    private translateService: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.translateService.addLangs(['en', 'it']);
    translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
