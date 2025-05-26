// src/app/pages/maquina/maquina-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create', component: ManageComponent },
  { path: 'view/:id', component: ManageComponent },
  { path: 'update/:id', component: ManageComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' } // Redirige la raíz de /maquina a /maquina/list
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaquinaRoutingModule { }