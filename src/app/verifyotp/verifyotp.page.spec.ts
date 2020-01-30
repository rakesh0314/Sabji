import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyotpPage } from './verifyotp.page';

describe('VerifyotpPage', () => {
  let component: VerifyotpPage;
  let fixture: ComponentFixture<VerifyotpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyotpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyotpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
