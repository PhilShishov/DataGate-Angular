import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConditionsComponent } from './conditions/conditions.component';
import { CookieComponent } from './cookie/cookie.component';
import { PrivacyComponent } from './privacy/privacy.component';

import { IdentityLayoutComponent } from '../../core/layouts/identity-layout/container/identity-layout.component';

const userRoutes: Routes = [
  {
    path: '',
    component: IdentityLayoutComponent,
    children: [
      { path: 'privacy', component: PrivacyComponent },
      { path: 'cookie', component: CookieComponent },
      { path: 'conditions', component: ConditionsComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [RouterModule]
})
export class LegalRoutingModule {}
