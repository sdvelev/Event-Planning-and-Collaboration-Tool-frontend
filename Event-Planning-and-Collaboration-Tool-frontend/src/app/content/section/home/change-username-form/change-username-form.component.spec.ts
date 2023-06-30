import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUsernameFormComponent } from './change-username-form.component';

describe('ChangeUsernameFormComponent', () => {
  let component: ChangeUsernameFormComponent;
  let fixture: ComponentFixture<ChangeUsernameFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeUsernameFormComponent]
    });
    fixture = TestBed.createComponent(ChangeUsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
