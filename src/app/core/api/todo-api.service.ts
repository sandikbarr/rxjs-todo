import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Todo } from '../../shared/models/Todo';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class TodoAPIService {

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }

  saveTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/todos', newTodo, {headers}).pipe(share());
  }

  deleteTodo(deletedTodo: Todo): Observable<{}> {
    return this.http.delete('http://localhost:3000/todos/' + deletedTodo.id, {headers}).pipe(share());
  }

  toggleTodo(toggled: Todo): Observable<Todo> {
    return this.http.put<Todo>('http://localhost:3000/todos/' + toggled.id, toggled, {headers}).pipe(share());
  }
}
