import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Maquina } from 'src/app/models/maquina.model'; 
import { MaquinaService } from 'src/app/services/maquina/maquina.service'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-maquina',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListMaquinaComponent implements OnInit {

  maquinas: Maquina[] = []; // Arreglo para almacenar maquinarias, tipado con el modelo Maquina
  listLoading: boolean = false; // Propiedad para manejar el estado de carga

  // Inyecta el servicio MaquinaService y Router (si lo necesitas)
  constructor(private MaquinaService: MaquinaService, private router: Router) { }

  ngOnInit(): void {
    this.listLoading = true;
    // Llama al servicio para obtener la lista de maquinarias
    this.MaquinaService.list().subscribe(data => {
      this.maquinas = data; // Asigna los datos a la propiedad machineries
      this.listLoading = false;
    }, () => {
      this.listLoading = false;
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Maquina)
  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }
    this.router.navigate([`/maquina/update`, id]).then(
      (success) => {
        if (success) {
          Swal.fire({
            icon: 'success',
            title: 'Redirigido',
            text: 'Navegación exitosa al formulario de edición.'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo navegar al formulario de edición.'
          });
        }
      },
      (error) => {
        console.error('Error al navegar:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar navegar al formulario de edición.'
        });
      }
    );
  }

  delete(id: number) {
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
        this.MaquinaService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.ngOnInit(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar la máquina:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }
  createMachine() {
  this.router.navigate(['/maquina/create']);
}

}