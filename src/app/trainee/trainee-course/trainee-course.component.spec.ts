import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeCourseComponent } from './trainee-course.component';

describe('TraineeCourseComponent', () => {
  let component: TraineeCourseComponent;
  let fixture: ComponentFixture<TraineeCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
