import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoStoreService } from '../store/todo-store.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list',
  template: `
    <app-todo-add-item (addTodo)="addTodo($event)"></app-todo-add-item>
    <ul>
      <app-todo-list-item
        *ngFor="let todo of todos"
        [todo]="todo"
        (toggleTodo)="toggleTodo(todo, $event)"
        (deleteTodo)="deleteTodo(todo)">
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
    this.todoStore.editTodo({...todo, completed});
  }

  addTodo(todo: Todo) {
    this.todoStore.addTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoStore.deleteTodo(todo);
  }
}
