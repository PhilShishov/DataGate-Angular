import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalRoutingModule } from './legal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginLayoutModule } from '../../core/layouts/login-layout/login-layout.module';

import { PrivacyComponent } from './privacy/privacy.component';
import { CookieComponent } from './cookie/cookie.component';
import { ConditionsComponent } from './conditions/conditions.component';

@NgModule({
  declarations: [
    ConditionsComponent,
    CookieComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    LegalRoutingModule,
    TranslateModule,
    LoginLayoutModule
  ]
})
export class LegalModule { }
