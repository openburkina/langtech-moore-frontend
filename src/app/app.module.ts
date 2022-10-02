import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "./pages/shared/shared.module";
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ContentLayoutComponent } from "./pages/layouts/content/content-layout.component";
import { FullLayoutComponent } from "./pages/layouts/full/full-layout.component";

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

import * as $ from 'jquery';
import {NgxSpinnerModule} from "ngx-spinner";
import {HttpInterceptorProviders} from "./interceptor/httpInterceptor.config";
import {NgxWebstorageModule} from "ngx-webstorage";
import {SpinnersComponent} from "./common/spinners/spinners.component";
import {NotificationComponent} from "./common/notification/notification.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    SpinnersComponent,
    NotificationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // NgbModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
    NgxWebstorageModule.forRoot({ prefix: 'gt', separator: '-', caseSensitive: true }),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDKXKdHQdtqgPVl2HI2RnUa_1bjCxRCQo4'}),
    PerfectScrollbarModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    HttpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
