import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordConfirmationComponent } from './forgot-password-confirmation/forgot-password-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { IdentityLayoutComponent } from '../../core/layouts/identity-layout/container/identity-layout.component';
// import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: IdentityLayoutComponent,
    children: [
      // { path: '', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'confirmation', component: ForgotPasswordConfirmationComponent },
      { path: 'reset-password', component: ResetPasswordComponent},
      { path: 'confirm-email', component: ConfirmEmailComponent },
      { path: 'logout', component: LogoutComponent },
      // { path: 'notfound', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
