import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';

import { Todo } from '../models/Todo';
import { TodoHttpService } from '../http/todo-http.service';

@Injectable()
export class TodoStoreService {

  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  constructor(private todoHTTP: TodoHttpService) {
    this.loadData();
  }

  get todos(): Observable<Todo[]> {
    return this._todos.asObservable();
  }

  getTodoById(id: number): Observable<Todo> {
    return this.todos.pipe(
      map(todos => todos.find(todo => todo.id === id))
    );
  }

  loadData(search?: string) {
    this.todoHTTP.getTodos(search)
      .subscribe(
          todos => {
              this._todos.next(todos);
          },
          err => console.log('Error retrieving Todos')
      );
  }

  addTodo(newtodo: Todo): Observable<Todo> {
    const observable = this.todoHTTP.saveTodo(newtodo);

    observable.pipe(
      withLatestFrom(this.todos),
    ).subscribe(([savedTodo, todos]) => {
      this._todos.next(todos.concat(savedTodo));
    });

    return observable;
  }

  editTodo(todo: Todo): Observable<Todo> {
    const observable = this.todoHTTP.updateTodo(todo);

    observable.pipe(
      withLatestFrom(this.todos)
    ).subscribe(([savedTodo, todos]) => {
      const index = todos.findIndex((d: Todo) => d.id === todo.id);
      this._todos.next([
        ...todos.slice(0, index),
        savedTodo,
        ...todos.slice(index + 1)
      ]);
    });

    return observable;
  }


  deleteTodo(deleted: Todo): Observable<{}> {
    const observable = this.todoHTTP.deleteTodo(deleted);

    observable.pipe(
      withLatestFrom(this.todos)
    ).subscribe(([empty, todos]) => {
      const index = todos.findIndex((todo) => todo.id === deleted.id);
      this._todos.next([
        ...todos.slice(0, index),
        ...todos.slice(index + 1)
      ]);
    });

    return observable;
  }
}
