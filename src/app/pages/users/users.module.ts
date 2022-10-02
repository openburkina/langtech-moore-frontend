import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import {CoreModule} from "../../common/core.module";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";


@NgModule({
  declarations: [
    UsersComponent,
    CreateUpdateUserComponent,
    DetailUserComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        CoreModule,
        NgMultiSelectDropDownModule,
    ]
})
export class UsersModule { }
