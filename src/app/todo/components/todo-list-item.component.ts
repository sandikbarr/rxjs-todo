import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models/Todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-item',
  template: `
    <li>
      <div class="actions">
        <span>
          <input
            [id]="todo.id"
            type="checkbox"
            [checked]="todo.completed"
            (click)="toggleTodo.emit(!todo.completed)"/>
          <label [for]="todo.id">{{ todo.description }}</label>
        </span>
        <span>
          <button (click)="onEditTodo()">Edit</button>
          <button (click)="deleteTodo.emit()">Delete</button>
        </span>
      </div>
      <div *ngIf="todo.tags" class="tags">
        <span class="tag" *ngFor="let tag of todo.tags">{{tag}}</span>
      </div>
    </li>
  `,
  styleUrls: ['todo-list-item.component.css']
})
export class TodoListItemComponent {
  @Input() todo: Todo;
  @Output() toggleTodo = new EventEmitter<boolean>();
  @Output() deleteTodo = new EventEmitter();

  constructor(private router: Router) {}

  onEditTodo() {
    this.router.navigate(['/todos', this.todo.id]);
  }
}
