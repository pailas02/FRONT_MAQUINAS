import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list.component.html'
})
export class ListUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  isLoading = true;

  constructor(private service: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.list().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: data => this.usuarios = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error')
    });
  }

  create(): void {
    this.router.navigate(['/usuario/create']);
  }

  view(id: number | undefined): void {
    if (id) this.router.navigate(['/usuario/view', id]);
  }

  edit(id: number | undefined): void {
    if (id) this.router.navigate(['/usuario/update', id]);
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
