import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatistiquesRoutingModule } from './statistiques-routing.module';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StatistiquesComponent
  ],
  imports: [
    CommonModule,
    StatistiquesRoutingModule,
    ReactiveFormsModule
  ]
})
export class StatistiquesModule { }
