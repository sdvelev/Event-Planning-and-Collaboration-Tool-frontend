import {Component, OnInit} from '@angular/core';
import {EventFormComponent} from "../../content/section/events/event-form/event-form.component";
import {PlannedEvent} from "../../models/planned-event";
import {EventService} from "../../services/event.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../login/login.component";
import {RegistrationComponent} from "../../registration/registration.component";

@Component({
  selector: 'app-nav-logged-out',
  templateUrl: './nav-logged-out.component.html',
  styleUrls: ['./nav-logged-out.component.css']
})
export class NavLoggedOutComponent implements OnInit{

  // plannedEvents$!: Promise<PlannedEvent[] | undefined>;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.plannedEvents$ = this.eventService.getAllEvents();
  }

  openLoginForm() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      height: '320px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  openRegistrationForm() {
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '600px',
      height: '740px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
