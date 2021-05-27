import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordConfirmationComponent } from './forgot-password-confirmation/forgot-password-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AccountService } from './account.service';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    AccessDeniedComponent,
    ConfirmEmailComponent,
    ForgotPasswordConfirmationComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
