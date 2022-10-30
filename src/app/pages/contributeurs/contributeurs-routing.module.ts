import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContributeursComponent} from "./contributeurs/contributeurs.component";

const routes: Routes = [
  {
    path: '',
    component: ContributeursComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributeursRoutingModule { }
