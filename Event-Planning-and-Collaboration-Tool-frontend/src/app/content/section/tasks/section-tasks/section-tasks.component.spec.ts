import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTasksComponent } from './section-tasks.component';

describe('SectionTasksComponent', () => {
  let component: SectionTasksComponent;
  let fixture: ComponentFixture<SectionTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionTasksComponent]
    });
    fixture = TestBed.createComponent(SectionTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
