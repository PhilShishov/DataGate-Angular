import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router) {
    this.forgotPasswordForm = new FormGroup(
      {
        email: new FormControl('', [ Validators.required, Validators.email])
      }
    );
   }

  onSubmit() {
    if(this.forgotPasswordForm.valid){
      let email = this.forgotPasswordForm.value;
      this.accountService.forgotPassword(email).subscribe(res => {
        this.router.navigate(['/account/confirmation']);
      });
    } else {
      Object.keys(this.forgotPasswordForm.controls).forEach(field => {
        const control = this.forgotPasswordForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
