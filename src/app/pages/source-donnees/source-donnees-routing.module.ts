import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SourceDonneeComponent} from "./source-donnee/source-donnee.component";
import {DetailSourceDonneeComponent} from "./source-donnee/detail-source-donnee/detail-source-donnee.component";

const routes: Routes = [

  {
    path: '',
    component: SourceDonneeComponent,
  },
  {
    path: 'detail/:id',
    component: DetailSourceDonneeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourceDonneesRoutingModule { }
