import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    UsuarioRoutingModule,
    FormsModule
  ]
})
export class UsuarioModule { }
