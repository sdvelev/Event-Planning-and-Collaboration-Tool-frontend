import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChangeUsername} from "../../../../models/change-username";
import {UserService} from "../../../../services/user.service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css']
})
export class EditUserFormComponent {

  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private userData: User,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.userForm = this.formBuilder.group({
      name: [userData?.name || ''],
      surname: [userData?.surname || ''],
      email: [userData?.email || ''],
      profile_photo_link: [userData?.profile_photo_link || ''],
      address: [userData?.address || '']
    });
  }

  editUser() {
    if (this.userForm.valid) {
      const userToEdit: User = <User>{
        id: this.userData?.id || null,
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        email: this.userForm.value.email,
        profile_photo_link: this.userForm.value.profile_photo_link,
        address: this.userForm.value.address,

      };

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const { token } = JSON.parse(tokenObject);
        if (token) {
          this.userService.editUser(userToEdit.id,userToEdit,token).subscribe(updatedUser => {
              this.dialogRef.close(updatedUser);
            }
            ,
            error => {
              this.snackBar.open('Failed to edit user.', 'Close', {
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
