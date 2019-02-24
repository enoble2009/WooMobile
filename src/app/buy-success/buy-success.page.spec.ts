import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySuccessPage } from './buy-success.page';

describe('BuySuccessPage', () => {
  let component: BuySuccessPage;
  let fixture: ComponentFixture<BuySuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
