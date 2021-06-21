import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgxCaptchaModule, ReCaptchaV3Service } from "ngx-captcha";
import { RecaptchaService } from "src/app/core/captcha/recaptcha.service";
import { IdentityLayoutComponent } from "./container/identity-layout.component";


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
    ReCaptchaV3Service, 
    RecaptchaService
  ]
})
export class IdentityLayoutModule{

}
