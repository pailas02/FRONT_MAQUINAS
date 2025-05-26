import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensaje } from 'src/app/models/mensaje.model';
import { MensajeService } from 'src/app/services/mensaje/mensaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number = 1; // 1: Ver, 2: Crear, 3: Actualizar
  mensaje: Mensaje = new Mensaje();

  constructor(
    private activateRoute: ActivatedRoute,
    private mensajeService: MensajeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) this.mode = 1;
    else if (currentUrl.includes('create')) this.mode = 2;
    else if (currentUrl.includes('update')) this.mode = 3;

    const idParam = this.activateRoute.snapshot.params['id'];
    const id = Number(idParam);

    if (id && this.mode !== 2) {
      this.getMensaje(id);
    }
  }

  getMensaje(id: number): void {
    this.mensajeService.view(id).subscribe({
      next: (mensaje) => {
        this.mensaje = mensaje;
        console.log('Mensaje cargado correctamente:', mensaje);
      },
      error: (error) => {
        console.error('Error al obtener el mensaje:', error);
        Swal.fire('Error', 'No se pudo obtener el mensaje.', 'error');
      }
    });
  }

  create(): void {
    this.mensajeService.create(this.mensaje).subscribe({
      next: () => {
        Swal.fire('Creado', 'Mensaje creado correctamente.', 'success')
          .then(() => this.router.navigate(['/mensaje/list']));
      },
      error: (error) => {
        console.error('Error al crear el mensaje:', error);
        Swal.fire('Error', 'No se pudo crear el mensaje.', 'error');
      }
    });
  }

  update(): void {
    this.mensajeService.update(this.mensaje).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Mensaje actualizado correctamente.', 'success')
          .then(() => this.router.navigate(['/mensaje/list']));
      },
      error: (error) => {
        console.error('Error al actualizar el mensaje:', error);
        Swal.fire('Error', 'No se pudo actualizar el mensaje.', 'error');
      }
    });
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar este mensaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mensajeService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Mensaje eliminado correctamente.', 'success');
            this.router.navigate(['/mensaje/list']);
          },
          error: (error) => {
            console.error('Error al eliminar el mensaje:', error);
            Swal.fire('Error', 'No se pudo eliminar el mensaje.', 'error');
          }
        });
      }
    });
  }

  back(): void {
    this.router.navigate(['/mensaje/list']);
  }
}
