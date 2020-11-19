import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor (private router: Router,
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.createForm();
    this.authApiService.getLogin().subscribe();
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
}
