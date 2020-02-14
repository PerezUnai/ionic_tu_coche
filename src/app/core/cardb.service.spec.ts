import { TestBed } from '@angular/core/testing';

import { CardbService } from './cardb.service';

describe('CardbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardbService = TestBed.get(CardbService);
    expect(service).toBeTruthy();
  });
});
