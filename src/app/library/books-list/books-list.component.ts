import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Book} from './book/book.model';
import {Subject} from 'rxjs';
import {ControllerAction, ModalUserComponent} from '../../modals/modal-user/modal-user.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent extends ModalUserComponent implements OnInit {

  @Input() booksList: Book[];
  @Output() bookUpdated = new EventEmitter<Book>();
  @Output() bookDeleted = new EventEmitter<Book>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  updateBook(book: Book): void {
    this.bookUpdated.emit(book);
  }

  deleteBook(book: Book): void {
    // this.bookDeleted.emit(book);
    this.initControllerAction( ControllerAction.Display );
  }

}
