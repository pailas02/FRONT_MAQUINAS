import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoServicio } from 'src/app/models/tipo-servicio.model';
import { TipoServicioService } from 'src/app/services/tipo-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tipo-servicio',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListTipoServicioComponent implements OnInit {

  tipos: TipoServicio[] = [];

  constructor(
    private tipoServicioService: TipoServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tipoServicioService.list().subscribe({
      next: (data) => this.tipos = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar los tipos de servicio', 'error')
    });
  }

  edit(id: number): void {
    this.router.navigate(['/tipos-servicio/update', id]);
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar este tipo de servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoServicioService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success');
            this.ngOnInit();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
        });
      }
    });
  }

  view(id: number): void {
    this.router.navigate(['/tipos-servicio/view', id]);
  }

  create(): void {
    this.router.navigate(['/tipos-servicio/create']);
  }
}
