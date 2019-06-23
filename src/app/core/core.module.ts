import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TodoAPIService } from './api/todo-api.service';
import { TodoStoreService } from './store/todo-store.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    TodoAPIService,
    TodoStoreService
  ]
})
export class CoreModule { }
