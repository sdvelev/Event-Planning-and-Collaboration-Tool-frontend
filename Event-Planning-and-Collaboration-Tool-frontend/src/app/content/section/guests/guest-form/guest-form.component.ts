import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GuestService} from "../../../../services/guest.service";
import {Guest} from "../../../../models/guest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.css'],
})
export class GuestFormComponent {
  guestFrom: FormGroup;
  eventId: number;

  constructor(
    private dialogRef: MatDialogRef<GuestFormComponent>,
    @Inject(MAT_DIALOG_DATA) private guestData: Guest,
    private formBuilder: FormBuilder,
    private guestService: GuestService,
    private router: Router
  ) {
    this.eventId = parseInt(router.url.split('/').pop()!);

    this.guestFrom = this.formBuilder.group({
      name: [guestData?.name || '', Validators.required],
      surname: [guestData?.surname || '', Validators.required],
      email: [guestData?.email || '', Validators.required],
      guest_type: [guestData?.guest_type || '', Validators.required],
      attendance_type: [guestData?.attendance_type || '', Validators.required],
      // invitation_sent: [guestData?.invitation_sent || '', Validators.required],
      associated_event: [this.eventId || '', Validators.required]
    });
  }

  saveGuest() {
    if (this.guestFrom.valid) {
      const guestToSave: Guest = <Guest>{
        id: this.guestData?.id || null,
        name: this.guestFrom.value.name,
        surname: this.guestFrom.value.surname,
        email: this.guestFrom.value.email,
        guest_type: this.guestFrom.value.guest_type,
        attendance_type: this.guestFrom.value.attendance_type,
        invitation_sent: true,
        associated_event: this.eventId
      };

      this.guestService.addGuest(guestToSave).subscribe(updatedGuest => {
        this.dialogRef.close(updatedGuest);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
