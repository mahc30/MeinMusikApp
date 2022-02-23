import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GlobalHttpInterceptorService } from './global-http-interceptor.service';

describe('GlobalHttpInterceptorService', () => {
  let service: GlobalHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],

    });
    service = TestBed.inject(GlobalHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
