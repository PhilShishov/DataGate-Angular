import { AuthGuardService } from './../../guards/auth-guard.service';
import { AccountService } from './../../../modules/account/account.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutComponent } from './components/container/app-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NotificationService } from './notification-service';
import { NotificationsComponent } from './components/notifications/notification.component';
import { AuthorizationServiceModule } from '../../guards/authorization.service.module';
import { SearchService } from '../../../modules/search-result/search-service';
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule, ReCaptchaV3Service } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppLayoutComponent,
    HeaderComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    AuthorizationServiceModule,
    NgxCaptchaModule
  ],
  providers: [NotificationService, SearchService, ReCaptchaV3Service, AccountService]
})
export class AppLayoutModule { }
