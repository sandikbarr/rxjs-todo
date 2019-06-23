import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list-item',
  template: `
    <li>
      <input
        [id]="todo.id"
        type="checkbox"
        [checked]="todo.completed"
        (click)="toggleTodo.emit(!todo.completed)"/>
      <label [for]="todo.id">{{ todo.description }}</label>
      <a [routerLink]="todo.id">Edit</a> |
      <button (click)="deleteTodo.emit()">Delete</button>
    </li>
  `
})
export class TodoListItemComponent {
  @Input() todo: Todo;
  @Output() toggleTodo = new EventEmitter<boolean>();
  @Output() deleteTodo = new EventEmitter();
}
