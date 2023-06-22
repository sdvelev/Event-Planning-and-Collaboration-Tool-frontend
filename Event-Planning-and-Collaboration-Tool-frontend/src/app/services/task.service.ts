import {Injectable} from "@angular/core";
import {BehaviorSubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  task$: BehaviorSubject<Task> = new BehaviorSubject<Task>(new Task());

  constructor(private httpClient: HttpClient) {
  }

  getAllTasks() {
    return this.httpClient.get<Task[]>('http://localhost:8080/tasks').toPromise();
  }

  getTaskById(id: number) {
    return this.httpClient.get<Task>('http://localhost:8080/tasks/search?id=' + id)
      .pipe(
        tap((task: Task) => {
          this.task$.next(task);
        })
      );
  }

  getTasksByName(name: string) {
    return this.httpClient.get<Task[]>('http://localhost:8080/tasks/search?name=' + name);
  }

  getTasksByEventId(id: number) {
    return this.httpClient.get<Task[]>('http://localhost:8080/tasks/search?event_id=' + id);
  }
}
