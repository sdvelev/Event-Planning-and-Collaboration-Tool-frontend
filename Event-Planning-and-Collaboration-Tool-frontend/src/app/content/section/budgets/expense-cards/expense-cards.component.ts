import {Component, Input, OnInit} from '@angular/core';
import {Budget} from "../../../../models/budget";
import {MatDialog} from "@angular/material/dialog";
import {BudgetService} from "../../../../services/budget.service";
import {Expense} from "../../../../models/expense";
import {ExpenseService} from "../../../../services/expense.service";
import {BudgetEditFormComponent} from "../budget-edit-form/budget-edit-form.component";
import {ExpenseEditFormComponent} from "../expense-edit-form/expense-edit-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-expense-cards',
  templateUrl: './expense-cards.component.html',
  styleUrls: ['./expense-cards.component.css']
})
export class ExpenseCardsComponent implements OnInit {

  @Input()
  expenses: Expense[] = [];

  constructor(private dialog: MatDialog, private expenseService: ExpenseService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }


  editButton(expense: Expense) {
    const dialogRef = this.dialog.open(ExpenseEditFormComponent, {
      width: '600px',
      height: '320px',
      data: {
        id: expense.id,
        description: expense.description,
        expenditure_category: expense.expenditure_category,
        amount: expense.amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteButton(expenseId: number) {

    const confirmed = window.confirm('Are you sure that you want to delete this expense?');
    if (confirmed) {
      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const {token} = JSON.parse(tokenObject);
        if (token) {
          this.expenseService.deleteExpense(expenseId, token).subscribe(result => {
              if (result) {
                setTimeout(() => {
                  window.location.reload();
                }, 50);
                return;
              }
            },
            error => {
              this.snackBar.open('Failed to delete expense.', 'Close', {
                duration: 6000
              });
              return;
            });
        }
      } else {
        this.snackBar.open('Failure in authentication.', 'Close', {
          duration: 6000
        });
      }
    }
  }
}
