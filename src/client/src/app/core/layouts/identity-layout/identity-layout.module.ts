import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgxCaptchaModule, ReCaptchaV3Service } from "ngx-captcha";
import { IdentityLayoutComponent } from "./container/identity-layout.component";
import { AccountService } from "src/app/modules/account/account.service";


@NgModule({
  imports: [
    TranslateModule,
    NgxCaptchaModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    IdentityLayoutComponent
  ],
  exports: [
    IdentityLayoutComponent,
    RouterModule
  ],
  providers: [
    ReCaptchaV3Service, AccountService
  ]
})
export class IdentityLayoutModule{

}
