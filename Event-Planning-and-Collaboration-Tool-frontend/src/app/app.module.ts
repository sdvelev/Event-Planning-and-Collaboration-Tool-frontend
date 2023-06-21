import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatCardModule} from "@angular/material/card";
import {MaterialUIModule} from "./material-ui/material-ui.module";
import { EventComponent } from './event/event.component';
import {MatMenuModule} from "@angular/material/menu";
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { NavLoggedInComponent } from './navigation/nav-logged-in/nav-logged-in.component';
import { NavLoggedOutComponent } from './navigation/nav-logged-out/nav-logged-out.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './content/home/home.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { SectionHomeComponent } from './content/section/home/section-home/section-home.component';
import {HttpClientModule} from "@angular/common/http";
import { NavComponent } from './navigation/nav/nav.component';
import { EventsComponent } from './content/events/events.component';
import { SectionEventsComponent } from './content/section/events/section-events/section-events.component';
import { EventCardsComponent } from './content/section/events/event-cards/event-cards.component';
import { FooterComponent } from './footer/footer.component';
import { BudgetsComponent } from './content/budgets/budgets.component';
import { SectionBudgetsComponent } from './content/section/budgets/section-budgets/section-budgets.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    HomepageComponent,
    HeaderComponent,
    NavLoggedInComponent,
    NavLoggedOutComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    SectionHomeComponent,
    NavComponent,
    EventsComponent,
    SectionEventsComponent,
    EventCardsComponent,
    FooterComponent,
    BudgetsComponent,
    SectionBudgetsComponent
  ],
  imports: [
    BrowserModule,
    MaterialUIModule,
    MatCardModule,
    MatMenuModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
