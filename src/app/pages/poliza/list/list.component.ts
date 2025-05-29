import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PolizaMaquina } from 'src/app/models/poliza.model';
import { PolizaMaquinaService } from 'src/app/services/poliza/poliza.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-poliza-maquina',
  templateUrl: './list.component.html'
})
export class ListPolizaMaquinaComponent implements OnInit {
  polizas: PolizaMaquina[] = [];
  isLoading = true;

  constructor(private service: PolizaMaquinaService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: data => this.polizas = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar las pólizas.', 'error')
    });
  }

  create(): void {
    this.router.navigate(['/poliza/create']);
  }

  view(id: number | undefined): void {
    if (id) this.router.navigate(['/poliza/view', id]);
  }

  edit(id: number | undefined): void {
    if (id) this.router.navigate(['/poliza/update', id]);
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
