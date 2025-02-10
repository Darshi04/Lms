import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TraineeResultComponent } from './trainee-result.component';

describe('TraineeResultComponent', () => {
  let component: TraineeResultComponent;
  let fixture: ComponentFixture<TraineeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeResultComponent,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
