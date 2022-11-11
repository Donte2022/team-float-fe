import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponListItemComponent } from './coupon-list-item.component';

describe('CouponListItemComponent', () => {
  let component: CouponListItemComponent;
  let fixture: ComponentFixture<CouponListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
