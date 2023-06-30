import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Budget} from "../../../../models/budget";
import {BudgetService} from "../../../../services/budget.service";
import {DatePipe} from "@angular/common";
import {User} from "../../../../models/user";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
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

      const tokenObject = localStorage.getItem('tokenEventCrafter');
      if (tokenObject) {
        const {token} = JSON.parse(tokenObject);
        if (token) {
          this.budgetService.editBudget(budgetToEdit.id, budgetToEdit, token).subscribe(updatedBudget => {
              this.dialogRef.close(updatedBudget);
            }
            ,
            error => {
              this.snackBar.open('Failed to edit budget.', 'Close', {
                duration: 6000
              });
            }
          );
          return;
        }
      } else {
        this.snackBar.open('Failure in authorization. Please, try again.', 'Close', {
          duration: 6000
        });
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
