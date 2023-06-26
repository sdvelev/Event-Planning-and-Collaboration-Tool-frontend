import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-section-budgets',
  templateUrl: './section-budgets.component.html',
  styleUrls: ['./section-budgets.component.css']
})
export class SectionBudgetsComponent implements OnInit, OnDestroy {

  id!: number;

  private queryId: any;

  event$!: Observable<PlannedEvent>;

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.queryId = this.activatedRoute.params.subscribe(params => {this.id = params['id'];});
    this.event$ = this.eventService.getEventById(this.id);
  }

  ngOnDestroy() {
    this.queryId.unsubscribe();
  }
}
