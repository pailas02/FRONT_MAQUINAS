import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operario } from 'src/app/models/operario.model';
import { OperarioService } from 'src/app/services/operario/operario.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-operario',
  templateUrl: './list.component.html'
})
export class ListOperarioComponent implements OnInit {
  operarios: Operario[] = [];
  isLoading = true;

  constructor(private service: OperarioService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: data => this.operarios = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar los operarios.', 'error')
    });
  }

  create(): void {
    this.router.navigate(['/operario/create']);
  }

  view(id: number | undefined): void {
    if (id) this.router.navigate(['/operario/view', id]);
  }

  edit(id: number | undefined): void {
    if (id) this.router.navigate(['/operario/update', id]);
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
