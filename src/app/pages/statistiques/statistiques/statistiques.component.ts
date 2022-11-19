import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Utilisateur} from "../../../models/utilisateur.model";
import {ContributeurService} from "../../contributeurs/contributeur.service";
import {NotificationService} from "../../../common/services/notification.service";
import {ContributionService} from "../../contributions/contribution.service";
import {StatistiqueCriteria} from "../../../models/statistiqueCriteria";
import {Statistique} from "../../../models/statistique.model";

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  formSearch: FormGroup;
  statistiqueCriteria: StatistiqueCriteria;
  statistiques: Statistique[] = [];
  contributeurs$: Observable<Utilisateur[]> = new Observable<Utilisateur[]>();

  constructor(
    private contributeurService: ContributeurService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private contributionService: ContributionService,
  ) { }

  ngOnInit(): void {
    const currentDate =  new Date();
    console.log(currentDate.toLocaleString());
    console.log(currentDate.toDateString());
    console.log(currentDate.toISOString());
    this.contributeurs$ = this.contributeurService.contributeurs$;
    this.statistiqueCriteria = new StatistiqueCriteria();
    this.initSearchForm();
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      typeTraduction: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
  }

  onResetSearchForm() {

  }

  onSearch() {
    this.statistiqueCriteria.typeTraduction = this.formSearch.value.typeTraduction;
    this.statistiqueCriteria.debut = new Date(this.formSearch.value.startDate).toISOString();
    this.statistiqueCriteria.fin = new Date(this.formSearch.value.endDate).toISOString();
    console.log(this.statistiqueCriteria);
    this.getStatistiques();
  }

  getStatistiques(): void {
    this.statistiques = [];
    this.contributionService.onGetStatistiques(this.statistiqueCriteria).subscribe(
      {
        next: response => {
          console.log(response);
          if (response.body) {
            this.statistiques = response.body;
          } else {
            this.notification.open('warning', `Aucune statistique trouvée !`);
          }
        },
        error: error => {
          const message = error.error.detail ? error.error.detail : `Une erreur est survenue lors de la récupération des statistiques !`;
          this.notification.open('danger', message);
        }
      }
    );
  }
}
