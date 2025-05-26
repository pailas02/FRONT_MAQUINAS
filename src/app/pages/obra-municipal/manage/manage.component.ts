import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ObrasMunicipio } from 'src/app/models/obras-municipio.model';
import { Obra } from 'src/app/models/obra.model';
import { Municipio } from 'src/app/models/municipio.model';
import { ObrasMunicipioService } from 'src/app/services/obraMunicipio/obra-municipio.service';
import { ObraService } from 'src/app/services/obra/obra.service';
import { MunicipioService } from 'src/app/services/Municipio/municipio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1: view, 2: create, 3: update
  isSubmitting = false;
  obramunicipio: ObrasMunicipio = { id: 0, obra_id: 0, municipio_id: '' };
  obras: Obra[] = [];
  municipios: Municipio[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private obrasMunicipioService: ObrasMunicipioService,
    private obraService: ObraService,
    private municipioService: MunicipioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();

    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) this.mode = 1;
    else if (currentUrl.includes('create')) this.mode = 2;
    else if (currentUrl.includes('update')) this.mode = 3;

    const idParam = this.activateRoute.snapshot.params.id;
    if (idParam) {
      this.getObraMunicipio(Number(idParam));
    }
  }

  loadData(): void {
    this.obraService.list().subscribe(data => this.obras = data);
    this.municipioService.list().subscribe(data => this.municipios = data);
  }

  getObraMunicipio(id: number): void {
    this.obrasMunicipioService.getById(id).subscribe({
      next: (data) => this.obramunicipio = data,
      error: (error) => console.error('Error:', error)
    });
  }

  back(): void {
    this.router.navigate(['/obra-municipal/list']);
  }

  create(): void {
    this.isSubmitting = true;
    this.obrasMunicipioService.create(this.obramunicipio).subscribe({
      next: () => {
        Swal.fire('Creado', 'Registro creado correctamente.', 'success');
        this.back();
      },
      error: (err) => {
        console.error('Error al crear:', err);
        Swal.fire('Error', 'No se pudo crear el vínculo.', 'error');
      },
      complete: () => this.isSubmitting = false
    });
  }

  update(): void {
    this.isSubmitting = true;
    this.obrasMunicipioService.update(this.obramunicipio.id, this.obramunicipio).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Registro actualizado correctamente.', 'success');
        this.back();
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        Swal.fire('Error', 'No se pudo actualizar el vínculo.', 'error');
      },
      complete: () => this.isSubmitting = false
    });
  }
}
