import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Output() userAdded = new EventEmitter<void>();

  errorMessage: string | null = null;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    const value = this.form.getRawValue();

    this.userService.addUser({
      firstName: value.firstName!,
      lastName: value.lastName!,
      email: value.email!,
      role: value.role!,
      password: value.password!,
    }).subscribe({
      next: () => {
        this.form.reset({ role: 'user' });
        this.userAdded.emit();
      },
      error: (err) => {
        this.errorMessage = err.error?.detail ?? 'Erreur lors de la création';
      }
    });
  }
}
