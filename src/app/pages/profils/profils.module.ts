import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilsRoutingModule } from './profils-routing.module';
import { ProfilsComponent } from './profils/profils.component';
import { CreateUpdateProfilComponent } from './create-update-profil/create-update-profil.component';
import { DetailProfilComponent } from './detail-profil/detail-profil.component';
import {CoreModule} from "../../common/core.module";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";


@NgModule({
  declarations: [
    ProfilsComponent,
    CreateUpdateProfilComponent,
    DetailProfilComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    ProfilsRoutingModule,
    CoreModule,
    NgMultiSelectDropDownModule,
  ]
})
export class ProfilsModule { }
