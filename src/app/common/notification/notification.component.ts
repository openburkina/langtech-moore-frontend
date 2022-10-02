import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() type: string;
  @Input() message: string;
  timer = 3;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.callTime();
  }

  callTime() {
    setTimeout( () => {
      this.timer -= 1;
      if (this.timer > 0) {
        this.callTime();
      } else {
        this.close();
      }
    }, 1000);
  }

  public close() {
    this.activeModal.close();
  }
}
