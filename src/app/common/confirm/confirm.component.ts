import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() message: string;

  constructor(
    private activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
  }

  onDismiss(param: boolean) {
    this.activeModal.close(param);
  }

}
