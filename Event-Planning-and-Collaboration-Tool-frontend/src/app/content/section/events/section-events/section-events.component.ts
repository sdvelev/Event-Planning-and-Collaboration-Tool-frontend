import {Component, OnInit} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {MatDialog} from "@angular/material/dialog";
import {EventFormComponent} from "../event-form/event-form.component";

@Component({
  selector: 'app-section-events',
  templateUrl: './section-events.component.html',
  styleUrls: ['./section-events.component.css']
})
export class SectionEventsComponent implements OnInit{

  plannedEvents$!: Promise<PlannedEvent[] | undefined>;

  constructor(private eventService: EventService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.plannedEvents$ = this.eventService.getAllEvents();
  }

  openEventForm() {
    const dialogRef = this.dialog.open(EventFormComponent, {
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
}
