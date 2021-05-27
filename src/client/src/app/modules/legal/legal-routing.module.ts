import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConditionsComponent } from './conditions/conditions.component';
import { CookieComponent } from './cookie/cookie.component';
import { PrivacyComponent } from './privacy/privacy.component';

const userRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'privacy', component: PrivacyComponent },
      { path: 'cookie', component: CookieComponent },
      { path: 'conditions', component: ConditionsComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class LegalRoutingModule {}
