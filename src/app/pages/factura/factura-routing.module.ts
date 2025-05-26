import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListFacturaComponent } from './list/list.component';
import { ManageFacturaComponent } from './manage/manage.component'; 

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListFacturaComponent },
  { path: 'create', component: ManageFacturaComponent },
  { path: 'update/:id', component: ManageFacturaComponent }, 
  { path: 'view/:id', component: ManageFacturaComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }