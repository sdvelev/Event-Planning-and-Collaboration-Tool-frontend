import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestEditFormComponent } from './guest-edit-form.component';

describe('GuestEditFormComponent', () => {
  let component: GuestEditFormComponent;
  let fixture: ComponentFixture<GuestEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestEditFormComponent]
    });
    fixture = TestBed.createComponent(GuestEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
