import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Novedad } from 'src/app/models/novedad.model';
import { NovedadService } from 'src/app/services/novedad/novedad.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-manage-novedad',
  templateUrl: './manage.component.html'
})
export class ManageNovedadComponent implements OnInit {
  novedad: Novedad = new Novedad();
  mode: 'create' | 'view' | 'update' = 'create';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: NovedadService
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.url.map(s => s.path).join('/');
    if (path.includes('view')) this.mode = 'view';
    else if (path.includes('update')) this.mode = 'update';

    const id = this.route.snapshot.params['id'];
    if ((this.mode === 'view' || this.mode === 'update') && id) {
      this.getNovedad(id);
    }
  }

  getNovedad(id: number): void {
    this.isLoading = true;
    this.service.view(id).pipe(
      catchError(() => {
        Swal.fire('Error', 'No se pudo cargar la novedad.', 'error');
        this.router.navigate(['/novedad/list']);
        return of(null);
      })
    ).subscribe((data) => {
      if (data) this.novedad = data;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    if (this.mode === 'create') {
      this.service.create(this.novedad).subscribe({
        next: () => {
          Swal.fire('Creado', 'Registro guardado.', 'success').then(() =>
            this.router.navigate(['/novedad/list'])
          );
        },
        error: () => Swal.fire('Error', 'No se pudo crear.', 'error')
      });
    } else if (this.mode === 'update') {
      this.service.update(this.novedad).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Registro actualizado.', 'success').then(() =>
            this.router.navigate(['/novedad/list'])
          );
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar.', 'error')
      });
    }
  }

  back(): void {
    this.router.navigate(['/novedad/list']);
  }
}
