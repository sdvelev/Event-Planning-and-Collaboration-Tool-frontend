import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Guest} from "../../../../models/guest";
import {GuestService} from "../../../../services/guest.service";

@Component({
  selector: 'app-guest-edit-form',
  templateUrl: './guest-edit-form.component.html',
  styleUrls: ['./guest-edit-form.component.css']
})
export class GuestEditFormComponent {
  guestFrom: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<GuestEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private guestData: Guest,
    private formBuilder: FormBuilder,
    private guestService: GuestService,
  ) {

    this.guestFrom = this.formBuilder.group({
      name: [guestData?.name || '', Validators.required],
      surname: [guestData?.surname || '', Validators.required],
      email: [guestData?.email || '', Validators.required],
      guest_type: [guestData?.guest_type || '', Validators.required],
      attendance_type: [guestData?.attendance_type || '', Validators.required],
      invitation_sent: [guestData?.invitation_sent || '', Validators.required],
    });
  }

  editGuest() {
    if (this.guestFrom.valid) {
      const guestToSave: Guest = <Guest>{
        id: this.guestData?.id || null,
        name: this.guestFrom.value.name,
        surname: this.guestFrom.value.surname,
        email: this.guestFrom.value.email,
        guest_type: this.guestFrom.value.guest_type,
        attendance_type: this.guestFrom.value.attendance_type,
        invitation_sent: this.guestFrom.value.invitation_sent
      };

      this.guestService.editGuest(guestToSave.id, guestToSave).subscribe(updatedGuest => {
        this.dialogRef.close(updatedGuest);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
