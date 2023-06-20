import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MaterialUIModule} from "./material-ui/material-ui.module";
import {MatCardModule} from "@angular/material/card";
import {MatLegacyCardModule} from "@angular/material/legacy-card";
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    MaterialUIModule,
    MatLegacyCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
