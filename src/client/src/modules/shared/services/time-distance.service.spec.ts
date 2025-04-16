import { TestBed } from '@angular/core/testing';

import { TimeDistanceService } from './time-distance.service';

describe('TimeDistanceService', () => {
  let service: TimeDistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeDistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
