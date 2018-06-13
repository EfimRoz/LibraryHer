import { Component, OnInit } from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent extends ModalComponent implements OnInit {

  constructor(protected modalService: BsModalService) {
    super(modalService);
  }

  ngOnInit() {
  }

}
