import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./content/home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {EventsComponent} from "./content/events/events.component";
import {BudgetsComponent} from "./content/budgets/budgets.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventsComponent},
  {path: 'budgets/:id', component: BudgetsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
