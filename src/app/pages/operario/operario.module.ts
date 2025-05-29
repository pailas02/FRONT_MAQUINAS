import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListOperarioComponent } from './list/list.component';
import { ManageOperarioComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperarioRoutingModule } from './operario-routing.module';



@NgModule({
  declarations: [
    ListOperarioComponent,
    ManageOperarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OperarioRoutingModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class OperarioModule { }