import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ErrorService } from '../services/error.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const _errorService = inject(ErrorService);

  const token = localStorage.getItem('token');

  if (token == undefined) {
    _errorService.showError('Acceso no autorizado');
    router.navigate(['/login']);
  }
  return true;
};
