import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email === 'ale@ale.com' && this.password === '1234') {
      const user = {
        email: this.email,
        multiProperty: true, // cámbialo a false si tiene una sola propiedad
        defaultProperty: null, // o define algo como { id: 1, name: 'Restaurante' }
      };

      localStorage.setItem('user', JSON.stringify(user));

      if (user.multiProperty || !user.defaultProperty) {
        console.log('➡️ Redirigiendo a selección de propiedad...');
        this.router.navigate(['/select-property']);
      } else {
        console.log('➡️ Redirigiendo a home...');
        localStorage.setItem('selectedProperty', JSON.stringify(user.defaultProperty));
        this.router.navigate(['/home']);
      }
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }
}
