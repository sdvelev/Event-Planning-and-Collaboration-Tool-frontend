import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
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

  addTask(taskDto: Task): Observable<number> {
    let event: number | null = taskDto.associated_event;
    let participant: number | null = taskDto.associated_participant;
    taskDto.associated_event = null;
    taskDto.associated_participant = null;

    return this.httpClient.post<number>("http://localhost:8080/tasks?assigned_event_id=" + event + "&assigned_participant_id=" + participant, taskDto);
  }

  editTask(taskId: number, taskDto: Task): Observable<boolean> {
    taskDto.associated_event = null;
    taskDto.associated_participant = null;
    return this.httpClient.put<boolean>(`http://localhost:8080/tasks/set?task_id=${taskId}`, taskDto);
  }

  deleteTask(taskId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`http://localhost:8080/tasks/delete?id=${taskId}`);
  }
}
