import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseEditFormComponent } from './expense-edit-form.component';

describe('ExpenseEditFormComponent', () => {
  let component: ExpenseEditFormComponent;
  let fixture: ComponentFixture<ExpenseEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseEditFormComponent]
    });
    fixture = TestBed.createComponent(ExpenseEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
