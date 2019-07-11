import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { DobyHttpService } from './http/doby-http.service';
import { DobyStoreService } from './store/doby-store.service';

import { DobyListComponent } from './components/doby-list.component';
import { DobyListItemComponent } from './components/doby-list-item.component';
import { DobyAddItemComponent } from './components/doby-add-item.component';
import { DobySearchComponent } from './components/doby-search.component';
import { DobyEditComponent } from './components/edit/doby-edit.component';
import { DobyTagsComponent } from './components/edit/doby-tags.component';
import { DobyChecklistComponent } from './components/edit/doby-checklist.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    DobyListComponent,
    DobyListItemComponent,
    DobyAddItemComponent,
    DobySearchComponent,
    DobyEditComponent,
    DobyTagsComponent,
    DobyChecklistComponent
  ],
  providers: [
    DobyHttpService,
    DobyStoreService
  ]
})
export class DobyModule { }
