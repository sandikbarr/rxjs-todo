import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TodoAPIService } from './api/todo-api.service';
import { TodoStoreService } from './store/todo-store.service';

import { TodoListComponent } from './components/todo-list.component';
import { TodoListItemComponent } from './components/todo-list-item.component';
import { TodoAddItemComponent } from './components/todo-add-item.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    TodoListComponent,
    TodoListItemComponent,
    TodoAddItemComponent
  ],
  providers: [
    TodoAPIService,
    TodoStoreService
  ]
})
export class TodoModule { }
