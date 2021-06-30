import { AccountService } from './../account.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from 'src/app/shared/validators/equals-validator';
import { IRestPasswordModel } from 'src/app/shared/interfaces/reset-passwrod';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private accountService: AccountService,
    private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }
  code: string = null;

  resetPasswordForm: FormGroup;
  resetPasswordModel: IRestPasswordModel;
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.code = decodeURI(params.code);
        this.code = this.code.split(' ').join('+');
      }
      );

    this.resetPasswordForm = this.fb.group(
      {
        code: new FormControl(this.code, [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      let data = Object.assign({}, this.resetPasswordModel, this.resetPasswordForm.value);
      this.accountService.resetPassword(data).subscribe(res => {
        this.router.navigate(['/']);
      });
    } else {
      Object.keys(this.resetPasswordForm.controls).forEach(field => {
        const control = this.resetPasswordForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  toggleEyeIcon(icon: HTMLElement, inputPass: HTMLInputElement) {
    if (inputPass.type == "password") {
      inputPass.setAttribute('type', 'text');
      icon.className = 'fas fa-eye';
    } else {
      inputPass.setAttribute('type', 'password');
      icon.className = 'fas fa-eye-slash';
    }
  }
}
