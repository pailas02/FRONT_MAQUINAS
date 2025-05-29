import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CuotasRoutingModule } from './cuota-routing.module';
import { ListCuotaComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { PayComponent } from './pay/pay.component';


@NgModule({
  declarations: [
    ListCuotaComponent,
    ManageComponent,
    PayComponent
  ],
  imports: [
    CommonModule,
    CuotasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CuotasModule { }
