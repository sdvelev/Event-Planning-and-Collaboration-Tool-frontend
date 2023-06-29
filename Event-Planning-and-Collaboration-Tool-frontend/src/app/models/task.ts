export class Task {
  id: number;
  name: string;
  description: string;
  task_progress: string;
  due_date: string;
  last_notified: string;
  associated_event: number | null;
  associated_participant: number | null;

  constructor(id: number = 0, name: string = "", description: string = "", task_progress: string = "",
              due_date: string = "",
              last_notified: string = "",
              associated_event: number | null = null,
              associated_participant: number | null = null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.task_progress = task_progress;
    this.due_date = due_date;
    this.last_notified = last_notified;
    this.associated_event = associated_event;
    this.associated_participant = associated_participant
  }
}
