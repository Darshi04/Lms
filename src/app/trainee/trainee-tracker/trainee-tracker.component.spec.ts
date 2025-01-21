import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeTrackerComponent } from './trainee-tracker.component';

describe('TraineeTrackerComponent', () => {
  let component: TraineeTrackerComponent;
  let fixture: ComponentFixture<TraineeTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
