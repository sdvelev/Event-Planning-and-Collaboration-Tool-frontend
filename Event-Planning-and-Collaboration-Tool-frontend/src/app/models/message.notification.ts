export class MessageNotification {
  endpoint: string;
  public_key: string;
  private_key: string;
  message: string;

  constructor(endpoint: string = "", public_key: string = "", private_key: string = "", message: string = "") {
    this.endpoint = endpoint;
    this.public_key = public_key;
    this.private_key = private_key;
    this.message = message;
  }
}
