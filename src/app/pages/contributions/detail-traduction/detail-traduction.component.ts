import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../models/traduction.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detail-traduction',
  templateUrl: './detail-traduction.component.html',
  styleUrls: ['./detail-traduction.component.scss']
})
export class DetailTraductionComponent implements OnInit {
  traduction: Traduction;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  onCloseModal() {
    this.activeModal.close();
  }

  onValideTraduction(type: string) {
    
  }
}
