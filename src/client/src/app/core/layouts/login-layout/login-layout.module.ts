import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgxCaptchaModule, ReCaptchaV3Service } from "ngx-captcha";
import { RecaptchaService } from "src/app/core/captcha/recaptcha.service";
import { FormControlsModule } from "../../ui-controls/form-controls/form-controls.module";
import { MaterialFormsModule } from "../../ui-controls/material/material-forms.module";
import { LoginLayoutComponent } from "./container/login-layout.component";

@NgModule({
  imports: [
    MaterialFormsModule,
    FormControlsModule,
    TranslateModule,
    NgxCaptchaModule,
    RouterModule
  ],
  declarations: [
    LoginLayoutComponent
  ],
  exports: [
    MaterialFormsModule,
    FormControlsModule,
    LoginLayoutComponent,
    RouterModule
  ],
  providers: [
    ReCaptchaV3Service, 
    RecaptchaService
  ]
})
export class LoginLayoutModule{

}
