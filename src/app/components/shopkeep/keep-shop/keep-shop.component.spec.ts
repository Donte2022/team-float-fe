import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepShopComponent } from './keep-shop.component';

describe('KeepShopComponent', () => {
  let component: KeepShopComponent;
  let fixture: ComponentFixture<KeepShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeepShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
