import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControllerAction, ControllerService} from './controller.service';
import {Subscription} from 'rxjs';
import {BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
  // providers: [NgbActiveModal]
})
export class EditModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: TemplateRef<EditModalComponent>;
  private controllerSub: Subscription;
  private  modalPointer: any;
  constructor( private controllerService: ControllerService,
               private modalService: BsModalService) { }

  ngOnInit() {
    this.subscribeUpdates();
  }
  ngAfterViewInit() {

  }
  ngOnDestroy() {

  }
  subscribeUpdates(): void {
    this.controllerSub = this.controllerService.modalController.subscribe(
      (action: ControllerAction) => this.controllerInitAction(action),
      (err) => console.error('Failure in controller subject:', err));
  }
  controllerInitAction(action: ControllerAction): void {
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

  hideModal(): void {
    this.controllerService.initAction(ControllerAction.Hide);
  }
}
