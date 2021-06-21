import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner: NgxSpinnerService) { }
  activateLoader() {
    this.spinner.show();
  }

  deactivateLoader() {
    this.spinner.hide();
  }
}
