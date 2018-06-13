import {Component, EventEmitter, Output} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {BsModalService} from 'ngx-bootstrap';
import {ControllerAction} from '../modal-user/modal-user.component';

export enum ConfirmStatus {
  Fail,
  Success
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent extends ModalComponent {

  @Output() confirmStatus = new EventEmitter<ConfirmStatus>();

  constructor(protected modalService: BsModalService) {
    super(modalService);
  }

  confirm(): void {
    this.emitConfirmStatus( ConfirmStatus.Success );
  }

  decline(): void {
    this.emitConfirmStatus( ConfirmStatus.Fail );
  }

  private emitConfirmStatus( confirmStatus: ConfirmStatus): void {
    this.confirmStatus.emit(confirmStatus);
    super.controllerInitAction( ControllerAction.Hide);
  }

}

