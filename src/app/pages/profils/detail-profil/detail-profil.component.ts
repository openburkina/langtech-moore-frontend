import {Component, Input, OnInit} from '@angular/core';
import {Profil} from "../../../models/profil.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrls: ['./detail-profil.component.scss']
})
export class DetailProfilComponent implements OnInit {
  @Input() profil: Profil;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  onDismiss(b: boolean) {
    this.activeModal.close(b);
  }

}
