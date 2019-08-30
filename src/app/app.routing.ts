import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo/components/todo-list.component';
import { TodoEditComponent } from './todo/components/edit/todo-edit.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo'
  },
  { path: 'todo', component: TodoListComponent },
  { path: 'todo/:id', component: TodoEditComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
