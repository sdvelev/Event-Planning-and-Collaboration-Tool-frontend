import {Component, OnInit} from '@angular/core';
import {Task} from "../../../../models/task";
import {TaskService} from "../../../../services/task.service";
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private eventService: EventService, private taskService: TaskService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryId = this.activatedRoute.params.subscribe(params => {this.id = params['id']});
    this.event$ = this.eventService.getEventById(this.id);
    this.tasks$ = this.taskService.getTasksByEventId(this.id);
  }

  ngOnDestroy() {
    this.queryId.unsubscribe();
  }
}
