import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../models/traduction.model";
import {ContributionService} from "../contribution.service";
import {Observable, of} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailTraductionComponent} from "../detail-traduction/detail-traduction.component";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {NotificationService} from "../../../common/services/notification.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  styleUrls: ['./contributions.component.scss']
})
export class ContributionsComponent implements OnInit {
  totalItems = 0;
  itemsPerPage = 20;
  maxSize = 20;
  page = 0;
  ngbPaginationPage = 1;

  traductions$: Observable<Traduction[]>;
  enableShowFilter: boolean;
  formSearch!: FormGroup;
  traduction: Traduction;

  constructor(
    private contributionService: ContributionService,
    private modal: NgbModal,
    private notification: NotificationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.enableShowFilter = false;
    this.traduction = new Traduction();
    this.initSearchForm();
    this.getTraductions();
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      sourceDonnee: null,
      etat: null,
      type: null,
    });
  }

  getTraductions() {
    const request = {
      page: this.page,
      size: this.itemsPerPage,
    };
    this.contributionService.getTraductions(this.traduction, request).subscribe({
      next: response => {
        if (response.body !== null) {
          this.totalItems = Number(response.headers.get('X-Total-Count'));
          this.traductions$ = of(response.body);
        }
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des traductions !`;
        this.notification.open('danger', message);
      }
    });
  }

  async onShowDetailTraduction(t: Traduction) {
    const currentModal = await this.modal.open(DetailTraductionComponent, { size: "lg", backdrop: "static", centered: true});
    currentModal.componentInstance.traduction = t;
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

  onChangeFilterStatus() {
    this.enableShowFilter = !this.enableShowFilter;
  }

  onSearch() {
    this.traduction.sourceDonnee.libelle = this.formSearch.value.sourceDonnee;
      this.traduction.etat = this.formSearch.value.etat;
    this.traduction.type = this.formSearch.value.type;
    console.log(this.traduction);
    this.getTraductions();
  }

  onResetSearchForm() {

  }

  loadPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getTraductions();
  }
}
