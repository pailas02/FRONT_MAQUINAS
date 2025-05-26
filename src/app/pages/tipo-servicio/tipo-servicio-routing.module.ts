import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTipoServicioComponent } from './list/list.component';
import { ManageTipoServicioComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListTipoServicioComponent },
  { path: 'create', component: ManageTipoServicioComponent },
  { path: 'update/:id', component: ManageTipoServicioComponent },
  { path: 'view/:id', component: ManageTipoServicioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoServicioRoutingModule { }
