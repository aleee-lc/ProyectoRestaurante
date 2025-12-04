import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-select.component.html',
  styleUrls: ['./property-select.component.css'],
})
export class PropertySelectComponent {
  properties = [
    { id: 1, name: 'Restaurante', location: 'Primera Planta' },
    { id: 2, name: 'RestoBar', location: 'Segundo Piso' },
    { id: 3, name: 'Pool Lounge', location: 'Alberca' },
  ];

  constructor(private router: Router) {}

  selectProperty(p: any) {
    console.log('Propiedad seleccionada:', p);
    localStorage.setItem('selectedProperty', JSON.stringify(p));
    console.log('➡️ Navegando a /home...');
    this.router.navigate(['/home']);
  }
}
