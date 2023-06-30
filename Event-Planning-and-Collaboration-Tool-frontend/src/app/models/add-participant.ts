import {Participant} from "./participant";

export class AddParticipant {

  assigned_user_id: number;
  assigned_event_id: number;
  user_role: string;

  constructor(assigned_user_id: number = 0, assigned_event_id: number = 0, user_role: string = "") {
    this.assigned_user_id = assigned_user_id;
    this.assigned_event_id = assigned_event_id;
    this.user_role = user_role;
  }
}
