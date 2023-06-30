import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Budget} from "../models/budget";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budget$: BehaviorSubject<Budget> = new BehaviorSubject<Budget>(new Budget());

  constructor(private httpClient: HttpClient) { }

  getBudgetsByEventId(id: number) {
    return this.httpClient.get<Budget[]>('http://localhost:8080/budgets/search?event_id=' + id);
  }

  getAllBudgets() {
    return this.httpClient.get<Budget[]>('http://localhost:8080/budgets').toPromise();
  }

  getBudgetById(id: number) {
    return this.httpClient.get<Budget>('http://localhost:8080/budgets/search?id=' + id)
      .pipe(
        tap((budget: Budget) => {
          this.budget$.next(budget);
        })
      );
  }

  addBudget(budgetDto: Budget, eventId: number, token: string): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<number>(`http://localhost:8080/budgets?assigned_event_id=${eventId}`, budgetDto,
      {headers: headers});
  }

  editBudget(budgetId: number, budgetDto: Budget, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.put<boolean>(`http://localhost:8080/budgets/set?budget_id=${budgetId}`, budgetDto,
      {headers: headers});
  }

  deleteBudget(budgetId: number, eventId: number, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<boolean>(`http://localhost:8080/budgets?id=${budgetId}&assigned_event_id=${eventId}`,
      {headers: headers});
  }
}
