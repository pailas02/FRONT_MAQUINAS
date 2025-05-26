// src/app/pages/gps/gps.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // Asegura que HttpClient esté disponible

import { GpsRoutingModule } from './gps-routing.module';
import { ListComponent as GPSListComponent } from './list/list.component';
import { ManageComponent as GPSManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    GPSListComponent,
    GPSManageComponent
  ],
  imports: [
    CommonModule,
    GpsRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class GPSModule { }