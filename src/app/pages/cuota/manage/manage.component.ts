import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota.model';
import { CuotaService } from 'src/app/services/cuotas/cuotas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-cuota',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number = 1; // 1: Ver, 2: Crear, 3: Editar
  cuota: Cuota = {};

  constructor(
    private route: ActivatedRoute,
    private cuotaService: CuotaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.detectModeFromUrl();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.cuota.id = +id;
      this.loadCuota(this.cuota.id);
    }
  }

  // Determina el modo actual basado en la URL
  private detectModeFromUrl(): void {
    const url = this.route.snapshot.url.join('/');
    if (url.includes('view')) {
      this.mode = 1;
    } else if (url.includes('create')) {
      this.mode = 2;
    } else if (url.includes('update')) {
      this.mode = 3;
    }
  }

  // Carga una cuota desde el backend
  private loadCuota(id: number): void {
    this.cuotaService.view(id).subscribe({
      next: (cuota) => {
        this.cuota = cuota;
        console.log('Cuota cargada correctamente:', cuota);
      },
      error: (err) => {
        console.error('Error al obtener cuota:', err);
      }
    });
  }

  // Redirige a la lista de cuotas
  back(): void {
    this.router.navigate(['/cuota/list']);
  }

  // Crea una nueva cuota
  create(): void {
    this.cuotaService.create(this.cuota).subscribe({
      next: () => {
        Swal.fire('Creado', 'Registro creado correctamente.', 'success');
        this.back();
      },
      error: (err) => {
        console.error('Error al crear cuota:', err);
      }
    });
  }

  // Actualiza una cuota existente
  update(): void {
    this.cuotaService.update(this.cuota).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Registro actualizado correctamente.', 'success');
        this.back();
      },
      error: (err) => {
        console.error('Error al actualizar cuota:', err);
      }
    });
  }

  // Elimina una cuota con confirmación
  delete(id: number): void {
    Swal.fire({
      title: '¿Eliminar?',
      text: '¿Está seguro que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuotaService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success');
            this.back();
          },
          error: (err) => {
            console.error('Error al eliminar cuota:', err);
          }
        });
      }
    });
  }
}
