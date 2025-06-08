// manage.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  mode: 'create' | 'view' | 'update' = 'create';
  isLoading = false;
  maquinas: Maquina[] = [];
  seguros: Seguro[] = [];
  tiposOperario: string[] = ['TIPO1', 'TIPO2']; // Reemplaza con los tipos válidos para operario
  tiposMaquina: string[] = ['TIPO3', 'TIPO4']; // Reemplaza con los tipos válidos para máquina


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PolizaMaquinaService,
    private maquinaService: MaquinaService,
    private seguroService: SeguroService,
    private fb: FormBuilder // <-- Agregado FormBuilder como propiedad
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

  initForm(): void {
    this.form = this.fb.group({
      seguro_id: [null, [Validators.required, Validators.min(1)]],
      maquina_id: [null],
      operario_id: [null],
      tipo_poliza: [null, Validators.required],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
      tipoEntidad: [null, Validators.required],
    });

    this.form.get('tipoEntidad')?.valueChanges.subscribe(value => {
      if (value === 'maquina') {
        this.form.patchValue({ operario_id: null });
      } else if (value === 'operario') {
        this.form.patchValue({ maquina_id: null });
      }
    });
  }

  getPoliza(id: number): void {
    this.isLoading = true;
    this.service.view(id).pipe(
      catchError(() => {
        Swal.fire('Error', 'No se pudo cargar la póliza.', 'error');
        this.router.navigate(['/poliza/list']);
        return of(null);
      })
    ).subscribe(data => {
      if (data) {
        const tipoEntidad = data.operario_id ? 'operario' : 'maquina';
        this.form.patchValue({
          seguro_id: data.seguro_id,
          maquina_id: data.maquina_id,
          operario_id: data.operario_id,
          tipo_poliza: data.tipo_poliza,
          fechaInicio: data.fecha_inicio,
          fechaFin: data.fecha_fin,
          tipoEntidad
        });
      }
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const data = this.form.value;

    if ((data.operario_id && data.maquina_id) || (!data.operario_id && !data.maquina_id)) {
      Swal.fire('Error', 'Debe asignar una máquina o un operario, no ambos.', 'error');
      return;
    }

    if (data.operario_id && !this.tiposOperario.includes(data.tipo_poliza)) {
      Swal.fire('Error', 'Tipo de póliza inválido para operario.', 'error');
      return;
    }

    if (data.maquina_id && !this.tiposMaquina.includes(data.tipo_poliza)) {
      Swal.fire('Error', 'Tipo de póliza inválido para maquinaria.', 'error');
      return;
    }

    const payload = {
      seguro_id: data.seguro_id,
      maquina_id: data.maquina_id,
      operario_id: data.operario_id,
      tipo_poliza: data.tipo_poliza,
      fecha_inicio: data.fechaInicio,
      fecha_fin: data.fechaFin,
    };

    if (this.mode === 'create') {
      this.service.create(payload).subscribe({
        next: () => {
          Swal.fire('Creado', 'Registro guardado.', 'success').then(() =>
            this.router.navigate(['/poliza/list'])
          );
        },
        error: (err) => {
          const errores = err?.error?.errors?.errors;
          const mensaje = errores?.map((e: any) => `• ${e.message}`).join('<br>') || 'Error desconocido.';
          Swal.fire({ title: 'Error', html: mensaje, icon: 'error' });
        }
      });
    } else if (this.mode === 'update') {
      const id = this.route.snapshot.params['id'];
      this.service.update({ id, ...payload }).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Registro actualizado.', 'success').then(() =>
            this.router.navigate(['/poliza/list'])
          );
        },
        error: (err) => {
          const errores = err?.error?.errors?.errors;
          const mensaje = errores?.map((e: any) => `• ${e.message}`).join('<br>') || 'Error desconocido.';
          Swal.fire({ title: 'Error', html: mensaje, icon: 'error' });
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/poliza/list']);
  }

  get f() {
    return this.form.controls;
  }
}