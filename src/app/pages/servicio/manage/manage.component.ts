import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import Swal from 'sweetalert2';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  // AHORA DECLARAMOS mode como string literal para que coincida con el HTML
  mode: 'view' | 'create' | 'update' = 'create'; // Inicializamos con un valor por defecto (ej. 'create')
  servicio: Servicio;
  isLoading: boolean = false; // <-- Inicializado aquí
  errorLoading: boolean = false; // <-- Inicializado aquí

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicioService: ServicioService,
    private router: Router
  ) {
    this.servicio = new Servicio(); // Usamos el constructor del modelo Servicio
  }

  ngOnInit(): void {
    // Detectar el modo basado en la URL
    const currentPath = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');

    if (currentPath.includes('view')) {
      this.mode = 'view';
    } else if (currentPath.includes('create')) {
      this.mode = 'create';
    } else if (currentPath.includes('update')) {
      this.mode = 'update';
    } else {
      console.warn('Modo de gestión no reconocido. Redirigiendo a la lista.');
      this.router.navigate(['/servicio/list']);
      return;
    }

    // Si el modo es 'view' o 'update', intenta cargar el servicio
    if (this.mode === 'view' || this.mode === 'update') {
      const servicioId = this.activatedRoute.snapshot.params.id;

      if (servicioId) {
        this.getServicio(servicioId);
      } else {
        console.error('ID del servicio no proporcionado para los modos View o Update.');
        Swal.fire('Error', 'ID de servicio no válido.', 'error');
        this.router.navigate(['/servicio/list']);
      }
    }
  }

  getServicio(id: number): void {
    this.isLoading = true;
    this.errorLoading = false;
    this.servicioService.view(id).pipe(
      catchError(error => {
        console.error('Error al obtener el servicio:', error);
        this.errorLoading = true;
        Swal.fire('Error', 'No se pudo cargar el servicio. Por favor, inténtalo de nuevo.', 'error');
        this.router.navigate(['/servicio/list']);
        return of(null);
      })
    ).subscribe(
      (service: Servicio | null) => {
        if (service) {
          this.servicio = service;
          // Formatear fechas para input type="date"
          if (this.servicio.f_inicio) {
            this.servicio.f_inicio = this.servicio.f_inicio.split('T')[0];
          }
          if (this.servicio.f_fin) {
            this.servicio.f_fin = this.servicio.f_fin.split('T')[0];
          }
          // Manejo del campo 'historico' si existe en tu modelo y JSON
          // Si 'historico' viene como null o undefined, asegúrate de que no cause problemas.
          // Si no está en el JSON de respuesta para 'view', deberías eliminarlo del modelo
          // o manejarlo adecuadamente si es opcional y no siempre viene.
          // Tu JSON de ejemplo no tiene 'historico', por lo que si lo estás esperando
          // en el formulario, es posible que quieras eliminarlo del modelo o manejarlo.
          if (this.servicio.historico === undefined && this.mode === 'create') {
              this.servicio.historico = ''; // Inicializar a string vacío si es para un nuevo servicio
          }
        }
        this.isLoading = false;
      }
    );
  }

  back(): void {
    this.router.navigate(['/servicio/list']);
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
    const servicioToCreate = { ...this.servicio };
    delete servicioToCreate.id;
    delete servicioToCreate.created_at;
    delete servicioToCreate.updated_at;

    this.servicioService.create(servicioToCreate).pipe(
      catchError(error => {
        console.error('Error al crear:', error);
        Swal.fire('Error', 'No se pudo crear el registro. Verifica los datos.', 'error');
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(
      (response) => {
        if (response) {
          Swal.fire('¡Creado!', 'Registro creado correctamente.', 'success').then(() => {
            this.router.navigate(['/servicio/list']);
          });
        }
        this.isLoading = false;
      }
    );
  }

  update(): void {
    this.isLoading = true;
    const servicioToUpdate = { ...this.servicio };
    delete servicioToUpdate.created_at;
    delete servicioToUpdate.updated_at;

    this.servicioService.update(servicioToUpdate).pipe(
      catchError(error => {
        console.error('Error al actualizar:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro. Verifica los datos.', 'error');
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(
      (response) => {
        if (response) {
          Swal.fire('¡Actualizado!', 'Registro actualizado correctamente.', 'success').then(() => {
            this.router.navigate(['/servicio/list']);
          });
        }
        this.isLoading = false;
      }
    );
  }

  delete(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de servicio no válido para eliminar.'
      });
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
        this.servicioService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/servicio/list']);
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