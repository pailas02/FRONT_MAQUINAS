import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ListUsuarioComponent } from './list/list.component';
import { ManageUsuarioComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListUsuarioComponent,
    ManageUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
