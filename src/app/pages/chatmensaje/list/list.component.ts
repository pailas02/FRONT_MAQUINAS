import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model'; 
import { ChatsService } from 'src/app/services/chat/chats.service'; 
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListChatComponent implements OnInit {

  chats: Chat[] = []; 


  constructor(private chatsService: ChatsService, private router: Router) { }

  ngOnInit(): void {
    
    this.chatsService.list().subscribe(
      data => {
        this.chats = data;
        console.log('Datos recibidos del servicio (subscribe):', data);
      },
      error => {
        console.error('Error en la suscripción del servicio:', error);
      }
    );
  }

  // Métodos para editar y eliminar (ajusta el tipo de ID según tu modelo Chat)
  edit(id: number) {
    if (isNaN(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El ID proporcionado no es válido.'
      });
      return;
    }

    this.router.navigate(['/chats/update', id]).then(
      success => {
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
      error => {
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
        this.chatsService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.chats = this.chats.filter(chat => chat.id !== id); // Actualizar la lista
          },
          error: (error) => {
            console.error('Error al eliminar el chat:', error);
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }
}