import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo/components/todo-list.component';
import { TodoEditComponent } from './todo/components/todo-edit.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos'
  },
  { path: 'todos', component: TodoListComponent },
  { path: 'todos/:id', component: TodoEditComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
