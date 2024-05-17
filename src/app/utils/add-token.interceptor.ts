import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const _errorService = inject(ErrorService);

  let cloneReq = req;
  if (token) {
    cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        _errorService.showError(error.error.message);
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
