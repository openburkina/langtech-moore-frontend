import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributionsRoutingModule } from './contributions-routing.module';
import { ContributionsComponent } from './contributions/contributions.component';
import { DetailTraductionComponent } from './detail-traduction/detail-traduction.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {AngMusicPlayerModule} from "ang-music-player";


@NgModule({
  declarations: [
    ContributionsComponent,
    DetailTraductionComponent
  ],
    imports: [
        CommonModule,
        ContributionsRoutingModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        AngMusicPlayerModule
    ]
})
export class ContributionsModule { }
