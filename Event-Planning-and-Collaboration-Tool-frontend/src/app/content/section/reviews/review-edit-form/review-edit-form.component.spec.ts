import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEditFormComponent } from './review-edit-form.component';

describe('ReviewEditFormComponent', () => {
  let component: ReviewEditFormComponent;
  let fixture: ComponentFixture<ReviewEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewEditFormComponent]
    });
    fixture = TestBed.createComponent(ReviewEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
