import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = null;
  property: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Authentication is handled by the authGuard. Here we only read stored
    // values to initialize component state.
    const savedUser = localStorage.getItem('user');
    const savedProperty = localStorage.getItem('selectedProperty');

    this.user = savedUser ? JSON.parse(savedUser) : null;
    this.property = savedProperty ? JSON.parse(savedProperty) : null;
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
}
