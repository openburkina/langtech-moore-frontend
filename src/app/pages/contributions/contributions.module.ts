import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributionsRoutingModule } from './contributions-routing.module';
import { ContributionsComponent } from './contributions/contributions.component';
import { DetailTraductionComponent } from './detail-traduction/detail-traduction.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {AngMusicPlayerModule} from "ang-music-player";
import {RejetWithMotifComponent} from "./rejet-with-motif/rejet-with-motif.component";


@NgModule({
  declarations: [
    ContributionsComponent,
    DetailTraductionComponent,
    RejetWithMotifComponent,
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
