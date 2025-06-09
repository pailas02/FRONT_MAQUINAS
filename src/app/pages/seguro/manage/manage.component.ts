import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguro } from 'src/app/models/seguro.model';
import { Maquina } from 'src/app/models/maquina.model';
import { Operario } from 'src/app/models/operario.model';
import { SeguroService } from 'src/app/services/seguro/seguro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number = 1;
  seguro: Seguro = {
    id: 0,
    nombre: '',
    descripcion: '',
    costo: 0,
    maquianaId: undefined,
    operarioId: undefined
  };

  maquinas: Maquina[] = [];
  operarios: Operario[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private seguroService: SeguroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) this.mode = 1;
    else if (currentUrl.includes('create')) this.mode = 2;
    else if (currentUrl.includes('update')) this.mode = 3;

    this.loadMaquinas();
    this.loadOperarios();

    const id = Number(this.activateRoute.snapshot.params['id']);
    if (id && this.mode !== 2) {
      this.getSeguro(id);
    }
  }

  getSeguro(id: number): void {
    this.seguroService.view(id).subscribe({
      next: (data) => {
        this.seguro = data;
        console.log('Seguro cargado:', this.seguro);
      },
      error: (error) => {
        console.error('Error al obtener seguro:', error);
        Swal.fire('Error', 'No se pudo cargar el seguro.', 'error');
      }
    });
  }

  create(): void {
    this.seguroService.create(this.seguro).subscribe({
      next: () => {
        Swal.fire('Creado', 'Registro creado correctamente.', 'success')
          .then(() => this.router.navigate(['/seguro/list']));
      },
      error: (error) => {
        console.error('Error al crear seguro:', error);
        Swal.fire('Error', 'No se pudo crear el seguro.', 'error');
      }
    });
  }

  update(): void {
    this.seguroService.update(this.seguro).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Registro actualizado correctamente.', 'success')
          .then(() => this.router.navigate(['/seguro/list']));
      },
      error: (error) => {
        console.error('Error al actualizar seguro:', error);
        Swal.fire('Error', 'No se pudo actualizar el seguro.', 'error');
      }
    });
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar este seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.seguroService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success');
            this.router.navigate(['/seguro/list']);
          },
          error: (error) => {
            console.error('Error al eliminar seguro:', error);
            Swal.fire('Error', 'No se pudo eliminar el seguro.', 'error');
          }
        });
      }
    });
  }

  back(): void {
    this.router.navigate(['/seguro/list']);
  }

  loadMaquinas(): void {
    this.seguroService.getMaquinas().subscribe({
      next: (data) => this.maquinas = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar las máquinas', 'error')
    });
  }

  loadOperarios(): void {
    this.seguroService.getOperarios().subscribe({
      next: (data) => this.operarios = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar los operarios', 'error')
    });
  }
}
