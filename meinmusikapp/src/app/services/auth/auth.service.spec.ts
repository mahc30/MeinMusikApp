import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { MockRequestTokenResponse } from './test-data/mock-request-token-response.db';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return access token on valid request', () => {

    service.requestToken({
      code: 'doesntMatterHere',
      state: 'doesntMatterHere'
    }).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.access_token).toBe("mockToken")
      expect(res.scope).toBe("123")
    })

    const req = httpTestingController.expectOne(environment.SPOTIFY_AUTH_URL + environment.SPOTIFY_API_ENDPOINTS.requestToken);
    expect(req.request.method).toBe('POST')

    req.flush(MockRequestTokenResponse);
  })
});
