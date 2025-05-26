import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadService } from 'src/app/services/novedad/novedad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-novedad',
  templateUrl: './list.component.html'
})
export class ListNovedadComponent implements OnInit {
  novedades: Novedad[] = [];
  isLoading = true;

  constructor(private service: NovedadService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: data => this.novedades = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar las novedades.', 'error')
    });
  }

  create(): void {
    this.router.navigate(['/novedad/create']);
  }

  view(id: number | undefined): void {
    if (id) this.router.navigate(['/novedad/view', id]);
  }

  edit(id: number | undefined): void {
    if (id) this.router.navigate(['/novedad/update', id]);
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
        this.service.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Registro eliminado.', 'success');
            this.load();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar.', 'error')
        });
      }
    });
  }
}
