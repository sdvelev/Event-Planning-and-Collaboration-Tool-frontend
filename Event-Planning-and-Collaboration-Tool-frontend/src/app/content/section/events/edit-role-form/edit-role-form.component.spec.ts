import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoleFormComponent } from './edit-role-form.component';

describe('EditRoleFormComponent', () => {
  let component: EditRoleFormComponent;
  let fixture: ComponentFixture<EditRoleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRoleFormComponent]
    });
    fixture = TestBed.createComponent(EditRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
