import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  try {
    const userStr = localStorage.getItem('user');
    const propStr = localStorage.getItem('selectedProperty');

    // Si no hay usuario → login
    if (!userStr) {
      console.warn("🔒 No hay usuario → redirigir a login");
      router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userStr);

    // Si hay usuario PERO no hay propiedad (y el usuario es multipropiedad)
    if (user.multiProperty && !propStr && state.url !== '/select-property') {
      console.warn("📍 Usuario multipropiedad → seleccionar propiedad");
      router.navigate(['/select-property']);
      return false;
    }

    // Si intenta ir al login estando logueado → mandarlo al home
    if (state.url === '/login') {
      router.navigate(['/home']);
      return false;
    }

    return true;

  } catch (e) {
    console.error("AuthGuard error:", e);
    router.navigate(['/login']);
    return false;
  }
};
