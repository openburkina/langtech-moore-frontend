import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContributeursComponent} from "./contributeurs/contributeurs.component";
import {DetailTraductionComponent} from "../contributions/detail-traduction/detail-traduction.component";
import {DetailContributeurComponent} from "./contributeurs/detail-contributeur/detail-contributeur.component";

const routes: Routes = [
  {
    path: '',
    component: ContributeursComponent,

  },
  {
    path: 'detail/:id',
    component: DetailContributeurComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributeursRoutingModule { }
