import { TestBed, inject } from '@angular/core/testing';

import { TodoHttpService } from './todo-http.service';

describe('TodoHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoHttpService]
    });
  });

  it('should be created', inject([TodoHttpService], (service: TodoHttpService) => {
    expect(service).toBeTruthy();
  }));
});
