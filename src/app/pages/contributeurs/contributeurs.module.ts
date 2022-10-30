import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributeursRoutingModule } from './contributeurs-routing.module';
import { ContributeursComponent } from './contributeurs/contributeurs.component';


@NgModule({
  declarations: [
    ContributeursComponent
  ],
  imports: [
    CommonModule,
    ContributeursRoutingModule
  ]
})
export class ContributeursModule { }
