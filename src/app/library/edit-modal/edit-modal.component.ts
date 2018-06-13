import {
  Component, EventEmitter, Input,
  OnDestroy,
  OnInit, Output, } from '@angular/core';
import {BsModalService, TooltipDirective} from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateValidatorDirective} from './utilities/form-validators.directive';
import {ModalComponent} from '../../modals/modal/modal.component';
import {Book} from '../books-list/book/book.model';
import {ControllerAction} from '../../modals/modal-user/modal-user.component';
import {TitleValidatorDirective} from './utilities/title-validator.directive';

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

  // @ViewChild(TooltipDirective) popName: ElementRef;
  @Input() objToEdit: Book;
  @Output() modalInputReceived = new EventEmitter<Book>();
  @Output() nullifyObjToEdit = new EventEmitter();

  private bookForm: FormGroup;

  private titleToolTip = '';
  // private readonly activeToolTips: Subscription[];


  constructor(
                protected modalService: BsModalService,
                private dateValidatorDirective: DateValidatorDirective,
                private titleUniqueValidator: TitleValidatorDirective,
                private formBuilder: FormBuilder) {
    super(modalService);
    // this.titleFieldName = BookFormFields.title;
    this.titleToolTip = titleWarnings.warningEmptyField;
    // this.activeToolTips = [];
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
      // console.log('ControlName:', controlName, this.objToEdit);
      if ( controlName === BookFormFields.date ) {
        const dateString = this.formatDate(this.objToEdit.date);
        // console.log('setting the date value:', dateString);
        this.bookForm.controls['date'].setValue(dateString);
      } else {
        this.bookForm.controls[controlName].setValue(this.objToEdit[controlName]);
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

    const strDate: string = this.bookForm.controls[BookFormFields.date].value;

    const authorName = this.bookForm.controls[BookFormFields.author].value;
    const publishYear = new Date( strDate );
    const bookName = this.bookForm.controls[BookFormFields.title].value;



    const newBook = new Book(authorName, publishYear, bookName);

    this.modalInputReceived.emit(newBook);
    // this.nullifyFormValue();

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
      if ( errors ) {
        if (errors.duplicateTitle ) {
          titleToolTip = titleWarnings.warningExistingTitle;
        } else if ( errors.required) {
          titleToolTip = titleWarnings.warningEmptyField;
        }
      }
      toolTip.tooltip = titleToolTip;
    }
    if ( this.bookForm.controls[formControlName].invalid) {
      const observable: EventEmitter = toolTip.tooltipChange;
      const sub = observable.subscribe(change => {
        toolTip.show();
      }, err => console.error('Crashed while waiting for change in the forms:', err));

      // observable.next(this.titleToolTip);

      console.log('before observable', observable, 'after:', toolTip.tooltipChange);
      // this.activeToolTips.push(sub);
      console.log('showing Tool Tip');
      toolTip.show();
    } else {
      toolTip.hide();
    }


  }

}
