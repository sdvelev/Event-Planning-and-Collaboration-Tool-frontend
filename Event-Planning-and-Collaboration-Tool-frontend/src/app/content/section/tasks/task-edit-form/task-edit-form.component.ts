import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../../../models/task";
import {TaskService} from "../../../../services/task.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.css']
})
export class TaskEditFormComponent {
  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TaskEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private taskData: Task,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private datePipe: DatePipe
  ) {

    this.taskForm = this.formBuilder.group({
      name: [taskData?.name || '', Validators.required],
      description: [taskData?.description || '', Validators.required],
      task_progress: [taskData?.task_progress || '', Validators.required],
      due_date: [taskData?.due_date || '', Validators.required],
      last_notified: [taskData?.last_notified || '', Validators.required],
    });
  }

  editTask() {
    // console.log(this.taskForm.value.name);
    // console.log(this.taskForm.value.description);
    // console.log(this.taskForm.value.task_progress);
    // console.log(this.datePipe.transform(this.taskForm.value.due_date, 'yyyy-MM-dd HH:mm:ss'));
    // console.log(this.datePipe.transform('2023-10-10 18:00:00', 'yyyy-MM-dd HH:mm:ss'));
    // console.log(this.taskForm.value.associated_event);
    // console.log(this.taskForm.value.associated_participant);

    if (this.taskForm.valid) {
      const taskToSave: Task = <Task> {
        id: this.taskData?.id || null,
        name: this.taskForm.value.name,
        description: this.taskForm.value.description,
        task_progress: this.taskForm.value.task_progress,
        due_date: this.datePipe.transform(this.taskForm.value.due_date, 'yyyy-MM-dd HH:mm:ss'),
        last_notified: this.datePipe.transform(this.taskForm.value.last_notified, 'yyyy-MM-dd HH:mm:ss'),
      };

      this.taskService.editTask(taskToSave.id, taskToSave).subscribe(updatedTask => {
        this.dialogRef.close(updatedTask);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
