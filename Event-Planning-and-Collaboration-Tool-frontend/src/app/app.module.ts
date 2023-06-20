import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatCardModule} from "@angular/material/card";
import {MaterialUIModule} from "./material-ui/material-ui.module";
import { EventComponent } from './event/event.component';
import {MatMenuModule} from "@angular/material/menu";
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    MaterialUIModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
