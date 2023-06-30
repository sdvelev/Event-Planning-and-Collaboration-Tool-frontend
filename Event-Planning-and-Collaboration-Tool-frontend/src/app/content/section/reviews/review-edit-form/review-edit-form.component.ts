import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Review} from "../../../../models/review";
import {ReviewService} from "../../../../services/review.service";

@Component({
  selector: 'app-review-edit-form',
  templateUrl: './review-edit-form.component.html',
  styleUrls: ['./review-edit-form.component.css']
})
export class ReviewEditFormComponent {
  reviewForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ReviewEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) private reviewData: Review,
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
  ) {
    this.reviewForm = this.formBuilder.group({
      rating: [reviewData?.rating || '', Validators.required],
      comment: [reviewData?.comment || '', Validators.required],
      photo_link: [reviewData?.photo_link || '', Validators.required],
    });
  }

  editReview() {
    if (this.reviewForm.valid) {
      const reviewToSave: Review = <Review>{
        id: this.reviewData?.id,
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        photo_link: this.reviewForm.value.photo_link,
      };

      this.reviewService.editReview(reviewToSave.id, reviewToSave).subscribe(updatedReview => {
        this.dialogRef.close(updatedReview);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
