import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-todo-add-item',
  template: `
    <input #todo (change)="onAddTodo(todo.value)"/>
    <button (click)="onAddTodo(todo.value)">Add</button>
  `
})
export class TodoAddItemComponent {
  @Output() addTodo = new EventEmitter();
  @ViewChild('todo') input: ElementRef;

  onAddTodo(description) {
    this.addTodo.emit({description});
    this.input.nativeElement.value = '';
  }
}
