import { Component, OnInit } from '@angular/core';
import {Traduction} from "../../../../models/traduction.model";
import {Utilisateur} from "../../../../models/utilisateur.model";
import {ActivatedRoute} from "@angular/router";
import {ContributionService} from "../../../contributions/contribution.service";
import {ConfirmComponent} from "../../../../common/confirm/confirm.component";
import {NotificationService} from "../../../../common/services/notification.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailTraductionComponent} from "../../../contributions/detail-traduction/detail-traduction.component";
import {Observable} from "rxjs";
import {ContributeurService} from "../../contributeur.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../../../auth/services/account.service";

@Component({
  selector: 'app-detail-contributeur',
  templateUrl: './detail-contributeur.component.html',
  styleUrls: ['./detail-contributeur.component.scss']
})
export class DetailContributeurComponent implements OnInit {
  totalItems = 0;
  itemsPerPage = 20;
  maxSize = 20;
  page = 0;
  ngbPaginationPage = 1;
  traductions: Traduction[] = [];
  enableShowFilter: boolean;
  formSearch!: FormGroup;
  traduction: Traduction = new Traduction();
  traductionCounter: Traduction = new Traduction();
  contribId: any;
  contributeurs$: Observable<Utilisateur[]> = new Observable<Utilisateur[]>();
  traductionsPerso: Traduction[] = [];

  totalrejete = 0;
  totalValide = 0;
  totalAttente = 0;
  totalFidelite = 0;


  constructor(
    private activedRoute: ActivatedRoute,
    private contributionService: ContributionService,
    private notification: NotificationService,
    private modal: NgbModal,
    private contributeurService: ContributeurService,
    private fb: FormBuilder,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.contribId = this.activedRoute.snapshot.paramMap.get('id');
    this.getuserFidelite();
    this.getContribution(this.contribId);
    this.contributeurs$ = this.contributeurService.contributeurs$;
    this.getCountContribution();
    this.initSearchForm();

   // this.getTraductions();
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      contributeurId: this.accountService.getCurrentUserInfos().id,
      sourceDonnee: null,
      etat: null,
      type: null,
    });
    this.onSearch();

  }

  fermer() {
    window.history.back();
  }

  getContribution(id: number): void{
    this.contributionService.getContributionByContributeur(id).subscribe(data=>{
    if(data.body){
        this.traductions = data.body;
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

  onSearch() {
    this.traduction.sourceDonnee.libelle = this.formSearch.value.sourceDonnee;
    this.traduction.etat = this.formSearch.value.etat;
    this.traduction.type = this.formSearch.value.type;
    this.traduction.utilisateur.id = this.formSearch.value.contributeurId;
    this.getTraductions();
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

  loadPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getTraductions();
  }

  onResetSearchForm() {
    this.formSearch.reset();
    this.onSearch();
  }

  onChangeFilterStatus() {
    this.enableShowFilter = !this.enableShowFilter;
  }

  getCountContribution():void{
    this.traductionCounter.utilisateur.id =  this.accountService.getCurrentUserInfos().id;
    const request = {
      page: this.page,
      size: this.itemsPerPage,
    };
    this.contributionService.getTraductionsPerso(this.traductionCounter, request).subscribe({
      next: response => {
        console.log(response.body);
        if (response.body !== null) {
          this.totalItems = Number(response.headers.get('X-Total-Count'));
          this.traductionsPerso = response.body;
            this.totalrejete = this.traductionsPerso.filter(item=>item.etat == "REJETER").length;
            this.totalValide = this.traductionsPerso.filter(item=>item.etat == "VALIDER").length;
        }
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des traductions !`;
        this.notification.open('danger', message);
      }
    });
  }


  getuserFidelite(){
    this.contributeurService.getContributor(this.contribId).subscribe(data=>{
      if(data.body){
        this.totalFidelite = data.body.pointFidelite;
      }
    })
  }



}
