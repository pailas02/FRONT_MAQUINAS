import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Factura } from 'src/app/models/factura.model';
import { FacturaService } from 'src/app/services/factura/factura.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-factura',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageFacturaComponent implements OnInit {
  facturas: Factura[] = [];
  isLoading = false;

  constructor(
    private facturaService: FacturaService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.facturaService.list().subscribe({
      next: (data) => {
        this.facturas = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener las facturas:', error);
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar las facturas.', 'error');
      }
    });
  }

  edit(id: number): void {
    this.router.navigate(['/facturas/update', id]);
  }

  view(id: number): void {
    this.router.navigate(['/facturas/view', id]);
  }

  delete(id: number): void {
    Swal.fire({
      title: '¿Eliminar factura?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.facturaService.delete(id).subscribe({
          next: () => {
            this.facturas = this.facturas.filter(f => f.id !== id);
            this.cdr.detectChanges();
            Swal.fire('Eliminado', 'Factura eliminada correctamente.', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar la factura:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/facturas/create']);
  }
}
