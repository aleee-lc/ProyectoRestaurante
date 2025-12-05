import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  API = 'http://localhost:5000/api';

  users: any[] = [];
  roles: any[] = [];
  searchTerm = '';

  ngOnInit() {
    this.loadUsers();
  }

  // ==============================
  // 🔥 GET USERS DESDE LA API
  // ==============================
  loadUsers() {
    this.http.get(`${this.API}/users`).subscribe({
      next: (res: any) => this.users = res,
      error: err => console.error(err)
    });
  }

  // ==============================
  // 🔥 ABRIR MODAL PARA CREAR USER
  // ==============================
  openCreateModal() {
    this.dialog.open(NewUserModalComponent, {
      width: '380px'
    }).afterClosed().subscribe(saved => {
      if (saved) this.loadUsers(); // recargar lista
    });
  }

  // ==============================
  // 🔥 DELETE USER API
  // ==============================
  deleteUser(id: string) {
    if (!confirm("¿Eliminar este usuario?")) return;

    this.http.delete(`${this.API}/users/${id}`).subscribe({
      next: () => this.loadUsers(),
      error: err => console.error(err)
    });
  }

  // ==============================
  // 🔎 BUSCADOR LOCAL
  // ==============================
  filterUsers() {
    return this.users.filter(u =>
      u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // ==============================
  // 🎨 CLASES DE LOS ROLES
  // ==============================
  getRoleClass(role: string) {
    const r = role.toLowerCase();
    return {
      "chip-admin": r === "admin",
      "chip-mesero": r === "mesero",
      "chip-cajero": r === "cajero",
      "chip-cocina": r === "cocina",
      "chip-default": !["admin","mesero","cajero","cocina"].includes(r)
    };
  }
}
