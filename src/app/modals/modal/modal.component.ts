import {AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {Subject, Subscription} from 'rxjs';
import {ControllerAction} from '../../library/edit-modal/utilities/controller.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export abstract class ModalComponent implements AfterViewInit {

  @ViewChild('modal') modalRef: TemplateRef<ModalComponent>;
  @Output() afterViewInit = new EventEmitter <Subject<ControllerAction>>();

  private controllerSub: Subscription;
  private modalPointer: any;
  protected modalService: BsModalService;

  protected constructor( recivedModalService: BsModalService ) {
    this.modalService = recivedModalService;
  }

  ngAfterViewInit() {
    const controller = this.sendControllerSub();
    this.subscribeUpdates(controller);
  }
  protected sendControllerSub(): Subject<ControllerAction> {
    const controller: Subject<ControllerAction> = new Subject<ControllerAction>();
    this.afterViewInit.emit(controller);
    return controller;
  }
  protected subscribeUpdates(controller: Subject<ControllerAction>): void {
    this.controllerSub = controller.subscribe( (action: ControllerAction) => {
      this.controllerInitAction(action);
    },
      err => console.error('An error occurred while receiving controller instructions'));
  }

  protected controllerInitAction(action: ControllerAction): void {
    switch (action) {
      case ControllerAction.Display:
        this.modalPointer = this.modalService.show(this.modalRef);
        break;
      case ControllerAction.Hide:
        this.modalPointer.hide();
        break;
    }
  }


}
