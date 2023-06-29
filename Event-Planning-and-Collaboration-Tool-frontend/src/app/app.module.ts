import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatCardModule} from "@angular/material/card";
import {MaterialUIModule} from "./material-ui/material-ui.module";
import {EventComponent} from './event/event.component';
import {MatMenuModule} from "@angular/material/menu";
import {HomepageComponent} from './homepage/homepage.component';
import {HeaderComponent} from './header/header.component';
import {NavLoggedInComponent} from './navigation/nav-logged-in/nav-logged-in.component';
import {NavLoggedOutComponent} from './navigation/nav-logged-out/nav-logged-out.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './content/home/home.component';
import {Router, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {SectionHomeComponent} from './content/section/home/section-home/section-home.component';
import {HttpClientModule} from "@angular/common/http";
import {NavComponent} from './navigation/nav/nav.component';
import {EventsComponent} from './content/events/events.component';
import {SectionEventsComponent} from './content/section/events/section-events/section-events.component';
import {EventCardsComponent} from './content/section/events/event-cards/event-cards.component';
import {FooterComponent} from './footer/footer.component';
import {BudgetsComponent} from './content/budgets/budgets.component';
import {SectionBudgetsComponent} from './content/section/budgets/section-budgets/section-budgets.component';
import {TasksComponent} from './content/tasks/tasks.component';
import {GuestsComponent} from './content/guests/guests.component';
import {ContractsComponent} from './content/contracts/contracts.component';
import {VendorsComponent} from './content/vendors/vendors.component';
import {ReviewsComponent} from './content/reviews/reviews.component';
import {SectionTasksComponent} from "./content/section/tasks/section-tasks/section-tasks.component";
import {SectionVendorsComponent} from "./content/section/vendors/section-vendors/section-vendors.component";
import {SectionReviewsComponent} from './content/section/reviews/section-reviews/section-reviews.component';
import {SectionGuestsComponent} from './content/section/guests/section-guests/section-guests.component';
import {SectionContractsComponent} from './content/section/contracts/section-contracts/section-contracts.component';
import { ReactiveFormsModule } from '@angular/forms';
import {EventFormComponent} from "./content/section/events/event-form/event-form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import { EventEditFormComponent } from './content/section/events/event-edit-form/event-edit-form.component';
import { AllBudgetCardComponent } from './content/section/budgets/all-budget-card/all-budget-card.component';
import { BudgetCardsComponent } from './content/section/budgets/budget-cards/budget-cards.component';
import { ExpenseCardsComponent } from './content/section/budgets/expense-cards/expense-cards.component';
import { BudgetFormComponent } from './content/section/budgets/budget-form/budget-form.component';
import { BudgetEditFormComponent } from './content/section/budgets/budget-edit-form/budget-edit-form.component';
import { ExpenseFormComponent } from './content/section/budgets/expense-form/expense-form.component';
import { ExpenseEditFormComponent } from './content/section/budgets/expense-edit-form/expense-edit-form.component';
import { SectionUserComponent } from './content/section/home/section-user/section-user.component';
import { UserCardComponent } from './content/section/home/user-card/user-card.component';
import { ChangeUsernameFormComponent } from './content/section/home/change-username-form/change-username-form.component';
import { ChangePasswordFormComponent } from './content/section/home/change-password-form/change-password-form.component';
import { EditUserFormComponent } from './content/section/home/edit-user-form/edit-user-form.component';
import { DeleteUserFormComponent } from './content/section/home/delete-user-form/delete-user-form.component';

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
    SectionBudgetsComponent,
    TasksComponent,
    GuestsComponent,
    ContractsComponent,
    VendorsComponent,
    ReviewsComponent,
    SectionTasksComponent,
    SectionVendorsComponent,
    SectionReviewsComponent,
    SectionGuestsComponent,
    SectionContractsComponent,
    EventFormComponent,
    EventEditFormComponent,
    AllBudgetCardComponent,
    BudgetCardsComponent,
    ExpenseCardsComponent,
    BudgetFormComponent,
    BudgetEditFormComponent,
    ExpenseFormComponent,
    ExpenseEditFormComponent,
    SectionUserComponent,
    UserCardComponent,
    ChangeUsernameFormComponent,
    ChangePasswordFormComponent,
    EditUserFormComponent,
    DeleteUserFormComponent
  ],
  imports: [
    BrowserModule,
    MaterialUIModule,
    MatCardModule,
    MatMenuModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
