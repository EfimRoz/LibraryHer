import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { EditModalComponent } from './library/edit-modal/edit-modal.component';
import { BooksListComponent } from './library/books-list/books-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { DateValidatorDirective } from './library/edit-modal/utilities/form-validators.directive';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TitleFormatPipe } from './pipes/title-format.pipe';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { ModalUserComponent } from './modals/modal-user/modal-user.component';
import { TitleValidatorDirective } from './library/edit-modal/utilities/title-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    EditModalComponent,
    BooksListComponent,
    DateValidatorDirective,
    ErrorModalComponent,
    TitleFormatPipe,
    ConfirmModalComponent,
    ModalUserComponent,
    TitleValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  entryComponents: [
    EditModalComponent,
    LibraryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
