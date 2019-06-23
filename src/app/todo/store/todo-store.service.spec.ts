import { TestBed, inject } from '@angular/core/testing';

import { TodoStoreService } from './todo-store.service';

describe('TodoStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoStoreService]
    });
  });

  it('should be created', inject([TodoStoreService], (service: TodoStoreService) => {
    expect(service).toBeTruthy();
  }));
});
