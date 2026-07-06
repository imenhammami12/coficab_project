import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isLoading.set(true);

    const { email, password } = this.form.getRawValue();

this.authService.login({ email: email!, password: password! }).subscribe({
  next: (res) => {
    this.isLoading.set(false);
    if (res.user.role === 'admin') {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/chatbot']);
    }
  },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.detail ?? 'Erreur de connexion');
      }
    });
  }
}
