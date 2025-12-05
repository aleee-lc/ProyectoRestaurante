import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css'],
  imports: [
    FormsModule
  ]
})
export class NewUserModalComponent {

  API = environment.apiUrl;  // ← YA NO HARD-CODED

  roles: any[] = [];
  properties: any[] = [];

  user = {
    name: '',
    email: '',
    password: '',
    roleIds: [] as string[],
    propertyIds: [] as string[],
    isActive: true
  };

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<NewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.loadProperties();
  }

  loadRoles() {
    this.http.get(`${this.API}/roles`).subscribe({
      next: (res: any) => {
        console.log("ROLES:", res);
        this.roles = res;
      },
      error: err => console.error(err)
    });
  }

  loadProperties() {
    this.http.get(`${this.API}/properties`).subscribe({
      next: (res: any) => {
        console.log("PROPERTIES:", res);
        this.properties = res;
      },
      error: err => console.error(err)
    });
  }

  save() {
    this.http.post(`${this.API}/users`, this.user).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error(err)
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
