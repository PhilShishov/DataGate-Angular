import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalRoutingModule } from './legal-routing.module';

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
  ]
})
export class LegalModule { }
