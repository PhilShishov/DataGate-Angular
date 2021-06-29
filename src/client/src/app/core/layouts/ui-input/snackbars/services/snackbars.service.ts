import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from '../error-snackbar/error-snackbar.component';
import { InfoSnackbarComponent } from '../info-snackbar/info-snackbar.component';
import { WarningSnackbarComponent } from '../warning-snackbar/warning-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarsService {

  constructor(
    private _snackBar: MatSnackBar
  ) {
  }

  public openSnackBarInfo(text: string) {
    const snackBarRef = this._snackBar.openFromComponent(InfoSnackbarComponent, {
      duration: 5000
    });
    snackBarRef.instance.text = text;
  }

  public openSnackBarWarning(text: string) {
    const snackBarRef = this._snackBar.openFromComponent(WarningSnackbarComponent, {
      duration: 5000
    });
    snackBarRef.instance.text = text;
  }

  public openSnackBarError(text: string) {
    const snackBarRef = this._snackBar.openFromComponent(ErrorSnackbarComponent, {
        duration: 5000
    });
    snackBarRef.instance.text = text;
  }
}
