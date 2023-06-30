import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {DatePipe} from "@angular/common";
import {ParticipantService} from "../../../../services/participant.service";
import {UserService} from "../../../../services/user.service";
import {Participant} from "../../../../models/participant";
import {User} from "../../../../models/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {

  eventForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) private eventData: PlannedEvent,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private participantService: ParticipantService,
    private userService: UserService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.eventForm = this.formBuilder.group({
      name: [eventData?.name || '', Validators.required],
      date: [eventData?.date || '', Validators.required],
      location: [eventData?.location || '', Validators.required],
      description: [eventData?.description || '', Validators.required],
      picture_link: [eventData?.picture_link || '']
    });
  }

  saveEvent() {
    if (this.eventForm.valid) {
      const eventToSave: PlannedEvent = <PlannedEvent>{
        id: this.eventData?.id || null,
        name: this.eventForm.value.name,
        date: this.datePipe.transform(this.eventForm.value.date, 'yyyy-MM-dd HH:mm:ss'),
        location: this.eventForm.value.location,
        description: this.eventForm.value.description,
        picture_link: this.eventForm.value.picture_link
      };

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {

        const {user_id} = JSON.parse(tokenObject);
        const {token} = JSON.parse(tokenObject);

        if (user_id && token) {
          this.eventService.addEvent(eventToSave, token).subscribe(addedEventId => {
            this.userService.getUserById(user_id)
              .subscribe((user: User | undefined) => {
                this.eventService.getEventById(addedEventId)
                  .subscribe((event: PlannedEvent) => {
                    const participantDto: Participant = <Participant>{
                      associated_user: user,
                      associated_event: event,
                      user_role: 'Creator'
                    };
                    this.participantService.addParticipant(participantDto, user_id, addedEventId, token).
                    subscribe(addedParticipantId => {
                      this.dialogRef.close(addedParticipantId);
                      return;
                    },
                      error => {
                        this.snackBar.open('Failed to add participant.', 'Close', {
                          duration: 6000
                        });
                        return;
                      })
                  });
              });
            return;
          },
            error => {
              this.snackBar.open('Failed to add event.', 'Close', {
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

  cancel() {
    this.dialogRef.close();
  }
}
