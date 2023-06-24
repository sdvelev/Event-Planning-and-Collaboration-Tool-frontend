import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNotificationsComponent } from './task-notifications.component';

describe('TaskNotificationsComponent', () => {
  let component: TaskNotificationsComponent;
  let fixture: ComponentFixture<TaskNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskNotificationsComponent]
    });
    fixture = TestBed.createComponent(TaskNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
