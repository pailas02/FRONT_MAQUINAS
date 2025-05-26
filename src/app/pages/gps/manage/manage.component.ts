// src/app/pages/gps/manage/manage.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GPS } from 'src/app/models/gps.model';
import { Maquina } from 'src/app/models/maquina.model'; // Para el selector de máquina
import { GPSService } from '../../../services/gpsService/gps.service';
import { MaquinaService } from '../../../services/maquina/maquina.service'; // Para obtener la lista de máquinas
import Swal from 'sweetalert2';
import { of, forkJoin } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-gps-manage', // Selector único
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: 'view' | 'create' | 'update' = 'create';
  gps: GPS; // Objeto GPS para el formulario
  maquinas: Maquina[] = []; // Lista de máquinas para el dropdown
  isLoading: boolean = false;
  errorLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gpsService: GPSService,
    private maquinaService: MaquinaService, // Inyecta el servicio de Maquina
    private router: Router
  ) {
    this.gps = new GPS(); // Inicializa el objeto
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
      console.warn('Modo de gestión de registro GPS no reconocido. Redirigiendo a la lista.');
      this.router.navigate(['/gps/list']);
      return;
    }

    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.errorLoading = false;

    // Cargar la lista de máquinas siempre, ya que la necesitamos para el select
    const maquinas$ = this.maquinaService.list().pipe(
      catchError(error => {
        console.error('Error al cargar máquinas:', error);
        Swal.fire('Error', 'No se pudieron cargar las máquinas para la selección.', 'error');
        this.errorLoading = true;
        return of([]); // Retorna un array vacío para que el forkJoin no falle
      })
    );

    // Si estamos en modo ver o actualizar, también cargamos el registro GPS
    const gps$ = (this.mode === 'view' || this.mode === 'update') ?
      this.gpsService.view(this.activatedRoute.snapshot.params.id).pipe(
        catchError(error => {
          console.error('Error al obtener el registro GPS:', error);
          Swal.fire('Error', 'No se pudo cargar el registro GPS. Por favor, inténtalo de nuevo.', 'error');
          this.router.navigate(['/gps/list']);
          this.errorLoading = true;
          return of(null); // Retorna null para que el forkJoin no falle
        })
      ) : of(null); // En modo crear, no hay registro GPS que cargar

    forkJoin({
      maquinas: maquinas$,
      gps: gps$
    }).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(data => {
      this.maquinas = data.maquinas;
      if (data.gps) {
        this.gps = data.gps;
      }
      console.log('Datos iniciales cargados (Máquinas y GPS si aplica):', data);
    });
  }

  // Método para obtener el nombre de la máquina para el select (si lo necesitas mostrar en el combo de selección)
  getMaquinaNombre(maquinaId: number | undefined): string {
    const maquina = this.maquinas.find(m => m.id === maquinaId);
    return maquina ? `${maquina.especialidad} - ${maquina.marca} (${maquina.modelo})` || 'Sin nombre' : 'Seleccione una máquina';
  }

  back(): void {
    this.router.navigate(['/gps/list']);
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
    const gpsToCreate = { ...this.gps };
    delete gpsToCreate.id; // No enviar ID al crear

    this.gpsService.create(gpsToCreate).pipe(
      catchError(error => {
        console.error('Error al crear el registro GPS:', error);
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
            this.router.navigate(['/gps/list']);
          });
        }
      }
    );
  }

  update(): void {
    this.isLoading = true;
    const gpsToUpdate = { ...this.gps };

    this.gpsService.update(gpsToUpdate).pipe(
      catchError(error => {
        console.error('Error al actualizar el registro GPS:', error);
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
            this.router.navigate(['/gps/list']);
          });
        }
      }
    );
  }

  delete(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'ID de registro GPS no válido para eliminar.' });
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
        this.gpsService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/gps/list']);
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