import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {CoreModule} from "../../common/core.module";


@NgModule({
  declarations: [
    SignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        CoreModule,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AuthModule { }
