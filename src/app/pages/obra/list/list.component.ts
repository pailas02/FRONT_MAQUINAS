// src/app/pages/obra/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Obra } from 'src/app/models/obra.model';
import { ObraService } from '../../../services/obra/obra.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list', // Manteniendo tu convención de nombres de selector
  templateUrl: './list.component.html', // Manteniendo tu convención de nombres de archivo
  styleUrls: ['./list.component.scss'] // Manteniendo tu convención de nombres de archivo
})
export class ListComponent implements OnInit {

  obras: Obra[] = [];
  isLoading: boolean = true;

  constructor(
    private obraService: ObraService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadObras();
  }

  loadObras(): void {
    this.isLoading = true;
    this.obraService.list().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data: Obra[]) => {
        this.obras = data;
        console.log('Obras cargadas:', this.obras);
      },
      error: (error) => {
        console.error('Error al cargar las obras:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron cargar las obras. Por favor, inténtalo de nuevo más tarde.'
        });
        this.obras = [];
      }
    });
  }

  edit(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID de la obra no es válido para editar.'
      });
      return;
    }
    this.router.navigate(['/obra/update', id]).catch(error => {
      console.error('Error al navegar a edición:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de navegación',
        text: 'No se pudo navegar al formulario de edición.'
      });
    });
  }

  delete(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID de la obra no es válido para eliminar.'
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.obraService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El registro ha sido eliminado correctamente.', 'success');
            this.loadObras(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar la obra:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  view(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID de la obra no es válido para ver detalles.'
      });
      return;
    }
    this.router.navigate(['/obra/view', id]);
  }

  createObra(): void {
    this.router.navigate(['/obra/create']);
  }
}