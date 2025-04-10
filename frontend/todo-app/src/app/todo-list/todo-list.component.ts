import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from '../todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Partial<Todo> = { title: '', description: '' };

  // For update modal
  showUpdateModal = false;
  editingTodo: Partial<Todo> = {};

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  addTodo() {
    if (!this.newTodo.title) return;
    this.todoService.addTodo(this.newTodo).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodo = { title: '', description: '' };
    });
  }

  toggleComplete(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id, updatedTodo).subscribe((updated) => {
      const index = this.todos.findIndex((t) => t.id === updated.id);
      this.todos[index] = updated;
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== id);
    });
  }

  // Modal functions
  openUpdateModal(todo: Todo) {
    this.editingTodo = { ...todo };
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.editingTodo = {};
  }

  updateTodo() {
    if (!this.editingTodo.title || !this.editingTodo.id) return;

    this.todoService
      .updateTodo(this.editingTodo.id, this.editingTodo)
      .subscribe((updated) => {
        const index = this.todos.findIndex((t) => t.id === updated.id);
        this.todos[index] = updated;
        this.closeUpdateModal();
      });
  }
}
