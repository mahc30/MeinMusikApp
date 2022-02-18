import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RequestTypes } from 'src/app/models/enums/enums';
import { Track } from 'src/app/models/tracks/track.i';
import { TrackService } from 'src/app/services/track/track.service';
import { mockTopItemsResponse } from 'src/app/services/user/test-data/mockResponses';
import { UserService } from 'src/app/services/user/user.service';

import { HomeComponent } from './home.component';
import { mockDisplayTracks } from './test-data/mock-recommendations-response.db';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;
  let trackService: TrackService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService, TrackService],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
    userService = TestBed.inject(UserService);
    trackService = TestBed.inject(TrackService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user top tracks', () => {
    expect(component.displayTracks.length).toBe(0)
    spyOn(userService, 'getTopItems').withArgs(RequestTypes.Tracks).and.returnValue(of(mockTopItemsResponse));
    spyOn(component, 'updateDisplayTracksIsSaved');

    component.loadUserTopTracks();
    expect(component.displayTracks.length).toBe(2)
    expect(component.displayTracks[0].name).toBe("Piel Canela")
    expect(component.displayTracks[1].name).toBe("Pain");
  });

  it('should update isSaved property for every track', () => {
    const mockCheck: boolean[] = [true, false]
    spyOn(trackService,'checkUserSavedTracks').withArgs(mockDisplayTracks as unknown[] as Track[]).and.returnValue(of(mockCheck));
    component.updateDisplayTracksIsSaved(mockDisplayTracks as unknown[] as Track[])
    expect(trackService.checkUserSavedTracks).toHaveBeenCalled()
  })

  
  /*
  it('should load user recommended tracks', ()=> {

    let mockGenres: GenresResponse = {
      genres: ["a"]
    }

    let mockTracks: SavedTracksResponse = {
      href: '',
      items: [],
      limit: 0,
      next: '',
      offset: 0,
      previous: '',
      total: 0
    }

    let mockArtists: any = {
      artists: {}
    }
    
    expect(component.displayTracks.length).toBe(0);
    spyOn(tracksService, 'getGenres').and.returnValue(of(mockGenres))
    spyOn(tracksService, 'getSavedTracks').and.returnValue(of(mockTracks))
    spyOn(userService, 'getFollowedArtists').and.returnValue(of(mockArtists))
    spyOn(tracksService, 'getRecommendations').and.returnValue(of(mockRecommendations))
    component.loadUsersRecommendedTracks();

    expect(tracksService.getGenres).toHaveBeenCalledTimes(1)
    expect(tracksService.getSavedTracks).toHaveBeenCalledTimes(1)
    expect(userService.getFollowedArtists).toHaveBeenCalledTimes(1)
    expect(tracksService.getRecommendations).toHaveBeenCalledTimes(1)
    expect(component.displayTracks.length).toBe(1)
    expect(component.displayTracks[0].name).toBe("Track1")
  })
  */
});
