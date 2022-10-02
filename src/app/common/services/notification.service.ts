import { Injectable } from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NotificationComponent} from "../notification/notification.component";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private myModal: NgbModalRef;

  constructor(
    private modal: NgbModal,
  ) { }

  public open(type: string, message: string) {
    if (this.myModal !== undefined) {
      this.myModal.dismiss();
    }
    this.myModal = this.modal.open(NotificationComponent, {
      size: 'lg',
      centered: false,
      container: 'body',
      animation: true,
      keyboard: true,
      backdropClass: 'bg-light-transparent'
    });
    this.myModal.componentInstance.type = type;
    this.myModal.componentInstance.message = message;
  }

  public close() {
    this.myModal.dismiss();
  }
}
