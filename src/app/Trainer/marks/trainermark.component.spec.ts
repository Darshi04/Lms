import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { TrainermarkComponent } from './trainermark.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('TrainermarkComponent', () => {
  let component: TrainermarkComponent;
  let fixture: ComponentFixture<TrainermarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainermarkComponent,HttpClientTestingModule,RouterTestingModule]
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
