import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService, Todo } from '../todo.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  const mockTodos: Todo[] = [
    {
      id: 1,
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
      created_at: '2023-01-01',
    },
  ];

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj('TodoService', [
      'getTodos',
      'addTodo',
      'updateTodo',
      'deleteTodo',
    ]);
    mockTodoService.getTodos.and.returnValue(of(mockTodos));

    await TestBed.configureTestingModule({
      imports: [TodoListComponent, FormsModule, CommonModule],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    expect(mockTodoService.getTodos).toHaveBeenCalled();
    expect(component.todos).toEqual(mockTodos);
  });

  it('should add a new todo', () => {
    const newTodo: Partial<Todo> = {
      title: 'New Todo',
      description: 'New Description',
    };
    const completeTodo: Todo = {
      ...(newTodo as Todo),
      id: 2,
      completed: false,
      created_at: '2023-01-02',
    };

    mockTodoService.addTodo.and.returnValue(of(completeTodo));

    component.newTodo = newTodo;
    component.addTodo();

    expect(mockTodoService.addTodo).toHaveBeenCalledWith(newTodo);
    expect(component.todos).toContain(completeTodo);
    expect(component.newTodo).toEqual({ title: '', description: '' });
  });
});
