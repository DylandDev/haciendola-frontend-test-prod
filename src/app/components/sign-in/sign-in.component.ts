import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    SpinnerComponent,
    RouterLink,
  ],
})
export class SignInComponent {
  formUser: FormGroup;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  hidePassword: boolean = true;
  hidePasswordTwo: boolean = true;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
      passwordTwo: [
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

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  togglePasswordVisibilityTwo(): void {
    this.hidePasswordTwo = !this.hidePasswordTwo;
  }

  onRegister() {
    if (
      this.formUser.get('password')?.value !=
      this.formUser.get('passwordTwo')?.value
    ) {
      this._errorService.showError('Las contraseñas son diferentes.');
      return;
    }

    const user: User = {
      username: this.formUser.value.username,
      password: this.formUser.value.password,
    };

    this.loading = true;

    this._userService.signIn(user).subscribe({
      next: () => {
        this._errorService.showSuccess('El usuario ha sido registrado');
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this._errorService.msgError(err);
        this.loading = false;
      },
    });
  }
}
