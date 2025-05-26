import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipioRoutingModule } from './municipio-routing.module';
import { ListComponent } from './list/list.component'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    MunicipioRoutingModule,
    FormsModule
  ]
})
export class MunicipioModule { }
