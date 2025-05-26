import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model'; // Asegúrate de que esta ruta sea correcta
import { ServicioService } from 'src/app/services/servicio/servicio.service'; // Asegúrate de que esta ruta sea correcta
import Swal from 'sweetalert2';
import { forkJoin, of } from 'rxjs'; // Importamos 'of' y 'forkJoin' para manejo de IDs
import { catchError } from 'rxjs/operators'; // Para manejo de errores más específico

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: 'view' | 'create' | 'update'; // Uso de string literals para mayor claridad
  servicio: Servicio;
  isLoading: boolean = false; // Para manejar el estado de carga
  errorLoading: boolean = false; // Para manejar errores al cargar un servicio existente

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicioService: ServicioService, // Renombrado a servicioService para consistencia
    private router: Router
  ) {
    // Inicializamos el servicio con un objeto vacío o valores por defecto para evitar errores
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
      // Por defecto, o si la ruta no coincide, puedes redirigir o establecer un modo predeterminado
      console.warn('Modo de gestión no reconocido. Redirigiendo a la lista.');
      this.router.navigate(['/servicio/list']);
      return; // Salir de ngOnInit
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
        this.router.navigate(['/servicio/list']); // Redirigir si falla la carga
        return of(null); // Retorna un observable nulo para que la suscripción se complete sin error
      })
    ).subscribe(
      (service: Servicio | null) => {
        if (service) {
          this.servicio = service;
          // Formatear fechas para input type="date" si es necesario
          // Los inputs 'date' esperan formato 'YYYY-MM-DD'.
          // Si tu backend envía '2024-05-01T00:00:00.000-05:00', necesitas extraer 'YYYY-MM-DD'.
          if (this.servicio.f_inicio) {
            this.servicio.f_inicio = this.servicio.f_inicio.split('T')[0];
          }
          if (this.servicio.f_fin) {
            this.servicio.f_fin = this.servicio.f_fin.split('T')[0];
          }
          console.log('Servicio cargado:', this.servicio);
        }
        this.isLoading = false;
      }
    );
  }

  back(): void {
    this.router.navigate(['/servicio/list']);
  }

  // Método unificado para manejar la acción del formulario (crear/actualizar)
  onSubmit(): void {
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    }
  }

  create(): void {
    this.isLoading = true;
    // Eliminamos ID al crear para que el backend lo asigne
    const servicioToCreate = { ...this.servicio };
    delete servicioToCreate.id;
    delete servicioToCreate.created_at; // No enviar estos campos al crear
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
        if (response) { // Solo si la respuesta no es nula
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
    // No enviar created_at/updated_at al actualizar, el backend los maneja
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
        if (response) { // Solo si la respuesta no es nula
          Swal.fire('¡Actualizado!', 'Registro actualizado correctamente.', 'success').then(() => {
            this.router.navigate(['/servicio/list']);
          });
        }
        this.isLoading = false;
      }
    );
  }

  // Este método no se usará directamente en este componente (manage),
  // pero lo mantengo por si es una función de tu servicio.
  // Si necesitas eliminar desde aquí, asegúrate de que tiene sentido en el flujo de UX.
  // Usualmente, la eliminación se hace en la tabla de listado.
  // Si decides mantenerla aquí, asegúrate de redirigir a la lista después de eliminar.
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
            this.router.navigate(['/servicio/list']); // Redirigir a la lista después de eliminar
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