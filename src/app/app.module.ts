import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { BookComponentDirective } from './library/books-list/book/book-component.directive';
import { EditModalComponent } from './library/edit-modal/edit-modal.component';
import { BooksListComponent } from './library/books-list/books-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { DateValidatorDirective } from './library/edit-modal/utilities/form-validators.directive';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { ModalComponent } from './modals/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    BookComponentDirective,
    EditModalComponent,
    BooksListComponent,
    DateValidatorDirective,
    ErrorModalComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
