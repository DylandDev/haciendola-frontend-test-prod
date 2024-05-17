import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    CommonModule,
    RouterLink,
    SpinnerComponent,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class LoginComponent {
  formUser: FormGroup;
  hidePassword: boolean = true;
  loading: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _userService: UserService,
    private _errorService: ErrorService
  ) {
    this.formUser = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?`\-=[\];',./])(?!.*\s).{6,}$/
          ),
        ],
      ],
    });
  }

  onLogin() {
    const user: User = {
      username: this.formUser.value.username,
      password: this.formUser.value.password,
    };

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this._errorService.showSuccess('Inicio de sesión con éxito!');
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._errorService.msgError(err);
        this.loading = false;
      },
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
