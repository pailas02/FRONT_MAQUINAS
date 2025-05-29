import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evidencia } from 'src/app/models/evidencia.model';
import { EvidenciaService } from 'src/app/services/evidencia/evidencia.service';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { NovedadService } from 'src/app/services/novedad/novedad.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-manage-evidencia',
  templateUrl: './manage.component.html'
})
export class ManageEvidenciaComponent implements OnInit {
  evidencia: Evidencia = new Evidencia();
  mode: 'create' | 'view' | 'update' = 'create';
  isLoading = false;
  servicios: any[] = [];
  novedades: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evidenciaService: EvidenciaService,
    private servicioService: ServicioService,
    private novedadService: NovedadService
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.url.map(s => s.path).join('/');
    if (path.includes('view')) this.mode = 'view';
    else if (path.includes('update')) this.mode = 'update';

    this.servicioService.list().subscribe(data => this.servicios = data);
    this.novedadService.list().subscribe(data => this.novedades = data);

    const id = this.route.snapshot.params['id'];
    if ((this.mode === 'view' || this.mode === 'update') && id) {
      this.getEvidencia(id);
    }
  }

  getEvidencia(id: number): void {
    this.isLoading = true;
    this.evidenciaService.view(id).pipe(
      catchError(() => {
        Swal.fire('Error', 'No se pudo cargar la evidencia.', 'error');
        this.router.navigate(['/evidencia/list']);
        return of(null);
      })
    ).subscribe(data => {
      if (data) this.evidencia = data;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    this.evidencia.id_servicio = Number(this.evidencia.id_servicio);
    this.evidencia.novedad_id = Number(this.evidencia.novedad_id);

    if (this.mode === 'create') {
      this.evidenciaService.create(this.evidencia).subscribe({
        next: () =>
          Swal.fire('Creado', 'Evidencia guardada.', 'success').then(() =>
            this.router.navigate(['/evidencia/list'])
          ),
        error: () => Swal.fire('Error', 'No se pudo crear.', 'error')
      });
    } else if (this.mode === 'update') {
      this.evidenciaService.update(this.evidencia).subscribe({
        next: () =>
          Swal.fire('Actualizado', 'Evidencia actualizada.', 'success').then(() =>
            this.router.navigate(['/evidencia/list'])
          ),
        error: () => Swal.fire('Error', 'No se pudo actualizar.', 'error')
      });
    }
  }

  back(): void {
    this.router.navigate(['/evidencia/list']);
  }
}
