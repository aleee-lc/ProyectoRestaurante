import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

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
  loading = false;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMsg = '';
    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
      this.loading = false;

      const user = res.user;
      const props = user.properties;

      if (!props || props.length === 0) {
        this.errorMsg = 'El usuario no tiene propiedades asignadas.';
        return;
      }

      if (props.length === 1) {
        // SOLO UNA PROPERTY → entra directo
        localStorage.setItem('current_property', props[0].id);
        this.router.navigate(['/home']);
      } else {
        // VARIAS PROPERTIES → pantalla para elegir
        this.router.navigate(['/property-select']);
      }
      },

      error: (err) => {
      console.log("🔥 ERROR FULL:", err);
      this.loading = false;
      this.errorMsg = err.error?.error || "Credenciales incorrectas";
      },
    });
  }
}
