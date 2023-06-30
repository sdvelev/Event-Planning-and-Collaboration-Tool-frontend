import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditRole} from "../../../../models/edit-role";
import {ParticipantService} from "../../../../services/participant.service";

@Component({
  selector: 'app-edit-role-form',
  templateUrl: './edit-role-form.component.html',
  styleUrls: ['./edit-role-form.component.css']
})
export class EditRoleFormComponent {
  editRoleForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditRoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) private editRoleData: EditRole,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.editRoleForm = this.formBuilder.group({
      user_role: [editRoleData?.user_role || '', Validators.required]
    });
  }

  editRole() {
    if (this.editRoleForm.valid) {
      const roleToEdit: EditRole = <EditRole>{
        id: this.editRoleData?.id || null,
        user_role: this.editRoleForm.value.user_role
      };

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const {token} = JSON.parse(tokenObject);
        if (token) {
          this.participantService.editParticipant(roleToEdit.id, roleToEdit, token).subscribe(updatedEvent => {
              this.dialogRef.close(updatedEvent);
              return;
            },
            error => {
              this.snackBar.open('Failed to edit user role.', 'Close', {
                duration: 6000
              });
              return;
            });
        } else {
          this.snackBar.open('Failure in authentication123.', 'Close', {
            duration: 6000
          });
        }
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
