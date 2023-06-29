import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EventFormComponent} from "../../events/event-form/event-form.component";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-section-user',
  templateUrl: './section-user.component.html',
  styleUrls: ['./section-user.component.css']
})
export class SectionUserComponent {

  user$!: Promise<User | undefined>;

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('tokenEventCrafter');
    if (token) {
      const { user_id } = JSON.parse(token);
      if (user_id) {
        this.user$ = this.userService.getUserById(user_id);
      }
    }
  }

  openEventForm() {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '600px',
      height: '620px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

}
