import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // Para HttpClient

import { ComboRoutingModule } from './combo-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    ComboRoutingModule,
    FormsModule,         // Necesario para trabajar con formularios de plantilla y ngModel
    HttpClientModule     // Necesario para que los servicios de API funcionen en este módulo
  ]
})
export class ComboModule { }