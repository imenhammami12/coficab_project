import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/user-management/components/user-list/user-list.component')
            .then(m => m.UserListComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/components/my-profile/my-profile.component')
            .then(m => m.MyProfileComponent)
      },
      {
        path: 'chatbot',
        loadComponent: () =>
          import('./features/chatbot/components/chat-window/chat-window.component')
            .then(m => m.ChatWindowComponent)
      }
    ]
  }
];
