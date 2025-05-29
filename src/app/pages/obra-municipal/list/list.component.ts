import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObrasMunicipio } from 'src/app/models/obras-municipio.model';
import { ObrasMunicipioService } from 'src/app/services/obraMunicipio/obra-municipio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-municipality-construction',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListObraMunicipioComponent implements OnInit {

  obramunicipios: ObrasMunicipio[] = [];
  searchTerm: string = '';

  constructor(
    private ObrasMunicipioService: ObrasMunicipioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.ObrasMunicipioService.list().subscribe(data => {
      this.obramunicipios = data;
    });
  }

  edit(id: number) {
    this.router.navigate(['obra-municipio/update', id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que desea eliminar este vínculo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ObrasMunicipioService.delete(id).subscribe(() => {
          Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
          this.loadData();
        });
      }
    });
  }

  filtered(): ObrasMunicipio[] {
    if (!this.searchTerm.trim()) return this.obramunicipios;

    const term = this.searchTerm.toLowerCase();
    return this.obramunicipios.filter(o =>
      o.obra_id.toString().includes(term) ||
      o.municipio_id.toLowerCase().includes(term)
    );
  }
  createObra(): void {
    this.router.navigate(['/obra-municipal/create']);
  }
}
