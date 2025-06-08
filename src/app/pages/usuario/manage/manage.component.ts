import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({  
  selector: 'app-manage-usuario',
  templateUrl: './manage.component.html'
})
export class ManageUsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario();
  mode: 'view' | 'create' | 'update' = 'create';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const path = this.route.snapshot.url.map(s => s.path).join('/');
    if (path.includes('view')) this.mode = 'view';
    else if (path.includes('update')) this.mode = 'update';

    const id = this.route.snapshot.params['id'];
    if ((this.mode === 'view' || this.mode === 'update') && id) {
      this.getUsuario(id);
    }
  }

  getUsuario(id: number): void {
    this.isLoading = true;
    this.usuarioService.view(id).pipe(
      catchError(() => {
        Swal.fire('Error', 'No se pudo cargar el usuario.', 'error');
        this.router.navigate(['/usuario/list']);
        return of(null);
      })
    ).subscribe(usuario => {
      if (usuario) this.usuario = usuario;
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    if (this.mode === 'create') {
      this.usuarioService.create(this.usuario).subscribe({
        next: () => {
          Swal.fire('Creado', 'Usuario creado exitosamente.', 'success')
            .then(() => this.router.navigate(['/usuario/list']));
        },
        error: () => Swal.fire('Error', 'No se pudo crear el usuario.', 'error')
      });
    } else if (this.mode === 'update') {
      this.usuarioService.update(this.usuario).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Usuario actualizado.', 'success')
            .then(() => this.router.navigate(['/usuario/list']));
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error')
      });
    }
  }

  back(): void {
    this.router.navigate(['/usuario/list']);
  }
}
