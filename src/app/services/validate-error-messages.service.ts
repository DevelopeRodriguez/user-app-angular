import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateErrorMessagesService {
  

  // Validamos si el campo mandado del formulario tiene algún tipo de error o no
  invalidField(  form: FormGroup, field: string, formSubmitted: boolean ): boolean {
  
    if ( form.get(field)!.invalid && form.get(field)?.touched ) {
      return true;
    } else {
      return false;
    }

  }
  
  // Configuramos los mensajes de error correspondientes para cada tipo de error
  private errorMessages: { [key: string]: (error: any) => string } = {
    required: () => 'This field is required',
    minlength: (e) => `This field must have a minimum of ${e.requiredLength} characters`,
    maxlength: (e) => `This field must have a maximum of ${e.requiredLength} characters`,
    min: (e) => `The minimum value is ${e.min}`,
    max: (e) => `The maximum value is ${e.max}`,
    email: () => 'Invalid email address',
  };

  // Obtenemos dinamicamente los mensajes de error configurados para cada campo del formulario
  getErrorMessage(field: string, form: FormGroup): string {

    const control = form.get(field);

    // Validamos si existe algún error
    if (!control || !control.errors) return '';

    // Si existe algún error retornamos el error correspondiente del campo
    for (const errorKey in control.errors) {
      if (this.errorMessages[errorKey]) {
        return this.errorMessages[errorKey](control.errors[errorKey]);
      }
    }

    return '';

  }

  constructor() { }

}
