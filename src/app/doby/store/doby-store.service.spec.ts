import { TestBed, inject } from '@angular/core/testing';

import { DobyStoreService } from './doby-store.service';

describe('DobyStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DobyStoreService]
    });
  });

  it('should be created', inject([DobyStoreService], (service: DobyStoreService) => {
    expect(service).toBeTruthy();
  }));
});
