export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
}

export interface LoginPayload {
  email: string;
  password: string;
}
