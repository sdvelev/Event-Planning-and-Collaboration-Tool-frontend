import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {PlannedEvent} from "../../../../models/planned-event";
import {MatDialog} from "@angular/material/dialog";
import {EventService} from "../../../../services/event.service";
import {EventEditFormComponent} from "../../events/event-edit-form/event-edit-form.component";
import {Budget} from "../../../../models/budget";
import {BudgetService} from "../../../../services/budget.service";
import {defaultIfEmpty, filter, map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Expense} from "../../../../models/expense";
import {ExpenseService} from "../../../../services/expense.service";
import {BudgetEditFormComponent} from "../budget-edit-form/budget-edit-form.component";
import {BudgetFormComponent} from "../budget-form/budget-form.component";
import {ExpenseFormComponent} from "../expense-form/expense-form.component";

@Component({
  selector: 'app-budget-cards',
  templateUrl: './budget-cards.component.html',
  styleUrls: ['./budget-cards.component.css']
})
export class BudgetCardsComponent implements OnInit{

  @Input()
  budgets: Budget[] = [];

  id!: number;
  private queryId: any;
  expenses$!: Observable<Expense[] | undefined>;
  filteredExpenses$: { [expenditure_category: string]: Observable<Expense[] | undefined> } = {};

  constructor(private dialog: MatDialog, private budgetService: BudgetService, private expenseService: ExpenseService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.queryId = this.activatedRoute.params.subscribe(params => {this.id = params['id'];});
    this.expenses$ = this.expenseService.getExpensesByEventId(this.id);

    this.budgets.sort((a, b) => {
      if (a.expenditure_category.toUpperCase() === 'ALL') {
        return -1;
      } else if (b.expenditure_category.toUpperCase() === 'ALL') {
        return 1;
      } else {
        return a.expenditure_category.localeCompare(b.expenditure_category);
      }
    });
  }

  editButton(budget: Budget) {
    const dialogRef = this.dialog.open(BudgetEditFormComponent, {
      width: '600px',
      height: '320px',
      data: {
        id: budget.id,
        description: budget.description,
        expenditure_category: budget.expenditure_category,
        amount: budget.amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteButton(budgetId: number) {
    const confirmed = window.confirm('Are you sure that you want to delete this budget?');
    if (confirmed) {
      this.budgetService.deleteBudget(budgetId, this.id).subscribe(result => {
        if (result) {
          setTimeout(() => {
            window.location.reload();
          }, 50);
        }
      });
    }
  }

  getBudgetImage(expenditure_category: string) {
    switch (expenditure_category) {
      case 'ALL':
        return 'https://www.zambianguardian.com/wp-content/uploads/2021/12/budget.jpg';
      case 'DECORATION':
        return 'https://www.happywedding.app/blog/wp-content/uploads/2023/03/Wedding-Stage-Decor.jpg';
      case 'CATERER':
        return 'https://piguetscatering.com/wp-content/uploads/2022/04/catering-dishes-1024x694.jpg';
      case 'PHOTOGRAPHER':
        return 'https://eventcrew.asia/public/userfiles/files/News/Event-Photographer.jpg';
      case 'VENUE':
        return 'https://thefunction.com.au/wp-content/uploads/2018/04/Tips-for-Choosing-the-Best-Venue-for-Corporate-Events-The-Function-1.jpg';
      case 'OTHER':
        return 'https://www.vidyard.com/media/video-for-event-marketing.jpg';
      default:
        return 'null';
    }
  }

  toggleExpenses(budget: Budget) {
    budget.show_expenses = !budget.show_expenses;

    if (budget.show_expenses) {
      this.filteredExpenses$[budget.expenditure_category] = this.expenseService.getAllExpensesWithExpenditureCategoryByEventId(
        this.id,
        budget.expenditure_category
      );
    } else {
      delete this.filteredExpenses$[budget.id];
    }
  }

  openExpenseForm(expenditure_category: string) {
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '600px',
      height: '410px',
      data: {
        event_id : this.id,
        expenditure_category: expenditure_category
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
