import {Injectable} from "@angular/core";
import {BehaviorSubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Review} from "../models/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  task$: BehaviorSubject<Review> = new BehaviorSubject<Review>(new Review());

  constructor(private httpClient: HttpClient) {
  }

  getAllReviews() {
    return this.httpClient.get<Review[]>('http://localhost:8080/reviews').toPromise();
  }

  getReviewById(id: number) {
    return this.httpClient.get<Review>('http://localhost:8080/reviews/search?id=' + id)
      .pipe(
        tap((review: Review) => {
          this.task$.next(review);
        })
      );
  }

  // getReviewsByName(name: string) {
  //   return this.httpClient.get<Review[]>('http://localhost:8080/reviews/search?name=' + name);
  // }

  getReviewsByVendorId(id: number) {
    return this.httpClient.get<Review[]>('http://localhost:8080/reviews/search?assigned_vendor_id=' + id);
  }
}
