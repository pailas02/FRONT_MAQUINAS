import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEvidenciaComponent } from './list/list.component';
import { ManageEvidenciaComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListEvidenciaComponent },
  { path: 'create', component: ManageEvidenciaComponent },
  { path: 'update/:id', component: ManageEvidenciaComponent },
  { path: 'view/:id', component: ManageEvidenciaComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvidenciaRoutingModule { }
