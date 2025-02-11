import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { TraineeDashboardComponent } from './trainee-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('TraineeDashboardComponent', () => {
  let component: TraineeDashboardComponent;
  let fixture: ComponentFixture<TraineeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeDashboardComponent,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
