import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
  declarations: [
    ConfirmComponent,
  ],
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
export class CommonModule { }
