import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../models/traduction.model";
import {ContributionService} from "../contribution.service";
import {Observable, of} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailTraductionComponent} from "../detail-traduction/detail-traduction.component";
import {ConfirmComponent} from "../../../common/confirm/confirm.component";
import {NotificationService} from "../../../common/services/notification.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContributeurService} from "../../contributeurs/contributeur.service";
import {Utilisateur} from "../../../models/utilisateur.model";

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
  contributeurs$: Observable<Utilisateur[]> = new Observable<Utilisateur[]>();
  traductions: Traduction[] = [];
  enableShowFilter: boolean;
  formSearch!: FormGroup;
  traduction: Traduction;
  audioList = [
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      title: "Smaple 1",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    },
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      title: "Sample 2",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    },
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
      title: "Sample 3",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    }
  ];

  constructor(
    private contributionService: ContributionService,
    private modal: NgbModal,
    private notification: NotificationService,
    private fb: FormBuilder,
    private contributeurService: ContributeurService,
  ) { }

  ngOnInit(): void {
    this.enableShowFilter = false;
    this.traduction = new Traduction();
    this.contributeurs$ = this.contributeurService.contributeurs$;
    this.initSearchForm();
    this.getTraductions();
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      contributeurId: null,
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
        console.log(response.body);
        if (response.body !== null) {
          this.totalItems = Number(response.headers.get('X-Total-Count'));
          this.traductions = response.body;
        }
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des traductions !`;
        this.notification.open('danger', message);
      }
    });
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

  async onShowDetailTraduction(t: Traduction) {
    const currentModal = await this.modal.open(DetailTraductionComponent, { size: "lg", backdrop: "static", centered: true});
    currentModal.componentInstance.traduction = t;
    currentModal.componentInstance.audio = `data:audio/mp4;base64,${t.contenuAudio}`;
    currentModal.result.then(
      response => {
        if (response === true) {
          this.onSearch();
        }
      }
    );
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
    this.traduction.utilisateur.id = this.formSearch.value.contributeurId;
    this.getTraductions();
  }

  onResetSearchForm() {
    this.formSearch.reset();
    this.onSearch();
  }

  loadPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getTraductions();
  }
}
