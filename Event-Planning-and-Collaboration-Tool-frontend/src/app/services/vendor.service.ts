import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
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

  addVendor(vendorDto: Vendor): Observable<number> {
    return this.httpClient.post<number>("http://localhost:8080/vendors", vendorDto);
  }

  editVendor(vendorId: number, vendorDto: Vendor): Observable<boolean> {
    return this.httpClient.put<boolean>(`http://localhost:8080/vendors/set?vendor_id=${vendorId}`, vendorDto);
  }

  deleteVendor(vendorId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`http://localhost:8080/vendors/delete?id=${vendorId}`);
  }
}
