import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraveenComponent } from './praveen.component';

describe('PraveenComponent', () => {
  let component: PraveenComponent;
  let fixture: ComponentFixture<PraveenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PraveenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PraveenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
