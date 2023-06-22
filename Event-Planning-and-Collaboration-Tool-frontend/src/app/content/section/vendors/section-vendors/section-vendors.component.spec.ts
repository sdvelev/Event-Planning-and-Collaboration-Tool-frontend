import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionVendorsComponent } from './section-vendors.component';

describe('SectionVendorsComponent', () => {
  let component: SectionVendorsComponent;
  let fixture: ComponentFixture<SectionVendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionVendorsComponent]
    });
    fixture = TestBed.createComponent(SectionVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
