import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListTurnoComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { ManageTurnoComponent } from './manage/manage.component';
import { TurnoRoutingModule } from './turno-routing.module';



@NgModule({
  declarations:[
    ListTurnoComponent,
    ManageTurnoComponent

  ],
  imports:[CommonModule, FormsModule, TurnoRoutingModule]
})
export class TurnoModule {}