import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainermarkComponent } from './trainermark.component';

describe('TrainermarkComponent', () => {
  let component: TrainermarkComponent;
  let fixture: ComponentFixture<TrainermarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainermarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainermarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
