import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListComponent } from './todos/todo-list.component';
import { TodoListItemComponent } from './todos/todo-list-item.component';
import { TodoAddItemComponent } from './todos/todo-add-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TodoListComponent,
    TodoListItemComponent,
    TodoAddItemComponent
  ],
  exports: [
    TodoListComponent,
    TodoListItemComponent,
    TodoAddItemComponent
  ]
})
export class SharedModule { }
