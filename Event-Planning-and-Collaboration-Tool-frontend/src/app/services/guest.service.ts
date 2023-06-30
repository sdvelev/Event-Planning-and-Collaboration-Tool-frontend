import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
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

  addGuest(guestDto: Guest): Observable<number> {
    let event: number | null = guestDto.associated_event;
    guestDto.associated_event = null;

    return this.httpClient.post<number>("http://localhost:8080/guests?assigned_event_id=" + event, guestDto);
  }

  editGuest(guestId: number, guestDto: Guest): Observable<boolean> {
    guestDto.associated_event = null;
    return this.httpClient.put<boolean>(`http://localhost:8080/guests/set?guest_id=${guestId}`, guestDto);
  }

  deleteGuest(guestId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`http://localhost:8080/guests/delete?id=${guestId}`);
  }
}
