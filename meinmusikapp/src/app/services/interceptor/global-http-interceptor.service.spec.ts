import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { flush, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AccessTokenResponse } from 'src/app/models/auth/access-token-response.i';
import { setToken } from 'src/app/shared/helpers/localStorage';
import { AuthService } from '../auth/auth.service';

import { GlobalHttpInterceptorService } from './global-http-interceptor.service';

describe('GlobalHttpInterceptorService', () => {
  let service: GlobalHttpInterceptorService;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(GlobalHttpInterceptorService);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to login if error is not type HttpResponseError', () => {
    let httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    let httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    httpHandlerSpy.handle.and.returnValue(throwError(
      {
        error:
        {
          message: 'test-error',
          status: 403
        }
      }
    ));

    spyOn(router, 'navigate')

    service.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => console.log('good', result),
        err => {
          expect(router.navigate).toHaveBeenCalled()
        }
      );

  })

  it('should redirect error status 400 and 401 but user is not auth', () => {
    let httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    let httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    httpHandlerSpy.handle.and.returnValue(throwError(
      new HttpErrorResponse({
        error:
        {
          message: 'test-error',
          status: 401
        }
      })

    ));

    spyOn(authService, 'refreshToken');
    spyOn(router, 'navigate')

    service.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => console.log('good', result),
        err => {
          expect(router.navigate).toHaveBeenCalled()
          //expect(window.location.reload).toHaveBeenCalled()
        }
      );
  });

  /*
  it('should attempt refresh token on error status 400 and 401 and is auth', () => {
    let httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    let httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    httpHandlerSpy.handle.and.returnValue(throwError(
      new HttpErrorResponse({
        error:
        {
          message: 'test-error',
          status: 401
        }
      })

    ));

    let mockAccessTokenResponse: AccessTokenResponse = {
      access_token: 'testToken',
      token_type: 'test',
      scope: '123',
      expires_in: 420,
      refresh_token: 'si'
    }
    spyOn(authService, 'isAuth').and.returnValue(true);
    spyOn(authService, 'refreshToken');
    spyOn(router, 'navigate')

    service.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => console.log('good', result),
        err => {
          expect(authService.isAuth).toHaveBeenCalled()
          expect(authService.refreshToken).toHaveBeenCalled()
        }
      );

  });
  */

  it('should redirect if error status is not 400 or 401', () => {
    let httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    let httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    httpHandlerSpy.handle.and.returnValue(throwError(new HttpErrorResponse({
      error:
      {
        message: 'test-error',
        status: 405
      }
    })));

    spyOn(router, 'navigate')
    spyOn(authService, 'isAuth').and.returnValue(false);

    service.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => console.log('good', result),
        err => {
          expect(router.navigate).toHaveBeenCalled()
        }
      );

  });
});
