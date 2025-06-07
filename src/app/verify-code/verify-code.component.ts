import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security/security.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
})
export class VerifyCodeComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      Swal.fire('Error', 'Por favor completa todos los campos correctamente.', 'error');
      return;
    }

    this.securityService.verifyResetCode(this.form.value).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Contraseña actualizada. Inicia sesión.', 'success');
        this.router.navigate(['/login']);
      },
      error: () => {
        Swal.fire('Error', 'Código incorrecto o expirado.', 'error');
      },
    });
  }
}
