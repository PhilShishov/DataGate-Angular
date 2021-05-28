import {Directive} from '@angular/core';

import {
  NG_VALIDATORS,
  AbstractControl,
} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[required][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RequiredValidator, multi: true }
  ]
})

// tslint:disable-next-line:directive-class-suffix
export class RequiredValidator {
  validate(control: AbstractControl): {[validator: string]: string} {
    if (control.value == null || control.value === '') {
      return {required: 'You must put a value'};
    }

    return null;
  }
}
