import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoStoreService } from '../../core/store/todo-store.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list',
  template: `
    <app-todo-add-item (addTodo)="addTodo($event)"></app-todo-add-item>
    <ul>
      <app-todo-list-item
        *ngFor="let todo of todos"
        [todo]="todo"
        (toggleTodo)="toggleTodo(todo, $event)">
      </app-todo-list-item>
    </ul>
  `
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[];
  todosSubscription: Subscription;

  constructor (private todoStore: TodoStoreService) {}

  ngOnInit() {
    this.todosSubscription = this.todoStore.todos.subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  ngOnDestroy() {
    if (this.todosSubscription) { this.todosSubscription.unsubscribe(); }
  }

  toggleTodo(todo: Todo, completed: boolean) {
    this.todoStore.toggleTodo({...todo, completed});
  }

  addTodo(todo: Todo) {
    this.todoStore.addTodo(todo);
  }
}
