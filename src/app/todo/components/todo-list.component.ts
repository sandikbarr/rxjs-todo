import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoStoreService } from '../store/todo-store.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list',
  template: `
    <div class="todo-list-actions">
      <app-todo-add-item (addTodo)="addTodo($event)"></app-todo-add-item>
      <app-todo-search (search)="searchTodos($event)"></app-todo-search>
    </div>
    <ul>
      <app-todo-list-item
        *ngFor="let todo of todos$ | async"
        [todo]="todo"
        (toggleTodo)="toggleTodo(todo, $event)"
        (deleteTodo)="deleteTodo(todo)">
      </app-todo-list-item>
    </ul>
  `,
  styleUrls: ['todo-list.component.css']
})
export class TodoListComponent {
  todos$: Observable<Todo[]> = this.todoStore.todos;

  constructor (private todoStore: TodoStoreService) {}

  toggleTodo(todo: Todo, completed: boolean) {
    this.todoStore.editTodo({...todo, completed});
  }

  addTodo(todo: Todo) {
    this.todoStore.addTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoStore.deleteTodo(todo);
  }

  searchTodos(search: string) {
    this.todoStore.loadData(search);
  }
}
