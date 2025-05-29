import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvidenciaRoutingModule } from './evidencia-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageEvidenciaComponent } from './manage/manage.component';
import { ListEvidenciaComponent } from './list/list.component';



@NgModule({
  declarations: [
    ListEvidenciaComponent,
    ManageEvidenciaComponent

  ],
  imports: [CommonModule, FormsModule, EvidenciaRoutingModule]
})
export class EvidenciaModule { }