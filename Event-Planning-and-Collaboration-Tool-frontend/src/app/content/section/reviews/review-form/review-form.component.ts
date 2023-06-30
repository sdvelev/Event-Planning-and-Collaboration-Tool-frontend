import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {Review} from "../../../../models/review";
import {ReviewService} from "../../../../services/review.service";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  reviewForm: FormGroup;
  vendorId: number;

  constructor(
    private dialogRef: MatDialogRef<ReviewFormComponent>,
    @Inject(MAT_DIALOG_DATA) private reviewData: Review,
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.vendorId = parseInt(router.url.split('/').pop()!);

    this.reviewForm = this.formBuilder.group({
      rating: [reviewData?.rating || '', Validators.required],
      comment: [reviewData?.comment || '', Validators.required],
      photo_link: [reviewData?.photo_link || '', Validators.required],
      assigned_vendor: [this.vendorId || '', Validators.required],
    });
  }

  saveReview() {
    if (this.reviewForm.valid) {
      const reviewToSave: Review = <Review>{
        id: this.reviewData?.id || null,
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        photo_link: this.reviewForm.value.photo_link,
        assigned_vendor: this.vendorId,
      };

      this.reviewService.addReview(reviewToSave).subscribe(updatedReview => {
        this.dialogRef.close(updatedReview);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
