import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private toastr: ToastrService) {}

  showSuccess(name: string) {
    this.toastr.success(`${name}`, 'Éxito');
  }

  showError(name: string) {
    this.toastr.error(`${name}`, 'Error');
  }

  msgError(err: HttpErrorResponse) {
   

    if (err.status === 400 && err.error.message) {
      this.showError(err.error.message);
    } else {
      this.showError('Error con el servidor, comuniquese con el admin');
    }
  }
}
