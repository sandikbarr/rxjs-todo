import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Todo } from '../models/Todo';
import { TodoHttpService } from '../http/todo-http.service';

@Injectable()
export class TodoStoreService {

  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  constructor(private todoAPI: TodoHttpService) {
      this.loadInitialData();
  }

  get todos(): Observable<Todo[]> {
      return this._todos.asObservable();
  }

  loadInitialData() {
    this.todoAPI.getAllTodos()
      .subscribe(
          todos => {
              this._todos.next(todos);
          },
          err => console.log('Error retrieving Todos')
      );
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    const observable = this.todoAPI.saveTodo(newTodo);

    observable.subscribe((savedTodo: Todo) =>
      this._todos.next(this._todos.getValue().concat([savedTodo]))
    );

    return observable;
  }

  editTodo(todo: Todo): Observable<Todo> {
    const observable = this.todoAPI.toggleTodo(todo);

    observable.subscribe(() => {
      const todos = this._todos.getValue();
      const index = todos.findIndex((t: Todo) => t.id === todo.id);
      this._todos.next([
        ...todos.slice(0, index),
        todo,
        ...todos.slice(index + 1)
      ]);
    });

    return observable;
  }


  deleteTodo(deleted: Todo): Observable<{}> {
    const observable = this.todoAPI.deleteTodo(deleted);

    observable.subscribe(() => {
      const todos: Todo[] = this._todos.getValue();
      const index = todos.findIndex((todo) => todo.id === deleted.id);
      this._todos.next([
        ...todos.slice(0, index),
        ...todos.slice(index + 1)
      ]);
    });

    return observable;
  }
}
