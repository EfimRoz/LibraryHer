import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from './books-list/book/book.model';
import {BookService} from './service/book.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {

  private booksList: Book[];
  private updatesSubscription: Subscription;

  ngOnInit() {
    this.getBooksList();
    this.updatesSubscribe();
  }
  ngOnDestroy() {
    this.updatesUnsubscribe();
  }
  constructor( private bookService: BookService) { }

  getBooksList(): void {
    this.bookService.requestBooksList().subscribe( (booksList: Book[]) => {
      this.booksList = booksList;
      console.log('managed to get booksList');
    });
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
