import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent], // Add TodoListComponent to imports array
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true, // Make sure this is a standalone component
})
export class AppComponent {
  title = 'todo-app';
}
