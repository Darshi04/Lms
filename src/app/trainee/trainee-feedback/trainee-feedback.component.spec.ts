import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeFeedbackComponent } from './trainee-feedback.component';

describe('TraineeFeedbackComponent', () => {
  let component: TraineeFeedbackComponent;
  let fixture: ComponentFixture<TraineeFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeFeedbackComponent]
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
