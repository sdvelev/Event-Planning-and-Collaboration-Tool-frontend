import {Component, OnInit} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";

@Component({
  selector: 'app-section-events',
  templateUrl: './section-events.component.html',
  styleUrls: ['./section-events.component.css']
})
export class SectionEventsComponent implements OnInit{

  plannedEvents$!: Promise<PlannedEvent[] | undefined>;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.plannedEvents$ = this.eventService.getAllEvents();
  }
}
