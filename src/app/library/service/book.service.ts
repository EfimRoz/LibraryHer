import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Book} from '../books-list/book/book.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private realBooksList: Book[];

  constructor( private httpService: HttpService) {
    this.realBooksList = [];
  }

  getBooksList(): Observable<Book[]> {
    return this.httpService.requestBooksList().pipe( map((newBooksList: Book[]) => {
      newBooksList.forEach( (book: Book) => {
        book.date = new Date(book.date);
        const newBook = new Book(book.author, book.date, book.title);
        this.realBooksList.push(newBook);
        console.log('here', this.realBooksList);
      });
      return this.realBooksList;
    },
    (err) => {
      console.error('Failed to extract books list with the error:', err);
    }));

  }
}
