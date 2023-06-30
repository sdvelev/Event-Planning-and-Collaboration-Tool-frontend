import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChangeUsername} from "../../../../models/change-username";
import {UserService} from "../../../../services/user.service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Authentication} from "../../../../models/authentication";

@Component({
  selector: 'app-delete-user-form',
  templateUrl: './delete-user-form.component.html',
  styleUrls: ['./delete-user-form.component.css']
})
export class DeleteUserFormComponent {

  deleteUserForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DeleteUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private deleteUserData: Authentication,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.deleteUserForm = this.formBuilder.group({
      password: [deleteUserData?.password || '', Validators.required]
    });
  }

  delete() {
    if (this.deleteUserForm.valid) {
      const deleteUser: Authentication = <Authentication>{
        username: this.deleteUserData?.username || null,
        password: this.deleteUserForm.value.password
      };

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const {token} = JSON.parse(tokenObject);
        if (token) {
          this.userService.deleteUser(deleteUser.username, deleteUser.password, token).subscribe(result => {
              if (result) {
                localStorage.removeItem('tokenEventCrafter');
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              }
            }
            ,
            error => {
              this.snackBar.open('Failed to delete user.', 'Close', {
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
