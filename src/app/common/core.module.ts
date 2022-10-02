import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule { }
