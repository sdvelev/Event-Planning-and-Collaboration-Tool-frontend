export class EditRole {
  id: number;
  user_role: string;


  constructor(id: number = 0, user_role: string = "") {
    this.id = id;
    this.user_role = user_role;
  }
}
