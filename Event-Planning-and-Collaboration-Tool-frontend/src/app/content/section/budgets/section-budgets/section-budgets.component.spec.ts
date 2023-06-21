import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBudgetsComponent } from './section-budgets.component';

describe('SectionBudgetsComponent', () => {
  let component: SectionBudgetsComponent;
  let fixture: ComponentFixture<SectionBudgetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionBudgetsComponent]
    });
    fixture = TestBed.createComponent(SectionBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
