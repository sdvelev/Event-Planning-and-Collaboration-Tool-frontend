import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionContractsComponent } from './section-contracts.component';

describe('SectionContractsComponent', () => {
  let component: SectionContractsComponent;
  let fixture: ComponentFixture<SectionContractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionContractsComponent]
    });
    fixture = TestBed.createComponent(SectionContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
