import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()) {
    return true;
  }

  return authService.fetchMe().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const redirectToLogin = () => {
    router.navigate(['/login']);
    return of(false);
  };

  if (authService.currentUser()) {
    return authService.isAdmin() ? of(true) : redirectToLogin();
  }

  return authService.fetchMe().pipe(
    switchMap(() => (authService.isAdmin() ? of(true) : redirectToLogin())),
    catchError(() => redirectToLogin())
  );
};
