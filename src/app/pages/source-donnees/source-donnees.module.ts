import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceDonneesRoutingModule } from './source-donnees-routing.module';
import { SourceDonneeComponent } from './source-donnee/source-donnee.component';
import { CreateUpdateSourceDonneeComponent } from './create-update-source-donnee/create-update-source-donnee.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateSourceDonneeComponent } from './update-source-donnee/update-source-donnee.component';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { DetailSourceDonneeComponent } from './source-donnee/detail-source-donnee/detail-source-donnee.component';


@NgModule({
  declarations: [
    SourceDonneeComponent,
    CreateUpdateSourceDonneeComponent,
    UpdateSourceDonneeComponent,
    DetailSourceDonneeComponent
  ],
  imports: [
    CommonModule,
    SourceDonneesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class SourceDonneesModule { }
