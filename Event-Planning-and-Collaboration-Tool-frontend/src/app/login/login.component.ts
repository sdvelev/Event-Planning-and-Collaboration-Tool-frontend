import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlannedEvent} from "../models/planned-event";
import {EventService} from "../services/event.service";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../services/authentication.service";
import {Authentication} from "../models/authentication";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) private loginData: Authentication,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.loginForm = this.formBuilder.group({
      username: [loginData?.username || '', Validators.required],
      password: [loginData?.password || '', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const authenticationDto: Authentication = <Authentication>{
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.authenticationService.login(authenticationDto).subscribe(returnedToken => {
        localStorage.setItem('tokenEventCrafter', JSON.stringify(returnedToken))
        this.dialogRef.close(authenticationDto);
        return this.router.navigate(['/home']);
      },
        error => {
          this.snackBar.open('Failed to log in.', 'Close', {
            duration: 6000
          });
        });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
