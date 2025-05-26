import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPolizaMaquinaComponent } from './list/list.component';
import { ManagePolizaMaquinaComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListPolizaMaquinaComponent },
  { path: 'create', component: ManagePolizaMaquinaComponent },
  { path: 'update/:id', component: ManagePolizaMaquinaComponent },
  { path: 'view/:id', component: ManagePolizaMaquinaComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes) 
  ],
  // --- FIN MODIFICACIÓN ---
  exports: [RouterModule] 
})
export class PolizaRoutingModule { }