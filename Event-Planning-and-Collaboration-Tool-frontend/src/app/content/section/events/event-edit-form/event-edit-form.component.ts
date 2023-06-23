import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PlannedEvent } from "../../../../models/planned-event";
import { EventService } from "../../../../services/event.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-event-edit-form',
  templateUrl: './event-edit-form.component.html',
  styleUrls: ['./event-edit-form.component.css']
})
export class EventEditFormComponent {
  eventForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EventEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private eventData: PlannedEvent,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private datePipe: DatePipe
  ) {

    this.eventForm = this.formBuilder.group({
      name: [eventData?.name || '', Validators.required],
      date: [eventData?.date || '', Validators.required],
      location: [eventData?.location || '', Validators.required],
      description: [eventData?.description || '', Validators.required],
      picture_link: [eventData?.picture_link || '']
    });
  }

  editEvent() {
    if (this.eventForm.valid) {
      const eventToEdit: PlannedEvent = <PlannedEvent>{
        id: this.eventData?.id || null,
        name: this.eventForm.value.name,
        date: this.datePipe.transform(this.eventForm.value.date, 'yyyy-MM-dd HH:mm:ss'),
        location: this.eventForm.value.location,
        description: this.eventForm.value.description,
        picture_link: this.eventForm.value.picture_link
      };

      this.eventService.editEvent(eventToEdit.id, eventToEdit).subscribe(updatedEvent => {
        this.dialogRef.close(updatedEvent);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
