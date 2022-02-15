import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GenresResponse } from 'src/app/models/tracks/genres-response.i';
import { SavedTracksResponse } from 'src/app/models/tracks/saved-tracks-response.i';
import { FollowedArtistsResponse } from 'src/app/models/user/followed-artists-response.i';
import { TrackService } from 'src/app/services/track/track.service';
import { mockMeResponse } from 'src/app/services/user/test-data/mockResponses';
import { UserService } from 'src/app/services/user/user.service';

import { HomeComponent } from './home.component';
import { mockRecommendations } from './test-data/mock-recommendations-response.db';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;
  let tracksService: TrackService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService, TrackService],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
    userService = TestBed.inject(UserService);
    tracksService = TestBed.inject(TrackService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display spotify username', () => {
    expect(component.username).toBe("username") //default value
    spyOn(userService, 'getCurrentUserProfile').and.returnValue(of(mockMeResponse))
    component.loadUser();
    expect(component.username).toBe("Angel") //default value
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
