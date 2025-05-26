// departmentruler/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { GobernanteDepartamento } from 'src/app/models/gobernante-departamento.model';
import { GobernanteDepartamentoService } from 'src/app/services/gobernanteDepartamento/gobernante-departamento.service';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-departamento-ruler',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListGobernanteDepartamentoComponent implements OnInit {

  gobernanteDepartamentos: GobernanteDepartamento[] = [];
  constructor(private GobernanteDepartamentoService: GobernanteDepartamentoService /*, private router: Router*/) { }

  ngOnInit(): void {
    this.GobernanteDepartamentoService.list().subscribe(data => {
      this.gobernanteDepartamentos = data;
    });
  }
 edit(id: number) {
    console.log('Editing Departamento-Ruler Link ID:', id);
  }

  delete(id: number) {
    console.log('Deleting Departamento-Ruler Link ID:', id);
     this.GobernanteDepartamentoService.delete(id).subscribe(() => {
       console.log('Departamento-Ruler Link deleted successfully');
       this.ngOnInit(); // Reload the list
     });
  }
}