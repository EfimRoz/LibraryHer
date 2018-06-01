import {
  AfterViewInit,
  Component, ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {ControllerAction, ControllerService} from './utilities/controller.service';
import {BsModalService, TooltipDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateValidatorDirective} from './utilities/form-validators.directive';
import {ModalComponent} from '../../modals/modal/modal.component';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  providers: [DateValidatorDirective],
})
export class EditModalComponent extends ModalComponent implements OnInit, OnDestroy {

  // @ViewChild('modal') modalRef: TemplateRef<EditModalComponent>;
  private bookForm: FormGroup;
  toolTipMessage = "Bad format";
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

  save(): void {
    console.log('this.bookForm.', this.bookForm.controls.publishYear);
    // if(this.bookForm.controls.publishYear.validator)
  }
  inputBlur(toolTip: any, elInput: Element): void {
    const formControlName  = elInput.getAttribute("formcontrolname");
    ( this.bookForm.controls[formControlName].invalid) ? toolTip.show() : toolTip.hide();
  }
  private hideModal(): void {
    this.controllerService.initAction(ControllerAction.Hide);
  }
}
