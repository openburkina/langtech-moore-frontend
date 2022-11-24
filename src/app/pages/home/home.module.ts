import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HighchartsChartModule} from "highcharts-angular";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HighchartsChartModule
  ]
})
export class HomeModule { }
