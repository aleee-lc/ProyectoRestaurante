import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PropertySelectComponent } from './property-select/property-select.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'select-property', component: PropertySelectComponent },
  { path: 'home', component: HomeComponent },
];
