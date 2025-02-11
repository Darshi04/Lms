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
    component.user= {"trainers":null,"students":[{"rn_id":"RN21500","student_name":"Aaanand","skills":"spring-boot,\nJava,\nC++","role":"Designer","email":"anand@gmail.com","password":"anand123","t_id":"TR1234","profile":"http://localhost:8080/images/student_RN21500.png","marks":[{"mark_id":233,"mark":87,"subject":"Java core","edit_date":"2025-02-06 09:05:48","stdent_id":"RN21500","tran_id":"TR1234"},{"mark_id":236,"mark":75,"subject":"Data Structures","edit_date":"2025-02-06 15:29:55","stdent_id":"RN21500","tran_id":"TR1234"},{"mark_id":240,"mark":null,"subject":"Linux","edit_date":"2025-02-07 10:03:10","stdent_id":"RN21500","tran_id":"TR1234"},{"mark_id":242,"mark":null,"subject":"Linux","edit_date":"2025-02-07 10:03:43","stdent_id":"RN21500","tran_id":"TR1234"}]}],"managers":null}
    fixture.detectChanges();
  });

  it('should create', () => {
    // spyOn(component, ge).and.returnValue(null);

    // component.getSubjectsWithAttempts().re
    expect(component).toBeTruthy();
  });
});
