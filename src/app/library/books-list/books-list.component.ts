import {Component, Input, OnInit} from '@angular/core';
import {Book} from './book/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  @Input() booksList: Book[];

  constructor() { }

  ngOnInit() {
  }

}
