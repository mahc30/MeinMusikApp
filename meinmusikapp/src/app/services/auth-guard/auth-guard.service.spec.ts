import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { setToken } from 'src/app/shared/helpers/localStorage';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],

    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false on CanActivate if user is not auth', () => {
    localStorage.clear()
    expect(service.canActivate()).toBeFalse();
  })

  it('should return true on CanActivate if user is auth', () => {
    setToken("TestToken")
    expect(service.canActivate()).toBeTrue();
    localStorage.clear()
  })
});
