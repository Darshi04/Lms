import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseInfoComponent } from './course-info.component';

describe('CourseInfoComponent', () => {
  let component: CourseInfoComponent;
  let fixture: ComponentFixture<CourseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseInfoComponent,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
