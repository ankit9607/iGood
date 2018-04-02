import { TestBed, inject } from '@angular/core/testing';

import { LocalForageService } from './local-forage.service';

describe('LocalForageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalForageService]
    });
  });

  it('should be created', inject([LocalForageService], (service: LocalForageService) => {
    expect(service).toBeTruthy();
  }));
});
