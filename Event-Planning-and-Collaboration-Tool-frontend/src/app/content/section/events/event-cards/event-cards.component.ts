import {Component, Input, OnInit} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";

@Component({
  selector: 'app-event-cards',
  templateUrl: './event-cards.component.html',
  styleUrls: ['./event-cards.component.css']
})
export class EventCardsComponent implements OnInit{
  @Input()
  plannedEvents: PlannedEvent[] = [];

  constructor() {}

  ngOnInit(): void {
  }
}
