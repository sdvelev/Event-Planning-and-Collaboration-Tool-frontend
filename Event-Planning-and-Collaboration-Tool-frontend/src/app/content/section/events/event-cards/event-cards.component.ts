import {Component, Input, OnInit} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";
import {EventFormComponent} from "../event-form/event-form.component";
import {MatDialog} from "@angular/material/dialog";
import {EventService} from "../../../../services/event.service";
import {EventEditFormComponent} from "../event-edit-form/event-edit-form.component";

@Component({
  selector: 'app-event-cards',
  templateUrl: './event-cards.component.html',
  styleUrls: ['./event-cards.component.css']
})
export class EventCardsComponent implements OnInit {
  @Input()
  plannedEvents: PlannedEvent[] = [];

  constructor(private dialog: MatDialog, private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  editButton(plannedEvent: PlannedEvent) {
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
    const confirmed = window.confirm('Are you sure you want to delete this event?');
    if (confirmed) {
      this.eventService.deleteEvent(eventId).subscribe(result => {
        if (result) {
          setTimeout(() => {
            window.location.reload();
          }, 50);
        }
      });
    }
  }
}
