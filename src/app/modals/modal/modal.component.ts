import {AfterViewInit, Component, EventEmitter, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {Subject, Subscription} from 'rxjs';
import {ControllerAction} from '../modal-user/modal-user.component';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export abstract class ModalComponent implements AfterViewInit, OnDestroy {

  private modalChangeSubscriptions: Subscription[];

  @ViewChild('modalRef') protected modalRef: TemplateRef<ModalComponent>;
  @Output() afterViewInit = new EventEmitter <Subject<ControllerAction>>();

  private controllerSub: Subscription;
  private modalPointer: BsModalRef;
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
    // Sending an subject to a parent,
    // which would be a controller of the Modal
    // so that the parent and the child have control
    const controller: Subject<ControllerAction> = new Subject<ControllerAction>();
    this.afterViewInit.emit(controller);
    return controller;
  }

  protected subscribeUpdates(controller: Subject<ControllerAction>): void {

    this.modalChangeSubscriptions = [];

    this.controllerSub = controller.subscribe( (action: ControllerAction) => {
      this.controllerInitAction(action);
    },
      err => console.error('An error occurred while receiving controller instructions', err));

    // Subscribing to modals toggle between states
    const onHiddenSub: Subscription = this.modalService.onHidden.subscribe( reason => this.onModalHidden(reason));
    const onShownSub: Subscription = this.modalService.onShow.subscribe( reason => this.onModalDisplay(reason));
    this.modalChangeSubscriptions.push(onHiddenSub, onShownSub);
  }

  protected unsubscribeUpdates(): void {
    this.controllerSub.unsubscribe();
    this.modalChangeSubscriptions.forEach( subscription => subscription.unsubscribe() );
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

  // methods to be used by the inheriting child
  protected onModalHidden(reason: string): void {
  }
  protected onModalDisplay(reason: string): void {
  }


}
