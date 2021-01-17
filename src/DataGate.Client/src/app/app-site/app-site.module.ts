import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { } from "@angular/material/button";
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { CookieComponent } from './components/cookie/cookie.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { MaterialModule } from '../shared-material/material/material.module';
import { AuthApiService } from './services/auth-api.service';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'cookie', component: CookieComponent },
  { path: 'conditions', component: ConditionsComponent }
]

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, PrivacyComponent, 
    CookieComponent, ConditionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ],
  providers:[AuthApiService]
})
export class AppSiteModule { }
