export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  isActive: boolean;
  createdAt?: Date;
}
