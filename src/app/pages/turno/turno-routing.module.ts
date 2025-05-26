import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTurnoComponent } from './list/list.component';
import { ManageTurnoComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListTurnoComponent },
  { path: 'create', component: ManageTurnoComponent },
  { path: 'update/:id', component: ManageTurnoComponent },
  { path: 'view/:id', component: ManageTurnoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoRoutingModule { }
