import { TestBed, inject } from '@angular/core/testing';

import { DobyHttpService } from './doby-http.service';

describe('DobyAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DobyHttpService]
    });
  });

  it('should be created', inject([DobyHttpService], (service: DobyHttpService) => {
    expect(service).toBeTruthy();
  }));
});
