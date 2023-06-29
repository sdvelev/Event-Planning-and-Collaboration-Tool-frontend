import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Review} from "../models/review";
import {Guest} from "../models/guest";

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

  addReview(reviewDto: Review): Observable<number> {
    let vendor: number | null = reviewDto.assigned_vendor;
    reviewDto.assigned_vendor = null;

    return this.httpClient.post<number>(`http://localhost:8080/reviews?assigned_vendor_id=${vendor}`, reviewDto);
  }

  editReview(reviewId: number, reviewDto: Review): Observable<boolean> {
    reviewDto.assigned_vendor = null;
    return this.httpClient.put<boolean>(`http://localhost:8080/reviews/set?review_id=${reviewId}`, reviewDto);
  }

  deleteReview(reviewId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`http://localhost:8080/reviews/delete?id=${reviewId}`);
  }
}
