import { Pipe, PipeTransform } from '@angular/core';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'titleFormat'
})
export class TitleFormatPipe extends TitleCasePipe implements PipeTransform {

  transform(value: any): any {
    const formattedCase = super.transform(value);
    const re: RegExp = new RegExp('([A-Za-z0-9,.][\\s.,!]?)+');
    const formattedValue = formattedCase.match(re);
    return formattedValue[0];
  }
}
