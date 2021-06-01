import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { IdentityLayoutModule } from '../../core/layouts/identity-layout/identity-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordConfirmationComponent } from './forgot-password-confirmation/forgot-password-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AccountService } from './account.service';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent,
    ForgotPasswordConfirmationComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    IdentityLayoutModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AccountService],
})
export class AccountModule {}
