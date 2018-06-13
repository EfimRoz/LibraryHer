import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Book} from './book/book.model';
import {Subject} from 'rxjs';
import {ControllerAction, ModalUserComponent} from '../../modals/modal-user/modal-user.component';
import {ConfirmStatus} from '../../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent extends ModalUserComponent implements OnInit {

  @Input() booksList: Book[];
  @Output() bookUpdated = new EventEmitter<Book>();
  @Output() bookDeleted = new EventEmitter<Book>();
  @Output() emitConfirmStatus = new EventEmitter<ConfirmStatus>();


  constructor() {
    super();
  }

  ngOnInit() {
  }

  updateBook(book: Book): void {
    this.bookUpdated.emit(book);
  }

  deleteBook(book: Book): void {
    this.bookDeleted.emit(book);
    this.initControllerAction( ControllerAction.Display );
  }

}
