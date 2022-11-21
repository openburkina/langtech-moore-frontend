import { Component, OnInit } from '@angular/core';
import {SourceDonnee} from "../../../../models/sourceDonnee.model";
import {Traduction} from "../../../../models/traduction.model";
import {ActivatedRoute} from "@angular/router";
import {ContributionService} from "../../../contributions/contribution.service";

@Component({
  selector: 'app-detail-source-donnee',
  templateUrl: './detail-source-donnee.component.html',
  styleUrls: ['./detail-source-donnee.component.scss']
})
export class DetailSourceDonneeComponent implements OnInit {
  sourceDonnee: SourceDonnee = new SourceDonnee();
  traductions: Traduction[] = [];
   srcId: number;

  constructor(private activedRoute: ActivatedRoute,
              private contributionService: ContributionService) { }

  ngOnInit(): void {
    this.srcId = +this.activedRoute.snapshot.paramMap.get('id');
    this.getContributionBySource(this.srcId);
  }

  fermer(): void {

  }

  getContributionBySource(srcId: number) {
    this.contributionService.getContributionBySource(srcId).subscribe(data=>{
      if(data.body){
        this.traductions = data.body;
      }
    });
  }
}
