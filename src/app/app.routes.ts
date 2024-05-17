import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'add', component: AddEditProductComponent, canActivate: [authGuard] },
  {
    path: 'edit/:id',
    component: AddEditProductComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
