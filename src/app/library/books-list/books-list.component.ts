import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from './book/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  @Input() booksList: Book[];
  @Output() bookUpdated = new EventEmitter<Book>();

  constructor() { }

  ngOnInit() {
  }

  updateBook(book: Book): void {
    this.bookUpdated.emit(book);
  }

}
