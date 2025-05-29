import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operario } from 'src/app/models/operario.model';
import { OperarioService } from 'src/app/services/operario/operario.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-manage-operario',
  templateUrl: './manage.component.html'
})
export class ManageOperarioComponent implements OnInit {
  operario: Operario = new Operario();
  mode: 'create' | 'view' | 'update' = 'create';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operarioService: OperarioService
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.url.map(s => s.path).join('/');
    if (path.includes('view')) this.mode = 'view';
    else if (path.includes('update')) this.mode = 'update';

    const id = this.route.snapshot.params['id'];
    if ((this.mode === 'view' || this.mode === 'update') && id) {
      this.getOperario(id);
    }
  }

  getOperario(id: number): void {
    this.isLoading = true;
    this.operarioService.view(id).pipe(
      catchError(() => {
        Swal.fire('Error', 'No se pudo cargar el operario.', 'error');
        this.router.navigate(['/operario/list']);
        return of(null);
      })
    ).subscribe(data => {
      if (data) this.operario = data;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    if (this.mode === 'create') {
      this.operarioService.create(this.operario).subscribe({
        next: () => {
          Swal.fire('Creado', 'Operario creado correctamente.', 'success')
            .then(() => this.router.navigate(['/operario/list']));
        },
        error: () => Swal.fire('Error', 'No se pudo crear el operario.', 'error')
      });
    } else if (this.mode === 'update') {
      this.operarioService.update(this.operario).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Operario actualizado.', 'success')
            .then(() => this.router.navigate(['/operario/list']));
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar.', 'error')
      });
    }
  }

  back(): void {
    this.router.navigate(['/operario/list']);
  }
}
