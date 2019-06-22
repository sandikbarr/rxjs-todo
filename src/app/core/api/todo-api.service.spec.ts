import { TestBed, inject } from '@angular/core/testing';

import { TodoAPIService } from './todo-api.service';

describe('TodoAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoAPIService]
    });
  });

  it('should be created', inject([TodoAPIService], (service: TodoAPIService) => {
    expect(service).toBeTruthy();
  }));
});
