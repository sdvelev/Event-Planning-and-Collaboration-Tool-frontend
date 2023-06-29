import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {Guest} from "../../../../models/guest";
import {GuestService} from "../../../../services/guest.service";
import {TaskFormComponent} from "../../tasks/task-form/task-form.component";
import {MatDialog} from "@angular/material/dialog";
import {Task} from "../../../../models/task";
import {TaskEditFormComponent} from "../../tasks/task-edit-form/task-edit-form.component";
import {GuestEditFormComponent} from "../guest-edit-form/guest-edit-form.component";
import {GuestFormComponent} from "../guest-form/guest-form.component";

@Component({
  selector: 'app-section-guests',
  templateUrl: './section-guests.component.html',
  styleUrls: ['./section-guests.component.css']
})
export class SectionGuestsComponent implements OnInit {

  id!: number;

  private queryId: any;

  event$!: Observable<PlannedEvent>;

  guests$!: Observable<Guest[] | undefined>;

  constructor(private eventService: EventService, private guestService: GuestService,
              private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.queryId = this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
    });
    this.event$ = this.eventService.getEventById(this.id);
    this.guests$ = this.guestService.getGuestsByEventId(this.id);
  }

  ngOnDestroy() {
    this.queryId.unsubscribe();
  }

  openGuestForm() {
    const dialogRef = this.dialog.open(GuestFormComponent, {
      width: '600px',
      height: '620px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  editButton(guest: Guest) {
    const dialogRef = this.dialog.open(GuestEditFormComponent, {
      width: '600px',
      height: '620px',
      data: {
        id: guest.id,
        name: guest.name,
        surname: guest.surname,
        email: guest.email,
        guest_type: guest.guest_type,
        attendance_type: guest.attendance_type,
        invitation_sent: guest.invitation_sent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteButton(guestId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this guest?');
    if (confirmed) {
      this.guestService.deleteGuest(guestId).subscribe(result => {
        if (result) {
          setTimeout(() => {
            window.location.reload();
          }, 50);
        }
      });
    }
  }
}
