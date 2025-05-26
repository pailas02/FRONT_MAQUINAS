// src/app/pages/combo/manage/manage.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Combo } from 'src/app/models/combo.model';
import { ComboService } from '../../../services/combo/combos.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio/servicio.service';

@Component({
  selector: 'app-manage', 
  templateUrl: './manage.component.html', 
  styleUrls: ['./manage.component.scss'] 
})
export class ManageComponent implements OnInit { // <-- La clase se llama ManageComponent
  mode: 'view' | 'create' | 'update' = 'create';
  combo: Combo;
  isLoading: boolean = false;
  errorLoading: boolean = false;
  serviciosDisponibles: Servicio[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    private servicioService: ServicioService,
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

    this.loadServiciosDisponibles();

    if (this.mode === 'view' || this.mode === 'update') {
      const comboId = this.activatedRoute.snapshot.params.id;

      if (comboId) {
        this.getCombo(comboId);
      } else {
        console.error('ID del combo no proporcionado para los modos View o Update.');
        Swal.fire('Error', 'ID de combo no válido.', 'error');
        this.router.navigate(['/combo/list']);
      }
    }
  }

  loadServiciosDisponibles(): void {
    this.servicioService.list().pipe(
      catchError(error => {
        console.error('Error al cargar servicios disponibles:', error);
        return of([]);
      })
    ).subscribe(
      (servicios: Servicio[]) => {
        this.serviciosDisponibles = servicios;
        console.log('Servicios disponibles cargados:', this.serviciosDisponibles);
      }
    );
  }

  getCombo(id: number): void {
    this.isLoading = true;
    this.errorLoading = false;
    this.comboService.view(id).pipe(
      catchError(error => {
        console.error('Error al obtener el combo:', error);
        this.errorLoading = true;
        Swal.fire('Error', 'No se pudo cargar el combo. Por favor, inténtalo de nuevo.', 'error');
        this.router.navigate(['/combo/list']);
        return of(null);
      })
    ).subscribe(
      (combo: Combo | null) => {
        if (combo) {
          this.combo = combo;
          console.log('Combo cargado:', this.combo);
        }
        this.isLoading = false;
      }
    );
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
    delete comboToCreate.id;
    delete comboToCreate.created_at;
    delete comboToCreate.updated_at;

    this.comboService.create(comboToCreate).pipe(
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
    delete comboToUpdate.created_at;
    delete comboToUpdate.updated_at;

    this.comboService.update(comboToUpdate).pipe(
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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de combo no válido para eliminar.'
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
        this.comboService.delete(id).subscribe({
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