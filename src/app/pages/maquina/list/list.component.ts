import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Maquina } from 'src/app/models/maquina.model'; // Importa el modelo Maquina
import { MaquinaService } from 'src/app/services/maquina/maquina.service'; // Importa el servicio MaquinaService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-maquina',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMaquinaComponent implements OnInit {

  maquinas: Maquina[] = []; // Arreglo para almacenar maquinarias, tipado con el modelo Maquina

  // Inyecta el servicio MaquinaService y Router
  constructor(private maquinaService: MaquinaService, private router: Router) { } // Renombrado a camelCase

  ngOnInit(): void {
    // Llama a un método para cargar las máquinas
    this.loadMaquinas();
  }

  loadMaquinas(): void {
    this.maquinaService.list().subscribe({
      next: (data) => {
        this.maquinas = data; // Asigna los datos a la propiedad maquinas
      },
      error: (error) => {
        console.error('Error al cargar las máquinas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de carga',
          text: 'No se pudieron cargar las máquinas. Inténtalo de nuevo más tarde.'
        });
      }
    });
  }

  edit(id: number | undefined) { // id puede ser undefined si el modelo lo permite
    if (id === undefined || isNaN(id)) { // Manejar id undefined
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido para la edición.'
      });
      return;
    }

    // La navegación ya es asíncrona, no necesitas el .then() completo para el Swal
    this.router.navigate([`/maquina/update`, id]).catch(error => {
        console.error('Error al navegar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de navegación',
          text: 'Ocurrió un error al intentar navegar al formulario de edición.'
        });
    });
  }

  delete(id: number | undefined) { // id puede ser undefined si el modelo lo permite
    if (id === undefined || isNaN(id)) { // Manejar id undefined
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido para la eliminación.'
      });
      return;
    }

    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que quiere eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.maquinaService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.loadMaquinas(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar la máquina:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }
}