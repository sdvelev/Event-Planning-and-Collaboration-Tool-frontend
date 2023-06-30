import {User} from "./user";
import {PlannedEvent} from "./planned-event";

export class Participant {
  id: number;
  user_role: string;
  associated_user: User;
  associated_event: PlannedEvent;
  created_by: string;
  creation_time: string;
  updated_by: string;
  last_updated_time: string;


  constructor(id: number = 0, user_role: string = "", associated_user: User = new User(), associated_event: PlannedEvent = new PlannedEvent(), created_by: string = "", creation_time: string = "", updated_by: string = "", last_updated_time: string = "") {
    this.id = id;
    this.user_role = user_role;
    this.associated_user = associated_user;
    this.associated_event = associated_event;
    this.created_by = created_by;
    this.creation_time = creation_time;
    this.updated_by = updated_by;
    this.last_updated_time = last_updated_time;
  }
}
