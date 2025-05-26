import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcedimientoMantenimiento } from 'src/app/models/procedimiento-mantenimiento.model'; // Importa el modelo ProcedimientoMantenimiento
import { ProcedimientoMantenimientoService } from 'src/app/services/procedimientoMantenimiento/procedimiento-mantenimiento.service'; // Importa el servicio ProcedimientoMantenimientoService
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Importa Router si necesitas navegación

@Component({
  selector: 'app-list-procedimiento-mantenimiento',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListProcedimientoMantenimientoComponent implements OnInit {

  procedimientomantenimientos: ProcedimientoMantenimiento[] = []; // Arreglo para almacenar vínculos, tipado con el modelo ProcedimientoMantenimiento

  // Inyecta el servicio ProcedimientoMantenimientoService y Router (si lo necesitas)
  constructor(private ProcedimientoMantenimientoService: ProcedimientoMantenimientoService , private router: Router) { }

  ngOnInit(): void {
    // Llama al servicio para obtener la lista de vínculos
    this.ProcedimientoMantenimientoService.list().subscribe(data => {
      this.procedimientomantenimientos = data; // Asigna los datos a la propiedad ProcedimientoMantenimientos
    });
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo ProcedimientoMantenimiento)
  edit(id: number) {
    this.router.navigate(['procedimiento-mantenimiento/update', id])
    // Implementa navegación, ej: this.router.navigate(['/admin/ProcedimientoMantenimiento/edit', id]);
  }

  delete(id: number) {
   console.log("Delete procedimientomantenimiento with id:", id);
       Swal.fire({
         title: 'Eliminar',
         text: "Está procedimientomantenimiento que quiere eliminar el registro?",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, eliminar',
         cancelButtonText: 'Cancelar'
       }).then((result) => {
         if (result.isConfirmed) { 
           this.ProcedimientoMantenimientoService.delete(id).
             subscribe(data => {
               Swal.fire(
                 'Eliminado!',
                 'Registro eliminado correctamente.',
                 'success'
               )
               this.ngOnInit();
             });
         }
       })
  }
}