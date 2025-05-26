// src/app/pages/maquina/maquina.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // Asegura que HttpClient esté disponible

import { MaquinaRoutingModule } from './maquina-routing.module';
import { ListComponent as MaquinaListComponent } from './list/list.component'; // Renombrado para evitar conflicto
import { ManageComponent as MaquinaManageComponent } from './manage/manage.component'; // Renombrado

@NgModule({
  declarations: [
    MaquinaListComponent,
    MaquinaManageComponent
  ],
  imports: [
    CommonModule,
    MaquinaRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class MaquinaModule { }