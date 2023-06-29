import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Budget} from "../models/budget";
import {HttpClient} from "@angular/common/http";
import {Expense} from "../models/expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expense$: BehaviorSubject<Expense> = new BehaviorSubject<Expense>(new Expense());

  constructor(private httpClient: HttpClient) { }

  getExpensesByEventId(id: number) {
    return this.httpClient.get<Expense[]>('http://localhost:8080/expenses/search?event_id=' + id);
  }

  getAllExpensesWithExpenditureCategoryByEventId(id: number, expenditure_category: string) {
    return this.httpClient.get<Expense[]>(`http://localhost:8080/expenses/search?event_id=${id}&expenditure_category=${expenditure_category}`);
  }

  getAllExpenses() {
    return this.httpClient.get<Expense[]>('http://localhost:8080/expenses').toPromise();
  }

  getExpenseById(id: number) {
    return this.httpClient.get<Expense>('http://localhost:8080/expenses/search?id=' + id)
      .pipe(
        tap((expense: Expense) => {
          this.expense$.next(expense);
        })
      );
  }

  addExpense(expenseDto: Expense, eventId: number): Observable<number> {
    console.log(expenseDto);
    return this.httpClient.post<number>(`http://localhost:8080/expenses?assigned_event_id=${eventId}`, expenseDto);
  }

  editExpense(expenseId: number, expensesDto: Expense): Observable<boolean> {
    return this.httpClient.put<boolean>(`http://localhost:8080/expenses/set?expense_id=${expenseId}`, expensesDto);
  }

  deleteExpense(expenseId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`http://localhost:8080/expenses?id=${expenseId}`);
  }
}
