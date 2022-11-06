import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributeursRoutingModule } from './contributeurs-routing.module';
import { ContributeursComponent } from './contributeurs/contributeurs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ContributeursComponent
  ],
  imports: [
    CommonModule,
    ContributeursRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ContributeursModule { }
