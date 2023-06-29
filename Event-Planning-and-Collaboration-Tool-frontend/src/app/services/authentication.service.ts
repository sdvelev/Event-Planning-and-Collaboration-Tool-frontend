import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Expense} from "../models/expense";
import {HttpClient} from "@angular/common/http";
import {Budget} from "../models/budget";
import {Authentication} from "../models/authentication";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  login(authenticationDto: Authentication): Observable<string> {
    console.log(authenticationDto);
    return this.httpClient.post<string>(`http://localhost:8080/login`, authenticationDto);
  }
}
