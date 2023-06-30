import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {PlannedEvent} from "../models/planned-event";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  event$: BehaviorSubject<PlannedEvent> = new BehaviorSubject<PlannedEvent>(new PlannedEvent());

  constructor(private httpClient: HttpClient) {
  }

  getAllEvents() {
    console.log("AAAAAAA");
    return this.httpClient.get<PlannedEvent[]>('http://localhost:8080/events').toPromise();
  }

  getEventById(id: number) {
    return this.httpClient.get<PlannedEvent>('http://localhost:8080/events/search?id=' + id)
      .pipe(
        tap((event: PlannedEvent) => {
          this.event$.next(event);
        })
      );
  }

  addEvent(eventDto: PlannedEvent, token: string): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<number>('http://localhost:8080/events', eventDto,
      {headers: headers});
  }

  editEvent(eventId: number, eventDto: PlannedEvent, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.put<boolean>(`http://localhost:8080/events/set?event_id=${eventId}`, eventDto,
      {headers: headers});
  }

  deleteEvent(eventId: number, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<boolean>(`http://localhost:8080/events?event_id=${eventId}`,
      {headers: headers});
  }

  getEventByName(name: string) {
    return this.httpClient.get<PlannedEvent[]>('http://localhost:8080/events/search?name=' + name);
  }
}
