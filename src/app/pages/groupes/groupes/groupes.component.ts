import { Component, OnInit } from '@angular/core';
import {Groupe} from "../../../models/groupe.model";
import {GroupeService} from "../groupe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FAKE_GROUPES_DATA} from "../../../constants/fakeGroupesData";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {NotificationService} from "../../../common/services/notification.service";
import {CreateUpdateGroupeComponent} from "../create-update-groupe/create-update-groupe.component";

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.scss']
})
export class GroupesComponent implements OnInit {
  groupes: Groupe[] = [];

  constructor(
    private groupeService: GroupeService,
    private modal: NgbModal,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getGroupes();
  }

  async openConfirmModal(g: Groupe) {
    const currentModal = this.modal.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer le groupe #${g.libelle} ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.deleteGroupe(g);
        }
      }
    );
  }

  async openCreateUpdateModal(g: Groupe) {
    const currentModal = this.modal.open(CreateUpdateGroupeComponent, { size: 'lg', backdrop: 'static', centered: true});
    currentModal.componentInstance.groupe = g;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.getGroupes();
        }
      }
    );
  }

  private deleteGroupe(g: Groupe) {
    const result = this.groupeService.deleteGroupe(g.id).subscribe(
      () => {
        result.unsubscribe();
        this.notification.open('success', `Le groupe #${g.libelle} a été supprimé avec succès !`);
        this.getGroupes();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la suppression du groupe !`;
        this.notification.open('danger', message);
      }
    );
  }

  getGroupes() {
    this.groupes = [];
    const result = this.groupeService.getGroupes().subscribe(
      response => {
        if (response.body === null || response.body.length === 0) {
          this.notification.open('warning', 'Aucun groupe trouvé !');
        } else {
          this.groupes = response.body;
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des groupes !`;
        this.notification.open('danger', message);
      }
    );
  }
}
