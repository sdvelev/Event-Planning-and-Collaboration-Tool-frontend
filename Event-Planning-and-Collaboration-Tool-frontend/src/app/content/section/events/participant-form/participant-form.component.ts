import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {ParticipantService} from "../../../../services/participant.service";
import {UserService} from "../../../../services/user.service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../../models/user";
import {Participant} from "../../../../models/participant";
import {AddParticipant} from "../../../../models/add-participant";

@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.css']
})
export class ParticipantFormComponent implements OnInit{

  participantForm: FormGroup;
  users: User[] = [];

  constructor(
    private dialogRef: MatDialogRef<ParticipantFormComponent>,
    @Inject(MAT_DIALOG_DATA) private addParticipantData: AddParticipant,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    private userService: UserService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.participantForm = this.formBuilder.group({
      assigned_user_id: [addParticipantData?.assigned_user_id || '', Validators.required],
      user_role: [addParticipantData?.user_role || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers()
      .then((users: User[] | undefined) => {
        if (users) {
          this.users = users;
        }
      })
      .catch(error => {
        this.snackBar.open('Failed to get users.', 'Close', {
          duration: 6000
        });
        this.dialogRef.close();
      });
  }

  addParticipant() {
    if (this.participantForm.valid) {
      const participantToSave: AddParticipant = <AddParticipant>{
        assigned_user_id: this.participantForm.value.assigned_user_id,
        assigned_event_id: this.addParticipantData?.assigned_event_id || null,
        user_role: this.participantForm.value.user_role
      };

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {

        const {user_id} = JSON.parse(tokenObject);
        const {token} = JSON.parse(tokenObject);

        if (user_id && token) {

          const participantDto: Participant = <Participant>{
            user_role: participantToSave.user_role
          };

          this.participantService.addParticipant(participantDto, participantToSave.assigned_user_id,
            participantToSave.assigned_event_id, token).subscribe(addedParticipantId => {
              this.snackBar.open('Added participant successfully.', 'Close', {
                duration: 6000
              });
              this.dialogRef.close(addedParticipantId);
            },
            error => {
              this.snackBar.open('Failed to add participant.', 'Close', {
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
