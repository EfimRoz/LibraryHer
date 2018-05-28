import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';

export enum ControllerAction {Display, Hide};

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  public readonly modalController: Subject<ControllerAction> = new Subject<ControllerAction>();
  private controllerSubscription: Subscription;
  constructor() {
    this.subscribeController();
  }
  subscribeController(): void {
    this.controllerSubscription = this.modalController.subscribe( (command: ControllerAction) => {
      switch (command) {
        case ControllerAction.Display:
          break;
        case ControllerAction.Hide:
          break;
      }
    });
  }
  initAction(action: ControllerAction): void {
    this.modalController.next(action);
  }

}
