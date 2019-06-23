import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo/components/todo-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos'
  },
  { path: 'todos',     component: TodoListComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
