import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio.model';
import { Departamento } from 'src/app/models/departamento.model';
import { MunicipioService } from '../../../services/Municipio/municipio.service';
import { DepartamentoService } from '../../../services/departamento.service';
import Swal from 'sweetalert2';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  municipios: Municipio[] = [];
  departamentos: Departamento[] = [];
  isLoading: boolean = true;
  searchTerm: string = ''; // <-- filtro buscador

  constructor(
    private municipioService: MunicipioService,
    private departamentoService: DepartamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    forkJoin({
      municipios: this.municipioService.list(),
      departamentos: this.departamentoService.list()
    }).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (data) => {
        this.departamentos = data.departamentos;
        this.municipios = data.municipios;
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron cargar los datos. Por favor, inténtalo de nuevo más tarde.'
        });
        this.municipios = [];
        this.departamentos = [];
      }
    });
  }

  getDepartamentoNombre(departamentoId: number | undefined): string {
    if (departamentoId === undefined || this.departamentos.length === 0) {
      return 'Desconocido';
    }
    const departamento = this.departamentos.find(d => d.id === departamentoId);
    return departamento ? departamento.nombre || 'Sin nombre' : 'Desconocido';
  }

  filteredMunicipios(): Municipio[] {
    if (!this.searchTerm.trim()) {
      return this.municipios;
    }

    const term = this.searchTerm.toLowerCase();
    return this.municipios.filter(m =>
      m.nombre?.toLowerCase().includes(term) ||
      m.id?.toString().includes(term) ||
      this.getDepartamentoNombre(m.departamento_id).toLowerCase().includes(term)
    );
  }
}
