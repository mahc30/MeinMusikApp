import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { mockFollowedArtistsResponse, mockMeResponse } from './test-data/mockResponses';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data on valid request', ()=> {

    service.getCurrentUserProfile().subscribe(res => {
      expect(res.country).toBe("CO");
      expect(res.display_name).toBe("Angel")
    })
    const req = httpTestingController.expectOne(environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.user);
    expect(req.request.method).toBe('GET')

    req.flush(mockMeResponse)
  })

  it('should get error on invalid request', ()=> {

    service.getCurrentUserProfile().subscribe(res => {
    }, (err) => {
      expect(err.status).toBe(401)
    })
    const req = httpTestingController.expectOne(environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.user);
    expect(req.request.method).toBe('GET')

    req.flush({}, {status: 401, statusText: "Invalid Token"})
  })

  it('should get user artists on valid request', () => {
    service.getFollowedArtists().subscribe(res => {
      expect(res.artists.items).toBeTruthy();
      expect(res.artists.items.length).toBe(1)
      expect(res.artists.items[0].name).toBe("Hannah Montana");
    })

    const req = httpTestingController.expectOne(environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.artists + "?type=artist");
    expect(req.request.method).toBe('GET')

    req.flush(mockFollowedArtistsResponse, {status: 200, statusText: "oka"});
  });

});
