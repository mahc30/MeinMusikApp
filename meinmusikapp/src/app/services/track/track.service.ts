import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { queryBuilder } from 'src/app/helpers/queryBuilder';
import { getHttpOptions } from 'src/app/helpers/requests/httpHeaders';
import { TracksQueryById } from 'src/app/models/tracks-query-byId.i';
import { GenresResponse } from 'src/app/models/tracks/genres-response.i';
import { RecommendationsResponse } from 'src/app/models/tracks/recommendations-response.i';
import { SavedTracksResponse } from 'src/app/models/tracks/saved-tracks-response.i';
import { SeveralTracksResponse } from 'src/app/models/tracks/several-tracks-response';
import { Track } from 'src/app/models/tracks/track.i';
import { FollowedArtistsResponse } from 'src/app/models/user/followed-artists-response.i';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient, private userService: UserService) { }

  /*
  getSeveralTracks(ids: string[]) : Observable<SeveralTracksResponse[]>{
    let query = ids.join(",")

    let reqTracksUrl = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.tracks
    reqTracksUrl += "/" + query
    return this.http.get<SeveralTracksResponse[]>(reqTracksUrl, getHttpOptions());
  }

  getGenres() : Observable<GenresResponse>{
    let baseURL = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.genres
    return this.http.get<GenresResponse>(baseURL, getHttpOptions())
  }

  getRecommendations(query: string): Observable<RecommendationsResponse>{
    let url = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.recommendations + query;
    return this.http.get<RecommendationsResponse>(url, getHttpOptions())
  }
  */

  getSavedTracks(): Observable<SavedTracksResponse>{
    let reqUserTracksUrl = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.user + '/' + environment.SPOTIFY_API_ENDPOINTS.tracks
    return this.http.get<SavedTracksResponse>(reqUserTracksUrl, getHttpOptions());
  }

  checkUserSavedTracks(tracks: Track[]): Observable<boolean[]>{
    let ids = tracks.map(track => track.id);
    let query = ids.join(',');

    let url = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.checkSavedTracks;
    url = queryBuilder(url, {ids: query});

    return this.http.get<boolean[]>(url, getHttpOptions());
  }

  saveTracks(query: TracksQueryById): Observable<any>{
    let url = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.checkSavedTracks;
    url = queryBuilder(url, query)
    return this.http.put(url, getHttpOptions());
  }

  deleteTracks(query: TracksQueryById): Observable<any>{
    let url = environment.SPOTIFY_BASE_URL + environment.SPOTIFY_API_ENDPOINTS.checkSavedTracks;
    url = queryBuilder(url, query)
    return this.http.delete(url, getHttpOptions());
  }
}
