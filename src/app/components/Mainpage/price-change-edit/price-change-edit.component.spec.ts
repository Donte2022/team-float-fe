import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangeEditComponent } from './price-change-edit.component';

describe('PriceChangeEditComponent', () => {
  let component: PriceChangeEditComponent;
  let fixture: ComponentFixture<PriceChangeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceChangeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceChangeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
