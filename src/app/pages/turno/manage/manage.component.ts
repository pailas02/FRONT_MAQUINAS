import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/models/turno.model';
import { TurnoService } from 'src/app/services/turno/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-turno',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number = 1; // 1 = ver, 2 = crear, 3 = editar
  turno: Turno = {
    id: 0,
    maquinaId: 0,
    operarioId: 0,
    estado: '',
    fechaInicio: new Date(),
    fechaFin: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private turnoService: TurnoService
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.url.join('/');
    if (path.includes('view')) this.mode = 1;
    else if (path.includes('create')) this.mode = 2;
    else if (path.includes('update')) this.mode = 3;

    const id = Number(this.route.snapshot.params['id']);
    if (id && this.mode !== 2) {
      this.turnoService.view(id).subscribe({
        next: (res) => this.turno = res,
        error: () => Swal.fire('Error', 'No se pudo cargar el turno', 'error')
      });
    }
  }

  create(): void {
    this.turnoService.create(this.turno).subscribe({
      next: () => {
        Swal.fire('Creado', 'Turno creado correctamente.', 'success')
          .then(() => this.router.navigate(['/turnos/list']));
      },
      error: () => Swal.fire('Error', 'No se pudo crear el turno.', 'error')
    });
  }

  update(): void {
    this.turnoService.update(this.turno).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Turno actualizado correctamente.', 'success')
          .then(() => this.router.navigate(['/turnos/list']));
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar el turno.', 'error')
    });
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar este turno?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.turnoService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Turno eliminado correctamente.', 'success');
            this.router.navigate(['/turnos/list']);
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el turno.', 'error')
        });
      }
    });
  }

  back(): void {
    this.router.navigate(['/turnos/list']);
  }
}
