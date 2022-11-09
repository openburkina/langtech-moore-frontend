import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {Profil} from "../../../models/profil.model";
import {ProfilService} from "../profil.service";
import {CreateUpdateProfilComponent} from "../create-update-profil/create-update-profil.component";
import {DetailProfilComponent} from "../detail-profil/detail-profil.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profils',
  templateUrl: './profils.component.html',
  styleUrls: ['./profils.component.scss']
})
export class ProfilsComponent implements OnInit {
  profils: Profil[] = [];
  profils$: Observable<Profil[]>;

  constructor(
    private profilService: ProfilService,
    private modal: NgbModal,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.profils$ = this.profilService.profils$;
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
  }

  private deleteProfil(p: Profil) {
    const result = this.profilService.deleteProfil(p.id).subscribe(
      () => {
        result.unsubscribe();
        this.notification.open('success', `Le profil #${p.libelle} a été supprimé avec succès !`);
      },
      error => {
        result.unsubscribe();
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la suppression du profil !`;
        this.notification.open('danger', message);
      }
    );
  }

  async openDetailModal(p: Profil) {
    const currentModal = this.modal.open(DetailProfilComponent, { size: 'lg', backdrop: 'static', centered: true});
    currentModal.componentInstance.profil = p;
  }
}
