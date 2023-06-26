export class Budget {
  id: number;
  description: string;
  expenditure_category: string;
  amount: number;
  show_expenses: boolean;
  event_id: number;

  constructor(id: number = 0, description: string = "", expenditure_category: string = "", amount: number = 0, show_expenses: boolean = false, event_id: number = 0) {
    this.id = id;
    this.description = description;
    this.expenditure_category = expenditure_category;
    this.amount = amount;
    this.show_expenses = show_expenses;
    this.event_id = event_id;
  }
}
