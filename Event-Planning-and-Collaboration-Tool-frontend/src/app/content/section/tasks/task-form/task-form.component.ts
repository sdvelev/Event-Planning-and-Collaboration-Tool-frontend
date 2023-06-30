import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {TaskService} from "../../../../services/task.service";
import {Task} from "../../../../models/task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  eventId: number;

  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) private taskData: Task,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.eventId = parseInt(router.url.split('/').pop()!);

    this.taskForm = this.formBuilder.group({
      name: [taskData?.name || '', Validators.required],
      description: [taskData?.description || '', Validators.required],
      task_progress: [taskData?.task_progress || '', Validators.required],
      due_date: [taskData?.due_date || '', Validators.required],
      last_notified: [taskData?.last_notified || '', Validators.required],
      associated_event: [this.eventId || '', Validators.required],
      associated_participant: [taskData?.associated_participant || '', Validators.required]
    });
  }

  saveTask() {
    if (this.taskForm.valid) {
      const taskToSave: Task = <Task>{
        id: this.taskData?.id || null,
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        task_progress: this.taskForm.value.task_progress,
        due_date: this.datePipe.transform(this.taskForm.value.due_date, 'yyyy-MM-dd HH:mm:ss'),
        last_notified: this.datePipe.transform(this.taskForm.value.last_notified, 'yyyy-MM-dd HH:mm:ss'),
        associated_event: this.eventId,
        associated_participant: this.taskForm.value.associated_participant
      };

      this.taskService.addTask(taskToSave).subscribe(updatedTask => {
        this.dialogRef.close(updatedTask);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
