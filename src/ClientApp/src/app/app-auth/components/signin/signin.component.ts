import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  constructor (private router: Router,
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.signInForm = this.createForm();
    this.authApiService.getSignIn().subscribe();
  }

  createForm() {
    return this.formBuilder.group({
      userName: ['', Validators.required],
      password:["",Validators.required]
    })
  }

  onSubmit() {
    if (!this.signInForm.valid) {
      return;
    }

    const result = Object.assign({}, this.signInForm.value);
    this.spinner.show();
    this.authApiService.signin(result).subscribe(res => {
      this.spinner.hide();
    }, err => {
        this.signInForm.setErrors({ cred: true });
        this.spinner.hide();
    }
    )
  }

  navigate() {
    this.router.navigate(["signup"])
  }
}
