import { Component, OnInit } from '@angular/core';
import { Gobernante } from 'src/app/models/gobernante.model';
import { GobernanteService } from 'src/app/services/gobernante/gobernante.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gobernante-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class GobernanteListComponent implements OnInit {

  gobernantes: Gobernante[] = [];
  displayedColumns: string[] = ['id', 'usuario', 'departamento', 'municipio', 'acciones'];
  
  constructor(
    private gobernanteService: GobernanteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.gobernanteService.list().subscribe({
      next: (data) => this.gobernantes = data,
      error: () => Swal.fire('Error', 'No se pudieron cargar los gobernantes', 'error')
    });
  }

  goToView(id: number): void {
    this.router.navigate(['/gobernantes/view', id]);
  }

  create(): void {
    this.router.navigate(['/gobernantes/create']);
  }

  edit(id: number): void {
    this.router.navigate(['/gobernantes/update', id]);
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.gobernanteService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success');
            this.getAll();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el registro.', 'error')
        });
      }
    });
  }

}
