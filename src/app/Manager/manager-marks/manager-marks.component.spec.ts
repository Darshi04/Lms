import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ManagerMarksComponent } from './manager-marks.component';

describe('ManagerMarksComponent', () => {
  let component: ManagerMarksComponent;
  let fixture: ComponentFixture<ManagerMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerMarksComponent,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
