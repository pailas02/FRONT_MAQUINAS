// src/app/pages/gps/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GPS } from 'src/app/models/gps.model';
import { GPSService } from '../../../services/gpsService/gps.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-gps-list', // Selector único
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  gpsRecords: GPS[] = [];
  isLoading: boolean = true;

  constructor(
    private gpsService: GPSService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGPSRecords();
  }

  loadGPSRecords(): void {
    this.isLoading = true;
    this.gpsService.list().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) => {
        this.gpsRecords = data;
        console.log('Registros GPS cargados:', this.gpsRecords);
      },
      error: (error) => {
        console.error('Error al cargar los registros GPS:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron cargar los registros GPS. Por favor, inténtalo de nuevo más tarde.'
        });
        this.gpsRecords = [];
      }
    });
  }

  createGPS(): void {
    this.router.navigate(['/gps/create']);
  }

  edit(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID del registro GPS no es válido para editar.' });
      return;
    }
    this.router.navigate(['/gps/update', id]);
  }

  delete(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID del registro GPS no es válido para eliminar.' });
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
        this.gpsService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El registro ha sido eliminado correctamente.', 'success');
            this.loadGPSRecords(); // Recarga la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar el registro GPS:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  view(id: number | undefined): void {
    if (id === undefined || isNaN(id)) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'El ID del registro GPS no es válido para ver detalles.' });
      return;
    }
    this.router.navigate(['/gps/view', id]);
  }
}