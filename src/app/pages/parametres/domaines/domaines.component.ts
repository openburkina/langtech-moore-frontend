import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";
import {DomaineService} from "../domaine.service";
import {Domaine} from "../../../models/domaine.model";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {CreateUpdateDomaineComponent} from "../create-update-domaine/create-update-domaine.component";
import {DetailDomaineComponent} from "../detail-domaine/detail-domaine.component";

@Component({
  selector: 'app-domaines',
  templateUrl: './domaines.component.html',
  styleUrls: ['./domaines.component.scss']
})
export class DomainesComponent implements OnInit {
 listeDomaine: Domaine[] = [];

  constructor(private modalService: NgbModal,
              private notificationService: NotificationService,
              private domaineService: DomaineService) { }

  ngOnInit(): void {
    this.getDomaines();
  }

  getDomaines(): void{
    this.domaineService.getDomaines().subscribe(data=>{
      if(data.body){
        this.listeDomaine = data.body;
        console.warn('liste des domaines',this.listeDomaine);
      }
    })
  }

  update(domaine: Domaine): void {
    const modalRef = this.modalService.open(CreateUpdateDomaineComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.domaine = domaine;
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notificationService.open('success', `L'opération a été effectuée avec succès !`);
        }
      },
      () => {}
    );
  }

  async openConfirmdelete(domaine: Domaine) {
    const currentModal = this.modalService.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer le domaine #${domaine.libelle} ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.deleteDomaine(domaine.id);
        }
      }
    );
  }

  openModalCreate(): void {
    const modalRef = this.modalService.open(CreateUpdateDomaineComponent, { size: 'lg', backdrop: 'static',centered: true });
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notificationService.open('success', `L'opération a été effectuée avec succès !`);
          this.getDomaines();
        }
      },
      () => {}
    );
  }

  private deleteDomaine(id: number): void {
    this.domaineService.deleteDomaine(id).subscribe(data=>{
      if(data.body){
        if(data.body.code != -1){
          this.notificationService.open('success', data.body.msg);
          this.getDomaines();
        }else{
          this.notificationService.open('danger', data.body.msg);
        }
      }
    });
  }

  oenDetaiModal(domaine: Domaine) {
    const modalRef = this.modalService.open(DetailDomaineComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.domaine = domaine;
    modalRef.result.then(
      () => {
      },
      () => {}
    );
  }
}
