import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributeursRoutingModule } from './contributeurs-routing.module';
import { ContributeursComponent } from './contributeurs/contributeurs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { DetailContributeurComponent } from './contributeurs/detail-contributeur/detail-contributeur.component';


@NgModule({
  declarations: [
    ContributeursComponent,
    DetailContributeurComponent
  ],
  imports: [
    CommonModule,
    ContributeursRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class ContributeursModule { }
