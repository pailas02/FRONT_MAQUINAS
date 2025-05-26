// Gps/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gps } from 'src/app/models/gps.model';
import { GpsService } from 'src/app/services/gpsService/gps.service'; 
import Swal from 'sweetalert2';
// import { Router } from '@angular/router'; // Import Router if you need navigation

@Component({
  selector: 'app-list-gps',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListGpsComponent implements OnInit {

  gpsPoints: Gps[] = []; // Array to store Gps points

  constructor(private gpsService: GpsService , private router: Router) { }

  ngOnInit(): void {
    // Call the service to get the list of Gps points
    this.gpsService.list().subscribe(data => {
      this.gpsPoints = data; // Assign data to the gpsPoints array
    });
  }

  // Methods for edit and delete (adjust ID type based on your Gps model)
  edit(id: number) {
    this.router.navigate(['Gps/update', id])
    // Implement navigation, e.g: this.router.navigate(['/admin/Gps/edit', id]);
  }

  delete(id: number) {
  console.log("Delete seguro with id:", id);
        Swal.fire({
          title: 'Eliminar',
          text: "Está seguro que quiere eliminar el registro?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.gpsService.delete(id).
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