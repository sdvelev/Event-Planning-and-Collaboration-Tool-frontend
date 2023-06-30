import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Contract} from "../models/contract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contract$: BehaviorSubject<Contract> = new BehaviorSubject<Contract>(new Contract());

  constructor(private httpClient: HttpClient) {
  }

  getAllContracts() {
    return this.httpClient.get<Contract[]>('http://localhost:8080/contracts').toPromise();
  }

  getContractById(id: number) {
    return this.httpClient.get<Contract>('http://localhost:8080/contracts/search?id=' + id)
      .pipe(
        tap((contract: Contract) => {
          this.contract$.next(contract);
        })
      );
  }

  getContractByVendorId(id: number) {
    return this.httpClient.get<Contract>('http://localhost:8080/contracts/search?vendor_id=' + id)
      .pipe(
        tap((contract: Contract) => {
          this.contract$.next(contract);
        })
      );
  }

  getContractByEventId(id: number) {
    return this.httpClient.get<Contract[]>('http://localhost:8080/contracts/search?event_id=' + id);
  }

  addContract(contractDto: Contract): Observable<number> {
    return this.httpClient.post<number>(`http://localhost:8080/contracts?assigned_event_id=${contractDto.associated_event.id}&assigned_vendor_id=${contractDto.associated_vendor.id}`, contractDto);
  }

  editContract(contractId: number, contractDto: Contract): Observable<boolean> {
    return this.httpClient.put<boolean>(`http://localhost:8080/contracts/set?contract_id=${contractId}`, contractDto);
  }

  deleteContract(contractId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`http://localhost:8080/contracts/delete?id=${contractId}`);
  }
}
