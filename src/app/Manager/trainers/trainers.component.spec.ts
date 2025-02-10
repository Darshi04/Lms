import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TrainersComponent } from './trainers.component';

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainersComponent,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
