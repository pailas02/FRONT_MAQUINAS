import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolizaMaquina } from 'src/app/models/poliza.model';
import { PolizaMaquinaService } from 'src/app/services/poliza/poliza.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Maquina } from 'src/app/models/maquina.model';
import { Seguro } from 'src/app/models/seguro.model';
import { MaquinaService } from 'src/app/services/maquina/maquina.service';
import { SeguroService } from 'src/app/services/seguro/seguro.service';


@Component({
  selector: 'app-manage-poliza-maquina',
  templateUrl: './manage.component.html'
})
export class ManagePolizaMaquinaComponent implements OnInit {
  poliza: PolizaMaquina = new PolizaMaquina();
  mode: 'create' | 'view' | 'update' = 'create';
  isLoading = false;
  maquinas: Maquina[] = [];
  seguros: Seguro[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PolizaMaquinaService,
    private maquinaService: MaquinaService,
  private seguroService: SeguroService
  ) {}

  ngOnInit(): void {
  this.maquinaService.getAll().subscribe(data => this.maquinas = data);
  this.seguroService.getAll().subscribe(data => this.seguros = data);

    const path = this.route.snapshot.url.map(s => s.path).join('/');
    if (path.includes('view')) this.mode = 'view';
    else if (path.includes('update')) this.mode = 'update';

    const id = this.route.snapshot.params['id'];
    if ((this.mode === 'view' || this.mode === 'update') && id) {
      this.getPoliza(id);
    }
  }

  getPoliza(id: number): void {
    this.isLoading = true;
    this.service.view(id).pipe(
      catchError(() => {
        Swal.fire('Error', 'No se pudo cargar la póliza.', 'error');
        this.router.navigate(['/poliza/list']);
        return of(null);
      })
    ).subscribe((data) => {
      if (data) this.poliza = data;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
  this.poliza.seguro_id = Number(this.poliza.seguro_id);
  this.poliza.maquina_id = Number(this.poliza.maquina_id);
    if (this.mode === 'create') {
      this.service.create(this.poliza).subscribe({
        next: () => {
          Swal.fire('Creado', 'Registro guardado.', 'success').then(() =>
            this.router.navigate(['/poliza/list'])
          );
        },
        error: () => Swal.fire('Error', 'No se pudo crear.', 'error')
      });
    } else if (this.mode === 'update') {
      this.service.update(this.poliza).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Registro actualizado.', 'success').then(() =>
            this.router.navigate(['/poliza/list'])
          );
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar.', 'error')
      });
    }
  }

  back(): void {
    this.router.navigate(['/poliza/list']);
  }
}
