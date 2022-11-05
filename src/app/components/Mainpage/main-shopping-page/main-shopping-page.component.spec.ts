import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainShoppingPageComponent } from './main-shopping-page.component';

describe('MainShoppingPageComponent', () => {
  let component: MainShoppingPageComponent;
  let fixture: ComponentFixture<MainShoppingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainShoppingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainShoppingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
