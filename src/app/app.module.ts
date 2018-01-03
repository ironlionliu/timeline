import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {TimelineModule} from './timeline/timeline.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TimelineModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
