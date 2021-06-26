import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(private spinner: NgxSpinnerService) { }

  activateLoader() {
    this.spinner.show();
  }

  deactivateLoader() {
    this.spinner.hide();
  }
}
