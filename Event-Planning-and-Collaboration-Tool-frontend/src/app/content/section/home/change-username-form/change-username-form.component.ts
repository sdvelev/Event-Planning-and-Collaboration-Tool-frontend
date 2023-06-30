import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {DatePipe} from "@angular/common";
import {UserService} from "../../../../services/user.service";
import {ChangeUsername} from "../../../../models/change-username";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-change-username-form',
  templateUrl: './change-username-form.component.html',
  styleUrls: ['./change-username-form.component.css']
})
export class ChangeUsernameFormComponent {

  changeUsernameForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ChangeUsernameFormComponent>,
    @Inject(MAT_DIALOG_DATA) private changeUsernameData: ChangeUsername,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.changeUsernameForm = this.formBuilder.group({
      new_username: [changeUsernameData?.new_username || '', Validators.required],
      old_username: [changeUsernameData?.old_username || '', Validators.required],
      password: [changeUsernameData?.password || '', Validators.required]
    });
  }

  change() {
    if (this.changeUsernameForm.valid) {
      const changeUsername: ChangeUsername = <ChangeUsername>{
        new_username: this.changeUsernameForm.value.new_username,
        old_username: this.changeUsernameForm.value.old_username,
        password: this.changeUsernameForm.value.password
      };

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const { token } = JSON.parse(tokenObject);
        if (token) {
          this.userService.setUsername(changeUsername.new_username, changeUsername.old_username,
            changeUsername.password, token).subscribe(updatedUser => {
            this.dialogRef.close(updatedUser);
          }
            ,
            error => {
              this.snackBar.open('Failed to change username. Check if the provided data is correct.', 'Close', {
                duration: 6000
              });
            }
          );
          return;
        }
      }
      this.snackBar.open('Failure in authorization. Please, try again.', 'Close', {
        duration: 6000
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
