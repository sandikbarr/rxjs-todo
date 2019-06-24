import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DobyListComponent } from './doby/components/doby-list.component';
import { DobyEditComponent } from './doby/components/edit/doby-edit.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'doby'
  },
  { path: 'doby', component: DobyListComponent },
  { path: 'doby/:id', component: DobyEditComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
