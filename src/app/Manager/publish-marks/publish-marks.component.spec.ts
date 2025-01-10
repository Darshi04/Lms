import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishMarksComponent } from './publish-marks.component';

describe('PublishMarksComponent', () => {
  let component: PublishMarksComponent;
  let fixture: ComponentFixture<PublishMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
