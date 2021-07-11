import { TestBed } from '@angular/core/testing';

import { SendTokenInterceptorService } from './send-token-interceptor.service';

describe('SendTokenInterceptorService', () => {
  let service: SendTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
