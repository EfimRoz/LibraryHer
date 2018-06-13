import {Component, OnDestroy, OnInit, } from '@angular/core';
import {Book} from './books-list/book/book.model';
import {BookService} from './service/book.service';
import {Subscription} from 'rxjs';
import {ControllerAction, ModalUserComponent} from '../modals/modal-user/modal-user.component';
import {ConfirmStatus} from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent extends ModalUserComponent implements OnInit, OnDestroy {

  private booksList: Book[];
  private updatesSubscription: Subscription;
  editBook: Book;

  ngOnInit() {
    this.getBooksList();
    this.updatesSubscribe();
  }
  ngOnDestroy() {
    this.updatesUnsubscribe();
  }
  constructor( private bookService: BookService ) {
    super();
    this.initNewBook();
  }

  getBooksList(): void {
    this.bookService.requestBooksList().subscribe( (booksList: Book[]) => {
      this.booksList = booksList;
    });
  }

  initAddNewBook(): void {
    this.initControllerAction(ControllerAction.Display);
  }

  initNewBook(): void {
    this.editBook = new Book(null, null, null);
  }

  updatesSubscribe(): void {
    this.updatesSubscription = this.bookService.booksListUpdate.subscribe( booksList => {
      this.booksList = booksList;
    });
  }

  onModalInputReceived(book: Book): void {
    // Where you receive answer from the edit modal
    // (A new book or an edited one which should be replaced)
    if (this.bookService.titleExists(book.title)) {
      // Bad name
      this.initControllerAction(ControllerAction.BadTitleError);
    } else {
      this.bookService.addNewBook(book, this.editBook);
      this.initControllerAction(ControllerAction.Hide);
    }

  }

  onBookUpdate(book: Book): void {
    this.editBook.copy(book);
    this.initControllerAction(ControllerAction.Display);
  }

  bookDeleteRequest(book: Book): void {
    // Marking the book for deletion,
    // once the user interacts with the
    // modal, emitConfirmStatus should take
    // care of all that left
    this.editBook = book.clone();
  }

  emitConfirmStatus(confirmStatus: ConfirmStatus) {
    switch (confirmStatus) {
      case ConfirmStatus.Success:
        this.bookService.deleteBook(this.editBook);
        break;
      case ConfirmStatus.Fail:
        break;
    }
  }

  updatesUnsubscribe(): void {
    this.updatesSubscription.unsubscribe();
  }

}
