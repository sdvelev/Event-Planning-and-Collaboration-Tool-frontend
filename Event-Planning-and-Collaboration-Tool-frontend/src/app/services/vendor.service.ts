import {Injectable} from "@angular/core";
import {BehaviorSubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Vendor} from "../models/vendor";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  task$: BehaviorSubject<Vendor> = new BehaviorSubject<Vendor>(new Vendor());

  constructor(private httpClient: HttpClient) {
  }

  getAllVendors() {
    return this.httpClient.get<Vendor[]>('http://localhost:8080/vendors').toPromise();
  }

  getVendorsById(id: number) {
    return this.httpClient.get<Vendor>('http://localhost:8080/vendors/search?id=' + id)
      .pipe(
        tap((vendor: Vendor) => {
          this.task$.next(vendor);
        })
      );
  }

  getVendorsByEmail(email: string) {
    return this.httpClient.get<Vendor[]>('http://localhost:8080/vendors/search?email=' + email);
  }

  getVendorsByEventId(id: number) {
    return this.httpClient.get<Vendor[]>('http://localhost:8080/vendors/search?event_id=' + id);
  }
}
