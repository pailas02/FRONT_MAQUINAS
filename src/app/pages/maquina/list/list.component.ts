// src/app/pages/maquina/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Maquina } from 'src/app/models/maquina.model';
import { MaquinaService } from '../../../services/maquina/maquina.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-maquina-list', // Selector único
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  maquinas: Maquina[] = [];
  isLoading: boolean = true;

  constructor(
    private maquinaService: MaquinaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMaquinas();
  }

  loadMaquinas(): void {
    this.isLoading = true;
    this.maquinaService.list().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) => {
        this.maquinas = data;
        console.log('Máquinas cargadas:', this.maquinas);
      },
      error: (error) => {
        console.error('Error al cargar las máquinas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron cargar las máquinas. Por favor, inténtalo de nuevo más tarde.'
        });
        this.maquinas = [];
      }
    });
  }

  createMaquina(): void {
    this.router.navigate(['/maquina/create']);
  }

  edit(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID de la máquina no es válido para editar.' });
      return;
    }
    this.router.navigate(['/maquina/update', id]);
  }

  delete(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID de la máquina no es válido para eliminar.' });
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
        this.maquinaService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El registro ha sido eliminado correctamente.', 'success');
            this.loadMaquinas(); // Recarga la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar la máquina:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  view(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID de la máquina no es válido para ver detalles.' });
      return;
    }
    this.router.navigate(['/maquina/view', id]);
  }
}