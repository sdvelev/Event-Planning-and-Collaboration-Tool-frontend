import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Budget} from "../../../../models/budget";
import {DatePipe} from "@angular/common";
import {ExpenseService} from "../../../../services/expense.service";
import {Expense} from "../../../../models/expense";

@Component({
  selector: 'app-expense-edit-form',
  templateUrl: './expense-edit-form.component.html',
  styleUrls: ['./expense-edit-form.component.css']
})
export class ExpenseEditFormComponent {

  expenseForm: FormGroup;
  event_id?: number;

  constructor(
    private dialogRef: MatDialogRef<ExpenseEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private expenseData: Budget,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
    private datePipe: DatePipe
  ) {

    this.expenseForm = this.formBuilder.group({
      description: [expenseData?.description || '', Validators.required],
      // expenditure_category: [budgetData?.expenditure_category || '', Validators.required],
      amount: [expenseData?.amount || '', Validators.required]
    });
    // this.event_id = budgetData?.event_id;
  }

  editExpense() {
    if (this.expenseForm.valid) {
      const expenseToEdit: Expense = <Expense>{
        id: this.expenseData?.id || null,
        description: this.expenseForm.value.description,
        amount: this.expenseForm.value.amount
      };

      this.expenseService.editExpense(expenseToEdit.id, expenseToEdit).subscribe(updatedExpense => {
        this.dialogRef.close(updatedExpense);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
