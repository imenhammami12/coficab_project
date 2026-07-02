import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:8000/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private usersSignal = signal<User[]>([]);

  getUsers() {
    return this.usersSignal.asReadonly();
  }

  loadUsers() {
    this.http.get<any[]>(`${API_URL}/`).pipe(
      tap(list => {
        const mapped: User[] = list.map(u => ({
          id: u.id,
          firstName: u.first_name,
          lastName: u.last_name,
          email: u.email,
          role: u.role,
          isActive: u.is_active,
          createdAt: u.created_at,
        }));
        this.usersSignal.set(mapped);
      })
    ).subscribe();
  }

  addUser(user: { firstName: string; lastName: string; email: string; role: string; password: string }) {
    const payload = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      role: user.role,
      password: user.password,
    };
    return this.http.post(`${API_URL}/`, payload).pipe(
      tap(() => this.loadUsers())
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${API_URL}/${id}`).pipe(
      tap(() => this.loadUsers())
    );
  }

  updateUser(id: number, changes: { firstName?: string; lastName?: string; email?: string; role?: string; isActive?: boolean }) {
    const payload: any = {};
    if (changes.firstName !== undefined) payload.first_name = changes.firstName;
    if (changes.lastName !== undefined) payload.last_name = changes.lastName;
    if (changes.email !== undefined) payload.email = changes.email;
    if (changes.role !== undefined) payload.role = changes.role;
    if (changes.isActive !== undefined) payload.is_active = changes.isActive;

    return this.http.put(`${API_URL}/${id}`, payload).pipe(
      tap(() => this.loadUsers())
    );
  }

  updateMyProfile(changes: { firstName?: string; lastName?: string; email?: string }) {
    const payload: any = {};
    if (changes.firstName !== undefined) payload.first_name = changes.firstName;
    if (changes.lastName !== undefined) payload.last_name = changes.lastName;
    if (changes.email !== undefined) payload.email = changes.email;

    return this.http.put(`${API_URL}/me`, payload);
  }
}
