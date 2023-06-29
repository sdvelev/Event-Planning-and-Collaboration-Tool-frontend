import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBudgetCardComponent } from './all-budget-card.component';

describe('AllBudgetCardComponent', () => {
  let component: AllBudgetCardComponent;
  let fixture: ComponentFixture<AllBudgetCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBudgetCardComponent]
    });
    fixture = TestBed.createComponent(AllBudgetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
