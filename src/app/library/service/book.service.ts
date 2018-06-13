import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Book} from '../books-list/book/book.model';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly realBooksList: Book[];

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

  public addNewBook( newBook: Book, oldBook: Book ): void {

    const copyNewBook: Book = newBook.clone();
    if (oldBook.title === null) {
      // If its a new book
      this.addBook(copyNewBook);
    } else {
      // If it was edit all along
      this.replaceBook(oldBook, newBook);
    }
    this.updateBookList();
  }

  public titleExists(title: string): boolean {
    const sameTitleIndex =  this.realBooksList.findIndex( book => book.title === title);
    // Returns if this expression true
    // -1 means invalid index(item not found)
    return (sameTitleIndex !== -1);
  }

  private addBook( bookToAdd: Book): void {
    if (this.titleExists(bookToAdd.title)) {
      throw new Error('The title already exists!');
    } else {
      this.realBooksList.push(bookToAdd);
    }
  }

  public deleteBook( bookToDel: Book ): void {

    this.removeBook(bookToDel);

    this.updateBookList();
  }

  private removeBook( bookToDel): void {
    const delIndex = this.realBooksList.findIndex( book => book.title === bookToDel.title);
    this.realBooksList.splice(delIndex, 1);
  }

  private replaceBook( bookToReplace: Book, newBook: Book): void {
    const copyNewBook: Book = newBook.clone();
    const delIndex = this.realBooksList.findIndex( book => book.title === bookToReplace.title);
    this.realBooksList.splice(delIndex, 1, copyNewBook);
  }

  private updateBookList(): void {
    const copyBookList = this. copyBooksList( this.realBooksList );
    this.booksListUpdate.next(copyBookList);
  }
}
