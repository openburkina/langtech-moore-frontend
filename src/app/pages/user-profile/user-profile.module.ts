import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';

import { UserProfileComponent } from './user-profile.component';
import {CoreModule} from "../../common/core.module";


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    CoreModule,
  ]
})
export class UserProfileModule { }
