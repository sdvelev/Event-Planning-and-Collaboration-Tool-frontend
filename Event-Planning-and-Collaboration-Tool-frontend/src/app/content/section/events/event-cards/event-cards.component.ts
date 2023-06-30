import {Component, Input, OnInit} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";
import {EventFormComponent} from "../event-form/event-form.component";
import {MatDialog} from "@angular/material/dialog";
import {EventService} from "../../../../services/event.service";
import {EventEditFormComponent} from "../event-edit-form/event-edit-form.component";
import {Participant} from "../../../../models/participant";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditRoleFormComponent} from "../edit-role-form/edit-role-form.component";
import {ParticipantFormComponent} from "../participant-form/participant-form.component";
import {ParticipantService} from "../../../../services/participant.service";

@Component({
  selector: 'app-event-cards',
  templateUrl: './event-cards.component.html',
  styleUrls: ['./event-cards.component.css']
})
export class EventCardsComponent implements OnInit {
  @Input()
  participants: Participant[] = [];

  constructor(private dialog: MatDialog,
              private eventService: EventService,
              private participantService: ParticipantService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  editEventButton(plannedEvent: PlannedEvent) {
    const dialogRef = this.dialog.open(EventEditFormComponent, {
      width: '600px',
      height: '620px',
      data: {
        id: plannedEvent.id,
        name: plannedEvent.name,
        date: plannedEvent.date.split(' ')[0],
        location: plannedEvent.location,
        description: plannedEvent.description,
        picture_link: plannedEvent.picture_link
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteButton(eventId: number) {
    const confirmed = window.confirm('Are you sure that you want to delete this event?');
    if (confirmed) {

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const {token} = JSON.parse(tokenObject);
        if (token) {
          this.eventService.deleteEvent(eventId, token).subscribe(result => {
              if (result) {
                setTimeout(() => {
                  window.location.reload();
                }, 50);
                return;
              }
            },
            error => {
              this.snackBar.open('Failed to delete event.', 'Close', {
                duration: 6000
              });
              return;
            });
        }
      } else {
        this.snackBar.open('Failure in authentication.', 'Close', {
          duration: 6000
        });
      }
    }
  }

  editUserRoleButton(participant: Participant) {
    const dialogRef = this.dialog.open(EditRoleFormComponent, {
      width: '600px',
      height: '260px',
      data: {
        id: participant.id,
        user_role: participant.user_role
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  addParticipantButton(participant: Participant) {
    const dialogRef = this.dialog.open(ParticipantFormComponent, {
      width: '600px',
      height: '340px',
      data: {
        id: participant.id,
        assigned_event_id: participant.associated_event.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  removeButton(participantId: number) {
    const confirmed = window.confirm('Are you sure that you want to leave that event?');
    if (confirmed) {
      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const {token} = JSON.parse(tokenObject);
        if (token) {
          this.participantService.deleteParticipant(participantId, token).subscribe(result => {
              if (result) {
                setTimeout(() => {
                  window.location.reload();
                }, 50);
                return;
              }
            },
            error => {
              this.snackBar.open('Failed to delete participant.', 'Close', {
                duration: 6000
              });
              return;
            });
        }
      } else {
        this.snackBar.open('Failure in authentication.', 'Close', {
          duration: 6000
        });
      }
    }
  }
}
