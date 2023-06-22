import {Injectable} from "@angular/core";
import {BehaviorSubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Guest} from "../models/guest";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  guest$: BehaviorSubject<Guest> = new BehaviorSubject<Guest>(new Guest());

  constructor(private httpClient: HttpClient) {
  }

  getAllGuests() {
    return this.httpClient.get<Guest[]>('http://localhost:8080/guests').toPromise();
  }

  getGuestsById(id: number) {
    return this.httpClient.get<Guest>('http://localhost:8080/guests/search?id=' + id)
      .pipe(
        tap((guest: Guest) => {
          this.guest$.next(guest);
        })
      );
  }

  getGuestsByEmail(email: string) {
    return this.httpClient.get<Guest[]>('http://localhost:8080/guests/search?email=' + email);
  }

  getGuestsByEventId(id: number) {
    return this.httpClient.get<Guest[]>('http://localhost:8080/guests/search?event_id=' + id);
  }
}
