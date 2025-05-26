import { NgModule } from '@angular/core';
import { ManageComponent } from './manage/manage.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListGobernanteMunicipioComponent } from './list/list.component';
import { GobernanteMunicipioRoutingModule } from './gobernantemunicipio-routing.module';


@NgModule({
  declarations: [
    ListGobernanteMunicipioComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GobernanteMunicipioRoutingModule
  ]
})
export class GobernanteMunicipioModule {}