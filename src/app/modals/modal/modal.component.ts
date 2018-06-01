import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {Subject, Subscription} from 'rxjs';
import {ControllerAction} from '../../library/edit-modal/utilities/controller.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export abstract class ModalComponent implements AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: TemplateRef<ModalComponent>;
  @Output() afterViewInit = new EventEmitter <Subject<ControllerAction>>();

  private controllerSub: Subscription;
  private modalPointer: any;
  protected modalService: BsModalService;

  protected constructor( receivedModalService: BsModalService ) {
    this.modalService = receivedModalService;
  }

  ngAfterViewInit() {
    const controller = this.sendControllerSub();
    this.subscribeUpdates(controller);
  }
  ngOnDestroy() {
    this.unsubscribeUpdates();
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

  protected unsubscribeUpdates(): void {
    this.controllerSub.unsubscribe();
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
