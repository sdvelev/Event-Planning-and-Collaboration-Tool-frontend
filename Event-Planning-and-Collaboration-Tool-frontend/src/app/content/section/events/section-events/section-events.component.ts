import {Component, OnInit} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {MatDialog} from "@angular/material/dialog";
import {EventFormComponent} from "../event-form/event-form.component";
import {Participant} from "../../../../models/participant";
import {ParticipantService} from "../../../../services/participant.service";
import {ParticipantFormComponent} from "../participant-form/participant-form.component";

@Component({
  selector: 'app-section-events',
  templateUrl: './section-events.component.html',
  styleUrls: ['./section-events.component.css']
})
export class SectionEventsComponent implements OnInit{

  participants$!: Promise<Participant[] | undefined>;

  constructor(private participantService: ParticipantService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('tokenEventCrafter');
    if (token) {
      const { user_id } = JSON.parse(token);
      if (user_id) {
        this.participants$ = this.participantService.getAllParticipantsByUserId(user_id);
      }
    }
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
