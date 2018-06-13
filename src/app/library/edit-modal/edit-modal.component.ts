import {
  Component, EventEmitter, Input,
  OnDestroy,
  OnInit, Output, TemplateRef, ViewChild,
} from '@angular/core';
import {ControllerService} from './utilities/controller.service';
import {BsModalService, ModalDirective} from 'ngx-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateValidatorDirective} from './utilities/form-validators.directive';
import {ModalComponent} from '../../modals/modal/modal.component';
import {Book, bookFormFields} from '../books-list/book/book.model';
import {Subscription} from 'rxjs';
import {ControllerAction} from '../../modals/modal-user/modal-user.component';



@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  providers: [DateValidatorDirective],
})


export class EditModalComponent extends ModalComponent implements OnInit, OnDestroy {


  // @ViewChild(ModalDirective) protected modalRef: ModalDirective;
  // @ViewChild('modal') protected modalRef: TemplateRef<ModalComponent>;
  @Input() objToEdit: Book;
  @Output() modalInputReceived = new EventEmitter<Book>();
  @Output() nullifyObjToEdit = new EventEmitter();

  private bookForm: FormGroup;
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
      if ( controlName === bookFormFields.date ) {
        const dateString = this.formatDate(this.objToEdit.date);
        console.log('setting the date value:', dateString);
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

    const strDate: string = this.bookForm.controls[bookFormFields.date].value;

    const authorName = this.bookForm.controls[bookFormFields.author].value;
    const publishYear = new Date( strDate );
    const bookName = this.bookForm.controls[bookFormFields.title].value;



    const newBook = new Book(authorName, publishYear, bookName);

    this.modalInputReceived.emit(newBook);
    // this.nullifyFormValue();

  }
  nullifyFormValue(): void {
    // Itteranting over all the keys of bookFormFields
    // (his own fields only, no inherited keys)
    for ( const bookFormField of Object.keys(bookFormFields)) {
      this.bookForm.controls[bookFormField].reset();
    }
  }
  protected onHidden(reason: any): void {
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
  inputBlur(toolTip: any, elInput: Element): void {
    const formControlName  = elInput.getAttribute("formcontrolname");
    ( this.bookForm.controls[formControlName].invalid) ? toolTip.show() : toolTip.hide();
  }

}
