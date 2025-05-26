// service/list/list.component.ts
import { Component, OnInit } from '@angular/core'; // ChangeDetectorRef no es estrictamente necesario aquí
import { Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators'; // Importa finalize para manejar el estado de carga

@Component({
  selector: 'app-list-service',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListServicioComponent implements OnInit {

  // Inicializa servicios como un array vacío para evitar errores de acceso antes de la carga
  servicios: Servicio[] = [];
  isLoading: boolean = true; // Nuevo estado para indicar si los datos están cargando

  constructor(
    private servicioService: ServicioService,
    private router: Router,
    // private cdr: ChangeDetectorRef // Comentado: RxJS se encargará de esto si usas `async` pipe o si los cambios son directos
  ) { }

  ngOnInit(): void {
    // Es buena práctica tener un método separado para cargar los datos que pueda ser llamado
    // desde ngOnInit y después de una eliminación, por ejemplo.
    this.loadServicios();
  }

  loadServicios(): void {
    this.isLoading = true; // Inicia el estado de carga
    this.servicioService.list().pipe(
      // Usamos `finalize` para establecer isLoading en false tanto si la suscripción es exitosa como si falla.
      finalize(() => {
        this.isLoading = false;
        // this.cdr.detectChanges(); // Si aún ves problemas de actualización, descomenta esto.
      })
    ).subscribe({
      next: (data: Servicio[]) => {
        this.servicios = data;
        console.log('Servicios cargados:', this.servicios); // Para depuración
      },
      error: (error) => {
        console.error('Error al cargar los servicios:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron cargar los servicios. Por favor, inténtalo de nuevo más tarde.'
        });
        this.servicios = []; // Limpiar la lista en caso de error
      }
    });
  }

  // Métodos para editar y eliminar
  // Es mejor usar 'id?: number' porque en el modelo el ID es opcional y podría ser undefined
  edit(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID del servicio no es válido para editar.'
      });
      return;
    }

    // El .then()/.catch() es preferible para manejar la promesa de navegación.
    this.router.navigate(['/servicio/update', id]).catch(error => {
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
        text: 'El ID del servicio no es válido para eliminar.'
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
        this.servicioService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El registro ha sido eliminado correctamente.', 'success');
            this.loadServicios(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar el servicio:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro. Inténtalo de nuevo.', 'error');
          }
        });
      }
    });
  }

  // Si necesitas un método para ver el detalle de un servicio (por ejemplo, en otra página)
  view(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID del servicio no es válido para ver detalles.'
      });
      return;
    }
    this.router.navigate(['/servicio/view', id]); // Asumiendo que tienes una ruta para ver el detalle
  }

  // Método para navegar al formulario de creación de un nuevo servicio
  createService(): void {
    this.router.navigate(['/servicio/create']);
  }
}