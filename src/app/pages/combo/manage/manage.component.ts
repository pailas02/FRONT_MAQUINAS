import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Combo } from 'src/app/models/combo.model';
import { Servicio } from 'src/app/models/servicio.model'; // Para el selector de servicio
import { CombosService } from '../../../services/combo/combos.service';
import { ServicioService } from '../../../services/servicio/servicio.service'; // Para obtener la lista de servicios
import Swal from 'sweetalert2';
import { of, forkJoin } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-manage', // Selector de tu componente
  templateUrl: './manage.component.html', // Archivo HTML asociado
  // styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: 'view' | 'create' | 'update' = 'create';
  combo: Combo;
  servicios: Servicio[] = []; // Lista de servicios para el dropdown
  isLoading: boolean = false;
  errorLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private CombosService: CombosService,
    private servicioService: ServicioService, // Inyecta el servicio de Servicio
    private router: Router
  ) {
    this.combo = new Combo();
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
      console.warn('Modo de gestión de combo no reconocido. Redirigiendo a la lista.');
      this.router.navigate(['/combo/list']);
      return;
    }

    this.loadInitialData();
    
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.errorLoading = false;

    // Cargar la lista de servicios siempre, ya que la necesitamos para el select
    const servicios = this.servicioService.list()

    // Si estamos en modo ver o actualizar, también cargamos el combo
    const combo$ = (this.mode === 'view' || this.mode === 'update') ?
      this.CombosService.view(this.activatedRoute.snapshot.params.id).pipe(
        catchError(error => {
          console.error('Error al obtener el combo:', error);
          Swal.fire('Error', 'No se pudo cargar el combo. Por favor, inténtalo de nuevo.', 'error');
          this.router.navigate(['/combo/list']);
          this.errorLoading = true;
          return of(null); // Retorna null para que el forkJoin no falle
        })
      ) : of(null); // En modo crear, no hay combo que cargar

    forkJoin({
      servicios: servicios,
      combo: combo$
    }).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(data => {
      this.servicios = data.servicios;
      if (data.combo) {
        this.combo = data.combo;
      }
      console.log('Datos iniciales cargados (Servicios y Combo si aplica):', data);
      console.log(this.servicios)
    });

    
  }

  // Método para obtener el nombre del servicio para el select (si lo necesitas mostrar en el combo de selección)
  getServicioNombre(servicioId: number | undefined): string {
    const servicio = this.servicios.find(s => s.id === servicioId);
    return servicio ? servicio.nombre || 'Sin nombre' : 'Seleccione un servicio';
  }

  back(): void {
    this.router.navigate(['/combo/list']);
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
    const comboToCreate = { ...this.combo };
    delete comboToCreate.id; // Asegúrate de que el ID no se envíe al crear

    this.CombosService.create(comboToCreate).pipe(
      catchError(error => {
        console.error('Error al crear el combo:', error);
        Swal.fire('Error', 'No se pudo crear el registro. Verifica los datos.', 'error');
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(
      (response) => {
        if (response) {
          Swal.fire('¡Creado!', 'Registro creado correctamente.', 'success').then(() => {
            this.router.navigate(['/combo/list']);
          });
        }
        this.isLoading = false;
      }
    );
  }

  update(): void {
    this.isLoading = true;
    const comboToUpdate = { ...this.combo };

    this.CombosService.update(comboToUpdate).pipe(
      catchError(error => {
        console.error('Error al actualizar el combo:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro. Verifica los datos.', 'error');
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(
      (response) => {
        if (response) {
          Swal.fire('¡Actualizado!', 'Registro actualizado correctamente.', 'success').then(() => {
            this.router.navigate(['/combo/list']);
          });
        }
        this.isLoading = false;
      }
    );
  }

  delete(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'ID de combo no válido para eliminar.' });
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
        this.CombosService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/combo/list']);
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