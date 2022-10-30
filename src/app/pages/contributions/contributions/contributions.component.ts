import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../models/traduction.model";
import {ContributionService} from "../contribution.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {
  traductions$: Observable<Traduction[]>;

  constructor(
    private contributionService: ContributionService,
  ) { }

  ngOnInit(): void {
    this.traductions$ = this.contributionService.traductions$;
  }

  getTraductions() {

  }
}
