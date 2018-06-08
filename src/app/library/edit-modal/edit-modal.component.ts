import {
  Component, EventEmitter,
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
  bookName = 'bookName',
  authorName = 'authorName',
  publishYear = 'publishYear',
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  providers: [DateValidatorDirective],
})


export class EditModalComponent extends ModalComponent implements OnInit, OnDestroy {

  private bookForm: FormGroup;

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
      bookName: ['', Validators.required ],
      authorName: ['', Validators.required],
      publishYear: ['', [Validators.required, this.dateValidatorDirective.validate]]
    });

  }

  private onFormStatusChange(control: AbstractControl) {

  }

  save(author: HTMLElement, date: HTMLElement, title: HTMLElement): void {

    if (this.bookForm.invalid) {
      // Invalid input, retry!
      console.error('this.bookForm.', this.bookForm);
      this.touchFormInputs(author, date, title);
      return;
    }

    const authorName = this.bookForm.controls[bookFormFields.authorName].value;
    const publishYear = this.bookForm.controls[bookFormFields.publishYear].value;
    const bookName = this.bookForm.controls[bookFormFields.bookName].value;

    const newBook = new Book(authorName, publishYear, bookName);

    this.modalInputReceived.emit(newBook);
    this.nullifyFormValue();

  }

  nullifyFormValue(): void {
    // Itteranting over all the keys of bookFormFields
    // (his own fields only, no inherited keys)
    for ( const bookFormField of Object.keys(bookFormFields)) {
      console.log('bookformFiled:', bookFormField, 'contolr:', this.bookForm.controls[bookFormField]);
      // this.bookForm.controls[bookFormField].setValue('');
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
