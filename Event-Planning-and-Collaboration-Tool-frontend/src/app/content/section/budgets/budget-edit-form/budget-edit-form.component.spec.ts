import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEditFormComponent } from './budget-edit-form.component';

describe('BudgetEditFormComponent', () => {
  let component: BudgetEditFormComponent;
  let fixture: ComponentFixture<BudgetEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetEditFormComponent]
    });
    fixture = TestBed.createComponent(BudgetEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
