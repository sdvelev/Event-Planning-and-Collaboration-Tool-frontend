export class Budget {
  id: number;
  description: string;
  expenditure_category: string;
  amount: number;
  show_expenses: boolean;
  event_id: number;
  created_by: string;
  creation_time: string;
  updated_by: string;
  last_updated_time: string;

  constructor(id: number = 0, description: string = "", expenditure_category: string = "", amount: number = 0, show_expenses: boolean = false, event_id: number = 0, created_by: string = "", creation_time: string = "", updated_by: string = "", last_updated_time: string = "") {
    this.id = id;
    this.description = description;
    this.expenditure_category = expenditure_category;
    this.amount = amount;
    this.show_expenses = show_expenses;
    this.event_id = event_id;
    this.created_by = created_by;
    this.creation_time = creation_time;
    this.updated_by = updated_by;
    this.last_updated_time = last_updated_time;
  }
}
