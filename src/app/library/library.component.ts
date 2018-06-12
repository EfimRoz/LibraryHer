import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Book} from './books-list/book/book.model';
import {BookService} from './service/book.service';
import {Subject, Subscription} from 'rxjs';
import {ControllerAction, ControllerService} from './edit-modal/utilities/controller.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {

  private booksList: Book[];
  private updatesSubscription: Subscription;
  private modalController: Subject<ControllerAction>;
  editBook: Book;
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
    this.initNewBook();
  }

  getBooksList(): void {
    this.bookService.requestBooksList().subscribe( (booksList: Book[]) => {
      this.booksList = booksList;
      console.log('managed to get booksList');
    });
  }

  addNewBook(): void {
    this.initControllerAction(ControllerAction.Display);
  }
  initNewBook(): void {
    this.inputDate = new Date();
    this.editBook = new Book('', this.inputDate, '');
  }
  updatesSubscribe(): void {
    this.updatesSubscription = this.bookService.booksListUpdate.subscribe( booksList => {
      this.booksList = booksList;
    });
  }
  storeController(modalController: Subject<ControllerAction>): void {
    this.modalController = modalController;
  }

  onModalInputReceived(book: Book): void {
    console.log('saving new book:', book);
    this.bookService.addNewBook(book);
    this.initControllerAction(ControllerAction.Hide);
  }

  onBookUpdate(book: Book): void {
    console.log('book update!', book);
    this.editBook.copy(book);
    console.log('book update2', this.editBook);
    this.initControllerAction(ControllerAction.Display);
  }

  initControllerAction(controllerAction: ControllerAction): void {
    this.modalController.next(controllerAction);
  }
  updatesUnsubscribe(): void {
    this.updatesSubscription.unsubscribe();
  }
}
