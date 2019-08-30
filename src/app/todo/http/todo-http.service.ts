import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Todo } from '../models/Todo';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable()
export class TodoHttpService {
  base = 'http://localhost:3000/todos';
  search: string;

  constructor(private http: HttpClient) { }

  getTodos(search?: string): Observable<Todo[]> {
    let url;
    if (search || this.search) {
      this.search = search;
      url = this.base + '?q=' + this.search;
    }
    return this.http.get<Todo[]>(url || this.base);
  }

  searchTodos(search: string): Observable<Todo[]> {
    return this.getTodos(search);
  }

  saveTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.base, newTodo, {headers}).pipe(share());
  }

  deleteTodo(deletedTodo: Todo): Observable<{}> {
    return this.http.delete(`${this.base}/${deletedTodo.id}`, {headers}).pipe(share());
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.base}/${updatedTodo.id}`, updatedTodo, {headers}).pipe(share());
  }
}
