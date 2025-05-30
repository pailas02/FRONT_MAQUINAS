import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialdiadOperarioRoutingModule } from './especialdiad-operario-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    EspecialdiadOperarioRoutingModule
  ]
})
export class EspecialdiadOperarioModule { }
