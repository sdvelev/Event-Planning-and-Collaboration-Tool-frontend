import {Injectable} from "@angular/core";
import {BehaviorSubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Contract} from "../models/contract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  task$: BehaviorSubject<Contract> = new BehaviorSubject<Contract>(new Contract());

  constructor(private httpClient: HttpClient) {
  }

  getAllContracts() {
    return this.httpClient.get<Contract[]>('http://localhost:8080/contracts').toPromise();
  }

  getContractById(id: number) {
    return this.httpClient.get<Contract>('http://localhost:8080/contracts/search?id=' + id)
      .pipe(
        tap((contract: Contract) => {
          this.task$.next(contract);
        })
      );
  }

  getContractByVendorId(id: number) {
    return this.httpClient.get<Contract>('http://localhost:8080/contracts/search?vendor_id=' + id)
      .pipe(
        tap((contract: Contract) => {
          this.task$.next(contract);
        })
      );
  }
  // getTasksByName(name: string) {
  //   return this.httpClient.get<Contract[]>('http://localhost:8080/tasks/search?name=' + name);
  // }

  getContractByEventId(id: number) {
    return this.httpClient.get<Contract[]>('http://localhost:8080/contracts/search?event_id=' + id);
  }
}
