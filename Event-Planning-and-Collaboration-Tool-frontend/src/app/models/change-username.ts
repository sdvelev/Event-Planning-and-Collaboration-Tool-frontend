export class ChangeUsername {
  new_username: string;
  old_username: string;
  password: string;


  constructor(new_username: string = "", old_username: string = "", password: string = "") {
    this.new_username = new_username;
    this.old_username = old_username;
    this.password = password;
  }
}
