import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/models/turno.model';
import { TurnoService } from 'src/app/services/turno/turno.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-manage-turno',
  templateUrl: './manage.component.html'
})
export class ManageTurnoComponent implements OnInit {
  turno: Turno = new Turno();
  mode: 'view' | 'create' | 'update' = 'create';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private turnoService: TurnoService
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.url.map(s => s.path).join('/');
    if (path.includes('view')) this.mode = 'view';
    else if (path.includes('update')) this.mode = 'update';

    const id = this.route.snapshot.params['id'];
    if ((this.mode === 'view' || this.mode === 'update') && id) {
      this.getTurno(id);
    }
  }

  getTurno(id: number): void {
    this.isLoading = true;
    this.turnoService.view(id).pipe(
      catchError(error => {
        Swal.fire('Error', 'No se pudo cargar el turno.', 'error');
        this.router.navigate(['/turno/list']);
        return of(null);
      })
    ).subscribe(turno => {
      if (turno) this.turno = turno;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    if (this.mode === 'create') {
      this.turnoService.create(this.turno).subscribe({
        next: () => {
          Swal.fire('Creado', 'Turno creado exitosamente.', 'success')
            .then(() => this.router.navigate(['/turno/list']));
        },
        error: () => Swal.fire('Error', 'No se pudo crear el turno.', 'error')
      });
    } else if (this.mode === 'update') {
      this.turnoService.update(this.turno).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Turno actualizado.', 'success')
            .then(() => this.router.navigate(['/turno/list']));
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar.', 'error')
      });
    }
  }

  back(): void {
    this.router.navigate(['/turno/list']);
  }
}
