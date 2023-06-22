import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {Guest} from "../../../../models/guest";
import {GuestService} from "../../../../services/guest.service";

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

  constructor(private eventService: EventService, private guestService: GuestService, private activatedRoute: ActivatedRoute) {
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
}

