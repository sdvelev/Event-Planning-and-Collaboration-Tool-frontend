import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionReviewsComponent } from './section-reviews.component';

describe('SectionReviewsComponent', () => {
  let component: SectionReviewsComponent;
  let fixture: ComponentFixture<SectionReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionReviewsComponent]
    });
    fixture = TestBed.createComponent(SectionReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
