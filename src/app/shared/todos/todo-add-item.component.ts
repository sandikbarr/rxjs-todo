import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-add-item',
  template: `
    <input #todo/><button (click)="addTodo.emit({description: todo.value})">Add</button>
  `
})
export class TodoAddItemComponent {
  @Output() addTodo = new EventEmitter();
}
