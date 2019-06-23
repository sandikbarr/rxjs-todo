import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TodoModule,
    SharedModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
