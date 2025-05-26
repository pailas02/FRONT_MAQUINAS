import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno.model';
import { TurnoService } from 'src/app/services/turno/turno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-turno',
  templateUrl: './list.component.html'
})
export class ListTurnoComponent implements OnInit {
  turnos: Turno[] = [];
  isLoading = true;

  constructor(private turnoService: TurnoService, private router: Router) {}

  ngOnInit(): void {
    this.loadTurnos();
  }

  loadTurnos(): void {
    this.turnoService.list().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: data => this.turnos = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar los turnos.', 'error')
    });
  }

  edit(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/turno/update', id]);
  }

  view(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/turno/view', id]);
  }

  delete(id: number | undefined): void {
    if (!id) return;
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.turnoService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Turno eliminado correctamente.', 'success');
            this.loadTurnos();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el turno.', 'error')
        });
      }
    });
  }

  create(): void {
    this.router.navigate(['/turno/create']);
  }
}
