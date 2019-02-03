import { TestBed } from '@angular/core/testing';

import { WooUserService } from './woo-user.service';

describe('WooUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WooUserService = TestBed.get(WooUserService);
    expect(service).toBeTruthy();
  });
});
