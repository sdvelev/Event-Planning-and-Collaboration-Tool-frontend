import {Injectable} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageNotification} from "../models/message.notification";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  publicKey$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  messages$: BehaviorSubject<MessageNotification> = new BehaviorSubject<MessageNotification>(new MessageNotification());

  constructor(private httpClient: HttpClient) {
  }

  getPublicKey() : Promise<string | undefined> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // return this.httpClient.get<string>('http://localhost:8080/notifications/public_key').toPromise();
    return this.httpClient.get('http://localhost:8080/notifications/public_key', {
      headers,
      responseType: 'text'
    }).toPromise();
  }

  subscribe(message: string) {
    return this.httpClient.post<string>('http://localhost:8080/notifications/subscribe', message);
  }

  unsubscribe(message: string) {
    return this.httpClient.post<string>('http://localhost:8080/notifications/unsubscribe', message);
  }
}
