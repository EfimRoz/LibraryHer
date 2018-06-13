import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

export enum ControllerAction {Display, Hide, BadTitleError};


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit, OnDestroy {

  private modalController: Subject<ControllerAction>;


  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  protected storeController(modalController: Subject<ControllerAction>): void {
    this.modalController = modalController;
  }

  protected initControllerAction(controllerAction: ControllerAction): void {
    this.modalController.next(controllerAction);
  }

  private unsubscribe(): void {
    if (this.modalController) {
      this.modalController.unsubscribe();
    }
  }

}
