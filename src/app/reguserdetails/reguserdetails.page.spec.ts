import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReguserdetailsPage } from './reguserdetails.page';

describe('ReguserdetailsPage', () => {
  let component: ReguserdetailsPage;
  let fixture: ComponentFixture<ReguserdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReguserdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReguserdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
