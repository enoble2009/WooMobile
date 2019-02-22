import { TestBed } from '@angular/core/testing';

import { CartHandlerService } from './cart-handler.service';

describe('CartHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartHandlerService = TestBed.get(CartHandlerService);
    expect(service).toBeTruthy();
  });
});
