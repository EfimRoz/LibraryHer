import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService, ModalDirective} from 'ngx-bootstrap';
import {Subject, Subscription} from 'rxjs';
import {ControllerAction} from '../modal-user/modal-user.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export abstract class ModalComponent implements AfterViewInit, OnDestroy {

  private modalChangeSubscriptions: Subscription[];

  @ViewChild('modalRef') protected modalRef: TemplateRef<ModalComponent>;
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

    this.modalChangeSubscriptions = [];

    this.controllerSub = controller.subscribe( (action: ControllerAction) => {
      console.log('action to init:', action);
      this.controllerInitAction(action);
    },
      err => console.error('An error occurred while receiving controller instructions'));


    const onHiddenSub: Subscription = this.modalService.onHidden.subscribe( reason => this.onHidden(reason));
    const onShownSub: Subscription = this.modalService.onShow.subscribe( reason => this.onModalDisplay(reason))
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
        console.log('this.modelRef :', this.modalRef);
        // this.modalRef.show();
        break;
      case ControllerAction.Hide:
        this.modalPointer.hide();
        break;
    }
  }

  protected onHidden(reason: string): void {
  }
  protected onModalDisplay(reason: string): void {

  }


}
