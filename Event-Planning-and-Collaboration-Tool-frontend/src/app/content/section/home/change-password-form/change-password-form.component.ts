import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChangeUsername} from "../../../../models/change-username";
import {UserService} from "../../../../services/user.service";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChangePassword} from "../../../../models/change-password";

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent {
  changePasswordForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordFormComponent>,
    @Inject(MAT_DIALOG_DATA) private changePasswordData: ChangePassword,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.changePasswordForm = this.formBuilder.group({
      new_password: [changePasswordData?.new_password || '', Validators.required],
      username: [changePasswordData?.username || '', Validators.required],
      old_password: [changePasswordData?.old_password || '', Validators.required]
    });
  }

  change() {
    if (this.changePasswordForm.valid) {
      const changePassword: ChangePassword = <ChangePassword>{
        new_password: this.changePasswordForm.value.new_password,
        username: this.changePasswordForm.value.username,
        old_password: this.changePasswordForm.value.old_password
      };

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const { token } = JSON.parse(tokenObject);
        if (token) {
          this.userService.setPassword(changePassword.new_password, changePassword.username,
            changePassword.old_password, token).subscribe(updatedUser => {
              this.dialogRef.close(updatedUser);
            }
            ,
            error => {
              this.snackBar.open('Failed to change password. Check if the provided data is correct.', 'Close', {
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
