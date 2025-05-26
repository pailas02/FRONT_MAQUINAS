import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNovedadComponent } from './list/list.component';
import { ManageNovedadComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListNovedadComponent },
  { path: 'create', component: ManageNovedadComponent },
  { path: 'update/:id', component: ManageNovedadComponent },
  { path: 'view/:id', component: ManageNovedadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NovedadRoutingModule { }
