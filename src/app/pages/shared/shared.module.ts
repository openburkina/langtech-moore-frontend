import {NgModule} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ColorSwitcherComponent } from './color-switcher/color-switcher.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {DirectiveModule} from "../../directives/directive.module";



@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ColorSwitcherComponent,
        NgbModule,
      NgxSpinnerModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        PerfectScrollbarModule,
        DirectiveModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ColorSwitcherComponent
    ],
    providers: [ ],
})
export class SharedModule { }
