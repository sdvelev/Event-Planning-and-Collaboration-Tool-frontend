import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Budget} from "../../../../models/budget";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExpenseService} from "../../../../services/expense.service";
import {Expense} from "../../../../models/expense";

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {
  expenseForm: FormGroup;
  event_id?: number;

  constructor(
    private dialogRef: MatDialogRef<ExpenseFormComponent>,
    @Inject(MAT_DIALOG_DATA) private expenseData: Budget,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.expenseForm = this.formBuilder.group({
      description: [expenseData?.description || '', Validators.required],
      expenditure_category: [expenseData?.expenditure_category.toLowerCase().replace(/\b\w/g, match => match.toUpperCase()) || '', Validators.required],
      amount: [expenseData?.amount || '', Validators.required]
    });
    this.event_id = this.expenseData.event_id;
  }

  saveExpense() {
    if (this.expenseForm.valid) {
      const expenseToSave: Expense = <Expense> {
        id: this.expenseData?.id || null,
        description: this.expenseForm.value.description,
        expenditure_category: this.expenseForm.value.expenditure_category,
        amount: this.expenseForm.value.amount
      };

      if (this.event_id) {
        this.expenseService.addExpense(expenseToSave, this.event_id).subscribe(
          updatedEvent => {
            this.dialogRef.close(updatedEvent);
          },
          error => {
            this.snackBar.open('Failed to save expense. Check if the budget for that category permits creating a new expense.', 'Close', {
              duration: 6000
            });
          }
        );
      } else {
        this.snackBar.open('Failed to save expense. Event with such an id cannot be found', 'Close', {
          duration: 6000
        });
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
