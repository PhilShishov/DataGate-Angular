import { NgForm, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()

export class ValidateFormErrorsService {

    constructor(
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
        // this._snackBarsService.openSnackBarError(this.getErrors(form));
    }
}
