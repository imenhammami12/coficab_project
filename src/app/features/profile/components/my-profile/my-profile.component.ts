import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../user-management/services/user.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  currentUser = this.authService.currentUser;
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {
    const user = this.currentUser();
    if (user) {
      this.form.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.successMessage.set(null);
    this.errorMessage.set(null);
    const value = this.form.getRawValue();

    this.userService.updateMyProfile({
      firstName: value.firstName!,
      lastName: value.lastName!,
      email: value.email!,
    }).subscribe({
      next: () => {
        this.successMessage.set('Profil mis à jour avec succès');
        // Rafraîchit les infos affichées dans le header/session
        this.authService.fetchMe().subscribe();
      },
      error: (err) => {
        this.errorMessage.set(err.error?.detail ?? 'Erreur lors de la mise à jour');
      }
    });
  }
}
