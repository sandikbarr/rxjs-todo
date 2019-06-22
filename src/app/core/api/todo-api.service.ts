import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { Todo } from '../../shared/models/Todo';

@Injectable()
export class TodoAPIService {

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/todo');
  }

  saveTodo(newTodo: Todo): Observable<Todo> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Todo>('/todo', JSON.stringify(newTodo), {headers}).pipe(share());
  }

  deleteTodo(deletedTodo: Todo): Observable<{}> {
    const params = new HttpParams();
    params.append('id', '' + deletedTodo.id );

    return this.http.delete('/todo', {params}).pipe(share());
  }

  toggleTodo(toggled: Todo): Observable<Todo> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<Todo>('/todo', JSON.stringify(toggled), {headers}).pipe(share());
  }
}
