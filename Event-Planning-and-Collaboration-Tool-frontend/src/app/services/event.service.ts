import {Injectable} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
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

  getEventByName(name: string) {
    return this.httpClient.get<PlannedEvent[]>('http://localhost:8080/events/search?name=' + name);
  }
}
