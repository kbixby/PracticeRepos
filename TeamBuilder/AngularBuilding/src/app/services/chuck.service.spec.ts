import { TestBed, inject } from '@angular/core/testing';

import { ChuckService } from './chuck.service';

describe('ChuckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChuckService]
    });
  });

  it('should be created', inject([ChuckService], (service: ChuckService) => {
    expect(service).toBeTruthy();
  }));
});
