import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../books-list/book/book.model';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient) { }

  requestBooksList(): Observable<Book[]> {
    const remoteAddress = environment.remoteAddress + 'books/';
    return this.http.get<Book[]>(remoteAddress);

  }
}
