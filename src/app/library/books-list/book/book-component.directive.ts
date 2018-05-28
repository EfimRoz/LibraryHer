import {Component, Directive, Input, OnInit} from '@angular/core';
import {Book} from './book.model';

@Directive({
  selector: '[appBookComponent]',
})
export class BookComponentDirective {
  @Input() book: Book;
  constructor() { }


}
