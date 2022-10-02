import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametresRoutingModule } from './parametres-routing.module';
import { TypePieceComponent } from './type-piece/type-piece.component';
import { CreateUpdateTypePieceComponent } from './create-update-type-piece/create-update-type-piece.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CategoriesComponent } from './categories/categories.component';
import { CreateUpdateCategorieComponent } from './create-update-categorie/create-update-categorie.component';
import { DomainesComponent } from './domaines/domaines.component';
import { CreateUpdateDomaineComponent } from './create-update-domaine/create-update-domaine.component';
import { DetailDomaineComponent } from './detail-domaine/detail-domaine.component';
import { DetailCategorieComponent } from './detail-categorie/detail-categorie.component';


@NgModule({
  declarations: [
    TypePieceComponent,
    CreateUpdateTypePieceComponent,
    CategoriesComponent,
    CreateUpdateCategorieComponent,
    DomainesComponent,
    CreateUpdateDomaineComponent,
    DetailDomaineComponent,
    DetailCategorieComponent
  ],
  imports: [
    CommonModule,
    ParametresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ParametresModule { }
