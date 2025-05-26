import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Combo } from 'src/app/models/combo.model';
import { ComboService } from '../../../services/combo/combos.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  combos: Combo[] = [];
  isLoading: boolean = true;

  constructor(
    private comboService: ComboService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCombos();
  }

  loadCombos(): void {
    this.isLoading = true;
    this.comboService.list().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) => {
        this.combos = data;
        console.log('Combos cargados:', this.combos);
      },
      error: (error) => {
        console.error('Error al cargar los combos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron cargar los combos. Por favor, inténtalo de nuevo más tarde.'
        });
        this.combos = [];
      }
    });
  }

  createCombo(): void {
    this.router.navigate(['/combo/create']);
  }

  edit(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID del combo no es válido para editar.' });
      return;
    }
    this.router.navigate(['/combo/update', id]);
  }

  delete(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID del combo no es válido para eliminar.' });
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
        this.comboService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El registro ha sido eliminado correctamente.', 'success');
            this.loadCombos();
          },
          error: (error) => {
            console.error('Error al eliminar el combo:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  view(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID del combo no es válido para ver detalles.' });
      return;
    }
    this.router.navigate(['/combo/view', id]);
  }
}