import { Component, OnInit, OnDestroy } from '@angular/core'; // Importa OnDestroy
import { SecurityService } from '../../services/security/security.service'; // Ajusta la ruta si es necesario
import { User } from '../../models/user.model'; // Asegúrate de que esta ruta sea correcta
import { Subscription } from 'rxjs'; // Para manejar la suscripción

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy { // Implementa OnDestroy
  user: User | null = null; // Variable para almacenar la información del usuario
  private userSubscription: Subscription; // Para manejar la suscripción y desuscribirse

  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    // Suscribirse a los cambios del usuario en SecurityService
    this.userSubscription = this.securityService.getUser().subscribe(
      (currentUser: User) => {
        if (currentUser && currentUser._id) { // Verifica si el usuario está logueado
          this.user = currentUser;
          console.log('Usuario cargado en UserProfileComponent:', this.user);
        } else {
          this.user = null; // No hay usuario logueado
          console.log('No hay usuario logueado.');
          // Opcional: Redirigir al login si no hay sesión
          // this.router.navigate(['/auth/login']);
        }
      }
    );

    // Inicialmente, cargar el usuario actual si ya hay una sesión activa
    if (this.securityService.existSession()) {
      this.user = this.securityService.activeUserSession;
    }
  }

  ngOnDestroy(): void {
    // Es buena práctica desuscribirse para evitar fugas de memoria
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}