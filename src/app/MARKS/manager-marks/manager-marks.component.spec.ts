import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerMarksComponent } from './manager-marks.component';

describe('ManagerMarksComponent', () => {
  let component: ManagerMarksComponent;
  let fixture: ComponentFixture<ManagerMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
