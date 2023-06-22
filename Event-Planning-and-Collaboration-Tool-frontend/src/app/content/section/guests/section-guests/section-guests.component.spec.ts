import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGuestsComponent } from './section-guests.component';

describe('SectionGuestsComponent', () => {
  let component: SectionGuestsComponent;
  let fixture: ComponentFixture<SectionGuestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionGuestsComponent]
    });
    fixture = TestBed.createComponent(SectionGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
