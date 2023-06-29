import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {Budget} from "../../../../models/budget";
import {BudgetService} from "../../../../services/budget.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent {

  budgetForm: FormGroup;
  event_id?: number;

  constructor(
    private dialogRef: MatDialogRef<BudgetFormComponent>,
    @Inject(MAT_DIALOG_DATA) private budgetData: Budget,
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {

    this.budgetForm = this.formBuilder.group({
      description: [budgetData?.description || '', Validators.required],
      expenditure_category: [budgetData?.expenditure_category || '', Validators.required],
      amount: [budgetData?.amount || '', Validators.required]
    });
    this.event_id = this.budgetData.event_id;
  }

  saveBudget() {
    if (this.budgetForm.valid) {
      const budgetToSave: Budget = <Budget> {
        id: this.budgetData?.id || null,
        description: this.budgetForm.value.description,
        expenditure_category: this.budgetForm.value.expenditure_category,
        amount: this.budgetForm.value.amount
      };

      if (this.event_id) {
        this.budgetService.addBudget(budgetToSave, this.event_id).subscribe(
          updatedEvent => {
            this.dialogRef.close(updatedEvent);
          },
          error => {
            this.snackBar.open('Failed to save budget. Check if the overall budget permits creating a new budget.', 'Close', {
              duration: 6000
            });
          }
        );
      } else {
        this.snackBar.open('Failed to save budget. Event with such an id cannot be found.', 'Close', {
          duration: 6000
        });
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
