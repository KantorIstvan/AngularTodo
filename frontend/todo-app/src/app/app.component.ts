import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'todo-app';
}
