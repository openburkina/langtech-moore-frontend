import { Component, OnInit } from '@angular/core';
import {CreateUpdateSourceDonneeComponent} from "../create-update-source-donnee/create-update-source-donnee.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";
import {SourceService} from "../source.service";
import {SourceDonnee} from "../../../models/sourceDonnee.model";
import {UpdateSourceDonneeComponent} from "../update-source-donnee/update-source-donnee.component";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-source-donnee',
  templateUrl: './source-donnee.component.html',
  styleUrls: ['./source-donnee.component.scss']
})
export class SourceDonneeComponent implements OnInit {
  listeCategories: any[] = [];
  sourceDonne: SourceDonnee[] = [];
  enableShowFilter: boolean;
  formSearch!: FormGroup;

  constructor( private modalService: NgbModal,
               private notification: NotificationService,
               private sourceService: SourceService) { }

  ngOnInit(): void {
    this.getSourceDonnee();
  }

  openModalCreate() {
    const modalRef = this.modalService.open(CreateUpdateSourceDonneeComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notification.open('success', `L'opération a été effectuée avec succès !`);

        }
      }
    );
  }

  getSourceDonnee(): void{
    this.sourceService.getSourceDonnees().subscribe(data=>{
      if(data.body){
        this.sourceDonne = data.body;
      }
    })
  }

  openModalDetail(item: any) {

  }

  update(source?: SourceDonnee) {
    const modalRef = this.modalService.open(UpdateSourceDonneeComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sourceDonnee = source;
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notification.open('success', `L'opération a été effectuée avec succès !`);

        }
      }
    );
  }

  async openConfirmdelete(source: SourceDonnee) {
    const currentModal = this.modalService.open(ConfirmComponent, { size: 'lg', backdrop: 'static', centered: true });
    currentModal.componentInstance.message = `Voulez-vous supprimer la source #${source.id} ?`;
    await currentModal.result.then(
      response => {
        if (response === true) {
          this.deleteSource(source);
        }
      }
    );
  }

  private deleteSource(source: SourceDonnee) {
    const result = this.sourceService.deleteSourceDonnee(source.id).subscribe(
      () => {
        result.unsubscribe();
        this.notification.open('success', `La source a été supprimée avec succès !`);
        this.getSourceDonnee();
      },
      error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la suppression de la source !`;
        this.notification.open('danger', message);
        result.unsubscribe();
      }
    );
  }

  onChangeFilterStatus() {
    this.enableShowFilter = !this.enableShowFilter;
  }

  onSearch() {

  }

  onResetSearchForm() {

  }
}
