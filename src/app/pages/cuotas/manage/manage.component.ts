import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuotas } from 'src/app/models/cuota.model';
import { CuotasService } from 'src/app/services/cuotas/cuotas.service';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { Servicio } from 'src/app/models/servicio.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-cuota',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  // 1 -> Ver, 2 -> Crear, 3 -> Actualizar
  mode: number;
  cuota: Cuotas = { id: 0 };
  cuotaForm: FormGroup;
  availableServices: Servicio[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private cuotasService: CuotasService,
    private servicioService: ServicioService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.setMode();
    this.loadServices();

    const idParam = this.activateRoute.snapshot.params.id;
    if (idParam && !isNaN(+idParam)) {
      this.cuota.id = +idParam;
      this.loadCuota(this.cuota.id);
    }
  }

  /**
   * Define el modo del formulario según la URL (view/create/update)
   */
  private setMode(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if (this.mode === 1) {
      this.cuotaForm.disable();
    }
  }

  /**
   * Inicializa el formulario con validaciones
   */
  private createForm(): void {
    this.cuotaForm = this.fb.group({
      id_servicio: [[], Validators.required],
      valor: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(/^[0-9]+([.][0-9]{0,2})?$/)
        ]
      ]
    });
  }

  /**
   * Marca todos los campos del formulario como tocados para mostrar errores
   */
  private markFormTouched(): void {
    Object.values(this.cuotaForm.controls).forEach(control => control.markAsTouched());
  }

  /**
   * Carga la lista de servicios disponibles
   */
  private loadServices(): void {
    this.servicioService.list().subscribe({
      next: (services) => {
        this.availableServices = services;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los servicios', 'error');
      }
    });
  }

  /**
   * Carga los datos de una cuota para editar o ver
   * @param id ID de la cuota a cargar
   */
  private loadCuota(id: number): void {
    this.cuotasService.view(id).subscribe({
      next: (cuota) => {
        this.cuota = cuota;
        this.cuotaForm.patchValue({
          id_servicio: cuota.id_servicio,
          valor: cuota.valor
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la cuota', 'error');
      }
    });
  }

  /**
   * Redirige al listado de cuotas
   */
  back(): void {
    this.router.navigate(['/cuotas/list']);
  }

  /**
   * Crea una nueva cuota si el formulario es válido
   */
  create(): void {
    if (this.cuotaForm.invalid) {
      this.markFormTouched();
      return;
    }

    const formValue = this.cuotaForm.value;
    this.cuotasService.create({ ...this.cuota, ...formValue }).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Cuota creada correctamente', 'success');
        this.router.navigate(['/cuotas/list']);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo crear la cuota', 'error');
      }
    });
  }

  /**
   * Actualiza una cuota existente si el formulario es válido
   */
  update(): void {
    if (this.cuotaForm.invalid) {
      this.markFormTouched();
      return;
    }

    const formValue = this.cuotaForm.value;
    this.cuotasService.update({ ...this.cuota, ...formValue }).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Cuota actualizada correctamente', 'success');
        this.router.navigate(['/cuotas/list']);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar la cuota', 'error');
      }
    });
  }
}
