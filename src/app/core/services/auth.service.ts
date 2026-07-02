import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthUser, LoginPayload } from '../models/auth.model';

const API_URL = 'http://localhost:8000/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<AuthUser | null>(null);

  login(payload: LoginPayload): Observable<{ user: AuthUser }> {
    return this.http.post<{ user: AuthUser }>(`${API_URL}/login`, payload).pipe(
      tap(res => this.currentUser.set(res.user))
    );
  }

  logout(): void {
    this.http.post(`${API_URL}/logout`, {}).subscribe(() => {
      this.currentUser.set(null);
      this.router.navigate(['/login']);
    });
  }

  fetchMe(): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${API_URL}/me`).pipe(
      tap(user => this.currentUser.set(user))
    );
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }
}
