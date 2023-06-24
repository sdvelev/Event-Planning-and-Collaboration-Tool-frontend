import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTaskNotificationsComponent } from './section-task-notifications.component';

describe('SectionTaskNotificationsComponent', () => {
  let component: SectionTaskNotificationsComponent;
  let fixture: ComponentFixture<SectionTaskNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionTaskNotificationsComponent]
    });
    fixture = TestBed.createComponent(SectionTaskNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
