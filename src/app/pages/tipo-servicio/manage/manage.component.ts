import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoServicio } from 'src/app/models/tipo-servicio.model';
import { TipoServicioService } from 'src/app/services/tipo-servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-tipo-servicio',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageTipoServicioComponent implements OnInit {

  mode: number = 1;
  tipo: TipoServicio = { id: 0, nombre: '', maquinaId: undefined };

  constructor(
    private activateRoute: ActivatedRoute,
    private tipoService: TipoServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) this.mode = 1;
    else if (currentUrl.includes('create')) this.mode = 2;
    else if (currentUrl.includes('update')) this.mode = 3;

    const id = Number(this.activateRoute.snapshot.params['id']);
    if (id && this.mode !== 2) this.getTipo(id);
  }

  getTipo(id: number): void {
    this.tipoService.view(id).subscribe({
      next: (data) => this.tipo = data,
      error: () => Swal.fire('Error', 'No se pudo cargar el tipo de servicio.', 'error')
    });
  }

  create(): void {
    this.tipoService.create(this.tipo).subscribe({
      next: () => Swal.fire('Creado', 'Registro creado correctamente.', 'success')
        .then(() => this.router.navigate(['/tipos-servicio/list'])),
      error: () => Swal.fire('Error', 'No se pudo crear el registro.', 'error')
    });
  }

  update(): void {
    this.tipoService.update(this.tipo).subscribe({
      next: () => Swal.fire('Actualizado', 'Registro actualizado correctamente.', 'success')
        .then(() => this.router.navigate(['/tipos-servicio/list'])),
      error: () => Swal.fire('Error', 'No se pudo actualizar el registro.', 'error')
    });
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
        this.tipoService.delete(id).subscribe({
          next: () => Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success')
            .then(() => this.router.navigate(['/tipos-servicio/list'])),
          error: () => Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
        });
      }
    });
  }

  back(): void {
    this.router.navigate(['/tipos-servicio/list']);
  }
}
