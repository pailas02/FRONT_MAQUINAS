import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { ChatsService } from 'src/app/services/chat/chats.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number = 1; // 1->Ver, 2->Crear, 3->Actualizar
  chat: Chat = { 
  id: 0,
  titulo: '',
  tipo: '',
 };

  constructor(
    private activateRoute: ActivatedRoute,
    private chatsService: ChatsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) this.mode = 1;
    else if (currentUrl.includes('create')) this.mode = 2;
    else if (currentUrl.includes('update')) this.mode = 3;

    const id = Number(this.activateRoute.snapshot.params['id']);
    if (id && this.mode !== 2) {
      this.getChat(id);
    }
  }

  getChat(id: number): void {
    this.chatsService.view(id).subscribe({
      next: (chat) => {
        this.chat = chat;
      },
      error: (error) => {
        console.error('Error al obtener chat:', error);
        Swal.fire({
          title: error.status === 404 ? 'No encontrado' : 'Error',
          text: error.status === 404
            ? 'El chat solicitado no existe.'
            : 'Ocurrió un error al intentar obtener el chat.',
          icon: error.status === 404 ? 'warning' : 'error',
        });
      },
    });
  }

  back(): void {
    this.router.navigate(['/chats/list']);
  }

  create(): void {
    this.chatsService.create(this.chat).subscribe({
      next: () => {
        Swal.fire('Creado!', 'Registro creado correctamente.', 'success')
          .then(() => this.back());
      },
      error: () => {
        Swal.fire('Error', 'No se pudo crear el registro.', 'error');
      },
    });
  }

  update(): void {
    this.chatsService.update(this.chat).subscribe({
      next: () => {
        Swal.fire('Actualizado!', 'Registro actualizado correctamente.', 'success')
          .then(() => this.back());
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el registro.', 'error');
      },
    });
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.chatsService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.back();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          },
        });
      }
    });
  }
}
