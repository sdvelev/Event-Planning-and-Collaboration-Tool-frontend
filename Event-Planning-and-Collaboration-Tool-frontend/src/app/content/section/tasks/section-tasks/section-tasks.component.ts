import {Component, OnInit} from '@angular/core';
import {Task} from "../../../../models/task";
import {TaskService} from "../../../../services/task.service";
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {EventFormComponent} from "../../events/event-form/event-form.component";
import {MatDialog} from "@angular/material/dialog";
import {TaskFormComponent} from "../task-form/task-form.component";
import {EventEditFormComponent} from "../../events/event-edit-form/event-edit-form.component";
import {TaskEditFormComponent} from "../task-edit-form/task-edit-form.component";

@Component({
  selector: 'app-section-tasks',
  templateUrl: './section-tasks.component.html',
  styleUrls: ['./section-tasks.component.css']
})
export class SectionTasksComponent implements OnInit {

  id!: number;

  private queryId: any;

  event$!: Observable<PlannedEvent>;

  tasks$!: Observable<Task[] | undefined>;

  constructor(private eventService: EventService, private taskService: TaskService,
              private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.queryId = this.activatedRoute.params.subscribe(params => {this.id = params['id']});
    this.event$ = this.eventService.getEventById(this.id);
    this.tasks$ = this.taskService.getTasksByEventId(this.id);
  }

  ngOnDestroy() {
    this.queryId.unsubscribe();
  }

  openTaskForm() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
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

  editButton(task: Task) {
    const dialogRef = this.dialog.open(TaskEditFormComponent, {
      width: '600px',
      height: '620px',
      data: {
        id: task.id,
        name: task.name,
        description: task.description,
        task_progress: task.task_progress,
        due_date: task.due_date.split(' ')[0],
        last_notified: task.last_notified.split(' ')[0]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteButton(taskId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      this.taskService.deleteTask(taskId).subscribe(result => {
        if (result) {
          setTimeout(() => {
            window.location.reload();
          }, 50);
        }
      });
    }
  }
}
