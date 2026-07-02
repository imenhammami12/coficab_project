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
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/components/my-profile/my-profile.component')
        .then(m => m.MyProfileComponent)
  },
  {
    path: 'chatbot',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/chatbot/components/chat-window/chat-window.component')
        .then(m => m.ChatWindowComponent)
  }
];
