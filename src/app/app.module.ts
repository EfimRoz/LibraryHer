import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { BookComponent } from './library/book/book.component';
import { EditModalComponent } from './library/edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    BookComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
