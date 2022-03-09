import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RequestTypes } from 'src/app/models/enums/enums';
import { SavedTracksResponse } from 'src/app/models/tracks/saved-tracks-response.i';
import { Track } from 'src/app/models/tracks/track.i';
import { mockSavedTracksResponse } from 'src/app/shared/test-data/mock-track-responses.db';
import { TrackService } from 'src/app/services/track/track.service';
import { mockTopItemsResponse } from 'src/app/shared/test-data/mockResponses';
import { UserService } from 'src/app/services/user/user.service';

import { HomeComponent } from './home.component';
import { mockDisplayTracks } from '../../../shared/test-data/mock-recommendations-response.db';
import { deleteSavedTrackList, deleteTopTrackList, setSavedTrackList, setTopTrackList } from 'src/app/shared/helpers/localStorage';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;
  let trackService: TrackService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [UserService, TrackService],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
    userService = TestBed.inject(UserService);
    trackService = TestBed.inject(TrackService);
    router = TestBed.inject(Router)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.displayTracks = []
    
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saved tracks if route is /saved', () => {
    spyOn(component, 'loadUserSavedTracks')
    spyOnProperty(router, 'url', 'get').and.returnValue('/saved')
    component.ngOnInit()
    expect(component.loadUserSavedTracks).toHaveBeenCalled()
  })

  it('should call top tracks if route is not /saved', () => {
    spyOn(component, 'loadUserTopTracks')
    spyOnProperty(router, 'url', 'get').and.returnValue('/home')
    component.ngOnInit()
    expect(component.loadUserTopTracks).toHaveBeenCalled()
  })

  it('should display user top tracks', () => {
    spyOn(userService, 'getTopItems').withArgs(RequestTypes.Tracks).and.returnValue(of(mockTopItemsResponse));
    spyOn(component, 'updateDisplayTracksIsSaved');

    component.loadUserTopTracks();
    expect(component.displayTracks.length).toBe(2)
    expect(component.displayTracks[0].name).toBe("Piel Canela")
    expect(component.displayTracks[1].name).toBe("Pain");
    expect(component.displayTracks).toEqual(mockTopItemsResponse.items)
  });

  it('should update isSaved property for every track', () => {
    const mockCheck: boolean[] = [true, false]
    spyOn(trackService,'checkUserSavedTracks').withArgs(mockDisplayTracks as unknown[] as Track[]).and.returnValue(of(mockCheck));

    component.displayTracks = mockDisplayTracks as unknown as Track[];
    component.updateDisplayTracksIsSaved()
    expect(trackService.checkUserSavedTracks).toHaveBeenCalled()
  })

  it('should load current user saved track', () => {
    spyOn(trackService, 'getSavedTracks').and.returnValue(of(mockSavedTracksResponse as unknown as SavedTracksResponse));
    spyOn(component.displayTracks, 'push')
    component.loadUserSavedTracks()

    expect(trackService.getSavedTracks).toHaveBeenCalled();
    expect(component.displayTracks.push).toHaveBeenCalled()
  });

  it('should use cached top tracks if they exist', () => {
    setTopTrackList(mockTopItemsResponse.items);
    component.loadUserTopTracks()
    expect(component.displayTracks.length).toBe(2)
    deleteTopTrackList()
  })

  it('should use cached saved tracks if they exist', () => {
    setSavedTrackList(mockTopItemsResponse.items);
    component.loadUserSavedTracks()
    expect(component.displayTracks).toEqual(mockTopItemsResponse.items)
    deleteSavedTrackList()
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
