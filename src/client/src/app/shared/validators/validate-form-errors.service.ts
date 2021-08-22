import { NgForm, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SnackBarsService } from 'src/app/core/layouts/ui-input/snackbars/services/snackbars.service';

@Injectable()

export class ValidateFormErrorsService {

    constructor(
        private _snackBarsService: SnackBarsService
    ) {
    }

    private getErrors(form: NgForm): string {
        let errorsText = '';
        Object.keys(form.controls).forEach(field => {
            const control = form.controls[field];
            if (control instanceof FormControl && control.errors) {
                errorsText += '<div>' + '<b>' +field.toString() + ':</b> ' + this.getTextError(control.errors) + '.</div>';
            }
        });

        return errorsText;
    }

    private getTextError(errors: ValidationErrors): string {
        let errorText = '';
        Object.keys(errors).forEach(field => {
            const error = errors[field];
            errorText += error;
        });

        return errorText;
    }

    public snackBarErrors(form: NgForm) {
        this._snackBarsService.openSnackBarError(this.getErrors(form));
    }
}
