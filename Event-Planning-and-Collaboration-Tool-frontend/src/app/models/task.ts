import {PlannedEvent} from "./planned-event";

export class Task {
  id: number;
  name: string;
  description: string;
  task_progress: string;
  due_date: string;
  last_notified: string;
  associated_event: PlannedEvent;
  //associated_participant: Participant;

  constructor(id: number = 0, name: string = "", description: string = "", task_progress: string = "",
              due_date: string = "",
              last_notified: string = "",
              associated_event: PlannedEvent = new PlannedEvent(),
              // associated_participant: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.task_progress = task_progress;
    this.due_date = due_date;
    this.last_notified = last_notified;
    this.associated_event = associated_event;

    // FIX PARTICIPANT
    //this.associated_participant = associated_participant
  }
}
