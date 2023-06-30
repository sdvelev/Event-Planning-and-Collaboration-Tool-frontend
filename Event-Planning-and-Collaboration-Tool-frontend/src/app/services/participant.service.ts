import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Participant} from "../models/participant";
import {EditRole} from "../models/edit-role";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  participant$: BehaviorSubject<Participant> = new BehaviorSubject<Participant>(new Participant());

  constructor(private httpClient: HttpClient) { }

  getAllParticipants() {
    return this.httpClient.get<Participant[]>('http://localhost:8080/participants').toPromise();
  }

  getAllParticipantsByUserId(associated_user_id: number) {
    return this.httpClient.get<Participant[]>(`http://localhost:8080/participants/search?associated_user_id=${associated_user_id}`).toPromise();
  }

  getParticipantById(id: number) {
    return this.httpClient.get<Participant>('http://localhost:8080/participants/search?id=' + id)
      .pipe(
        tap((participant: Participant) => {
          this.participant$.next(participant);
        })
      ).toPromise();
  }

  addParticipant(participantDto: Participant, assigned_user_id: number, assigned_event_id: number, token: string): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<number>(`http://localhost:8080/participants?assigned_user_id=${assigned_user_id}&assigned_event_id=${assigned_event_id}`,
      participantDto, {headers: headers});
  }

  editParticipant(participantId: number, editRoleDto: EditRole, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.put<boolean>(`http://localhost:8080/pasrticipants/set?pasticipant_id=${participantId}`, editRoleDto,
      {headers: headers});
  }

  deleteParticipant(participantId: number, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<boolean>(`http://localhost:8080/participants?id=${participantId}`,
      {headers: headers});
  }
}
