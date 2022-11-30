import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../models/traduction.model";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { saveAs } from 'file-saver';
import {ContributionService} from "../contribution.service";
import {NotificationService} from "../../../common/services/notification.service";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {RejetWithMotifComponent} from "../../../common/rejet-with-motif/rejet-with-motif.component";

@Component({
  selector: 'app-detail-traduction',
  templateUrl: './detail-traduction.component.html',
  styleUrls: ['./detail-traduction.component.scss']
})
export class DetailTraductionComponent implements OnInit {
  traduction: Traduction;

  constructor(
    private activeModal: NgbActiveModal,
    private contributionService: ContributionService,
    private notification: NotificationService,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onCloseModal(param: boolean) {
    this.activeModal.close(param);
  }

  onValideTraduction(statut: string) {
    this.contributionService.onValide(this.traduction.id, statut).subscribe(
      {
        next: response => {
          console.log(response.body);
          let message = '';
          if (response.body && response.body.etat == statut) {
            message = `Contribution ${statut == 'VALIDER' ? 'validée' : 'rejetée'} avec succès !`;
            this.notification.open('success', message);
            this.onCloseModal(true);
          } else {
            message = `Une erreur est survenue lors de la validation de la contribution !`;
            this.notification.open('danger', message);
          }
        },
        error: error => {
          const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la validation de la contribution !`;
          this.notification.open('danger', message);
        }
      }
    );
  }

  onDownloadFile() {
    const byteString: string = window.atob(this.traduction.contenuAudio);
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: this.traduction.contenuAudioContentType });

    saveAs(blob, this.formatImageName(`${this.traduction.id}_${this.traduction.libelle.substring(0, 5)}`));
  }

  formatImageName(name: string): string {
    name = name.toLocaleLowerCase();
    name = name.replace(' ', '_');
    return name;
  }

  async rejet(statut: string) {
    const currentModal = await this.modal.open(RejetWithMotifComponent, { size: "lg", backdrop: "static", centered: true});
    currentModal.componentInstance.message = `Voulez-vous rejeter cette traduction ?`;
    currentModal.result.then(
      response => {
        if (response) {
          this.onValideTraduction(statut)
        }
      }
    );
  }
}
