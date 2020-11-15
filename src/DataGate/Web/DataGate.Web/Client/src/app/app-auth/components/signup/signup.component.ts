import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor (private router: Router,
    private formBuilder: FormBuilder,
    private authAPiServic: AuthApiService,
    private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.signUpForm = this.createForm();
  }

  navigate() {
    this.router.navigate(["signin"])
  }

  createForm() {
    return this.formBuilder.group({
      userName: ['', Validators.required,],
      passwordHash: ['', Validators.compose([Validators.required,Validators.pattern('^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,12}$')])],
      confirmPassword:['',Validators.required]
    },
      {
        validators:[this.MustMatch("passwordHash","confirmPassword")]
      }
    )
  }

  MustMatch(value1: string, value2: string) {
    return (formGroup: FormGroup) => {
      const firstControl = formGroup.controls[value1];
      const secondControl = formGroup.controls[value2];

      if (secondControl.errors && secondControl.errors.mustMatch) {
        return;
      }

      if (firstControl.value !== secondControl.value) {
        return secondControl.setErrors({ mustMatch: true });
      } else {
        secondControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const result = Object.assign({}, this.signUpForm.value);
    this.spinner.show();
    this.authAPiServic.signUp(result).subscribe(res => {
      console.log(res);
      this.spinner.hide();
    })
  }
}
