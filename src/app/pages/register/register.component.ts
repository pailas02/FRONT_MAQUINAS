import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Importa para formularios reactivos
import { Router } from '@angular/router'; // Para redireccionar después del registro
import { SecurityService } from '../../services/security/security.service'; // Asegúrate de la ruta correcta
import { RegisterRequest } from '../../models/register-request.model'; // Importa la interfaz de registro


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordStrength: string = ''; // Para mostrar la fuerza de la contraseña
  showPasswordStrength: boolean = false; // Para controlar la visibilidad del mensaje de fuerza

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        // Puedes añadir validaciones de regex más complejas para la contraseña si lo deseas
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]),
      agreeTerms: new FormControl(false, [Validators.requiredTrue]) // Para el checkbox de términos
    });

    // Suscribirse a los cambios de la contraseña para calcular la fuerza
    this.registerForm.get('password')?.valueChanges.subscribe(password => {
      this.updatePasswordStrength(password);
    });
  }

  // Método para calcular la fuerza de la contraseña (ejemplo básico)
  updatePasswordStrength(password: string): void {
    this.showPasswordStrength = password.length > 0;
    if (!this.showPasswordStrength) {
      this.passwordStrength = '';
      return;
    }

    let strength = 0;
    if (password.length >= 6) { strength += 1; }
    if (password.match(/[a-z]/)) { strength += 1; }
    if (password.match(/[A-Z]/)) { strength += 1; }
    if (password.match(/\d/)) { strength += 1; }
    if (password.match(/[^a-zA-Z\d]/)) { strength += 1; } // Caracteres especiales

    switch (strength) {
      case 0:
      case 1:
        this.passwordStrength = 'very weak';
        break;
      case 2:
        this.passwordStrength = 'weak';
        break;
      case 3:
        this.passwordStrength = 'medium';
        break;
      case 4:
        this.passwordStrength = 'strong';
        break;
      case 5:
        this.passwordStrength = 'very strong';
        break;
      default:
        this.passwordStrength = '';
        break;
    }
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerData: RegisterRequest = this.registerForm.value;

      this.securityService.register(registerData).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          // Opcional: guardar la sesión si el backend devuelve un token de login automático
          // if (response.token && response.user) {
          //   this.securityService.saveSession(response);
          // }
          alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
          this.router.navigate(['/auth/login']); // Redirigir al login después del registro
        },
        error => {
          console.error('Error en el registro:', error);
          alert('Error al registrar el usuario: ' + (error.error.message || 'Hubo un problema.'));
        }
      );
    } else {
      // Marcar todos los campos como "touched" para mostrar los errores de validación
      this.markFormGroupTouched(this.registerForm);
      alert('Por favor, completa todos los campos requeridos y acepta la política de privacidad.');
    }
  }

  // Helper para marcar todos los controles del formulario como touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}