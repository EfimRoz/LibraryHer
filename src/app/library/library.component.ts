import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Book} from './books-list/book/book.model';
import {BookService} from './service/book.service';
import {Subject, Subscription} from 'rxjs';
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
  editBook: Book = new Book(null, null, null);
  private inputDate: Date;
  // @ViewChild('modal') modalRef: any;

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
      // console.log('managed to get booksList');
    });
  }

  addNewBook(): void {
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
    try {
      this.bookService.addNewBook(book, this.editBook);
      this.initControllerAction(ControllerAction.Hide);
    } catch (e) {
      // Bad name
      this.initControllerAction(ControllerAction.BadTitleError);
    }

  }

  onBookUpdate(book: Book): void {
    // console.log('book update!', book);

    this.editBook.copy(book);

    // console.log('book update2', this.editBook);

    this.initControllerAction(ControllerAction.Display);
  }

  onBookDelete(book: Book): void {
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
    // this.initNewBook();
  }
  // onHidden(event: ModalDirective): void {
  //   console.log('YAY!!!!!!!:', event)
  // }

  updatesUnsubscribe(): void {
    this.updatesSubscription.unsubscribe();
  }
}
