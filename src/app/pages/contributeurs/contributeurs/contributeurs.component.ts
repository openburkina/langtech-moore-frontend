import { Component, OnInit } from '@angular/core';
import {ContributeurService} from "../contributeur.service";
import {Observable, of} from "rxjs";
import {Utilisateur} from "../../../models/utilisateur.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotificationService} from "../../../common/services/notification.service";

@Component({
  selector: 'app-contributeurs',
  templateUrl: './contributeurs.component.html',
  styleUrls: ['./contributeurs.component.scss']
})
export class ContributeursComponent implements OnInit {
  formSearch!: FormGroup;
  contributeurs$: Observable<Utilisateur[]> = new Observable<Utilisateur[]>();
  enableShowFilter: boolean;
  totalItems = 0;
  itemsPerPage = 20;
  maxSize = 20;
  page = 0;
  ngbPaginationPage = 1;
  contributeur: Utilisateur = new Utilisateur();
  contributeurs: Utilisateur[] = [];

  constructor(
    private contributeurService: ContributeurService,
    private fb: FormBuilder,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.contributeurs$ = this.contributeurService.contributeurs$;
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      nom: null,
      prenom: null,
      email: null,
      telephone: null,
    });
  }

  onResetSearchForm() {

  }

  onChangeFilterStatus() {
    this.enableShowFilter = !this.enableShowFilter;
  }

  onSearch() {
    this.contributeur.nom = this.formSearch.get('nom').value;
    this.contributeur.prenom = this.formSearch.get('prenom').value;
    this.contributeur.email = this.formSearch.get('email').value;
    this.contributeur.telephone = this.formSearch.get('telephone').value;
    this.getContributeurs();

  }

  getContributeurs() {
    const request = {
      page: this.page,
      size: this.itemsPerPage,
    };
    this.contributeurService.getContributeursWitCriteria(this.contributeur, request).subscribe({
      next: response => {
        if (response.body !== null) {
          this.totalItems = Number(response.headers.get('X-Total-Count'));
         // this.contributeurs$ = of(response.body);
          this.contributeurs = response.body;
          console.warn("contributeurs",this.contributeurs);
        }
      },
      error: error => {
        const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des contributeurs !`;
        this.notification.open('danger', message);
      }
    });
  }

  loadPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getContributeurs();
  }

}
