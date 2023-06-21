import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {PlannedEvent} from "../models/planned-event";
import {HttpClient} from "@angular/common/http";
import {Budget} from "../models/budget";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budget$: BehaviorSubject<Budget> = new BehaviorSubject<Budget>(new Budget());

  constructor(private httpClient: HttpClient) { }

  getBudgetsByEventId(id: number) {
    return this.httpClient.get<Budget[]>('http://localhost:8080/budgets?assigned_event_id=' + id);
  }
}
