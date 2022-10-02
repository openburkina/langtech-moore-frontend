import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {CreateUpdateUserComponent} from "./create-update-user/create-update-user.component";
import {DetailUserComponent} from "./detail-user/detail-user.component";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'create-update-user/:userId',
    component: CreateUpdateUserComponent,
  },
  {
    path: 'detail-user/:userId',
    component: DetailUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
