import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../theme-service/theme-service.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="theme-toggle"
      (click)="toggleTheme()"
      [attr.aria-label]="
        (isDarkMode$ | async) ? 'Switch to light mode' : 'Switch to dark mode'
      "
    >
      <span class="toggle-icon" *ngIf="!(isDarkMode$ | async)">🌙</span>
      <span class="toggle-icon" *ngIf="isDarkMode$ | async">☀️</span>
    </button>
  `,
  styles: [
    `
      .theme-toggle {
        background: transparent;
        border: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        padding: 0;
        transition: background-color 0.3s;
      }

      .theme-toggle:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      .dark-theme .theme-toggle:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .toggle-icon {
        line-height: 1;
      }
    `,
  ],
})
export class ThemeToggleComponent {
  isDarkMode$: any;

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkTheme$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
