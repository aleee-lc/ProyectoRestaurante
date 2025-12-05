import { Routes } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { PropertySelectComponent } from './property-select/property-select.component';
import { HomeComponent } from './home/home.component';
import { MeseroComponent } from './mesero/mesero.component';
import { CajeroComponent } from './cajero/cajero.component';
import { ReporteriaComponent } from './reporteria/reporteria.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/usuarios/users.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { MesasComponent } from './admin/mesas/mesas.component';
import { AreasComponent } from './admin/areas/areas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'property-select', component: PropertySelectComponent },
  { path: 'home', component: HomeComponent },

  // Módulos
  { path: 'mesero', component: MeseroComponent },
  { path: 'cajero', component: CajeroComponent },
  { path: 'reporteria', component: ReporteriaComponent },

  // Admin
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'usuarios', component: UsersComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'mesas', component: MesasComponent },
      { path: 'areas', component: AreasComponent },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' },
];
