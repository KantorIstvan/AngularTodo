import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { RegisterCredentials } from '../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <h2>Register</h2>

      <div class="alert alert-danger" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            [(ngModel)]="credentials.username"
            required
            placeholder="Choose a username"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="credentials.email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            [(ngModel)]="credentials.password"
            required
            placeholder="Create a password"
          />
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="loading">
            {{ loading ? 'Creating account...' : 'Register' }}
          </button>
        </div>
      </form>

      <div class="auth-footer">
        <p>Already have an account? <a [routerLink]="['/login']">Login</a></p>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        background-color: var(--card-bg);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        padding: 2rem;
        max-width: 400px;
        margin: 2rem auto;
      }

      h2 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .form-group {
        margin-bottom: 1.25rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: var(--radius);
        background-color: var(--card-bg);
        color: var(--text-primary);
      }

      input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
        outline: none;
      }

      button {
        width: 100%;
        padding: 0.75rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: var(--radius);
        font-weight: 500;
        cursor: pointer;
      }

      button:hover {
        background-color: var(--primary-hover);
      }

      button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .auth-footer {
        text-align: center;
        margin-top: 1.5rem;
        border-top: 1px solid var(--border-color);
        padding-top: 1rem;
      }

      .auth-footer a {
        color: var(--primary-color);
        text-decoration: none;
      }

      .auth-footer a:hover {
        text-decoration: underline;
      }

      .alert {
        padding: 0.75rem;
        border-radius: var(--radius);
        margin-bottom: 1rem;
      }

      .alert-danger {
        background-color: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: var(--danger-color);
      }
    `,
  ],
})
export class RegisterComponent {
  credentials: RegisterCredentials = { username: '', email: '', password: '' };
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (
      !this.credentials.username ||
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/todos']);
      },
      error: (error) => {
        this.errorMessage =
          error.error?.error || 'Failed to register. Please try again.';
        this.loading = false;
      },
    });
  }
}
