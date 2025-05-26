// src/app/pages/maquina/manage/manage.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Maquina } from 'src/app/models/maquina.model';
import { MaquinaService } from '../../../services/maquina/maquina.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-maquina-manage', // Selector único
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: 'view' | 'create' | 'update' = 'create';
  maquina: Maquina; // Objeto Maquina para el formulario
  isLoading: boolean = false;
  errorLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private maquinaService: MaquinaService,
    private router: Router
  ) {
    this.maquina = new Maquina(); // Inicializa el objeto
  }

  ngOnInit(): void {
    const currentPath = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');

    if (currentPath.includes('view')) {
      this.mode = 'view';
    } else if (currentPath.includes('create')) {
      this.mode = 'create';
    } else if (currentPath.includes('update')) {
      this.mode = 'update';
    } else {
      console.warn('Modo de gestión de máquina no reconocido. Redirigiendo a la lista.');
      this.router.navigate(['/maquina/list']);
      return;
    }

    if (this.mode === 'view' || this.mode === 'update') {
      const id = this.activatedRoute.snapshot.params.id;
      if (id) {
        this.isLoading = true;
        this.maquinaService.view(id).pipe(
          catchError(error => {
            console.error('Error al obtener la máquina:', error);
            Swal.fire('Error', 'No se pudo cargar la máquina. Por favor, inténtalo de nuevo.', 'error');
            this.router.navigate(['/maquina/list']);
            this.errorLoading = true;
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe(data => {
          if (data) {
            this.maquina = data;
            // Asegúrate de formatear la fecha si tu backend la devuelve con hora/minutos
            if (this.maquina.fecha_asignacion) {
                this.maquina.fecha_asignacion = this.maquina.fecha_asignacion.split('T')[0];
            }
          }
        });
      } else {
        Swal.fire('Error', 'ID de máquina no proporcionado.', 'error');
        this.router.navigate(['/maquina/list']);
      }
    }
  }

  back(): void {
    this.router.navigate(['/maquina/list']);
  }

  onSubmit(): void {
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create(): void {
    this.isLoading = true;
    const maquinaToCreate = { ...this.maquina };
    delete maquinaToCreate.id; // No enviar ID al crear

    this.maquinaService.create(maquinaToCreate).pipe(
      catchError(error => {
        console.error('Error al crear la máquina:', error);
        Swal.fire('Error', 'No se pudo crear el registro. Verifica los datos.', 'error');
        this.isLoading = false;
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      (response) => {
        if (response) {
          Swal.fire('¡Creado!', 'Registro creado correctamente.', 'success').then(() => {
            this.router.navigate(['/maquina/list']);
          });
        }
      }
    );
  }

  update(): void {
    this.isLoading = true;
    const maquinaToUpdate = { ...this.maquina };

    this.maquinaService.update(maquinaToUpdate).pipe(
      catchError(error => {
        console.error('Error al actualizar la máquina:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro. Verifica los datos.', 'error');
        this.isLoading = false;
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(
      (response) => {
        if (response) {
          Swal.fire('¡Actualizado!', 'Registro actualizado correctamente.', 'success').then(() => {
            this.router.navigate(['/maquina/list']);
          });
        }
      }
    );
  }

  delete(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'ID de máquina no válido para eliminar.' });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.maquinaService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/maquina/list']); // Redirigir a la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }
}