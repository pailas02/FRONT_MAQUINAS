// src/app/pages/obra/manage/manage.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Obra } from 'src/app/models/obra.model';
import { ObraService } from '../../../services/obra/obra.service'; // 
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Combo } from 'src/app/models/combo.model'; // Para el select de Combo
import { CombosService } from '../../../services/combo/combos.service'; // Para cargar los combos

@Component({
  selector: 'app-manage', // Manteniendo tu convención de nombres de selector
  templateUrl: './manage.component.html', // Manteniendo tu convención de nombres de archivo
  styleUrls: ['./manage.component.scss'] // Manteniendo tu convención de nombres de archivo
})
export class ManageComponent implements OnInit {

  mode: 'view' | 'create' | 'update' = 'create';
  obra: Obra;
  isLoading: boolean = false;
  errorLoading: boolean = false;
  combosDisponibles: Combo[] = []; // Para el select de combo_id

  constructor(
    private activatedRoute: ActivatedRoute,
    private obraService: ObraService,
    private combosService: CombosService, // Inyectamos CombosService
    private router: Router
  ) {
    this.obra = new Obra();
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
      console.warn('Modo de gestión de obra no reconocido. Redirigiendo a la lista.');
      this.router.navigate(['/obra/list']);
      return;
    }

    // Cargar la lista de combos disponibles para el select
    this.loadCombosDisponibles();

    if (this.mode === 'view' || this.mode === 'update') {
      const obraId = this.activatedRoute.snapshot.params.id;

      if (obraId) {
        this.getObra(obraId);
      } else {
        console.error('ID de la obra no proporcionado para los modos View o Update.');
        Swal.fire('Error', 'ID de obra no válido.', 'error');
        this.router.navigate(['/obra/list']);
      }
    }
  }

  loadCombosDisponibles(): void {
    this.combosService.list().pipe(
      catchError(error => {
        console.error('Error al cargar combos disponibles:', error);
        return of([]); // Retorna un array vacío para no bloquear
      })
    ).subscribe(
      (combos: Combo[]) => {
        this.combosDisponibles = combos;
        console.log('Combos disponibles cargados:', this.combosDisponibles);
      }
    );
  }

  getObra(id: number): void {
    this.isLoading = true;
    this.errorLoading = false;
    this.obraService.view(id).pipe(
      catchError(error => {
        console.error('Error al obtener la obra:', error);
        this.errorLoading = true;
        Swal.fire('Error', 'No se pudo cargar la obra. Por favor, inténtalo de nuevo.', 'error');
        this.router.navigate(['/obra/list']);
        return of(null);
      })
    ).subscribe(
      (obra: Obra | null) => {
        if (obra) {
          this.obra = obra;
          console.log('Obra cargada:', this.obra);
        }
        this.isLoading = false;
      }
    );
  }

  back(): void {
    this.router.navigate(['/obra/list']);
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
    const obraToCreate = { ...this.obra };
    delete obraToCreate.id;
    delete obraToCreate.created_at;
    delete obraToCreate.updated_at;

    this.obraService.create(obraToCreate).pipe(
      catchError(error => {
        console.error('Error al crear la obra:', error);
        Swal.fire('Error', 'No se pudo crear el registro. Verifica los datos.', 'error');
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(
      (response) => {
        if (response) {
          Swal.fire('¡Creado!', 'Registro creado correctamente.', 'success').then(() => {
            this.router.navigate(['/obra/list']);
          });
        }
        this.isLoading = false;
      }
    );
  }

  update(): void {
    this.isLoading = true;
    const obraToUpdate = { ...this.obra };
    delete obraToUpdate.created_at;
    delete obraToUpdate.updated_at;

    this.obraService.update(obraToUpdate).pipe(
      catchError(error => {
        console.error('Error al actualizar la obra:', error);
        Swal.fire('Error', 'No se pudo actualizar el registro. Verifica los datos.', 'error');
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(
      (response) => {
        if (response) {
          Swal.fire('¡Actualizado!', 'Registro actualizado correctamente.', 'success').then(() => {
            this.router.navigate(['/obra/list']);
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
        text: 'ID de obra no válido para eliminar.'
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
        this.obraService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/obra/list']);
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