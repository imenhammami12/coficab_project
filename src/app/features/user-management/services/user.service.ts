import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users = signal<User[]>([
    { id: 1, firstName: 'Ahmed', lastName: 'Ben Salah', email: 'ahmed@coficab.com', role: 'admin', isActive: true },
    { id: 2, firstName: 'Sarra', lastName: 'Trabelsi', email: 'sarra@coficab.com', role: 'manager', isActive: true },
  ]);

  getUsers() {
    return this.users.asReadonly();
  }

  addUser(user: Omit<User, 'id'>) {
    const newUser: User = { ...user, id: Date.now(), createdAt: new Date() };
    this.users.update(list => [...list, newUser]);
  }

  updateUser(id: number, changes: Partial<User>) {
    this.users.update(list =>
      list.map(u => (u.id === id ? { ...u, ...changes } : u))
    );
  }

  deleteUser(id: number) {
    this.users.update(list => list.filter(u => u.id !== id));
  }
}
