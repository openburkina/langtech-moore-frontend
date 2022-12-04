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

  motif: string;
  formMotif = this.fb.group({
    motif: null,
  });

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onDismiss(param: boolean) {
    this.activeModal.close({
      'param': param,
      'motif': this.formMotif.value.motif,
    });
  }
}
