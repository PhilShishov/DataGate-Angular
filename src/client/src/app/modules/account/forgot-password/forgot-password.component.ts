import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor() { }
  email: string;

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid) {

    }
  }
}
