import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component')
        .then(m => m.LoginComponent)
  },
{
  path: 'users',
  canActivate: [adminGuard],
  loadComponent: () =>
    import('./features/user-management/components/user-list/user-list.component')
      .then(m => m.UserListComponent)
}

];
