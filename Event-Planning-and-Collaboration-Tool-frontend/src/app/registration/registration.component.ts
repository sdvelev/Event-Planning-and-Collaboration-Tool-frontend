import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) private registrationData: User,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private datePipe: DatePipe,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.registrationForm = this.formBuilder.group({
      username: [registrationData?.username || '', Validators.required],
      password: [registrationData?.password || '', Validators.required],
      email: [registrationData?.email || '', Validators.required],
      name: [registrationData?.name || ''],
      surname: [registrationData?.surname || ''],
      profile_photo_link: [registrationData?.profile_photo_link || ''],
      address: [registrationData?.address || '']
    });
  }

  register() {
    if (this.registrationForm.valid) {
      const userDto: User = <User>{
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
        email: this.registrationForm.value.email,
        name: this.registrationForm.value.name,
        surname: this.registrationForm.value.surname,
        profile_photo_link: this.registrationForm.value.profile_photo_link,
        address: this.registrationForm.value.address
      };

      this.userService.addUser(userDto).subscribe(addedUser => {
          this.snackBar.open('Successful registration.', 'Close', {
            duration: 6000
          });
        this.dialogRef.close(addedUser);
        return this.router.navigate(['/home']);
      },
        error => {
          this.snackBar.open('Failed to register. Already existing data.', 'Close', {
            duration: 6000
          });
        });
    } else {
      this.snackBar.open('Failed to register. Form is not valid.', 'Close', {
        duration: 6000
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
