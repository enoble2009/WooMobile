import { TestBed } from '@angular/core/testing';

import { WooService } from './woo.service';

describe('WooService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WooService = TestBed.get(WooService);
    expect(service).toBeTruthy();
  });
});
