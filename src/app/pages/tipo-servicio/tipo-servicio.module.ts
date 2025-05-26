import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTipoServicioComponent } from './list/list.component';
import { ManageTipoServicioComponent } from './manage/manage.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoServicioRoutingModule } from './tipo-servicio-routing.module';



@NgModule({
  declarations:[
    ListTipoServicioComponent,
    ManageTipoServicioComponent

  ],
  imports:[CommonModule, FormsModule, TipoServicioRoutingModule]
})

export class TipoServicioModule {}