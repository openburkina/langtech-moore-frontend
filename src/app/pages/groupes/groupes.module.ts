import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupesRoutingModule } from './groupes-routing.module';
import { GroupesComponent } from './groupes/groupes.component';
import { CreateUpdateGroupeComponent } from './create-update-groupe/create-update-groupe.component';
import { DetailGroupeComponent } from './detail-groupe/detail-groupe.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../common/core.module";


@NgModule({
  declarations: [
    GroupesComponent,
    CreateUpdateGroupeComponent,
    DetailGroupeComponent
  ],
  imports: [
    CommonModule,
    GroupesRoutingModule,
    CoreModule
  ]
})
export class GroupesModule { }
