import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formSearch!: FormGroup;
  data1 = [
    {
      name: 'traductions en attente',
      data: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]

    },
    {
      name: 'traductions rejetés',
      data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]

    },
    {
      name: 'traductions acceptés',
      data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]

    },
  ];
  highcharts = Highcharts;
  chartOptions = {
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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    $.getScript("./assets/js/deafult-dashboard.js")
    this.initSearchForm();
  }

  onResetSearchForm() {

  }

  onSearch() {

  }

  initSearchForm() {
    this.formSearch = this.fb.group({
      dateDebut: null,
      dateFin: null,
    });
  }
}
