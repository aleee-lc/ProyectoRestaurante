import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PropertySelectComponent } from './property-select/property-select.component';
import { HomeComponent } from './home/home.component';
import { MeseroComponent } from './mesero/mesero.component';
import { CajeroComponent } from './cajero/cajero.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'property-select', component: PropertySelectComponent },

  { path: 'home', component: HomeComponent },

  // Módulos
  { path: 'mesero', component: MeseroComponent },
  { path: 'cajero', component: CajeroComponent },

  // Fallback
  { path: '**', redirectTo: 'login' },
];
