import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { NgxSpinnerService } from 'ngx-spinner';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  loginForm: FormGroup;
  constructor (private router: Router,
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private spinner:NgxSpinnerService,
    private titleService:Title) { }

  ngOnInit(): void {
    this.loginForm = this.createForm();
    this.authApiService.getLogin().subscribe();
    this.titleService.setTitle(this.title);
  }

  createForm() {
    return this.formBuilder.group({
      userName: ['', Validators.required],
      password:["",Validators.required]
    })
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const result = Object.assign({}, this.loginForm.value);
    this.spinner.show();
    this.authApiService.postLogin(result).subscribe(res => {
      this.spinner.hide();
    }, err => {
        this.loginForm.setErrors({ cred: true });
        this.spinner.hide();
    }
    )
  }

  navigateForgotPassword() {
    this.router.navigate(["forgotpassword"])
  }
  navigateCookie() {
    this.router.navigate(["cookie"])
  }
  
  navigatePrivacy() {
    this.router.navigate(["privacy"])
  }
  
  navigateConditions() {
    this.router.navigate(["conditions"])
  }
}
