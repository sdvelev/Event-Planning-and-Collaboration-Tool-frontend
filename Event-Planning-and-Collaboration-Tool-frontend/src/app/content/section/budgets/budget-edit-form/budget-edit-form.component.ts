import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Budget} from "../../../../models/budget";
import {BudgetService} from "../../../../services/budget.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-budget-edit-form',
  templateUrl: './budget-edit-form.component.html',
  styleUrls: ['./budget-edit-form.component.css']
})
export class BudgetEditFormComponent {
  budgetForm: FormGroup;
  event_id?: number;

  constructor(
    private dialogRef: MatDialogRef<BudgetEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private budgetData: Budget,
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private datePipe: DatePipe
  ) {

    this.budgetForm = this.formBuilder.group({
      description: [budgetData?.description || '', Validators.required],
      // expenditure_category: [budgetData?.expenditure_category || '', Validators.required],
      amount: [budgetData?.amount || '', Validators.required]
    });
  }

  editBudget() {
    if (this.budgetForm.valid) {
      const budgetToEdit: Budget = <Budget>{
        id: this.budgetData?.id || null,
        description: this.budgetForm.value.description,
        amount: this.budgetForm.value.amount
      };

      this.budgetService.editBudget(budgetToEdit.id, budgetToEdit).subscribe(updatedEvent => {
        this.dialogRef.close(updatedEvent);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
