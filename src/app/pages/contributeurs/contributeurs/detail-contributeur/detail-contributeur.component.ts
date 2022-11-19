import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../../models/traduction.model";
import {Utilisateur} from "../../../../models/utilisateur.model";
import {ActivatedRoute} from "@angular/router";
import {ContributeurService} from "../../contributeur.service";
import {ContributionService} from "../../../contributions/contribution.service";
import {ConfirmComponent} from "../../../../common/confirm/confirm.component";
import {NotificationService} from "../../../../common/services/notification.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailTraductionComponent} from "../../../contributions/detail-traduction/detail-traduction.component";

@Component({
  selector: 'app-detail-contributeur',
  templateUrl: './detail-contributeur.component.html',
  styleUrls: ['./detail-contributeur.component.scss']
})
export class DetailContributeurComponent implements OnInit {
  traductions: Traduction[] = [];
  contribId: any;
  constructor(
    private activedRoute: ActivatedRoute,
    private contributionService: ContributionService,
    private notification: NotificationService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.contribId = this.activedRoute.snapshot.paramMap.get('id');
    this.getContribution(this.contribId);
  }

  oenDetaiModal(item: Utilisateur) {

  }

  fermer() {
    window.history.back();
  }

  getContribution(id: number): void{
    // this.contributionService.getContributionByContributeur(id).subscribe(data=>{
    //   if(data.body){
    //     this.traductions = data.body;
    //   }
    // })
  }

  getOneTraduction(traductionId: number): void {
    this.contributionService.getOne(traductionId).subscribe({
      next: response => {
        if (response.body) {
          this.onShowDetailTraduction(response.body);
        } else {
          this.notification.open('danger', `Une erreur est survenue lors de la récupération des traductions !`);
        }
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des traductions !`;
        this.notification.open('danger', message);
      }
    });
  }

  async onConfirmDeleteTraduction(t: Traduction) {
    const currentModal = await this.modal.open(ConfirmComponent, { size: "lg", backdrop: "static", centered: true});
    currentModal.componentInstance.message = `Voulez-vous supprimer cette traduction ?`;
    currentModal.result.then(
      response => {
        if (response) {
          this.deleteTraduction(t);
        }
      }
    );
  }
  deleteTraduction(t: Traduction): void {
    this.contributionService.delete(t.id).subscribe({
      next: () => {
        this.notification.open('success', `Votre traduction a été supprimée avec succès !`);
      },
      error: () => {
        this.notification.open('danger', `Une erreur est survenue lors de la suppression de la traduction !`);
      }
    });
  }

  async onShowDetailTraduction(t: Traduction) {
    const currentModal = await this.modal.open(DetailTraductionComponent, { size: "lg", backdrop: "static", centered: true});
    currentModal.componentInstance.traduction = t;
    currentModal.componentInstance.audio = `data:audio/mp4;base64,${t.contenuAudio}`;
  }
}
