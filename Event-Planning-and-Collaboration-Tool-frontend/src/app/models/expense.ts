export class Expense {
  id: number;
  description: string;
  expenditure_category: string;
  amount: number;

  constructor(id: number = 0, description: string = "", expenditure_category: string = "", amount: number = 0) {
    this.id = id;
    this.description = description;
    this.expenditure_category = expenditure_category;
    this.amount = amount;
  }
}
