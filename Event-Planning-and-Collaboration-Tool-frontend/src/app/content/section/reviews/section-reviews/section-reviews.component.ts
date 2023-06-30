import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {Review} from "../../../../models/review";
import {ReviewService} from "../../../../services/review.service";
import {VendorService} from "../../../../services/vendor.service";
import {Vendor} from "../../../../models/vendor";
import {MatDialog} from "@angular/material/dialog";
import {TaskFormComponent} from "../../tasks/task-form/task-form.component";
import {Task} from "../../../../models/task";
import {TaskEditFormComponent} from "../../tasks/task-edit-form/task-edit-form.component";
import {ReviewFormComponent} from "../review-form/review-form.component";
import {ReviewEditFormComponent} from "../review-edit-form/review-edit-form.component";

@Component({
  selector: 'app-section-reviews',
  templateUrl: './section-reviews.component.html',
  styleUrls: ['./section-reviews.component.css']
})
export class SectionReviewsComponent implements OnInit {

  id!: number;

  private queryId: any;

  vendor$!: Observable<Vendor>;

  reviews$!: Observable<Review[] | undefined>;

  constructor(private vendorService: VendorService, private reviewService: ReviewService,
              private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.queryId = this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
    });
    this.vendor$ = this.vendorService.getVendorsById(this.id);
    this.reviews$ = this.reviewService.getReviewsByVendorId(this.id);

    console.log(this.reviews$);
  }

  ngOnDestroy() {
    this.queryId.unsubscribe();
  }

  openReviewForm() {
    const dialogRef = this.dialog.open(ReviewFormComponent, {
      width: '600px',
      height: '620px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  editButton(review: Review) {
    const dialogRef = this.dialog.open(ReviewEditFormComponent, {
      width: '600px',
      height: '620px',
      data: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        photo_link: review.photo_link,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      }
    });
  }

  deleteButton(reviewId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this review?');
    if (confirmed) {
      this.reviewService.deleteReview(reviewId).subscribe(result => {
        if (result) {
          setTimeout(() => {
            window.location.reload();
          }, 50);
        }
      });
    }
  }
}
