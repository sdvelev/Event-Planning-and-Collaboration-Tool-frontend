import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PlannedEvent} from "../../../../models/planned-event";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {Review} from "../../../../models/review";
import {ReviewService} from "../../../../services/review.service";
import {VendorService} from "../../../../services/vendor.service";
import {Vendor} from "../../../../models/vendor";

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

  constructor(private vendorService: VendorService, private reviewService: ReviewService, private activatedRoute: ActivatedRoute) {
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
}
