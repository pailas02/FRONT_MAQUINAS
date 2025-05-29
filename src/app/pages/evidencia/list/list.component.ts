import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evidencia } from 'src/app/models/evidencia.model';
import { EvidenciaService } from 'src/app/services/evidencia/evidencia.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-evidencia',
  templateUrl: './list.component.html'
})
export class ListEvidenciaComponent implements OnInit {
  evidencias: Evidencia[] = [];
  isLoading = true;

  constructor(private service: EvidenciaService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: data => this.evidencias = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar las evidencias.', 'error')
    });
  }

  create(): void {
    this.router.navigate(['/evidencia/create']);
  }

  view(id: number | undefined): void {
    if (id) this.router.navigate(['/evidencia/view', id]);
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
            Swal.fire('Eliminado', 'Evidencia eliminada.', 'success');
            this.load();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar.', 'error')
        });
      }
    });
  }
}
