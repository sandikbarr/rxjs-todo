import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DobyModule } from './doby/doby.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DobyModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
