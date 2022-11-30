import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-rejet-with-motif',
  templateUrl: './rejet-with-motif.component.html',
  styleUrls: ['./rejet-with-motif.component.scss']
})
export class RejetWithMotifComponent implements OnInit {
  @Input() message: string;

  motif: any;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onDismiss(param: boolean) {
    this.activeModal.close(param);
  }

  getSourceInfo() {

  }
}
