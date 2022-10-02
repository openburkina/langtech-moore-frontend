import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupesComponent} from "./groupes/groupes.component";

const routes: Routes = [
  {
    path: '',
    component: GroupesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupesRoutingModule { }
