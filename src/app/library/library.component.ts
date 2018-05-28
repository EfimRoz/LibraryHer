import { Component, OnInit } from '@angular/core';
import {Book} from './books-list/book/book.model';
import {BookService} from './service/book.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  private booksList: Book[];

  ngOnInit() {
    this.getBooksList();
  }
  constructor( private bookService: BookService) { }

  getBooksList() {
    this.bookService.getBooksList().subscribe( (booksList: Book[]) => {
      this.booksList = booksList;
      console.log('managed to get booksList');
    });
  }

}
