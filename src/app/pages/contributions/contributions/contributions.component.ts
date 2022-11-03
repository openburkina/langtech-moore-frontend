import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../models/traduction.model";
import {ContributionService} from "../contribution.service";
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailTraductionComponent} from "../detail-traduction/detail-traduction.component";

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {
  traductions$: Observable<Traduction[]>;

  constructor(
    private contributionService: ContributionService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.traductions$ = this.contributionService.traductions$;
  }

  getTraductions() {

  }

  async onShowDetailTraduction(t: Traduction) {
    const currentModal = await this.modal.open(DetailTraductionComponent, { size: "lg", backdrop: "static", centered: true});
    currentModal.componentInstance.traduction = t;
  }
}
