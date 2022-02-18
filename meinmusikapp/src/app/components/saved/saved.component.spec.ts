import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SavedTracksResponse } from 'src/app/models/tracks/saved-tracks-response.i';
import { mockSavedTracksResponse, mockSaveTrackResponse } from 'src/app/services/track/test-data/mock-track-responses.db';
import { TrackService } from 'src/app/services/track/track.service';

import { SavedComponent } from './saved.component';

describe('SavedComponent', () => {
  let component: SavedComponent;
  let fixture: ComponentFixture<SavedComponent>;
  let trackService: TrackService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [TrackService],
      declarations: [ SavedComponent ]
    })
    .compileComponents();
    trackService = TestBed.inject(TrackService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load current user saved track', () => {
    spyOn(trackService, 'getSavedTracks').and.returnValue(of(mockSavedTracksResponse as unknown as SavedTracksResponse));

    component.loadUsersSavedTracks()

    expect(trackService.getSavedTracks).toHaveBeenCalled();
    expect(component.savedTracks.length).toBe(1)

  })
});
