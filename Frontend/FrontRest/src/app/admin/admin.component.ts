import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    
  constructor(private router: Router) {}

  activeTab(route: string) {
    return this.router.url.includes(route);
  }

  goTo(route: string) {
    this.router.navigate([`/admin/${route}`]);
  }
}
