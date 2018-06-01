import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './../modal/modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent extends  ModalComponent {

  constructor(protected modalService: BsModalService) {
    super(modalService);
  }


}
