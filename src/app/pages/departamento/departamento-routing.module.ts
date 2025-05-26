// src/app/pages/departamento/departamento-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component'; // Usa ListComponent

const routes: Routes = [
  { path: '', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }