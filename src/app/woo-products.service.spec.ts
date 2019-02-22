import { TestBed } from '@angular/core/testing';

import { WooProductsService } from './woo-products.service';

describe('WooProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WooProductsService = TestBed.get(WooProductsService);
    expect(service).toBeTruthy();
  });
});
