// src/app/pages/departamento/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/models/departamento.model';
import { DepartamentoService } from '../../../services/departamento.service'; // Ajusta la ruta a tu servicio
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list', // Manteniendo tu convención de nombres de selector
  templateUrl: './list.component.html', // Manteniendo tu convención de nombres de archivo
  styleUrls: ['./list.component.scss'] // Manteniendo tu convención de nombres de archivo
})
export class ListComponent implements OnInit {

  departamentos: Departamento[] = [];
  isLoading: boolean = true;

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartamentos();
  }

  loadDepartamentos(): void {
    this.isLoading = true;
    this.departamentoService.list().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data: Departamento[]) => {
        this.departamentos = data;
        console.log('Departamentos cargados:', this.departamentos);
      },
      error: (error) => {
        console.error('Error al cargar los departamentos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron cargar los departamentos. Por favor, inténtalo de nuevo más tarde.'
        });
        this.departamentos = [];
      }
    });
  }

  // **Nota:** Si no necesitas funcionalidades de edición/creación/eliminación para Departamentos
  // (porque son datos maestros que solo se listan), puedes omitir estos métodos y sus botones en el HTML.
  // Los incluyo por completitud, pero adáptalos a tus necesidades.

  edit(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID del departamento no es válido para editar.'
      });
      return;
    }
    this.router.navigate(['/departamento/update', id]).catch(error => {
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
        text: 'El ID del departamento no es válido para eliminar.'
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
        this.departamentoService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El registro ha sido eliminado correctamente.', 'success');
            this.loadDepartamentos(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar el departamento:', error);
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
        text: 'El ID del departamento no es válido para ver detalles.'
      });
      return;
    }
    this.router.navigate(['/departamento/view', id]);
  }

  createDepartamento(): void {
    this.router.navigate(['/departamento/create']);
  }
}