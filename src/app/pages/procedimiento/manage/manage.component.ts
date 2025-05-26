import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Procedimiento } from 'src/app/models/procedimiento.model';
import { ProcedimientoService } from 'src/app/services/procedimiento/procedimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3-> Update
  procedimiento: Procedimiento;

  constructor(private activateRoute: ActivatedRoute,
    private someProcedimiento: ProcedimientoService,
    private router: Router
  ) {
    this.procedimiento = { id: 0 }
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.procedimiento.id = this.activateRoute.snapshot.params.id  
      this.getProcedimiento(this.procedimiento.id)
    }
  }
  getProcedimiento(id: number) {
    this.someProcedimiento.view(id).subscribe({
      next: (procedimiento) => {
        this.procedimiento = procedimiento;
        console.log('procedimiento fetched successfully:', this.procedimiento);
      },
      error: (error) => {
        console.error('Error fetching procedimiento:', error);
      }
    });
  }
  back() {
    this.router.navigate(['procedimiento/list'])
  }
  create() {
    this.someProcedimiento.create(this.procedimiento).subscribe({
      next: (procedimiento) => {
        console.log('procedimiento created successfully:', procedimiento);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/procedimientos/list']);
      },
      error: (error) => {
        console.error('Error creating procedimiento:', error);
      }
    });
  }
  update() {
    this.someProcedimiento.update(this.procedimiento).subscribe({
      next: (procedimiento) => {
        console.log('procedimiento updated successfully:', procedimiento);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        })
        this.router.navigate(['/procedimiento/list']);
      },
      error: (error) => {
        console.error('Error updating procedimiento:', error);
      }
    });
  }
  delete(id: number) {
    console.log("Delete procedimiento with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "Está procedimiento que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) { 
        this.someProcedimiento.delete(id).
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
