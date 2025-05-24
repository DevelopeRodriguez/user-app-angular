import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { ValidateErrorMessagesService } from '../../../services/validate-error-messages.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  // Variable que nos dira si el formulario fue enviado o no al menos una vez
  public formSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private validateErrorMessagesService: ValidateErrorMessagesService,
    private alertService: AlertService,
  ) { }

  // Configuramos el formulario con sus respectivos campos y los errores validos para cada campo
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]]
    });
  }

  
  onSubmit(): void {

    // Aqui decimos que ya intentamos enviar el formulario al menos una vez
    this.formSubmitted = true;

    // Si algún campo del formulario tiene algún error no seguimos ejecutando el codigo y hacemos un return
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Mostramos alerta de iniciando sesión
    this.alertService.loggingIn();

    // Extraemos y obtenemos los valores de los dos campos del formulario
    const { email, password } = this.loginForm.value;

    // realizamos la petición con los campos del formulario
    this.authService.login({ email, password }).subscribe({
      next: () => {
        // Cerramos alerta de cargando y redirigimos a la página de usuarios si el logueo es exitoso
        Swal.close();
        this.router.navigate(['/users']);
      },
      error: (err) => {
        // Mostramos errores al usuario
        Swal.fire('Error', 'Usuario o contraseña incorrectos.', 'error' );
        console.error('Error en login:', err.error);
      }
    });
    
  }

  // Método para obtener dinamicamente los mensajes de error de cada campo del formulario
  getErrorMessage(field: string): string{
    return this.validateErrorMessagesService.getErrorMessage(field, this.loginForm);
  }

  // Validamos si cualquier campo del formulario tiene algún tipo de error y devolvemos un boolean
  validateFormField( field: string ) {
    return this.validateErrorMessagesService.invalidField( this.loginForm, field, this.formSubmitted );
  }

}
