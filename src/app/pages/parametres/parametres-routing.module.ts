import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypePieceComponent} from "./type-piece/type-piece.component";
import {CategoriesComponent} from "./categories/categories.component";
import {DomainesComponent} from "./domaines/domaines.component";

const routes: Routes = [
  {
    path: 'type-piece',
    component: TypePieceComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'domaines',
    component: DomainesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametresRoutingModule { }
