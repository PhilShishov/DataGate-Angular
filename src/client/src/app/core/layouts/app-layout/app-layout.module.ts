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

@NgModule({
  declarations: [
    AppLayoutComponent,
    HeaderComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    AuthorizationServiceModule
  ],
  providers: [NotificationService, AccountService]
})
export class AppLayoutModule { }
