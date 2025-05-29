import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOperarioComponent } from './list/list.component';
import { ManageOperarioComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListOperarioComponent },
  { path: 'create', component: ManageOperarioComponent },
  { path: 'update/:id', component: ManageOperarioComponent },
  { path: 'view/:id', component: ManageOperarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperarioRoutingModule { }
