import { Component, OnInit } from '@angular/core';
import {SourceDonnee} from "../../../../models/sourceDonnee.model";
import {Traduction} from "../../../../models/traduction.model";
import {ActivatedRoute} from "@angular/router";
import {ContributionService} from "../../../contributions/contribution.service";
import {NotificationService} from "../../../../common/services/notification.service";

@Component({
  selector: 'app-detail-source-donnee',
  templateUrl: './detail-source-donnee.component.html',
  styleUrls: ['./detail-source-donnee.component.scss']
})
export class DetailSourceDonneeComponent implements OnInit {
  sourceDonnee: SourceDonnee = new SourceDonnee();
  traductions: Traduction[] = [];
  srcId: number;
  traductionEnAttente: number;
  traductionValide: number;
  traductionRejette: number;

  constructor(
    private activedRoute: ActivatedRoute,
    private contributionService: ContributionService,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.srcId = +this.activedRoute.snapshot.paramMap.get('id');
    this.traductionEnAttente = 0;
    this.traductionValide = 0;
    this.traductionRejette = 0;
    this.getContributionBySource(this.srcId);
  }

  fermer(): void {
  }

  getContributionBySource(srcId: number) {
    this.contributionService.getContributionBySource(srcId).subscribe(
      data => {
        if(data.body){
          this.traductions = data.body;
          this.countTraduction();
        }
      },
      error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des traductions !`;
        this.notification.open('danger', message);
      }
    );
  }

  private countTraduction() {
    this.traductions.forEach(
      t => {
        if (t.etat === 'EN_ATTENTE') {
          this.traductionEnAttente++;
        } else if (t.etat === 'VALIDER') {
          this.traductionValide++;
        } else if (t.etat === 'REJETER') {
          this.traductionRejette++;
        }
      }
    );
  }
}
