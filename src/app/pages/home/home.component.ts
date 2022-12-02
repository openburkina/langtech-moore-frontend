import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContributionService} from "../contributions/contribution.service";
import {StateMois} from "../../models/stateMois.model";
import {ContributeurService} from "../contributeurs/contributeur.service";
import {DateDto} from "../../models/dateDto";

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
  constructor(private fb: FormBuilder,
              private contributionService: ContributionService,
              private contributeurService: ContributeurService) { }

  ngOnInit(): void {
    $.getScript("./assets/js/deafult-dashboard.js");
    this.getSatistique();
    this.initSearchForm();
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
        name: 'traductions rejetés',
        data: this.traductionRejetees

      },
      {
        name: 'traductions acceptés',
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
    dateDto.debut = new Date();
    dateDto.fin = new Date();
    this.contributeurService.getBestContributor(dateDto).subscribe(data=>{
      if(data.body){
        console.warn("contrib",data.body);
      }
    })
  }

}
