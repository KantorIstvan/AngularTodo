import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TodoService, Todo } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todos', () => {
    const mockTodos: Todo[] = [
      { id: 1, title: 'Test todo', completed: false, created_at: '2023-01-01' },
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('/api/todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should add a todo', () => {
    const newTodo: Partial<Todo> = {
      title: 'New Todo',
      description: 'Description',
    };
    const mockResponse: Todo = {
      id: 1,
      title: 'New Todo',
      description: 'Description',
      completed: false,
      created_at: '2023-01-01',
    };

    service.addTodo(newTodo).subscribe((todo) => {
      expect(todo).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush(mockResponse);
  });

  it('should update a todo', () => {
    const todoId = 1;
    const updatedTodo: Partial<Todo> = {
      title: 'Updated Todo',
      description: 'Updated Description',
      completed: true,
    };
    const mockResponse: Todo = {
      id: todoId,
      title: 'Updated Todo',
      description: 'Updated Description',
      completed: true,
      created_at: '2023-01-01',
      updated_at: '2023-01-02',
    };

    service.updateTodo(todoId, updatedTodo).subscribe((todo) => {
      expect(todo).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`/api/todos/${todoId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTodo);
    req.flush(mockResponse);
  });

  it('should delete a todo', () => {
    const todoId = 1;

    service.deleteTodo(todoId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`/api/todos/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
