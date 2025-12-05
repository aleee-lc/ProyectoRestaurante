import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: any = null;
  property: any = null;
  role: string = '';

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    const storedProperty = localStorage.getItem('current_property');

    if (storedUser) {
      this.user = JSON.parse(storedUser);

      // Guarda el PRIMER rol del usuario
      this.role = this.user.roles?.[0] || 'Sin rol';
    }

    if (storedProperty) {
      this.property = {
        id: storedProperty,
        name: this.user?.properties?.find((p: any) => p.id === storedProperty)?.name
          || "Propiedad seleccionada"
      };
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  goToMesero() {
    this.router.navigate(['/mesero']);
  }

  goToCajero() {
    this.router.navigate(['/cajero']);
  }

  goToReporteria() {
    this.router.navigate(['/reporteria']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
