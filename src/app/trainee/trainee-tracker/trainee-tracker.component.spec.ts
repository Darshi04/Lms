import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TraineeTrackerComponent } from './trainee-tracker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <-- Import this

describe('TraineeTrackerComponent', () => {
  let component: TraineeTrackerComponent;
  let fixture: ComponentFixture<TraineeTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeTrackerComponent,RouterTestingModule,HttpClientTestingModule]
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
