import {Directive, Input} from '@angular/core';

import {
  NG_VALIDATORS,
  AbstractControl,
  Validator,
} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[required][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RequiredValidator, multi: true }
  ]
})

// tslint:disable-next-line:directive-class-suffix
export class RequiredValidator implements Validator{
  validate(control: AbstractControl): {[validator: string]: string} {
    debugger;
    if (control.value == null || control.value === '') {
      return {required: 'You must put a value'};
    }

    return null;
  }
}
