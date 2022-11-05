import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangeRequestComponent } from './price-change-request.component';

describe('PriceChangeRequestComponent', () => {
  let component: PriceChangeRequestComponent;
  let fixture: ComponentFixture<PriceChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceChangeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
