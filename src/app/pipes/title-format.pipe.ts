import { Pipe, PipeTransform } from '@angular/core';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'titleFormat'
})
export class TitleFormatPipe extends TitleCasePipe implements PipeTransform {

  transform(value: any): any {
    const formatedCase = super.transform(value);
    const re: RegExp = new RegExp('([A-Za-z0-9,.][\\s.,!]?)+');
    const formatedValue = formatedCase.match(re);
    console.log('formated pipe value:', formatedValue);
    return formatedValue[0];
  }
}
