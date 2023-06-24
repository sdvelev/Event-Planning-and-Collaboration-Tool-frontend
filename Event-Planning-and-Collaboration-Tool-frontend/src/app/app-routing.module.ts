import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./content/home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {EventsComponent} from "./content/events/events.component";
import {BudgetsComponent} from "./content/budgets/budgets.component";
import {TasksComponent} from "./content/tasks/tasks.component";
import {GuestsComponent} from "./content/guests/guests.component";
import {ContractsComponent} from "./content/contracts/contracts.component";
import {VendorsComponent} from "./content/vendors/vendors.component";
import {ReviewsComponent} from "./content/reviews/reviews.component";
import {TaskNotificationsComponent} from "./content/task-notifications/task-notifications.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'tasks/:id', component: TasksComponent },
  { path: 'budgets/:id', component: BudgetsComponent },
  { path: 'guests/:id', component: GuestsComponent },
  { path: 'contracts/:id', component: ContractsComponent },
  { path: 'vendors/:id', component: VendorsComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  { path: 'task_notific/:id', component: TaskNotificationsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
