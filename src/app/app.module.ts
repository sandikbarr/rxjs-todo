import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TodoModule } from './todo/todo.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TodoModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
