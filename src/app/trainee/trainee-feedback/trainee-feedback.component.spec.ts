import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TraineeFeedbackComponent } from './trainee-feedback.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TraineeFeedbackComponent', () => {
  let component: TraineeFeedbackComponent;
  let fixture: ComponentFixture<TraineeFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeFeedbackComponent,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
