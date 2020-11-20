import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from '../layout/site-layout/site-layout.component';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';

import { LoginComponent } from '../../app-site/components/login/login.component';
import { ForgotPasswordComponent } from '../../app-site/components/forgot-password/forgot-password.component';
import { PrivacyComponent } from '../../app-site/components/privacy/privacy.component';
import { CookieComponent } from '../../app-site/components/cookie/cookie.component';
import { ConditionsComponent } from '../../app-site/components/conditions/conditions.component';
import { AuthGuardService } from 'src/app/utility-services/auth-guard.service';
import { NoAuthService } from 'src/app/utility-services/no-auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("../../app-site/app-site.module").then(m => m.AppAuthModule),
    canActivate: [NoAuthService]
  },

  //Site routes goes 
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'cookie', component: CookieComponent },
      { path: 'conditions', component: ConditionsComponent }
    ]
  },

  // App routes goes here
  {
    path: '',
    component: AppLayoutComponent,
    // children: [
    //   { path: 'login', component: LoginComponent }
    // ]
  },

  // Admin routes goes here
  {
    path: '',
    component: AdminLayoutComponent,
    // children: [
    //   { path: 'login', component: LoginComponent }
    // ]
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class RootRoutingModule { }
