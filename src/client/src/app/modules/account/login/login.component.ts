import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RecaptchaService } from 'src/app/core/captcha/recaptcha.service';
import { UserLoginDto } from 'src/app/shared/utils/data-gate.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  userLoginDto: UserLoginDto = new UserLoginDto();
  invalidUser: false;

  constructor(private titleService: Title,private recaptchaSer: RecaptchaService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid && this.validateCaptcha()) {
      return;
    }
    // TODO: authentication
  }

  validateCaptcha() : boolean{
    let captchaVerified;
    this.recaptchaSer.getCaptcha().subscribe(resultado => {
      captchaVerified = resultado.success;
    },
    error => {
      captchaVerified = false;
    }
    );
    return captchaVerified;
  }
}
