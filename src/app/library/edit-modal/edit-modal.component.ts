import {
  Component, EventEmitter, Input,
  OnDestroy,
  OnInit, Output, TemplateRef,
} from '@angular/core';
import {BsModalService, TooltipDirective} from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateValidatorDirective} from './utilities/form-validators.directive';
import {ModalComponent} from '../../modals/modal/modal.component';
import {Book} from '../books-list/book/book.model';
import {ControllerAction} from '../../modals/modal-user/modal-user.component';
import {TitleValidatorDirective} from './utilities/title-validator.directive';
import {Subscription} from 'rxjs';

export enum BookFormFields {
  title = 'title',
  author = 'author',
  date = 'date',
}

export enum titleWarnings {
  warningExistingTitle = 'Title already exists, pick another name',
  warningEmptyField = 'No value is given'
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  providers: [DateValidatorDirective, TitleValidatorDirective],
})

export class EditModalComponent extends ModalComponent implements OnInit, OnDestroy {

  @Input() objToEdit: Book;
  @Output() modalInputReceived = new EventEmitter<Book>();
  @Output() nullifyObjToEdit = new EventEmitter();

  private bookForm: FormGroup;

  constructor(
                protected modalService: BsModalService,
                private dateValidatorDirective: DateValidatorDirective,
                private titleUniqueValidator: TitleValidatorDirective,
                private formBuilder: FormBuilder) {
    super(modalService);
  }

  ngOnInit() {
    this.buildBookForm();
  }

  ngOnDestroy() {

  }

  private buildBookForm(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, this.titleUniqueValidator.uniqueValidator(this.objToEdit).bind(this.titleUniqueValidator)]],
      author: ['', Validators.required],
      date: ['', [Validators.required, this.dateValidatorDirective.validate]]
    });

  }

  protected onModalDisplay(): void {
    for (const controlName of Object.keys(BookFormFields)) {

      if ( controlName === BookFormFields.date ) {
        const dateString = this.formatDate(this.objToEdit.date);
        this.bookForm.controls['date'].setValue(dateString);

      } else {
        this.bookForm.controls[controlName].setValue(this.objToEdit[controlName]);
      }
    }
  }

  private formatDate(date: Date): string {
    // Creating special format string
    // For the HTML date picker.
    let year: string;
    let month: string;
    let dayOfMonth: string;
    if (date) {
      year = `${this.objToEdit.date.getFullYear()}`;
      month = `${this.objToEdit.date.getMonth() + 1}`;
      dayOfMonth = `${this.objToEdit.date.getDate()}`;
      if ( month.length < 2 ) {
        // Adding 0 before single digit
        // For better experience
        month = `0${month}`;
      }
      if ( dayOfMonth.length < 2 ) {
        dayOfMonth = `0${dayOfMonth}`;
      }
    }
    if ( year && month && year ) {
      // The format I was able to work with:
      // yyyy-MM-dd
      const dateString = `${year}-${month}-${dayOfMonth}`;
      return dateString;
    }
    // No date? send an empty string to
    // display empty date picker
    return '';
    }

  save(author: HTMLElement, date: HTMLElement, title: HTMLElement): void {

    if (this.bookForm.invalid) {
      // Invalid input, retry!
      this.touchFormInputs(author, date, title);
      return;
    }

    const strDate: string = this.bookForm.controls[BookFormFields.date].value;

    const authorName = this.bookForm.controls[BookFormFields.author].value;
    const publishYear = new Date( strDate );
    const bookName = this.bookForm.controls[BookFormFields.title].value;

    const newBook = new Book(authorName, publishYear, bookName);

    this.modalInputReceived.emit(newBook);
  }

  nullifyFormValue(): void {
    // Itteranting over all the keys of BookFormFields
    // (his own fields only, no inherited keys)
    for ( const bookFormField of Object.keys(BookFormFields)) {
      this.bookForm.controls[bookFormField].reset();
    }
  }

  protected onModalHidden(reason: any): void {
    this.nullifyObjToEdit.emit();
    this.nullifyFormValue();
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
  }

  inputBlur(toolTip: TooltipDirective, elInput: Element): void {

    const formControlName  = elInput.getAttribute('formcontrolname');
    let titleToolTip: string;

    if ( formControlName === BookFormFields.title) {
      const errors = this.bookForm.controls[BookFormFields.title].errors;
      if (errors) {
        console.log('errors:', errors);
        for ( const error of Object.keys(errors) ) {
          switch (error) {
            case 'duplicateTitle':
              console.log( this.bookForm.controls[BookFormFields.title]);
              titleToolTip = titleWarnings.warningExistingTitle;
              break;
            case 'required':
              titleToolTip = titleWarnings.warningEmptyField;
              break;
          }
          toolTip.tooltip = titleToolTip;
        }
      }
    }

    if ( this.bookForm.controls[formControlName].invalid) {
      const observable: EventEmitter<string | TemplateRef<any>> = toolTip.tooltipChange;
      const sub: Subscription = observable.subscribe(() => {
        toolTip.show();
        sub.unsubscribe();
      }, err => console.error('Crashed while waiting for change in the forms:', err));

      toolTip.show();
    } else {
      toolTip.hide();
    }
  }
}
