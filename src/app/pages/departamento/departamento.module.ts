import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule aquí

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    FormsModule,
    HttpClientModule // Importa HttpClientModule aquí si no lo tienes en tu AppModule
  ]
})
export class DepartamentoModule { }
