import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEditFormComponent } from './vendor-edit-form.component';

describe('VendorEditFormComponent', () => {
  let component: VendorEditFormComponent;
  let fixture: ComponentFixture<VendorEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorEditFormComponent]
    });
    fixture = TestBed.createComponent(VendorEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
