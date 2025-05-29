import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsuarioComponent} from './list/list.component';
import { ManageUsuarioComponent } from './manage/manage.component';

const routes: Routes = [
    { path: 'list', component: ListUsuarioComponent },
    { path: 'create', component: ManageUsuarioComponent },
    { path: 'update/:id', component: ManageUsuarioComponent },
    { path: 'view/:id', component: ManageUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
