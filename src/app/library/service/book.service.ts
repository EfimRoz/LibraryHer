import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Book} from '../books-list/book/book.model';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private realBooksList: Book[];

  public booksListUpdate: Subject<Book[]>;

  constructor( private httpService: HttpService) {
    this.realBooksList = [];
    this.booksListUpdate = new Subject<Book[]>();
  }

  copyBooksList(booksList: Book[]): Book[] {
    const copyBooksList: Book[] = [];

    booksList.forEach( (book: Book) => {
      const copyBook = book.clone();
      copyBooksList.push(copyBook);
    });
    return copyBooksList;
  }

  requestBooksList(): Observable<Book[]> {
    return this.httpService.requestBooksList().pipe( map((newBooksList: Book[]) => {
      newBooksList.forEach( (book: Book) => {
        let date: Date;
        try {
          date = new Date(book.date);
        } catch (e) {
          date = null;
        }
        const newBook = new Book(book.author, date, book.title);
        this.realBooksList.push(newBook);
      });
      return this.copyBooksList(this.realBooksList);
    },
    (err) => {
      console.error('Failed to extract books list with the error:', err);
    }));
  }

  public addNewBook( newBook: Book ): void {
    const copyNewBook: Book = newBook.clone();
    this.realBooksList.push(copyNewBook);
    this.updateBookList();
  }

  public deleteBook( bookToDel: Book ): void {
    const delIndex = this.realBooksList.findIndex( book => book.title === bookToDel.title);
    this.realBooksList.splice(delIndex, 1);
    console.log('deleting the book:', this.realBooksList);

    this.updateBookList();
  }

  private updateBookList(): void {
    const copyBookList = this. copyBooksList( this.realBooksList );
    this.booksListUpdate.next(copyBookList);
  }
}
