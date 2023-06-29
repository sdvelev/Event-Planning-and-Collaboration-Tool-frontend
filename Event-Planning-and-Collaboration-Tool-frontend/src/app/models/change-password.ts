export class ChangePassword {
  new_password: string;
  username: string;
  old_password: string;

  constructor(new_password: string = "", username: string = "", old_password: string = "") {
    this.new_password = new_password;
    this.username = username;
    this.old_password = old_password;
  }
}
