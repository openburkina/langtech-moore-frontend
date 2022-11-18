import { Component, OnInit } from '@angular/core';
import {CreateUpdateSourceDonneeComponent} from "../create-update-source-donnee/create-update-source-donnee.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../../../common/services/notification.service";
import {SourceService} from "../source.service";
import {SourceDonnee} from "../../../models/sourceDonnee.model";
import {UpdateSourceDonneeComponent} from "../update-source-donnee/update-source-donnee.component";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-source-donnee',
  templateUrl: './source-donnee.component.html',
  styleUrls: ['./source-donnee.component.scss']
})
export class SourceDonneeComponent implements OnInit {
  listeCategories: any[] = [];
  sourcesDonnees: SourceDonnee[] = [];
  enableShowFilter: boolean;
  formSearch!: FormGroup;
  totalItems = 0;
  itemsPerPage = 10;
  maxSize = 20;
  page = 0;
  ngbPaginationPage = 1;
  sourceDonnee: SourceDonnee = new SourceDonnee();

  constructor( private modalService: NgbModal,
               private notification: NotificationService,
               private sourceService: SourceService,
               private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.getSourceDonneeWithCriteria();
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      libelle: null,
    });
  }

  openModalCreate() {
    const modalRef = this.modalService.open(CreateUpdateSourceDonneeComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then(
      msg => {
        if (msg == true) {
          this.notification.open('success', `L'opération a été effectuée avec succès !`);
          this.getSourceDonnee();
        }
      }
    );
  }

  getSourceDonnee(): void{
    this.sourceService.getSourceDonnees().subscribe(data=>{
      if(data.body){
        this.sourcesDonnees = data.body;
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
          this.getSourceDonnee();
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
    this.sourceDonnee.libelle = this.formSearch.get('libelle').value;
    this.getSourceDonneeWithCriteria();
  }

  onResetSearchForm() {

  }

  loadPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getSourceDonneeWithCriteria();
  }

  getSourceDonneeWithCriteria() {
    const request = {
      page: this.page,
      size: this.itemsPerPage,
    };
    this.sourceService.getSourceDonneWithCriteria(this.sourceDonnee, request).subscribe({
      next: response => {
        if (response.body !== null) {
          this.totalItems = Number(response.headers.get('X-Total-Count'));
          this.sourcesDonnees = response.body;
        }
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des sources de données !`;
        this.notification.open('danger', message);
      }
    });
  }
}
