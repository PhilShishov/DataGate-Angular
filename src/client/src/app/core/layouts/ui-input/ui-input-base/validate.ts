import { Observable, of } from 'rxjs';
import {
  AbstractControl,
  AsyncValidatorFn,
  Validator,
  Validators,
  ValidatorFn,
} from '@angular/forms';


// tslint:disable-next-line:interface-over-type-literal
export type ValidationResult = {[validator: string]: string | boolean};

export type AsyncValidatorArray = Array<Validator | AsyncValidatorFn>;

export type ValidatorArray = Array<Validator | ValidatorFn>;

const normalizeValidator =
    (validator: Validator | ValidatorFn): ValidatorFn | AsyncValidatorFn => {
  const func = (validator as Validator).validate.bind(validator);
  if (typeof func === 'function') {
    return (c: AbstractControl) => func(c);
  } else {
    return <ValidatorFn | AsyncValidatorFn> validator;
  }
};

export const composeValidators =
    (validators: ValidatorArray): AsyncValidatorFn | ValidatorFn => {
  if (validators == null || validators.length === 0) {
    return null;
  }
  return Validators.compose(validators.map(normalizeValidator));
};

export const validate =
    (validators: ValidatorArray, asyncValidators: AsyncValidatorArray) => {
  return (control: AbstractControl) => {
    const synchronousValid = () => composeValidators(validators)(control);

    if (asyncValidators) {
      const asyncValidator = composeValidators(asyncValidators);

      return asyncValidator(control).map(v => {
        const secondary = synchronousValid();
        if (secondary || v) { // compose async and sync validator results
          return Object.assign({}, secondary, v);
        }
      });
    }

    if (validators) {
      return of(synchronousValid());
    }

    return of(null);
  };
};

export const message = (validator: ValidationResult, key: string): string => {
  switch (key) {
    case 'required':
      return 'This field is required';
    case 'pattern':
      return 'Value does not match the pattern';
    case 'minlength':
      return `The value must have a minimum of ${(<any>validator).minlength.requiredLength} character`;
    case 'maxlength':
      return `The value must have a maximum of ${(<any>validator).maxlength.requiredLength} character`;
  }

  switch (typeof validator[key]) {
    case 'string':
      return <string>validator[key];
    default:
      return `Failed Validation: ${key}`;
  }
};
