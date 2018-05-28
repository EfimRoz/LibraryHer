import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { BookComponent } from './library/books-list/book/book.component';
import { EditModalComponent } from './library/edit-modal/edit-modal.component';
import { BooksListComponent } from './library/books-list/books-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    BookComponent,
    EditModalComponent,
    BooksListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
