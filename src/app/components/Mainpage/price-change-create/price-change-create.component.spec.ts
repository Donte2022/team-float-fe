import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangeCreateComponent } from './price-change-create.component';

describe('PriceChangeCreateComponent', () => {
  let component: PriceChangeCreateComponent;
  let fixture: ComponentFixture<PriceChangeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceChangeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceChangeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
