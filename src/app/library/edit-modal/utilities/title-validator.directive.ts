import {Directive, } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, } from '@angular/forms';
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
    // a function with a return function,
    // so I could pass parameters to the directive(book)
    // without hurting the standard functionality.
    return (control: AbstractControl) => {
      const title = ( control.value ) ? control.value.trim() : null;
      if (book && book.title && book.title.trim() === title) {
        // If on edit mode...
        // return null errors
        return null;
      }
      return (this.bookService.titleExists(title)) ? {'duplicateTitle': {value: control.value}} : null;
    };
  }
}
