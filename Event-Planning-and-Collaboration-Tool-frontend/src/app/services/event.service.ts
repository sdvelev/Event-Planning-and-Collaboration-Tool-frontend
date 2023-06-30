import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {PlannedEvent} from "../models/planned-event";
import {HttpClient} from "@angular/common/http";

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

  addEvent(eventDto: PlannedEvent): Observable<number> {
    console.log(eventDto);
    return this.httpClient.post<number>('http://localhost:8080/events', eventDto);
  }

  editEvent(eventId: number, eventDto: PlannedEvent): Observable<boolean> {
    return this.httpClient.put<boolean>(`http://localhost:8080/events/set?event_id=${eventId}`, eventDto);
  }

  deleteEvent(eventId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`http://localhost:8080/events?event_id=${eventId}`);
  }

  getEventByName(name: string) {
    return this.httpClient.get<PlannedEvent[]>('http://localhost:8080/events/search?name=' + name);
  }
}
