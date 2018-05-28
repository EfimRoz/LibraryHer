import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Book} from './books-list/book/book.model';
import {BookService} from './service/book.service';
import {Subscription} from 'rxjs';
import {ControllerAction, ControllerService} from './edit-modal/controller.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {

  private booksList: Book[];
  private updatesSubscription: Subscription;
  @ViewChild('modal') modalRef: any;

  ngOnInit() {
    this.getBooksList();
    this.updatesSubscribe();
  }
  ngOnDestroy() {
    this.updatesUnsubscribe();
  }
  constructor( private bookService: BookService,
               private controllerService: ControllerService) {}

  getBooksList(): void {
    this.bookService.requestBooksList().subscribe( (booksList: Book[]) => {
      this.booksList = booksList;
      console.log('managed to get booksList');
    });
  }
  addNewBook(): void {
    console.log("before open...")
    // this.tempTest = this.modalService.open(EditModalComponent);
    // this.tempTest.result.then( val => console.log('we won', val),
    //                   err => console.error('Failed to add a new book:', err));

    this.controllerService.initAction(ControllerAction.Display);
  }

  updatesSubscribe(): void {
    this.updatesSubscription = this.bookService.booksListUpdate.subscribe( booksList => {
      this.booksList = booksList;
    });
  }
  updatesUnsubscribe(): void {
    this.updatesSubscription.unsubscribe();
  }
}
