import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Budget} from "../../../../models/budget";
import {BudgetService} from "../../../../services/budget.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {BudgetFormComponent} from "../budget-form/budget-form.component";

@Component({
  selector: 'app-all-budget-card',
  templateUrl: './all-budget-card.component.html',
  styleUrls: ['./all-budget-card.component.css']
})
export class AllBudgetCardComponent implements OnInit {

  id!: number;

  private queryId: any;

  budgets$!: Observable<Budget[] | undefined>;

  constructor(private budgetService: BudgetService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryId = this.activatedRoute.params.subscribe(params => {this.id = params['id'];});
    this.budgets$ = this.budgetService.getBudgetsByEventId(this.id);
  }

  openBudgetForm() {
    const dialogRef = this.dialog.open(BudgetFormComponent, {
      width: '600px',
      height: '410px',
      data: {
          event_id : this.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
