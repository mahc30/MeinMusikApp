import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TracksQueryById } from 'src/app/models/tracks-query-byId.i';
import { Track } from 'src/app/models/tracks/track.i';
import { TrackService } from 'src/app/services/track/track.service';
import { mockSavedTrackObj } from '../../../shared/test-data/mock-track-data.db';

import { TracksGridComponent } from './tracks-grid.component';

describe('TracksGridComponent', () => {
  let component: TracksGridComponent;
  let fixture: ComponentFixture<TracksGridComponent>;
  let trackService: TrackService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TracksGridComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TrackService]
    })
      .compileComponents();
    trackService = TestBed.inject(TrackService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.displayTracks.push(mockSavedTrackObj as unknown as Track);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete track on event by Saved Track', () => {
    spyOn(component, 'deleteTrack');
    component.handleTrackEvent(0);

    expect(component.deleteTrack).toHaveBeenCalled();
  });

  it('should save track on not Saved Track event', () => {
    spyOn(component, 'saveTrack');

    let mockNotSavedTrack = mockSavedTrackObj;
    mockNotSavedTrack.isSaved = false;
    component.displayTracks.push(mockSavedTrackObj as unknown as Track);
    component.handleTrackEvent(1);

    expect(component.saveTrack).toHaveBeenCalled()
  });

  it('should call delete track service with track id', () => {
    let mockQuery: TracksQueryById = {
      ids: component.displayTracks[0].id
    };
    spyOn(trackService, 'deleteTracks').withArgs(mockQuery).and.returnValue(of({}))

    component.deleteTrack(component.displayTracks[0]);

    expect(trackService.deleteTracks).toHaveBeenCalledOnceWith(mockQuery);
  });

  it('should call save track service with track id', () => {
    let mockQuery: TracksQueryById = {
      ids: component.displayTracks[0].id
    };
    spyOn(trackService, 'saveTracks').withArgs(mockQuery).and.returnValue(of({}))

    component.saveTrack(component.displayTracks[0])
    expect(trackService.saveTracks).toHaveBeenCalledOnceWith(mockQuery);
  })
});