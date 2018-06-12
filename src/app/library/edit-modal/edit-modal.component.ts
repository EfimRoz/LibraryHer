import {
  Component, EventEmitter, Input,
  OnDestroy,
  OnInit, Output, TemplateRef,
} from '@angular/core';
import {ControllerAction, ControllerService} from './utilities/controller.service';
import {BsModalService, TooltipDirective} from 'ngx-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateValidatorDirective} from './utilities/form-validators.directive';
import {ModalComponent} from '../../modals/modal/modal.component';
import {Book} from '../books-list/book/book.model';

export enum bookFormFields {
  title = 'title',
  author = 'author',
  date = 'date',
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  providers: [DateValidatorDirective],
})


export class EditModalComponent extends ModalComponent implements OnInit, OnDestroy {

  private bookForm: FormGroup;

  @Input() objToEdit: Book;
  @Output() modalInputReceived = new EventEmitter<Book>();

  constructor( private controllerService: ControllerService,
               protected modalService: BsModalService,
               private dateValidatorDirective: DateValidatorDirective,
               private formBuilder: FormBuilder) {
    super(modalService);
    this.buildBookForm();
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  private buildBookForm(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required ],
      author: ['', Validators.required],
      date: ['', [Validators.required, this.dateValidatorDirective.validate]]
    });

  }

  protected onModalDisplay(): void {
    for (const controlName of Object.keys(bookFormFields)) {
      // console.log('ControlName:', controlName, this.objToEdit);
      if ( controlName !== bookFormFields.date ) {
        this.bookForm.controls[controlName].setValue(this.objToEdit[controlName]);
      } else {
        const dateString = this.formatDate(this.objToEdit.date);
        this.bookForm.controls['date'].setValue(dateString);
      }
      // console.log('Control:', this.bookForm.controls[controlName], 'new value:', this.objToEdit[controlName]);
    }
  }

  private formatDate(date: Date): string {
    let year: string;
    let month: string;
    let dayOfMonth: string;
    if (date) {
      year = `${this.objToEdit.date.getFullYear()}`;
      month = `${this.objToEdit.date.getMonth() + 1}`;
      dayOfMonth = `${this.objToEdit.date.getDate()}`;
      if ( month.length < 2 ) {
        month = `0${month}`;
      }
      if ( dayOfMonth.length < 2 ) {
        dayOfMonth = `0${dayOfMonth}`;
      }
    }
    if ( year && month && year ) {
      const dateString = `${year}-${month}-${dayOfMonth}`;
      return dateString;
    }
    return '';
    }

  save(author: HTMLElement, date: HTMLElement, title: HTMLElement): void {

    if (this.bookForm.invalid) {
      // Invalid input, retry!
      this.touchFormInputs(author, date, title);
      return;
    }

    const authorName = this.bookForm.controls[bookFormFields.author].value;
    const publishYear = this.bookForm.controls[bookFormFields.date].value;
    const bookName = this.bookForm.controls[bookFormFields.title].value;

    const newBook = new Book(authorName, publishYear, bookName);

    this.modalInputReceived.emit(newBook);
    console.log('HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!*@#*(@(#*!@#!@#(*!@#@#!#@#');
    this.nullifyFormValue();

  }

  nullifyFormValue(): void {
    // Itteranting over all the keys of bookFormFields
    // (his own fields only, no inherited keys)
    for ( const bookFormField of Object.keys(bookFormFields)) {
      console.log('nullifiying', bookFormField);
      this.objToEdit[bookFormField] = '';
      this.bookForm.controls[bookFormField].reset();

    }
  }

  touchFormInputs(...inputs: HTMLElement[]): void {
    const inputElements = [ ...inputs];

    inputElements.forEach( (element: HTMLElement) => {
      element.focus();
      element.blur();
    });
  }
  cancel(): void {
    super.controllerInitAction( ControllerAction.Hide);
    this.nullifyFormValue();
  }
  inputBlur(toolTip: any, elInput: Element): void {
    const formControlName  = elInput.getAttribute("formcontrolname");
    ( this.bookForm.controls[formControlName].invalid) ? toolTip.show() : toolTip.hide();
  }

}
