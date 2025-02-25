import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TraineeHeaderComponent } from './trainee-header.component';

describe('TraineeHeaderComponent', () => {
  let component: TraineeHeaderComponent;
  let fixture: ComponentFixture<TraineeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeHeaderComponent,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
