import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilsComponent} from "./profils/profils.component";
import {CreateUpdateProfilComponent} from "./create-update-profil/create-update-profil.component";
import {DetailProfilComponent} from "./detail-profil/detail-profil.component";

const routes: Routes = [
  {
    path: '',
    component: ProfilsComponent,
  },
  {
    path: 'create-update/:profilId',
    component: CreateUpdateProfilComponent
  },
  {
    path: 'detail-update/:profilId',
    component: DetailProfilComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilsRoutingModule { }
