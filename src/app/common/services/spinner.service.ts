import { Injectable } from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SpinnersComponent} from "../spinners/spinners.component";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private myModal: NgbModalRef;

  constructor(
    private modal: NgbModal,
  ) { }

  public loading() {
    if (this.myModal !== undefined) {
      this.myModal.dismiss();
    }
    this.myModal = this.modal.open(SpinnersComponent, {backdrop: 'static', centered: true, container: 'body'});
  }

  public close() {
    this.myModal.dismiss();
  }
}
