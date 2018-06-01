import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {ControllerAction, ControllerService} from './utilities/controller.service';
import {Subscription} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateValidatorDirective} from './utilities/form-validators.directive';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  providers: [DateValidatorDirective],
})
export class EditModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: TemplateRef<EditModalComponent>;
  private controllerSub: Subscription;
  private modalPointer: any;
  private bookForm: FormGroup;

  constructor( private controllerService: ControllerService,
               private modalService: BsModalService,
               private dateValidatorDirective: DateValidatorDirective,
               private formBuilder: FormBuilder) {
    this.buildBookForm();
  }

  ngOnInit() {
    this.subscribeUpdates();
  }
  ngAfterViewInit() {

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

  private subscribeUpdates(): void {
    this.controllerSub = this.controllerService.modalController.subscribe(
      (action: ControllerAction) => this.controllerInitAction(action),
      (err) => console.error('Failure in controller subject:', err));
  }

  private controllerInitAction(action: ControllerAction): void {
    switch (action) {
      case ControllerAction.Display:
        console.log('opening:', this.modalRef);
        this.modalPointer = this.modalService.show(this.modalRef);
        break;
      case ControllerAction.Hide:
        this.modalPointer.hide();
        break;
    }
  }

  private hideModal(): void {
    this.controllerService.initAction(ControllerAction.Hide);
  }
}
