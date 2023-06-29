import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEditFromComponent } from './contract-edit-from.component';

describe('ContractEditFromComponent', () => {
  let component: ContractEditFromComponent;
  let fixture: ComponentFixture<ContractEditFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractEditFromComponent]
    });
    fixture = TestBed.createComponent(ContractEditFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
