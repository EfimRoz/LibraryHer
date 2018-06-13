import {Attribute, Directive, Inject, inject, Injectable, Optional} from '@angular/core';
import {DateValidatorDirective} from './form-validators.directive';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {BookService} from '../../service/book.service';
import {Book} from '../../books-list/book/book.model';

@Directive({
  selector: '[appTitleUniqueValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: TitleValidatorDirective, multi: true}],

})
export class TitleValidatorDirective {


  constructor( private bookService: BookService) {
  }

  uniqueValidator(book: Book): ((AbstractControl) => ValidationErrors) {
    return (control: AbstractControl) => {
      const title = ( control.value ) ? control.value.trim() : null;
      console.log('the book service?', book)
      if (book && book.title && book.title.trim() === title) {
        // If on edit mode...
        // return null errors
        return null;
      }
      return (this.bookService.titleExists(title)) ? {'duplicateTitle': {value: control.value}} : null;
    };
  }
}
