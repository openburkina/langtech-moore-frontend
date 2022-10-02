import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {Profil} from "../../../models/profil.model";
import {ProfilService} from "../profil.service";
import {CreateUpdateProfilComponent} from "../create-update-profil/create-update-profil.component";
import {DetailProfilComponent} from "../detail-profil/detail-profil.component";

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.scss']
})
export class ProfilsComponent implements OnInit {
  profils: Profil[] = [];

  constructor(
    private profilService: ProfilService,
    private modal: NgbModal,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getProfils();
  }

  async openConfirmModal(p: Profil) {
    const currentModal = this.modal.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer le profil #${p.libelle} ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.deleteProfil(p);
        }
      }
    );
  }

  async openCreateUpdateModal(p: Profil) {
    const currentModal = this.modal.open(CreateUpdateProfilComponent, { size: 'lg', backdrop: 'static', centered: true});
    currentModal.componentInstance.profil = p;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.getProfils();
        }
      }
    );
  }

  private deleteProfil(p: Profil) {
    const result = this.profilService.deleteProfil(p.id).subscribe(
      () => {
        result.unsubscribe();
        this.notification.open('success', `Le profil #${p.libelle} a été supprimé avec succès !`);
        this.getProfils();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la suppression du profil !`;
        this.notification.open('danger', message);
      }
    );
  }

  getProfils() {
    this.profils = [];
    const result = this.profilService.getProfils().subscribe(
      response => {
        console.log(response.body);
        if (response.body === null || response.body.length === 0) {
          this.notification.open('warning', 'Aucun profil trouvé !');
        } else {
          this.profils = response.body;
        }
        result.unsubscribe();
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des profils !`;
        this.notification.open('danger', message);
      }
    );
  }

  async openDetailModal(p: Profil) {
    const currentModal = this.modal.open(DetailProfilComponent, { size: 'lg', backdrop: 'static', centered: true});
    currentModal.componentInstance.profil = p;
  }
}
