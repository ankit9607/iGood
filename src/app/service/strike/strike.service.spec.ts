import { TestBed, inject } from '@angular/core/testing';

import { StrikeService } from './strike.service';

describe('StrikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrikeService]
    });
  });

  it('should be created', inject([StrikeService], (service: StrikeService) => {
    expect(service).toBeTruthy();
  }));
});
