import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributionsRoutingModule } from './contributions-routing.module';
import { ContributionsComponent } from './contributions/contributions.component';
import { DetailTraductionComponent } from './detail-traduction/detail-traduction.component';


@NgModule({
  declarations: [
    ContributionsComponent,
    DetailTraductionComponent
  ],
  imports: [
    CommonModule,
    ContributionsRoutingModule
  ]
})
export class ContributionsModule { }
