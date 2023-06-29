import {Component, Input} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";
import {MatDialog} from "@angular/material/dialog";
import {EventService} from "../../../../services/event.service";
import {EventEditFormComponent} from "../../events/event-edit-form/event-edit-form.component";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {ChangeUsernameFormComponent} from "../change-username-form/change-username-form.component";
import {ChangePasswordFormComponent} from "../change-password-form/change-password-form.component";
import {EditUserFormComponent} from "../edit-user-form/edit-user-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteUserFormComponent} from "../delete-user-form/delete-user-form.component";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input()
  user!: User;

  constructor(private dialog: MatDialog, private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  // editButton(plannedEvent: PlannedEvent) {
  //   const dialogRef = this.dialog.open(EventEditFormComponent, {
  //     width: '600px',
  //     height: '620px',
  //     data: {
  //       id: plannedEvent.id,
  //       name: plannedEvent.name,
  //       date: plannedEvent.date.split(' ')[0],
  //       location: plannedEvent.location,
  //       description: plannedEvent.description,
  //       picture_link: plannedEvent.picture_link
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       window.location.reload();
  //     }
  //   });
  // }
  //
  // deleteButton(eventId: number) {
  //   const confirmed = window.confirm('Are you sure you want to delete this event?');
  //   if (confirmed) {
  //     this.eventService.deleteEvent(eventId).subscribe(result => {
  //       if (result) {
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 50);
  //       }
  //     });
  //   }
  // }
  changeUsername() {
    const dialogRef = this.dialog.open(ChangeUsernameFormComponent, {
      width: '600px',
      height: '410px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordFormComponent, {
      width: '600px',
      height: '410px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  editUser() {
    const dialogRef = this.dialog.open(EditUserFormComponent, {
      width: '600px',
      height: '620px',
      data: {
        id: this.user.id,
        name: this.user.name,
        surname: this.user.surname,
        email: this.user.email,
        profile_photo_link: this.user.profile_photo_link,
        address: this.user.address
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteProfile() {

    const dialogRef = this.dialog.open(DeleteUserFormComponent, {
      width: '600px',
      height: '260px',
      data: {
        username: this.user.username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
    }
}
