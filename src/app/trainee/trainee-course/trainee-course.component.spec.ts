import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TraineeCourseComponent } from './trainee-course.component';

describe('TraineeCourseComponent', () => {
  let component: TraineeCourseComponent;
  let fixture: ComponentFixture<TraineeCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeCourseComponent,RouterTestingModule]
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
