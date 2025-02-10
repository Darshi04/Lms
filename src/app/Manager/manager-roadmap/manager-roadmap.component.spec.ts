import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ManagerRoadmapComponent } from './manager-roadmap.component';

describe('ManagerRoadmapComponent', () => {
  let component: ManagerRoadmapComponent;
  let fixture: ComponentFixture<ManagerRoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerRoadmapComponent,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
