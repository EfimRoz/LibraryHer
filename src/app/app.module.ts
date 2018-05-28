import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { BookComponentDirective } from './library/books-list/book/book-component.directive';
import { EditModalComponent } from './library/edit-modal/edit-modal.component';
import { BooksListComponent } from './library/books-list/books-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    BookComponentDirective,
    EditModalComponent,
    BooksListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [
    EditModalComponent,
    LibraryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
