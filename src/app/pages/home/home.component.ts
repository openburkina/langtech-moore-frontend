import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContributionService} from "../contributions/contribution.service";
import {StateMois} from "../../models/stateMois.model";
import {ContributeurService} from "../contributeurs/contributeur.service";
import {DateDto} from "../../models/dateDto";
import {SourceService} from "../source-donnees/source.service";
import {Utilisateur} from "../../models/utilisateur.model";
import {Router} from "@angular/router";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formSearch!: FormGroup;
  traductionAttentes: number[] = [];
  traductionRejetees: number[] = [];
  traductionValidees: number[] = [];

  data1: any[];
  highcharts = Highcharts;
  chartOptions: any;


  donneesState: StateMois[] = [];
   nbreTraduit = 0;
  nbreSourceDonne = 0;
  nbreContributor = 0;
  bestContributeurs: Utilisateur[] = [];
  pointFidelite = 0
  today = new Date();
  constructor(private fb: FormBuilder,
              private contributionService: ContributionService,
              private contributeurService: ContributeurService,
              private sourceService: SourceService,
              private router: Router) { }

  ngOnInit(): void {
    $.getScript("./assets/js/deafult-dashboard.js");
    this.getNbreContributor();
    this.getNbreSourceDonnee();
    this.getNbreSourceTranslated();
    this.getSatistique();
    this.initSearchForm();
    this.formSearch.get('dateDebut').setValue(formatDate(new Date(),'yyyy-MM-dd','en'))
    this.formSearch.get('dateFin').setValue(formatDate(new Date(),'yyyy-MM-dd','en'))
  }

  onResetSearchForm() {

  }

  onSearch() {
    this.getBestContributeur();
  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      dateDebut: null,
      dateFin: null,
    });


  }

  getSatistique(){
    this.contributionService.getStatistique().subscribe(data=>{
      if(data.body){
        this.donneesState = data.body;
        this.donneesState.forEach(item=>{
        })
        this.donneesState.forEach((currentValue, index) => {
         this.traductionAttentes.push(currentValue.nombreContributionEnattente);
         this.traductionValidees.push(currentValue.nombreContributionValide);
         this.traductionRejetees.push(currentValue.nombreContributionRejette);
        });
        this.intialiser();
        console.warn("this.donneesState ",this.traductionAttentes);
      }
    })
  }

  intialiser(): void{
    this.data1 = [
      {
        name: 'traductions en attente',
        data: this.traductionAttentes

      },
      {
        name: 'traductions rejetées',
        data: this.traductionRejetees

      },
      {
        name: 'traductions acceptées',
        data: this.traductionValidees

      },
    ];

    this.chartOptions = {
      chart: {
        // type: "bar",
        type: 'column',
        column: {
          pointPadding: 0,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false
        }
      },

      title: {
        text: "Evolution des contributions par mois"
      },
      yAxis: {
        title: {
          text: "contributions"
        }
      },
      xAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      series: this.data1
    };
  }

  getBestContributeur(): void{
    const dateDto = new DateDto();
    dateDto.debut = new Date(this.formSearch.get('dateDebut').value);
    dateDto.fin = new Date(this.formSearch.get('dateFin').value);
    console.warn("data date",dateDto);
    this.contributeurService.getBestContributor(dateDto).subscribe(data=>{
      if(data.body){
        console.warn("bestContributeurs",data.body);
        this.bestContributeurs = data.body.utilisateurs;
        this.pointFidelite = data.body.pointFidelite;
      }
    })
  }

  getNbreSourceTranslated(): void{
    this.contributionService.getNbreSourceTranslated().subscribe(data=>{
      if(data.body){
        this.nbreTraduit = data.body;
        console.warn("nbre traduit", this.nbreTraduit);
      }
    })
  }

  getNbreSourceDonnee(): void{
    this.sourceService.getNbreSourceDonnee().subscribe(data=>{
      if(data.body){
        this.nbreSourceDonne = data.body
      }
    })
  }

  getNbreContributor(): void{
    this.contributeurService.getNbreContributor().subscribe(data=>{
      if(data.body){
        this.nbreContributor = data.body;
      }
    })
  }

  navigateToContributeur() {
    this.router.navigate(['pages','contributeurs'])
  }
}
