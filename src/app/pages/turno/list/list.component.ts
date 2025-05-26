import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/models/turno.model';
import { TurnoService } from 'src/app/services/turno/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-turno',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListTurnoComponent implements OnInit {

  turnos: Turno[];
  // Si en el futuro necesitas filtrar por algún parámetro, puedes agregarlo aquí
  // ejemplo: filtroId: number;

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.turnos = [];
    // this.filtroId = 0;
  }

  ngOnInit(): void {
    // Si necesitas filtrar por algún parámetro de ruta, descomenta y ajusta:
    // this.filtroId = Number(this.route.snapshot.params['id']);
    // const currentUrl = this.router.url;
    // if (currentUrl.includes('filterBy...')) {
    //   this.filterBy...();
    // } else {
    this.list();
    // }
  }

  list() {
    this.turnoService.list().subscribe((data) => {
      this.turnos = data;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que quiere eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.turnoService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
        }, () => {
          Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
        });
      }
    });
  }

  create() {
    this.router.navigate(['/turno/create']);
  }

  view(id: number) {
    this.router.navigate(['/turno/view', id]);
  }

  update(id: number) {
    this.router.navigate(['/turno/update', id]);
  }

  // Si necesitas filtrar por algún parámetro, puedes agregar el método aquí
  // filterBy...() {
  //   this.turnoService.listBy...(this.filtroId).subscribe(data => {
  //     this.turnos = data;
  //   });
  // }
}
