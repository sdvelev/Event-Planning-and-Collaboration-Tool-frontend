import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<User[]>('http://localhost:8080/users').toPromise();
  }

  getUserById(id: number) {
    return this.httpClient.get<User>('http://localhost:8080/users/search?id=' + id)
      .pipe(
        tap((user: User) => {
          this.user$.next(user);
        })
      );
  }

  addUser(userDto: User): Observable<number> {
    return this.httpClient.post<number>(`http://localhost:8080/users`, userDto);
  }

  setUsername(new_username: string, old_username: string, password: string, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.patch<boolean>(`http://localhost:8080/users/settings?new_username=${new_username}&old_username=${old_username}&password=${password}`, null,
      {headers: headers});
  }

  setPassword(new_password: string, username: string, old_password: string, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.patch<boolean>(`http://localhost:8080/users/settings?new_password=${new_password}&username=${username}&old_password=${old_password}`, null,
      {headers: headers});
  }

  editUser(userId: number, userDto: User, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.put<boolean>(`http://localhost:8080/users/set?user_id=${userId}`, userDto,
      {headers: headers});
  }

  deleteUser(username: string, password: string, token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<boolean>(`http://localhost:8080/users?username=${username}&password=${password}`,
      {headers: headers});
  }
}
