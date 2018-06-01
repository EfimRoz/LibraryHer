import { Directive } from '@angular/core';
import {AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appDateValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true}],
})
export class DateValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
      const date = new Date(control.value);
      console.log('the date obj: ', date, ' the value: ', control.value);
      if (isNaN(date.getTime())){
        return {'invalidDate': {value: control.value}};
      } else {
        return null;
      }
  }
}
