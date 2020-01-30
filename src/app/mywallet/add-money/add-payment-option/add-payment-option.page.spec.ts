import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentOptionPage } from './add-payment-option.page';

describe('AddPaymentOptionPage', () => {
  let component: AddPaymentOptionPage;
  let fixture: ComponentFixture<AddPaymentOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentOptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
