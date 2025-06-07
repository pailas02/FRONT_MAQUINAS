import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
})
export class RequestResetPasswordComponent {
  email: string = '';

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  requestReset() {
    this.securityService.requestResetPassword(this.email).subscribe({
      next: () => {
        this.router.navigate(['/reset-password-sent']);
      },
      error: () => {
        Swal.fire('Error', 'El correo no está registrado.', 'error');
      }
    });
  }
}
