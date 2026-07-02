import { Component, EventEmitter, Input, Output, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();

  errorMessage: string | null = null;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required],
    isActive: [true],
  });

  ngOnChanges() {
    if (this.user) {
      this.form.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        role: this.user.role,
        isActive: this.user.isActive,
      });
    }
  }

  onSubmit() {
    if (this.form.invalid || !this.user) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    const value = this.form.getRawValue();

    this.userService.updateUser(this.user.id, {
      firstName: value.firstName!,
      lastName: value.lastName!,
      email: value.email!,
      role: value.role!,
      isActive: value.isActive!,
    }).subscribe({
      next: () => this.close.emit(),
      error: (err) => this.errorMessage = err.error?.detail ?? 'Erreur lors de la mise à jour',
    });
  }

  onCancel() {
    this.close.emit();
  }
}
