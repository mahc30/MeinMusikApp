import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { queryBuilder } from 'src/app/helpers/queryBuilder';
import { environment } from 'src/environments/environment';
import { mockCheckSavedTracksResponse, mockDeleteTrackResponse, mockSavedTracksResponse, mockSaveTrackResponse } from './test-data/mock-track-responses.db';

import { TrackService } from './track.service';

describe('TrackService', () => {
  let service: TrackService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TrackService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Saved Tracks on valid Get request', () => {
    service.getSavedTracks().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.items).toBeTruthy();
    })

    const req = httpTestingController.expectOne(environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.user + '/' + environment.SPOTIFY_API_ENDPOINTS.tracks);
    expect(req.request.method).toBe('GET')

    req.flush(mockSavedTracksResponse);
  })

  it('should check userSavedTracks on valid Get Request', () => {
    //Args don't really matter as i'm mocking http
    service.checkUserSavedTracks([]).subscribe(res => {
      expect(res.length).toBe(4);
      expect(res[0]).toBeTrue()
    })

    const req = httpTestingController.expectOne(environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.checkSavedTracks + '?ids=');
    expect(req.request.method).toBe('GET')

    req.flush(mockCheckSavedTracksResponse);
  })
    
  it('should save Tracks on valid Put Request', () => {
    const mockUrl = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.savedTracks;
    const mockQuery = {ids: "123,456,789"};
    const expectedUrl = queryBuilder(mockUrl, mockQuery);

    service.saveTracks(mockQuery).subscribe(res => {
      expect(res).toBeTruthy();
    })

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT')

    req.flush(mockSaveTrackResponse);
  })

  it('should delete tracks on valid Delete Request', () => {
    const mockUrl = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.savedTracks;
    const mockQuery = {ids: "123,456,789"};
    const expectedUrl = queryBuilder(mockUrl, mockQuery);

    service.deleteTracks(mockQuery).subscribe(res => {
      expect(res).toBeTruthy();
    })

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('DELETE')

    req.flush(mockDeleteTrackResponse);
  })
});
