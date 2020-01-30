import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryaddressPage } from './deliveryaddress.page';

describe('DeliveryaddressPage', () => {
  let component: DeliveryaddressPage;
  let fixture: ComponentFixture<DeliveryaddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryaddressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
