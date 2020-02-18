import { TestBed } from '@angular/core/testing';

import { CarcrudService } from './hotelcrud.service';

describe('CarcrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarcrudService = TestBed.get(CarcrudService);
    expect(service).toBeTruthy();
  });
});